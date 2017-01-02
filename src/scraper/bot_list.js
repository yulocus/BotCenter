'use strict'

var Promise = require('bluebird')
var cheerio = require('cheerio')
var fetch = require('node-fetch')
var _ = require('lodash')
var baseUrl = 'https://botlist.co/platforms/13-messenger?category=&page='

module.exports.getBotList = function (page) {
  let url = baseUrl + page

  console.log('page:' + page)

  verifyUrl(url)

  return fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }
  }).then((res) => {
    return res.text()
  }).then((html) => {

    let $ = cheerio.load(html)
    let botlist = $('div.col-md-12', '.row.bot-list')
    // let bots = botlist[1]
    // $('div.col-md-12')
    console.log('length:' + botlist.length)

    if (!botlist || botlist.length === 0) {
      return []
    }

    let bots = []
    botlist.each(function (index, bot) {
      let img = $(this).find('.fill.avatar').attr('src')
      let detailUrl = $(this).find('a').attr('href')
      let name = $(this).find('h2 a').text()

      let botDetail = {img, detail_url: detailUrl, name}

      bots.push(botDetail)
    })

    return Promise.map(bots, function (bot) {
      return getDetail(bot)
    })
  }, function (err) {
    console.log(err)
  })
}

function getDetail (bot) {
  verifyUrl(bot.detail_url)
  let url = bot.detail_url

  return fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
    }
  }).then((res) => {
    return res.text()
  }).then((html) => {

    let $ = cheerio.load(html)
    let desc = $('.cms-content').text().trim().replace(/\t|\n|\r/g, '')
    let categories = []
    let cats = $('.categories a')

    cats.each(function (index, cat) {
      categories.push($(this).text())
    })

    let messengerLink = $('ul.bot-platforms.list-inline a.platform-button').attr('href')
    let splits = bot.detail_url.split('/')

    bot.categories = categories
    bot.desc = desc
    bot.url = messengerLink
    bot.id = splits[splits.length - 1]

    return bot
  }, function (err) {
    console.log(err)
  })
}

function verifyUrl (url) {
  if (!url) {
    var err = 'url cannot be empty'
    console.error(err)
    throw new Error(err)
  }

//   console.log('scrape url:' + url)
}
