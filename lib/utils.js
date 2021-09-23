var toString = Object.prototype.toString

function isUndefined (val) {
  return typeof val === 'undefined'
}

function isPlainObject (val) {
  return toString.call(val) === '[object Object]'
}

function isArray (val) {
  return toString.call(val) === '[object Array]'
}

function forEach (obj, fn) {
  if (obj === null || typeof obj == 'undefined') {
    return;
  }

  if (typeof obj !== 'object') {
    obj = [obj]
  }
  // TODO
  if (isArray(obj)) {
    for (var i = 0, l = obj.length;i < l;i++) {
      fn.call(null, obj[i], i, obj)
    }
  }
}

function extend (a, b, thisArg) {
  Object.keys(b).forEach(item => {
    console.log(item);
    if (thisArg && typeof b[item] === 'function') {
      a[item] = b[item].bind(thisArg)
    } else {
      a[item] = b[item]
    }
  })
  return a
}

module.exports = {
  extend: extend,
  forEach: forEach,
  isUndefined: isUndefined
}