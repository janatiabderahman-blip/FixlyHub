"use strict";
const WORLD_CONFIG = {
    ad: "https://pl28602600.effectivegatecpm.com/ea/11/8e/ea118ebfb63558281df1adbb61290596.js",
    ali: [
        "https://s.click.aliexpress.com/e/_c3OAbIL1",
        "https://s.click.aliexpress.com/e/_c2IwzuZV",
        "https://s.click.aliexpress.com/e/_c34H1lJN",
        "https://s.click.aliexpress.com/e/_c3m4lztp"
    ],
    temu: "https://temu.to/k/ehsqckgdgv7"
};

const liveData = [
    {user: "Abdurrahman", loc: "Riyadh", reward: "$100 Gift Card"},
    {user: "Mounir", loc: "Casablanca", reward: "99% Discount Code"},
    {user: "Sami", loc: "Dubai", reward: "iPhone 15 Voucher"},
    {user: "Khaled", loc: "Kuwait", reward: "Free AliExpress Haul"}
];

function triggerSocialProof() {
    const bar = document.getElementById('notif');
    const item = liveData[Math.floor(Math.random()*liveData.length)];
    const isAr = navigator.language.startsWith('ar');
    bar.innerHTML = `<div style="background:#00c853;width:10px;height:10px;border-radius:50%"></div> <div style="font-size:12px;"><b>${item.user}</b> (${item.loc}) just claimed <b>${item.reward}</b></div>`;
    bar.style.display = 'flex';
    setTimeout(() => { bar.style.display = 'none'; }, 5000);
}

let adAuth = false;
function authAds() {
    if(adAuth) return;
    const s = document.createElement('script');
    s.src = WORLD_CONFIG.ad;
    document.body.appendChild(s);
    adAuth = true;
}

window.onload = () => {
    setInterval(triggerSocialProof, 12000);
    if(navigator.language.startsWith('ar')) {
        document.body.style.direction = 'rtl';
        document.getElementById('h-title').innerText = "منصة الجوائز السيادية 2026";
        document.getElementById('h-desc').innerText = "تم تأكيد الاتصال المشفر. اختر مكافأتك المخصصة أدناه.";
    }
};

window.navAli = (i) => { window.location.href = WORLD_CONFIG.ali[i]; };
window.launchLocker = () => { document.getElementById('master-locker').style.display = 'block'; };
window.closeLocker = () => { document.getElementById('master-locker').style.display = 'none'; };

document.addEventListener('touchstart', authAds, {once:true});
document.addEventListener('mousedown', authAds, {once:true});
