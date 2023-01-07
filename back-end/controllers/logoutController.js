const verifyJWT = require('../middleware/verifyJwt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleLogout = async (req, res) => {
       
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
}

module.exports = { handleLogout };