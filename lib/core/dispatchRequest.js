var defaults = require('../defaults')
var utils = require('../utils')
var transformData = require('./transformData')

module.exports = function dispatchRequest (config) {
  config.headers = config.headers || {}
  config.headers = utils.merge(
    config.headers[config.method] || {},
    config.headers
  )

  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  )

  var adapter = defaults.adapter
  return adapter(config).then(function onAdapterResolution (response) {
    return response
  }, function onAdapterRejection (reason) {
    return reason
   })
}