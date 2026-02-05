const cards = document.querySelectorAll('.teacher-card');
const bubble = document.getElementById('comment-bubble');
const confirmBtn = document.getElementById('confirm-button');
let selectedImg = "";

cards.forEach(card => {
    card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const name = card.querySelector('.teacher-name').innerText;
        const comment = card.getAttribute('data-comment');
        
        // 1. ここで「data-id」を取得する
        const teacherId = card.getAttribute('data-id'); 
        
        bubble.innerText = `${name}：${comment}`;
        confirmBtn.disabled = false;
        
        // 2. 「selectedTeacher」という名前でIDを保存する
        localStorage.setItem('selectedTeacher', teacherId);
    });
});

confirmBtn.addEventListener('click', () => {
    // ゲーム画面へ移動
    window.location.href = '../run/test.html'; 
});