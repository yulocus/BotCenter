'use strict'

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

}

function isJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}
