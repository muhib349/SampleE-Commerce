const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
app.use( bodyParser.json() ); 

app.use(cors())
const api = require('./server/routes/api');
app.use(express.static(path.join(__dirname,'dist')));
app.use('/api',api)
app.use(bodyParser.urlencoded({ 
    extended: true
  })); 

app.listen(8080,(req, res)=>{
    console.log('Running...')
});

