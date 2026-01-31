(function(){
  const config = {
    aliexpress: [
      "https://s.click.aliexpress.com/e/_c3OAbIL1",
      "https://s.click.aliexpress.com/e/_c2IwzuZV",
      "https://s.click.aliexpress.com/e/_c34H1lJN",
      "https://s.click.aliexpress.com/e/_c3m4lztp",
      "https://s.click.aliexpress.com/e/_c3OgG4Kf"
    ],
    temu: {
      general: "https://temu.to/k/ehsqckgdgv7",
      coupons: {
        coupon_pack_1000DH: "https://temu.to/k/epxkfkmslwr",
        coupon_alt: "https://temu.to/k/epq4u6u1fwd"
      },
      offers: {
        offer_1: "https://temu.to/k/e28np241co3"
      },
      promos: {
        ar_general: "🌟 استكشف عروض Temu! انقر لاكتشاف صفقات مذهلة https://temu.to/k/ehsqckgdgv7 🎉",
        fr_general: "🌟 Puisez dans le trésor de Temu ! ➡️ https://temu.to/k/ehsqckgdgv7 🎉",
        reduction: "💰 احصل على قسائم 1,000 DH عبر https://temu.to/k/epxkfkmslwr أو ابحث ali223723",
        coupons: "https://temu.to/k/epq4u6u1fwd (code: ali223723)",
        offers: "https://temu.to/k/e28np241co3 (code: alh326857)"
      },
      codes: { main_search_code: "ali223723", alt_code: "alh326857" }
    },
    // placeholders for future programs
    amazon: "",
    awin: "",
    cj: ""
  };

  function buildUTM(params){
    if(!params) return "";
    const parts = [];
    if(params.utm_source) parts.push('utm_source='+encodeURIComponent(params.utm_source));
    if(params.utm_medium) parts.push('utm_medium='+encodeURIComponent(params.utm_medium));
    if(params.utm_campaign) parts.push('utm_campaign='+encodeURIComponent(params.utm_campaign));
    if(params.utm_term) parts.push('utm_term='+encodeURIComponent(params.utm.term));
    if(params.utm_content) parts.push('utm_content='+encodeURIComponent(params.utm_content));
    return parts.length ? '?' + parts.join('&') : '';
  }

  function pickRotating(arr,key){
    if(!Array.isArray(arr) || arr.length===0) return null;
    try{
      const storageKey = 'fixly_rotate_index_' + (key||'default');
      let idx = parseInt(localStorage.getItem(storageKey) || '0', 10);
      if(isNaN(idx)) idx = 0;
      const link = arr[idx % arr.length];
      localStorage.setItem(storageKey, String((idx + 1) % arr.length));
      return link;
    }catch(e){
      return arr[Math.floor(Math.random()*arr.length)];
    }
  }

  window.affiliateLinksConfig = config;

  window.getAffiliateLink = function(key, options){
    options = options || {};
    const parts = (key||'').split('.');
    let val = config;
    for(const p of parts){
      if(val && typeof val === 'object' && p in val) val = val[p];
      else { val = undefined; break; }
    }
    if(!val) return null;

    if(Array.isArray(val) && options.rotate) val = pickRotating(val, key);
    else if(Array.isArray(val)) val = val[0];

    if(options.utm && typeof options.utm === 'object'){
      const utmStr = buildUTM(options.utm);
      if(utmStr){
        const joiner = val.includes('?') ? '&' : '?';
        val = val + (utmStr.startsWith('?') ? utmStr.replace('?', joiner) : utmStr);
      }
    }
    return val;
  };

  window.openAffiliate = function(key, options){
    const url = window.getAffiliateLink(key, options);
    if(!url){ alert('Affiliate link not configured: ' + key); return; }
    window.open(url, '_blank', 'noopener,noreferrer');
  };

})();
