//create repo
function submitRepoCreation() {
  var text = document.getElementById('query').value;
  var recastAPIurl = 'https://api.recast.ai/v2/request?text=';
  fetch(recastAPIurl + text, {
    method: "post",
    headers: {
      'Authorization': 'Token 1f42a05c3cd798f49fa4dc56a3124220',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    response.json().then(response => {
      repoName = response.results.entities.repository[0].value;
      console.log(repoName);
      document.getElementById("repository").value = repoName;
    }).catch(function () {
      console.log("There is some error in resolving name of repository from sentence...");
    });
  }).catch(function () {
    console.log("There is some error in recast.ai api call...");
  });

}

function createRepositoryOnGithub() {
  const repositoryName = document.getElementById("repository").value;
  const description = document.getElementById("description").value;
  if (repositoryName === "" || repositoryName == null || repositoryName == 0 || repositoryName == "undefined" ||
    description === "" || description == null || description == 0 || description == "undefined") {
    document.getElementById('repoNameInpop').innerHTML = "Invalid values entered";
  }
  else {
    fetch('https://api.github.com/user/repos', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
      },
      body: JSON.stringify({
        "name": repositoryName,
        "description": description
      })
    }).then((response) => {
      response.json().then(response => {
        document.getElementById('repoNameInpop').innerHTML = repoName + " got created with required right";
        console.log(repoName);
      }).catch(function () {
        console.log("There is some error in resolving name of repository from sentence...");
      });
    }).catch(function () {
      console.log("There is some error in recast.ai api call...");
    });
  }
}

//add collabarte

function submitUserAddingRequest() {
  var text = document.getElementById('userCreationQuery').value;
  var recastAPIurl = 'https://api.recast.ai/v2/request?text=';
  fetch(recastAPIurl + text, {
    method: "post",
    headers: {
      'Authorization': 'Token 1f42a05c3cd798f49fa4dc56a3124220',
      'Content-Type': 'application/json'
    }
  }).then(response => {
    response.json().then(response => {
      userName = response.results.entities.user[0].value;
      repoName = response.results.entities.repository[0].value;
      console.log(repoName);
      console.log(userName);
      document.getElementById("userForRepository").value = repoName;
      document.getElementById("userName").value = userName;
    }).catch(function () {
      console.log("There is some error in resolving name of repository from sentence...");
    });
  }).catch(function () {
    console.log("There is some error in recast.ai api call...");
  });
}

function addUserOnGithub() {
  const userForRepository = document.getElementById('userForRepository').value;
  const userName = document.getElementById('userName').value;
  const uri = 'https://api.github.com/repos/kudums/' + userForRepository + '/collaborators/' + userName;

  if (userForRepository === "" || userForRepository == null || userForRepository == 0 || userForRepository == "undefined" ||
    userName === "" || userName == null || userName == 0 || userName == "undefined") {
    document.getElementById('userNameInpop').innerHTML = "Invalid values entered";
  }
  else {
    fetch(uri, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
      },
      body: JSON.stringify({
        "permission": "admin"
      })
    }).then((response) => {
      response.json().then(response => {
        document.getElementById('userNameInpop').innerHTML = response.invitee.login + " added sucessfully ";
      }).catch(function () {
        console.log("Github responded successfully but there is some problem in parsing response...");
      });
    }).catch(function () {
      console.log("There is some error in github api call...");
    });
  }
}
function submitUserDesire(e) {
  if (e.keyCode == '13') {
    var value = document.getElementById('userDesire').value;
    if (value.indexOf("create repo") != -1) {
      document.getElementById("crateIssueDiv").style.display = "none";
      document.getElementById("editIssueDiv").style.display = "none";
      document.getElementById("getIssueDetailsDiv").style.display = "none";
      document.getElementById("addUserDiv").style.display = "none";
      document.getElementById("creatRepoDiv").style.display = "block";
    }
    else if (value.indexOf("update issue") != -1) {
      document.getElementById("creatRepoDiv").style.display = "none";
      document.getElementById("crateIssueDiv").style.display = "none";
      document.getElementById("editIssueDiv").style.display = "block";
      document.getElementById("getIssueDetailsDiv").style.display = "none";
      document.getElementById("addUserDiv").style.display = "none";
    }
    else if (value.indexOf("get issue") != -1) {
      document.getElementById("creatRepoDiv").style.display = "none";
      document.getElementById("crateIssueDiv").style.display = "none";
      document.getElementById("editIssueDiv").style.display = "none";
      document.getElementById("getIssueDetailsDiv").style.display = "block";
      document.getElementById("addUserDiv").style.display = "none";
    }
    else if (value.indexOf("log a issue") != -1) {
      document.getElementById("creatRepoDiv").style.display = "none";
      document.getElementById("crateIssueDiv").style.display = "block";
      document.getElementById("editIssueDiv").style.display = "none";
      document.getElementById("getIssueDetailsDiv").style.display = "none";
      document.getElementById("addUserDiv").style.display = "none";
    }
    else if (value.indexOf("add a user") != -1) {
      document.getElementById("creatRepoDiv").style.display = "none";
      document.getElementById("crateIssueDiv").style.display = "none";
      document.getElementById("editIssueDiv").style.display = "none";
      document.getElementById("getIssueDetailsDiv").style.display = "none";
      document.getElementById("addUserDiv").style.display = "block";
    }
    else {
      document.getElementById("creatRepoDiv").style.display = "none";
      document.getElementById("crateIssueDiv").style.display = "none";
      document.getElementById("editIssueDiv").style.display = "none";
      document.getElementById("getIssueDetailsDiv").style.display = "none";
      document.getElementById("addUserDiv").style.display = "none";
    }

  }
}

//Create issue
function submitIssueCreation() {
  document.getElementById("crateIssueDiv").style.display = "block";
  document.getElementById("editIssueDiv").style.display = "none";
  document.getElementById("getIssueDetailsDiv").style.display = "none";

  var text = document.getElementById('IssueQuery').value;
  var recastAPIurl = 'https://api.recast.ai/v2/request?text=';
  fetch(recastAPIurl + text, {
    method: "post",
    headers: {
      'Authorization': 'Token 1f42a05c3cd798f49fa4dc56a3124220',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    response.json().then(response => {
      repoName = response.results.entities.repository[0].value;
      console.log(repoName);
      document.getElementById("issueInRepo").value = repoName;
    }).catch(function () {
      console.log("There is some error in resolving name of repository from sentence...");
    });
  }).catch(function () {
    console.log("There is some error in recast.ai api call...");
  });

}
function createIssueOnGithub() {
  const issueInRepo = document.getElementById('issueInRepo').value;
  const issue = document.getElementById('issue').value;
  const issueDescription = document.getElementById('issueDescription').value;

  if (issueInRepo === "" || issueInRepo == null || issueInRepo == 0 || issueInRepo == "undefined" ||
    issue === "" || issue == null || issue == 0 || issue == "undefined" ||
    issueDescription === "" || issueDescription == null || issueDescription == 0 || issueDescription == "undefined") {
    document.getElementById('issueNameInpop').innerHTML = "Invalid values entered";
  }
  else {
    fetch('https://api.github.com/repos/kudums/' + issueInRepo + '/issues', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
      },
      body: JSON.stringify({
        "title": issue,
        "body": issueDescription,
        "assignees": ["kudums"],
        "labels": ["bug"]
      })
    }).then((response) => {
      response.json().then(response => {
        var successMsg = 'Issue created with issue number - ' + response.number + " and its current status is " + response.state;
        document.getElementById('issueNameInpop').innerHTML = successMsg;
      }).catch(function () {
        console.log("Github responded successfully but there is some problem in parsing response...");
      });
    }).catch(function () {
      console.log("There is some error in github api call...");
    });
  }
}

//get issues

function getIssuesQuery() {
  document.getElementById("crateIssueDiv").style.display = "none";
  document.getElementById("editIssueDiv").style.display = "none";
  document.getElementById("getIssueDetailsDiv").style.display = "block";

  var text = document.getElementById('getIssueQuery').value;
  var recastAPIurl = 'https://api.recast.ai/v2/request?text=';
  fetch(recastAPIurl + text, {
    method: "post",
    headers: {
      'Authorization': 'Token 1f42a05c3cd798f49fa4dc56a3124220',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    response.json().then(response => {
      repoName = response.results.entities.repository[0].value;
      console.log(repoName);
      document.getElementById("getIssuesInRepo").value = repoName;
    }).catch(function () {
      console.log("There is some error in resolving name of repository from sentence...");
    });
  }).catch(function () {
    console.log("There is some error in recast.ai api call...");
  });

}


function getIssuefromRepo() {
  //call github api to fetch all issue for a repository. 
  const issueInRepository = document.getElementById('getIssuesInRepo').value;
  const issueNo = document.getElementById('target').value;
  var uri = "null";

  if (issueInRepository === "" || issueInRepository == null || issueInRepository == 0 || issueInRepository == "undefined") {
    document.getElementById('issueNameInpop').innerHTML = "Invalid values entered";
  }
  if (issueNo === "" || issueNo == null || issueNo == 0 || issueNo == "undefined" || issueNo == "all") {
    uri = 'https://api.github.com/repos/kudums/' + issueInRepository + '/issues';
  }
  else {
    uri = 'https://api.github.com/repos/kudums/' + issueInRepository + '/issues/' + issueNo;
  }

  fetch(uri, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
    }
  }).then(response => {
    response.json().then(res => {
      //display all issues           
      var table = document.getElementById('IssueDetails');
      var thead = document.getElementById('getIssueHeader');
      var thr = document.createElement('tr');
      var thd1 = document.createElement('th');
      var thd2 = document.createElement('th');
      var thd3 = document.createElement('th');
      var headeCol1 = document.createTextNode("Id");
      var headeCol2 = document.createTextNode("Name");
      var headeCol3 = document.createTextNode("Status");

      thd1.appendChild(headeCol1);
      thd2.appendChild(headeCol2);
      thd3.appendChild(headeCol3);

      thr.appendChild(thd1);
      thr.appendChild(thd2);
      thr.appendChild(thd3);


      thead.appendChild(thr);
      table.appendChild(thr);

      var tbody = document.createElement('tbody');

      for (var i = 0; i < res.length; i++) {
        var tr = document.createElement('tr');

        var td1 = document.createElement('td');
        var td2 = document.createElement('td');
        var td3 = document.createElement('td');


        var issueNo = document.createTextNode(res[i].number);
        var issueTitle = document.createTextNode(res[i].title);
        var issueStatus = document.createTextNode(res[i].state);

        td1.appendChild(issueNo);
        td2.appendChild(issueTitle);
        td3.appendChild(issueStatus);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);

        tbody.appendChild(tr);
      }
      table.appendChild(tbody);
    }).catch(function () {
      console.log("Github responded successfully but there is some problem in parsing response...");
    });
  }).catch(function () {
    console.log("There is some error in github api call...");
  });
}

//edit Issue
function editIssueQuerySubmit() {
  document.getElementById("crateIssueDiv").style.display = "none";
  document.getElementById("editIssueDiv").style.display = "block";
  document.getElementById("getIssueDetailsDiv").style.display = "none";

  var text = document.getElementById('editIssueQuerySubmit').value;
  var recastAPIurl = 'https://api.recast.ai/v2/request?text=';
  fetch(recastAPIurl + text, {
    method: "post",
    headers: {
      'Authorization': 'Token 1f42a05c3cd798f49fa4dc56a3124220',
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    response.json().then(response => {
      issueNo = response.results.entities.number[0].scalar;
      repoName = response.results.entities.repository[0].value;
      console.log(repoName);
      document.getElementById("editIssueInRepo").value = repoName;
      document.getElementById("issueNo").value = issueNo;
    }).catch(function () {
      console.log("There is some error in resolving name of repository from sentence...");
    });
  }).catch(function () {
    console.log("There is some error in recast.ai api call...");
  });
}

function editStatusOnGithub() {
  const editIssueInRepo = document.getElementById('editIssueInRepo').value;
  const issueNo = document.getElementById('issueNo').value;
  var selectedStatus = 'close';
  if (document.getElementById('open').checked) { selectedStatus = 'open'; }
  else { selectedStatus = 'close'; }
  const uri = 'https://api.github.com/repos/kudums/' + editIssueInRepo + '/issues/' + issueNo;

  if (editIssueInRepo === "" || editIssueInRepo == null || editIssueInRepo == 0 || editIssueInRepo == "undefined" ||
    issueNo === "" || issueNo == null || issueNo == 0 || issueNo == "undefined" || selectedStatus == "undefined") {
    document.getElementById('editedIssueInpop').innerHTML = "Invalid values entered";
  }
  else {
    fetch('https://api.github.com/repos/kudums/' + editIssueInRepo + '/issues/' + issueNo, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
      }
    }).then(response => {
      return response.json()
    }).then(res => {
      if (res.state == "open" && selectedStatus == "close") {
        fetch(uri, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
          },
          body: JSON.stringify({
            "state": "close"
          })
        }).then((response) => {
          response.json().then(response => {
            document.getElementById('editedIssueInpop').innerHTML = 'Issue number - ' + response.number + "  current status is " + response.state;
          }).catch(function () {
            console.log("Github responded successfully but there is some problem in parsing response...");
          });
        }).catch(function () {
          console.log("There is some error in github api call...");
        });
      }
      else if (res.state == "close" && selectedStatus == "open") {
        fetch(uri, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'token aac192228c2a21e2ca091ed81f43c0e5ac1e6412'
          },
          body: JSON.stringify({
            "state": "open"
          })
        }).then((response) => {
          response.json().then(response => {
            document.getElementById('editedIssueInpop').innerHTML = 'Issue number - ' + response.number + "  current status is " + response.state;
          }).catch(function () {
            console.log("Github responded successfully but there is some problem in parsing response...");
          });
        }).catch(function () {
          console.log("There is some error in github api call...");
        });

      }
      else {
        document.getElementById('editedIssueInpop').innerHTML = 'Issue number - ' + issueNo + " is already in status --" + selectedStatus;
      }
    }).catch(function () {
      console.log("Github responded successfully but there is some problem in parsing response...");
    }).catch(function () {
      console.log("There is some error in github api call...");
    });

  }
}


