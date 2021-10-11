let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let score = 0;
let highScore = 0;
on();

$(document).keypress(function(event){
    let key = event.code;
    console.log(key);
    if(!started && key == "Enter"){
        $("#score").text("Score: " + score);
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
    off();
});

$(".enter-btn").click(function(){
    $("#score").text("Score: " + score);
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
    off();
});

$(".btn").click(function(){
    if(started){
        let userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
    
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000)
            score += level*10;
            $("#score").text("Score: " + score);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        on();
        gameOver();
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
  
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name){
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function gameOver() {
    if(score>highScore){
        highScore = score;
    }
    $("#high-score").text("Highest Score: " + highScore);
    level = 0;
    score = 0;
    gamePattern = [];
    started = false;
}

function on(){
    document.getElementById("overlay").style.display = "block";
}
  
function off(){
    document.getElementById("overlay").style.display = "none";
}
