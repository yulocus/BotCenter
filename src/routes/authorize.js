'use strict'


const authorize = require('../controllers/authorize') 

module.exports = function(app){

  /*
   * This path is used for account linking. The account linking call-to-action
   * (sendAccountLinking) is pointed to this URL.
   *
   */
  app.get('/authorize', authorize.linkAccount);
};
