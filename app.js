const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const people = require ('./people.json');
const staffMembers = require('./people.json');

app.engine('mustache', mustacheExpress());

app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.get('/morning', function (request, response) {
  response.send('Good Morning, it is now' + (new Date()))
});

app.get('/day', function (request, response) {
  response.send('Good Day to you Sir!')
});
app.get('/evening', function (request, response) {
  response.send('Good Evening to you Sir!')
});

app.get('/page_demo', function (request, response) {
  response.sendFile(__dirname + './real_webpage.html')
});

app.get('/dynamic_demo_1', function (request, response){
  response.render('dynamic_1', {word: 'Cool' });
});

app.get('/me', function (request, response){
  response.render('me', {name: 'Carlota Pearl' });
});

app.get('/people', function(request, response){
  response.render('peeps', {people: people});
});

app.get('/person_member/:name', function(request, response) {
  let person = people.find(function(member) {
    return member.name.toLowerCase() === request.params.name.toLowerCase();
  })
  response.render('person_member', person)
});

app.get('/staff', function (request, repsonse){
  response.render('staff', { people: staffMember });
});

app.get('/staff_member/:number', function (request, response) {
  let index = parseInt(request.params.number);
  response.render('staff_member', staffMember[index]);
});

app.get('/staff_member/:name', function (request, response) {
  let person = staffMembers.find(function(member) {
    return member.name.toLowerCase() === request.params.name;
  })
  response.render('staff_member', person);
});

app.listen(3000, function () {
  console.log('Express app listening on port 3000!')
});
