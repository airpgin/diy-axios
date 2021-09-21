const defaults = require('../defaults')

module.exports = function dispatchRequest (config) {
  var adapter = defaults.adapter
  return adapter(config).then(function onAdapterResolution (response) {
    return response + ' resolution'
  }, function onAdapterRejection (reason) {
    return reason + ' rejection'
   })
}