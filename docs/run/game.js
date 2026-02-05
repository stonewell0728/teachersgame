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

// --- 選択画面からのキャラ読み込み ---
function loadCharacter() {
    // 保存した名前「selectedTeacher」で読み込む
    const teacherId = localStorage.getItem('selectedTeacher');
    
    // パスを「../images/」に修正（フォルダ階層に合わせる）
    const images = {
        '1': '../images/shima_touka.png',
        '2': '../images/kohi_touka.png',
        '3': '../images/shiki_touka.png',
        '4': '../images/tsubo_good.png'
    };

    if (teacherId && images[teacherId]) {
        // 画像を適用
        player.style.backgroundImage = `url('${images[teacherId]}')`;
        // 背景色を透明にする（乙女ゲーム風なら必須！）
        player.style.backgroundColor = 'transparent'; 
    } else {
        player.style.backgroundColor = '#ffb7c5';
    }
}

loadCharacter();

// 操作
window.addEventListener('mousedown', () => {
    if (!isPlaying) { startGame(); return; }
    pressStartTime = Date.now();
    player.classList.add('sliding');
});

window.addEventListener('mouseup', () => {
    if (!isPlaying) return;
    const duration = Date.now() - pressStartTime;
    player.classList.remove('sliding');
    
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

    yVelocity += gravity;
    let yPos = parseFloat(player.style.bottom || 0) - yVelocity;
    
    if (yPos <= 0) {
        yPos = 0;
        yVelocity = 0;
        isJumping = false;
    }
    player.style.bottom = yPos + 'px';

    timer++;
    if (timer > Math.max(35, 100 - gameSpeed * 3)) {
        createObstacle();
        timer = 0;
    }

    obstacles.forEach((obs, i) => {
        obs.x -= gameSpeed;
        obs.el.style.left = obs.x + 'px';

        const pRect = player.getBoundingClientRect();
        const oRect = obs.el.getBoundingClientRect();

        if (pRect.left < oRect.right && pRect.right > oRect.left &&
            pRect.top < oRect.bottom && pRect.bottom > oRect.top) {
            gameOver();
        }

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
    localStorage.setItem('gameScore', score);
    window.location.href = '../result/result.html'; 
}