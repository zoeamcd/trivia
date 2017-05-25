/**
 * Created by h205p2 on 5/18/17.
 */
var qA = [];
var index = 0;
var answers = [];
var count = 0;
var score = 0;
$(document).ready(function() {
    $("#next").hide();
});
function start(category) {
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
        console.log(qA);
    }
}
function next(){
    answers = [qA[index][1], qA[index][2][0], qA[index][2][1], qA[index][2][2]];
    shuffle(answers);
    document.getElementById("question").innerHTML = qA[index][0];
    document.getElementById("0").innerHTML = answers[0];
    document.getElementById("1").innerHTML = answers[1];
    document.getElementById("2").innerHTML = answers[2];
    document.getElementById("3").innerHTML = answers[3];
    index++;
}
function check(answer){
    console.log(qA[index-1][1]);
    console.log(answers[answer]);
    if(answers[answer] == qA[index-1][1]){
        document.getElementById(answer).style.backgroundColor = "lightgreen";
        score++;
    }
    else {
        document.getElementById(answer).style.backgroundColor = "lightcoral";
    }
    $("#next").show();

}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
