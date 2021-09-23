var utils = require('./utils')

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
}

function getDefaultAdapter () {
  var adapter
  if (typeof XMLHttpRequest !== 'undefined') {
    // 浏览器环境
    adapter = require('./adapters/xhr')
  } else {
    // 非浏览器环境
  }
  return adapter
}

var defaults = {
  name: 'defaults',
  adapter: getDefaultAdapter(),
  validateStatus: function validateStatus (status) {
    console.log('------');
    console.log(status);
    console.log('------');
    return status >= 200 && status < 300;
  },
  headers: {},
  transformRequest: [function transformRequest (data, headers) {
    if (utils.isObject(data) || (header && header['Context-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8')
      return JSON.stringify(data)
    }
    return data
  }]
}

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData (method) {
  defaults.headers[method] = {}
})

utils.forEach(['delete', 'get', 'head'], function forEachMethodWithData (method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE)
})

module.exports = defaults