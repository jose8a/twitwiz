// == IMPORTS =======================================
require('dotenv').config();
var express = require('express');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var handleErrors = require('./app/middlewares/error-handler');
var faviconHandler = require('./app/middlewares/favicon');

// == Set Up the Application =========================
var app = express();

// == Security =======================================
var securify = require('./app/middlewares/security');
securify(app);

// == DEFAULTS =======================================
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(cookieParser());
app.use(methodOverride());

// == VIEWS ==========================================
var hbs  = require('express-handlebars');
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// == ROUTERS ========================================
var routers = require('./app/routes');
app.use('/', routers);

// == FAVICON ========================================
app.use(faviconHandler);

// == ERRORS =========================================
handleErrors(app);

// ===================================================
// -- Start Listening for Requests
// ===================================================
var port = (process.env.PORT | '4500');

listener = app.listen(port, function () {
  console.log('PORT ' + port + ': UP --> Now Taking Requests!');
});

