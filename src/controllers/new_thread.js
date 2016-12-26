'use strict'

const fb = require('./facebook')
const apiai = require('./apiai')

module.exports.handle = function (sender, params) {

  // What type of robot are you looking for?
  //   1.Browse Categories
  // 2.My Favorite Bots
  // 3.Delete All

  let browseButton = fb.generateButton('postback', 'Browse Categories', {action: 'browse'})
  let favoriteButton = fb.generateButton('postback', 'My Favorite Bots', {action: 'my_favorite'})
  let deleteAllButton = fb.generateButton('postback', 'Delete All', {action: 'delete_all'})

  let buttons = [browseButton, favoriteButton, deleteAllButton]
  fb.sendButtonMessage(sender, 'What type of robot are you looking for?', buttons)
}
