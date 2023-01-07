const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogin = async (req, res) => {
    let isDateInvalid = false;
    let isUnderAge = false;
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

    const token = jwt.sign({ name: 'tansen', role: "programmer" },process.env.ACCESS_TOKEN_SECRET);
    return res
    .cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .status(200)
    .json({ access_token: token, isDateInvalid:isDateInvalid, isUnderAge:isUnderAge });
}




module.exports = { handleLogin };