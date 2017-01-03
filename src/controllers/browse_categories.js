'use strict'

const fb = require('./facebook')
const botList = require('./bot_list')

module.exports.handle = function (sender, params) {
  // implement browse
  botList.listCategories().then(function (categories) {
    let items = JSON.parse(JSON.stringify(categories))
    var buttons = []
    // items.forEach(function(item) {
    //   console.log(item.key);
    //   let button = fb.generateQuickReplyButton(item.key, JSON.stringify({action: item.key}))
    //   buttons.push(button)
    // })

    let personal = fb.generateQuickReplyButton('text', 'Personal', JSON.stringify({action: item.key}))
    let utilities = fb.generateQuickReplyButton('text', 'Utilities', JSON.stringify({action: item.key}))
    let socialandfun = fb.generateQuickReplyButton('text', 'Social & Fun', JSON.stringify({action: item.key}))

    let buttons = [personal, utilities, socialandfun]

    fb.sendQuickReply(sender, 'Choose your categories?', buttons)
  })
}
