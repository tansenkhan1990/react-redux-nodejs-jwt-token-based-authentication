const express = require("express");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
var cors = require('cors')
require('dotenv').config();
const verifyJWT = require('./middleware/verifyJwt');
const port = process.env.PORT;
var bodyParser = require('body-parser');
const mongoose = require("mongoose");
const recordModel = require("./models/recordShema");
const connection = require("./connection/connection");
var app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
 // those routes are for authentication with jwt token
app.use('/auth', require('./routes/auth'));
app.use('/logout',verifyJWT, require('./routes/logout'));
app.use('/protected',verifyJWT, require('./routes/protected'));


app.use('/date', require('./routes/date'));
app.use('/records', require('./routes/records'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`)
})


