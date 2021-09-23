module.exports = function mergeConfig (config1, config2) {
  var config = {}

  Object.assign(config, config1)
  Object.assign(config, config2)

  return config
}