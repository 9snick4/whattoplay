const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const app = express()

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/form.html')))
  .get('/getRate', (req,res) => res.render('pages/result', {result: calculateRate(req.query.letter, req.query.weight)}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  
  
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
     /* case 'r':
        if (weight < 1) {
          return 0.55;
        } else if (weight < 2) {
          return 0.70;
        } else if (weight < 3) {
          return 0.85;
        } else if (weight < 3.5) {
          return 1.00;
        } else return "Not applicable";*/
    }
  }