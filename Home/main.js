const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const citiesAndDate = require('./Api/controller/getApi')
const cors = require('cors');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true,
    defer: true
}));

app.use(express.json());
app.use(express.urlencoded({
    extended:false
}));
app.use(cors());

app.use('/',citiesAndDate)

app.listen(5000,()=>{console.log("success")})