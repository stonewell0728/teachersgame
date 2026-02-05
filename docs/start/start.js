// 画面が完全に読み込まれてから実行する
window.onload = function() {
    // 1. このカッコ { } の中で変数を作ります
    const startButton = document.getElementById('start-button');

    console.log("startButtonの状態:", startButton); // デバッグ用

    if (startButton) {
        startButton.addEventListener('click', () => {
            console.log("ボタンが押されました。遷移します。");
            // 【注意！】遷移先のファイル名は 'select.html' ですか？ 'index.html' ですか？
            // 前回のコードでは index.html だったので、合っている方を確認してください。
            window.location.href = '../teacher_select/select.html';
        });
    } else {
        // もしGitHub Pagesでこれが出るなら、HTMLのIDが間違っています
        console.error("エラー：HTML内に id='start-button' が見つかりません。");
    }
};