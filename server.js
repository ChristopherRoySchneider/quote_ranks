
var express = require('express');
var app = express();
require('./server/config/mongoose')
var session = require('express-session');
app.use(session({
    secret: 'srdtfyguh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));

const flash = require('express-flash');
app.use(flash());

// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 
// Require path
var path = require('path');
// Setting our Static Folder Directory
// app.use(express.static(path.join(__dirname, './client/static')));

app.use(express.static(path.join(__dirname, './public/dist/public')));

// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './client/views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');

// Routes
// require('./server/config/user_routes.js')(app)
// require('./server/config/tenrec_routes.js')(app)
require('./server/config/cake_routes.js')(app)

app.listen(8000, function () {
    console.log("listening on port 8000");
})
