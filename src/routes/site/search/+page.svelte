<script lang="ts">
let showAdvanced = $state(false);
type ViewType = 'grid' | 'list';
let selectedView = $state<ViewType>('grid');

const setView = (view: ViewType) => selectedView = view;


const clearFilters = () => {}

const closeFilters = () => {}

const runSearch = () => {}

const toggleAdv = () => {
    showAdvanced = !showAdvanced;
};

const saveSearch = () => {}

const openFilters = () => {}
</script>

<!-- ═══════════════════════════════ FILTER OVERLAY + DRAWER ═══════════════════════════════ -->
<div class="filter-overlay" id="filterOverlay" onclick={closeFilters}></div>
<div class="filter-drawer" id="filterDrawer">
  <div class="fd-head">
    <span class="fd-title">Filters</span>
    <button class="fd-close" onclick={closeFilters}>
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M1 1l10 10M11 1L1 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
  </div>
  <div class="fd-body">
    <div class="sb-sec"><div class="sb-t">Listing type</div><div class="sb-bg"><button class="sb-b active">All</button><button class="sb-b">For Rent</button><button class="sb-b">For Sale</button></div></div>
    <div class="sb-sec">
      <div class="sb-t">Price range</div>
      <input type="range" class="sb-rng" min="0" max="100" value="65">
      <div class="sb-rl"><span>₦0</span><span>₦500M+</span></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
        <div><div class="af-label">Min</div><input class="p-input" placeholder="₦ Min"></div>
        <div><div class="af-label">Max</div><input class="p-input" placeholder="₦ Max"></div>
      </div>
    </div>
    <div class="sb-sec">
      <div class="sb-t">Property type</div>
      <div class="sb-ci"><label><input type="checkbox" checked> Apartment / Flat</label><span class="sb-cnt">1,204</span></div>
      <div class="sb-ci"><label><input type="checkbox"> Detached house</label><span class="sb-cnt">887</span></div>
      <div class="sb-ci"><label><input type="checkbox"> Duplex</label><span class="sb-cnt">542</span></div>
      <div class="sb-ci"><label><input type="checkbox"> Terraced house</label><span class="sb-cnt">391</span></div>
      <div class="sb-ci"><label><input type="checkbox"> Land / Plot</label><span class="sb-cnt">330</span></div>
      <div class="sb-ci"><label><input type="checkbox"> Commercial</label><span class="sb-cnt">218</span></div>
    </div>
    <div class="sb-sec"><div class="sb-t">Bedrooms</div><div class="sb-bg"><button class="sb-b active">Any</button><button class="sb-b">1</button><button class="sb-b">2</button><button class="sb-b">3</button><button class="sb-b">4+</button></div></div>
    <div class="sb-sec"><div class="sb-t">Bathrooms</div><div class="sb-bg"><button class="sb-b active">Any</button><button class="sb-b">1</button><button class="sb-b">2</button><button class="sb-b">3+</button></div></div>
    <div class="sb-sec">
      <div class="sb-t">Amenities</div>
      <div class="sb-ci"><label><input type="checkbox"> Virtual tour</label></div>
      <div class="sb-ci"><label><input type="checkbox"> Furnished</label></div>
      <div class="sb-ci"><label><input type="checkbox"> Parking</label></div>
      <div class="sb-ci"><label><input type="checkbox"> Serviced estate</label></div>
      <div class="sb-ci"><label><input type="checkbox"> Generator backup</label></div>
      <div class="sb-ci"><label><input type="checkbox"> Swimming pool</label></div>
    </div>
    <div class="sb-sec"><div class="sb-t">Boosted listings</div><div class="sb-ci"><label><input type="checkbox"> Show boosted only</label></div></div>
    <span class="clr" onclick={clearFilters}>Clear all filters</span>
  </div>
  <div class="fd-foot">
    <button class="btn-reset" onclick={clearFilters}>Reset</button>
    <button class="btn-apply" onclick={closeFilters}>Apply filters</button>
  </div>
</div>

<div style="margin-top:68px">

    <!-- ═══════════════════════════════ SEARCH HERO ═══════════════════════════════ -->
    <div class="sr-hero">
      <div class="srh-inner">
        <div class="srh-breadcrumb">
          <a href="index.html">Home</a><span>/</span>
          <a href="properties.html">Properties</a><span>/</span>
          <span>Search results</span>
        </div>
        <div class="srh-top">
          <div>
            <p class="srh-eyebrow">Search results</p>
            <h1 class="srh-title">Results for <em>"3 bed apartment,<br>Port Harcourt"</em></h1>
            <div class="srh-meta">
              <div class="srh-pulse"></div>
              <strong style="color:#fff;font-weight:500">247</strong> properties found
              <div class="srh-dot"></div>
              <span>Port Harcourt, Rivers State</span>
              <div class="srh-dot"></div>
              <span>Updated just now</span>
            </div>
          </div>
          <button class="btn-save-search" onclick={saveSearch}>
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Save search
          </button>
        </div>
    
        <!-- Search bar (in hero) -->
        <div class="search-surface">
          <div class="sr-1">
            <div class="s-input">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" style="color:var(--text-s);flex-shrink:0"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              <input type="text" id="mainSearch" value="3 bedroom apartment Port Harcourt" placeholder="City, neighbourhood, street or LGA…">
            </div>
            <select class="f-sel"><option>For Rent</option><option>For Sale</option><option>Buy or Rent</option></select>
            <select class="f-sel"><option>Apartment / Flat</option><option>Any type</option><option>Detached house</option><option>Duplex</option><option>Terraced</option><option>Land</option><option>Commercial</option></select>
            <button class="s-btn" onclick={runSearch}>Search</button>
          </div>
          <div class="sr-2">
            <div><div class="af-label">Min price</div><input class="p-input" placeholder="₦ Min" value="500,000"></div>
            <div><div class="af-label">Max price</div><input class="p-input" placeholder="₦ Max" value="2,000,000"></div>
            <div><div class="af-label">Bedrooms</div><select class="f-sel" style="width:100%"><option>3 beds</option><option>Any beds</option><option>Studio</option><option>1 bed</option><option>2 beds</option><option>4+ beds</option></select></div>
            <div><div class="af-label">State</div><select class="f-sel" style="width:100%"><option>Rivers State</option><option>All states</option><option>Lagos State</option><option>Abuja FCT</option><option>Delta State</option></select></div>
            <div style="display:flex;align-items:flex-end">
              <button class="s-btn" style="width:100%" onclick={runSearch}>Apply</button>
            </div>
          </div>
          <button class="adv-toggle" id="advBtn" onclick={toggleAdv}>
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
            More filters
            <svg class="adv-chev" id="advChev" width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <div class={`adv-panel ${showAdvanced ? 'open' : ''}`} id="advPanel">
            <div><div class="af-label">Furnishing</div><select class="f-sel" style="width:100%"><option>Any</option><option>Furnished</option><option>Unfurnished</option><option>Part-furnished</option></select></div>
            <div><div class="af-label">Parking</div><select class="f-sel" style="width:100%"><option>Any</option><option>1 space</option><option>2+ spaces</option><option>Secure garage</option></select></div>
            <div><div class="af-label">Floor area (m²)</div><input class="p-input" placeholder="e.g. 80–200"></div>
            <div><div class="af-label">Virtual tour</div><select class="f-sel" style="width:100%"><option>Any</option><option>Must have</option></select></div>
            <div><div class="af-label">Listed within</div><select class="f-sel" style="width:100%"><option>Any time</option><option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option></select></div>
            <div><div class="af-label">Estate type</div><select class="f-sel" style="width:100%"><option>Any</option><option>Serviced estate</option><option>Standalone</option></select></div>
            <div><div class="af-label">Bathrooms</div><select class="f-sel" style="width:100%"><option>Any baths</option><option>1</option><option>2</option><option>3+</option></select></div>
            <div><div class="af-label">Floor level</div><select class="f-sel" style="width:100%"><option>Any</option><option>Ground floor</option><option>Mid floor</option><option>Penthouse</option></select></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active filter chips -->
    <!-- <div class="chip-bar" id="chipBar">
    <span class="chip-label">Filters:</span>
    <span class="chip">For Rent <button onclick="removeChip(this)" title="Remove">×</button></span>
    <span class="chip">3 beds <button onclick="removeChip(this)" title="Remove">×</button></span>
    <span class="chip">₦500k – ₦2M /mo <button onclick="removeChip(this)" title="Remove">×</button></span>
    <span class="chip">Port Harcourt <button onclick="removeChip(this)" title="Remove">×</button></span>
    <span class="chip">Apartment <button onclick="removeChip(this)" title="Remove">×</button></span>
    <button class="chip-clear" onclick="clearFilters()">Clear all</button>
    </div> -->

    <!-- ═══════════════════════════════ AREA PILLS ═══════════════════════════════ -->
    <div class="area-bar">
    <div class="area-inner">
      <span class="area-lbl">Area:</span>
      <button class="area-pill active">All areas</button>
      <button class="area-pill">GRA Phase 1</button>
      <button class="area-pill">GRA Phase 2</button>
      <button class="area-pill">GRA Phase 3</button>
      <button class="area-pill">Trans-Amadi</button>
      <button class="area-pill">Woji</button>
      <button class="area-pill">D-Line</button>
      <button class="area-pill">Rumuola</button>
      <button class="area-pill">Obio/Akpor</button>
      <button class="area-pill">Eliozu</button>
      <button class="area-pill">Aba Road</button>
    </div>
  </div>

  <!-- ═══════════════════════════════ RESULTS BAR ═══════════════════════════════ -->
<div class="results-bar">
    <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
      <button class="mob-filter-btn" onclick={openFilters}>
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Filters
        <span class="mob-badge">5</span>
      </button>
      <p class="rc"><strong id="resCount">247</strong> properties found</p>
    </div>
    <div class="sort-row">
      <span class="sort-lbl">Sort by</span>
      <select class="sort-sel" id="sortSel"><option>Relevance</option><option>Price: Low to High</option><option>Price: High to Low</option><option>Newest first</option><option>Boosted first</option><option>Most viewed</option></select>
      <div class="vt">
        <button class={`vt-b ${selectedView === 'grid' ? 'active' : ''}`}
             id="gbtn" 
             onclick={() => setView('grid')}  
             title="Grid view"
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/></svg>
        </button>
        <button class={`vt-b ${selectedView === 'list' ? 'active' : ''}`} 
            id="lbtn" 
            onclick={() => setView('list')} 
            title="List view">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════ MAIN LAYOUT ═══════════════════════════════ -->
<div class="layout">

    <!-- ── SIDEBAR (desktop) ── -->
    <aside class="sidebar">
      <div class="sb-sec">
        <div class="sb-t">Listing type</div>
        <div class="sb-bg">
          <button class="sb-b active">All</button>
          <button class="sb-b">For Rent</button>
          <button class="sb-b">For Sale</button>
        </div>
      </div>
      <div class="sb-sec">
        <div class="sb-t">Price range (₦/month)</div>
        <input type="range" class="sb-rng" min="0" max="100" value="65">
        <div class="sb-rl"><span>₦0</span><span>₦5M+</span></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:10px">
          <div><div class="af-label">Min</div><input class="p-input" placeholder="₦ Min" value="500,000"></div>
          <div><div class="af-label">Max</div><input class="p-input" placeholder="₦ Max" value="2,000,000"></div>
        </div>
      </div>
      <div class="sb-sec">
        <div class="sb-t">Property type</div>
        <div class="sb-ci"><label><input type="checkbox" checked> Apartment / Flat</label><span class="sb-cnt">1,204</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Detached house</label><span class="sb-cnt">887</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Duplex</label><span class="sb-cnt">542</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Terraced house</label><span class="sb-cnt">391</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Land / Plot</label><span class="sb-cnt">330</span></div>
        <div class="sb-ci"><label><input type="checkbox"> Commercial</label><span class="sb-cnt">218</span></div>
      </div>
      <div class="sb-sec">
        <div class="sb-t">Bedrooms</div>
        <div class="sb-bg">
          <button class="sb-b active">Any</button>
          <button class="sb-b">1</button>
          <button class="sb-b">2</button>
          <button class="sb-b">3</button>
          <button class="sb-b">4+</button>
        </div>
      </div>
      <div class="sb-sec">
        <div class="sb-t">Bathrooms</div>
        <div class="sb-bg">
          <button class="sb-b active">Any</button>
          <button class="sb-b">1</button>
          <button class="sb-b">2</button>
          <button class="sb-b">3+</button>
        </div>
      </div>
      <div class="sb-sec">
        <div class="sb-t">Amenities</div>
        <div class="sb-ci"><label><input type="checkbox"> Virtual tour</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Furnished</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Parking</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Serviced estate</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Generator backup</label></div>
        <div class="sb-ci"><label><input type="checkbox"> Swimming pool</label></div>
      </div>
      <div class="sb-sec">
        <div class="sb-t">Boosted listings</div>
        <div class="sb-ci"><label><input type="checkbox"> Show boosted only</label></div>
      </div>
      <span class="clr" onclick={clearFilters}>Clear all filters</span>
    </aside>
  
    <!-- ── RESULTS ── -->
    <main>
    {#snippet favBtn(status: boolean)}
    {#if !status}
    <svg width="12" height="12" viewBox="0 0 20 20" fill="none" stroke="white" stroke-width="1.6">
        <path d="M10 17C10 17 2 12 2 6.5A4.5 4.5 0 0110 3.5 4.5 4.5 0 0118 6.5C18 12 10 17 10 17z"/>
    </svg>
    {:else}
    <svg width="12" height="12" viewBox="0 0 20 20" 
        fill="rgba(220,60,60,.85)" 
        stroke="rgba(220,60,60,.85)"
        stroke-width="1.6">
        <path d="M10 17C10 17 2 12 2 6.5A4.5 4.5 0 0110 3.5 4.5 4.5 0 0118 6.5C18 12 10 17 10 17z"/>
    </svg>
    {/if}
    {/snippet}
      <div class={`pgrid ${selectedView === 'list' ? 'lv' : ''}`} id="pg">
  
        <!-- CARD 1: Boosted + Rent -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-1">
            <div class="pb" style="width:90px;height:118px;left:60px"></div>
            <div class="pw" style="width:13px;height:17px;left:72px;bottom:90px"></div><div class="pw" style="width:13px;height:17px;left:92px;bottom:90px"></div>
            <div class="pw" style="width:13px;height:17px;left:72px;bottom:62px"></div><div class="pw" style="width:13px;height:17px;left:92px;bottom:62px"></div>
            <div class="pw" style="width:13px;height:17px;left:72px;bottom:35px"></div>
            <div class="pb" style="width:58px;height:72px;left:170px"></div>
            <div class="pw" style="width:9px;height:12px;left:180px;bottom:50px"></div><div class="pw" style="width:9px;height:12px;left:196px;bottom:50px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span>
          <span class="pc-boost"><span class="bd"></span>Boosted</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(true)}
        </button>
          <span class="pc-vt">Virtual tour</span>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦850,000 <span>/ month</span></div>
            <div class="pc-addr"><div class="ad"></div>GRA Phase 2, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>2 baths</div>
              <div class="mp"><div class="mpd"></div>110 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av">CO</div><span class="ag-name">Chukwuemeka O. · 4.9 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 2: Rent -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-2">
            <div class="pb" style="width:105px;height:138px;left:68px"></div>
            <div class="pw" style="width:14px;height:18px;left:80px;bottom:108px"></div><div class="pw" style="width:14px;height:18px;left:102px;bottom:108px"></div>
            <div class="pw" style="width:14px;height:18px;left:80px;bottom:78px"></div><div class="pw" style="width:14px;height:18px;left:102px;bottom:78px"></div>
            <div class="pw" style="width:14px;height:18px;left:80px;bottom:50px"></div><div class="pw" style="width:14px;height:18px;left:102px;bottom:50px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(false)}
            </button>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦1,100,000 <span>/ month</span></div>
            <div class="pc-addr"><div class="ad"></div>GRA Phase 1, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>3 baths</div>
              <div class="mp"><div class="mpd"></div>148 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--ember)">AM</div><span class="ag-name">Amara Madu · 4.7 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 3: For Sale + Boosted -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-3">
            <div class="pb" style="width:110px;height:148px;left:55px"></div>
            <div class="pw" style="width:15px;height:19px;left:67px;bottom:116px"></div><div class="pw" style="width:15px;height:19px;left:90px;bottom:116px"></div>
            <div class="pw" style="width:15px;height:19px;left:67px;bottom:86px"></div><div class="pw" style="width:15px;height:19px;left:90px;bottom:86px"></div>
            <div class="pw" style="width:15px;height:19px;left:67px;bottom:56px"></div><div class="pw" style="width:15px;height:19px;left:90px;bottom:56px"></div>
            <div class="pb" style="width:68px;height:84px;left:182px"></div>
            <div class="pw" style="width:10px;height:13px;left:192px;bottom:60px"></div><div class="pw" style="width:10px;height:13px;left:208px;bottom:60px"></div>
          </div>
          <span class="pc-tag tag-sale">For Sale</span>
          <span class="pc-boost"><span class="bd"></span>Boosted</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(true)}
            </button>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦85,000,000</div>
            <div class="pc-addr"><div class="ad"></div>Trans-Amadi, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>2 baths</div>
              <div class="mp"><div class="mpd"></div>132 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--navy-strong)">NW</div><span class="ag-name">Nkechi Williams · 4.5 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 4: Rent + virtual -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-4">
            <div class="pb" style="width:80px;height:94px;left:48px"></div>
            <div class="pw" style="width:11px;height:14px;left:58px;bottom:68px"></div><div class="pw" style="width:11px;height:14px;left:75px;bottom:68px"></div>
            <div class="pw" style="width:11px;height:14px;left:58px;bottom:46px"></div><div class="pw" style="width:11px;height:14px;left:75px;bottom:46px"></div>
            <div class="pb" style="width:58px;height:64px;left:150px"></div>
            <div class="pw" style="width:9px;height:11px;left:159px;bottom:43px"></div><div class="pw" style="width:9px;height:11px;left:174px;bottom:43px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(true)}
            </button>
          <span class="pc-vt">Virtual tour</span>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦620,000 <span>/ month</span></div>
            <div class="pc-addr"><div class="ad"></div>Woji, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>2 baths</div>
              <div class="mp"><div class="mpd"></div>98 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--sage)">BO</div><span class="ag-name">Bola Okafor · 4.8 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 5: Rent -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-5">
            <div class="pb" style="width:95px;height:122px;left:56px"></div>
            <div class="pw" style="width:13px;height:17px;left:67px;bottom:92px"></div><div class="pw" style="width:13px;height:17px;left:87px;bottom:92px"></div>
            <div class="pw" style="width:13px;height:17px;left:67px;bottom:64px"></div><div class="pw" style="width:13px;height:17px;left:87px;bottom:64px"></div>
            <div class="pw" style="width:13px;height:17px;left:67px;bottom:38px"></div>
            <div class="pb" style="width:62px;height:78px;left:170px"></div>
            <div class="pw" style="width:10px;height:13px;left:180px;bottom:55px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(true)}
            </button>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦780,000 <span>/ month</span></div>
            <div class="pc-addr"><div class="ad"></div>D-Line, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>2 baths</div>
              <div class="mp"><div class="mpd"></div>105 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--gold);color:var(--navy-deep)">KA</div><span class="ag-name">Kingsley Amadi · 5.0 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 6: For Sale -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-6">
            <div class="pb" style="width:128px;height:158px;left:58px"></div>
            <div class="pw" style="width:16px;height:20px;left:72px;bottom:126px"></div><div class="pw" style="width:16px;height:20px;left:96px;bottom:126px"></div><div class="pw" style="width:16px;height:20px;left:120px;bottom:126px"></div>
            <div class="pw" style="width:16px;height:20px;left:72px;bottom:96px"></div><div class="pw" style="width:16px;height:20px;left:96px;bottom:96px"></div><div class="pw" style="width:16px;height:20px;left:120px;bottom:96px"></div>
            <div class="pw" style="width:16px;height:20px;left:72px;bottom:66px"></div><div class="pw" style="width:16px;height:20px;left:96px;bottom:66px"></div>
          </div>
          <span class="pc-tag tag-sale">For Sale</span>
          <span class="pc-boost"><span class="bd"></span>Boosted</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(false)}
        </button>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦320,000,000</div>
            <div class="pc-addr"><div class="ad"></div>GRA Phase 3, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>5 beds</div>
              <div class="mp"><div class="mpd"></div>4 baths</div>
              <div class="mp"><div class="mpd"></div>340 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--navy-accent)">FI</div><span class="ag-name">Femi Ige · 4.6 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 7 -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-1">
            <div class="pb" style="width:74px;height:84px;left:46px"></div>
            <div class="pw" style="width:10px;height:13px;left:56px;bottom:60px"></div><div class="pw" style="width:10px;height:13px;left:72px;bottom:60px"></div>
            <div class="pw" style="width:10px;height:13px;left:56px;bottom:40px"></div><div class="pw" style="width:10px;height:13px;left:72px;bottom:40px"></div>
            <div class="pb" style="width:52px;height:56px;left:143px"></div>
            <div class="pw" style="width:8px;height:10px;left:151px;bottom:36px"></div><div class="pw" style="width:8px;height:10px;left:165px;bottom:36px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(false)}
        </button>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦450,000 <span>/ month</span></div>
            <div class="pc-addr"><div class="ad"></div>Rumuola, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>2 baths</div>
              <div class="mp"><div class="mpd"></div>82 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--ember)">ET</div><span class="ag-name">Emeka Tunde · 4.4 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 8 -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-3">
            <div class="pb" style="width:100px;height:112px;left:64px"></div>
            <div class="pw" style="width:13px;height:16px;left:75px;bottom:84px"></div><div class="pw" style="width:13px;height:16px;left:96px;bottom:84px"></div>
            <div class="pw" style="width:13px;height:16px;left:75px;bottom:58px"></div><div class="pw" style="width:13px;height:16px;left:96px;bottom:58px"></div>
            <div class="pw" style="width:13px;height:16px;left:75px;bottom:34px"></div>
            <div class="pb" style="width:62px;height:76px;left:178px"></div>
            <div class="pw" style="width:9px;height:12px;left:188px;bottom:54px"></div><div class="pw" style="width:9px;height:12px;left:203px;bottom:54px"></div>
          </div>
          <span class="pc-tag tag-sale">For Sale</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(true)}
            </button>
          <span class="pc-vt">Virtual tour</span>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦56,000,000</div>
            <div class="pc-addr"><div class="ad"></div>Eliozu, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>2 baths</div>
              <div class="mp"><div class="mpd"></div>108 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av">CN</div><span class="ag-name">Chioma Nwosu · 4.8 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
        <!-- CARD 9 -->
        <div class="pcard">
          <div class="pc-img"><div class="ps sky-5">
            <div class="pb" style="width:86px;height:102px;left:52px"></div>
            <div class="pw" style="width:12px;height:15px;left:62px;bottom:74px"></div><div class="pw" style="width:12px;height:15px;left:80px;bottom:74px"></div>
            <div class="pw" style="width:12px;height:15px;left:62px;bottom:50px"></div><div class="pw" style="width:12px;height:15px;left:80px;bottom:50px"></div>
            <div class="pw" style="width:12px;height:15px;left:62px;bottom:28px"></div>
            <div class="pb" style="width:56px;height:66px;left:156px"></div>
            <div class="pw" style="width:9px;height:11px;left:165px;bottom:45px"></div><div class="pw" style="width:9px;height:11px;left:180px;bottom:45px"></div>
          </div>
          <span class="pc-tag tag-rent">For Rent</span>
          <span class="pc-boost"><span class="bd"></span>Boosted</span>
          <button class="pc-heart" title="Save property">
            {@render favBtn(true)}
        </button>
          </div>
          <div class="pc-body">
            <div class="pc-price">₦1,350,000 <span>/ month</span></div>
            <div class="pc-addr"><div class="ad"></div>GRA Phase 1, Port Harcourt</div>
            <div class="pc-meta">
              <div class="mp"><div class="mpd"></div>3 beds</div>
              <div class="mp"><div class="mpd"></div>3 baths</div>
              <div class="mp"><div class="mpd"></div>162 m²</div>
            </div>
            <div class="pc-acts"><button class="b-book">Book viewing</button><button class="b-vt">Virtual tour</button></div>
          </div>
          <div class="ag-strip"><div class="ag-av" style="background:var(--sage)">AF</div><span class="ag-name">Adaeze Femi · 4.9 ★</span><span class="ag-v">✓ Verified</span></div>
        </div>
  
      </div><!-- /pgrid -->
  
      <!-- Empty state (hidden by default) -->
      <div class="empty-state" id="emptyState">
        <div class="empty-icon">🏠</div>
        <h2 class="empty-title">No properties <em style="font-style:italic">found.</em></h2>
        <p class="empty-sub">Try adjusting your filters or expanding your search area.</p>
      </div>
  
    </main>
  </div><!-- /layout -->

  <!-- ═══════════════════════════════ PAGINATION ═══════════════════════════════ -->
<div class="pag">
    <button class="pb2 arr"><svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> Prev</button>
    <button class="pb2 act">1</button>
    <button class="pb2">2</button>
    <button class="pb2">3</button>
    <button class="pb2">4</button>
    <button class="pb2">5</button>
    <span class="pe">…</span>
    <button class="pb2">21</button>
    <button class="pb2 arr">Next <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
  </div>

  

    </div>

<style>
/* ═══════════════ SEARCH HERO ═══════════════ */
.sr-hero{background:var(--navy-dark);padding:104px 5vw 52px;position:relative;overflow:hidden}
.sr-hero::before{content:'';position:absolute;right:-80px;top:50%;transform:translateY(-55%);width:480px;height:480px;border-radius:50%;border:1px solid rgba(255,255,255,.04)}
.sr-hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
.srh-inner{max-width:1400px;margin:0 auto;position:relative;z-index:2}
.srh-breadcrumb{display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.35);margin-bottom:18px;flex-wrap:wrap}
.srh-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
.srh-breadcrumb a:hover{color:#fff}
.srh-breadcrumb span{color:rgba(255,255,255,.2)}
.srh-top{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap;margin-bottom:28px}
.srh-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:8px}
.srh-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3.5vw,46px);font-weight:300;color:#fff;line-height:1.08;margin-bottom:6px}
.srh-title em{font-style:italic;color:var(--blue-bright)}
.srh-meta{font-size:13px;color:rgba(255,255,255,.45);font-weight:300;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.srh-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,.25);flex-shrink:0}
.srh-pulse{width:7px;height:7px;border-radius:50%;background:var(--blue-bright);flex-shrink:0;animation:pulse 2.2s infinite}
@keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.75)}}
.btn-save-search{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:500;color:rgba(255,255,255,.75);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:40px;padding:8px 16px;cursor:pointer;transition:all .2s;white-space:nowrap;flex-shrink:0}
.btn-save-search:hover{background:rgba(255,255,255,.14);border-color:rgba(255,255,255,.3);color:#fff}

/* ═══════════════ SEARCH BAR ═══════════════ */
.search-wrap{max-width:1400px;margin:0 auto;padding:28px 5vw 0}
.search-surface{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px 24px;box-shadow:0 4px 24px var(--shadow);transition:background .3s,border-color .3s}
.sr-1{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap;margin-bottom:14px}
.s-input{flex:2 1 100px;min-width:0;display:flex;align-items:center;gap:10px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 16px;transition:border-color .2s,background .3s}
.s-input:focus-within{border-color:var(--blue-link)}
.s-input input{flex:1;min-width:0;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text);width:100%}
.s-input input::placeholder{color:var(--text-s)}
.f-sel{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:all .3s;min-width:0;-webkit-appearance:none;appearance:none}
.s-btn{background:var(--ember);color:#fff;border:none;border-radius:10px;padding:11px 28px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;flex-shrink:0}
.s-btn:hover{background:var(--ember-deep);transform:scale(1.02)}
.sr-2{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr;gap:10px;align-items:end}
.af-label{font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--text-s);text-transform:uppercase;margin-bottom:5px}
.p-input{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);width:100%;outline:none;transition:all .3s;-webkit-appearance:none}

/* advanced toggle */
.adv-toggle{display:flex;align-items:center;gap:6px;font-size:12px;color:var(--blue-link);cursor:pointer;margin-top:12px;width:fit-content;background:none;border:none;font-family:'DM Sans',sans-serif;transition:color .2s}
.adv-toggle:hover{color:var(--navy-dark)}
.adv-chev{display:inline-block;transition:transform .2s}
.adv-chev.open{transform:rotate(180deg)}
.adv-panel{display:none;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)}
.adv-panel.open{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}

/* active filter chips */
.chip-bar{display:flex;align-items:center;gap:8px;flex-wrap:wrap;padding:16px 5vw 0;max-width:1400px;margin:0 auto}
.chip-label{font-size:11px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--text-s);flex-shrink:0}
.chip{display:inline-flex;align-items:center;gap:6px;padding:4px 10px 4px 12px;border-radius:40px;border:1px solid var(--blue-bright);background:rgba(74,144,226,.08);font-size:12px;color:var(--navy-dark);font-family:'DM Sans',sans-serif;transition:all .2s}
:global([data-theme="dark"]) .chip{color:#8DAACC;background:rgba(74,144,226,.1);border-color:rgba(74,144,226,.35)}
.chip button{background:none;border:none;cursor:pointer;color:var(--blue-link);font-size:14px;line-height:1;padding:0;transition:color .15s}
.chip button:hover{color:var(--ember)}
.chip-clear{font-size:12px;color:var(--ember);cursor:pointer;background:none;border:none;font-family:'DM Sans',sans-serif;text-decoration:underline;flex-shrink:0;transition:color .2s}
.chip-clear:hover{color:var(--ember-deep)}

/* ═══════════════ AREA PILLS ═══════════════ */
.area-bar{background:var(--bg-2);padding:14px 5vw;border-bottom:1px solid var(--border);transition:background .3s,border-color .3s;overflow-x:auto;scrollbar-width:none;-webkit-overflow-scrolling:touch}
.area-bar::-webkit-scrollbar{display:none}
.area-inner{display:flex;gap:8px;max-width:1400px;margin:0 auto;align-items:center}
.area-lbl{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);white-space:nowrap;margin-right:4px}
.area-pill{font-size:12px;padding:5px 14px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0}
.area-pill:hover{border-color:var(--navy-dark);color:var(--text-p)}
.area-pill.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* ═══════════════ RESULTS BAR ═══════════════ */
.results-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;max-width:1400px;margin:0 auto;padding:18px 5vw 14px;flex-wrap:wrap}
.rc{font-size:14px;color:var(--text-s);font-weight:300}
.rc strong{color:var(--text-p);font-weight:500}
.sort-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.sort-lbl{font-size:13px;color:var(--text-s);white-space:nowrap}
.sort-sel{background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;padding:7px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:background .3s;-webkit-appearance:none;appearance:none}
.vt{display:flex;gap:4px}
.vt-b{width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-s);transition:all .2s;flex-shrink:0}
.vt-b.active,.vt-b:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
/* mobile filter btn (hidden on desktop) */
.mob-filter-btn{display:none;align-items:center;gap:7px;font-size:13px;font-weight:500;color:var(--text-p);background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:7px 14px;cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0}
.mob-filter-btn:hover{border-color:var(--navy-dark)}
.mob-badge{background:var(--blue-bright);color:#fff;font-size:10px;font-weight:600;width:18px;height:18px;border-radius:50%;display:flex;align-items:center;justify-content:center}

/* ═══════════════ LAYOUT ═══════════════ */
.layout{display:grid;grid-template-columns:248px 1fr;gap:0;max-width:1400px;margin:0 auto;padding:0 5vw 64px}
.sidebar{padding-right:28px;padding-top:2px}
.sb-sec{margin-bottom:26px}
.sb-t{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);margin-bottom:11px;padding-bottom:7px;border-bottom:1px solid var(--border)}
.sb-ci{display:flex;align-items:center;justify-content:space-between;padding:5px 0;cursor:pointer}
.sb-ci label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--text-p)}
.sb-ci input[type="checkbox"]{accent-color:var(--navy-dark);width:14px;height:14px;flex-shrink:0}
.sb-cnt{font-size:11px;color:var(--text-s);background:var(--bg-3);padding:1px 7px;border-radius:20px;flex-shrink:0}
.sb-rng{width:100%;accent-color:var(--navy-dark);margin:8px 0;cursor:pointer}
.sb-rl{display:flex;justify-content:space-between;font-size:11px;color:var(--text-s)}
.sb-bg{display:flex;gap:6px;flex-wrap:wrap}
.sb-b{font-size:12px;padding:5px 12px;border-radius:20px;border:1px solid var(--border);background:none;color:var(--text-p);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.sb-b.active,.sb-b:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.clr{font-size:12px;color:var(--ember);cursor:pointer;margin-top:4px;display:inline-block;text-decoration:underline}
.clr:hover{color:var(--ember-deep)}

/* ═══════════════ PROPERTY GRID ═══════════════ */
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(268px,1fr));gap:18px;align-content:start}
.pgrid.lv{grid-template-columns:1fr}

/* ═══════════════ PROPERTY CARD ═══════════════ */
.pcard{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .2s;text-decoration:none;display:flex;flex-direction:column}
.pcard:hover{transform:translateY(-4px);box-shadow:0 16px 48px var(--shadow-h);border-color:var(--blue-bright)}
.pc-img{height:192px;position:relative;overflow:hidden;flex-shrink:0}
.ps{width:100%;height:100%;position:relative}
.sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
.sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
.sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
.sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
.sky-5{background:linear-gradient(160deg,#1A2E50 0%,#2E5078 60%,#5E8AB0 100%)}
.sky-6{background:linear-gradient(160deg,#0E2444 0%,#163658 48%,#2E5480 100%)}
.pb{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
.pw{position:absolute;background:rgba(212,174,58,.65);border-radius:2px}
.tag-rent{background:var(--tag-rent-bg);color:var(--tag-rent-text)}
.tag-sale{background:var(--tag-sale-bg);color:var(--tag-sale-text)}
.pc-tag{position:absolute;top:12px;left:12px;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px}
.pc-boost{position:absolute;top:12px;right:12px;background:var(--gold);color:var(--navy-deep);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:4px}
.bd{width:5px;height:5px;border-radius:50%;background:var(--navy-mid);flex-shrink:0}
/* heart save button */
.pc-heart{position:absolute;bottom:10px;right:12px;width:28px;height:28px;border-radius:50%;background:rgba(0,0,0,.25);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s}
.pc-heart:hover{background:rgba(0,0,0,.4)}
.pc-heart.saved{background:rgba(220,60,60,.55);border-color:rgba(220,60,60,.4)}
/* virtual badge */
.pc-vt{position:absolute;bottom:10px;left:12px;font-size:9px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;background:rgba(74,120,72,.75);color:#fff;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:5px}
.pc-vt::before{content:'';width:5px;height:5px;border-radius:50%;background:#fff;flex-shrink:0}

/* card body */
.pc-body{padding:15px 17px 17px;flex:1;display:flex;flex-direction:column}
.pc-price{font-family:'Cormorant Garamond',serif;font-size:21px;font-weight:600;color:var(--text-p);margin-bottom:3px}
.pc-price span{font-size:13px;font-weight:300;color:var(--text-s)}
.pc-addr{font-size:12px;color:var(--text-s);margin-bottom:11px;display:flex;align-items:center;gap:5px}
.ad{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.pc-meta{display:flex;gap:12px;padding-top:11px;border-top:1px solid var(--border);margin-bottom:11px;flex-wrap:wrap}
.mp{font-size:11px;color:var(--navy-accent);display:flex;align-items:center;gap:4px}
.mpd{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.pc-acts{display:flex;gap:7px;margin-top:auto}
.b-book{flex:1;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:9px 0;border-radius:40px;border:1px solid var(--navy-dark);color:var(--text-p);background:none;cursor:pointer;transition:all .2s;text-align:center}
.b-book:hover{background:var(--navy-dark);color:#fff}
.b-vt{flex:1;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:9px 0;border-radius:40px;background:var(--sage-light);color:var(--sage);border:none;cursor:pointer;transition:background .2s;text-align:center}
.b-vt:hover{background:#D0DECC}
:global([data-theme="dark"]) .b-vt{background:rgba(74,120,72,.2);color:#7DBF7A}
:global([data-theme="dark"]) .b-vt:hover{background:rgba(74,120,72,.35)}
:global([data-theme="dark"]) .b-book{border-color:rgba(255,255,255,.2);color:var(--text-p)}
:global([data-theme="dark"]) .b-book:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3)}

/* agent strip */
.ag-strip{display:flex;align-items:center;gap:8px;padding:9px 17px;border-top:1px solid var(--border);background:var(--bg-2);transition:background .3s;flex-shrink:0}
.ag-av{width:24px;height:24px;border-radius:50%;background:var(--navy-strong);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:#fff;flex-shrink:0}
.ag-name{font-size:11px;color:var(--text-s);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ag-v{margin-left:auto;font-size:9px;color:var(--sage);font-weight:500;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;flex-shrink:0}

/* list view */
.pgrid.lv .pcard{flex-direction:row;height:158px}
.pgrid.lv .pc-img{width:220px;height:158px;border-radius:16px 0 0 16px;flex-shrink:0}
.pgrid.lv .pc-body{justify-content:center}
.pgrid.lv .ag-strip{display:none}

/* ═══════════════ EMPTY STATE ═══════════════ */
.empty-state{text-align:center;padding:80px 20px;color:var(--text-s);display:none}
.empty-icon{font-size:44px;margin-bottom:16px;opacity:.3}
.empty-title{font-family:'Cormorant Garamond',serif;font-size:26px;color:var(--text-p);margin-bottom:8px;font-weight:300}
.empty-sub{font-size:14px;color:var(--text-s);font-weight:300}

/* ═══════════════ PAGINATION ═══════════════ */
.pag{display:flex;align-items:center;justify-content:center;gap:6px;padding:36px 5vw;max-width:1400px;margin:0 auto;flex-wrap:wrap}
.pb2{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.pb2:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
.pb2.act{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.pb2.arr{width:auto;padding:0 14px;gap:5px;font-size:12px}
.pe{font-size:13px;color:var(--text-s);padding:0 4px}

/* ═══════════════ MOBILE FILTER DRAWER ═══════════════ */
.filter-overlay{display:none;position:fixed;inset:0;z-index:298;background:rgba(6,14,28,.55);backdrop-filter:blur(3px)}
.filter-overlay.open{display:block}
.filter-drawer{position:fixed;top:0;left:0;bottom:0;z-index:299;width:min(320px,90vw);background:var(--surface);border-right:1px solid var(--border);overflow-y:auto;transform:translateX(-100%);transition:transform .3s cubic-bezier(.4,0,.2,1);padding-bottom:24px}
.filter-drawer.open{transform:translateX(0)}
.fd-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid var(--border);position:sticky;top:0;background:var(--surface);z-index:1}
.fd-title{font-size:15px;font-weight:500;color:var(--text-p)}
.fd-close{width:32px;height:32px;border-radius:50%;background:var(--bg-2);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text-s);transition:all .2s}
.fd-close:hover{background:var(--bg-3);color:var(--text-p)}
.fd-body{padding:20px}
.fd-foot{padding:16px 20px;border-top:1px solid var(--border);display:flex;gap:8px;position:sticky;bottom:0;background:var(--surface)}
.btn-apply{flex:1;background:var(--ember);color:#fff;border:none;border-radius:40px;padding:11px 0;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:background .2s}
.btn-apply:hover{background:var(--ember-deep)}
.btn-reset{flex:0 0 auto;background:none;border:1px solid var(--border);color:var(--text-s);border-radius:40px;padding:11px 18px;font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;transition:all .2s}
.btn-reset:hover{border-color:var(--navy-dark);color:var(--text-p)}

/* ═══════════════ RESPONSIVE ═══════════════ */
@media(max-width:900px){
  nav .nav-links{display:none}
  .hamburger{display:flex}
  .layout{grid-template-columns:1fr}
  .sidebar{display:none}
  .mob-filter-btn{display:flex}
  .sr-2{grid-template-columns:1fr 1fr 1fr}
  .ft{grid-template-columns:1fr 1fr;gap:28px}
  .pgrid.lv .pcard{flex-direction:column;height:auto}
  .pgrid.lv .pc-img{width:100%;height:180px;border-radius:16px 16px 0 0}
  .pgrid.lv .ag-strip{display:flex}
}
@media(max-width:640px){
  .sr-1{flex-direction:column;gap:8px}
  .s-input{flex:none;width:100%}
  .f-sel{width:100%}
  .s-btn{width:100%}
  .sr-2{grid-template-columns:1fr 1fr}
  .search-surface{padding:16px}
  .results-bar{flex-direction:column;align-items:flex-start;gap:10px}
  .sort-row{width:100%;justify-content:space-between}
  .sr-hero{padding-top:92px;padding-bottom:44px}
  .ft{grid-template-columns:1fr;gap:24px}
  .fb p{max-width:100%}
  .pgrid{grid-template-columns:1fr}
  .adv-panel.open{grid-template-columns:1fr 1fr}
  .chip-bar{padding-top:12px}
}
@media(max-width:400px){
  .nav-wordmark{font-size:15px;letter-spacing:.12em}
  .sr-2{grid-template-columns:1fr}
  .pb2:not(.arr):not(.act){display:none}
  .pe{display:none}
  .fb2{flex-direction:column;align-items:flex-start}
  .adv-panel.open{grid-template-columns:1fr}
}
</style>