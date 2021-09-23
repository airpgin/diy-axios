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
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj)
      }
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

function merge () {
  var result = {}
  function assignValue (val, key) {
    result[key] = val
  }
  for (var i = 0, l = arguments.length;i < l;i++) {
    forEach(arguments[i], assignValue);
  }
  return result
}

module.exports = {
  extend: extend,
  forEach: forEach,
  isUndefined: isUndefined,
  merge: merge
}