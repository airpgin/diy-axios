var settle = require('../core/settle')

module.exports = function xhrAdapter (config) {
  return new Promise(function dispatchXhrRequest (resolve, reject) {
    var requestData = config.data
    var request = new XMLHttpRequest()
    request.open(config.method, config.url, true)

    function onloadend () {
      if (!request) {
        return;
      }

      var response = {
        data: request.response,
        status: request.status,
        statusText: request.statusText,
        headers: null,
        config: config,
        request: request
      }

      settle(resolve, reject, response)
      request = null
    }

    request.onreadystatechange = function handleLoad () {
      if (!request || request.readyState !== XMLHttpRequest.DONE) {
        return;
      }
      setTimeout(onloadend);
    }
    request.send(requestData)
  })
}