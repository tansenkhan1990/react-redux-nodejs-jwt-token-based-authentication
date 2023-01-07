const express = require("express");
const app = express();
const mongoose = require("mongoose");

//Database
const database = (module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const uri = process.env.DATABASE_CONNECTION_URL
  const connection = mongoose.connect(uri,connectionParams).then(()=>{console.log('connection succeed')})
  .catch(console.log)
});

database();

module.exports = mongoose.connection;