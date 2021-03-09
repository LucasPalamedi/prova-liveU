const cors = require("cors");
const express = require("express");
const app = express();
//const bodyParser = require("body-parser");
const axios = require ('axios').default;
var querystring = require('querystring');
var Connection = require('tedious').Connection;
const fetch = require('node-fetch');
const jquery = require('jquery');

app.use(express.json());


//bodyParser
//app.use(bodyParser.urlencoded({extended:false}))
//app.use(bodyParser.json())

//mysql conection
var config = {
  server: "virtual2.febracorp.org.br:1433",
  options: {},
  authentication: {
    type: "default",
    options: {  
      userName: "user_trial",
      password: "7412LIVE!@#$%¨&*()",
    }
  }
};

var connection = new Connection(config);

connection.on('connect', function(err) {
  if(err) {
    console.log('Error: ', err)
  }
  // If no error, then good to go...
  executeStatement();
});



app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


//cors
app.use(cors())

//EJS
app.set('view engine', 'ejs');

app.use(express.static('css'))
app.use('/css', express.static(__dirname + '/public/style.css'))

//getInformation

function getPerson(id) {
    fetch(`virtual2.febracorp.org.br:1433`)
      .then(response => response.json())
      .then(person => console.log(person.name));
  } 
  
  getPerson(1);

// GET method route
app.get('/info', function (req, res) {
  res.send('GET request to the homepage')
})

// POST method route
     app.post('/info', function (req, res) {
      axios.post('http://138.68.29.250:8082/',
      querystring.stringify(req.body), {
        headers: { 
          "Content-Type": 'application/x-www-form-urlencoded'
        }
      })
    .then(response => res.send(response.data))
  })

app.listen(8081, function(){
    console.log("servidor rodando http://localhost:8081");
});
