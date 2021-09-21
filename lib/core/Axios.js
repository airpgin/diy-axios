var dispatchRequest = require('./dispatchRequest.js')

function Axios (instanceConfig) {
  this.default = instanceConfig
  this.interceptors = {}
}

Axios.prototype.request = function request (config) {
  console.log('Axios 的 request 方法');
  var promise
  promise = Promise.resolve(config)
  var chain = [dispatchRequest, undefined]
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
  return promise
}

Axios.prototype.get = function (config) {
  console.log(config);
  console.log('get方法被调用');
}

Axios.prototype.getUri = function getUri(config) {
  console.log('getUri()', config);
}

module.exports = Axios