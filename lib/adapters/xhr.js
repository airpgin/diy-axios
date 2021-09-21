module.exports = function xhrAdapter (config) {
  return new Promise((resolve, reject) => {
    let num = Math.random()
    if (num > 0.5) {
      console.log(num);
      resolve(num)
    } else {
      console.log(num);
      reject(num)
    }
  })
}