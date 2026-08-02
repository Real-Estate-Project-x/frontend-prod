<section class="bg-chalk dark:bg-navy-deep py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <p class="section-eyebrow">Explore</p>
          <h2 class="section-title">What are you looking for?</h2>
        </div>
      </div>
      <div class="explore-grid grid grid-cols-4 gap-4">
        <a href="#listings-near-you" class="explore-card" style="min-height:200px">
          <div class="absolute inset-0 prop-sky-1"></div>
          <div class="prop-building" style="width:70px;height:130px;left:28px"></div>
          <div class="prop-window" style="width:11px;height:14px;left:36px;bottom:104px"></div><div class="prop-window" style="width:11px;height:14px;left:53px;bottom:104px"></div>
          <div class="prop-window" style="width:11px;height:14px;left:36px;bottom:80px"></div><div class="prop-window" style="width:11px;height:14px;left:53px;bottom:80px"></div>
          <div class="explore-card-overlay"></div>
          <div class="relative z-10 p-5">
            <div class="flex items-center justify-between mb-1"><span class="text-11px font-medium tracking-em-010 uppercase text-white/50">2,100+ listings</span><svg class="explore-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/></svg></div>
            <div class="font-display text-[26px] font-light text-white leading-none">Buy</div>
          </div>
        </a>
        <a href="#apartments-for-rent" class="explore-card" style="min-height:200px">
          <div class="absolute inset-0 prop-sky-2"></div>
          <div class="prop-building" style="width:90px;height:100px;left:20px"></div>
          <div class="prop-window" style="width:12px;height:15px;left:30px;bottom:74px"></div><div class="prop-window" style="width:12px;height:15px;left:48px;bottom:74px"></div>
          <div class="explore-card-overlay"></div>
          <div class="relative z-10 p-5">
            <div class="flex items-center justify-between mb-1"><span class="text-11px font-medium tracking-em-010 uppercase text-white/50">1,840+ listings</span><svg class="explore-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/></svg></div>
            <div class="font-display text-[26px] font-light text-white leading-none">Rent</div>
          </div>
        </a>
        <a href="#luxury-properties" class="explore-card" style="min-height:200px">
          <div class="absolute inset-0" style="background:linear-gradient(160deg,#1B3A14 0%,#2E5A22 50%,#4A7848 100%)"></div>
          <div style="position:absolute;bottom:30px;left:18px;width:28px;height:48px;background:rgba(255,255,255,.1);border-radius:2px 2px 0 0"></div>
          <div style="position:absolute;bottom:30px;left:14px;width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-bottom:22px solid rgba(255,255,255,.14)"></div>
          <div class="explore-card-overlay" style="background:linear-gradient(to top,rgba(6,14,28,.82) 0%,rgba(27,58,20,.1) 60%,transparent 100%)"></div>
          <div class="relative z-10 p-5">
            <div class="flex items-center justify-between mb-1"><span class="text-11px font-medium tracking-em-010 uppercase text-white/50">330+ homes</span><svg class="explore-arrow" width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/></svg></div>
            <div class="font-display text-[26px] font-light text-white leading-none">Luxury</div>
          </div>
        </a>
        
        <a href="#commercial-properties" class="explore-card" style="min-height:200px">
            <div class="absolute inset-0 prop-sky-4 svelte-1uha8ag"></div>
            <div class="prop-building svelte-1uha8ag" style="width:55px;height:160px;left:15px;border-radius:6px 6px 0 0"></div>
            <div class="prop-window svelte-1uha8ag" style="width:9px;height:11px;left:21px;bottom:130px"></div>
            <div class="prop-window svelte-1uha8ag" style="width:9px;height:11px;left:35px;bottom:130px"></div>
            <div class="explore-card-overlay svelte-1uha8ag"></div> 
            <div class="relative z-10 p-5 svelte-1uha8ag">
                <div class="flex items-center justify-between mb-1 svelte-1uha8ag">
                    <span class="text-11px font-medium tracking-em-010 uppercase text-white/50 svelte-1uha8ag">218+ spaces</span>
                    <svg class="explore-arrow svelte-1uha8ag" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2 12L12 2M12 2H5M12 2v7" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" opacity=".6" class="svelte-1uha8ag"></path>
                    </svg>
                </div>
                <div class="font-display text-[26px] font-light text-white leading-none svelte-1uha8ag">
                    Commercial
                </div>
            </div>
        </a>
      </div>
    </div>
  </section>

<style>
    /* ─── SECTION HEADER + VIEW MORE ─── */
    .view-more-btn{font-size:13px;font-weight:500;color:#4A70A0;display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;text-decoration:none;white-space:nowrap;transition:color .2s}
    .view-more-btn:hover{color:#0A2463}
    :global([data-theme="dark"]) .view-more-btn{color:#4A90E2}
    :global([data-theme="dark"]) .view-more-btn:hover{color:#8DAACC}
    .section-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#4A70A0;margin-bottom:8px}
    :global([data-theme="dark"]) .section-eyebrow{color:#4A90E2}
    .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3.2vw,42px);font-weight:300;line-height:1.1;color:#0A2463}
    :global([data-theme="dark"]) .section-title{color:#FEFCF8}

    /* ─── QUICK EXPLORE CARDS ─── */
    .explore-card{position:relative;border-radius:16px;overflow:hidden;cursor:pointer;aspect-ratio:3/4;display:flex;flex-direction:column;justify-content:flex-end;transition:transform .28s,box-shadow .28s}
    .explore-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(10,36,99,.22)}
    .explore-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,14,28,.88) 0%,rgba(6,14,28,.2) 55%,transparent 100%)}
    .explore-card:hover .explore-card-overlay{background:linear-gradient(to top,rgba(6,14,28,.94) 0%,rgba(6,14,28,.3) 60%,rgba(10,36,99,.08) 100%)}
    .explore-card:hover .explore-arrow{transform:translate(3px,-3px)}
    .explore-arrow{transition:transform .25s}

    @media(max-width:900px){
      .explore-grid{grid-template-columns:1fr 1fr!important;gap:20px!important}
      .agents-grid-cta{grid-template-columns:1fr!important;gap:44px!important}
      .agents-arc{right:-260px!important;opacity:.6}
    }

    @media(max-width:900px){
      .explore-grid{grid-template-columns:1fr 1fr!important;gap:20px!important}
      .agents-grid-cta{grid-template-columns:1fr!important;gap:44px!important}
      .agents-arc{right:-260px!important;opacity:.6}
    }
    @media(max-width:768px){
      .footer-top-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
      .footer-bottom-row{flex-direction:column!important;gap:12px!important;align-items:flex-start!important}
      .agents-grid-cta{grid-template-columns:1fr!important;gap:48px!important}
      .section-py{padding-top:56px!important;padding-bottom:56px!important}
      .agents-arc{right:-200px!important}
      .listings-header{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
      .explore-grid{grid-template-columns:1fr 1fr!important;gap:18px!important}
      .explore-card{min-height:180px!important}
      .trust-item{padding:16px 18px!important}
    }
    @media(max-width:640px){
      .footer-top-grid{grid-template-columns:1fr!important}
      .explore-grid{grid-template-columns:1fr 1fr;gap:16px!important;row-gap:18px!important}
      .explore-card{aspect-ratio:4/3;min-height:170px!important}
      .hero-pb{padding-bottom:172px!important}
      .hero-illustration{max-width:300px!important}
      .section-py{padding-top:44px!important;padding-bottom:44px!important}
      .hero-cta-row{flex-direction:column!important;align-items:stretch!important}
      .hero-cta-row a{width:100%!important;text-align:center!important}
    }
    @media(max-width:480px){
      .sb{flex-direction:column!important;padding:16px 18px!important;border-radius:20px!important;gap:10px!important;align-items:stretch!important}
      .sb-divider{display:none!important}
      .si,.ss{width:100%!important;padding:10px 0!important;border-bottom:1px solid rgba(255,255,255,.08)}
      .sb-btn{width:100%!important;margin-top:2px!important;padding:14px 0!important;border-radius:12px!important}
      /* single, wider banner-style cards so labels never crowd or overlap on narrow phones */
      .explore-grid{grid-template-columns:1fr!important;row-gap:16px!important}
      .explore-card{aspect-ratio:21/9!important;min-height:130px!important}
      .trust-strip-inner{max-width:100%!important}
      .hero-illustration{max-width:250px!important}
      nav{padding-left:16px!important;padding-right:16px!important}
    }

    @media(max-width:360px){
      .explore-card{aspect-ratio:16/9!important;min-height:120px!important}
      .search-tag{padding:5px 13px!important}
    }
</style>