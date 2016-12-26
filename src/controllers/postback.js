'use strict'

const newThread = require('./new_thread')
const browseCategories = require('./browse_categories')
const favorite = require('./favorite')
const del = require('./delete')

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

  if (action == 'new_thread') {
    newThread.handle(sender, params)
  }else if (action == 'browse') {
    browseCategories.handle(sender, params)
  }else if (action == 'my_favorite') {
    favorite.handle(sender, params)
  }else if (action == 'delete_all') {
    del.handle(sender, params)
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
