document.addEventListener('DOMContentLoaded', () => {
    const scoreElement = document.getElementById('final-score');
    const rankElement = document.getElementById('rank-badge');
    const retryBtn = document.getElementById('retry-button');
    const titleBtn = document.getElementById('title-button');

    // 1. 保存されたスコアを取得 (保存されていなければ0)
    const savedScore = localStorage.getItem('gameScore') || 0;
    scoreElement.textContent = savedScore;

    // 2. スコアに応じたランク判定
    evaluateRank(parseInt(savedScore));

    // 3. ボタンの動作設定
    // 「もう一度走る」 -> キャラクター選択画面 または ゲーム画面へ
    retryBtn.addEventListener('click', () => {
        window.location.href = '../teacher_select/index.html'; 
    });
    // 「タイトルへ」 -> スタート画面へ
    titleBtn.addEventListener('click', () => {
        window.location.href = '../start/index.html'; 
    });
});

// ランク判定関数
function evaluateRank(score) {
    const rankElement = document.getElementById('rank-badge');
    
    if (score >= 1000) {
        rankElement.textContent = "評価：伝説の教師 (Sランク)";
        rankElement.style.color = "#d35400"; // 濃いオレンジ
        rankElement.style.backgroundColor = "#f1c40f"; // 金背景
    } else if (score >= 500) {
        rankElement.textContent = "評価：ベテランの走り (Aランク)";
        rankElement.style.color = "#27ae60"; // 緑
    } else {
        rankElement.textContent = "評価：授業に間に合わないよ！ (Bランク)";
        rankElement.style.color = "#2c3e50"; // 黒
    }
}