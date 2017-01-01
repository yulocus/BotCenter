const elasticsearch = require('elasticsearch');
const config = require('config')
const BONZAI_URL = process.env.BONSAI_URL || config.get('bonzaiUrl')

var db = new elasticsearch.Client({
  host: BONZAI_URL,
  appVersion: '2.4.0'
});

module.exports = db;