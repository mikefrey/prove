/*!
 * prove - syntactic sugar on top of is
 * https://github.com/mikefrey/prove
 * copyright Mike Frey 2013
 * MIT License
 *
 * Usage:
 *  var prove = require('prove')
 *  prove(someValue).is('present integer greaterThan(5) range(1,10)').isnt('string').errors
 *
 */


!function (name, definition) {
  if (typeof module != 'undefined') module.exports = definition()
  else if (typeof define == 'function' && typeof define.amd == 'object') define(definition)
  else this[name] = definition()
}('prove', function () {

  var is = require('is-it')

  // could just split on spaces, but this should help ignore crap we don't care about
  var conditionRx = /([a-z]+(?:\((?:\s?[\-\+]?[\d\.]\,?\s?)*\))?)(?:\s?)/gi
  var methodRx = /^[a-z]+/i
  var argsRx = /([\+\-]?\d+(?:\.(?=\d)\d*)?)(?=[,\s\)])/g
  var trimRx = /(^\s+)|(\s+$)/g

  function proveIt(isisnt, conditions) {
    var condition, method, args, result
    conditions = conditions.match(conditionRx)
    for (var i = 0; i < conditions.length; i++) {
      condition = conditions[i]
      method = (condition.match(methodRx) || [])[0]
      args = condition.match(argsRx) || []
      if (method && isisnt[method]) {
        args.unshift(this.val)
        console.log('passed args', args)
        result = isisnt[method].apply(isisnt, args)
        if (!result) setError.call(this, condition)
      }
    }
  }

  function setError(condition) {
    this.errors || (this.errors = [])
    this.errors.push(condition)
  }


  var Prove = function(val) {
    if (this.constructor != Prove) return new Prove(val)
    this.val = val
    this.errors = null
  }

  var proto = Prove.prototype

  proto.is = function(conditions) {
    proveIt.call(this, is, conditions)
    return this
  }

  proto.isnt = function(conditions) {
    proveIt.call(this, is.not, conditions)
    return this
  }

  return Prove

})
