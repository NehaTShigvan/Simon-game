var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];
var started = false;
var level = 0;


$(document).keypress(function(){
    if(started===false){
        nextSequence();
    }
});

$(".btn").on("click", function(){
    var userChosenColour = this.id ;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern)

    playSound(userChosenColour);
    animatePress(userChosenColour);

    var currentLevel = userClickedPattern.indexOf(userChosenColour);

    checkAnswer(currentLevel);
    
})

function nextSequence(){
    started = !started;
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);

    var button = $("#" + randomChosenColour);

    button.fadeOut(100).fadeIn(100);

    playSound(randomChosenColour)
    animatePress(randomChosenColour);

    userClickedPattern = []; //empty array for next level
}


function playSound(name){
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(() => {
        $("#" + currentColour).removeClass("pressed")
    }, 100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
          }
    }
    else{
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

function startOver(){
    level = 0;
    started = false;
    gamePattern = [];
}







// if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
//     var correct = true;
//     for(var i =0; i<gamePattern.length; i++){
//         if(userClickedPattern[i] === gamePattern[i]){
//             correct = true;
//         }
//         else{
//             correct = false;
            
//         }
//     }
//     if(correct){
//         //to move to next level
//         setTimeout(() => {
//             nextSequence();
//         }, 1000);
//     }
// }