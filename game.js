var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var gameStarted = false;
var level = 0;

function startGame() {
    if (!gameStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStarted = true;
    }
}

$(document).on("keydown", startGame);

$(document).on("click touchstart", function(event) {
    if (!gameStarted) {
        startGame();
    }
});

$(".btn").on("click touchstart", function(event) {
    event.stopPropagation();
    
    if (event.type === "touchstart") {
        $(this).off("click");
    }

    if (!gameStarted) return;

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Tap Screen to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play().catch(function(error) {
        console.log("Audio play failed: ", error);
    });
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    gamePattern = [];
    gameStarted = false;
}