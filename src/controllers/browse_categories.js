'use strict'

const fb = require('./facebook')
const botList = require('./bot_list')

module.exports.handle = function (sender, params) {
  // TODO: implement browse

  botList.listCategories().then(function (categories) {
    fb.sendTextMessage(sender, JSON.stringify(categories))
  })
}
