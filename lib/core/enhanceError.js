module.exports = function enhanceError (error, config, code, request, response) {
  if (code) {
    error.code = code
  }
  error.request = request
  error.response = response
  error.isAxiosError = true

  error.toJSON = function toJSON () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: this.config,
      code: this.code
    }
  }
  return error
}