'use strict'

const fb = require('./facebook')
const apiai = require('./apiai')

module.exports.handleApiAI = function (response, sender) {
  let responseText = response.result.fulfillment.speech
  let responseData = response.result.fulfillment.data
  let action = response.result.action
  let complete = !response.result.actionIncomplete
  let parameters = response.result.parameters
  let actionIncomplete = response.result.actionIncomplete
  let responseContexts = response.result.contexts

  if (response.result.fulfillment.messages && response.result.fulfillment.messages.length > 1 && response.result.fulfillment.messages[1].payload && response.result.fulfillment.messages[1].payload.facebook) {
    let payload = response.result.fulfillment.messages[1].payload.facebook
    fb.sendMessage(sender, payload)
  } else {
    apiai.processResponseData(sender, responseData, responseText)
  }
}
