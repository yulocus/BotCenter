'use strict'

const fb = require('./facebook')
const botList = require('./bot_list')

module.exports.handle = function (sender, params) {
  // implement browse
  botList.listCategories().then(function (categories) {
    let items = JSON.parse(JSON.stringify(categories))
    var buttons = []
    items.forEach(function(item) {
      console.log(item.key);
      let button = fb.generateQuickReplyButton(item.key, JSON.stringify({action: item.key}))
      buttons.push(button)
    })

    console.log(items.size());
    fb.sendQuickReply(sender, 'Choose your categories?', buttons)
  })
}
