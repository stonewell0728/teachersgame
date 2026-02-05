document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');

    startButton.addEventListener('click', () => {
        // 隣のフォルダの「キャラクター選択画面」へ移動
        window.location.href = '../teacher_select/select.html';
    });
});