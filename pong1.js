function Ball() {
  this.id = "ball";
  this.x = 670;
  this.y = 365;
  this.vx = 5;
  this.vy = 5;
}

function Paddle(name) {
  this.id = name;
  this.y = 300;
  this.vy = 8;
}

function place_objects(objects) {
  for (let object of objects) {
    let element = document.getElementById(object.id);
    element.style.left = object.x + "px";
    element.style.top = object.y + "px";
  }
}

function update() {
  let body = document.body.getBoundingClientRect();
  if (paddle1.y < 0) {
    paddle1.y = 0;
  }
  if (paddle2.y < 0) {
    paddle2.y = 0;
  }
  if (paddle1.y > body.height - 192) {
    paddle1.y = body.height - 192;
  }
  if (paddle2.y > body.height - 192) {
    paddle2.y = body.height - 192;
  }
  if (buttons.p1_down) {
    paddle1.y += paddle1.vy;
  }
  if (buttons.p1_up) {
    paddle1.y -= paddle1.vy;
  }
  if (buttons.p2_down) {
    paddle2.y += paddle2.vy;
  }
  if (buttons.p2_up) {
    paddle2.y -= paddle2.vy;
  }
  if (ball.x < 0 && ball.y < paddle1.y + 192 && ball.y > paddle1.y) {
    ball.vx = -ball.vx;
  }
  if (
    ball.x > body.width - 64 &&
    ball.y < paddle2.y + 192 &&
    ball.y > paddle2.y
  ) {
    ball.vx = -ball.vx;
  }
  if (ball.y < 0 || ball.y > body.height - 64) {
    ball.vy = -ball.vy;
  }
  ball.x += ball.vx;
  ball.y += ball.vy;
  if (ball.x < -64) {
    score2++;
    goal();
  }
  if (ball.x > body.width) {
    score1++;
    goal();
  }
  place_objects([ball, paddle1, paddle2]);
  document.getElementById("score1").innerHTML = score1.toString();
  document.getElementById("score2").innerHTML = score2.toString();
  win(score1, score2);
}

let ball;
let paddle1;
let paddle2;
let buttons = {
  p1_up: false,
  p1_down: false,
  p2_up: false,
  p2_down: false,
};
let score1;
let score2;

function init() {
  ball = new Ball();
  paddle1 = new Paddle("paddle1");
  paddle2 = new Paddle("paddle2");
  score1 = 0;
  score2 = 0;
  setInterval(update, 15);
}

function track_player_input(event) {
  if (event.type == "keydown") {
    switch (event.key) {
      case "a":
        buttons.p1_up = true;
        break;
      case "q":
        buttons.p1_down = true;
        break;
      case "p":
        buttons.p2_up = true;
        break;
      case "m":
        buttons.p2_down = true;
        break;
    }
  } else if (event.type == "keyup") {
    switch (event.key) {
      case "a":
        buttons.p1_up = false;
        break;
      case "q":
        buttons.p1_down = false;
        break;
      case "p":
        buttons.p2_up = false;
        break;
      case "m":
        buttons.p2_down = false;
        break;
    }
  }
}

document.addEventListener("keydown", track_player_input);
document.addEventListener("keyup", track_player_input);

function goal() {
  ball = new Ball();

  if (Math.random() < 0.5) {
    var side = 1;
  } else {
    side = -1;
  }

  ball.vx = side * (Math.random() * 5 + 3); //ajouter et diminuer la vitesse pour chaque partie
  ball.vy = Math.random() * 5 + 3;
}
function win(score1, score2) {
  if (score1 === 10) {
    init();
    prompt("player 1 is winning , click ok to restart");
  }
  if (score2 === 10) {
    prompt("player 2 is winning ,  click ok to restart");
    init();
  }
}
