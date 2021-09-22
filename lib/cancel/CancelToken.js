function CancelToken (executor) {
  var resolvePromise
  this.promise = new Promise(function promiseExecutor (resolve) {
    resolvePromise = resolve
  })

  var token = this

  executor(function cancel (message) {
    // if (token.reason) {
    //   return
    // }
    resolvePromise('用户中断了该请求！')
  })
}

module.exports = CancelToken