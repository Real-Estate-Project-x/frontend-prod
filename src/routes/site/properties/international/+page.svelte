<script lang="ts">
type ViewType = 'grid' | 'list';
let selectedView = $state<ViewType>('grid');

const setView = (view: ViewType) => selectedView = view;

</script>

<div style="margin-top:68px">

    <!-- INTERNATIONAL HERO -->
    <div class="intl-hero">
      <div class="ih-inner">
        <div class="ih-crumb"><a href="index.html">Home</a><span>/</span><a href="properties.html">Properties</a><span>/</span><span>International</span></div>
        <div class="ih-badge"><div class="globe-icon"></div>Global listings · 28 countries</div>
        <h1 class="ih-title">Properties<br>across the <em>world</em></h1>
        <p class="ih-sub">Diaspora-friendly listings in the UK, US, Canada, UAE and beyond. Browse in your local currency — invest from anywhere.</p>
        <div class="ih-stats">
          <div class="ihs"><div class="ihs-num">1,840</div><div class="ihs-label">International listings</div></div>
          <div class="ihs"><div class="ihs-num">28</div><div class="ihs-label">Countries</div></div>
          <div class="ihs"><div class="ihs-num">64</div><div class="ihs-label">Verified global agents</div></div>
          <div class="ihs"><div class="ihs-num">Virtual</div><div class="ihs-label">Tours available</div></div>
        </div>
      </div>
    </div>
    
    <!-- DIASPORA CALLOUT -->
    <div class="diaspora-banner">
      <div class="db-inner">
        <div class="db-text">
          <h3>Investing from Nigeria? We've got you covered.</h3>
          <p>Seamlessly connect with verified agents abroad. All prices shown in your chosen currency with live exchange rates.</p>
        </div>
        <button class="db-btn">Diaspora investment guide</button>
      </div>
    </div>
    
    <!-- CONTINENT TABS -->
    <div class="cont-nav">
      <div class="cn-inner">
        <button class="cont-tab active">All regions</button>
        <button class="cont-tab">Europe</button>
        <button class="cont-tab">North America</button>
        <button class="cont-tab">Middle East</button>
        <button class="cont-tab">Africa (ex-Nigeria)</button>
        <button class="cont-tab">Asia Pacific</button>
        <button class="cont-tab">Caribbean</button>
      </div>
    </div>

    <!-- COUNTRY PILLS -->
<div class="country-bar">
    <div class="cbar-inner">
      <button class="country-pill active"><span class="cp-flag">🌍</span> All countries</button>
      <button class="country-pill"><span class="cp-flag">🇬🇧</span> United Kingdom</button>
      <button class="country-pill"><span class="cp-flag">🇺🇸</span> United States</button>
      <button class="country-pill"><span class="cp-flag">🇨🇦</span> Canada</button>
      <button class="country-pill"><span class="cp-flag">🇦🇪</span> UAE</button>
      <button class="country-pill"><span class="cp-flag">🇩🇪</span> Germany</button>
      <button class="country-pill"><span class="cp-flag">🇿🇦</span> South Africa</button>
      <button class="country-pill"><span class="cp-flag">🇬🇭</span> Ghana</button>
      <button class="country-pill"><span class="cp-flag">🇦🇺</span> Australia</button>
      <button class="country-pill"><span class="cp-flag">🇫🇷</span> France</button>
    </div>
  </div>

  <!-- CURRENCY NOTE -->
<div class="currency-note">
    <div class="cn-icon"></div>
    <span>Prices displayed in</span>
    <select class="cn-sel" id="currSel">
      <option>NGN (₦)</option>
      <option>USD ($)</option>
      <option>GBP (£)</option>
      <option>EUR (€)</option>
      <option>CAD (C$)</option>
      <option>AED (د.إ)</option>
    </select>
    <span>· Exchange rates updated daily · Prices are indicative</span>
  </div>

  <!-- SEARCH -->
<div class="search-wrap">
    <div class="search-surface">
      <div class="sr-1">
        <div class="s-input" style="flex:2">
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style="color:var(--text-s);flex-shrink:0"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <input type="text" placeholder="Search by country, city, postcode or neighbourhood…">
        </div>
        <select class="f-sel"><option>Buy or Rent</option><option>For Sale</option><option>For Rent</option></select>
        <select class="f-sel"><option>Property type</option><option>Apartment</option><option>House</option><option>Townhouse</option><option>Villa</option><option>Studio</option><option>Land</option></select>
        <button class="s-btn">Search</button>
      </div>
      <div class="sr-2">
        <div><div class="af-label">Country</div><select class="f-sel" style="width:100%"><option>All countries</option><option>United Kingdom</option><option>United States</option><option>Canada</option><option>UAE</option><option>Germany</option><option>South Africa</option><option>Ghana</option></select></div>
        <div><div class="af-label">Min price</div><input class="p-input" placeholder="Min"></div>
        <div><div class="af-label">Max price</div><input class="p-input" placeholder="Max"></div>
        <div><div class="af-label">Bedrooms</div><select class="f-sel" style="width:100%"><option>Any beds</option><option>Studio</option><option>1 bed</option><option>2 beds</option><option>3 beds</option><option>4+ beds</option></select></div>
        <div style="display:flex;align-items:flex-end"><button class="s-btn" style="width:100%">Apply</button></div>
      </div>
    </div>
  </div>

  <!-- RESULTS BAR -->
<div class="results-bar">
    <p class="rc"><strong>1,840</strong> international properties</p>
    <div class="sort-row">
      <span class="sort-lbl">Sort by</span>
      <select class="sort-sel"><option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest first</option><option>Boosted first</option></select>
      <div class="vt">
        <button class={`vt-b ${selectedView === 'grid' ? 'active' : ''}`} 
         id="gbtn" 
         onclick={() => setView('grid')}  
         title="Grid">
         <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
            <rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/>
            <rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/>
            <rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/>
            <rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/>
          </svg>
        </button>
        <button class={`vt-b ${selectedView === 'list' ? 'active' : ''}`} 
            id="lbtn" 
            onclick={() => setView('list')}  
            title="List">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- MAIN LAYOUT -->
<div class="layout">
    <aside class="sidebar">
      <div class="sb-sec"><div class="sb-t">Listing type</div><div class="sb-bg"><button class="sb-b active">All</button><button class="sb-b">For Rent</button><button class="sb-b">For Sale</button></div></div>
      <div class="sb-sec"><div class="sb-t">Price range</div><input type="range" class="sb-rng" min="0" max="100" value="65"><div class="sb-rl"><span>₦0</span><span>₦5B+</span></div></div>
      <div class="sb-sec">
        <div class="sb-t">Country</div>
        <div class="sb-ci"><label><input type="checkbox" checked> United Kingdom</label><span class="sb-cnt">438</span></div>
        <div class="sb-ci"><label><input type="checkbox" checked> United States</label><span class="sb-cnt">312</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Canada</label><span class="sb-cnt">198</span></div>
        <div class="sb-ci"><label><input type="checkbox"> UAE</label><span class="sb-cnt">176</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Germany</label><span class="sb-cnt">142</span></div>
        <div class="sb-ci"><label><input type="checkbox"> South Africa</label><span class="sb-cnt">118</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Ghana</label><span class="sb-cnt">96</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Australia</label><span class="sb-cnt">88</span></div>
      </div>
      <div class="sb-sec"><div class="sb-t">Bedrooms</div><div class="sb-bg"><button class="sb-b active">Any</button><button class="sb-b">1</button><button class="sb-b">2</button><button class="sb-b">3</button><button class="sb-b">4+</button></div></div>
      <div class="sb-sec">
        <div class="sb-t">Amenities</div>
        <div class="sb-ci"><label><input type="checkbox"> Virtual tour</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Furnished</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Parking</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Pet-friendly</label></div>
      </div>
      <div class="sb-sec"><div class="sb-t">Boosted listings</div><div class="sb-ci"><label><input type="checkbox"> Show boosted only</label></div></div>
      <span class="clr">Clear all filters</span>
    </aside>
  
    <main>
  
      <!-- Mobile filter toggle (hidden on desktop, sidebar hidden) -->
      <button class="mobile-filter-toggle" id="mobileFilterToggle">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Filters
      </button>
      <div class="mobile-sidebar" id="mobileSidebar">
        <div class="sb-sec"><div class="sb-t">Listing type</div><div class="sb-bg"><button class="sb-b active">All</button><button class="sb-b">For Rent</button><button class="sb-b">For Sale</button></div></div>
        <div class="sb-sec"><div class="sb-t">Price range</div><input type="range" class="sb-rng" min="0" max="100" value="65"><div class="sb-rl"><span>₦0</span><span>₦5B+</span></div></div>
        <div class="sb-sec">
          <div class="sb-t">Country</div>
          <div class="sb-ci"><label><input type="checkbox" checked> United Kingdom</label><span class="sb-cnt">438</span></div>
          <div class="sb-ci"><label><input type="checkbox" checked> United States</label><span class="sb-cnt">312</span></div>
          <div class="sb-ci"><label><input type="checkbox"> Canada</label><span class="sb-cnt">198</span></div>
          <div class="sb-ci"><label><input type="checkbox"> UAE</label><span class="sb-cnt">176</span></div>
          <div class="sb-ci"><label><input type="checkbox"> Germany</label><span class="sb-cnt">142</span></div>
          <div class="sb-ci"><label><input type="checkbox"> South Africa</label><span class="sb-cnt">118</span></div>
        </div>
        <div class="sb-sec"><div class="sb-t">Bedrooms</div><div class="sb-bg"><button class="sb-b active">Any</button><button class="sb-b">1</button><button class="sb-b">2</button><button class="sb-b">3</button><button class="sb-b">4+</button></div></div>
        <div class="sb-sec">
          <div class="sb-t">Amenities</div>
          <div class="sb-ci"><label><input type="checkbox"> Virtual tour</label></div>
          <div class="sb-ci"><label><input type="checkbox"> Furnished</label></div>
          <div class="sb-ci"><label><input type="checkbox"> Parking</label></div>
        </div>
        <span class="clr">Clear all filters</span>
      </div>
  
      <div class={`pgrid ${selectedView === 'list' ? 'lv' : ''}`} id="pg">
  
        <!-- UK -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-2">
            <div class="pb" style="width:95px;height:125px;left:62px"></div>
            <div class="pw" style="width:13px;height:17px;left:74px;bottom:95px"></div><div class="pw" style="width:13px;height:17px;left:94px;bottom:95px"></div>
            <div class="pw" style="width:13px;height:17px;left:74px;bottom:67px"></div><div class="pw" style="width:13px;height:17px;left:94px;bottom:67px"></div>
            <div class="pw" style="width:13px;height:17px;left:74px;bottom:40px"></div><div class="pw" style="width:13px;height:17px;left:94px;bottom:40px"></div>
            <div class="pb" style="width:62px;height:78px;left:170px"></div>
            <div class="pw" style="width:10px;height:13px;left:180px;bottom:55px"></div><div class="pw" style="width:10px;height:13px;left:196px;bottom:55px"></div>
          </div>
          <span class="pc-tag tag-sale">For Sale</span><span class="pc-boost"><span class="bd"></span>Boosted</span></div>
          <div class="pc-body">
            <div class="pc-price">£485,000 <span>· London, UK</span></div>
            <div class="pc-ngn" style="font-size:11px;color:var(--text-s);margin-bottom:10px;">≈ ₦963,000,000</div>
            <div class="pc-addr"><div class="ad"></div>Peckham, South London</div>
            <div class="pc-meta"><div class="mp"><div class="mpd"></div>3 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>88 m²</div></div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av">AD</div><span class="ag-name">Adaeze Dike · London Agent</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- US -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-5">
            <div class="pb" style="width:88px;height:108px;left:58px"></div>
            <div class="pw" style="width:12px;height:16px;left:70px;bottom:80px"></div><div class="pw" style="width:12px;height:16px;left:89px;bottom:80px"></div>
            <div class="pw" style="width:12px;height:16px;left:70px;bottom:55px"></div><div class="pw" style="width:12px;height:16px;left:89px;bottom:55px"></div>
            <div class="pb" style="width:60px;height:70px;left:162px"></div>
            <div class="pw" style="width:9px;height:12px;left:171px;bottom:48px"></div><div class="pw" style="width:9px;height:12px;left:186px;bottom:48px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span></div>
          <div class="pc-body">
            <div class="pc-price">$2,400 <span>/ month · Houston, TX</span></div>
            <div class="pc-ngn" style="font-size:11px;color:var(--text-s);margin-bottom:10px;">≈ ₦3,840,000 / month</div>
            <div class="pc-addr"><div class="ad"></div>Sugarland, Houston TX</div>
            <div class="pc-meta"><div class="mp"><div class="mpd"></div>2 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>92 m²</div></div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--ember)">TN</div><span class="ag-name">Tunde Nwachukwu · US Agent</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- UAE BOOSTED -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-4">
            <div class="pb" style="width:80px;height:155px;left:68px;border-radius:6px 6px 0 0"></div>
            <div class="pw" style="width:11px;height:14px;left:78px;bottom:122px"></div><div class="pw" style="width:11px;height:14px;left:95px;bottom:122px"></div>
            <div class="pw" style="width:11px;height:14px;left:78px;bottom:97px"></div><div class="pw" style="width:11px;height:14px;left:95px;bottom:97px"></div>
            <div class="pw" style="width:11px;height:14px;left:78px;bottom:72px"></div><div class="pw" style="width:11px;height:14px;left:95px;bottom:72px"></div>
            <div class="pw" style="width:11px;height:14px;left:78px;bottom:48px"></div><div class="pw" style="width:11px;height:14px;left:95px;bottom:48px"></div>
            <div class="pb" style="width:55px;height:90px;left:165px"></div>
            <div class="pw" style="width:9px;height:11px;left:174px;bottom:68px"></div><div class="pw" style="width:9px;height:11px;left:189px;bottom:68px"></div>
            <div class="pw" style="width:9px;height:11px;left:174px;bottom:48px"></div><div class="pw" style="width:9px;height:11px;left:189px;bottom:48px"></div>
          </div>
          <span class="pc-tag tag-sale">For Sale</span><span class="pc-boost"><span class="bd"></span>Boosted</span></div>
          <div class="pc-body">
            <div class="pc-price">AED 1,250,000 <span>· Dubai</span></div>
            <div class="pc-ngn" style="font-size:11px;color:var(--text-s);margin-bottom:10px;">≈ ₦868,000,000</div>
            <div class="pc-addr"><div class="ad"></div>Dubai Marina, UAE</div>
            <div class="pc-meta"><div class="mp"><div class="mpd"></div>2 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>104 m²</div></div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--gold);color:var(--navy-deep)">IO</div><span class="ag-name">Ifeoma Okeke · UAE Agent</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- Canada -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-3">
            <div class="pb" style="width:100px;height:115px;left:65px"></div>
            <div class="pw" style="width:13px;height:16px;left:76px;bottom:87px"></div><div class="pw" style="width:13px;height:16px;left:96px;bottom:87px"></div>
            <div class="pw" style="width:13px;height:16px;left:76px;bottom:62px"></div><div class="pw" style="width:13px;height:16px;left:96px;bottom:62px"></div>
            <div class="pw" style="width:13px;height:16px;left:76px;bottom:38px"></div><div class="pw" style="width:13px;height:16px;left:96px;bottom:38px"></div>
            <div class="pb" style="width:65px;height:72px;left:178px"></div>
            <div class="pw" style="width:10px;height:13px;left:188px;bottom:50px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span></div>
          <div class="pc-body">
            <div class="pc-price">C$2,100 <span>/ month · Toronto</span></div>
            <div class="pc-ngn" style="font-size:11px;color:var(--text-s);margin-bottom:10px;">≈ ₦3,150,000 / month</div>
            <div class="pc-addr"><div class="ad"></div>Scarborough, Toronto</div>
            <div class="pc-meta"><div class="mp"><div class="mpd"></div>1 bed</div><div class="mp"><div class="mpd"></div>1 bath</div><div class="mp"><div class="mpd"></div>55 m²</div></div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--sage)">EO</div><span class="ag-name">Emeka Obi · Canada Agent</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- South Africa -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-6">
            <div class="pb" style="width:86px;height:96px;left:55px"></div>
            <div class="pw" style="width:12px;height:15px;left:65px;bottom:70px"></div><div class="pw" style="width:12px;height:15px;left:83px;bottom:70px"></div>
            <div class="pw" style="width:12px;height:15px;left:65px;bottom:48px"></div><div class="pw" style="width:12px;height:15px;left:83px;bottom:48px"></div>
            <div class="pb" style="width:58px;height:65px;left:155px"></div>
            <div class="pw" style="width:9px;height:12px;left:164px;bottom:44px"></div><div class="pw" style="width:9px;height:12px;left:179px;bottom:44px"></div>
          </div>
          <span class="pc-tag tag-sale">For Sale</span><span class="pc-boost"><span class="bd"></span>Boosted</span></div>
          <div class="pc-body">
            <div class="pc-price">ZAR 2,400,000 <span>· Cape Town</span></div>
            <div class="pc-ngn" style="font-size:11px;color:var(--text-s);margin-bottom:10px;">≈ ₦320,000,000</div>
            <div class="pc-addr"><div class="ad"></div>Sea Point, Cape Town</div>
            <div class="pc-meta"><div class="mp"><div class="mpd"></div>2 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>78 m²</div></div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--navy-accent)">CN</div><span class="ag-name">Chiamaka N. · SA Agent</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- Ghana -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-1">
            <div class="pb" style="width:78px;height:85px;left:52px"></div>
            <div class="pw" style="width:11px;height:14px;left:62px;bottom:60px"></div><div class="pw" style="width:11px;height:14px;left:79px;bottom:60px"></div>
            <div class="pw" style="width:11px;height:14px;left:62px;bottom:39px"></div><div class="pw" style="width:11px;height:14px;left:79px;bottom:39px"></div>
            <div class="pb" style="width:55px;height:60px;left:148px"></div>
            <div class="pw" style="width:8px;height:11px;left:157px;bottom:39px"></div><div class="pw" style="width:8px;height:11px;left:171px;bottom:39px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span></div>
          <div class="pc-body">
            <div class="pc-price">GHS 14,000 <span>/ month · Accra</span></div>
            <div class="pc-ngn" style="font-size:11px;color:var(--text-s);margin-bottom:10px;">≈ ₦1,540,000 / month</div>
            <div class="pc-addr"><div class="ad"></div>East Legon, Accra</div>
            <div class="pc-meta"><div class="mp"><div class="mpd"></div>3 beds</div><div class="mp"><div class="mpd"></div>2 baths</div><div class="mp"><div class="mpd"></div>120 m²</div></div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av">BM</div><span class="ag-name">Bisi Mensah · Ghana Agent</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
      </div>
    </main>
  </div>
  
  <!-- PAGINATION -->
  <div class="pag">
    <button class="pb2 arr"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> <span class="pag-text">Prev</span></button>
    <button class="pb2 act">1</button><button class="pb2">2</button><button class="pb2">3</button><button class="pb2">4</button><button class="pb2">5</button>
    <span class="pe">…</span><button class="pb2">38</button>
    <button class="pb2 arr"><span class="pag-text">Next</span> <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>

    </div>

<style>
:root{--navy-deep:#060E1C;--navy-dark:#0A2463;--navy-mid:#0E2444;--navy-strong:#1F3F6A;--navy-accent:#4A70A0;--blue-bright:#4A90E2;--blue-link:#1A6ADE;--chalk:#FEFCF8;--chalk-2:#F7F3EC;--chalk-3:#EDE7DC;--chalk-muted:#8C8070;--ember:#C06035;--ember-light:#F5D5C5;--ember-deep:#5C2416;--gold:#D4AE3A;--sage:#4A7848;--sage-light:#EFF3EE;--bg:var(--chalk);--bg-2:var(--chalk-2);--bg-3:var(--chalk-3);--surface:#fff;--text-p:var(--navy-dark);--text-s:var(--chalk-muted);--border:var(--chalk-3);--card-bg:#fff;--input-bg:#fff;--input-border:var(--chalk-3);--input-text:var(--navy-dark);--nav-bg:var(--navy-dark);--footer-bg:var(--navy-dark);--shadow:rgba(10,36,99,.08);--shadow-h:rgba(10,36,99,.16);--tag-rent-bg:#E8EDF5;--tag-rent-text:var(--navy-strong);--tag-sale-bg:var(--ember-light);--tag-sale-text:var(--ember-deep)}
:global([data-theme="dark"]) {--bg:var(--navy-deep);--bg-2:#111826;--bg-3:#1A2438;--surface:#131C2E;--text-p:#E8EDF5;--text-s:#6A7FA0;--border:rgba(255,255,255,.08);--card-bg:#131C2E;--input-bg:#1A2438;--input-border:rgba(255,255,255,.1);--input-text:#E8EDF5;--nav-bg:#080F1C;--footer-bg:#080F1C;--shadow:rgba(0,0,0,.3);--shadow-h:rgba(0,0,0,.55);--tag-rent-bg:rgba(74,112,160,.18);--tag-rent-text:#8DAACC;--tag-sale-bg:rgba(192,96,53,.18);--tag-sale-text:#EDBA9B}

/* HERO */
.intl-hero{background:#060E1C;padding:104px 5vw 64px;position:relative;overflow:hidden}
.intl-hero::before{content:'';position:absolute;right:-80px;top:50%;transform:translateY(-60%);width:500px;height:500px;border-radius:50%;border:1px solid rgba(212,174,58,.07)}
.intl-hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
.ih-inner{max-width:1400px;margin:0 auto;position:relative;z-index:2}
.ih-crumb{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.3);margin-bottom:16px;flex-wrap:wrap}
.ih-crumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
.ih-crumb a:hover{color:#fff}
.ih-crumb span{color:rgba(255,255,255,.2)}
.ih-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(212,174,58,.12);border:1px solid rgba(212,174,58,.25);border-radius:40px;padding:5px 14px;font-size:11px;color:var(--gold);letter-spacing:.1em;text-transform:uppercase;margin-bottom:18px}
.globe-icon{width:16px;height:16px;border-radius:50%;border:2px solid var(--gold);display:inline-flex;align-items:center;justify-content:center;flex-shrink:0}
.ih-title{font-family:'Cormorant Garamond',serif;font-size:clamp(34px,5.5vw,68px);font-weight:300;color:#fff;line-height:1.05;margin-bottom:12px}
.ih-title em{font-style:italic;color:var(--gold)}
.ih-sub{font-size:14px;color:rgba(255,255,255,.42);font-weight:300;margin-bottom:32px;max-width:540px}
.ih-stats{display:flex;gap:36px;flex-wrap:wrap}
.ihs{text-align:left}
.ihs-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:600;color:#fff}
.ihs-label{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.1em}

/* CONTINENT NAV */
.cont-nav{background:var(--bg-2);padding:0 5vw;border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;transition:background .3s,border-color .3s}
.cont-nav::-webkit-scrollbar{display:none}
.cn-inner{display:flex;gap:0;max-width:1400px;margin:0 auto;min-width:min-content}
.cont-tab{font-size:13px;padding:14px 20px;border-bottom:2px solid transparent;background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;border-top:none;border-left:none;border-right:none;font-weight:400;flex-shrink:0}
.cont-tab:hover{color:var(--text-p)}
.cont-tab.active{color:var(--navy-dark);border-bottom-color:var(--navy-dark);font-weight:500}
:global([data-theme="dark"]) .cont-tab.active{color:var(--blue-bright);border-bottom-color:var(--blue-bright)}

/* COUNTRY PILLS */
.country-bar{background:var(--bg);padding:14px 5vw;border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch;transition:background .3s}
.country-bar::-webkit-scrollbar{display:none}
.cbar-inner{display:flex;gap:8px;max-width:1400px;margin:0 auto;align-items:center;min-width:min-content}
.country-pill{font-size:12px;padding:5px 14px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0;display:flex;align-items:center;gap:6px}
.country-pill:hover{border-color:var(--navy-dark);color:var(--text-p)}
.country-pill.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.cp-flag{font-size:14px;line-height:1}

/* CURRENCY NOTE */
.currency-note{display:flex;align-items:center;gap:8px;padding:10px 5vw;background:rgba(212,174,58,.06);border-bottom:1px solid rgba(212,174,58,.15);font-size:12px;color:var(--text-s);flex-wrap:wrap;transition:background .3s}
.cn-icon{width:6px;height:6px;border-radius:50%;background:var(--gold);flex-shrink:0}
.cn-sel{background:none;border:none;border-bottom:1px solid var(--gold);color:var(--gold);font-size:12px;font-family:'DM Sans',sans-serif;cursor:pointer;padding:0 2px;outline:none}

/* SEARCH */
.search-wrap{max-width:1400px;margin:0 auto;padding:28px 5vw 0}
.search-surface{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px 20px;box-shadow:0 4px 24px var(--shadow);transition:background .3s,border-color .3s}
.sr-1{display:flex;gap:10px;align-items:center;margin-bottom:14px;flex-wrap:wrap}
.s-input{flex:2;min-width:200px;display:flex;align-items:center;gap:10px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 16px;transition:border-color .2s,background .3s}
.s-input:focus-within{border-color:var(--blue-link)}
.s-input input{flex:1;min-width:0;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text)}
.s-input input::placeholder{color:var(--text-s)}
.f-sel{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:all .3s;min-width:0;max-width:100%}
.s-btn{background:var(--ember);color:#fff;border:none;border-radius:10px;padding:11px 28px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;flex-shrink:0}
.s-btn:hover{background:var(--ember-deep);transform:scale(1.02)}
.sr-2{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:10px}
.af-label{font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--text-s);text-transform:uppercase;margin-bottom:5px}
.p-input{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);width:100%;outline:none;transition:all .3s}

/* RESULTS BAR */
.results-bar{display:flex;align-items:center;justify-content:space-between;max-width:1400px;margin:0 auto;padding:20px 5vw 16px;flex-wrap:wrap;gap:10px}
.rc{font-size:14px;color:var(--text-s);font-weight:300}
.rc strong{color:var(--text-p);font-weight:500}
.sort-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.sort-lbl{font-size:13px;color:var(--text-s)}
.sort-sel{background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;padding:7px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:background .3s}
.vt{display:flex;gap:4px;margin-left:6px}
.vt-b{width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-s);transition:all .2s;flex-shrink:0}
.vt-b.active,.vt-b:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* MAIN LAYOUT */
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

/* MOBILE FILTER TOGGLE */
.mobile-filter-toggle{display:none;align-items:center;gap:8px;font-size:13px;font-weight:500;color:var(--text-p);background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:9px 16px;cursor:pointer;font-family:'DM Sans',sans-serif;width:100%;margin-bottom:12px}
.mobile-sidebar{display:none;background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px;margin-bottom:16px}
.mobile-sidebar.open{display:block}

/* CARDS */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:18px;align-content:start}
.pgrid.lv{grid-template-columns:1fr}
.pcard{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .2s}
.pcard:hover{transform:translateY(-4px);box-shadow:0 16px 48px var(--shadow-h);border-color:var(--blue-bright)}
.pc-img{height:190px;position:relative;overflow:hidden}
.ps{width:100%;height:100%;position:relative}
.sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
.sky-2{background:linear-gradient(155deg,#1a0e2e 0%,#2e1060 50%,#5040a0 100%)}
.sky-3{background:linear-gradient(160deg,#1a2c0e 0%,#2a4a14 50%,#4a7830 100%)}
.sky-4{background:linear-gradient(160deg,#2e1a0a 0%,#5c3010 50%,#8c5828 100%)}
.sky-5{background:linear-gradient(160deg,#0a1e30 0%,#0e3050 55%,#205880 100%)}
.sky-6{background:linear-gradient(160deg,#1a0a24 0%,#2e1040 50%,#503868 100%)}
.pb{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
.pw{position:absolute;background:rgba(212,174,58,.65);border-radius:2px}
.tag-rent{background:var(--tag-rent-bg);color:var(--tag-rent-text)}
.tag-sale{background:var(--tag-sale-bg);color:var(--tag-sale-text)}
.pc-tag{position:absolute;top:12px;left:12px;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px}
.pc-boost{position:absolute;top:12px;right:12px;background:var(--gold);color:var(--navy-deep);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:4px}
.bd{width:5px;height:5px;border-radius:50%;background:var(--navy-mid);flex-shrink:0}
.pc-body{padding:15px 17px 17px}
.pc-price{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:var(--text-p);margin-bottom:2px;word-break:break-word}
.pc-price span{font-size:12px;font-weight:300;color:var(--text-s)}
.pc-price .ngn{font-size:11px;color:var(--text-s);display:block;margin-top:1px}
.pc-addr{font-size:12px;color:var(--text-s);margin-bottom:10px;display:flex;align-items:center;gap:5px}
.ad{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.pc-country{font-size:10px;font-weight:500;letter-spacing:.07em;text-transform:uppercase;color:var(--navy-accent);margin-bottom:10px;display:flex;align-items:center;gap:5px}
.pc-meta{display:flex;gap:12px;padding-top:10px;border-top:1px solid var(--border);margin-bottom:11px;flex-wrap:wrap}
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
/* List view */
.pgrid.lv .pcard{display:grid;grid-template-columns:224px 1fr;height:200px}
.pgrid.lv .pc-img{height:100%;border-radius:16px 0 0 16px}
.pgrid.lv .pc-body{display:flex;flex-direction:column;justify-content:center}
.ag-strip{display:flex;align-items:center;gap:8px;padding:9px 17px;border-top:1px solid var(--border);background:var(--bg-2);transition:background .3s}
.ag-av{width:24px;height:24px;border-radius:50%;background:var(--navy-strong);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:#fff;flex-shrink:0}
.ag-name{font-size:11px;color:var(--text-s);min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ag-v{margin-left:auto;font-size:9px;color:var(--sage);font-weight:500;letter-spacing:.06em;text-transform:uppercase;flex-shrink:0}

/* DIASPORA BANNER */
.diaspora-banner{background:var(--navy-mid);padding:20px 5vw;border-top:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07)}
.db-inner{max-width:1400px;margin:0 auto;display:flex;align-items:center;gap:20px;justify-content:space-between;flex-wrap:wrap}
.db-text h3{font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:400;color:#fff;margin-bottom:4px}
.db-text p{font-size:13px;color:rgba(255,255,255,.5);font-weight:300}
.db-btn{background:var(--gold);color:var(--navy-deep);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:10px 24px;border-radius:40px;border:none;cursor:pointer;white-space:nowrap;transition:opacity .2s;flex-shrink:0}
.db-btn:hover{opacity:.88}

/* PAGINATION */
.pag{display:flex;align-items:center;justify-content:center;gap:6px;padding:36px 5vw;max-width:1400px;margin:0 auto;flex-wrap:wrap}
.pb2{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.pb2:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
.pb2.act{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.pb2.arr{width:auto;padding:0 14px;gap:5px;font-size:12px}
.pe{font-size:13px;color:var(--text-s);padding:0 4px}

/* ─── RESPONSIVE BREAKPOINTS ─── */

/* Tablet: hide sidebar, stack search filters */
@media(max-width:900px){
  .layout{grid-template-columns:1fr}
  .sidebar{display:none}
  .mobile-filter-toggle{display:flex}
  .sr-2{grid-template-columns:1fr 1fr}
  .ft{grid-template-columns:1fr 1fr}
  .pgrid.lv .pcard{grid-template-columns:1fr;height:auto}
  .pgrid.lv .pc-img{height:180px;border-radius:16px 16px 0 0}
  .ih-stats{gap:22px}
  .db-inner{flex-direction:column;align-items:flex-start;gap:14px}
}

/* Mobile */
@media(max-width:640px){
  .intl-hero{padding:88px 5vw 56px}
  .sr-1{flex-direction:column;align-items:stretch}
  .s-input{flex:none;width:100%}
  .f-sel{width:100%}
  .s-btn{width:100%}
  .sr-2{grid-template-columns:1fr 1fr}
  .results-bar{flex-direction:column;align-items:flex-start}
  .sort-row{width:100%;justify-content:space-between}
  .sort-sel{flex:1}
  .ft{grid-template-columns:1fr}
  .fb2{flex-direction:column;align-items:flex-start}
  .pag{gap:4px}
  .pb2.arr .pag-text{display:none}
  /* Hide some page numbers on very small screens */
  .pe{display:none}
  .ih-stats{gap:16px}
  .ih-stats .ihs{min-width:calc(50% - 8px)}
  .pgrid{grid-template-columns:1fr}
  .currency-note{font-size:11px;gap:6px}
}

/* Extra small: 320px */
@media(max-width:400px){
  .sr-2{grid-template-columns:1fr}
  .ih-badge{font-size:10px;padding:4px 10px}
  .db-btn{width:100%}
}
</style>