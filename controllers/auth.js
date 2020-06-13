const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
process.env.JWT_KEY = "secret";

exports.postSignUp = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (user) {
                return res.json({
                    message: 'User exists'
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                    } else {
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash,
                            cart: {
                                items: []
                            }
                        });
                        user.save()
                            .then(user => {
                                return res.json({
                                    message: 'Auth successful',
                                    user: user
                                });
                            })
                            .catch(err => {
                                console.log(err);
                            });
                    }
                });
            }
        })
        .catch(err => {
            return res.json({
                message: 'Auth failed'
            });
        });
}


exports.postLogin = (req, res, next) => {
    User.findOne({email: req.body.email})
        .exec()
        .then(user => {
            if (!user) {
                return res.json({
                    message: 'user doesn\'t exists'
                });
            }
            bcrypt.compare(req.body.password, user.password, (err, result) => {
                if (err) {
                    return res.json({
                        message: 'Auth failed'
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            email: user.email,
                            userId: user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        });
                    return res.json({
                        message: 'Auth successful',
                        token: token
                    });
                }
                return res.json({
                    message: 'Auth failed, Incorrect password'
                });
            });
        })
        .catch(err => {
            console.log(err);
        });
}





















