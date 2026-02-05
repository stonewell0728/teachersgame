// 1. HTMLにある「スタート！」ボタンを取得する
const startButton = document.getElementById('start-button');

// 2. ボタンが存在するか確認してからイベントを登録する
if (startButton) {
    startButton.addEventListener('click', () => {
        // 隣のフォルダの「キャラクター選択画面」へ移動
        window.location.href = '../teacher_select/select.html';
    });
} else {
    console.error("スタートボタンが見つかりません。id='start-button'を確認してください。");
}