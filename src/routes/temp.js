'use strict'

const importer = require('../importer/bot_list')

module.exports = function (app) {
  app.get('/crawl', importer.importBotList)
}
