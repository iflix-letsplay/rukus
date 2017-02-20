/* global RukusApp */

module.exports = function (opts) {
  var version = opts.version || RukusApp.version
  this.message = `Welcome to Your New Rukus APP ${version}`
  this.seconds = 0
  window.setInterval(() => {
    this.seconds++
    this.update()
  }, 1000)
}
