function extend (a, b, thisArg) {
  Object.keys(b).forEach(item => {
    if (thisArg && typeof b[item] === 'function') {
      a[item] = b[item].bind(thisArg)
    } else {
      a[item] = b[item]
    }
  })
  return a
}

module.exports = {
  extend: extend
}