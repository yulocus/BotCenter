'use strict'

const fb = require('./facebook')

module.exports.handle = function (sender, params) {
    // TODO: load more categories
    fb.sendTextMessage(sender, 'TODO: Load More Categories')
}
