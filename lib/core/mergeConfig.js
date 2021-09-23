var utils = require('../utils')

module.exports = function mergeConfig (config1, config2) {
  var config = {}
  var valueFormConfig2Keys = ['url', 'method', 'data']
  utils.forEach(valueFormConfig2Keys, function valueFormConfig2 (prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop])
    }
  })

  // TODO
  var axiosKeys = valueFormConfig2Keys

  var otherKeys = Object.keys(config1).concat(Object.keys(config2)).filter(function filterAxiosKeys (key) {
    return axiosKeys.indexOf(key) === -1
  })

  function getMergedValue (target, source) {
    return source
  }

  function mergeDeepProperties (prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop])
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop])
    }
  }

  utils.forEach(otherKeys, mergeDeepProperties)

  return config
}