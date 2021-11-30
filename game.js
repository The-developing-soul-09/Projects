var buttonColors= ["red", "blue", "green", "yellow"];
var randomPattern= [];
var userClickedpattern= [];
var level = 0;
var started= false;


$(".btn").click(function(){
    var userChosenColor= this.id;
    userClickedpattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedpattern.length - 1);
 });

function nextSequence(){
    userClickedpattern= [];
    level++;
    $("h1").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor= buttonColors[randomNumber];
    randomPattern.push(randomChosenColor);
    $(randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);
   animatePress(randomChosenColor);
}

if (!started){
    $(document).on("keydown", function(){
    nextSequence();
    $("h1").text("Level " + level);
    started= true;
});
}

function checkAnswer(currentLevel){
    if (randomPattern[currentLevel] === userClickedpattern[currentLevel]){
        console.log("Correct!");
        if (randomPattern.length === userClickedpattern.length){
            setTimeout(function(){nextSequence();}, 1000);
        }
    }
    else {
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over"), 200});
        $("h1").text("Game Over, Please Refresh the Page to Restart!");

    }

}


function playSound(name){
  var sound= new Audio("./sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(currentColor){
$("." + currentColor).addClass("pressed");
setTimeout(function(){
    $("." + currentColor).removeClass("pressed")
}, 100);
}
