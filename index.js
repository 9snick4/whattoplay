const connectionString = process.env.DATABASE_URL;
const express = require('express')
const path = require('path')
const { Pool } = requrire('pg')
const pg = new Pool({connectionString: connectionString})
const PORT = process.env.PORT || 5000
const app = express()

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/listNight',  (req,res) => res.render('pages/nights', {result: listNight()}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
function listNight(req, res) {
  
  var sql = "SELECT * FROM night WHERE day > current_date";

  pg.query(sql, function(err, result) {
      // If an error occurred...
      if (err) {
          console.log("Error in query: ")
          console.log(err);
      }

      // Log this to the console for debugging purposes.
      console.log("Back from DB with result:");
      console.log(result.rows);


  });  
}
