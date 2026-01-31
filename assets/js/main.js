const SITE_DATA = {
    temu: { 
        us: "https://temu.to/k/ehsqckgdgv7", 
        coupons: "https://temu.to/k/epq4u6u1fwd",
        global: "https://temu.to/k/e28np241co3"
    },
    geoTiers: ["US", "CA", "UK", "FR", "DE", "ES", "IT"],
    adsterraTag: "https://pl28602600.effectivegatecpm.com/ea/11/8e/ea118ebfb63558281df1adbb61290596.js"
};

let userCountry = "GLOBAL";
let adInjected = false;

// 1. Geo-Smart Detection
async function initEngine() {
    try {
        const res = await fetch('https://ipapi.co/json/');
        const data = await res.json();
        userCountry = data.country_code;
    } catch (e) { userCountry = "US"; }
    updateUI();
}

// 2. Conversion UI Updates
function updateUI() {
    const cta = document.getElementById('primary-cta');
    const isTier1 = SITE_DATA.geoTiers.includes(userCountry);
    
    if (isTier1) {
        cta.href = SITE_DATA.temu.us;
        cta.innerText = "Claim Free Bundle Now";
    } else {
        cta.onclick = (e) => {
            e.preventDefault();
            document.getElementById('locker').style.display = 'flex';
        };
        cta.innerText = "Unlock Special Deal";
    }
}

// 3. Adsterra One-Touch Monetization
function injectAdsterra() {
    if (!adInjected) {
        const s = document.createElement('script');
        s.src = SITE_DATA.adsterraTag;
        document.body.appendChild(s);
        adInjected = true;
    }
}

// 4. Social Proof & Scarcity
function runDynamics() {
    const proof = document.getElementById('proof-msg');
    const names = ["Alex", "Sara", "Marc", "Yuki", "Omar", "Elena"];
    setInterval(() => {
        const n = names[Math.floor(Math.random()*names.length)];
        proof.innerText = `${n} just claimed a $100 Gift Card`;
    }, 4000);
}

// 5. Security & Protection
document.addEventListener('contextmenu', e => e.preventDefault());
window.addEventListener('click', injectAdsterra, {once: true});
window.addEventListener('scroll', injectAdsterra, {once: true});
window.onload = () => { initEngine(); runDynamics(); };
