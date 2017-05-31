var qA = [];
var answers = [];
var index = 0;
var score = 0;
function start(difficulty) {

    var rightnow = new Date();
    console.log(rightnow);
    rightnow.setSeconds(rightnow.getSeconds() + 20);
    console.log(rightnow)

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
        countdown();
        $.mobile.changePage("#end");
        document.getElementById("final-score").innerHTML = "Score: " + score;
    }

    answers = [qA[index][1], qA[index][2][0], qA[index][2][1], qA[index][2][2]];
    shuffle(answers);
    document.getElementById("score").innerHTML = score;
    document.getElementById("question").innerHTML = qA[index][0];
    document.getElementById("0").innerHTML = answers[0];
    document.getElementById("1").innerHTML = answers[1];
    document.getElementById("2").innerHTML = answers[2];
    document.getElementById("3").innerHTML = answers[3];
    $('.answer').prop('disabled', false);
    $(".answer").css({"background-color":"transparent"});
    $('#next').prop('disabled', false);
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

function timer() {

    var timePerQ = 60;

    // Set the date we're counting down to
    var countDownDate = new Date().getTime();
    countDownDate += 20000;

// Update the count down every 1 second
    var x = setInterval(function() {

        // Get todays date and time
        var now = new Date().getTime();

        // Find the distance between now an the count down date
        var distance = countDownDate - now;

        // Time calculations for seconds
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        document.getElementById("demo").innerHTML = seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            document.getElementById("demo").innerHTML = "You're out of time! Click next for the next question";
        }
    }, 1000);
}