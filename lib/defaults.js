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
  adapter: getDefaultAdapter()
}

module.exports = defaults