console.log("Raghu welcomes you to the Simon Game !");

var buttonColors = ["red", "blue", "green", "yellow"];
var randomChosenColor;
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

$("body").keypress(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

// for mobile phone
$("body").click(function() {
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length -1);
});

function nextSequence() {
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level " + level);
    // Creating random numbers
    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);

    randomChosenColor = buttonColors[randomNumber];
    // console.log(randomChosenColor);

    gamePattern.push(randomChosenColor);
    // console.log(gamePattern);

    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(name) {
    var colorSound = new Audio("sounds\\" + name + ".mp3");
    colorSound.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    started = false;
    nextSequence();   
}

function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("success");
   
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function() {
                nextSequence();
            }, 1000); 
        }
    }else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
            $("#level-title").text("Game Over, Press to Restart");

        }, 200);
        
        $("body").keypress(function() {
            startOver();
        });
        $("body").click(function() {
            startOver();
        });
    }
}

