'use strict'

var fetch = require('node-fetch')
var _ = require('lodash')
var Promise = require('bluebird')
const elasticSearch = require('../elasticsearch')
const botlistScraper = require('../scraper/bot_list')

module.exports.listCategories = function () {
  let dsl = {
    'size': 0,
    'query': {
      'match_all': {}
    },
    'aggs': {
      'categories': {
        'terms': {
          'field': 'categories',
          'size': 0
        }
      }
    }
  }

  let searchParam = {
    index: 'bots',
    type: 'bots',
    body: dsl
  }

  return elasticSearch.search(searchParam).then(function (result) {
    return result.aggregations.categories.buckets
  }, function (err) {
    console.log(err)
  })
}

module.exports.getBots = function (category) {
  //   console.log(req.query.category)

  //   let category = req.query.category

  let dsl = {
    size: 300,
    'query': {
      bool: {
        filter: [
          {
            'match': {
              'categories': {
                'query': category,
                'operator': 'and'
              }
            }
          }
        ]
      }
    }
  }

  let searchParam = {
    index: 'bots',
    type: 'bots',
    body: dsl
  }

  return elasticSearch.search(searchParam).then(function (result) {
    let sources = _.map(result.hits.hits, function (hit) {
      return hit._source
    })

    return sources
  }, function (err) {
    console.log(err)
  })
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
