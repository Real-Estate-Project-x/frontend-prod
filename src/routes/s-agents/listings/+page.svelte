<script lang="ts">
  import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";

  type ViewType = 'list' | 'grid';
  type StatusType = 'all' | 'active' | 'boosted' | 'taken';
  let selectedView = $state<ViewType>('list');
  let selectedStatus = $state<StatusType>('all');
  let isBoostModalOpen = $state(false);
  let showMoreActions = $state(false);
  let isArchivedModalOpen = $state(false);
  let isTakenModalOpen = $state(false);
  let list = [1];


    const restoreListing = () => {};

    const setView = (value: ViewType) => selectedView = value;

    const setStatus = (value: StatusType) => selectedStatus = value;

    const toggleBoostModal = () => isBoostModalOpen = !isBoostModalOpen;

    const toggleShowMoreActions = () => showMoreActions = !showMoreActions;

    const toggleArchivedModal = () => isArchivedModalOpen = !isArchivedModalOpen;

    const toggleTakenModal = () => isTakenModalOpen = !isTakenModalOpen;

</script>

{#if isBoostModalOpen}
<!-- ═══════════════════════════════════════════
     NEW BOOST MODAL
     [SVELTE_COMPONENT: NewBoostModal]
═══════════════════════════════════════════ -->
<div id="newBoostModal" class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="absolute inset-0 modal-bg" onclick={() => (isBoostModalOpen = false)}></div>
    <div class="relative bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[480px] overflow-hidden shadow-[0_24px_80px_rgba(10,36,99,.22)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] scale-in tt">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3.5"></div>
      <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between">
        <div><p class="text-[10px] font-medium tracking-[.14em] uppercase text-gold mb-0.5">Boost</p><h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:20px">Boost property</h2></div>
        <button aria-label="Close" onclick={() => (isBoostModalOpen = false)} 
            class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
      </div>
      <div class="px-6 py-5 space-y-4">
          <div id="boostPropPreview" class="flex items-center gap-3 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3.5 mb-5 tt">
            <div class="w-10 h-10 rounded-lg sky-1 flex-shrink-0"></div>
            <div class="min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">3-Bed Duplex GRA Phase 2</div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">GRA Phase 2, Port Harcourt · ₦95M</div>
            </div></div>
        <div>
          <label for="nbPlan" class="text-[11px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] block mb-2">Boost plan</label>
          <div id="nbPlan" class="grid grid-cols-3 gap-2">
            <button class="plan-card border border-chalk-3 dark:border-white/[.1] rounded-xl p-3 text-left cursor-pointer bg-white dark:bg-[#131C2E] hover:border-blue-bright/40 tt">
              <div class="text-[11px] font-semibold text-navy-dark dark:text-blue-100 mb-1">Starter</div>
              <div class="text-[18px] font-display font-semibold text-navy-dark dark:text-blue-100">₦5k</div>
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">7 days</div>
            </button>
            <button class="active plan-card border border-chalk-3 dark:border-white/[.1] rounded-xl p-3 text-left cursor-pointer bg-white dark:bg-[#131C2E] hover:border-gold/50 tt">
              <div class="text-[11px] font-semibold text-navy-dark dark:text-blue-100 mb-1">Pro</div>
              <div class="text-[18px] font-display font-semibold text-navy-dark dark:text-blue-100">₦15k</div>
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">14 days</div>
            </button>
            <button class="plan-card border border-chalk-3 dark:border-white/[.1] rounded-xl p-3 text-left cursor-pointer bg-white dark:bg-[#131C2E] hover:border-ember/40 tt">
              <div class="text-[11px] font-semibold text-navy-dark dark:text-blue-100 mb-1">Elite</div>
              <div class="text-[18px] font-display font-semibold text-navy-dark dark:text-blue-100">₦30k</div>
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">30 days</div>
            </button>
          </div>
        </div>
        <div>
          <label for="nbStartDate" class="text-[11px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] block mb-2">Start date</label>
          <input type="date" id="nbStartDate" class="w-full bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.1] rounded-xl text-[13px] text-navy-dark dark:text-blue-100 px-3 py-3 outline-none focus:border-blue-bright/50 tt cursor-pointer" style="color-scheme:dark">
        </div>
        <div class="flex gap-2.5 pt-1">
          <button onclick={() => (isBoostModalOpen = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer tt hover:border-chalk-4 dark:hover:border-white/20">Cancel</button>
          <button class="flex-1 text-[13px] font-medium text-navy-deep bg-gold hover:opacity-90 py-3 rounded-full border-none cursor-pointer tt">Activate boost</button>
        </div>
      </div>
    </div>
  </div>
{/if}

{#if isArchivedModalOpen}
<!-- ══════════════════════════════════════════
     ARCHIVE CONFIRM MODAL
══════════════════════════════════════════ -->
<div id="archiveModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="modal-bg absolute inset-0" onclick={() => (isArchivedModalOpen = false)}></div>
  <div class="relative w-full max-w-[400px] bg-white dark:bg-[#0D1422] rounded-2xl overflow-hidden shadow-2xl scale-in border border-chalk-3 dark:border-white/[.07] tt p-6">
    <div class="w-12 h-12 rounded-2xl bg-ember-light dark:bg-ember/10 flex items-center justify-center mx-auto mb-4">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"><path d="M3 6h14M8 6V4h4v2M5 6l1 11h8l1-11"/></svg>
    </div>
    <h3 class="font-display font-light text-center text-navy-dark dark:text-blue-100 mb-1" style="font-size:20px" id="archiveTitle">Archive property?</h3>
    <p class="text-[13px] font-light text-center text-chalk-muted dark:text-[#6A7FA0] mb-6" id="archiveSub">This will hide the listing from public search results. You can restore it at any time.</p>
    <div class="flex gap-3">
      <button onclick={() => (isArchivedModalOpen = false)} class="flex-1 py-2.5 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-full border-none cursor-pointer hover:bg-chalk-3 tt">Cancel</button>
      <button onclick={() => {}} id="archiveConfirmBtn" class="flex-1 py-2.5 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep rounded-full border-none cursor-pointer tt">Archive</button>
    </div>
  </div>
</div>
{/if}

{#if isTakenModalOpen}
<!-- ══════════════════════════════════════════
     ARCHIVE CONFIRM MODAL
══════════════════════════════════════════ -->
<div id="pTakenModal" class="fixed inset-0 z-[100] flex items-center justify-center p-4">
  <div class="modal-bg absolute inset-0" onclick={() => (isTakenModalOpen = false)}></div>
  <div class="relative w-full max-w-[400px] bg-white dark:bg-[#0D1422] rounded-2xl overflow-hidden shadow-2xl scale-in border border-chalk-3 dark:border-white/[.07] tt p-6">
    <div class="w-12 h-12 rounded-2xl bg-ember-light dark:bg-ember/10 flex items-center justify-center mx-auto mb-4">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"><path d="M3 6h14M8 6V4h4v2M5 6l1 11h8l1-11"/></svg>
    </div>
    <h3 class="font-display font-light text-center text-navy-dark dark:text-blue-100 mb-1" style="font-size:20px" id="archiveTitle">Mark as taken?</h3>
    <p class="text-[13px] font-light text-center text-chalk-muted dark:text-[#6A7FA0] mb-6" id="archiveSub">
     <b>Studio Apartment Yaba</b> will be marked as taken and removed from search results.
    </p>
    <div class="flex gap-3">
      <button onclick={() => (isTakenModalOpen = false)} class="flex-1 py-2.5 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-full border-none cursor-pointer hover:bg-chalk-3 tt">Cancel</button>
      <button onclick={() => {}} id="pTakenConfirmBtn" class="flex-1 py-2.5 text-[13px] font-medium text-white bg-navy-dark hover:bg-navy-mid rounded-full border-none cursor-pointer tt">Mark taken</button>
    </div>
  </div>
</div>
{/if}

<!-- ══ LAYOUT SHELL ══ -->
<div class="flex pt-[68px] min-h-screen">
  <SubAgencySidebar />

  <!-- ══════════════════════════════════════════
      MAIN CONTENT
  ══════════════════════════════════════════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- PAGE HEADER -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[1100px] mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agent dashboard</p>
            <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
              My <em class="italic text-gold">properties.</em>
            </h1>
            <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
              <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
              <span id="todayDate">Friday, 15 May 2026</span>
              &nbsp;·&nbsp;
              <span id="hdrActive" class="text-white font-medium">7</span> active
              &nbsp;·&nbsp;
              <span id="hdrTotal" class="text-white font-medium">10</span> total listings
            </p>
          </div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <button onclick={() => {}} class="flex items-center gap-2 text-[13px] font-medium text-white bg-white/[.08] border border-white/15 hover:bg-white/15 px-4 py-[9px] rounded-full tt cursor-pointer" style="border:1px solid rgba(255,255,255,.15)">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 9V1M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M1 11v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              Export
            </button>
            <a href="/agency/listings/add" class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-4 py-[9px] rounded-full border-none cursor-pointer tt">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
              Add property
            </a>
          </div>
        </div>
  
        <!-- KPI stat strip -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7 stat-grid-2">
          <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
            <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-sage pulse-dot"></span>Active listings
            </div>
            <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="kpiActive">7</div>
            <div class="text-[11px] text-white/40 mt-1" id="kpiActiveSub">of – total</div>
          </div>
          <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
            <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="rgba(74,144,226,.8)" stroke-width="1.2"/><circle cx="7" cy="7" r="2" stroke="rgba(74,144,226,.8)" stroke-width="1.2"/></svg>
              Total views
            </div>
            <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="kpiViews">9.9k</div>
            <div class="text-[11px] text-white/40 mt-1">across all listings</div>
          </div>
          <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
            <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 11l3-4 2 2 3-5 3 7" stroke="rgba(212,174,58,.8)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Enquiries
            </div>
            <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="kpiEnquiries">151</div>
            <div class="text-[11px] text-white/40 mt-1">total received</div>
          </div>
          <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
            <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-gold pulse-dot"></span>Boosted
            </div>
            <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="kpiBoosted">3</div>
            <div class="text-[11px] text-white/40 mt-1">currently live</div>
          </div>
        </div>
      </div>
    </div>

    <!-- BODY -->
    <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto space-y-5">
      <!-- CONTROLS BAR -->
      <div class="space-y-3 fu d1">
          <!-- Row 1: search + view toggle -->
          <div class="flex items-center gap-3 flex-wrap controls-stack">
            <!-- Search -->
            <div class="flex-1 min-w-[200px] relative">
              <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] pointer-events-none" width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <input id="searchInput" type="text" placeholder="Search by title or location…" oninput={() => {}} class="w-full bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl pl-9 pr-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none focus:border-blue-bright/50 tt">
            </div>
    
            <!-- Sort -->
            <div class="sel-wrap flex-shrink-0">
              <select id="sortSel" onchange={() => {}} class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[13px] text-navy-dark dark:text-blue-100 px-3 py-[10px] pr-7 outline-none cursor-pointer tt">
                <option value="recent">Most recent</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="views-desc">Most viewed</option>
                <option value="alpha">A → Z</option>
              </select>
            </div>
    
            <!-- View toggle -->
            <div class="flex gap-0.5 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-1 flex-shrink-0">
              <button id="btnList" onclick={() => setView('list')} class:active={selectedView == 'list'} class="vtoggle-btn w-8 h-7 rounded-lg flex items-center justify-center transition-all border-none cursor-pointer" title="Table view">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><line x1="4" y1="4" x2="15" y2="4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="4" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="4" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="1.5" cy="4" r="1" fill="currentColor"/><circle cx="1.5" cy="8" r="1" fill="currentColor"/><circle cx="1.5" cy="12" r="1" fill="currentColor"/></svg>
              </button>
              <button id="btnCard" onclick={() => setView('grid')} class:active={selectedView == 'grid'} class="vtoggle-btn w-8 h-7 rounded-lg flex items-center justify-center transition-all border-none cursor-pointer" title="Card view">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
              </button>
            </div>
          </div>
    
          <!-- Row 2: filter chips -->
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Status chips -->
            <div class="flex gap-1.5 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-1">
            {#each ['all', 'active', 'boosted', 'taken'] as _, index}
            <button onclick={() => setStatus(_ as any)}  class:active={_ === selectedStatus}    class="ptab  text-[11px] font-medium px-3.5 py-1.5 rounded-lg bg-transparent border-none cursor-pointer tt capitalize">{_}</button>
            {/each}
           </div>
    
            <!-- Type filter -->
            <div class="sel-wrap">
              <select id="typeSel" onchange={() => {}} class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] pr-7 outline-none cursor-pointer tt">
                <option value="all">All types</option>
                <option value="buy">For sale</option>
                <option value="rent">To rent</option>
                <option value="virtual">Virtual only</option>
              </select>
            </div>
    
            <!-- Price range -->
            <div class="sel-wrap">
              <select id="priceSel" onchange={() => {}} class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] pr-7 outline-none cursor-pointer tt">
                <option value="all">Any price</option>
                <option value="0-1m">Under ₦1M</option>
                <option value="1m-5m">₦1M – ₦5M</option>
                <option value="5m-50m">₦5M – ₦50M</option>
                <option value="50m+">₦50M+</option>
              </select>
            </div>
          </div>
    
          <!-- Results label -->
          <div class="flex items-center justify-between flex-wrap gap-2">
            <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]" id="resultsLabel">
              Showing 1–10 of 10 listings
            </p>
          </div>
        </div>

      {#if selectedView === 'list'}
        <!-- TABLE VIEW -->
        <div id="listView" class="fu d2">
          <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl overflow-hidden tt">
            {#if list.length > 0}
            <div class="table-scroll">
              <table class="w-full min-w-[820px]">
                <thead>
                  <tr class="border-b border-chalk-3 dark:border-white/[0.07]">
                    <th class="text-left px-5 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Property</th>
                    <th class="text-left px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Type</th>
                    <th class="text-left px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Price</th>
                    <th class="text-center px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Status</th>
                    <th class="text-right px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Views</th>
                    <th class="text-right px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Enquiries</th>
                    <th class="text-left px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Last updated</th>
                    <th class="text-right px-5 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Actions</th>
                  </tr>
                </thead>
                <tbody id="propTableBody">
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-2 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">Studio Apartment Yaba</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Yaba, Lagos</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-rent text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Rent</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦280k/mo</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">1bd · 1ba · 38m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-draft text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Draft</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">0</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">0</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">4 May 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="#" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/090" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p9">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p9" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-1 relative">
                          <span class="absolute top-1 right-1 w-3 h-3 rounded-full bg-gold border border-white/30 flex-shrink-0"></span>
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">2-Bed Serviced Flat Ikoyi</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Ikoyi, Lagos</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-rent text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Rent</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦1.2M/mo</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">2bd · 2ba · 110m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">720</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">9</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">3 May 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/123" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p7">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p7" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-1 relative">
                          <span class="absolute top-1 right-1 w-3 h-3 rounded-full bg-gold border border-white/30 flex-shrink-0"></span>
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">3-Bed Duplex GRA Phase 2</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">GRA Phase 2, Port Harcourt</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-buy text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Sale</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦95M</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">3bd · 3ba · 185m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">1.2k</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">18</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">1 May 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/123" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p1">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p1" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-2 relative">
                          <span class="absolute top-1 right-1 w-3 h-3 rounded-full bg-gold border border-white/30 flex-shrink-0"></span>
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">4-Bed Terrace Maitama</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Maitama, Abuja</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-buy text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Sale</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦220M</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">4bd · 4ba · 260m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-boosted text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Boosted</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">2.1k</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">32</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">30 Apr 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/12" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p3">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p3" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-3 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">2-Bed Apartment Lekki Phase 1</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Lekki Phase 1, Lagos</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-rent text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Rent</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦850k/mo</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">2bd · 2ba · 90m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">880</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">12</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">28 Apr 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/90" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p2">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p2" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-5 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">4-Bed Duplex Jabi Lake District</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Jabi, Abuja</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-buy text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Sale</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦130M</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">4bd · 4ba · 220m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">590</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">11</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">25 Apr 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/09" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p10">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p10" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-5 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">1-Bed Studio Victoria Island</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Victoria Island, Lagos</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-virtual text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Virtual</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦500k/mo</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">1bd · 1ba · 48m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">460</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">7</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">22 Apr 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/90" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p4">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p4" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-3 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">3-Bed Bungalow Enugu GRA</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">GRA, Enugu</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-buy text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Sale</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦55M</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">3bd · 2ba · 150m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">340</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">5</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">18 Apr 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/22" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p8">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p8" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={toggleTakenModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-navy-dark dark:text-blue-100 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Mark as taken
                            </button>
                            <button onclick={toggleArchivedModal} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-ember hover:bg-ember-light/30 dark:hover:bg-ember/[.05] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M3 6h8M5 6V4h4v2M4 6l1 7h4l1-7" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"></path></svg>
                              Archive
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-4 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">5-Bed Mansion Banana Island</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Banana Island, Lagos</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-buy text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Sale</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦750M</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">5bd · 6ba · 640m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-taken text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Taken</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">3.4k</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">55</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">14 Mar 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/edit/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/89" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p5">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p5" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={restoreListing} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-sage hover:bg-sage-light dark:hover:bg-sage/[.07] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 1010 0 5 5 0 00-10 0zM9 5L7 7l-2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Restore
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr class="prow border-b border-chalk-3 dark:border-white/[.05] last:border-0">
                    <!-- Property -->
                    <td class="px-5 py-4">
                      <div class="flex items-center gap-3">
                        <div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 sky-6 relative">
                          
                        </div>
                        <div class="min-w-0">
                          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[200px]">3-Bed Semi-Detached Wuse 2</div>
                          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate max-w-[200px]">Wuse 2, Abuja</div>
                        </div>
                      </div>
                    </td>
                    <!-- Type -->
                    <td class="px-4 py-4 hide-md">
                      <span class="type-buy text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Sale</span>
                    </td>
                    <!-- Price -->
                    <td class="px-4 py-4">
                      <div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:14px">₦80M</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">3bd · 3ba · 140m²</div>
                    </td>
                    <!-- Status -->
                    <td class="px-4 py-4 text-center">
                      <span class="sp-archived text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Archived</span>
                    </td>
                    <!-- Views -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">190</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">views</div>
                    </td>
                    <!-- Enquiries -->
                    <td class="px-4 py-4 text-right hide-md">
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">2</div>
                      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">enquiries</div>
                    </td>
                    <!-- Updated -->
                    <td class="px-4 py-4 hide-md">
                      <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">10 Feb 2025</div>
                    </td>
                    <!-- Actions -->
                    <td class="px-5 py-4 text-right">
                      <div class="flex items-center justify-end gap-1.5 flex-wrap">
                        <!-- View -->
                        <a href="/agency/listings/90" title="View listing" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer no-underline">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="currentColor" stroke-width="1.2"></path><circle cx="7" cy="7" r="2" stroke="currentColor" stroke-width="1.2"></circle></svg>
                        </a>
                        <!-- Boost -->
                        <button title="Boost property" onclick={toggleBoostModal} class="w-7 h-7 rounded-lg bg-gold/10 border border-gold/30 flex items-center justify-center hover:bg-gold/20 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </button>
                        <!-- Edit -->
                        <a href="/agency/listings/edit/90" title="Edit property" class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-blue-bright/40 tt cursor-pointer">
                          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M9.5 2.5l2 2L4 12H2v-2L9.5 2.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        </a>
                        <!-- Archive / Taken -->
                        <div class="relative inline-block" id="actMenu_p6">
                          <button title="More actions" onclick={toggleShowMoreActions} class="w-7 h-7 rounded-lg bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.07] flex items-center justify-center hover:border-ember/40 tt cursor-pointer">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="7" cy="3" r="1" fill="currentColor"></circle><circle cx="7" cy="7" r="1" fill="currentColor"></circle><circle cx="7" cy="11" r="1" fill="currentColor"></circle></svg>
                          </button>
                          {#if showMoreActions}
                          <div id="actMenuPanel_p6" class="absolute right-0 top-full mt-1.5 w-[160px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-lg z-50 overflow-hidden tt action-menu">
                            
                            <button onclick={restoreListing} class="w-full px-4 py-2.5 text-left text-[12px] font-medium text-sage hover:bg-sage-light dark:hover:bg-sage/[.07] tt cursor-pointer border-none bg-transparent flex items-center gap-2">
                              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 1010 0 5 5 0 00-10 0zM9 5L7 7l-2-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              Restore
                            </button>
                          </div>
                          {/if}
                        </div>
                      </div>
                    </td>
                  </tr></tbody>
              </table>
            </div>
            {:else}
            <!-- Empty state -->
            <div id="emptyTable" class="py-16 text-center">
              <div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.05] flex items-center justify-center mx-auto mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path d="M9 22V12h6v10"/></svg>
              </div>
              <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">No properties <em class="italic">found.</em></h3>
              <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] max-w-[280px] mx-auto">No listings match the current filters. Try adjusting your search.</p>
              <a href="/agency/listings/add" class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-2.5 rounded-full border-none cursor-pointer tt">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                Add your first property
              </a>
            </div>
            {/if}
          </div>
        </div>  <!--  BODY -->
      {:else}
      <!-- CARD VIEW -->
      <div id="cardView">
      {#if list.length > 0}
      <div id="propCardGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 card-grid">
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-2">
            <span class="type-rent absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Rent</span>
            <span class="sp-draft absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Draft</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦280k/mo</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">Studio Apartment Yaba</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Yaba, Lagos</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>1bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>1ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>38m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">0</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">0</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">4 May 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-1">
            <span class="type-rent absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Rent</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            <span class="absolute bottom-2 left-2.5 flex items-center gap-1 bg-gold/90 text-navy-deep text-[9px] font-semibold px-2 py-[3px] rounded-full"><svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>Boosted</span>
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦1.2M/mo</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">2-Bed Serviced Flat Ikoyi</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Ikoyi, Lagos</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>2bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>2ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>110m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">720</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">9</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">3 May 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-1">
            <span class="type-buy absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Sale</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            <span class="absolute bottom-2 left-2.5 flex items-center gap-1 bg-gold/90 text-navy-deep text-[9px] font-semibold px-2 py-[3px] rounded-full"><svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>Boosted</span>
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦95M</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">3-Bed Duplex GRA Phase 2</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">GRA Phase 2, Port Harcourt</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>3bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>3ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>185m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">1.2k</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">18</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">1 May 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-2">
            <span class="type-buy absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Sale</span>
            <span class="sp-boosted absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Boosted</span>
            <span class="absolute bottom-2 left-2.5 flex items-center gap-1 bg-gold/90 text-navy-deep text-[9px] font-semibold px-2 py-[3px] rounded-full"><svg width="8" height="8" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>Boosted</span>
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦220M</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">4-Bed Terrace Maitama</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Maitama, Abuja</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>4bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>4ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>260m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">2.1k</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">32</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">30 Apr 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-3">
            <span class="type-rent absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Rent</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦850k/mo</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12"> 2-Bed Apartment Lekki Phase 1</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Lekki Phase 1, Lagos</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>2bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>2ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>90m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">880</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">12</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">28 Apr 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-5">
            <span class="type-buy absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Sale</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦130M</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12"> 4-Bed Duplex Jabi Lake District</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Jabi, Abuja</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>4bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>4ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>220m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">590</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">11</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">25 Apr 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-5">
            <span class="type-virtual absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Virtual</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦500k/mo</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">
              1-Bed Studio Victoria Island</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Victoria Island, Lagos</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>1bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>1ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>48m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">460</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">7</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">22 Apr 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-3">
            <span class="type-buy absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Sale</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦55M</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">
                3-Bed Bungalow Enugu GRA
              </a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">GRA, Enugu</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>3bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>2ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>150m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">340</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">5</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">18 Apr 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-4">
            <span class="type-buy absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Sale</span>
            <span class="sp-active absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Active</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦750M</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12"> 5-Bed Mansion Banana Island</a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Banana Island, Lagos</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>5bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>6ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>640m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">3.4k</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">55</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">14 Mar 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
                <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={toggleArchivedModal} class="flex-1 py-2 text-[11px] font-medium text-ember bg-ember-light/40 hover:bg-ember-light rounded-full border-none cursor-pointer tt">Archive</button>
            </div>
          </div>
        </div>
        <div class="prop-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt">
          <!-- Thumb -->
          <div class="h-[130px] relative sky-6">
            <span class="type-buy absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full">Sale</span>
            <span class="sp-taken absolute top-2.5 right-2.5 text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[3px] rounded-full">Taken</span>
            
          </div>
          <!-- Body -->
          <div class="p-4">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-snug mb-0.5" style="font-size:16px">₦80M</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate mb-0.5">
              <a href="/agency/listings/12">
                3-Bed Semi-Detached Wuse 2
              </a>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate mb-3">Wuse 2, Abuja</div>
            <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] pb-3 mb-3 border-b border-chalk-3 dark:border-white/[.06]">
              <span>3bd</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>3ba</span><span class="text-chalk-4 dark:text-white/20">·</span>
              <span>140m²</span>
            </div>
            <!-- Stats -->
            <div class="flex gap-4 mb-3">
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">190</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Views</div></div>
              <div class="text-center"><div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:14px">2</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.08em] mt-0.5">Enquiries</div></div>
              <div class="ml-auto text-right"><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Updated</div><div class="text-[11px] font-medium text-navy-dark dark:text-blue-100">10 Feb 2025</div></div>
            </div>
            <!-- Actions -->
            <div class="flex gap-1.5">
              <button onclick={toggleBoostModal} class="flex-1 py-2 text-[11px] font-medium text-gold bg-gold/10 hover:bg-gold/20 rounded-full border-none cursor-pointer tt">⭐ Boost</button>
              <button class="flex-1 py-2 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 rounded-full border-none cursor-pointer tt">
              <a href="/agency/listings/edit/90">Edit</a>
              </button>
              <button onclick={restoreListing} class="flex-1 py-2 text-[11px] font-medium text-sage bg-sage-light hover:opacity-80 rounded-full border-none cursor-pointer tt">Restore</button>
            </div>
          </div>
        </div></div>
        {:else}
        <div id="emptyCard" class="py-16 text-center empty-border rounded-2xl">
          <div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.05] flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg>
          </div>
          <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">No properties <em class="italic">found.</em></h3>
          <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">Adjust filters or add a listing.</p>
          <a href="/agency/listings/add" class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-2.5 rounded-full border-none cursor-pointer tt">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
            Add property
          </a>
        </div>
        {/if}
      </div>
      {/if}

      {#if list.length > 0}
      <!-- ── PAGINATION ── -->
      <!-- [SVELTE_COMPONENT: PaginationBar] -->
      <div id="pgBar" class="mt-15 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Per-page -->
          <div class="flex items-center gap-2 text-[13px] text-chalk-muted dark:text-[#6A7FA0]">
            <span class="hidden sm:inline">Show</span>
            <select class="bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt">
              <option>5 per page</option>
              <option selected>10 per page</option>
              <option>20 per page</option>
            </select>
            <span class="hidden sm:inline text-[12px]">· Showing 1–6 of 6 viewings</span>
          </div>

          <!-- Page numbers -->
          <div class="flex items-center gap-1.5">
            <button class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Prev
            </button>
            <button class="pgbtn active w-9 h-9 rounded-xl text-[13px] border border-navy-dark cursor-pointer">1</button>
            <button class="pgbtn w-9 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 text-[13px] hover:border-navy-dark dark:hover:border-white/40 tt bg-transparent cursor-pointer">2</button>
            <button class="pgbtn w-9 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 text-[13px] hover:border-navy-dark dark:hover:border-white/40 tt bg-transparent cursor-pointer">3</button>
            <button class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
              Next<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>

          <!-- Jump to -->
          <div class="hidden sm:flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
            Go to
            <input type="number" min="1" max="3" value="1" class="w-14 bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 outline-none text-center tt focus:border-blue-link">
            of 3
          </div>
        </div>
      </div>
      {/if}

    </div>

  </main>
</div>

<style>
    /* ── Shared dashboard token set ── */
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .55s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.29s}.d7{animation-delay:.34s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .26s cubic-bezier(.22,.68,0,1.2) both}
    @keyframes growW{from{width:0}to{width:var(--w)}}
    .grow-w{animation:growW .9s cubic-bezier(.34,1.2,.64,1) .4s both}
    
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active,
    :global([data-theme="dark"]) .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover,
    :global([data-theme="dark"]) .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* stat cards */
    .stat-card{transition:transform .22s,box-shadow .22s}
    .stat-card:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(10,36,99,.11)}
    .dark .stat-card:hover,
    :global([data-theme="dark"]) .stat-card:hover{box-shadow:0 12px 36px rgba(0,0,0,.38)}
    
    /* property row hover */
    .prow{transition:background .2s}
    .prow:hover{background:rgba(247,243,236,.7)}
    .dark .prow:hover,
    :global([data-theme="dark"]) .prow:hover{background:rgba(255,255,255,.025)}
    
    /* prop card hover */
    .prop-card{transition:transform .22s,box-shadow .22s,border-color .22s}
    .prop-card:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(10,36,99,.10)}
    .dark .prop-card:hover,
    :global([data-theme="dark"]) .prop-card:hover{box-shadow:0 14px 40px rgba(0,0,0,.38)}
    
    /* status pills */
    .sp-active{background:#EFF3EE;color:#4A7848}
    .dark .sp-active,
    :global([data-theme="dark"]) .sp-active{background:rgba(74,120,72,.2);color:#7DBF7A}
    .sp-archived{background:#F5D5C5;color:#5C2416}
    .dark .sp-archived,
    :global([data-theme="dark"]) .sp-archived{background:rgba(192,96,53,.15);color:#EDBA9B}
    .sp-taken{background:#E8EDF5;color:#1F3F6A}
    .dark .sp-taken,
    :global([data-theme="dark"]) .sp-taken{background:rgba(74,112,160,.15);color:#8DAACC}
    .sp-boosted{background:#FBF6E9;color:#8A6A10}
    .dark .sp-boosted,
    :global([data-theme="dark"]) .sp-boosted{background:rgba(212,174,58,.15);color:#D4AE3A}
    .sp-draft{background:rgba(10,36,99,.06);color:#4A70A0}
    .dark .sp-draft,
    :global([data-theme="dark"]) .sp-draft{background:rgba(74,112,160,.1);color:#8DAACC}
    
    /* type badges */
    .type-buy{background:rgba(192,96,53,.1);color:#C06035}
    .dark .type-buy,
    :global([data-theme="dark"]) .type-buy{background:rgba(192,96,53,.15);color:#EDBA9B}
    .type-rent{background:rgba(10,36,99,.07);color:#1F3F6A}
    .dark .type-rent,
    :global([data-theme="dark"]) .type-rent{background:rgba(74,112,160,.15);color:#8DAACC}
    .type-virtual{background:rgba(74,120,72,.1);color:#4A7848}
    .dark .type-virtual,
    :global([data-theme="dark"]) .type-virtual{background:rgba(74,120,72,.18);color:#7DBF7A}
    
    /* pagination */
    /* ── page number active ── */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active,
    :global([data-theme="dark"]) .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
    
    /* modal */
    .modal-bg{background:rgba(6,14,28,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    
    /* select wrapper arrow */
    .sel-wrap{position:relative;display:inline-block}
    .sel-wrap::after{content:'▾';position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .sel-wrap::after,
    :global([data-theme="dark"]) .sel-wrap::after{color:#6A7FA0}
    
    /* period tab */
    .ptab.active{background:white;color:#0A2463;box-shadow:0 1px 4px rgba(10,36,99,.12)}
    .dark .ptab.active,
    :global([data-theme="dark"]) .ptab.active{background:#131C2E;color:#E8EDF5}
    
    /* view toggle */
    .vtoggle-btn.active{background:#0A2463;color:white}
    .dark .vtoggle-btn.active,
    :global([data-theme="dark"]) .vtoggle-btn.active{background:#4A90E2}
    .vtoggle-btn:not(.active){color:#8C8070}
    .dark .vtoggle-btn:not(.active),
    :global([data-theme="dark"]) .vtoggle-btn:not(.active){color:#6A7FA0}
    
    /* fchip */
    .fchip.active,.fchip:hover{background:#0A2463;color:white;border-color:#0A2463}
    .dark .fchip.active,
    .dark .fchip:hover,
    :global([data-theme="dark"]) .fchip.active,
    :global([data-theme="dark"]) .fchip:hover{background:#4A90E2;border-color:#4A90E2}
    
    /* property sky gradients */
    .sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
    .sky-2{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
    .sky-3{background:linear-gradient(155deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
    .sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
    .sky-5{background:linear-gradient(160deg,#0E2444 0%,#1a3255 40%,#4A70A0 100%)}
    .sky-6{background:linear-gradient(155deg,#0A2463 0%,#1F3F6A 55%,#4A70A0 100%)}
    
    /* perf bar track */
    .perf-track{background:#EDE7DC;border-radius:4px;overflow:hidden}
    .dark .perf-track,
    :global([data-theme="dark"]) .perf-track{background:rgba(255,255,255,.07)}
    
    /* boost plan selection in modal */
    .plan-card{transition:outline .18s,transform .18s}
    .plan-card:hover{transform:translateY(-1px)}
    
    /* input */
    .inp{background:#fff;border:1.5px solid #EDE7DC;border-radius:10px;padding:9px 13px;font-family:'DM Sans',sans-serif;font-size:13px;color:#0A2463;outline:none;width:100%;transition:border-color .2s}
    .inp:focus{border-color:rgba(74,144,226,.55)}
    .dark .inp,
    :global([data-theme="dark"]) .inp{background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    .inp::placeholder{color:#8C8070}
    .dark .inp::placeholder,
    :global([data-theme="dark"]) .inp::placeholder{color:#4A5568}
    
    /* boost active glow */
    @keyframes boostGlow{0%,100%{box-shadow:0 0 0 0 rgba(212,174,58,0)}50%{box-shadow:0 0 0 6px rgba(212,174,58,.12)}}
    .boost-glow{animation:boostGlow 3s ease infinite}
    
    /* empty state */
    .empty-border{border:2px dashed #EDE7DC}
    .dark .empty-border,
    :global([data-theme="dark"]) .empty-border{border-color:rgba(255,255,255,.08)}
    
    /* toast */
    #toast{transition:opacity .3s,transform .3s}
    
    /* actions menu */
    .action-menu{min-width:160px;box-shadow:0 8px 32px rgba(10,36,99,.16)}
    .dark .action-menu,
    :global([data-theme="dark"]) .action-menu{box-shadow:0 8px 32px rgba(0,0,0,.5)}
    
    @media(max-width:768px){
      .hide-md{display:none!important}
      .table-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
      .controls-stack{flex-direction:column!important;align-items:stretch!important}
    }
    @media(max-width:640px){
      .stat-grid-2{grid-template-columns:1fr 1fr!important}
      .hide-sm{display:none!important}
      .card-grid{grid-template-columns:1fr!important}
    }
</style>