const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ShopRoute = require('./routes/shop');
const AdminRouter = require('./routes/admin');
const db = require('./utill/db');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
const User = require('./model/user');

app.use((req, res, next) => {
    User.findById("5ecbd981c62b51148cd6e052")
        .then(user => {
            req.user = user;
            next();
        }).catch(err => {
        console.log(err);
    })
});


app.use('/shop', ShopRoute);
app.use('/admin', AdminRouter);

mongoose.connect('mongodb+srv://dilina:PPW2m8PFzcKeLD0L@cluster0-25oxz.mongodb.net/shop',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        User.findOne().then(user => {
            if (!user) {
                const user = new User({
                    name: 'Dilina',
                    email: 'dilina@gmail.com',
                    password: 123,
                    cart: {
                        items: []
                    }
                });
                user.save();
            }
        })
        app.listen(3000);
        console.log('connected to port 3000!')
    })
    .catch(err => {
        console.log(err);
    });
