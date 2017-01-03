'use strict'

const controller = require('../controllers/bot_list')

module.exports = function (app) {
  app.get('/bot_list/crawl', controller.importBotList)

  // app.get('/bot_list/categories', controller.listCategories)

  // app.get('/bot_list', controller.getBots)
}
