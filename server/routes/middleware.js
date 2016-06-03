//  middleware.js

const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = (app, express) => {
  app.use(morgan('dev'));

  // we need this to receive the search input data from the client side
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
};
