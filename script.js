// ヘッダーにスクロールイベントを追加して影を付ける
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('header-shadow');
    } else {
        header.classList.remove('header-shadow');
    }
});

// モバイルメニューの開閉を制御
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true' || false;
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('-translate-y-full');
    mobileMenu.classList.toggle('translate-y-0');
});

// ドアアニメーションの開始とメインコンテンツの表示
function startDoorAnimation() {
    const loadingScreen = document.getElementById('loading-screen');
    const doorLeft = document.getElementById('door-left');
    const doorRight = document.getElementById('door-right');
    const loadingText = document.getElementById('loading-text');
    const mainContent = document.getElementById('main-content');
    
    // アニメーションを順次実行
    setTimeout(() => {
        // ドアを開く
        doorLeft.style.transform = 'translateX(-100%)';
        doorRight.style.transform = 'translateX(100%)';
        loadingText.style.opacity = 0; // テキストをフェードアウト

        // アニメーション完了後にメインコンテンツを表示
        setTimeout(() => {
            loadingScreen.style.opacity = 0;
            loadingScreen.style.visibility = 'hidden';
            mainContent.style.opacity = 1;
            document.body.style.overflow = 'auto'; // スクロールを許可
        }, 1500); // ドアが開くアニメーション時間
    }, 1000); // 1秒後にアニメーション開始
}

// ページ読み込み完了後にアニメーションを開始
window.addEventListener('load', startDoorAnimation);
