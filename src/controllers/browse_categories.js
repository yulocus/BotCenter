'use strict'

const fb = require('./facebook')
const botList = require('./bot_list')

module.exports.handle = function (sender, params) {
  // TODO: implement browse

  botList.listCategories().then(function (categories) {
    let jsonStr = JSON.stringify(categories)
    // Length of message must be less than or equal to 640
    let subStr = jsonStr.substr(0, 639)
    fb.sendTextMessage(sender, subStr)
  })
}
