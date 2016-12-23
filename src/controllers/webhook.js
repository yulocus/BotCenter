'use strict'

const config = require('config')
const request = require('request')
const facebook = require('./facebook')
const VALIDATION_TOKEN = (process.env.MESSENGER_VALIDATION_TOKEN) ?
  (process.env.MESSENGER_VALIDATION_TOKEN) :
  config.get('validationToken')

const PAGE_ACCESS_TOKEN = (process.env.MESSENGER_PAGE_ACCESS_TOKEN) ?
  (process.env.MESSENGER_PAGE_ACCESS_TOKEN) :
  config.get('pageAccessToken')

const SERVER_URL = (process.env.SERVER_URL) ?
  (process.env.SERVER_URL) :
  config.get('serverURL')

module.exports.handleWebhook = function (req, res) {
  console.log('webhook received')
  var data = req.body

  // Make sure this is a page subscription
  if (data.object == 'page') {
    // Iterate over each entry
    // There may be multiple if batched
    data.entry.forEach(function (pageEntry) {
      var pageID = pageEntry.id
      var timeOfEvent = pageEntry.time

      // Iterate over each messaging event
      pageEntry.messaging.forEach(function (messagingEvent) {
        if (messagingEvent.optin) {
          facebook.receivedAuthentication(messagingEvent)
        } else if (messagingEvent.message) {
          facebook.receivedMessage(messagingEvent)
        } else if (messagingEvent.delivery) {
          facebook.receivedDeliveryConfirmation(messagingEvent)
        } else if (messagingEvent.postback) {
          facebook.receivedPostback(messagingEvent)
        } else if (messagingEvent.read) {
          facebook.receivedMessageRead(messagingEvent)
        } else if (messagingEvent.account_linking) {
          receivedAccountLink(messagingEvent)
        } else {
          console.log('Webhook received unknown messagingEvent: ', messagingEvent)
        }
      })
    })

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know you've
    // successfully received the callback. Otherwise, the request will time out.
    res.sendStatus(200)
  }
}

module.exports.checkValidationToken = function (req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === VALIDATION_TOKEN) {
    console.log('Validating webhook')
    res.status(200).send(req.query['hub.challenge'])
  } else {
    console.error('Failed validation. Make sure the validation tokens match.')
    res.sendStatus(403)
  }
}