document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');

    // ボタンをクリックした時の動作
    startButton.addEventListener('click', () => {
        console.log("スタートボタンが押されました");
        
        // 1. スタート画面を非表示にする
        startScreen.style.display = 'none';

        // 2. 次の画面を表示する処理（次に作ります）
        // 例: document.getElementById('select-screen').style.display = 'flex';
        
        alert("次はキャラクター選択画面へ移ります！"); // 確認用
    });
});