'use strict'

const controller = require('../controllers/bot_list')

module.exports = function (app) {
  app.get('/crawl', controller.importBotList)
}
