'use strict'

const fb = require('./facebook')

module.exports.handle = function (sender, params) {

    fb.sendTextMessage(sender, 'TODO: My Favorite Bots')
}