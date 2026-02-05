document.addEventListener('DOMContentLoaded', () => {
    // 要素を確実に取得
    const scoreElement = document.getElementById('final-score');
    const teacherImgElement = document.getElementById('result-teacher');
    
    // 1. スコアの取得（もしなければ0にする）
    const rawScore = localStorage.getItem('gameScore');
    const savedScore = (rawScore !== null) ? parseInt(rawScore) : 0;
    if (scoreElement) scoreElement.textContent = savedScore;

    // 2. 先生IDの取得（もしなければ'1'にする）
    const teacherId = localStorage.getItem('selectedTeacher') || '1';

    // 3. 先生の画像をセット（画像の存在チェック）
    const images = {
        '1': '../images/shima_touka.png',
        '2': '../images/kohi_touka.png',
        '3': '../images/shiki_touka.png',
        '4': '../images/tsubo_good.png'
    };

    if (teacherImgElement && images[teacherId]) {
        teacherImgElement.style.backgroundImage = `url('${images[teacherId]}')`;
    }

    // 4. 評価関数の実行
    evaluate(teacherId, savedScore);

    // 5. ボタンの設定
    const retryBtn = document.getElementById('retry-button');
    const titleBtn = document.getElementById('title-button');

    if (retryBtn) {
        retryBtn.addEventListener('click', () => {
            window.location.href = '../run/test.html'; // ゲーム画面へ
        });
    }
    if (titleBtn) {
        titleBtn.addEventListener('click', () => {
            window.location.href = '../start/index.html'; // タイトルへ
        });
    }
});

function evaluate(id, score) {
    const rankEl = document.getElementById('rank-badge');
    const commentEl = document.getElementById('teacher-comment');
    if (!rankEl || !commentEl) return; // 要素がなければ何もしない

    let rank = "";
    let msg = "";

    // ランクとセリフの判定（前回と同じ）
    if (score >= 50) {
        rank = "評価：運命のパートナー (Sランク)";
        const messages = { '1': "「君の走り、目が離せなかったよ」", '2': "「正解は愛だったようだ」", '3': "「幸せだ」", '4': "「二人でどこか行かない？」" };
        msg = messages[id] || "素晴らしい走りだ";
        
        // スチル表示（もし要素があれば）
        const stillOverlay = document.getElementById('still-overlay');
        if (stillOverlay) {
            stillOverlay.style.display = 'block';
            const stillImage = document.getElementById('still-image');
            const stillImages = { '1': '../images/SHIMA.png', '2': '../images/KOHI.png', '3': '../images/SHIKI.png', '4': '../images/TSUBO.png' };
            if (stillImage) stillImage.src = stillImages[id];
            stillOverlay.onclick = () => stillOverlay.style.display = 'none';
        }
    } else if (score >= 20) {
        rank = "評価：気になる教え子 (Aランク)";
        msg = "いい走りだった。次はもっと僕を見て。";
    } else {
        rank = "評価：放課後居残り確定 (Bランク)";
        msg = "もっと一緒にいたいのかい？残らせるよ。";
    }

    rankEl.textContent = rank;
    commentEl.textContent = msg;
}