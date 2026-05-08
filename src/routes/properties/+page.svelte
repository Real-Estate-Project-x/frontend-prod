<script lang="ts">
type ViewType = 'grid' | 'list';

let selectedView = $state<ViewType>('grid');
let showAdvanced = $state(false);


const setView = (view: ViewType) => selectedView = view;

const toggleAdvanced = () => {
    showAdvanced = !showAdvanced;
}

</script>

<!-- ── LOCATION BANNER ── -->
<div style="margin-top:68px">
    <div class="loc-banner">
      <div class="loc-dot"></div>
      <span>Showing properties near <strong>Port Harcourt, Rivers State</strong></span>
    </div>
  </div>
  
  <!-- ── STATE NAV ── -->
  <div class="state-nav">
    <a href="/properties" class="state-pill active">All Nigeria</a>

    {#each [
        'rivers state', 
        'lagos state', 
        'abuja', 
        'delta state', 
        'ogun state', 
        'anambra state', 
        'kano state', 
        'enugu state', 
        'oyo state'] as _}
        <a href="/states/{_}" class="state-pill capitalize">{_} </a>
    {/each}
    
    <a href="/properties/international" class="state-pill capitalize">International</a>
  </div>

  <!-- ── PAGE HEADER ── -->
<div class="page-header">
    <div style="max-width:1400px;margin:0 auto">
      <div class="ph-breadcrumb">
        <a href="index.html">Home</a><span>/</span><a href="#">Properties</a><span>/</span><span>All Nigeria</span>
      </div>
      <p class="ph-eyebrow">All properties</p>
      <h1 class="ph-title">Find your place in Nigeria</h1>
      <p class="ph-sub">4,218 properties across 36 states · Updated today</p>
    </div>
  </div>

  <!-- ── SEARCH SECTION ── -->
<div class="search-section" style="padding-top:32px">

    <div class="search-bar-main">
      <!-- Row 1: main search -->
      <div class="search-row-1">
        <div class="search-input-wrap">
          <svg class="search-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <input type="text" 
          placeholder="Search by city, neighbourhood, landmark or LGA…" 
          id="mainSearch" />
        </div>
        <select class="filter-select">
          <option value="">Buy or Rent</option>
          <option>For Sale</option>
          <option>For Rent</option>
        </select>
        <select class="filter-select">
          <option value="">Property type</option>
          <option>Apartment / Flat</option>
          <option>Detached house</option>
          <option>Terraced house</option>
          <option>Semi-detached</option>
          <option>Duplex</option>
          <option>Land</option>
          <option>Commercial</option>
          <option>Office space</option>
        </select>
        <button class="search-btn-main">Search</button>
      </div>
  
      <!-- Row 2: filter chips -->
      <div class="search-row-2">
        <div>
          <div class="af-label">Min price</div>
          <input class="price-input" type="text" placeholder="₦ Min">
        </div>
        <div>
          <div class="af-label">Max price</div>
          <input class="price-input" type="text" placeholder="₦ Max">
        </div>
        <div>
          <div class="af-label">Bedrooms</div>
          <select class="filter-select" style="width:100%">
            <option>Any beds</option>
            <option>Studio</option>
            <option>1 bed</option>
            <option>2 beds</option>
            <option>3 beds</option>
            <option>4+ beds</option>
          </select>
        </div>
        <div>
          <div class="af-label">Bathrooms</div>
          <select class="filter-select" style="width:100%">
            <option>Any baths</option>
            <option>1 bath</option>
            <option>2 baths</option>
            <option>3+ baths</option>
          </select>
        </div>
        <div>
          <div class="af-label">State</div>
          <select class="filter-select" style="width:100%">
            <option>All states</option>
            <option>Rivers State</option>
            <option>Lagos State</option>
            <option>Abuja FCT</option>
            <option>Delta State</option>
            <option>Anambra</option>
          </select>
        </div>
        <div style="display:flex;align-items:flex-end">
          <button class="search-btn-main" style="width:100%">Apply</button>
        </div>
      </div>
  
      <!-- Advanced toggle -->
      <!-- svelte-ignore a11y_click_events_have_key_events -->
      <div class="advanced-toggle" id="advToggle" onclick={toggleAdvanced}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 4h10M4 7h6M6 10h2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Advanced filters
        <svg class="chevron" id="chevron" width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
  
      {#if showAdvanced}
      <!-- Advanced filters -->
      <div class={`advanced-filters ${showAdvanced ? 'open' : ''}`} id="advFilters">
        <div>
          <div class="af-label">Furnishing</div>
          <select class="filter-select" style="width:100%">
            <option>Any</option>
            <option>Furnished</option>
            <option>Unfurnished</option>
            <option>Part-furnished</option>
          </select>
        </div>
        <div>
          <div class="af-label">Kitchen</div>
          <select class="filter-select" style="width:100%">
            <option>Any</option>
            <option>Open plan</option>
            <option>Closed kitchen</option>
            <option>No kitchen</option>
          </select>
        </div>
        <div>
          <div class="af-label">Parking</div>
          <select class="filter-select" style="width:100%">
            <option>Any</option>
            <option>1 space</option>
            <option>2+ spaces</option>
            <option>Secure garage</option>
          </select>
        </div>
        <div>
          <div class="af-label">Floor area (m²)</div>
          <div style="display:flex;gap:6px">
            <input class="price-input" type="text" placeholder="Min">
            <input class="price-input" type="text" placeholder="Max">
          </div>
        </div>
        <div>
          <div class="af-label">Listed in</div>
          <select class="filter-select" style="width:100%">
            <option>Any time</option>
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
        </div>
        <div>
          <div class="af-label">Virtual tour</div>
          <select class="filter-select" style="width:100%">
            <option>Any</option>
            <option>Available only</option>
          </select>
        </div>
        <div>
          <div class="af-label">Estate / serviced</div>
          <select class="filter-select" style="width:100%">
            <option>Any</option>
            <option>Serviced estate</option>
            <option>Standalone</option>
          </select>
        </div>
        <div>
          <div class="af-label">Floor level</div>
          <select class="filter-select" style="width:100%">
            <option>Any</option>
            <option>Ground floor</option>
            <option>Mid floor</option>
            <option>Top floor / penthouse</option>
          </select>
        </div>
      </div>
      {/if}
    </div>
  </div>

  <!-- ── RESULTS BAR ── -->
<div class="results-bar">
    <p class="results-count"><strong>4,218</strong> properties found · sorted by relevance</p>
    <div class="sort-wrap">
      <span class="sort-label">Sort by</span>
      <select class="sort-select" id="sortSelect">
        <option>Relevance</option>
        <option>Price: Low to High</option>
        <option>Price: High to Low</option>
        <option>Newest first</option>
        <option>Most viewed</option>
        <option>Boosted first</option>
      </select>
      <div class="view-toggle">
        <button class={`vt-btn ${selectedView === 'grid' ? 'active' : ''}`} 
            id="gridBtn" 
            onclick={() => setView('grid')} 
            title="Grid view">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/></svg>
        </button>
        <button class={`vt-btn ${selectedView === 'list' ? 'active' : ''}`} 
            id="listBtn" 
            onclick={() => setView('list')} 
            title="List view">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M1 7h12M1 11h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
        </button>
      </div>
    </div>
  </div>

  <!-- ── MAIN LAYOUT ── -->
<div class="listings-layout">

    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="sb-section">
        <div class="sb-title">Listing type</div>
        <div class="sb-btn-group">
          <button class="sb-btn active">All</button>
          <button class="sb-btn">For Rent</button>
          <button class="sb-btn">For Sale</button>
        </div>
      </div>
  
      <div class="sb-section">
        <div class="sb-title">Price range</div>
        <input type="range" class="sb-range" min="0" max="100" value="70" id="priceRange">
        <div class="sb-range-labels"><span>₦0</span><span>₦500M+</span></div>
      </div>
  
      <div class="sb-section">
        <div class="sb-title">Property type</div>
        <div class="sb-check-item"><label><input type="checkbox" checked> Apartment / Flat</label><span class="sb-count">1,204</span></div>
        <div class="sb-check-item"><label><input type="checkbox"> Detached house</label><span class="sb-count">887</span></div>
        <div class="sb-check-item"><label><input type="checkbox"> Duplex</label><span class="sb-count">542</span></div>
        <div class="sb-check-item"><label><input type="checkbox"> Terraced house</label><span class="sb-count">391</span></div>
        <div class="sb-check-item"><label><input type="checkbox"> Land / Plot</label><span class="sb-count">330</span></div>
        <div class="sb-check-item"><label><input type="checkbox"> Commercial</label><span class="sb-count">218</span></div>
      </div>
  
      <div class="sb-section">
        <div class="sb-title">Bedrooms</div>
        <div class="sb-btn-group">
          <button class="sb-btn active">Any</button>
          <button class="sb-btn">1</button>
          <button class="sb-btn">2</button>
          <button class="sb-btn">3</button>
          <button class="sb-btn">4+</button>
        </div>
      </div>
  
      <div class="sb-section">
        <div class="sb-title">Amenities</div>
        <div class="sb-check-item"><label><input type="checkbox"> Virtual tour</label></div>
        <div class="sb-check-item"><label><input type="checkbox"> Furnished</label></div>
        <div class="sb-check-item"><label><input type="checkbox"> Parking</label></div>
        <div class="sb-check-item"><label><input type="checkbox"> Serviced estate</label></div>
        <div class="sb-check-item"><label><input type="checkbox"> Generator</label></div>
        <div class="sb-check-item"><label><input type="checkbox"> Swimming pool</label></div>
      </div>
  
      <div class="sb-section">
        <div class="sb-title">Boosted listings</div>
        <div class="sb-check-item"><label><input type="checkbox"> Show boosted only</label></div>
      </div>
  
      <span class="clear-filters">Clear all filters</span>
    </aside>
  
    <!-- PROPERTY GRID -->
    <main>
      <div class={`prop-grid ${selectedView === 'list' ? 'list-view' : ''}`} id="propGrid">
  
        <!-- BOOSTED 1 -->
        <div class="pcard">
          <div class="pcard-img"><div class="prop-scene sky-1">
            <div class="prop-building" style="width:90px;height:120px;left:60px"></div>
            <div class="prop-window" style="width:13px;height:17px;left:72px;bottom:90px"></div>
            <div class="prop-window" style="width:13px;height:17px;left:92px;bottom:90px"></div>
            <div class="prop-window" style="width:13px;height:17px;left:72px;bottom:62px"></div>
            <div class="prop-window" style="width:13px;height:17px;left:92px;bottom:62px"></div>
            <div class="prop-building" style="width:60px;height:75px;left:170px"></div>
            <div class="prop-window" style="width:10px;height:12px;left:180px;bottom:53px"></div>
            <div class="prop-window" style="width:10px;height:12px;left:196px;bottom:53px"></div>
          </div>
          <span class="pcard-tag badge-rent">For Rent</span>
          <span class="pcard-boost"><span class="boost-dot"></span>Boosted</span>
          </div>
          <div class="pcard-body">
            <div class="pcard-price">₦850,000 <span>/ month</span></div>
            <div class="pcard-addr"><div class="addr-dot"></div>GRA Phase 2, Port Harcourt</div>
            <div class="pcard-meta">
              <div class="meta-pill"><div class="mp-dot"></div>3 beds</div>
              <div class="meta-pill"><div class="mp-dot"></div>2 baths</div>
              <div class="meta-pill"><div class="mp-dot"></div>110 m²</div>
            </div>
            <div class="pcard-actions">
              <button class="btn-book">Book viewing</button>
              <button class="btn-vt">Virtual tour</button>
            </div>
          </div>
          <div class="agent-strip">
            <div class="agent-av">CO</div>
            <span class="agent-name">Listed by Chukwuemeka O.</span>
            <span class="agent-verified">✓ Verified</span>
          </div>
        </div>
  
        <!-- SALE 1 -->
        <div class="pcard">
          <div class="pcard-img"><div class="prop-scene sky-2">
            <div class="prop-building" style="width:110px;height:145px;left:75px"></div>
            <div class="prop-window" style="width:15px;height:19px;left:88px;bottom:112px"></div>
            <div class="prop-window" style="width:15px;height:19px;left:110px;bottom:112px"></div>
            <div class="prop-window" style="width:15px;height:19px;left:88px;bottom:82px"></div>
            <div class="prop-window" style="width:15px;height:19px;left:110px;bottom:82px"></div>
            <div class="prop-window" style="width:15px;height:19px;left:88px;bottom:52px"></div>
            <div class="prop-window" style="width:15px;height:19px;left:110px;bottom:52px"></div>
          </div>
          <span class="pcard-tag badge-sale">For Sale</span>
          </div>
          <div class="pcard-body">
            <div class="pcard-price">₦95,000,000</div>
            <div class="pcard-addr"><div class="addr-dot"></div>Lekki Phase 1, Lagos</div>
            <div class="pcard-meta">
              <div class="meta-pill"><div class="mp-dot"></div>4 beds</div>
              <div class="meta-pill"><div class="mp-dot"></div>3 baths</div>
              <div class="meta-pill"><div class="mp-dot"></div>185 m²</div>
            </div>
            <div class="pcard-actions">
              <button class="btn-book">Book viewing</button>
              <button class="btn-vt">Virtual tour</button>
            </div>
          </div>
          <div class="agent-strip">
            <div class="agent-av" style="background:var(--ember)">AM</div>
            <span class="agent-name">Listed by Amara Madu</span>
            <span class="agent-verified">✓ Verified</span>
          </div>
        </div>
  
        <!-- BOOSTED 2 -->
        <div class="pcard">
          <div class="pcard-img"><div class="prop-scene sky-3">
            <div class="prop-building" style="width:80px;height:95px;left:45px"></div>
            <div class="prop-window" style="width:12px;height:15px;left:55px;bottom:68px"></div>
            <div class="prop-window" style="width:12px;height:15px;left:73px;bottom:68px"></div>
            <div class="prop-window" style="width:12px;height:15px;left:55px;bottom:46px"></div>
            <div class="prop-window" style="width:12px;height:15px;left:73px;bottom:46px"></div>
            <div class="prop-building" style="width:65px;height:65px;left:148px"></div>
            <div class="prop-window" style="width:10px;height:12px;left:158px;bottom:43px"></div>
            <div class="prop-window" style="width:10px;height:12px;left:174px;bottom:43px"></div>
          </div>
          <span class="pcard-tag badge-rent">For Rent</span>
          <span class="pcard-boost"><span class="boost-dot"></span>Boosted</span>
          </div>
          <div class="pcard-body">
            <div class="pcard-price">₦2,200,000 <span>/ year</span></div>
            <div class="pcard-addr"><div class="addr-dot"></div>Maitama, Abuja FCT</div>
            <div class="pcard-meta">
              <div class="meta-pill"><div class="mp-dot"></div>2 beds</div>
              <div class="meta-pill"><div class="mp-dot"></div>2 baths</div>
              <div class="meta-pill"><div class="mp-dot"></div>75 m²</div>
            </div>
            <div class="pcard-actions">
              <button class="btn-book">Book viewing</button>
              <button class="btn-vt">Virtual tour</button>
            </div>
          </div>
          <div class="agent-strip">
            <div class="agent-av" style="background:var(--sage)">BO</div>
            <span class="agent-name">Listed by Bola Okafor</span>
            <span class="agent-verified">✓ Verified</span>
          </div>
        </div>
  
        <!-- SALE 2 -->
        <div class="pcard">
          <div class="pcard-img"><div class="prop-scene sky-4">
            <div class="prop-building" style="width:130px;height:160px;left:60px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:75px;bottom:128px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:100px;bottom:128px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:125px;bottom:128px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:75px;bottom:98px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:100px;bottom:98px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:125px;bottom:98px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:75px;bottom:68px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:100px;bottom:68px"></div>
            <div class="prop-window" style="width:16px;height:20px;left:125px;bottom:68px"></div>
          </div>
          <span class="pcard-tag badge-sale">For Sale</span>
          <span class="pcard-boost"><span class="boost-dot"></span>Boosted</span>
          </div>
          <div class="pcard-body">
            <div class="pcard-price">₦320,000,000</div>
            <div class="pcard-addr"><div class="addr-dot"></div>Victoria Island, Lagos</div>
            <div class="pcard-meta">
              <div class="meta-pill"><div class="mp-dot"></div>5 beds</div>
              <div class="meta-pill"><div class="mp-dot"></div>4 baths</div>
              <div class="meta-pill"><div class="mp-dot"></div>340 m²</div>
            </div>
            <div class="pcard-actions">
              <button class="btn-book">Book viewing</button>
              <button class="btn-vt">Virtual tour</button>
            </div>
          </div>
          <div class="agent-strip">
            <div class="agent-av" style="background:var(--navy-accent)">KA</div>
            <span class="agent-name">Listed by Kingsley A.</span>
            <span class="agent-verified">✓ Verified</span>
          </div>
        </div>
  
        <!-- RENT 3 -->
        <div class="pcard">
          <div class="pcard-img"><div class="prop-scene sky-5">
            <div class="prop-building" style="width:75px;height:85px;left:50px"></div>
            <div class="prop-window" style="width:11px;height:14px;left:60px;bottom:60px"></div>
            <div class="prop-window" style="width:11px;height:14px;left:77px;bottom:60px"></div>
            <div class="prop-window" style="width:11px;height:14px;left:60px;bottom:40px"></div>
            <div class="prop-window" style="width:11px;height:14px;left:77px;bottom:40px"></div>
            <div class="prop-building" style="width:55px;height:55px;left:148px"></div>
            <div class="prop-window" style="width:9px;height:11px;left:157px;bottom:35px"></div>
          </div>
          <span class="pcard-tag badge-rent">For Rent</span>
          </div>
          <div class="pcard-body">
            <div class="pcard-price">₦450,000 <span>/ month</span></div>
            <div class="pcard-addr"><div class="addr-dot"></div>Rumuola, Port Harcourt</div>
            <div class="pcard-meta">
              <div class="meta-pill"><div class="mp-dot"></div>2 beds</div>
              <div class="meta-pill"><div class="mp-dot"></div>1 bath</div>
              <div class="meta-pill"><div class="mp-dot"></div>58 m²</div>
            </div>
            <div class="pcard-actions">
              <button class="btn-book">Book viewing</button>
              <button class="btn-vt">Virtual tour</button>
            </div>
          </div>
          <div class="agent-strip">
            <div class="agent-av" style="background:var(--gold);color:var(--navy-deep)">NW</div>
            <span class="agent-name">Listed by Nkechi W.</span>
            <span class="agent-verified">✓ Verified</span>
          </div>
        </div>
  
        <!-- SALE 3 -->
        <div class="pcard">
          <div class="pcard-img"><div class="prop-scene sky-6">
            <div class="prop-building" style="width:100px;height:110px;left:65px"></div>
            <div class="prop-window" style="width:14px;height:17px;left:76px;bottom:82px"></div>
            <div class="prop-window" style="width:14px;height:17px;left:97px;bottom:82px"></div>
            <div class="prop-window" style="width:14px;height:17px;left:76px;bottom:56px"></div>
            <div class="prop-window" style="width:14px;height:17px;left:97px;bottom:56px"></div>
            <div class="prop-building" style="width:70px;height:80px;left:180px"></div>
            <div class="prop-window" style="width:11px;height:14px;left:190px;bottom:56px"></div>
            <div class="prop-window" style="width:11px;height:14px;left:207px;bottom:56px"></div>
          </div>
          <span class="pcard-tag badge-sale">For Sale</span>
          </div>
          <div class="pcard-body">
            <div class="pcard-price">₦55,000,000</div>
            <div class="pcard-addr"><div class="addr-dot"></div>Trans-Amadi, Port Harcourt</div>
            <div class="pcard-meta">
              <div class="meta-pill"><div class="mp-dot"></div>3 beds</div>
              <div class="meta-pill"><div class="mp-dot"></div>2 baths</div>
              <div class="meta-pill"><div class="mp-dot"></div>135 m²</div>
            </div>
            <div class="pcard-actions">
              <button class="btn-book">Book viewing</button>
              <button class="btn-vt">Virtual tour</button>
            </div>
          </div>
          <div class="agent-strip">
            <div class="agent-av" style="background:var(--navy-mid)">FI</div>
            <span class="agent-name">Listed by Femi Ige</span>
            <span class="agent-verified">✓ Verified</span>
          </div>
        </div>
  
      </div><!-- /prop-grid -->
    </main>
  </div><!-- /listings-layout -->

  <!-- ── PAGINATION ── -->
<div class="pagination">
    <button class="page-btn nav-arrow">
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Prev
    </button>
    <button class="page-btn active">1</button>
    <button class="page-btn">2</button>
    <button class="page-btn">3</button>
    <button class="page-btn">4</button>
    <button class="page-btn">5</button>
    <span class="page-ellipsis">…</span>
    <button class="page-btn">42</button>
    <button class="page-btn nav-arrow">
      Next
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>
  </div>
  

<style>
/* Dark mode toggle */
.dm-toggle{width:44px;height:24px;border-radius:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);cursor:pointer;position:relative;transition:background .3s;flex-shrink:0}
.dm-toggle::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .3s}
:global([data-theme="dark"]) .dm-toggle{background:rgba(74,144,226,.3);border-color:rgba(74,144,226,.4)}
:global([data-theme="dark"]) .dm-toggle::after{transform:translateX(20px);background:var(--blue-bright)}


/* ── PAGE HEADER ── */
.page-header{background:var(--navy-dark);padding:104px 5vw 48px;position:relative;overflow:hidden}
.page-header::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
.ph-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:10px}
.ph-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,52px);font-weight:300;color:#fff;margin-bottom:8px}
.ph-sub{font-size:14px;color:rgba(255,255,255,.45);font-weight:300}
.ph-breadcrumb{display:flex;align-items:center;gap:8px;margin-bottom:18px;font-size:12px;color:rgba(255,255,255,.35);flex-wrap:wrap}
.ph-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
.ph-breadcrumb a:hover{color:#fff}
.ph-breadcrumb span{color:rgba(255,255,255,.2)}

/* ── SEARCH SECTION ── */
.search-section{background:var(--bg);padding:40px 5vw 0;max-width:1400px;margin:0 auto;box-sizing:border-box}

.search-bar-main{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px 24px;margin-bottom:16px;box-shadow:0 4px 24px var(--shadow);transition:background .3s,border-color .3s}

/* Row 1: search + selects */
.search-row-1{display:flex;gap:10px;align-items:stretch;flex-wrap:wrap;margin-bottom:16px}
.search-input-wrap{flex:1 1 220px;min-width:0;display:flex;align-items:center;gap:10px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 16px;transition:border-color .2s,background .3s}
.search-input-wrap #mainSearch {flex:2 1 100px;}
.search-input-wrap:focus-within{border-color:var(--blue-link)}
.search-input-wrap input{flex:1;min-width:0;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text);width:100%}
.search-input-wrap input::placeholder{color:var(--text-s)}
.search-input-icon{color:var(--text-s);flex-shrink:0}
.filter-select{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:border-color .2s,background .3s;min-width:0;-webkit-appearance:none;appearance:none}
.filter-select:focus{border-color:var(--blue-link)}
.search-btn-main{background:var(--ember);color:#fff;border:none;border-radius:10px;padding:11px 24px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;white-space:nowrap;transition:background .2s,transform .15s;flex-shrink:0}
.search-btn-main:hover{background:var(--ember-deep);transform:scale(1.02)}


/* Row 2: filter row */
.search-row-2{display:grid;grid-template-columns:1fr 1fr 1fr 1fr 1fr auto;gap:10px;align-items:end}
.af-label{font-size:11px;font-weight:500;letter-spacing:.06em;color:var(--text-s);text-transform:uppercase;margin-bottom:6px}
.price-input{background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);width:100%;outline:none;transition:border-color .2s,background .3s;-webkit-appearance:none}
.price-input:focus{border-color:var(--blue-link)}

/* Advanced toggle */
.advanced-toggle{font-size:12px;color:var(--blue-link);cursor:pointer;display:flex;align-items:center;gap:5px;user-select:none;margin-top:12px;width:fit-content}
.advanced-toggle:hover{color:var(--navy-strong)}
.chevron{display:inline-block;transition:transform .2s}
.chevron.open{transform:rotate(180deg)}
.advanced-filters{display:none;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)}
.advanced-filters.open{display:grid}

/* ── RESULTS BAR ── */
.results-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:20px 5vw 16px;max-width:1400px;margin:0 auto;flex-wrap:wrap}
.results-count{font-size:14px;color:var(--text-s);font-weight:300}
.results-count strong{color:var(--text-p);font-weight:500}
.sort-wrap{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.sort-label{font-size:13px;color:var(--text-s);white-space:nowrap}
.sort-select{background:var(--input-bg);border:1px solid var(--input-border);border-radius:8px;padding:7px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);cursor:pointer;outline:none;transition:background .3s;-webkit-appearance:none;appearance:none}
.view-toggle{display:flex;gap:4px}
.vt-btn{width:32px;height:32px;border-radius:6px;border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-s);transition:all .2s;flex-shrink:0}
.vt-btn.active,.vt-btn:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* ── LAYOUT ── */
.listings-layout{display:grid;grid-template-columns:260px 1fr;gap:0;max-width:1400px;margin:0 auto;padding:0 5vw 60px}

/* ── SIDEBAR ── */
.sidebar{padding-right:28px;padding-top:4px}
.sb-section{margin-bottom:28px}
.sb-title{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid var(--border)}
.sb-check-item{display:flex;align-items:center;justify-content:space-between;padding:6px 0;cursor:pointer}
.sb-check-item label{display:flex;align-items:center;gap:8px;cursor:pointer;font-size:13px;color:var(--text-p)}
.sb-check-item input[type="checkbox"]{accent-color:var(--navy-dark);width:14px;height:14px;cursor:pointer;flex-shrink:0}
.sb-count{font-size:11px;color:var(--text-s);background:var(--bg-3);padding:1px 7px;border-radius:20px;flex-shrink:0}
.sb-range{width:100%;accent-color:var(--navy-dark);margin:8px 0}
.sb-range-labels{display:flex;justify-content:space-between;font-size:11px;color:var(--text-s)}
.sb-btn-group{display:flex;gap:6px;flex-wrap:wrap}
.sb-btn{font-size:12px;padding:5px 12px;border-radius:20px;border:1px solid var(--border);background:none;color:var(--text-p);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif}
.sb-btn.active,.sb-btn:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.clear-filters{font-size:12px;color:var(--ember);cursor:pointer;margin-top:4px;display:inline-block;text-decoration:underline}
.clear-filters:hover{color:var(--ember-deep)}

/* ── PROPERTY GRID ── */
.prop-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:20px;align-content:start}
.prop-grid.list-view{grid-template-columns:1fr;}


/* ── PROPERTY CARD ── */
.pcard{background:var(--card-bg);border:1px solid var(--border);border-radius:16px;overflow:hidden;cursor:pointer;transition:transform .25s,box-shadow .25s,border-color .2s}
.pcard:hover{transform:translateY(-4px);box-shadow:0 16px 48px var(--shadow-h);border-color:var(--blue-bright)}
.pcard-img{height:196px;position:relative;overflow:hidden}
.prop-scene{width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;padding-bottom:16px;position:relative}
.prop-building{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
.prop-window{position:absolute;background:rgba(212,174,58,.65);border-radius:2px}
.sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
.sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
.sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
.sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
.sky-5{background:linear-gradient(160deg,#1A2E50 0%,#2E5078 60%,#5E8AB0 100%)}
.sky-6{background:linear-gradient(160deg,#0E2444 0%,#163660 50%,#2E5480 100%)}
.badge-rent{background:var(--tag-rent-bg);color:var(--tag-rent-text)}
.badge-sale{background:var(--tag-sale-bg);color:var(--tag-sale-text)}
.badge-virtual{background:rgba(74,120,72,.15);color:var(--sage)}
[data-theme="dark"] .badge-virtual{background:rgba(74,120,72,.25);color:#7DBF7A}
.pcard-tag{position:absolute;top:12px;left:12px;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:4px 10px;border-radius:20px}
.pcard-boost{position:absolute;top:12px;right:12px;background:var(--gold);color:var(--navy-deep);font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 9px;border-radius:20px;display:flex;align-items:center;gap:4px}
.boost-dot{width:5px;height:5px;border-radius:50%;background:var(--navy-mid);flex-shrink:0}
.pcard-body{padding:16px 18px 18px}
.pcard-price{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:var(--text-p);margin-bottom:3px}
.pcard-price span{font-size:13px;font-weight:300;color:var(--text-s)}
.pcard-addr{font-size:12px;color:var(--text-s);margin-bottom:12px;display:flex;align-items:center;gap:5px}
.addr-dot{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.pcard-meta{display:flex;gap:14px;padding-top:12px;border-top:1px solid var(--border);margin-bottom:12px;flex-wrap:wrap}
.meta-pill{font-size:11px;color:var(--navy-accent);display:flex;align-items:center;gap:4px}
.mp-dot{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.pcard-actions{display:flex;gap:8px}
.btn-book{flex:1;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:9px 0;border-radius:40px;border:1px solid var(--navy-dark);color:var(--text-p);background:none;cursor:pointer;transition:all .2s;text-align:center}
.btn-book:hover{background:var(--navy-dark);color:#fff}
.btn-vt{flex:1;font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;padding:9px 0;border-radius:40px;background:var(--sage-light);color:var(--sage);border:none;cursor:pointer;transition:background .2s;text-align:center}
.btn-vt:hover{background:#D0DECC}
:global([data-theme="dark"]) .btn-vt{background:rgba(74,120,72,.2);color:#7DBF7A}
:global([data-theme="dark"]) .btn-vt:hover{background:rgba(74,120,72,.35)}
:global([data-theme="dark"]) .btn-book{border-color:rgba(255,255,255,.2);color:var(--text-p)}
:global([data-theme="dark"]) .btn-book:hover{background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.3)}

/* List view card */
.prop-grid.list-view .pcard{display:grid;grid-template-columns:240px 1fr;height:180px;}
.prop-grid.list-view .pcard-img{height:100%;border-radius:16px 0 0 16px}
.prop-grid.list-view .pcard-body{padding:16px 20px;display:flex;flex-direction:column;justify-content:center}
.prop-grid.list-view .pcard-price{font-size:20px}
.prop-grid.list-view .pcard-actions{margin-top:auto;padding-bottom: 40px;}

/* Agent strip */
.agent-strip{display:flex;align-items:center;gap:8px;padding:10px 18px;border-top:1px solid var(--border);background:var(--bg-2);transition:background .3s}
.agent-av{width:24px;height:24px;border-radius:50%;background:var(--navy-strong);display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:#fff;flex-shrink:0}
.agent-name{font-size:11px;color:var(--text-s);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.agent-verified{margin-left:auto;font-size:9px;color:var(--sage);font-weight:500;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;flex-shrink:0}

/* ── PAGINATION ── */
.pagination{display:flex;align-items:center;justify-content:center;gap:6px;padding:40px 5vw;max-width:1400px;margin:0 auto;flex-wrap:wrap}
.page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
.page-btn:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
.page-btn.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.page-btn.nav-arrow{width:auto;padding:0 14px;gap:5px;font-size:12px}
.page-ellipsis{font-size:13px;color:var(--text-s);padding:0 4px}


/* ── STATE NAV ── */
.state-nav{background:var(--bg-2);padding:14px 5vw;border-bottom:1px solid var(--border);display:flex;gap:8px;overflow-x:auto;scrollbar-width:none;transition:background .3s,border-color .3s;-webkit-overflow-scrolling:touch}
.state-nav::-webkit-scrollbar{display:none}
.state-pill{font-size:12px;font-weight:400;padding:6px 16px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;white-space:nowrap;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0}
.state-pill:hover{border-color:var(--navy-dark);color:var(--text-p)}
.state-pill.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* ── LOCATION BANNER ── */
.loc-banner{background:var(--bg-2);padding:10px 5vw;display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--border);font-size:13px;color:var(--text-s);transition:background .3s;flex-wrap:wrap}
.loc-dot{width:8px;height:8px;border-radius:50%;background:var(--blue-bright);animation:pulse 2s infinite;flex-shrink:0}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
.loc-change{font-size:12px;color:var(--blue-link);cursor:pointer;margin-left:auto;text-decoration:underline;white-space:nowrap}

/* ── EMPTY STATE ── */
.empty-state{text-align:center;padding:80px 20px;color:var(--text-s)}
.empty-icon{font-size:48px;margin-bottom:16px;opacity:.3}
.empty-title{font-family:'Cormorant Garamond',serif;font-size:24px;color:var(--text-p);margin-bottom:8px}

/* ── PAGE HEADER BADGE ── */
.ph-state-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(74,144,226,.12);border:1px solid rgba(74,144,226,.25);border-radius:40px;padding:5px 14px 5px 10px;font-size:11px;color:var(--blue-bright);letter-spacing:.08em;margin-bottom:16px}
.ph-flag{width:20px;height:14px;border-radius:2px;background:rgba(255,255,255,.15);display:inline-block}

/* ═══════════════════════════════════════
   RESPONSIVE BREAKPOINTS
═══════════════════════════════════════ */

/* ── ≤ 900px: Hide sidebar, desktop nav ── */
@media(max-width:900px){
  /* Nav: hide links, show hamburger */
  .nav-links{display:none}
  .hamburger{display:flex}

  /* Listing: single column, no sidebar */
  .listings-layout{grid-template-columns:1fr}
  .sidebar{display:none}

  /* Footer: 2 columns */
  .footer-top{grid-template-columns:1fr 1fr;gap:28px}

  /* Search row 2: 3 columns */
  .search-row-2{grid-template-columns:1fr 1fr 1fr}

  /* Advanced filters: 2 columns */
  .advanced-filters{grid-template-columns:1fr 1fr}

   /* List-view card: stack on smaller screens */
   .prop-grid.list-view .pcard{grid-template-columns:1fr;height:auto}
  .prop-grid.list-view .pcard-img{height:180px;border-radius:16px 16px 0 0}

  /* Results bar can wrap */
  .results-bar{padding:16px 5vw 12px}
}

/* ── ≤ 640px: Mobile-first ── */
@media(max-width:640px){
  /* Search row 1: stack */
  .search-row-1{flex-direction:column;gap:8px}
  .search-input-wrap{flex:none;width:100%}
  .filter-select{width:100%}
  .search-btn-main{width:100%}

  /* Search row 2: 2 columns */
  .search-row-2{grid-template-columns:1fr 1fr}

  /* Advanced filters: 1 column */
  .advanced-filters{grid-template-columns:1fr}

  /* search bar: tighter padding */
  .search-bar-main{padding:16px}

  /* Results bar: stack */
  .results-bar{flex-direction:column;align-items:flex-start;gap:10px}
  .sort-wrap{width:100%;justify-content:space-between}

  /* Page header: tighter */
  .page-header{padding:90px 5vw 40px}

  /* Footer: single column */
  .footer-top{grid-template-columns:1fr;gap:24px}
  .footer-brand p{max-width:100%}
  .footer-bottom{flex-direction:column;align-items:flex-start;gap:8px}
  .footer-legal{gap:14px}

  /* Pagination: tighter */
  .pagination{gap:4px;padding:28px 5vw}
  .page-btn.nav-arrow{padding:0 10px}

  /* Property grid: single column on very small screens */
  .prop-grid{grid-template-columns:1fr}

  /* Location banner: handle long text */
  .loc-banner{font-size:12px}
}

/* ── ≤ 400px: Very small screens ── */
@media(max-width:400px){
  .nav-wordmark{font-size:15px;letter-spacing:.12em}
  .search-row-2{grid-template-columns:1fr}
  .page-btn:not(.nav-arrow):not(.active){display:none}
  .page-btn.active{display:flex}
  .page-ellipsis{display:none}
}
</style>