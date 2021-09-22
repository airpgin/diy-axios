var dispatchRequest = require('./dispatchRequest.js')
var interceptorManager =  require('./interceptorManager')

function Axios (instanceConfig) {
  this.default = instanceConfig
  this.interceptors = {
    request: new interceptorManager(),
    response: new interceptorManager()
  }
}

Axios.prototype.request = function request (config) {
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