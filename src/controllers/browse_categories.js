'use strict'

const fb = require('./facebook')

module.exports.handle = function (sender, params) {
    //TODO: implement browse

    fb.sendTextMessage(sender, 'TODO: Implement Browse')
}