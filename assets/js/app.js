"use strict";
const CONFIG = {
    links: {
        temu: "https://temu.to/k/ehsqckgdgv7",
        ad: "https://pl28602600.effectivegatecpm.com/ea/11/8e/ea118ebfb63558281df1adbb61290596.js"
    },
    tier1: ["US", "CA", "GB", "FR", "DE", "ES", "IT"]
};

let adLoaded = false;
let country = "US"; 

// 1. Geo Logic مع حماية من الفشل (Timeout Protection)
async function initGeo() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    
    try {
        let cached = sessionStorage.getItem('u_cc');
        if (cached) { country = cached; } 
        else {
            const res = await fetch('https://ipapi.co/json/', { signal: controller.signal });
            const data = await res.json();
            country = data.country_code || "US";
            sessionStorage.setItem('u_cc', country);
        }
    } catch (e) { console.log("Geo fallback"); }
    render();
}

// 2. التحميل الآمن للإعلانات (Anti-Fraud Gate)
function loadAds() {
    if (adLoaded) return;
    const s = document.createElement('script');
    s.src = CONFIG.links.ad;
    s.async = true;
    s.onerror = () => { adLoaded = false; };
    document.body.appendChild(s);
    adLoaded = true;
}

function render() {
    const b = document.getElementById('main-btn');
    if (!b) return;
    if (CONFIG.tier1.includes(country)) {
        b.href = CONFIG.links.temu;
        b.onclick = null;
    } else {
        b.onclick = (e) => {
            e.preventDefault();
            document.getElementById('locker').style.display = 'flex';
        };
    }
}

// Events
window.addEventListener('mousedown', loadAds, {once:true});
window.addEventListener('touchstart', loadAds, {once:true});
window.onload = initGeo;
