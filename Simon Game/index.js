var gamePattern=[];
var  userClickedPattern=[];
var gameStarted=false;
var level=0;

var buttonColors=["red", "blue", "green", "yellow" ];

function makeSound(name){
    var audio= new Audio("./sounds/"+ name+".mp3");
    audio.play();
}

function animateButton(randomChosenColour){
    $("#"+randomChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+randomChosenColour).removeClass("pressed");
    }, 100);
}

$(document).keypress(function() {
    if(!gameStarted){
    $("#level-title").text("Level "+level);
    nextSequenceAndPlay(); 
    gameStarted=true;
  }
});


  function nextSequenceAndPlay(){
    userClickedPattern=[];
    level++;
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    $("#level-title").text("Level " + level); 
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); 
    makeSound(randomChosenColour);
    }
  
  
 $(".btn").click(function(){
       var  userChosenColour =$(this).attr("id");
       userClickedPattern.push(userChosenColour);
       makeSound(userChosenColour);
       animateButton(userChosenColour);
       checkAnswer(userClickedPattern.length-1);
    })

    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length){
              setTimeout(function () {
                nextSequenceAndPlay();
              }, 1000);
            }
          } else {
            makeSound("wrong");
            $("body").addClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");
      
            setTimeout(function () {
              $("body").removeClass("game-over");
            }, 200);
      
            startOver();
          }
      }
      
function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
  }