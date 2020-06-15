const User = require('../model/user');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
process.env.JWT_KEY = "secret";
const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');

const transporter = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: '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'
    }
}));

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
                                }),
                                    transporter.sendMail({
                                        to: req.body.email,
                                        from: 'dilina.17@outlook.com',
                                        subject: 'Signup succesfully',
                                        html: '<h>You are signup Succesfully!</h>'
                                    }, (respond, err) => {
                                        if (err) {
                                            console.log(err);
                                        }
                                        console.log('Mail sent');
                                    })
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


exports.postReset = (req, res, next) => {
    const token = crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
        }
        const token = buffer.toString('hex');  //   CREATE_TOKEN_USING_BUFFER_VALUES
        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    res.json({
                        message: 'No user exists'
                    })
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 360000;
                return user.save()
                    .then(result => {
                        transporter.sendMail({
                            to: req.body.email,
                            from: 'dilina.17@outlook.com',
                            subject: 'Password Reset',
                            html: `<p>
                        You requested reset password </p> 
                        <p> Click the link to verify <a href=" http://localhost:3000/reset/${token}">link</a> </p>`
                        }, (respond, err) => {
                            if (err) {
                                console.log(err);
                            }
                            console.log('Mail sent to ' + req.body.email);
                        });
                    });
            })
            .catch(err => {
                console.log(err);
            });
    })
}

exports.verifyReset = (req, res, next) => {
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {$gt: Date.now()}})
        .then(user => {
            if (!user) {
                console.log('failed, try again');
            }

            res.json({
                message: 'Token validate',
                passwordToken: token,
                userId:user._id.toString()
            });
        })
        .catch(err => {
            console.log(err);
        });
}

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const passwordToken = req.body.passwordToken;
    const userId = req.body.userId;
    let resetUser;
    let hashedPassword;
    User.findOne({resetToken: passwordToken, resetTokenExpiration: {$gt: Date.now()}, _id: userId})
        .then(user => {
            if (!user) {
                console.log('failed, try again');
            }
            resetUser = user;
            return hashedPassword = bcrypt.hash(newPassword, 12)
                .then(hashedPassword => {
                    resetUser.password = hashedPassword;
                    resetUser.resetToken = undefined;
                    resetUser.resetTokenExpiration = undefined;
                    return resetUser.save()
                        .then(result => {
                            res.json({
                                message: 'password updated'
                            });
                        });
                });
        })
        .catch(err => {
            console.log(err);
        });
}

















