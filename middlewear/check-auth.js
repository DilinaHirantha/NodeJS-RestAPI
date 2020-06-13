const jwt = require('jsonwebtoken');
const User = require('../model/user');
const mongoose = require('mongoose');
process.env.JWT_KEY = "secret";


module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]; //SPLIT_THE_HEADERS_bY_WHITESPACES_&_GET_FIRST_INDEX
        const decode = jwt.verify(token, process.env.JWT_KEY);
        const userId =  mongoose.Types.ObjectId(decode.userId);
        User.findById(userId)
            .then(user=>{
                req.user = user;
                console.log('Auth successful!'+ ' '+ req.user.name);
                next();
            });

    } catch (error) {
        console.log('Auth failed');
    }
}
