var score1=0;
var score2=0;
var turn=1;
var flag=1;
var win=-1;
var count=0;
var matrix=[
    [-1,-1,-1],
    [-1,-1,-1],
    [-1,-1,-1]
];
//sounds
var x_audio = new Audio('Sounds/x-sound.MP3');
var o_audio = new Audio('Sounds/o-sound.MP3');
var new_game_audio = new Audio('Sounds/new-game-sound.mp3');
var reset_game_audio = new Audio('Sounds/reset-game-sound.MP3');
var win_audio = new Audio('Sounds/win-sound.MP3');
var draw_sound=new Audio('Sounds/draw-sound.MP3');
var background_audio = new Audio('Sounds/background-sound.MP3');
$(document).on("click",function(){
  background_audio.play();
  background_audio.loop=true;
})
// user click
function PlayerAction(event,row,col){
    if(event.innerHTML!="") return;
    if(win!=-1) return;
    matrix[row][col]=turn;
    count++;
if(turn==1)
{
    event.innerHTML="X"
    turn=2;
    x_audio.play();   
}
else if(turn==2){
    event.innerHTML="O";
    event.style.color="#126e82";
    turn=1;
    o_audio.play();   
}
for(var i=0;i<3;i++)
{// cheaking winner row and column
    if(matrix[i][0]==matrix[i][1] && matrix[i][1]==matrix[i][2]){
       win=matrix[i][0];
       break;
    }
    if(matrix[0][i]==matrix[1][i] && matrix[1][i]==matrix[2][i]){
       win=matrix[0][i];
       break;
    }
}
 
//cheaking winner in diagonal
if(matrix[0][0]==matrix[1][1] && matrix[1][1]==matrix[2][2]) win=matrix[0][0];
if(matrix[0][2]==matrix[1][1] && matrix[1][1]==matrix[2][0]) win=matrix[0][2];

//announceing the winner
if(win!=-1)
{ win_audio.play();
  
  //updating the score
  if(win==1) score1++;
  if(win==2) score2++;

  $("#msg").html("Player "+win+" has won the game!!🥳🥳🎉");
  $("#msg").addClass("Announce");
  setTimeout(function(){
$("#msg").removeClass("Announce");
$("#msg").html("");
$(".Score_1").html(score1);
$(".Score_2").html(score2);
  },3000);
}

if(count==9&&win==-1)
{
    $("#msg").html("It's a Draw!!😓😓");
    draw_sound.play();
    $("#msg").addClass("Announce");
    setTimeout(function(){
  $("#msg").removeClass("Announce");
  $("#msg").html("");
    },3000);
}
//ending playerAction
}


//new game
function Newgame(){
  if(flag!=0) new_game_audio.play();
  flag=1;
  $(".block").html("");
  $(".block").css("color","white");
  win=-1;
  count=0;
  turn=1;
for(var i=0;i<3;i++)
{
  for(var j=0;j<3;j++)
  {
    matrix[i][j]=-1;
  }
}
}
// restart game
function ResetGame(){
  flag=0;
  reset_game_audio.play();
  Newgame();
  score1=0;
  score2=0;
  $(".Score_1").html(score1);
  $(".Score_2").html(score2);
}




