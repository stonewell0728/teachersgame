document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.teacher-card');
    const bubble = document.getElementById('comment-bubble');
    const confirmBtn = document.getElementById('confirm-button');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            // 選択の切り替え
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');

            // 吹き出しとボタンの更新
            bubble.textContent = card.dataset.comment;
            confirmBtn.disabled = false;

            // 選択した先生を一時的に保存（次の画面に渡すため）
            localStorage.setItem('selectedTeacher', card.dataset.id);
        });
    });

    confirmBtn.addEventListener('click', () => {
        // 隣のフォルダの「走る画面」へ移動
        window.location.href = '../run/test.html';
    });
});