var JiraApi = require('jira-client');
var jiraQuery = require('jira-query');
var fs = require('fs');
var jsonFormat = require("json-format")
// import JiraApi from 'jira-client';
 var jql='project = CSI AND status = "Inputs Required" AND "Team Assignment" = "TG Content Support Team"';
// Initialize
var jira = new JiraApi({
  protocol: 'https',
  host: 'jira.hmhco.com',
  username: 'guptahi',
  password: 'Himanshu_84',
  apiVersion: '2',
  strictSSL: true,
   fields: '*all', 
   expand: 'changelog',
   fieldsByKeys:true
});
jira.searchJira(jql)
//jira.findIssue('CSI-90929')
  .then(function(issue) {
	  var myJSON = JSON.stringify(issue);
	  console.log("typeof "+ typeof myJSON);
      console.log('Status: ' + myJSON);
	  
	  
	 var data='';
for (var i = 0; i < myJSON.length; i++) {
    data=data+myJSON[i].status+'\t'+myJSON[i].school+'\t'+myJSON[i].marks+'\n';
 }
fs.appendFile('Dependency.xls', data, (err) => {
    if (err) throw err;
    console.log('File created');
 }); 
	  
	    // fs.writeFile('data.json', myJSON, function (err) {
  // if (err) return console.log(err);
  // console.log('Hello World > data.json');
   // console.log('Status: ' + issue.fields.status.name);
// });
  })
  .catch(function(err) {
    console.error(err);
  });
  

 
// // ES6
// jira.findIssue(issueNumber)
  // .then(issue => {
    // console.log(`Status: ${issue.fields.status.name}`);
  // })
  // .catch(err => {
    // console.error(err);
  // });
 
// // ES7
// async function logIssueName() {
  // try {
    // const issue = await jira.findIssue(issueNumber);
    // console.log(`Status: ${issue.fields.status.name}`);
  // } catch (err) {
    // console.error(err);
  // }
// }