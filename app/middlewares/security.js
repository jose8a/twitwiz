// ===================================================
// -- IMPORTS
// ===================================================
//xx-- require('dotenv').config();
var cors = require('cors');
var csrf = require('csurf');                // TODO: logic
var helmet = require('helmet');

// ===================================================
// -- Security
// ===================================================
var securify = function(app) {
  app.use(helmet());
  app.use(cors());
}

module.exports = securify;
