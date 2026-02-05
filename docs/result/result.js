document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('final-score');
    const teacherImgElement = document.getElementById('result-teacher');
    const commentElement = document.getElementById('teacher-comment');
    
    // 1. 保存されたデータの取得
    const savedScore = parseInt(localStorage.getItem('gameScore')) || 0;
    const teacherId = localStorage.getItem('selectedTeacher') || '1';
    scoreElement.textContent = savedScore;

    // 2. 先生の画像をセット
    const images = {
        '1': '../images/shima_touka.png',
        '2': '../images/kohi_touka.png',
        '3': '../images/shiki_touka.png',
        '4': '../images/tsubo_good.png'
    };
    teacherImgElement.style.backgroundImage = `url('${images[teacherId]}')`;

    // 3. 評価とセリフの決定
    evaluate(teacherId, savedScore);

    // 4. ボタン
    document.getElementById('retry-button').addEventListener('click', () => {
        window.location.href = '../run/test.html';
    });
    document.getElementById('title-button').addEventListener('click', () => {
        window.location.href = '../start/index.html';
    });
});

function evaluate(id, score) {
    const rankEl = document.getElementById('rank-badge');
    const commentEl = document.getElementById('teacher-comment');
    let rank = "";
    let msg = "";

    // ランクの閾値設定
    function evaluate(id, score) {
        const rankEl = document.getElementById('rank-badge');
        const commentEl = document.getElementById('teacher-comment');
        const stillOverlay = document.getElementById('still-overlay');
        const stillImage = document.getElementById('still-image');
    
        let rank = "";
        let msg = "";

    // 1. スチル画像のリスト（各先生の特別な一枚を用意してください）
        const stillImages = {
            '1': '../images/SHIMA.png',
            '2': '../images/KOHI.png',
            '3': '../images/SHIKI.png',
            '4': '../images/TSUBO.png'
        };

        if (score >= 50) {
            rank = "評価：運命のパートナー (Sランク)";
            const messages = {
                '1': "「君の走り、目が離せなかったよ。ご褒美が必要かな？」",
                '2': "「完璧だね。君との方程式、正解は『愛』だったようだ。」",
                '3': "「よくやった。君の努力を一番近くで見られて幸せだ。」",
                '4': "「やるじゃん！今夜はお祝いに、二人でどこか行かない？」"
            };
            msg = messages[id];

        // --- 🌟 スチル表示ロジック ---
            if (stillImages[id]) {
                stillImage.src = stillImages[id];
                stillOverlay.classList.add('fade-in');
            
                // スチルをクリックしたら閉じる設定
                stillOverlay.onclick = () => {
                    stillOverlay.classList.remove('fade-in');
                    stillOverlay.style.display = 'none';
                };
            }
        // -------------------------
        } else if (score >= 20) {
            rank = "評価：気になる教え子 (Aランク)";
            const messages = {
                '1': "「いい走りだったぞ。次はもっと僕を見ていてくれ。」",
                '2': "「平均点以上だね。でも、僕の心はもっと揺れ動いているよ。」",
                '3': "「頑張ったな。その調子で、次も私を驚かせてくれ。」",
                '4': "「お疲れ様！君の必死な顔、ちょっと可愛かったよ。」"
            };
            msg = messages[id];
        } else {
            rank = "評価：放課後居残り確定 (Bランク)";
            const messages = {
                '1': "「おいおい、もっと僕と一緒にいたいのかい？残らせるよ？」",
                '2': "「計算外だね……。放課後、僕の部屋で特別講義だ。」",
                '3': "「疲れているのか？無理はするな。……肩、貸してやろうか。」",
                '4': "「あちゃー、間に合わなかったね。罰として、僕の荷物持ちね！」"
            };
            msg = messages[id];
        }

        rankEl.textContent = rank;
        commentEl.textContent = msg;
    }
}