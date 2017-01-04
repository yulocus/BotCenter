'use strict'

const fb = require('./facebook')

module.exports.handle = function (sender, params) {
    // TODO: load more categories
    let index = params.index
    fb.sendTextMessage(sender, 'TODO: Load More Categories, current index=' + index)
}
