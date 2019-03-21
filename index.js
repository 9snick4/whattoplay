const connectionString = process.env.DATABASE_URL;
const express = require('express')
const path = require('path')
const { Pool } = require('pg')
const https = require('https')
const pg = new Pool({connectionString: connectionString})
const PORT = process.env.PORT || 5000
const app = express()

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/getList', listNight)
  .get('/selectGame', selectGame)
  .get('/addNight', addNight)
  .post('/insertNight', insertNight)
  .post('/publishChoice', publishChoice)
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/form.html')))
  .get('/getRate', (req,res) => res.render('pages/result', {result: calculateRate(req.query.letter, req.query.weight)}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

function addNight (req,res) {
  res.render('pages/addnight');
}
function insertNight(req,res) {
  var sql = "INSERT INTO night (hostusername, nightname, hostname, day) VALUES ($1,$2,$3,$4)";
  var values = [req.query.hostusername,req.query.nightname,req.query.hostname,req.query.day];
  console.log("values:" +  values);
  pg.query(sql,values, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
        res.status(400).send(err);
    }
    res.sendStatus(200);
});  
  
}  

function publishChoice(req,res) {
  
}


function selectGame (req, res) {
  //format request string into json object
  var night = JSON.parse(req.query.night)
  
  res.render('pages/games', {night: night})
  }
   




function calculateRate(mailType, weight) {
  switch (mailType) {
    case 's':
      if (weight < 1) {
        return 0.55;
      } else if (weight < 2) {
        return 0.70;
      } else if (weight < 3) {
        return 0.85;
      } else if (weight < 3.5) {
        return 1.00;
      } else return "Not applicable";
    case 'm':
      if (weight < 1) {
        return 0.50;
      } else if (weight < 2) {
        return 0.65;
      } else if (weight < 3) {
        return 0.80;
      } else if (weight < 3.5) {
        return 0.95;
      } else return "Not applicable";  
    case 'f':
      if (weight < 13) {
        return 1 + (0.15 * (Math.floor(weight) - 1))
      } else return "Not applicable";
    case 'r':
      if (weight < 4) {
        return 3.66;
      } else if (weight < 8) {
        return 4.39;
      } else if (weight < 12) {
        return 5.19;
      } else if (weight < 13) {
        return 5.71;
      } else return "Not applicable";
  }
}

function listNight(req, res) {

var sql = "SELECT * FROM night WHERE day > current_date";

pg.query(sql, function(err, result) {
    // If an error occurred...
    if (err) {
        console.log("Error in query: ")
        console.log(err);
        res.render ("pages/err", {error: err})
    }

    // Log this to the console for debugging purposes.
    console.log("Back from DB with result:");
    console.log(result.rows);
    res.render ("pages/nights", {result: result.rows, insert: req.query.insert})
});  
}
