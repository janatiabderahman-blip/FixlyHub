const SITE_DATA = {
    ad: "https://pl28602600.effectivegatecpm.com/ea/11/8e/ea118ebfb63558281df1adbb61290596.js",
    ali: [
        "https://s.click.aliexpress.com/e/_c3OAbIL1",
        "https://s.click.aliexpress.com/e/_c2IwzuZV",
        "https://s.click.aliexpress.com/e/_c34H1lJN",
        "https://s.click.aliexpress.com/e/_c3m4lztp"
    ]
};

function injectAds() {
    const script = document.createElement('script');
    script.src = SITE_DATA.ad;
    document.body.appendChild(script);
}

window.goAli = (i) => { window.location.href = SITE_DATA.ali[i]; };
window.showLocker = () => { document.getElementById('locker-overlay').style.display = 'block'; };
window.hideLocker = () => { document.getElementById('locker-overlay').style.display = 'none'; };

window.onload = () => {
    if (navigator.language.startsWith('ar')) {
        document.body.style.direction = 'rtl';
        document.getElementById('h-title').innerText = "عروض حصرية لعام 2026";
        document.getElementById('h-p').innerText = "تم التحقق من هويتك كزائر مميز. احصل على كوبوناتك الآن.";
    }
};

document.addEventListener('touchstart', injectAds, {once: true});
document.addEventListener('mousedown', injectAds, {once: true});
