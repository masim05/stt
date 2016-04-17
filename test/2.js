var assert = require('assertthat');

function plus(arg) {
  var value;
  if (typeof  arg === 'function') {
    value = arg();
  } else {
    value = arg;
  }
  return function (n) {
    return n + value;
  }
}

function times(arg) {
  var value;
  if (typeof  arg === 'function') {
    value = arg();
  } else {
    value = arg;
  }
  return function (n) {
    return n * value;
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

describe('Currying', function () {

  it('should perform plus', function () {
    assert.that(zero(plus(one())) === 1).is.true();
    assert.that(four(plus(nine())) === 13).is.true();
    assert.that(four(plus(four(plus(nine())))) === 17).is.true();
  });

  it('should perform times', function () {
    assert.that(seven(times(five())) === 35).is.true();
    assert.that(seven(times(seven(times(five())))) === 245).is.true();
  });

  it('should perform minus', function () {
    assert.that(eight(minus(three())) === 5).is.true();
  });

  it('should perform dividedBy', function () {
    assert.that(six(dividedBy(two())) === 3).is.true();
  });
});
