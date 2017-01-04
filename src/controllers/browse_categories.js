'use strict'

const fb = require('./facebook')
const apiai = require('./apiai')
const botList = require('./bot_list')

module.exports.handle = function (sender, params) {
  // implement browse
  botList.listCategories().then(function (categories) {
    let items = JSON.parse(JSON.stringify(categories))

    let buttons = []
    for(var i = 0; i < 8; i++) {
        console.log(items[i].key);
        let button = fb.generateQuickReplyButton(items[i].key, JSON.stringify({action: items[i].key}))
        buttons.push(button)
    }
    let buttonMore = fb.generateQuickReplyButton('More categories', JSON.stringify({action: 'more_categories'}))
    buttons.push(buttonMore)

    fb.sendQuickReply(sender, 'Choose your categories?', buttons)
  })
}

module.exports.showMore = function (sender, params) {
  //TODO: implement show more
  fb.sendMessage(sender, 'TODO: Implement')
}
