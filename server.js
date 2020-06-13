const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const ShopRoutes = require('./routes/shop');
const AdminRoutes = require('./routes/admin');
const AuthRoutes = require('./routes/auth');
const db = require('./utill/db');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
const User = require('./model/user');

app.use('/admin', AdminRoutes);
app.use('/shop',ShopRoutes);
app.use(AuthRoutes);

mongoose.connect('mongodb+srv://dilina:PPW2m8PFzcKeLD0L@cluster0-25oxz.mongodb.net/shop',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(result => {
        app.listen(3000);
        console.log('connected to port 3000!')
    })
    .catch(err => {
        console.log(err);
    });
