const express = require('express');
const path = require('path')
const app = express();
const cors = require('cors')

app.use(cors())
const api = require('./server/routes/api');
app.use(express.static(path.join(__dirname,'dist')));
app.use('/api',api)


app.listen(8080,(req, res)=>{
    console.log('Running...')
});

