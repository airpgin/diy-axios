var defaults = require('../defaults')
var utils = require('../utils')

module.exports = function transformData (data, headers, fns) {
  var context = this || defaults;
  utils.forEach(fns, function transform (fn) {
    data = fn.call(context, data, headers)
  })
  return data
}