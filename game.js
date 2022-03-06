var btnColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameStarted = false ;
var curLevel = 0 ;
function nextSequence(){
  var randomNumber = Math.random()*4 ;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColor = btnColors[randomNumber];
  gamePattern.push(randomChosenColor);

  // make sound and animation in randomChosenColour

  $("#"+randomChosenColor).fadeIn().fadeOut().fadeIn();
  playSound(randomChosenColor);

  // reset userClickedPattern
  userClickedPattern = [] ;


// set the h1 text and curLevel
  curLevel = curLevel+1 ;
  $("h1").text("Level " +curLevel);

}

// btn clicked by user
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer( userClickedPattern.length - 1 );
});

// playSound when btn is clicked or when randomColor has been selected
function playSound(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}

// animation to the button when it is clicked
function animatePress(color){
  $("#"+color).addClass("pressed");

  setTimeout(function(){
    $("#"+color).removeClass("pressed");
  },100);
}

// key is pressed from keyboard by user
$(document).on("keydown",function(){
  if( gameStarted == false ){
    nextSequence();
  }
  gameStarted = true ;

});

// function to check answers
function checkAnswer(currentLevel){
  if( userClickedPattern[currentLevel] === gamePattern[currentLevel] ){
    console.log("success");
    if( userClickedPattern.length === gamePattern.length ){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }else{
    var score ;
    if (curLevel === 0 ) {
      score = 0 ;
    }else {
      score = curLevel-1 ;
    }
    console.log("failure");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("You Scored " +score + " ! Press Any Key to Restart.");

    startOver();
  }
}

// start Over function
function startOver(){
  curLevel = 0 ;
  gamePattern = [];
  gameStarted = false ;
}
