<script lang="ts">
  import { goto } from "$app/navigation";
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  type ViewType = 'grid' | 'list';
  type TabType = 'all' | 'rent' | 'sale' | 'virtual' | 'boosted'

    let view = $state<ViewType>('grid');
    let selectedTab = $state<TabType>('all');
    let isUnsaved = $state(false);
    let list = [1];

    const setView = (value: ViewType) => view = value;

    const setTab = (value: TabType) => selectedTab = value;

    const clearAllSaved = () => {}

    const unsaveCard = (id: string) => {
        isUnsaved = !isUnsaved;

        setTimeout(() => goto('/users/fav-listings'), 1000);

    }
</script>
<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">
    <!-- Page header -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
        <div class="max-w-[1100px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
            <div class="flex items-center gap-2 mb-3">
            <a href="/users" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Dashboard
            </a>
            <span class="text-white/25 text-[12px]">/</span>
            <span class="text-[12px] text-white/60">Saved properties</span>
            </div>
            <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
            Saved properties
            </h1>
            <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E53E3E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" fill="#E53E3E" stroke="none"/></svg>
            <span><strong id="propCount" class="text-white font-medium">7</strong> saved properties · <span id="visibleCount">7</span> shown</span>
            </p>
        </div>
        <a href="/site/properties" class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full no-underline tt self-start sm:self-end">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            Find more properties
        </a>
        </div>
    </div>

      <!-- ─── Body ─── -->
      <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto">
        {#if list.length > 0}
        <!-- ── FILTERS & CONTROLS BAR ── -->
        <div class="flex flex-col sm:flex-row sm:items-center gap-3 mb-7">
  
            <!-- Search within saved -->
            <div class="flex-1 flex items-center gap-2.5 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-2.5 focus-within:border-blue-link tt">
              <svg width="14" height="14" class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <input id="searchInput" type="text" placeholder="Search saved properties…"
                class="flex-1 bg-transparent border-none outline-none text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
              <button title="Clear search" onclick={() => {
                  // Cancel search_param
              }} class="text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white bg-transparent border-none cursor-pointer tt leading-none">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
              </button>
            </div>
    
            <!-- Type filter -->
            <select id="typeFilter"
              class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt">
              <option value="">All types</option>
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
    
            <!-- Sort -->
            <select id="sortSel"
              class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt">
              <option value="recent">Most recently saved</option>
              <option value="price_asc">Price: Low → High</option>
              <option value="price_desc">Price: High → Low</option>
              <option value="beds">Most bedrooms</option>
            </select>
    
            <!-- View toggle -->
            <div class="flex gap-0.5 bg-chalk-2 dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl p-1 tt flex-shrink-0">
              <button id="vtGrid" 
                  title="Grid view"
                  onclick={() => setView('grid')} 
                  class={`vt-btn ${view === 'grid' ? 'active' : ''} w-9 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none tt" title="Grid view`}>
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="1" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/><rect x="8" y="8" width="5" height="5" rx="1" stroke="currentColor" stroke-width="1.3"/></svg>
              </button>
              <button id="vtList" 
                  onclick={() => setView('list')} 
                  class={`vt-btn ${view === 'list' ? 'active' : ''} w-9 h-8 rounded-lg flex items-center justify-center cursor-pointer border-none bg-transparent text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt`} title="List view">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M4 3h9M4 7h9M4 11h9M1 3h1M1 7h1M1 11h1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              </button>
            </div>
          </div>

        <!-- ── COLLECTION TABS ── -->
        <div class="flex gap-2 mb-6 flex-wrap">
            <button onclick={() => setTab('all')} class="tab-btn flex items-center gap-1.5 text-[12px] font-medium px-4 py-[7px] rounded-full bg-navy-dark text-white border border-navy-dark cursor-pointer">
            All <span class="bg-white/20 px-1.5 py-0 rounded-full text-[10px]">7</span>
            </button>
            <button onclick={() => setTab('rent')} class="tab-btn flex items-center gap-1.5 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
            For Rent <span class="text-[10px] ml-0.5">4</span>
            </button>
            <button onclick={() => setTab('sale')} class="tab-btn flex items-center gap-1.5 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
            For Sale <span class="text-[10px] ml-0.5">3</span>
            </button>
            <button onclick={() => setTab('virtual')} class="tab-btn flex items-center gap-1.5 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M11 7l3-2v5l-3-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            Virtual tour <span class="text-[10px] ml-0.5">3</span>
            </button>
            <button onclick={() => setTab('boosted')} class="tab-btn flex items-center gap-1.5 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
            <span class="w-2 h-2 rounded-full bg-gold"></span>Boosted <span class="text-[10px] ml-0.5">2</span>
            </button>
            <span class="ml-auto self-center text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
            <button onclick={clearAllSaved} class="text-ember hover:text-ember-deep bg-transparent border-none cursor-pointer font-sans text-[12px] tt">Clear all saved</button>
            </span>
        </div>

        <!-- ── PROPERTY CARDS GRID ── -->
        <div id="cardsGrid" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

            <!-- CARD DATA attributes used for filter/sort -->
            <!-- card 1 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="rent" data-price="850000" data-beds="3" data-tags="virtual boosted" data-loc="GRA Phase 2" data-saved="2026-04-10">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#0E2444] via-[#1F3F6A] to-[#4A70A0] flex-shrink-0">
                <div class="absolute bottom-0 left-[58px] w-[90px] h-[118px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[88px] left-[70px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[88px] left-[90px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[60px] left-[70px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[60px] left-[90px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[32px] left-[70px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-0 left-[170px] w-[60px] h-[76px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[52px] left-[180px] w-[10px] h-[13px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <!-- tags -->
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
                <span class="absolute top-3 right-3 text-[9px] font-semibold tracking-[.1em] uppercase px-[9px] py-[3px] rounded-full bg-gold text-navy-deep flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-navy-mid"></span>Boosted</span>
                <!-- Virtual badge -->
                <span class="absolute bottom-3 left-3 text-[9px] font-medium text-white bg-sage/80 backdrop-blur-sm px-2.5 py-[3px] rounded-full flex items-center gap-1.5"><span class="w-[4px] h-[4px] rounded-full bg-white"></span>Virtual tour</span>
                <!-- Unsave heart -->
                <button  onclick={() => unsaveCard("1")} title="Remove from saved"
                class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦850,000 <span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">/ month</span></div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>GRA Phase 2, Port Harcourt</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>3 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>115 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 10 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline cursor-pointer">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] dark:hover:bg-sage/35 tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-navy-strong flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0">CO</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Chukwuemeka O. · 4.9 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

            <!-- CARD 2 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="sale" data-price="95000000" data-beds="4" data-tags="" data-loc="Lekki Phase 1" data-saved="2026-04-09">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#1F3F6A] via-[#4A70A0] to-[#8DAACC] flex-shrink-0">
                <div class="absolute bottom-0 left-[60px] w-[110px] h-[145px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[112px] left-[72px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[112px] left-[95px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[82px] left-[72px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[82px] left-[95px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[52px] left-[72px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[52px] left-[95px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-ember-light text-ember-deep dark:bg-ember/20 dark:text-[#EDBA9B]">For Sale</span>
                <button  onclick={() => unsaveCard("1")} title="Remove from saved" class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦95,000,000</div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>Lekki Phase 1, Lagos</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>4 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>3 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>185 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 9 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-ember flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0">AM</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Amara Madu · 4.7 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

            <!-- CARD 3 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="rent" data-price="620000" data-beds="3" data-tags="virtual" data-loc="Woji" data-saved="2026-04-08">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#060E1C] via-[#0A2463] to-[#1F3F6A] flex-shrink-0">
                <div class="absolute bottom-0 left-[50px] w-[85px] h-[110px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[82px] left-[60px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[82px] left-[79px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[56px] left-[60px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[56px] left-[79px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-0 left-[158px] w-[55px] h-[68px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[46px] left-[166px] w-[9px] h-[12px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
                <span class="absolute bottom-3 left-3 text-[9px] font-medium text-white bg-sage/80 backdrop-blur-sm px-2.5 py-[3px] rounded-full flex items-center gap-1.5"><span class="w-[4px] h-[4px] rounded-full bg-white"></span>Virtual tour</span>
                <button  onclick={() => unsaveCard("1")} title="Remove from saved" class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦620,000 <span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">/ month</span></div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>Woji, Port Harcourt</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>3 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>98 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 8 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-sage flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0">BO</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Bola Okafor · 4.8 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

            <!-- CARD 4 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="sale" data-price="72500000" data-beds="3" data-tags="boosted" data-loc="Rumuola" data-saved="2026-04-07">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#0E2444] via-[#163660] to-[#2E5480] flex-shrink-0">
                <div class="absolute bottom-0 left-[46px] w-[104px] h-[132px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[100px] left-[56px] w-[14px] h-[18px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[100px] left-[78px] w-[14px] h-[18px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[70px] left-[56px] w-[14px] h-[18px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[70px] left-[78px] w-[14px] h-[18px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[40px] left-[56px] w-[14px] h-[18px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-ember-light text-ember-deep dark:bg-ember/20 dark:text-[#EDBA9B]">For Sale</span>
                <span class="absolute top-3 right-3 text-[9px] font-semibold tracking-[.1em] uppercase px-[9px] py-[3px] rounded-full bg-gold text-navy-deep flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-navy-mid"></span>Boosted</span>
                <button  onclick={() => unsaveCard("1")} title="Remove from saved" class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦72,500,000</div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>Rumuola, Port Harcourt</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>3 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>118 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 7 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-navy-mid flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0">FI</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Femi Ige · 4.6 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

            <!-- CARD 5 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="rent" data-price="780000" data-beds="3" data-tags="" data-loc="D-Line" data-saved="2026-04-05">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#1A2E50] via-[#2E5078] to-[#5E8AB0] flex-shrink-0">
                <div class="absolute bottom-0 left-[55px] w-[95px] h-[124px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[94px] left-[65px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[94px] left-[85px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[66px] left-[65px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[66px] left-[85px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-0 left-[170px] w-[68px] h-[86px] bg-white/[0.13] rounded-t"></div>
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
                <button  onclick={() => unsaveCard("1")} title="Remove from saved" class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦780,000 <span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">/ month</span></div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>D-Line, Port Harcourt</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>3 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>105 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 5 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-gold flex items-center justify-center text-[9px] font-medium text-navy-deep flex-shrink-0">KA</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Kingsley Amadi · 5.0 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

            <!-- CARD 6 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="sale" data-price="56000000" data-beds="3" data-tags="virtual boosted" data-loc="Eliozu" data-saved="2026-04-04">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#0A2463] via-[#1F3F6A] to-[#4A70A0] flex-shrink-0">
                <div class="absolute bottom-0 left-[60px] w-[86px] h-[112px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[84px] left-[70px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[84px] left-[88px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[58px] left-[70px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[58px] left-[88px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-ember-light text-ember-deep dark:bg-ember/20 dark:text-[#EDBA9B]">For Sale</span>
                <span class="absolute top-3 right-3 text-[9px] font-semibold tracking-[.1em] uppercase px-[9px] py-[3px] rounded-full bg-gold text-navy-deep flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-navy-mid"></span>Boosted</span>
                <span class="absolute bottom-3 left-3 text-[9px] font-medium text-white bg-sage/80 backdrop-blur-sm px-2.5 py-[3px] rounded-full flex items-center gap-1.5"><span class="w-[4px] h-[4px] rounded-full bg-white"></span>Virtual tour</span>
                <button  onclick={() => unsaveCard("1")} title="Remove from saved" class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦56,000,000</div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>Eliozu, Port Harcourt</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>3 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>108 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 4 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-navy-strong flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0">NW</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Nkechi Williams · 4.5 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

            <!-- CARD 7 -->
            <div class={`${isUnsaved ? 'shake card-active' : ''}  prop-card fu d1 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt flex flex-col`} data-type="rent" data-price="420000" data-beds="2" data-tags="virtual" data-loc="Obio/Akpor" data-saved="2026-04-02">
            <div class="card-img-wrap h-[200px] relative overflow-hidden bg-gradient-to-br from-[#0E2444] via-[#4A70A0] to-[#8DAACC] flex-shrink-0">
                <div class="absolute bottom-0 left-[54px] w-[100px] h-[126px] bg-white/[0.13] rounded-t"></div>
                <div class="absolute bottom-[96px] left-[64px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[96px] left-[84px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[68px] left-[64px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[68px] left-[84px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <div class="absolute bottom-[40px] left-[64px] w-[13px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
                <span class="absolute top-3 left-3 text-[10px] font-medium tracking-[.08em] uppercase px-[10px] py-1 rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
                <span class="absolute bottom-3 left-3 text-[9px] font-medium text-white bg-sage/80 backdrop-blur-sm px-2.5 py-[3px] rounded-full flex items-center gap-1.5"><span class="w-[4px] h-[4px] rounded-full bg-white"></span>Virtual tour</span>
                <button onclick={() => unsaveCard("1")} title="Remove from saved" class="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-rose-500/90 backdrop-blur-sm border border-rose-400 flex items-center justify-center cursor-pointer hover:bg-rose-600 tt">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
            </div>
            <div class="p-[18px] flex-1 flex flex-col">
                <div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100 mb-[3px]">₦420,000 <span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">/ month</span></div>
                <div class="flex items-center gap-[5px] text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[5px] h-[5px] rounded-full bg-blue-bright flex-shrink-0"></div>Obio/Akpor, Port Harcourt</div>
                <div class="flex gap-4 pt-3 border-t border-chalk-3 dark:border-white/[.08] mb-3">
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 beds</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>2 baths</span>
                <span class="text-[11px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[5px] h-[5px] rounded-full bg-blue-bright"></span>78 m²</span>
                </div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Saved 2 Apr 2026</div>
                <div class="flex gap-2 mt-auto">
                <a href="/site/properties/12" class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-[9px] rounded-full bg-navy-dark dark:bg-blue-bright text-white border-none hover:bg-navy-mid dark:hover:bg-blue-bright/80 tt no-underline">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5.5 7-5.5S15 8 15 8s-3 5.5-7 5.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                    View property
                </a>
                <button class="flex-1 text-[12px] font-medium py-[9px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A] border-none hover:bg-[#D0DECC] tt cursor-pointer">Book viewing</button>
                </div>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-[10px] border-t border-chalk-3 dark:border-white/[.08] bg-chalk-2 dark:bg-white/[.03]">
                <div class="w-6 h-6 rounded-full bg-ember flex items-center justify-center text-[9px] font-medium text-white flex-shrink-0">AM</div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Amara Madu · 4.7 ★</span>
                <span class="ml-auto text-[9px] font-medium tracking-[.06em] uppercase text-sage dark:text-[#7DBF7A]">✓ Verified</span>
            </div>
            </div>

        </div><!-- /cards grid -->

        <!-- ══════ PAGINATION ══════ -->
        <div class="mt-10 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu">
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
      {:else}
        <!-- Empty state (hidden unless all cards unsaved) -->
        <div id="emptyState" class="text-center py-20">
            <div class="float mb-6 inline-block">
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" class="text-chalk-3 dark:text-white/[.1]">
                <rect x="8" y="8" width="48" height="48" rx="12" stroke="currentColor" stroke-width="2" stroke-dasharray="6 4"/>
                <path d="M32 20.61a6.5 6.5 0 00-9.19 0l-1.25 1.25-1.25-1.25a6.5 6.5 0 00-9.19 9.19l1.25 1.25L32 41.07l9.63-9.63" stroke="#E53E3E" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" opacity=".4"/>
                <path d="M42 22l-8 8M50 30l-8 8" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round" opacity=".3"/>
            </svg>
            </div>
            <h3 class="font-display text-[28px] font-light text-navy-dark dark:text-blue-100 mb-2">No saved properties</h3>
            <p class="text-[14px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-6 max-w-sm mx-auto leading-[1.7]">Properties you heart while browsing will appear here. Start exploring to find your perfect home.</p>
            <a href="/site/properties" class="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-6 py-3 rounded-full no-underline tt">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            Browse properties
            </a>
        </div>

        <!-- No results for filter -->
        <!-- <div id="noResults" class="text-center py-14">
            <p class="text-[14px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-3">No saved properties match your filter.</p>
            <button onclick={() => {}} class="text-[13px] text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer font-sans">Clear filters</button>
        </div> -->
        {/if}

       </div>
  </main>

</div>

<style>
    .card-active { 
        transition: 'opacity .3s,transform .3s,max-height .35s';
        opacity: 0;
        transform: scale(.95);
        overflow: hidden;
    }
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .55s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.08s}.d3{animation-delay:.12s}
    .d4{animation-delay:.16s}.d5{animation-delay:.20s}.d6{animation-delay:.24s}
    .d7{animation-delay:.28s}.d8{animation-delay:.32s}
    @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
    .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    /* card hover */
    .prop-card{transition:transform .22s,box-shadow .22s,border-color .2s}
    .prop-card:hover{transform:translateY(-3px);box-shadow:0 14px 40px rgba(10,36,99,.13)}
    .dark .prop-card:hover{box-shadow:0 14px 40px rgba(0,0,0,.45)}
    .prop-card:hover{border-color:#4A90E2 !important}
    /* remove btn shake on unsave */
    @keyframes shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(3px)}}
    .shake{animation:shake .35s ease}
    /* view toggle active */
    .vt-btn.active{background:#0A2463;color:white}
    .dark .vt-btn.active{background:#4A90E2;color:white}
    /* sort period chips */
    .sort-chip.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .sort-chip.active{background:#4A90E2;border-color:#4A90E2}
    /* list view layout override */
    .list-mode .prop-card{display:grid;grid-template-columns:200px 1fr}
    .list-mode .card-img-wrap{border-radius:16px 0 0 16px;height:100%;min-height:168px}
    @media(max-width:640px){.list-mode .prop-card{grid-template-columns:1fr}}
    @media(max-width:640px){.list-mode .card-img-wrap{min-height:160px;border-radius:16px 16px 0 0}}
    /* empty state */
    @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    .float{animation:floatUp 3.5s ease-in-out infinite}
    /* ── page number active ── */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
</style>