document.addEventListener('DOMContentLoaded', () => {
    // 1. Before & After 인터랙티브 슬라이더 엔진
    const container = document.getElementById('photoSlider');
    const resizeImg = document.getElementById('sliderResize');
    const handle = document.getElementById('sliderHandle');
    
    if (resizeImg && container && handle) {
        const innerImg = resizeImg.querySelector('.slider-img');
        
        function updateWidth() {
            if (container && innerImg) {
                innerImg.style.width = container.offsetWidth + 'px';
            }
        }
        
        window.addEventListener('resize', updateWidth);
        updateWidth();
        
        function moveSlider(x) {
            let rect = container.getBoundingClientRect();
            let position = ((x - rect.left) / rect.width) * 100;
            
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            handle.style.left = position + '%';
            resizeImg.style.width = position + '%';
        }
        
        let isDragging = false;
        
        // 마우스 이벤트
        container.addEventListener('mousedown', (e) => { 
            isDragging = true; 
            moveSlider(e.clientX); 
        });
        window.addEventListener('mouseup', () => { isDragging = false; });
        window.addEventListener('mousemove', (e) => { 
            if (isDragging) moveSlider(e.clientX); 
        });
        
        // 모바일 터치 이벤트
        container.addEventListener('touchstart', (e) => { 
            isDragging = true; 
            moveSlider(e.touches[0].clientX); 
        }, {passive: true});
        window.addEventListener('touchend', () => { isDragging = false; });
        window.addEventListener('touchmove', (e) => { 
            if (isDragging) moveSlider(e.touches[0].clientX); 
        }, {passive: true});
    }
});

// 2. 성향 진단 테스트 선택 로직
function selectOption(choice) {
    const content = document.getElementById('quizContent');
    const result = document.getElementById('quizResult');
    const resultTitle = document.getElementById('resultTitle');
    
    if (choice === 'A') {
        resultTitle.innerHTML = "✨ '자연스러운 야외 스냅' 작가 추천!";
    } else if (choice === 'B') {
        resultTitle.innerHTML = "🖤 '모던 하이엔드 프로필' 작가 추천!";
    } else {
        resultTitle.innerHTML = "🎞️ '빈티지 필름 감성' 작가 추천!";
    }
    
    content.style.display = 'none';
    result.style.display = 'block';
}

// 3. 퀴즈 초기화 및 다시 선택 로직
function resetQuiz() {
    const content = document.getElementById('quizContent');
    const result = document.getElementById('quizResult');
    
    result.style.display = 'none';
    content.style.display = 'block';
}