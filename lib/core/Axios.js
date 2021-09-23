var dispatchRequest = require('./dispatchRequest')
var interceptorManager =  require('./interceptorManager')
var mergeConfig = require('./mergeConfig')
var utils = require('../utils')

function Axios (instanceConfig) {
  this.defaults = instanceConfig
  this.interceptors = {
    request: new interceptorManager(),
    response: new interceptorManager()
  }
}

Axios.prototype.request = function request (config) {
  debugger
  config = mergeConfig(this.defaults, config)
  debugger
  console.log('0000000');
  console.log(config);
  console.log('0000000');
  var promise
  promise = Promise.resolve(config)
  var requestInterceptorChain = []
  var responseInterceptorChain = []
  this.interceptors.request.handlers.forEach(interceptor => {
    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected)
  })
  this.interceptors.response.handlers.forEach(interceptor => {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected)
  })
  var chain = [dispatchRequest, undefined]
  Array.prototype.unshift.apply(chain, requestInterceptorChain)
  Array.prototype.push.apply(chain, responseInterceptorChain)
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
  return promise
}

// Axios.prototype.get = function (config) {
//   console.log(config);
//   console.log('get方法被调用');
// }

utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData (method) {
  Axios.prototype[method] = function (url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }))
  }
})

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData (method) {
  Axios.prototype[method] = function (url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }))
  }
})

Axios.prototype.getUri = function getUri(config) {
  console.log('getUri()', config);
}

module.exports = Axios