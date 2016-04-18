var assert = require('assertthat');
var _ = require('lodash');

const start = timeToMin('09:00');
const finish = timeToMin('19:00');

function appoint(input) {
  var states = input.map(man => {
    var state = {};
    state.schedule = _.flatten(man).map(time => {
      return timeToMin(time);
    });
    state.head = 0;
    state.isBusy = false;

    return state;
  });

  var previousState = {
    time: start,
    busyExists: false
  };
  var currentState;
  var out = null;
  while (true) {
    currentState = step(states);
    if (currentState.time === finish) {
      break;
    }
    if ((previousState.time <= currentState.time - 60) &&
      (!previousState.busyExists)) {
      out = [
        minToTime(previousState.time),
        minToTime(previousState.time + 60)
      ];
      break;
    } else {
      previousState = currentState;
    }
  }
  return out;
}

function timeToMin(str) {
  var hs, ms;
  var splitted = str.split(':');
  hs = splitted[0];
  ms = splitted[1];
  return parseInt(hs) * 60 + parseInt(ms);
}
function minToTime(mins) {
  var hs, ms;
  hs = parseInt(mins / 60);
  ms = mins % 60;
  return (hs < 10 ? '0' : '') + hs + ':' + (ms < 10 ? '0' : '') + ms;
}

function step(states) {
  var closest = _.minBy(states, s => {
    return s.schedule[s.head] || finish;
  });
  var closestTime = closest.schedule[closest.head] || finish;

  var busyExists = false;
  states.forEach(s => {
    if (closestTime !== s.schedule[s.head]) {
      busyExists = busyExists || s.isBusy;
      return;
    }
    s.head++;
    s.isBusy = !s.isBusy;
    busyExists = busyExists || s.isBusy;
  });

  return {
    busyExists: busyExists,
    time: closestTime
  };
}

describe.only('Schedule', () => {

  it('should work on vendor\'s test', () => {
    var input = [
      [['09:00', '11:30'], ['13:30', '16:00'], ['16:00', '17:30'], ['17:45', '19:00']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
      [['11:30', '12:15'], ['15:00', '16:30'], ['17:45', '19:00']]
    ];

    var output = ['12:15', '13:15'];

    assert.that(appoint(input)).is.equalTo(output);
  });

  it('should be able to appoint null', () => {
    var input = [
      [['09:00', '18:30']],
      [['09:15', '12:00'], ['14:00', '16:30'], ['17:00', '17:30']],
      [['09:15', '12:00'], ['13:00', '16:30'], ['17:00', '17:30']],
      [['18:30', '18:55']]
    ];

    var output = null;

    assert.that(appoint(input)).is.equalTo(output);
  });

  it('should work on my test', () => {
    var input = [
      [['09:00', '10:30'], ['14:00', '18:30']],
      [['10:15', '11:45'], ['12:00', '13:00'], ['17:00', '17:30']],
      [['11:15', '12:45'], ['14:15', '15:30'], ['18:00', '18:30']],
      [['18:30', '18:55']]
    ];

    var output = ['13:00', '14:00'];

    assert.that(appoint(input)).is.equalTo(output);
  });

});
