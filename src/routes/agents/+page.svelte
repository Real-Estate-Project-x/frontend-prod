<div style="margin-top:68px">

    <!-- PAGE HEADER -->
    <div class="page-header">
      <div class="ph-inner">
        <div class="ph-breadcrumb">
          <a href="index.html">Home</a><span>/</span><span>Agents</span>
        </div>
        <p class="ph-eyebrow">Verified professionals</p>
        <h1 class="ph-title">Find a trusted<br><em>agent near you.</em></h1>
        <p class="ph-sub">Browse our network of identity-verified real estate agents and agencies across Nigeria and beyond. Every agent is professionally reviewed before listing.</p>
        <div class="ph-stats">
          <div><div class="ph-stat-n">384</div><div class="ph-stat-l">Verified agents</div></div>
          <div><div class="ph-stat-n">4,218</div><div class="ph-stat-l">Active listings</div></div>
          <div><div class="ph-stat-n">28</div><div class="ph-stat-l">States covered</div></div>
        </div>
      </div>
    </div>
    
    <!-- FILTER BAR -->
    <div class="filter-bar">
      <div class="filter-inner">
        <div class="agent-search-wrap">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style="color:var(--text-s);flex-shrink:0"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <input type="text" id="agentSearch" placeholder="Search by name, agency or area…">
        </div>
        <select class="filter-select" id="stateFilter">
          <option value="">All states</option>
          <option>Rivers State</option><option>Lagos State</option><option>Abuja FCT</option>
          <option>Delta State</option><option>Anambra</option><option>Enugu</option><option>Kano</option>
        </select>
        <select class="filter-select" id="specFilter">
          <option value="">All specialties</option>
          <option>Residential sales</option><option>Residential rentals</option>
          <option>Commercial</option><option>Luxury homes</option>
          <option>Land &amp; development</option><option>International</option>
        </select>
        <button class="filter-btn">Search agents</button>
      </div>
    </div>

    <!-- PILLS -->
    <div class="pills-bar">
        <div class="pills-inner">
        <span class="pill-label">Browse:</span>
        <button class="pill active">All agents</button>
        <button class="pill">Top rated</button>
        <button class="pill">Most listings</button>
        <button class="pill">Port Harcourt</button>
        <button class="pill">Lagos</button>
        <button class="pill">Abuja</button>
        <button class="pill">Luxury</button>
        <button class="pill">Commercial</button>
        <button class="pill">International</button>
        </div>
    </div>

    <!-- RESULTS BAR -->
    <div class="results-bar">
        <p class="results-count"><strong id="agentCount">384</strong> verified agents · sorted by activity</p>
        <div class="sort-wrap">
        <span class="sort-label">Sort by</span>
        <select class="sort-select">
            <option>Most active</option><option>Top rated</option>
            <option>Most listings</option><option>Newest members</option><option>Name A–Z</option>
        </select>
        </div>
    </div>

    

    <!-- AGENTS GRID -->
<div class="agents-wrap">
    <div class="agents-grid" id="agentsGrid">
  
      <!-- ── AGENT CARD TEMPLATE — repeated for each agent ── -->
      <!-- Agent 1 -->
      <a class="agent-card" href="/agents/capital-real-estate">
        <div class="ac-band band-1">
          <span class="ac-feat">Featured</span>
          <div class="ac-avatar ac-gold-ring" style="background:#1F3F6A">CO</div>
        </div>
        <div class="ac-body">
          <div class="ac-name-row"><span class="ac-name">Chukwuemeka Okafor</span><span class="ac-ver"><span class="ac-ver-dot"></span>Verified</span></div>
          <div class="ac-agency">Premier Properties PH · Principal Agent</div>
          <div class="ac-loc"><span class="ac-loc-dot"></span>GRA Phase 2, Port Harcourt</div>
          <div class="ac-specs"><span class="ac-spec">Residential</span><span class="ac-spec">Luxury</span><span class="ac-spec">Commercial</span></div>
          <div class="ac-stats">
            <div class="ac-stat"><div class="ac-stat-n">42</div><div class="ac-stat-l">Listings</div></div>
            <div class="ac-stat"><div class="ac-stat-n">187</div><div class="ac-stat-l">Sales</div></div>
            <div class="ac-stat"><div class="ac-stat-n">6 yrs</div><div class="ac-stat-l">Member</div></div>
          </div>
          <div class="ac-rating"><div class="stars"><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div></div><span class="ac-rat">4.9</span><span class="ac-rat-c">(214 reviews)</span></div>
          <div class="ac-actions">
            <span class="btn-profile">View profile &amp; listings <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <button class="btn-contact-a" onclick={(e) => e.preventDefault()}>Contact</button>
          </div>
        </div>
      </a>
  
      <!-- Agent 2 -->
      <a class="agent-card" href="/agents/capital-real-estate">
        <div class="ac-band band-2">
          <div class="ac-avatar" style="background:#C06035">AM</div>
        </div>
        <div class="ac-body">
          <div class="ac-name-row"><span class="ac-name">Amara Madu</span><span class="ac-ver"><span class="ac-ver-dot"></span>Verified</span></div>
          <div class="ac-agency">Lekki Realty Partners · Senior Agent</div>
          <div class="ac-loc"><span class="ac-loc-dot"></span>Lekki Phase 1, Lagos</div>
          <div class="ac-specs"><span class="ac-spec">Residential</span><span class="ac-spec">Buy-to-let</span><span class="ac-spec">New builds</span></div>
          <div class="ac-stats">
            <div class="ac-stat"><div class="ac-stat-n">28</div><div class="ac-stat-l">Listings</div></div>
            <div class="ac-stat"><div class="ac-stat-n">134</div><div class="ac-stat-l">Sales</div></div>
            <div class="ac-stat"><div class="ac-stat-n">4 yrs</div><div class="ac-stat-l">Member</div></div>
          </div>
          <div class="ac-rating"><div class="stars"><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-e"></div></div><span class="ac-rat">4.7</span><span class="ac-rat-c">(98 reviews)</span></div>
          <div class="ac-actions">
            <span class="btn-profile">View profile &amp; listings <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <button class="btn-contact-a" onclick={(e) => e.preventDefault()}>Contact</button>
          </div>
        </div>
      </a>
  
      <!-- Agent 3 -->
      <a class="agent-card" href="/agents/capital-real-estate">
        <div class="ac-band band-3">
          <div class="ac-avatar" style="background:#4A7848">BO</div>
        </div>
        <div class="ac-body">
          <div class="ac-name-row"><span class="ac-name">Bola Okafor</span><span class="ac-ver"><span class="ac-ver-dot"></span>Verified</span></div>
          <div class="ac-agency">FCT Luxury Estates · Director</div>
          <div class="ac-loc"><span class="ac-loc-dot"></span>Maitama, Abuja FCT</div>
          <div class="ac-specs"><span class="ac-spec">Luxury</span><span class="ac-spec">Abuja Specialist</span><span class="ac-spec">Rentals</span></div>
          <div class="ac-stats">
            <div class="ac-stat"><div class="ac-stat-n">36</div><div class="ac-stat-l">Listings</div></div>
            <div class="ac-stat"><div class="ac-stat-n">210</div><div class="ac-stat-l">Sales</div></div>
            <div class="ac-stat"><div class="ac-stat-n">7 yrs</div><div class="ac-stat-l">Member</div></div>
          </div>
          <div class="ac-rating"><div class="stars"><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div></div><span class="ac-rat">4.8</span><span class="ac-rat-c">(176 reviews)</span></div>
          <div class="ac-actions">
            <span class="btn-profile">View profile &amp; listings <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <button class="btn-contact-a" onclick={(e) => e.preventDefault()}>Contact</button>
          </div>
        </div>
      </a>
  
      <!-- Agent 4 -->
      <a class="agent-card" href="/agents/capital-real-estate">
        <div class="ac-band band-5">
          <div class="ac-avatar" style="background:#1A6ADE">NW</div>
        </div>
        <div class="ac-body">
          <div class="ac-name-row"><span class="ac-name">Nkechi Williams</span><span class="ac-ver"><span class="ac-ver-dot"></span>Verified</span></div>
          <div class="ac-agency">Delta Prime Realtors · Senior Agent</div>
          <div class="ac-loc"><span class="ac-loc-dot"></span>Trans-Amadi, Port Harcourt</div>
          <div class="ac-specs"><span class="ac-spec">Land</span><span class="ac-spec">Commercial</span><span class="ac-spec">Development</span></div>
          <div class="ac-stats">
            <div class="ac-stat"><div class="ac-stat-n">19</div><div class="ac-stat-l">Listings</div></div>
            <div class="ac-stat"><div class="ac-stat-n">67</div><div class="ac-stat-l">Sales</div></div>
            <div class="ac-stat"><div class="ac-stat-n">3 yrs</div><div class="ac-stat-l">Member</div></div>
          </div>
          <div class="ac-rating"><div class="stars"><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-e"></div></div><span class="ac-rat">4.5</span><span class="ac-rat-c">(52 reviews)</span></div>
          <div class="ac-actions">
            <span class="btn-profile">View profile &amp; listings <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <button class="btn-contact-a" onclick={(e) => e.preventDefault()}>Contact</button>
          </div>
        </div>
      </a>
  
      <!-- Agent 5 -->
      <a class="agent-card" href="/agents/capital-real-estate">
        <div class="ac-band band-4">
          <div class="ac-avatar ac-gold-ring" style="background:#8A6A10">KA</div>
        </div>
        <div class="ac-body">
          <div class="ac-name-row"><span class="ac-name">Kingsley Amadi</span><span class="ac-ver"><span class="ac-ver-dot"></span>Verified</span></div>
          <div class="ac-agency">Goldkey Realty · Managing Director</div>
          <div class="ac-loc"><span class="ac-loc-dot"></span>Victoria Island, Lagos</div>
          <div class="ac-specs"><span class="ac-spec">Luxury Residential</span><span class="ac-spec">Penthouses</span><span class="ac-spec">Island</span></div>
          <div class="ac-stats">
            <div class="ac-stat"><div class="ac-stat-n">54</div><div class="ac-stat-l">Listings</div></div>
            <div class="ac-stat"><div class="ac-stat-n">298</div><div class="ac-stat-l">Sales</div></div>
            <div class="ac-stat"><div class="ac-stat-n">9 yrs</div><div class="ac-stat-l">Member</div></div>
          </div>
          <div class="ac-rating"><div class="stars"><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div></div><span class="ac-rat">5.0</span><span class="ac-rat-c">(312 reviews)</span></div>
          <div class="ac-actions">
            <span class="btn-profile">View profile &amp; listings <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <button class="btn-contact-a" onclick={(e) => e.preventDefault()}>Contact</button>
          </div>
        </div>
      </a>
  
      <!-- Agent 6 -->
      <a class="agent-card" href="/agents/capital-real-estate">
        <div class="ac-band band-6">
          <div class="ac-avatar" style="background:#0E2444">FI</div>
        </div>
        <div class="ac-body">
          <div class="ac-name-row"><span class="ac-name">Femi Ige</span><span class="ac-ver"><span class="ac-ver-dot"></span>Verified</span></div>
          <div class="ac-agency">Ige &amp; Associates · Independent Agent</div>
          <div class="ac-loc"><span class="ac-loc-dot"></span>Rumuola, Port Harcourt</div>
          <div class="ac-specs"><span class="ac-spec">Affordable Rentals</span><span class="ac-spec">Residential</span></div>
          <div class="ac-stats">
            <div class="ac-stat"><div class="ac-stat-n">15</div><div class="ac-stat-l">Listings</div></div>
            <div class="ac-stat"><div class="ac-stat-n">44</div><div class="ac-stat-l">Sales</div></div>
            <div class="ac-stat"><div class="ac-stat-n">2 yrs</div><div class="ac-stat-l">Member</div></div>
          </div>
          <div class="ac-rating"><div class="stars"><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-f"></div><div class="s-e"></div></div><span class="ac-rat">4.6</span><span class="ac-rat-c">(38 reviews)</span></div>
          <div class="ac-actions">
            <span class="btn-profile">View profile &amp; listings <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            <button class="btn-contact-a" onclick={(e) => e.preventDefault()}>Contact</button>
          </div>
        </div>
      </a>
  
    </div>
  
    <!-- PAGINATION -->
    <div class="pagination">
      <button class="page-btn nav-arrow">
        <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Prev
      </button>
      <button class="page-btn active">1</button>
      <button class="page-btn">2</button>
      <button class="page-btn">3</button>
      <button class="page-btn">4</button>
      <button class="page-btn">5</button>
      <span class="page-ellipsis">…</span>
      <button class="page-btn">16</button>
      <button class="page-btn nav-arrow">
        Next<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
  </div>

  <!-- JOIN CTA -->
<div class="join-cta">
    <div class="jc-inner">
      <p class="jc-eyebrow">Are you an agent?</p>
      <h2 class="jc-title">Join 384 verified agents on Blupodd</h2>
      <p class="jc-sub">List properties, reach serious buyers and renters, and grow your business with our weekly Boost feature — starting today.</p>
      <a href="/sign-up" class="jc-btn">Create agent account</a>
    </div>
  </div>


    </div>

    <style>
    
/* PAGE HEADER */
.page-header{background:var(--navy-dark);padding:104px 5vw 52px;position:relative;overflow:hidden}
.page-header::before{content:'';position:absolute;right:-80px;top:50%;transform:translateY(-50%);width:380px;height:380px;border-radius:50%;border:1px solid rgba(255,255,255,.05);pointer-events:none}
.page-header::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%);transition:background .3s}
.ph-inner{max-width:1300px;margin:0 auto;position:relative;z-index:2}
.ph-breadcrumb{display:flex;align-items:center;gap:8px;margin-bottom:18px;font-size:12px;color:rgba(255,255,255,.35);flex-wrap:wrap}
.ph-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
.ph-breadcrumb a:hover{color:#fff}
.ph-breadcrumb span{color:rgba(255,255,255,.2)}
.ph-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:10px}
.ph-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4.5vw,54px);font-weight:300;color:#fff;margin-bottom:10px;line-height:1.08}
.ph-title em{font-style:italic;color:var(--blue-bright)}
.ph-sub{font-size:14px;color:rgba(255,255,255,.45);font-weight:300;max-width:520px;line-height:1.75;margin-bottom:28px}
.ph-stats{display:flex;gap:32px;flex-wrap:wrap}
.ph-stat-n{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:#fff;line-height:1}
.ph-stat-l{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.09em;margin-top:2px}

/* SEARCH + FILTER BAR */
.filter-bar{background:var(--bg-2);padding:14px 5vw;border-bottom:1px solid var(--border);transition:background .3s,border-color .3s}
.filter-inner{max-width:1300px;margin:0 auto;display:flex;gap:10px;align-items:center;flex-wrap:wrap}
.agent-search-wrap{flex:1;min-width:200px;display:flex;align-items:center;gap:10px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 14px;transition:border-color .2s,background .3s}
.agent-search-wrap:focus-within{border-color:var(--blue-link)}
.agent-search-wrap input{flex:1;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text)}
.agent-search-wrap input::placeholder{color:var(--text-s)}
.filter-select{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:border-color .2s,background .3s}
.filter-btn{background:var(--ember);color:#fff;border:none;border-radius:10px;padding:11px 24px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .2s}
.filter-btn:hover{background:var(--ember-deep)}

/* SPECIALTY PILLS */
.pills-bar{background:var(--bg);padding:12px 5vw;border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none;transition:background .3s,border-color .3s}
.pills-bar::-webkit-scrollbar{display:none}
.pills-inner{max-width:1300px;margin:0 auto;display:flex;gap:8px;align-items:center}
.pill-label{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);white-space:nowrap;margin-right:4px;flex-shrink:0}
.pill{font-size:12px;padding:5px 14px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0}
.pill:hover{border-color:var(--navy-dark);color:var(--text-p)}
.pill.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* RESULTS BAR */
.results-bar{display:flex;align-items:center;justify-content:space-between;max-width:1300px;margin:0 auto;padding:18px 5vw 14px;flex-wrap:wrap;gap:10px}
.results-count{font-size:14px;color:var(--text-s);font-weight:300}
.results-count strong{color:var(--text-p);font-weight:500}
.sort-wrap{display:flex;align-items:center;gap:10px}
.sort-label{font-size:13px;color:var(--text-s)}
.sort-select{background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;padding:7px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:background .3s}

/* AGENTS GRID */
.agents-wrap{max-width:1300px;margin:0 auto;padding:0 5vw 60px}
.agents-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(285px,1fr));gap:20px}

/* AGENT CARD */
.agent-card{background:var(--card-bg);border:1px solid var(--border);border-radius:18px;overflow:hidden;text-decoration:none;display:flex;flex-direction:column;cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .2s}
.agent-card:hover{transform:translateY(-5px);box-shadow:0 20px 52px var(--shadow-h);border-color:var(--blue-bright)}
/* card color band */
.ac-band{height:68px;position:relative;flex-shrink:0}
.band-1{background:linear-gradient(135deg,#0A2463 0%,#1F3F6A 60%,#4A70A0 100%)}
.band-2{background:linear-gradient(135deg,#5C2416 0%,#C06035 60%,#EDBA9B 100%)}
.band-3{background:linear-gradient(135deg,#1A3020 0%,#4A7848 60%,#A8C4A2 100%)}
.band-4{background:linear-gradient(135deg,#412402 0%,#8A6A10 60%,#D4AE3A 100%)}
.band-5{background:linear-gradient(135deg,#0E2444 0%,#0A2463 60%,#1A6ADE 100%)}
.band-6{background:linear-gradient(135deg,#060E1C 0%,#0A2463 100%)}
.ac-avatar{width:64px;height:64px;border-radius:50%;border:3px solid var(--card-bg);position:absolute;bottom:-22px;left:20px;display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;font-size:20px;font-weight:500;color:#fff;flex-shrink:0;transition:border-color .3s}
.ac-gold-ring{box-shadow:0 0 0 2px var(--gold)}
.ac-feat{position:absolute;top:10px;right:12px;background:var(--gold);color:var(--navy-deep);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:20px}
.ac-body{padding:30px 20px 20px}
.ac-name-row{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:3px;gap:8px}
.ac-name{font-size:15px;font-weight:500;color:var(--text-p);line-height:1.2}
.ac-ver{display:flex;align-items:center;gap:4px;font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;color:var(--sage);flex-shrink:0;margin-top:2px}
[data-theme="dark"] .ac-ver{color:#7DBF7A}
.ac-ver-dot{width:5px;height:5px;border-radius:50%;background:var(--sage)}
[data-theme="dark"] .ac-ver-dot{background:#7DBF7A}
.ac-agency{font-size:12px;color:var(--text-s);margin-bottom:8px;line-height:1.4}
.ac-loc{font-size:12px;color:var(--navy-accent);display:flex;align-items:center;gap:5px;margin-bottom:12px}
[data-theme="dark"] .ac-loc{color:#8DAACC}
.ac-loc-dot{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.ac-specs{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:14px}
.ac-spec{font-size:10px;font-weight:500;letter-spacing:.04em;padding:3px 9px;border-radius:20px;background:var(--bg-2);color:var(--text-s);border:1px solid var(--border);transition:background .3s}
.ac-stats{display:grid;grid-template-columns:1fr 1fr 1fr;padding:12px 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);margin-bottom:14px}
.ac-stat{text-align:center;padding:0 6px}
.ac-stat:not(:last-child){border-right:1px solid var(--border)}
.ac-stat-n{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:var(--text-p);line-height:1}
.ac-stat-l{font-size:10px;color:var(--text-s);margin-top:2px}
.ac-rating{display:flex;align-items:center;gap:6px;margin-bottom:14px}
.stars{display:flex;gap:2px}
.s-f{width:11px;height:11px;border-radius:50%;background:var(--gold)}
.s-e{width:11px;height:11px;border-radius:50%;background:var(--bg-3)}
.ac-rat{font-size:13px;font-weight:500;color:var(--text-p)}
.ac-rat-c{font-size:11px;color:var(--text-s)}
.ac-actions{display:flex;gap:8px}
.btn-profile{flex:1;display:flex;align-items:center;justify-content:center;gap:6px;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:10px 0;border-radius:40px;background:var(--navy-dark);color:#fff;border:none;cursor:pointer;transition:background .2s}
.btn-profile:hover{background:var(--navy-mid)}
.btn-profile svg{transition:transform .2s}
.btn-profile:hover svg{transform:translateX(3px)}
.btn-contact-a{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:10px 14px;border-radius:40px;border:1px solid var(--border);color:var(--text-p);background:none;cursor:pointer;transition:all .2s;white-space:nowrap}
.btn-contact-a:hover{border-color:var(--navy-dark);background:var(--bg-2)}

/* PAGINATION */
.pagination{display:flex;align-items:center;justify-content:center;gap:6px;padding:32px 5vw 48px;max-width:1300px;margin:0 auto;flex-wrap:wrap}
.page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s}
.page-btn:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
.page-btn.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.page-btn.nav-arrow{width:auto;padding:0 14px;gap:5px;font-size:12px}
.page-ellipsis{font-size:13px;color:var(--text-s);padding:0 4px}

/* JOIN CTA */
.join-cta{background:var(--navy-dark);padding:64px 5vw;text-align:center;position:relative;overflow:hidden}
.join-cta::before{content:'';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:500px;height:500px;border-radius:50%;border:1px solid rgba(255,255,255,.05);pointer-events:none}
.jc-inner{position:relative;z-index:2;max-width:560px;margin:0 auto}
.jc-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:12px}
.jc-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3.5vw,42px);font-weight:300;color:#fff;margin-bottom:10px;line-height:1.1}
.jc-sub{font-size:14px;color:rgba(255,255,255,.45);font-weight:300;margin-bottom:30px;line-height:1.7}
.jc-btn{display:inline-block;background:var(--ember);color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 36px;border-radius:40px;border:none;cursor:pointer;transition:background .2s,transform .15s;text-decoration:none}
.jc-btn:hover{background:var(--ember-deep);transform:scale(1.02)}

/* RESPONSIVE */
@media(max-width:900px){
  .agents-grid{grid-template-columns:repeat(auto-fill,minmax(240px,1fr))}
  .filter-inner{gap:8px}
  .footer-top{grid-template-columns:1fr 1fr;gap:28px}
}
@media(max-width:768px){
  .nav-links{display:none}
  .nav-ham{display:flex}
  .filter-select{display:none}
  .ph-stats{gap:22px}
}
@media(max-width:540px){
  .agents-grid{grid-template-columns:1fr}
  .filter-inner{flex-wrap:wrap}
  .footer-top{grid-template-columns:1fr}
  .footer-bottom{flex-direction:column;align-items:flex-start}
}
</style>