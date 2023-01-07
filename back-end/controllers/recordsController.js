const recordModel = require("../models/recordShema");

const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRecords =  (req, res) => {
     recordModel.find()
     .then((getData)=>{
        res.json(getData)
     })
     .catch((err)=>console.log)
   
}




module.exports = { handleRecords };