'use strict;'

assert = require('assertthat');

describe('Calculator', function () {

  // One can use binary literals, thanks to ES6
  function calculate(a, b) {
    return eval('0b' + a) + eval('0b' + b);
  }

  it('should calculate 10 + 10', function () {
    assert.that(calculate('10', '10')).is.equalTo(4);
  });

  it('should calculate 10 + 0', function () {
    assert.that(calculate('10', '0')).is.equalTo(2);
  });

  it('should calculate 101 + 10', function () {
    assert.that(calculate('101', '10')).is.equalTo(7);
  });
});
