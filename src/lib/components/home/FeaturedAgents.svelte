<section id="featured-agents" class="surface-2 bg-chalk-2 py-20 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-10 gap-4">
        <div>
          <p class="section-eyebrow">Our people</p>
          <h2 class="section-title">Featured agents</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Verified professionals, reviewed by real clients.</p>
        </div>
        <a href="#" class="view-more-btn">All agents <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5" id="agentsGrid"><div class="agent-card">
        <div class="agent-avatar-lg">
          CO
          <span class="agent-badge-check"><svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </div>
        <div class="text-15px font-medium text-navy-dark dark:text-chalk mb-1">Chukwuemeka O.</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-3">Emerald Realty</div>
        <div class="text-11px font-medium tracking-em-008 uppercase text-navy-accent dark:text-blue-bright mb-5"><span class="meta-item">42 listings</span></div>
        <button class="btn-outline-navy w-full">View profile</button>
      </div><div class="agent-card">
        <div class="agent-avatar-lg">
          NW
          <span class="agent-badge-check"><svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </div>
        <div class="text-15px font-medium text-navy-dark dark:text-chalk mb-1">Nkechi Williams</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-3">Coral Homes</div>
        <div class="text-11px font-medium tracking-em-008 uppercase text-navy-accent dark:text-blue-bright mb-5"><span class="meta-item">37 listings</span></div>
        <button class="btn-outline-navy w-full">View profile</button>
      </div><div class="agent-card">
        <div class="agent-avatar-lg">
          AO
          <span class="agent-badge-check"><svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </div>
        <div class="text-15px font-medium text-navy-dark dark:text-chalk mb-1">Amara Okonkwo</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-3">Blue Crest Properties</div>
        <div class="text-11px font-medium tracking-em-008 uppercase text-navy-accent dark:text-blue-bright mb-5"><span class="meta-item">29 listings</span></div>
        <button class="btn-outline-navy w-full">View profile</button>
      </div><div class="agent-card">
        <div class="agent-avatar-lg">
          TB
          <span class="agent-badge-check"><svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </div>
        <div class="text-15px font-medium text-navy-dark dark:text-chalk mb-1">Tunde Balogun</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-3">Balogun &amp; Co</div>
        <div class="text-11px font-medium tracking-em-008 uppercase text-navy-accent dark:text-blue-bright mb-5"><span class="meta-item">51 listings</span></div>
        <button class="btn-outline-navy w-full">View profile</button>
      </div><div class="agent-card">
        <div class="agent-avatar-lg">
          FA
          <span class="agent-badge-check"><svg width="10" height="10" viewBox="0 0 20 20" fill="none"><path d="M5 10l3 3 7-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
        </div>
        <div class="text-15px font-medium text-navy-dark dark:text-chalk mb-1">Fatima Abdullahi</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-3">Prime Nest</div>
        <div class="text-11px font-medium tracking-em-008 uppercase text-navy-accent dark:text-blue-bright mb-5"><span class="meta-item">33 listings</span></div>
        <button class="btn-outline-navy w-full">View profile</button>
      </div>
      </div>
    </div>
  </section>

<style>
    :global([data-theme="dark"]) .surface-2{background:#111826;}

    /* ─── AGENT CARD ─── */
    .agent-card{border-radius:16px;overflow:hidden;border:1px solid #EDE7DC;background:#FEFCF8;padding:28px 24px;text-align:center;transition:transform .25s,box-shadow .25s,border-color .2s}
    .agent-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(10,36,99,.1);border-color:#4A90E2}
    :global([data-theme="dark"]) .agent-card{background:#131C2E;border-color:rgba(255,255,255,.08)}
    .agent-avatar-lg{width:64px;height:64px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(135deg,#1F3F6A,#4A70A0);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#fff;position:relative}
    .agent-badge-check{position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#4A7848;border:2px solid #FEFCF8;display:flex;align-items:center;justify-content:center}
    :global([data-theme="dark"]) .agent-badge-check{border-color:#131C2E}

    /* ─── BTN STYLES ─── */
    .btn-primary{background:#C06035;color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 36px;border-radius:40px;border:none;cursor:pointer;transition:background .2s,transform .15s}
    .btn-primary:hover{background:#a04e28;transform:scale(1.02)}
    .btn-secondary{background:transparent;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:400;padding:14px 36px;border-radius:40px;border:1px solid rgba(255,255,255,.2);cursor:pointer;transition:border-color .2s,color .2s}
    .btn-secondary:hover{border-color:rgba(255,255,255,.5);color:#fff}
    .btn-outline-navy{background:none;color:#0A2463;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:11px 26px;border-radius:40px;border:1px solid #0A2463;cursor:pointer;transition:all .2s}
    .btn-outline-navy:hover{background:#0A2463;color:#fff}
    :global([data-theme="dark"]) .btn-outline-navy{color:#E8EDF5;border-color:rgba(255,255,255,.25)}
    :global([data-theme="dark"]) .btn-outline-navy:hover{background:rgba(255,255,255,.08)}

    /* ─── SECTION HEADER + VIEW MORE ─── */
    .view-more-btn{font-size:13px;font-weight:500;color:#4A70A0;display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;text-decoration:none;white-space:nowrap;transition:color .2s}
    .view-more-btn:hover{color:#0A2463}
    :global([data-theme="dark"]) .view-more-btn{color:#4A90E2}
    :global([data-theme="dark"]) .view-more-btn:hover{color:#8DAACC}
    .section-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#4A70A0;margin-bottom:8px}
    :global([data-theme="dark"]) .section-eyebrow{color:#4A90E2}
    .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3.2vw,42px);font-weight:300;line-height:1.1;color:#0A2463}
    :global([data-theme="dark"]) .section-title{color:#FEFCF8}
    

    @media(max-width:768px){
        .listings-header{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
    }
</style>