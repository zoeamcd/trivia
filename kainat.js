/**
 * Created by h205p2 on 5/18/17.
 */
<!DOCTYPE html>
<html>
<body>

<p>Get ready to play...</p>

<div>
  <h1>Trivia!</h1>
  <p>Can you answer all questions correctly before the time runs out?</p>
</div>

<p>Let's go!</p>

<button onclick="startGame()">Start!</button>

<script>
function startGame() {
    var btn = document.createElement("BUTTON");
    document.body.appendChild(btn);
}

</body>
</html>
