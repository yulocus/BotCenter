'use strict'

var fetch = require('node-fetch')
var _ = require('lodash')
var Promise = require('bluebird')
const elasticSearch = require('../elasticsearch')
const botlistScraper = require('../scraper/bot_list')

module.exports.listCategories = function(){
    
}

module.exports.importBotList = function (req, res) {
  botlistScraper.getBotList(1).then(function (bots) {
    return getMoreUntilDone(bots, 1)
  })

  res.json('started')
}

function getMoreUntilDone (bots, page) {
  page++

  if (bots && bots.length > 2) {
    return indexToElasticSearch(bots).then(function () {
      return botlistScraper.getBotList(page)
    }).then(function (moreBots) {
      return getMoreUntilDone(moreBots, page)
    })
  } else {
    console.log('done')
    return new Promise(function (resolve) {
      resolve(true)
    })
  }
}

function indexToElasticSearch (bots) {
  var body = []
  _.each(bots, function (bot) {
    body.push({
      index: {
        _index: 'bots',
        _type: 'bots',
        _id: bot.id
      }
    })

    body.push(bot)
  })

  return elasticSearch.bulk({ body: body })
}
