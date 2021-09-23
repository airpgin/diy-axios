var settle = require('../core/settle')
var utils = require('../utils')


module.exports = function xhrAdapter (config) {
  return new Promise(function dispatchXhrRequest (resolve, reject) {
    var requestData = config.data
    var requestHeaders = config.headers

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

    if (config.cancelToken) {
      config.cancelToken.promise.then(function onCanceled (cancel) {
        if (!request) {
          return
        }
        request.abort()
        reject(cancel)
        request = null
      })
    }

    if ('setRequestHeader' in request) {
      console.log('setRequestHeader in request', request);
      utils.forEach(requestHeaders, function setRequestHeader (val, key) {
        if (typeof HeadersrequestData === 'undefined' && key.toLowerCase() === 'content-type') {
          delete requestHeaders[key]
        } else {
          request.setRequestHeader(key, val)
        }
      })
    }

    request.send(requestData)
  })
}