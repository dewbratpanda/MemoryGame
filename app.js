var buttonColor=["red","green","yellow","blue"];
var gamePattern=[];
var userClickPattern=[];
var level=0;


$(".btn").click(function(){

    var userChosenColour =$(this).attr("id");
    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    },100);
    
    userClickPattern.push(userChosenColour);
    $("#"+userChosenColour).fadeIn("fast").fadeOut("fast").fadeIn("fast"); 
    playSound(userChosenColour);
    checkAnswer(userClickPattern.length-1);
    
});



function nextSequence(){
    userClickPattern = [];
    var randomNumber=Math.floor(Math.random()*4);
    var randomChoosenColor=buttonColor[randomNumber];
    
    gamePattern.push(randomChoosenColor);
 
    $("#"+randomChoosenColor).fadeIn("fast").fadeOut("fast").fadeIn("fast");    
    playSound(randomChoosenColor); 
    level++;    
};

//Addind sound function in  both click and key press event

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


//detecting keypress in the body

$(document).keypress(function(){
    
    $("h1").text("Level "+level);
    
    nextSequence();

});
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] ===userClickPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {
        var audio=new Audio("sounds/wrong.mp3");
        audio.play();
      console.log("wrong");
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over,please press to Restart");
    };
   

}
