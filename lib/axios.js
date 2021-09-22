var defaults = require('./defaults')
var Axios = require('./core/Axios')
var utils = require('./utils')

function createInstance (defaultConfig) {
  console.log('defaultConfig', defaultConfig);
  var context = new Axios(defaultConfig)
  var instance = Axios.prototype.request.bind(context)
  utils.extend(instance, Axios.prototype, context);
  utils.extend(instance, context);
  return instance
}

var axios = createInstance(defaults)

axios.CancelToken = require('./cancel/CancelToken')

window.axios = axios
module.exports = axios;