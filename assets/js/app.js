"use strict";
const REVENUE_CORE = {
    ad: "https://pl28602600.effectivegatecpm.com/ea/11/8e/ea118ebfb63558281df1adbb61290596.js",
    ali: [
        "https://s.click.aliexpress.com/e/_c3OAbIL1",
        "https://s.click.aliexpress.com/e/_c2IwzuZV",
        "https://s.click.aliexpress.com/e/_c34H1lJN",
        "https://s.click.aliexpress.com/e/_c3m4lztp"
    ],
    temu: "https://temu.to/k/ehsqckgdgv7"
};

function initAds() {
    const s = document.createElement('script');
    s.src = REVENUE_CORE.ad;
    document.body.appendChild(s);
}

const notifications = [
    "Khaled from Kuwait just earned $150 Rewards",
    "Sarah from London claimed Free Gift",
    "Youssef from Morocco unlocked Premium Access",
    "Someone from Qatar got 99% Discount"
];

function showSocialProof() {
    const el = document.getElementById('proof');
    el.innerHTML = `<span style="color:#008060;font-weight:bold;">● LIVE:</span> ` + notifications[Math.floor(Math.random()*notifications.length)];
    el.style.display = 'flex';
    setTimeout(() => { el.style.display = 'none'; }, 5000);
}

window.onload = () => {
    setInterval(showSocialProof, 15000);
    if(navigator.language.startsWith('ar')) {
        document.body.style.direction = 'rtl';
        document.getElementById('hero-title').innerText = "منصة الجوائز العالمية 2026";
        document.getElementById('hero-desc').innerText = "تم التحقق من هويتك. العروض التالية متاحة لك الآن.";
    }
};

window.goAli = (i) => { window.location.href = REVENUE_CORE.ali[i]; };
window.openLocker = () => { document.getElementById('locker-screen').style.display = 'block'; };
window.closeLocker = () => { document.getElementById('locker-screen').style.display = 'none'; };

document.addEventListener('click', initAds, {once:true});
