'use strict;'

assert = require('assertthat');

describe('Currying', function () {
  function plus(arg) {
    return function (n) {
      return n + arg();
    }
  }

  function times(arg) {
    return function (n) {
      return n * arg();
    }
  }

  function minus(arg) {
    return function (n) {
      return n - arg();
    }
  }

  function dividedBy(arg) {
    return function (n) {
      return n / arg();
    }
  }

  function _number(n) {
    return function (arg) {
      if (arg) {
        return arg(n);
      }

      return function () {
        return n;
      }
    }
  }

  var zero = _number(0);
  var one = _number(1);
  var two = _number(2);
  var three = _number(3);
  var four = _number(4);
  var five = _number(5);
  var six = _number(6);
  var seven = _number(7);
  var eight = _number(8);
  var nine = _number(9);

  it('should perform plus', function () {
    assert.that(zero(plus(one())) === 1).is.true();
    assert.that(four(plus(nine())) === 13).is.true();
  });

  it('should perform times', function () {
    assert.that(seven(times(five())) === 35).is.true();
  });

  it('should perform minus', function () {
    assert.that(eight(minus(three())) === 5).is.true();
  });

  it('should perform dividedBy', function () {
    assert.that(six(dividedBy(two())) === 3).is.true();
  });
});
