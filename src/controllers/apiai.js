'use strict'

const apiai = require('apiai')
const fb = require('./facebook')
const genericHandler = require('./generic_handler')
const config = require('config')

const APIAI_ACCESS_TOKEN = process.env.APIAI_ACCESS_TOKEN || config.get('apiaiAccessToken')
const APIAI_LANG = process.env.APIAI_LANG || 'en'
const apiAiService = apiai(APIAI_ACCESS_TOKEN, { language: APIAI_LANG, requestSource: 'fb' })

module.exports.eventRequest = function (eventName, data, senderId) {
  console.log('eventName:' + eventName)
  console.log('data:' + data)

  try {
    var event1 = {
      name: eventName,
      data: data
    }

    let options = {
      sessionId: senderId
    }
    var request = apiAiService.eventRequest(event1, options)

    request.on('response', function (response) {
      console.log(response)
      if (isDefined(response.result)) {
        let responseText = response.result.fulfillment.speech
        let responseData = response.result.fulfillment.data
        let action = response.result.action
        let complete = !response.result.actionIncomplete
        let parameters = response.result.parameters
        let responseContexts = response.result.contexts

        console.log('action:' + action)
        console.log('response:' + responseText)

        if (action) {
          genericHandler.handle(response, senderId)
        }
      }
    })

    request.on('error', function (error) {
      console.error(error)
      fb.sendTextMessage(senderId, 'thanks for the information submitted, our operators will get in touch with you shortly to confirm the order')
    })

    request.end()
  } catch(err) {
    console.log(err)
  }
}

module.exports.textRequest = function (text, senderId) {
  let textReq = text

  if (text.length > 256) {
    let chunks = stringUtils.chunkString(text, 250)
    textReq = chunks[0]
  }

  let apiaiRequest = apiAiService.textRequest(textReq,
    {
      sessionId: senderId
    })

  apiaiRequest.on('response', (response) => {

    if (isDefined(response.result)) {
      let responseText = response.result.fulfillment.speech
      let responseData = response.result.fulfillment.data
      let action = response.result.action
      let complete = !response.result.actionIncomplete
      let parameters = response.result.parameters
      let responseContexts = response.result.contexts

      console.log('action:' + action)
      console.log('response:' + responseText)

      if (action) {
        genericHandler.handleApiAI(response, senderId)
      }
    }
  })

  apiaiRequest.on('error', (error) => {
    console.error('apiai:' + error)
    fb.sendTextMessage(senderId, error)
  })
  apiaiRequest.end()
}

module.exports.processResponseData = function (sender, responseData, responseText) {
  // console.log(responseData)

  if (isDefined(responseData) && isDefined(responseData.facebook)) {
    try {
      console.log('Response:' + responseData.facebook)
      fb.sendMessage(sender, responseData.facebook)
    } catch (err) {
      fb.sendMessage(sender, { text: err.message })
    }
  } else if (isDefined(responseText)) {
    console.log('Response:' + responseText)

    fb.sendTextMessage(sender, responseText)

    // // facebook API limit for text length is 320,
    // // so we split message if needed
    // var splittedText = splitResponse(responseText)
    // var interval = 100

  // for (var i = 0; i < splittedText.length; i++) {
  //   setTimeout(function (i) {
  //     sendTextMessage(sender, { text: splittedText[i]})
  //   }, interval * i, i)
  // }
  }
}

function isDefined (obj) {
  if (typeof obj == 'undefined') {
    return false
  }

  if (!obj) {
    return false
  }

  return obj !== null
}
