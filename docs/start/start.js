const cards = document.querySelectorAll('.teacher-card');
const bubble = document.getElementById('comment-bubble');
const confirmBtn = document.getElementById('confirm-button');
let selectedImg = "";

    startButton.addEventListener('click', () => {
        // 隣のフォルダの「キャラクター選択画面」へ移動
        window.location.href = '../teacher_select/select.html';
    });


confirmBtn.addEventListener('click', () => {
    // ゲーム画面へ移動
    window.location.href = '../run/test.html'; 
});