'use strict'

const fb = require('./facebook')
const apiai = require('./apiai')
const botList = require('./bot_list')

module.exports.handle = function (sender, params) {
  // implement browse
  botList.listCategories().then(function (categories) {
    let items = JSON.parse(JSON.stringify(categories))

    let buttons = []
    for(var i = 0; i < 10; i++) {
        console.log(item[i].key);
        let button = fb.generateQuickReplyButton(item[i].key, JSON.stringify({action: item[i].key}))
        buttons.push(button)
    }

    fb.sendQuickReply(sender, 'Choose your categories?', buttons)
  })
}
