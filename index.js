// Import required modules
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
const port = 8000;
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
app.use(express.static('./assets'))
const db = require("./config/mongoose");
const mongoose = require('mongoose')
const passport = require('passport');
const bodyParser = require('body-parser');
const base64Img = require('base64-img');
const passportLocal = require('./config/passport-local-strategy');
var cloudinary = require("cloudinary");
const flash = require('connect-flash')
const custumMware = require('./config/middleware')

// Set up middleware for parsing JSON and URL-encoded data
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(expressLayouts);
app.set('layout extractStyles',true)
app.set('layout extractScripts',true)
app.set('view engine','ejs')
app.set('views','./views')
app.use(session({
    name: 'employeeReview',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave:false,
    cookie:{
        maxAge: (1000 * 60 * 100)
    },
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setAuthenticatedUser)
app.use(flash())
app.use(custumMware.setFlash)

// Set up a basic route for the main application, using the "routes" module
app.use("/",require("./routes"))

// Set up the server to listen on the specified port
app.listen(port,function(err){
    if(err){
        console.log(`Error:${err}`)
    }
    console.log(`server is running on port ${port}`)
})