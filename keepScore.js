var BigRedButton = require('big-red-button');
var score = {
  white: 0,
  blue: 0,
}

var init = function() {
  var bigRedButtons = [];
  for (var i = 0; i < BigRedButton.deviceCount(); i++) {
    console.log('opening BigRedButton', i);

    bigRedButtons.push(new BigRedButton.BigRedButton(i));

    bigRedButtons[i].on('buttonPressed', function () {
      console.log('Button pressed');
      console.log(bigRedButtons[i])
    });

    bigRedButtons[i].on('buttonReleased', function () {
      console.log('Button released');
    });

    bigRedButtons[i].on('lidRaised', function () {
      console.log('Lid raised');
    });

    bigRedButtons[i].on('lidClosed', function () {
      console.log('Lid closed');
    });

  }
  console.log(bigRedButtons);

}

module.exports = init;
