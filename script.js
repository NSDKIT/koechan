// ヘッダーにスクロールイベントを追加して影を付ける
window.addEventListener('scroll', function () {
    const header = document.getElementById('header');
    // if (window.scrollY > 50) {
    //     header.classList.add('header-shadow');
    // } else {
    //     header.classList.remove('header-shadow');
    // }
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

// ヒーローセクションのアニメーション
function startHeroAnimation() {
    const studentIcon = document.getElementById('student-icon');
    const companyIcon = document.getElementById('company-icon');
    const titleText = document.getElementById('title-text');
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');
    const doorLeft = document.getElementById('door-left');
    const doorRight = document.getElementById('door-right');

    // 初期状態を非表示にする
    mainContent.style.opacity = 0;
    
    // SVGアイコンを生成
    function createIcon(dPath) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'w-10 h-10 text-white');
        svg.setAttribute('fill', 'currentColor');
        svg.setAttribute('viewBox', '0 0 24 24');
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', dPath);
        svg.appendChild(path);
        return svg;
    }

    const studentPath = "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z";
    const companyPath = "M12 2L2 22h20L12 2zM12 6.5l8 15H4l8-15z"; // Placeholder for a building icon
    
    // アイコンがまだなければ生成
    if (!studentIcon.querySelector('svg')) {
        studentIcon.appendChild(createIcon(studentPath));
    }
    if (!companyIcon.querySelector('svg')) {
        companyIcon.appendChild(createIcon(companyPath));
    }

    // アニメーションのシーケンス
    setTimeout(() => {
        // Step 1: 企業と学生が遠い位置から互いに近づき、すれ違う
        studentIcon.style.opacity = 1;
        companyIcon.style.opacity = 1;
        studentIcon.style.left = '80%';
        companyIcon.style.right = '80%';
        
        // スレ違いの動き
        setTimeout(() => {
            studentIcon.style.transition = 'left 1.5s ease-in-out';
            companyIcon.style.transition = 'right 1.5s ease-in-out';
            studentIcon.style.left = '20%';
            companyIcon.style.right = '20%';
            
            setTimeout(() => {
                // Step 2: マッチングして中心に寄る
                studentIcon.style.transition = 'left 1s ease-in-out, transform 1s ease-in-out';
                companyIcon.style.transition = 'right 1s ease-in-out, transform 1s ease-in-out';
                studentIcon.style.left = '48%';
                companyIcon.style.right = '48%';
                studentIcon.style.transform = 'translateX(-50%)';
                companyIcon.style.transform = 'translateX(50%)';

                setTimeout(() => {
                    // Step 3: タイトルを表示
                    studentIcon.style.opacity = 0;
                    companyIcon.style.opacity = 0;
                    titleText.style.opacity = 1;

                    setTimeout(() => {
                        // Step 4: ドアが開く
                        doorLeft.style.transform = 'translateX(-100%)';
                        doorRight.style.transform = 'translateX(100%)';
                        titleText.style.opacity = 0;

                        // Step 5: メインコンテンツを表示
                        setTimeout(() => {
                            loadingScreen.style.opacity = 0;
                            loadingScreen.style.visibility = 'hidden';
                            mainContent.style.opacity = 1;
                            document.body.style.overflow = 'auto'; // スクロールを許可
                        }, 1000); // ドアが開くアニメーション時間
                    }, 1500); // タイトル表示時間
                }, 1000); // マッチングアニメーション時間
            }, 1500); // すれ違いアニメーション時間

        }, 500); // 初期遅延
    }, 500); // 初期遅延
}

// ページ読み込み完了後にアニメーションを開始
window.addEventListener('load', startHeroAnimation);
