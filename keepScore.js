var BigRedButton = require('big-red-button-node-hid-2');

var score = {
  White: 0,
  Blue: 0,
}

var gameRunning = false;
var goalNumberCount = 0;

var teamWhiteButton, teamBlueButton;

var init = function() {
  teamWhiteButton = Button(0, "White");
  teamBlueButton = Button(1, "Blue");
  newGame();
}

var startGame = function() {
  if(!gameRunning){
      console.log("Starting game");
      gameRunning = true;
      resetGame()
      newGame();
  }
}

var newGoal = function(team) {
  score[team] += 1;

  var goal =  {
      team: team,
      matchGoalNumber: goalNumberCount + 1,
      score: score[team],
      timestamp: new Date().getTime()
  }
  goalNumberCount++

  console.log(goal)
  isGameFinish();
}

var newGame = function(){
  console.log("\nSTARTING NEW GAME!")
  var game = {
     w_def_first: 1,
     w_off_first: 2,
     b_def_first: 3,
     b_off_first: 4,
     timestamp: new Date().getTime()
   }
   console.log(game)
}

var resetGame = function(){
  score = {
    White: 0,
    Blue: 0,
  }
  goalNumberCount = 0;
  gameRunning = false;
}

var isGameFinish = function(){
  if(score.White == 10 || score.Blue == 10){
    console.log("\nMatch is over, score is:")
    console.log("\nWhite: " + score.Blue);
    console.log("Blue: " + score.White);
    resetGame();
    newGame();
  }
}

var Button = function(id, team){
  var teamButton = {
     button: new BigRedButton.BigRedButton(id),
     team: team,
     goal: newGoal.bind(this, team),
     closed: false,
     lastGoalTimeStamp: 0
   };
   teamButton.closed = teamButton.button.isLidDown();

  teamButton.button.on('lidRaised', function(){
    if(teamButton.closed){
        startGame();
    }
    teamButton.closed = false;
  });

  teamButton.button.on('buttonPressed', function(){
      var now = new Date().getTime();
      if(now - teamButton.lastGoalTimeStamp > 500){
        teamButton.goal()
        teamButton.lastGoalTimeStamp = now;
      }
  });

  teamButton.button.on('lidClosed', function(){
      teamButton.closed = true;
      isGameFinish();
  });

  return teamButton
}

module.exports = init;
