// Backup photo if any external image link ever fails to load
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&auto=format&fit=crop";

function handleImageError(img) {
  img.onerror = null; // Prevents infinite loops
  img.src = FALLBACK_IMAGE;
}

// Poll #1 Logic: Agree or Disagree
let agreeVotes = 142;
let disagreeVotes = 28;

function votePoll(agreed) {
  if (agreed) agreeVotes++;
  else disagreeVotes++;

  const total = agreeVotes + disagreeVotes;
  const pct = Math.round((agreeVotes / total) * 100);
  
  const resultBox = document.getElementById("poll-result");
  if (resultBox) {
    resultBox.style.display = "block";
    resultBox.innerHTML = `✅ Vote counted! <br><strong>Results:</strong> ${pct}% Agree (${agreeVotes} votes) | ${100 - pct}% Disagree (${disagreeVotes} votes)`;
  }
}

// Poll #2 Logic: Custom Course Suggestion
function submitSuggestion() {
  const input = document.getElementById("user-course-input");
  const resultBox = document.getElementById("suggestion-result");
  if (!input || !resultBox) return;

  const val = input.value.trim();
  if (val === "") {
    resultBox.style.display = "block";
    resultBox.innerText = "⚠️ Please type a course name!";
    return;
  }

  resultBox.style.display = "block";
  resultBox.innerHTML = `🌟 Thanks! Your suggestion <strong>"${val}"</strong> was added to the community queue.`;
  input.value = "";
}

// Interactive Golf Game (2D Driving Range Simulator)
let canvas, ctx;
let ballX = 35, ballY = 220;
let ballVX = 0, ballVY = 0;
let isShotActive = false;
let score = 0;

function initGame() {
  canvas = document.getElementById("game-canvas");
  if (!canvas) return;
  ctx = canvas.getContext("2d");
  drawScene();
}

function drawScene() {
  if (!ctx) return;
  
  // Sky
  ctx.fillStyle = "#0284c7";
  ctx.fillRect(0, 0, canvas.width, 160);

  // Fairway
  ctx.fillStyle = "#15803d";
  ctx.fillRect(0, 160, canvas.width, 90);

  // Tee Pad
  ctx.fillStyle = "#047857";
  ctx.fillRect(20, 222, 30, 6);

  // Targets
  drawTarget(180, 180, "150Y");
  drawTarget(320, 180, "250Y");
  drawTarget(440, 180, "350Y");

  // Ball
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(ballX, ballY, 5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTarget(x, y, label) {
  ctx.fillStyle = "#34d399";
  ctx.beginPath();
  ctx.ellipse(x, y, 20, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y - 18);
  ctx.stroke();

  ctx.fillStyle = "#ef4444";
  ctx.beginPath();
  ctx.moveTo(x, y - 18);
  ctx.lineTo(x + 10, y - 14);
  ctx.lineTo(x, y - 10);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 10px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, x, y + 16);
}

function swing() {
  if (isShotActive) return;
  ballX = 35;
  ballY = 220;
  ballVX = Math.random() * 5 + 5.5;
  ballVY = -(Math.random() * 4 + 6.5);
  isShotActive = true;
  animate();
}

function animate() {
  if (!isShotActive) return;
  ballVY += 0.25; // gravity
  ballX += ballVX;
  ballY += ballVY;

  drawScene();

  if (ballY >= 220) {
    ballY = 220;
    isShotActive = false;
    const yards = Math.floor((ballX / canvas.width) * 400);
    
    document.getElementById("last-drive").innerText = yards + " YDS";
    score += yards >= 300 ? 100 : yards >= 150 ? 50 : 20;
    document.getElementById("total-score").innerText = score;
  } else {
    requestAnimationFrame(animate);
  }
}

document.addEventListener("DOMContentLoaded", initGame);
