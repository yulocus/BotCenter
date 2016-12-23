'use strict'

const webhook = require('../controllers/webhook')

module.exports = function (app) {

  /*
 * All callbacks for Messenger are POST-ed. They will be sent to the same
 * webhook. Be sure to subscribe your app to your page to receive callbacks
 * for your page.
 * https://developers.facebook.com/docs/messenger-platform/product-overview/setup#subscribe_app
 *
 */
  app.post('/webhook', webhook.handleWebhook)

  /*
 * Use your own validation token. Check that the token used in the Webhook
 * setup is the same token used here.
 *
 */
  app.get('/webhook', webhook.checkValidationToken)
}
