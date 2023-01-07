const jwt = require('jsonwebtoken');
require('dotenv').config();

const protected = async (req, res) => {
    return res.json({ user: "this is protected for user" });
}




module.exports = { protected };