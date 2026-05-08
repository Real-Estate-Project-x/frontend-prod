<script lang="ts">
import { page } from '$app/stores';
  import { capitalize } from '$lib/utils';
import { onMount } from 'svelte';

let stateName = $state<string | null>();
type ViewType = 'grid' | 'list';
let selectedView = $state<ViewType>('grid');
const setView = (view: ViewType) => selectedView = view;

onMount(() => {
    stateName = $page.params.stateId;
});

</script>

<div style="margin-top:68px">

    <div class="state-hero">
      <div class="sh-inner">
        <div class="sh-breadcrumb"><a href="index.html">Home</a><span>/</span><a href="properties.html">Properties</a><span>/</span><a href="#">Nigeria</a><span>/</span><span class="capitalize">{stateName}</span></div>
        <div class="sh-state-badge"><div class="sh-flag-circle"></div><span class="capitalize">{stateName} </span>· South East Nigeria</div>
        <h1 class="sh-title">Properties in<br><em class="capitalize">{stateName}</em></h1>
        <p class="sh-sub">886 active listings across Port Harcourt, GRA, Rumuola, Trans-Amadi &amp; more · Updated today</p>
        <div class="sh-stats">
          <div class="sh-stat"><div class="sh-stat-num">886</div><div class="sh-stat-label">Active listings</div></div>
          <div class="sh-stat"><div class="sh-stat-num">124</div><div class="sh-stat-label">Verified agents</div></div>
          <div class="sh-stat"><div class="sh-stat-num">38</div><div class="sh-stat-label">Boosted today</div></div>
          <div class="sh-stat"><div class="sh-stat-num">Virtual</div><div class="sh-stat-label">Tours available</div></div>
        </div>
      </div>
    </div>

    <div class="lga-bar">
        <div class="lga-inner">
          <span class="lga-label">Area:</span>
          <button class="lga-pill active">All Rivers</button>
          <button class="lga-pill">Port Harcourt City</button>
          <button class="lga-pill">GRA Phase 1</button>
          <button class="lga-pill">GRA Phase 2</button>
          <button class="lga-pill">GRA Phase 3</button>
          <button class="lga-pill">Trans-Amadi</button>
          <button class="lga-pill">Rumuola</button>
          <button class="lga-pill">D-Line</button>
          <button class="lga-pill">Peter Odili Rd</button>
          <button class="lga-pill">Rumuigbo</button>
          <button class="lga-pill">Aba Road</button>
          <button class="lga-pill">Woji</button>
          <button class="lga-pill">Obio/Akpor</button>
        </div>
    </div>

    <div class="search-wrap">
        <div class="search-surface">
          <div class="sr-1">
            <div class="s-input" id="mainSearch">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style="color:var(--text-s);flex-shrink:0"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <input type="text" placeholder="Search by area, street, or LGA in {capitalize(stateName as any)}…" />
            </div>
            <select class="f-sel"><option>Buy or Rent</option><option>For Sale</option><option>For Rent</option></select>
            <select class="f-sel"><option>Property type</option><option>Apartment</option><option>Detached house</option><option>Duplex</option><option>Terraced</option><option>Land</option><option>Commercial</option></select>
            <button class="s-btn">Search</button>
          </div>
          <div class="sr-2">
            <div><div class="af-label">Min price</div><input class="p-input" placeholder="₦ Min"></div>
            <div><div class="af-label">Max price</div><input class="p-input" placeholder="₦ Max"></div>
            <div><div class="af-label">Bedrooms</div><select class="f-sel" style="width:100%"><option>Any beds</option><option>Studio</option><option>1 bed</option><option>2 beds</option><option>3 beds</option><option>4+ beds</option></select></div>
            <div><div class="af-label">Bathrooms</div><select class="f-sel" style="width:100%"><option>Any baths</option><option>1</option><option>2</option><option>3+</option></select></div>
            <div style="display:flex;align-items:flex-end"><button class="s-btn" style="width:100%">Apply filters</button></div>
          </div>
        </div>
      </div>

      <div class="results-bar">
        <p class="rc"><strong>886</strong> properties in Rivers State</p>
        <div class="sort-row">
          <span class="sort-lbl">Sort by</span>
          <select class="sort-sel"><option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest first</option><option>Boosted first</option></select>
          <div class="vt">
            <button class={`vt-b ${selectedView === 'grid' ? 'active' : ''}`} 
                id="gbtn" 
                onclick={() => setView('grid')} 
                title="Grid">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/></svg>
            </button>
            <button class={`vt-b ${selectedView === 'list' ? 'active' : ''}`} 
                id="lbtn"  
                onclick={() => setView('list')}  
                title="List">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div class="layout">
        <aside class="sidebar">
          <div class="sb-sec"><div class="sb-t">Listing type</div><div class="sb-bg"><button class="sb-b active">All</button><button class="sb-b">For Rent</button><button class="sb-b">For Sale</button></div></div>
          <div class="sb-sec"><div class="sb-t">Price range</div><input type="range" class="sb-rng" min="0" max="100" value="60"><div class="sb-rl"><span>₦0</span><span>₦200M+</span></div></div>
          <div class="sb-sec">
            <div class="sb-t">Property type</div>
            <div class="sb-ci"><label><input type="checkbox" checked> Apartment/Flat</label><span class="sb-cnt">312</span></div>
            <div class="sb-ci"><label><input type="checkbox"> Detached house</label><span class="sb-cnt">198</span></div>
            <div class="sb-ci"><label><input type="checkbox"> Duplex</label><span class="sb-cnt">143</span></div>
            <div class="sb-ci"><label><input type="checkbox"> Terraced house</label><span class="sb-cnt">98</span></div>
            <div class="sb-ci"><label><input type="checkbox"> Land / Plot</label><span class="sb-cnt">87</span></div>
            <div class="sb-ci"><label><input type="checkbox"> Commercial</label><span class="sb-cnt">48</span></div>
          </div>
          <div class="sb-sec"><div class="sb-t">Bedrooms</div><div class="sb-bg"><button class="sb-b active">Any</button><button class="sb-b">1</button><button class="sb-b">2</button><button class="sb-b">3</button><button class="sb-b">4+</button></div></div>
          <div class="sb-sec">
            <div class="sb-t">Amenities</div>
            <div class="sb-ci"><label><input type="checkbox"> Virtual tour</label></div>
            <div class="sb-ci"><label><input type="checkbox"> Furnished</label></div>
            <div class="sb-ci"><label><input type="checkbox"> Parking</label></div>
            <div class="sb-ci"><label><input type="checkbox"> Serviced estate</label></div>
            <div class="sb-ci"><label><input type="checkbox"> Generator</label></div>
          </div>
          <div class="sb-sec"><div class="sb-t">Show boosted only</div><div class="sb-ci"><label><input type="checkbox"> Boosted listings</label></div></div>
          <span class="clr">Clear all filters</span>
        </aside>
      
        <main>
          <div class={`pgrid ${selectedView === 'list' ? 'lv' : ''}`} id="pg">
      
            <div class="pcard">
              <div class="pc-img"><div class="ps sky-1">
                <div class="pb" style="width:88px;height:115px;left:58px"></div>
                <div class="pw" style="width:13px;height:17px;left:70px;bottom:88px"></div><div class="pw" style="width:13px;height:17px;left:90px;bottom:88px"></div>
                <div class="pw" style="width:13px;height:17px;left:70px;bottom:62px"></div><div class="pw" style="width:13px;height:17px;left:90px;bottom:62px"></div>
                <div class="pb" style="width:58px;height:72px;left:165px"></div>
                <div class="pw" style="width:10px;height:12px;left:175px;bottom:50px"></div><div class="pw" style="width:10px;height:12px;left:191px;bottom:50px"></div>
              </div>
              <span class="pc-tag tag-rent">For Rent</span><span class="pc-boost"><span class="bd"></span>Boosted</span></div>
              <div class="pc-body">
                <div class="pc-price">₦950,000 <span>/ month</span></div>
                <div class="pc-addr"><div class="ad"></div>GRA Phase 2, Port Harcourt</div>
                <div class="pc-meta"><div class="mp"><div class="mpd"></div>3 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>115 m²</div></div>
                <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
              </div>
              <div class="ag-strip"><div class="ag-av">CO</div><span class="ag-name">Chukwuemeka O.</span><span class="ag-v">✓ Verified</span></div>
            </div>
      
            <div class="pcard">
              <div class="pc-img"><div class="ps sky-2">
                <div class="pb" style="width:105px;height:138px;left:70px"></div>
                <div class="pw" style="width:14px;height:18px;left:82px;bottom:108px"></div><div class="pw" style="width:14px;height:18px;left:104px;bottom:108px"></div>
                <div class="pw" style="width:14px;height:18px;left:82px;bottom:78px"></div><div class="pw" style="width:14px;height:18px;left:104px;bottom:78px"></div>
                <div class="pw" style="width:14px;height:18px;left:82px;bottom:50px"></div><div class="pw" style="width:14px;height:18px;left:104px;bottom:50px"></div>
              </div>
              <span class="pc-tag tag-sale">For Sale</span></div>
              <div class="pc-body">
                <div class="pc-price">₦62,000,000</div>
                <div class="pc-addr"><div class="ad"></div>Trans-Amadi, Port Harcourt</div>
                <div class="pc-meta"><div class="mp"><div class="mpd"></div>4 beds</div><div class="mp"><div class="mpd"></div>3 baths</div><div class="mp"><div class="mpd"></div>180 m²</div></div>
                <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
              </div>
              <div class="ag-strip"><div class="ag-av" style="background:var(--ember)">NW</div><span class="ag-name">Nkechi Williams</span><span class="ag-v">✓ Verified</span></div>
            </div>
      
            <div class="pcard">
              <div class="pc-img"><div class="ps sky-3">
                <div class="pb" style="width:78px;height:90px;left:48px"></div>
                <div class="pw" style="width:11px;height:14px;left:58px;bottom:65px"></div><div class="pw" style="width:11px;height:14px;left:75px;bottom:65px"></div>
                <div class="pw" style="width:11px;height:14px;left:58px;bottom:44px"></div><div class="pw" style="width:11px;height:14px;left:75px;bottom:44px"></div>
                <div class="pb" style="width:60px;height:62px;left:148px"></div>
                <div class="pw" style="width:9px;height:11px;left:157px;bottom:41px"></div>
              </div>
              <span class="pc-tag tag-rent">For Rent</span><span class="pc-boost"><span class="bd"></span>Boosted</span></div>
              <div class="pc-body">
                <div class="pc-price">₦380,000 <span>/ month</span></div>
                <div class="pc-addr"><div class="ad"></div>Rumuola, Port Harcourt</div>
                <div class="pc-meta"><div class="mp"><div class="mpd"></div>2 beds</div><div class="mp"><div class="mpd"></div>1 bath</div><div class="mp"><div class="mpd"></div>60 m²</div></div>
                <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
              </div>
              <div class="ag-strip"><div class="ag-av" style="background:var(--sage)">FI</div><span class="ag-name">Femi Ige</span><span class="ag-v">✓ Verified</span></div>
            </div>
      
            <div class="pcard">
              <div class="pc-img"><div class="ps sky-4">
                <div class="pb" style="width:125px;height:155px;left:62px"></div>
                <div class="pw" style="width:16px;height:20px;left:76px;bottom:122px"></div><div class="pw" style="width:16px;height:20px;left:100px;bottom:122px"></div><div class="pw" style="width:16px;height:20px;left:124px;bottom:122px"></div>
                <div class="pw" style="width:16px;height:20px;left:76px;bottom:93px"></div><div class="pw" style="width:16px;height:20px;left:100px;bottom:93px"></div><div class="pw" style="width:16px;height:20px;left:124px;bottom:93px"></div>
                <div class="pw" style="width:16px;height:20px;left:76px;bottom:64px"></div><div class="pw" style="width:16px;height:20px;left:100px;bottom:64px"></div>
              </div>
              <span class="pc-tag tag-sale">For Sale</span><span class="pc-boost"><span class="bd"></span>Boosted</span></div>
              <div class="pc-body">
                <div class="pc-price">₦145,000,000</div>
                <div class="pc-addr"><div class="ad"></div>GRA Phase 3, Port Harcourt</div>
                <div class="pc-meta"><div class="mp"><div class="mpd"></div>5 beds</div><div class="mp"><div class="mpd"></div>4 baths</div><div class="mp"><div class="mpd"></div>290 m²</div></div>
                <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
              </div>
              <div class="ag-strip"><div class="ag-av" style="background:var(--gold);color:var(--navy-deep)">KA</div><span class="ag-name">Kingsley Amadi</span><span class="ag-v">✓ Verified</span></div>
            </div>
      
            <div class="pcard">
              <div class="pc-img"><div class="ps sky-5">
                <div class="pb" style="width:72px;height:82px;left:50px"></div>
                <div class="pw" style="width:10px;height:13px;left:60px;bottom:58px"></div><div class="pw" style="width:10px;height:13px;left:76px;bottom:58px"></div>
                <div class="pw" style="width:10px;height:13px;left:60px;bottom:38px"></div><div class="pw" style="width:10px;height:13px;left:76px;bottom:38px"></div>
                <div class="pb" style="width:55px;height:52px;left:145px"></div>
                <div class="pw" style="width:8px;height:10px;left:154px;bottom:33px"></div>
              </div>
              <span class="pc-tag tag-rent">For Rent</span></div>
              <div class="pc-body">
                <div class="pc-price">₦280,000 <span>/ month</span></div>
                <div class="pc-addr"><div class="ad"></div>D-Line, Port Harcourt</div>
                <div class="pc-meta"><div class="mp"><div class="mpd"></div>1 bed</div><div class="mp"><div class="mpd"></div>1 bath</div><div class="mp"><div class="mpd"></div>42 m²</div></div>
                <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
              </div>
              <div class="ag-strip"><div class="ag-av" style="background:var(--navy-accent)">BO</div><span class="ag-name">Bola Okafor</span><span class="ag-v">✓ Verified</span></div>
            </div>
      
            <div class="pcard">
              <div class="pc-img"><div class="ps sky-1">
                <div class="pb" style="width:96px;height:106px;left:66px"></div>
                <div class="pw" style="width:13px;height:16px;left:77px;bottom:79px"></div><div class="pw" style="width:13px;height:16px;left:97px;bottom:79px"></div>
                <div class="pw" style="width:13px;height:16px;left:77px;bottom:55px"></div><div class="pw" style="width:13px;height:16px;left:97px;bottom:55px"></div>
                <div class="pb" style="width:68px;height:78px;left:178px"></div>
                <div class="pw" style="width:10px;height:13px;left:188px;bottom:55px"></div><div class="pw" style="width:10px;height:13px;left:204px;bottom:55px"></div>
              </div>
              <span class="pc-tag tag-sale">For Sale</span></div>
              <div class="pc-body">
                <div class="pc-price">₦38,500,000</div>
                <div class="pc-addr"><div class="ad"></div>Woji, Port Harcourt</div>
                <div class="pc-meta"><div class="mp"><div class="mpd"></div>3 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>128 m²</div></div>
                <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
              </div>
              <div class="ag-strip"><div class="ag-av">EM</div><span class="ag-name">Emeka Mba</span><span class="ag-v">✓ Verified</span></div>
            </div>
      
          </div>
        </main>
      </div>

      <div class="pag">
        <button class="pb2 arr"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Prev</button>
        <button class="pb2 act">1</button><button class="pb2">2</button><button class="pb2">3</button><button class="pb2">4</button><button class="pb2">5</button>
        <span class="pe">…</span><button class="pb2">19</button>
        <button class="pb2 arr">Next <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
      
      <div class="nearby-strip">
        <span class="ns-label">Also explore:</span>
        <a class="ns-pill" href="properties_lagos.html">Lagos State</a>
        <a class="ns-pill" href="properties_abuja.html">Abuja FCT</a>
        <a class="ns-pill" href="#">Delta State</a>
        <a class="ns-pill" href="#">Bayelsa</a>
        <a class="ns-pill" href="#">Akwa Ibom</a>
        <a class="ns-pill" href="properties_international.html">International</a>
      </div>

</div>

<style>
/* STATE HERO */
.state-hero{background:var(--navy-dark);padding:104px 5vw 56px;position:relative;overflow:hidden}
.state-hero::before{content:'';position:absolute;right:-60px;top:50%;transform:translateY(-50%);width:400px;height:400px;border-radius:50%;border:1px solid rgba(255,255,255,.05)}
.state-hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
.sh-inner{max-width:1400px;margin:0 auto;position:relative;z-index:2}
/* FIX: add flex-wrap to breadcrumb to prevent single-line overflow */
.sh-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.35);margin-bottom:16px;flex-wrap:wrap}
.sh-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
.sh-breadcrumb a:hover{color:#fff}
.sh-breadcrumb span{color:rgba(255,255,255,.2)}
.sh-state-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(27,107,58,.2);border:1px solid rgba(27,107,58,.35);border-radius:40px;padding:5px 14px 5px 10px;font-size:11px;color:#5CD689;letter-spacing:.08em;margin-bottom:16px}
.sh-flag-circle{width:16px;height:16px;border-radius:50%;background:linear-gradient(135deg,#008751 50%,#fff 50%);flex-shrink:0}
.sh-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,5vw,60px);font-weight:300;color:#fff;margin-bottom:10px;line-height:1.05}
.sh-title em{font-style:italic;color:var(--blue-bright)}
.sh-sub{font-size:14px;color:rgba(255,255,255,.45);font-weight:300;margin-bottom:28px}
.sh-stats{display:flex;gap:32px;flex-wrap:wrap}
.sh-stat{text-align:left}
.sh-stat-num{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:600;color:#fff}
.sh-stat-label{font-size:11px;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em}

/* LGA BAR — already scrolls horizontally, fine */
.lga-bar{background:var(--bg-2);padding:14px 5vw;border-bottom:1px solid var(--border);transition:background .3s,border-color .3s;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.lga-bar::-webkit-scrollbar{display:none}
.lga-inner{display:flex;gap:8px;max-width:1400px;margin:0 auto;align-items:center}
.lga-label{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);white-space:nowrap;margin-right:4px}
.lga-pill{font-size:12px;padding:5px 14px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0}
.lga-pill:hover{border-color:var(--navy-dark);color:var(--text-p)}
.lga-pill.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* SEARCH */
.search-wrap{max-width:1400px;margin:0 auto;padding:28px 5vw 0}
.search-surface{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px 24px;box-shadow:0 4px 24px var(--shadow);transition:background .3s,border-color .3s}
/* FIX sr-1: add flex-wrap so it stacks on small screens */
.sr-1{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap;margin-bottom:14px}
.s-input{flex:1 1 220px;min-width:0;display:flex;align-items:center;gap:10px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 16px;transition:border-color .2s,background .3s}
.s-input#mainSearch { flex: 2 1 40px }
.s-input:focus-within{border-color:var(--blue-link)}
.s-input input{flex:1;min-width:0;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text);width:100%}
.s-input input::placeholder{color:var(--text-s)}
/* FIX f-sel: add -webkit-appearance:none to prevent browser default sizing */
.f-sel{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:all .3s;min-width:0;-webkit-appearance:none;appearance:none}
.s-btn{background:var(--ember);color:#fff;border:none;border-radius:10px;padding:11px 28px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;flex-shrink:0}
.s-btn:hover{background:var(--ember-deep);transform:scale(1.02)}
/* FIX sr-2: was fixed 5-column, responsive versions below */
.sr-2{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:10px}
.af-label{font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--text-s);text-transform:uppercase;margin-bottom:5px}
.p-input{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);width:100%;outline:none;transition:all .3s;-webkit-appearance:none}

/* RESULTS BAR — FIX: add flex-wrap + gap */
.results-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:1400px;margin:0 auto;padding:20px 5vw 16px;flex-wrap:wrap}
.rc{font-size:14px;color:var(--text-s);font-weight:300}
.rc strong{color:var(--text-p);font-weight:500}
.sort-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.sort-lbl{font-size:13px;color:var(--text-s);white-space:nowrap}
.sort-sel{background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;padding:7px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:background .3s;-webkit-appearance:none;appearance:none}
.vt{display:flex;gap:4px}
.vt-b{width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-s);transition:all .2s;flex-shrink:0}
.vt-b.active,.vt-b:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* LAYOUT */
.layout{display:grid;grid-template-columns:248px 1fr;gap:0;max-width:1400px;margin:0 auto;padding:0 5vw 60px}
.sidebar{padding-right:26px;padding-top:4px}
.sb-sec{margin-bottom:26px}
.sb-t{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);margin-bottom:11px;padding-bottom:7px;border-bottom:1px solid var(--border)}
.sb-ci{display:flex;align-items:center;justify-content:space-between;padding:5px 0;cursor:pointer}
.sb-ci label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--text-p)}
.sb-ci input[type="checkbox"]{accent-color:var(--navy-dark);width:14px;height:14px;flex-shrink:0}
.sb-cnt{font-size:11px;color:var(--text-s);background:var(--bg-3);padding:1px 7px;border-radius:20px;flex-shrink:0}
.sb-rng{width:100%;accent-color:var(--navy-dark);margin:8px 0}
.sb-rl{display:flex;justify-content:space-between;font-size:11px;color:var(--text-s)}
.sb-bg{display:flex;gap:6px;flex-wrap:wrap}
.sb-b{font-size:12px;padding:5px 12px;border-radius:20px;border:1px solid var(--border);background:none;color:var(--text-p);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.sb-b.active,.sb-b:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.clr{font-size:12px;color:var(--ember);cursor:pointer;margin-top:4px;display:inline-block;text-decoration:underline}

/* CARDS */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:18px;align-content:start}
.pgrid.lv{grid-template-columns:1fr}
.pcard{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .2s}
.pcard:hover{transform:translateY(-4px);box-shadow:0 16px 48px var(--shadow-h);border-color:var(--blue-bright)}
.pc-img{height:190px;position:relative;overflow:hidden}
.ps{width:100%;height:100%;position:relative}
.sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
.sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
.sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
.sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
.sky-5{background:linear-gradient(160deg,#1A2E50 0%,#2E5078 60%,#5E8AB0 100%)}
.pb{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
.pw{position:absolute;background:rgba(212,174,58,.65);border-radius:2px}
.tag-rent{background:var(--tag-rent-bg);color:var(--tag-rent-text)}
.tag-sale{background:var(--tag-sale-bg);color:var(--tag-sale-text)}
.pc-tag{position:absolute;top:12px;left:12px;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px}
.pc-boost{position:absolute;top:12px;right:12px;background:var(--gold);color:var(--navy-deep);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:4px}
.bd{width:5px;height:5px;border-radius:50%;background:var(--navy-mid);flex-shrink:0}
.pc-body{padding:15px 17px 17px}
.pc-price{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:600;color:var(--text-p);margin-bottom:3px}
.pc-price span{font-size:13px;font-weight:300;color:var(--text-s)}
.pc-addr{font-size:12px;color:var(--text-s);margin-bottom:11px;display:flex;align-items:center;gap:5px}
.ad{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
/* FIX: pc-meta pills need flex-wrap so they don't overflow narrow cards */
.pc-meta{display:flex;gap:12px;padding-top:11px;border-top:1px solid var(--border);margin-bottom:11px;flex-wrap:wrap}
.mp{font-size:11px;color:var(--navy-accent);display:flex;align-items:center;gap:4px}
.mpd{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.pc-acts{display:flex;gap:7px}
.b-book{flex:1;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:9px 0;border-radius:40px;border:1px solid var(--navy-dark);color:var(--text-p);background:none;cursor:pointer;transition:all .2s;text-align:center}
.b-book:hover{background:var(--navy-dark);color:#fff}
.b-vt{flex:1;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:9px 0;border-radius:40px;background:var(--sage-light);color:var(--sage);border:none;cursor:pointer;transition:background .2s;text-align:center}
.b-vt:hover{background:#D0DECC}
:global([data-theme="dark"]) .b-vt{background:rgba(74,120,72,.2);color:#7DBF7A}
:global([data-theme="dark"]) .b-vt:hover{background:rgba(74,120,72,.35)}
:global([data-theme="dark"]) .b-book{border-color:rgba(255,255,255,.2);color:var(--text-p)}
:global([data-theme="dark"]) .b-book:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3)}
.pgrid.lv .pcard{display:grid;grid-template-columns:224px 1fr;height:172px}
.pgrid.lv .pc-img{height:100%;border-radius:16px 0 0 16px}
.pgrid.lv .pc-body{display:flex;flex-direction:column;justify-content:center}
.ag-strip{display:flex;align-items:center;gap:8px;padding:9px 17px;border-top:1px solid var(--border);background:var(--bg-2);transition:background .3s}
.ag-av{width:24px;height:24px;border-radius:50%;background:var(--navy-strong);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:#fff;flex-shrink:0}
/* FIX: truncate long agent names */
.ag-name{font-size:11px;color:var(--text-s);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ag-v{margin-left:auto;font-size:9px;color:var(--sage);font-weight:500;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;flex-shrink:0}

/* PAGINATION — FIX: add flex-wrap */
.pag{display:flex;align-items:center;justify-content:center;gap:6px;padding:36px 5vw;max-width:1400px;margin:0 auto;flex-wrap:wrap}
.pb2{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.pb2:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
.pb2.act{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.pb2.arr{width:auto;padding:0 14px;gap:5px;font-size:12px}
.pe{font-size:13px;color:var(--text-s);padding:0 4px}

/* NEARBY STRIP — already scrollable */
.nearby-strip{background:var(--bg-2);border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:14px 5vw;display:flex;align-items:center;gap:10px;overflow-x:auto;scrollbar-width:none;transition:background .3s;-webkit-overflow-scrolling:touch}
.nearby-strip::-webkit-scrollbar{display:none}
.ns-label{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);white-space:nowrap}
.ns-pill{font-size:12px;padding:6px 16px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0;text-decoration:none;display:inline-block}
.ns-pill:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* ══════════════════════════════════
   RESPONSIVE BREAKPOINTS
   Pure structural fixes — no visual changes
══════════════════════════════════ */

/* ≤ 900px */
@media(max-width:900px){
  /* Nav: hide desktop links, show hamburger */
  nav .nav-links{display:none}
  .hamburger{display:flex}
  /* Layout: full-width, hide sidebar */
  .layout{grid-template-columns:1fr}
  .sidebar{display:none}
  /* Search row 2: 3 columns */
  .sr-2{grid-template-columns:1fr 1fr 1fr}
  /* Footer: 2-column */
  .ft{grid-template-columns:1fr 1fr;gap:28px}
  /* List-view card: stack vertically */
  .pgrid.lv .pcard{grid-template-columns:1fr;height:auto}
  .pgrid.lv .pc-img{height:180px;border-radius:16px 16px 0 0}
}

/* ≤ 640px */
@media(max-width:640px){
  /* Search row 1: full column stack */
  .sr-1{flex-direction:column;gap:8px}
  .s-input{flex:none;width:100%}
  .f-sel{width:100%}
  .s-btn{width:100%}
  /* Search row 2: 2 columns */
  .sr-2{grid-template-columns:1fr 1fr}
  /* Tighter search padding */
  .search-surface{padding:16px}
  /* Results bar: stack */
  .results-bar{flex-direction:column;align-items:flex-start;gap:10px}
  .sort-row{width:100%;justify-content:space-between}
  /* Hero: reduce top padding */
  .state-hero{padding-top:90px;padding-bottom:44px}
  /* Footer: single column */
  .ft{grid-template-columns:1fr;gap:24px}
  .fb p{max-width:100%}
  /* Grid: single column */
  .pgrid{grid-template-columns:1fr}
}

/* ≤ 400px */
@media(max-width:400px){
  .nav-wordmark{font-size:15px;letter-spacing:.12em}
  .sr-2{grid-template-columns:1fr}
  .pb2:not(.arr):not(.act){display:none}
  .pe{display:none}
  .fb2{flex-direction:column;align-items:flex-start}
}
</style>