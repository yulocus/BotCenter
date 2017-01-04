'use strict'

const browseCategories = require('./browse_categories')

exports.handle = function (sender, payload) {
  console.log('paylaod: ' + payload)
  let isJson = isJsonString(payload)

  let action
  let params

  if (isJson) {
    params = JSON.parse(payload)
    action = params.action
  } else {
    console.log('payload is not json')
    return
  }

  if (action === 'more_categories') {
    browseCategories.showMore(sender, payload)
  }
}

function isJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
