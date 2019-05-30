'use strict'

/**
 * Export field config
 */

module.exports = (app) => ({
  hello: require('./hello')(app),
})
