const dateModel = require("../models/dateSchema");

const jwt = require('jsonwebtoken');
const { response } = require("express");
const moment = require('moment')
require('dotenv').config();

const handleDate = async (req, res) => {
    let isDateInvalid = false;
    let isUnderAge = false;
    let isDataUpdated =false;
    const today = new Date();
    const {date , month ,year} = req.body;
    function daysInMonth (month, year) { 
        return new Date(year, month, 0).getDate();
      }
    const checkInputDate = daysInMonth(month, year);
    let age = today.getFullYear() - year;
    let m = today.getMonth() - month;
    if (m < 0 || (m === 0 && today.getDate() < date)) {
        age--;
    }
    if( age < 18 ){
        isUnderAge = true;
    }
    if(date > checkInputDate){
        isDateInvalid = true;
    }
    if(isUnderAge || isDateInvalid){
        res.json({isDateInvalid:isDateInvalid, isUnderAge:isUnderAge,isDataUpdated: isDataUpdated})
    } 
    else{
        await dateModel.create({
            birthday: {date: date, month: month, year:year}
          })

          res.status(200).json({ isDataUpdated: true, isDateInvalid:isDateInvalid, isUnderAge:isUnderAge });
       
    }
   
}




module.exports = { handleDate };