var qA = [];
var answers = [];
var index = 0;
var score = 0;
var seconds = 10;
var x;
var scores = localStorage.getItem("scores").split(",");
console.log(scores);
function start(difficulty) {
    index = 0;
    score = 0;
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=" + document.getElementById("category").value + "&difficulty=" + difficulty + "&type=multiple",
        type: 'GET',
        crossDomain: true,
        dataType: 'json',
        success: function (result) {
            handler(result);
        },
        error: function () {
            alert('Failed!');
        }
    });
    function handler(result) {
        for (i = 0; i < result.results.length; i++) {
            var x = [];
            x.push(result.results[i].question);
            x.push(result.results[i].correct_answer);
            x.push(result.results[i].incorrect_answers);
            qA.push(x);
        }
    }
}
function next(){
    if(index >= 10){
        for(var i=0; i<5; i++){
            if(score >= scores[i]){
                scores.splice(i,0,score);
                break;
            }
        }
        scores = scores.slice(0,5);
        console.log(scores);
        localStorage.setItem("scores",scores);
        document.getElementById("finalscore").innerHTML = "Score: " + score;
        for(var j=0; j<scores.length; j++){
            document.getElementById("score"+j).innerHTML = (j+1)+". " + scores[j];
        }
        $.mobile.changePage("#end");
    }

    answers = [qA[index][1], qA[index][2][0], qA[index][2][1], qA[index][2][2]];
    shuffle(answers);
    timer();
    document.getElementById("timer").innerHTML = 10;
    document.getElementById("score").innerHTML = score;
    document.getElementById("question").innerHTML = qA[index][0];
    document.getElementById("0").innerHTML = answers[0];
    document.getElementById("1").innerHTML = answers[1];
    document.getElementById("2").innerHTML = answers[2];
    document.getElementById("3").innerHTML = answers[3];
    $('.answer').prop('disabled', false);
    $(".answer").css({"background-color":"transparent"});
    $('#next').prop('disabled', true);
    index++;
}
function check(answer){
    clearInterval(x);
    if(answers[answer] == qA[index-1][1]){
        document.getElementById(answer).style.backgroundColor = "limegreen";
        score += 10;
    }
    else{
        document.getElementById(answer).style.backgroundColor = "red";
        for(var i in answers){
            if(answers[i] == qA[index-1][1]){
                document.getElementById(i).style.backgroundColor = "limegreen";
            }
        }
    }
    document.getElementById("score").innerHTML = score;
    $('.answer').prop('disabled', true);
    $('#next').prop('disabled', false);
}
function shuffle(array) {
    var current = array.length, temporary, random;
    while (0 !== current) {
        random = Math.floor(Math.random() * current);
        current -= 1;
        temporary = array[current];
        array[current] = array[random];
        array[random] = temporary;
    }
    return array;
}
function timer() {
    timePerQ = 10;
    countDownDate = new Date().getTime();
    countDownDate += 11000;
    x = setInterval(function(){ timerCode() }, 1000);
    $("#next").click(function() {
        clearInterval(x);
        x = setInterval(function(){ timerCode() }, 1000);
    });
}
function timerCode() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
    seconds = Math.floor((distance % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = seconds;
    if (seconds <= 0) {
        clearInterval(x);
        $('.answer').prop('disabled', true);
        $('#next').prop('disabled', false);
    }
}
