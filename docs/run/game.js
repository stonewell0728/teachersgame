const player = document.getElementById('player');
const scoreEl = document.getElementById('score');
const msg = document.getElementById('msg');
const container = document.getElementById('game-container');

let isPlaying = false;
let score = 0;
let gameSpeed = 6;
let yVelocity = 0;
let gravity = 0.8;
let jumpPower = -17;
let isJumping = false;
let obstacles = [];
let timer = 0;
let pressStartTime = 0;

// --- 選択画面からのキャラ画像読み込み ---
function loadCharacter() {
    const savedImg = localStorage.getItem('selectedTeacherImg');
    if (savedImg) {
        player.style.backgroundImage = `url('${savedImg}')`;
        player.style.backgroundColor = 'transparent'; // 画像がある時は背景色を消す
    }
}

// ページ読み込み時に実行
loadCharacter();

// 操作イベント
window.addEventListener('mousedown', () => {
    if (!isPlaying) { startGame(); return; }
    pressStartTime = Date.now();
    player.classList.add('sliding');
});

window.addEventListener('mouseup', () => {
    if (!isPlaying) return;
    const duration = Date.now() - pressStartTime;
    player.classList.remove('sliding');
    
    // 短く押して離した時だけジャンプ
    if (duration < 200 && !isJumping) {
        yVelocity = jumpPower;
        isJumping = true;
    }
});

function startGame() {
    isPlaying = true;
    score = 0;
    gameSpeed = 6;
    scoreEl.innerText = score;
    obstacles.forEach(o => o.el.remove());
    obstacles = [];
    msg.style.display = 'none';
    update();
}

function update() {
    if (!isPlaying) return;

    // 物理演算
    yVelocity += gravity;
    let yPos = parseFloat(player.style.bottom || 0) - yVelocity;
    
    if (yPos <= 0) {
        yPos = 0;
        yVelocity = 0;
        isJumping = false;
    }
    player.style.bottom = yPos + 'px';

    // 障害物生成
    timer++;
    if (timer > Math.max(35, 100 - gameSpeed * 3)) {
        createObstacle();
        timer = 0;
    }

    // 移動と判定
    obstacles.forEach((obs, i) => {
        obs.x -= gameSpeed;
        obs.el.style.left = obs.x + 'px';

        const pRect = player.getBoundingClientRect();
        const oRect = obs.el.getBoundingClientRect();

        // 判定
        if (pRect.left < oRect.right && pRect.right > oRect.left &&
            pRect.top < oRect.bottom && pRect.bottom > oRect.top) {
            gameOver();
        }

        // 画面外処理
        if (obs.x < -100) {
            obs.el.remove();
            obstacles.splice(i, 1);
            score++;
            scoreEl.innerText = score;
            gameSpeed += 0.1;
        }
    });

    requestAnimationFrame(update);
}

function createObstacle() {
    const type = Math.random() > 0.4 ? 'low' : 'high';
    const el = document.createElement('div');
    el.className = `obstacle obs-${type}`;
    container.appendChild(el);
    obstacles.push({ x: 800, el: el });
}

function gameOver() {
    isPlaying = false;
    msg.style.display = 'block';
    msg.innerHTML = `GAME OVER<br>Score: ${score}<br>クリックでリトライ<br><br><button onclick="location.href='index.html'" style="cursor:pointer">キャラを選び直す</button>`;
    player.classList.remove('sliding');
}