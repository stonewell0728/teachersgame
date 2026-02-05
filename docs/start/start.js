const cards = document.querySelectorAll('.teacher-card');
const bubble = document.getElementById('comment-bubble');
const confirmBtn = document.getElementById('confirm-button');
let selectedImg = "";

cards.forEach(card => {
    card.addEventListener('click', () => {
        // 全カードから選択クラスを外す
        cards.forEach(c => c.classList.remove('selected'));
        // クリックしたカードを選択状態にする
        card.classList.add('selected');
        
        // データの取得
        const name = card.querySelector('.teacher-name').innerText;
        const comment = card.getAttribute('data-comment');
        selectedImg = card.querySelector('.teacher-img').getAttribute('src');
        
        // UIの更新
        bubble.innerText = `${name}：${comment}`;
        confirmBtn.disabled = false;
        
        // 【重要】ブラウザに保存
        localStorage.setItem('selectedTeacherImg', selectedImg);
    });
});

confirmBtn.addEventListener('click', () => {
    // ゲーム画面へ移動
    window.location.href = '../run/test.html'; 
});