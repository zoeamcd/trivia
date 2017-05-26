var qA = [];
var answers = [];
var index = 0;
var score = 0;
function start(category) {
    index = 0;
    score = 0;
    $('#start').removeClass("ui-disabled");
    $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=" + category + "&type=multiple",
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
        $.mobile.changePage("#end");
        document.getElementById("final-score").innerHTML = "Score: " + score;
    }
    answers = [qA[index][1], qA[index][2][0], qA[index][2][1], qA[index][2][2]];
    shuffle(answers);
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
