"use strict";
const CONFIG = {
    adTag: "https://pl28602600.effectivegatecpm.com/ea/11/8e/ea118ebfb63558281df1adbb61290596.js"
};

let state = { adInjected: false };

// حقن آمن للإعلانات لمرة واحدة فقط
function injectAd() {
    if (state.adInjected) return;
    const script = document.createElement('script');
    script.src = CONFIG.adTag;
    script.async = true;
    script.onerror = () => { state.adInjected = false; };
    document.body.appendChild(script);
    state.adInjected = true;
}

// فتح الـ Locker بطريقة شرعية
window.openLocker = function(e) {
    if(e) e.preventDefault();
    const locker = document.getElementById('locker');
    if(locker) locker.style.display = 'flex';
};

// إغلاق الـ Locker
window.closeLocker = function() {
    const locker = document.getElementById('locker');
    if(locker) locker.style.display = 'none';
};

// مستمعات الأحداث الآمنة
document.addEventListener('click', injectAd, { once: true });
document.addEventListener('touchstart', injectAd, { once: true });
