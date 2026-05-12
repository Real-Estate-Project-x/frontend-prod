<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  type TimePeriod = '24h' | '7d' | '30d' | 'custom';
  let selectedTimePeriod = $state<TimePeriod>('24h')
  const list = [1];

    const setTimePeriod = (value: TimePeriod) =>  selectedTimePeriod = value;

    const filterHistory = (e: any) => {}

</script>
<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">

  <!-- Page header band -->
  <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
    <div class="max-w-[1100px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <div class="flex items-center gap-2 mb-3 flex-wrap">
          <a href="dashboard.html" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Dashboard
          </a>
          <span class="text-white/25 text-[12px]">/</span>
          <span class="text-[12px] text-white/60">Viewing history</span>
        </div>
        <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Your journey</p>
        <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
          Viewing <em class="italic text-blue-bright">history.</em>
        </h1>
        <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
          <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
          <strong class="text-white font-medium">24</strong> properties explored
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          across <strong class="text-white font-medium">4</strong> states
          <span class="w-1 h-1 rounded-full bg-white/20"></span>
          last 30 days
        </p>
      </div>
      <a href="/site/properties" class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full no-underline tt self-start sm:self-end">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        Resume browsing
      </a>
    </div>
  </div>

   <!-- ─── Page body ─── -->
   <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto">

        {#if list.length > 0}
        <!-- ══ PREFERENCE INSIGHTS ══ -->
        <div class="mb-8">
        <div class="flex items-center justify-between mb-4">
            <div>
            <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Your preferences</h2>
            <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Inferred from your browsing · click any card to search</p>
            </div>
            <span class="text-[11px] font-medium tracking-[.06em] text-blue-bright bg-blue-bright/10 px-3 py-[4px] rounded-full flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>Updated now</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 fu d1">

            <!-- Most viewed type -->
            <a href="search_results.html?type=apartment&beds=3" class="ins-card no-underline bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt block">
            <div class="w-10 h-10 rounded-xl bg-blue-bright/10 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>
            </div>
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Top property type</div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">3-bed apartment</div>
            <div class="flex items-center justify-between mt-2">
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">14 of 24 views</div>
                <div class="flex items-center gap-1 text-[11px] font-medium text-blue-bright">
                Search <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>
            <!-- Mini bar -->
            <div class="bar-track h-1.5 rounded-full mt-3">
                <div class="h-full bg-blue-bright rounded-full bar-grow" style="--w:58%"></div>
            </div>
            </a>

            <!-- Listing type -->
            <a href="search_results.html?listing=rent" class="ins-card no-underline bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt block">
            <div class="w-10 h-10 rounded-xl bg-ember-light dark:bg-ember/15 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C06035" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
            </div>
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Preferred listing</div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">For Rent</div>
            <div class="flex items-center justify-between mt-2">
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">18 of 24 views</div>
                <div class="flex items-center gap-1 text-[11px] font-medium text-ember">
                Search <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>
            <div class="bar-track h-1.5 rounded-full mt-3">
                <div class="h-full bg-ember rounded-full bar-grow" style="--w:75%"></div>
            </div>
            </a>

            <!-- Top location -->
            <a href="search_results.html?location=port-harcourt" class="ins-card no-underline bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt block">
            <div class="w-10 h-10 rounded-xl bg-sage-light dark:bg-sage/15 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A7848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
            </div>
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Top location</div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Port Harcourt</div>
            <div class="flex items-center justify-between mt-2">
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">11 of 24 views</div>
                <div class="flex items-center gap-1 text-[11px] font-medium text-sage">
                Search <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>
            <div class="bar-track h-1.5 rounded-full mt-3">
                <div class="h-full bg-sage rounded-full bar-grow" style="--w:46%"></div>
            </div>
            </a>

            <!-- Avg price range -->
            <a href="search_results.html?min=600000&max=1200000" class="ins-card no-underline bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt block">
            <div class="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center mb-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AE3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
            </div>
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Avg price viewed</div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">₦600k – ₦1.2M</div>
            <div class="flex items-center justify-between mt-2">
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">per month</div>
                <div class="flex items-center gap-1 text-[11px] font-medium text-[#8A6A10] dark:text-gold">
                Search <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>
            <div class="bar-track h-1.5 rounded-full mt-3">
                <div class="h-full bg-gold rounded-full bar-grow" style="--w:65%"></div>
            </div>
            </a>

        </div>
        </div>

      
        <!-- ══ TIME FILTER + SEARCH BAR ══ -->
        <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 mb-6 tt fu d2">
            <div class="flex flex-col sm:flex-row gap-3 flex-wrap">
            <!-- Time period tabs -->
            <div class="flex gap-1.5 overflow-x-auto scrollbar-hide flex-shrink-0">
                <button onclick={() => setTimePeriod('24h')} class="tftab flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border cursor-pointer bg-transparent tt">24h</button>
                <button onclick={() => setTimePeriod('7d')} class="tftab active flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border cursor-pointer tt">7 days</button>
                <button onclick={() => setTimePeriod('30d')} class="tftab flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border cursor-pointer bg-transparent tt">30 days</button>
                <button  onclick={() => setTimePeriod('custom')} class="tftab flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border cursor-pointer bg-transparent tt flex items-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M4 1v2M10 1v2M1 6h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                Custom
                </button>
            </div>
            <!-- Custom date range (hidden by default) -->
            <div id="customDateWrap" class="date-picker-wrap items-center gap-2 flex-wrap">
                <input type="date" id="dateFrom" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[8px] text-[12px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt">
                <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">to</span>
                <input type="date" id="dateTo" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[8px] text-[12px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt">
                <button class="text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright px-4 py-[8px] rounded-xl border-none cursor-pointer tt hover:opacity-90">Apply</button>
            </div>
            <!-- Search -->
            <div class="flex-1 min-w-[180px] flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[9px] focus-within:border-blue-link tt">
                <svg width="13" height="13" class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                <input id="histSearch" type="text" placeholder="Search history by location, price…" oninput={filterHistory} class="flex-1 bg-transparent border-none outline-none text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] min-w-0">
            </div>
            <!-- Type filter -->
            <select class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[9px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer flex-shrink-0">
                <option value="">All types</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
            </select>
            <!-- Sort -->
            <select  class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[9px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer flex-shrink-0">
                <option value="recent">Most recent</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
            </select>
            </div>
        </div>
        
        <!-- ══ QUICK ACCESS (top 3 most recently viewed) ══ -->
        <div class="mb-7 fu d3">
            <div class="flex items-center gap-3 mb-4">
            <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0 flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-bright pulse-dot"></span>Quick access
            </span>
            <div class="group-rule"></div>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Last 3 viewed</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

            <!-- Quick card 1 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt cursor-pointer">
                <div class="relative h-[120px]">
                <div class="prop-scene sky-1">
                    <div class="prop-b" style="width:70px;height:90px;left:36px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:44px;bottom:66px"></div><div class="prop-w" style="width:10px;height:13px;left:60px;bottom:66px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:44px;bottom:46px"></div><div class="prop-w" style="width:10px;height:13px;left:60px;bottom:46px"></div>
                    <div class="prop-b" style="width:46px;height:58px;left:125px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:132px;bottom:39px"></div><div class="prop-w" style="width:7px;height:9px;left:145px;bottom:39px"></div>
                </div>
                <span class="absolute top-2 left-2 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                <span class="absolute top-2 right-2 text-[9px] font-medium text-blue-bright bg-blue-bright/15 backdrop-blur-sm px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>Just now</span>
                </div>
                <div class="px-4 py-3.5">
                <div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦850,000<span class="text-[11px] font-light text-chalk-muted">/mo</span></div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">GRA Phase 2 · Port Harcourt</div>
                <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">3 beds · 2 baths · 110 m²</div>
                </div>
            </div>

            <!-- Quick card 2 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt cursor-pointer">
                <div class="relative h-[120px]">
                <div class="prop-scene sky-2">
                    <div class="prop-b" style="width:85px;height:100px;left:48px"></div>
                    <div class="prop-w" style="width:11px;height:14px;left:56px;bottom:75px"></div><div class="prop-w" style="width:11px;height:14px;left:73px;bottom:75px"></div>
                    <div class="prop-w" style="width:11px;height:14px;left:56px;bottom:53px"></div><div class="prop-w" style="width:11px;height:14px;left:73px;bottom:53px"></div>
                    <div class="prop-w" style="width:11px;height:14px;left:56px;bottom:32px"></div>
                </div>
                <span class="absolute top-2 left-2 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Sale</span>
                <span class="absolute top-2 right-2 text-[9px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-black/20 backdrop-blur-sm px-2 py-[3px] rounded-full">3 hrs ago</span>
                </div>
                <div class="px-4 py-3.5">
                <div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦95,000,000</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Lekki Phase 1 · Lagos</div>
                <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">4 beds · 3 baths · 185 m²</div>
                </div>
            </div>

            <!-- Quick card 3 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt cursor-pointer">
                <div class="relative h-[120px]">
                <div class="prop-scene sky-3">
                    <div class="prop-b" style="width:62px;height:78px;left:32px"></div>
                    <div class="prop-w" style="width:9px;height:12px;left:39px;bottom:56px"></div><div class="prop-w" style="width:9px;height:12px;left:53px;bottom:56px"></div>
                    <div class="prop-w" style="width:9px;height:12px;left:39px;bottom:37px"></div><div class="prop-w" style="width:9px;height:12px;left:53px;bottom:37px"></div>
                    <div class="prop-b" style="width:44px;height:52px;left:114px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:120px;bottom:33px"></div><div class="prop-w" style="width:7px;height:9px;left:132px;bottom:33px"></div>
                </div>
                <span class="absolute top-2 left-2 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                <span class="absolute top-2 right-2 text-[9px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-black/20 backdrop-blur-sm px-2 py-[3px] rounded-full">Yesterday</span>
                </div>
                <div class="px-4 py-3.5">
                <div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦620,000<span class="text-[11px] font-light text-chalk-muted">/mo</span></div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Maitama · Abuja FCT</div>
                <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">3 beds · 2 baths · 98 m²</div>
                </div>
            </div>

            </div>
        </div>
        {/if}

       <!-- ══ HISTORY LIST ══ -->
       <div id="historyList">

        {#if list.length > 0}
        <!-- ── TODAY GROUP ── -->
        <div class="mb-7 fu d4" id="grp-today">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0 flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-ember pulse-dot"></span>Today
            </span>
            <div class="group-rule"></div>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Mon 14 Apr 2026</span>
          </div>

          <div class="space-y-3">

            <!-- History entry 1 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt history-entry" data-type="rent" data-loc="port harcourt" data-price="850000">
              <div class="flex flex-col sm:flex-row">
                <!-- Image col -->
                <div style="background-color: red;" class="relative sm:w-[180px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0">
                  <div class="prop-scene sky-1 h-full">
                    <div class="prop-b" style="width:70px;height:88px;left:32px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:40px;bottom:64px"></div><div class="prop-w" style="width:10px;height:13px;left:56px;bottom:64px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:40px;bottom:44px"></div><div class="prop-w" style="width:10px;height:13px;left:56px;bottom:44px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:40px;bottom:25px"></div>
                    <div class="prop-b" style="width:46px;height:58px;left:118px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:126px;bottom:38px"></div><div class="prop-w" style="width:7px;height:9px;left:139px;bottom:38px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <!-- Content col -->
                <div class="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div class="min-w-0">
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">₦850,000<span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                        <div class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
                          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>
                          GRA Phase 2, Port Harcourt
                        </div>
                      </div>
                      <div class="flex items-center gap-1.5 text-[11px] font-medium text-blue-bright bg-blue-bright/10 px-2.5 py-[4px] rounded-full flex-shrink-0">
                        <span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>Just now
                      </div>
                    </div>
                    <div class="flex gap-4 text-[12px] text-navy-accent dark:text-[#8DAACC] flex-wrap pt-2 border-t border-chalk-3 dark:border-white/[.07] mb-3">
                      <span class="flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>3 beds</span>
                      <span class="flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M2 9h12M2 9v3a1 1 0 001 1h10a1 1 0 001-1V9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>2 baths</span>
                      <span class="flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/></svg>110 m²</span>
                      <span class="flex items-center gap-1.5 text-sage dark:text-[#7DBF7A]"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="1" y="4" width="10" height="7" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M11 7l4-2v5l-4-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Virtual tour</span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="flex-1 min-w-[100px] text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[9px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                        <a href="">View property</a>
                    </button>
                    <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-[9px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt bg-transparent">
                        <a href="">Book viewing</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp">
                        <a href="https://wa.me/2348001234567">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                        </a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                        <a href="tel:+2348001234567">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- History entry 2 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt history-entry" data-type="sale" data-loc="lagos" data-price="95000000">
              <div class="flex flex-col sm:flex-row">
                <div class="relative sm:w-[180px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0">
                  <div class="prop-scene sky-2 h-full">
                    <div class="prop-b" style="width:88px;height:110px;left:44px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:52px;bottom:84px"></div><div class="prop-w" style="width:12px;height:15px;left:70px;bottom:84px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:52px;bottom:62px"></div><div class="prop-w" style="width:12px;height:15px;left:70px;bottom:62px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:52px;bottom:41px"></div><div class="prop-w" style="width:12px;height:15px;left:70px;bottom:41px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Sale</span>
                </div>
                <div class="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div class="min-w-0">
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">₦95,000,000</div>
                        <div class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
                          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>
                          Lekki Phase 1, Lagos
                        </div>
                      </div>
                      <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">3 hrs ago</div>
                    </div>
                    <div class="flex gap-4 text-[12px] text-navy-accent dark:text-[#8DAACC] flex-wrap pt-2 border-t border-chalk-3 dark:border-white/[.07] mb-3">
                      <span>🛏 4 beds</span><span>🚿 3 baths</span><span>📐 185 m²</span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="flex-1 min-w-[100px] text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[9px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                        <a href="">View property</a>
                    </button>
                    <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-[9px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt bg-transparent">
                        <a href="">Book viewing</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp">
                        <a href="https://wa.me/2348001234567">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                        </a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                        <a href="tel:+2348001234567">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ── YESTERDAY GROUP ── -->
        <div class="mb-7 fu d5" id="grp-yesterday">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0">Yesterday</span>
            <div class="group-rule"></div>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Sun 13 Apr 2026</span>
          </div>
          <div class="space-y-3">

            <!-- Entry 3 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt history-entry" data-type="rent" data-loc="abuja" data-price="620000">
              <div class="flex flex-col sm:flex-row">
                <div class="relative sm:w-[180px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0">
                  <div class="prop-scene sky-3 h-full">
                    <div class="prop-b" style="width:62px;height:78px;left:30px"></div>
                    <div class="prop-w" style="width:9px;height:11px;left:37px;bottom:56px"></div><div class="prop-w" style="width:9px;height:11px;left:51px;bottom:56px"></div>
                    <div class="prop-w" style="width:9px;height:11px;left:37px;bottom:38px"></div><div class="prop-w" style="width:9px;height:11px;left:51px;bottom:38px"></div>
                    <div class="prop-b" style="width:44px;height:54px;left:110px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:117px;bottom:35px"></div><div class="prop-w" style="width:7px;height:9px;left:129px;bottom:35px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <div class="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div class="min-w-0">
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">₦620,000<span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                        <div class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Maitama, Abuja FCT</div>
                      </div>
                      <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Yesterday · 4:22 PM</div>
                    </div>
                    <div class="flex gap-4 text-[12px] text-navy-accent dark:text-[#8DAACC] flex-wrap pt-2 border-t border-chalk-3 dark:border-white/[.07] mb-3">
                      <span>🛏 3 beds</span><span>🚿 2 baths</span><span>📐 98 m²</span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="flex-1 min-w-[100px] text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[9px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                        <a href="">View property</a>
                    </button>
                    <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-[9px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt bg-transparent">
                        <a href="">Book viewing</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp">
                        <a href="https://wa.me/2348001234567">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                        </a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                        <a href="tel:+2348001234567">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Entry 4 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt history-entry" data-type="rent" data-loc="port harcourt" data-price="780000">
              <div class="flex flex-col sm:flex-row">
                <div class="relative sm:w-[180px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0">
                  <div class="prop-scene sky-4 h-full">
                    <div class="prop-b" style="width:76px;height:106px;left:38px;border-radius:5px 5px 0 0"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:46px;bottom:82px"></div><div class="prop-w" style="width:10px;height:13px;left:62px;bottom:82px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:46px;bottom:60px"></div><div class="prop-w" style="width:10px;height:13px;left:62px;bottom:60px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:46px;bottom:39px"></div><div class="prop-w" style="width:10px;height:13px;left:62px;bottom:39px"></div>
                    <div class="prop-b" style="width:48px;height:64px;left:132px"></div>
                    <div class="prop-w" style="width:7px;height:10px;left:140px;bottom:44px"></div><div class="prop-w" style="width:7px;height:10px;left:153px;bottom:44px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <div class="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div class="min-w-0">
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">₦780,000<span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                        <div class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>D-Line, Port Harcourt</div>
                      </div>
                      <div class="flex items-center gap-1.5 flex-shrink-0">
                        <span class="text-[10px] font-medium text-gold bg-gold/10 px-2 py-[3px] rounded-full">Price drop</span>
                        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Yesterday</span>
                      </div>
                    </div>
                    <div class="flex gap-4 text-[12px] text-navy-accent dark:text-[#8DAACC] flex-wrap pt-2 border-t border-chalk-3 dark:border-white/[.07] mb-3">
                      <span>🛏 3 beds</span><span>🚿 2 baths</span><span>📐 105 m²</span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="flex-1 min-w-[100px] text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[9px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                        <a href="">View property</a>
                    </button>
                    <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-[9px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt bg-transparent">
                        <a href="">Book viewing</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp">
                        <a href="https://wa.me/2348001234567">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                        </a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                        <a href="tel:+2348001234567">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- ── EARLIER GROUP ── -->
        <div class="mb-7 fu d6" id="grp-earlier">
          <div class="flex items-center gap-3 mb-4">
            <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0">Earlier this week</span>
            <div class="group-rule"></div>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">8–12 Apr 2026</span>
          </div>
          <div class="space-y-3">

            <!-- Entry 5 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt history-entry" data-type="sale" data-loc="delta" data-price="56000000">
              <div class="flex flex-col sm:flex-row">
                <div class="relative sm:w-[180px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0">
                  <div class="prop-scene sky-5 h-full">
                    <div class="prop-b" style="width:66px;height:84px;left:34px"></div>
                    <div class="prop-w" style="width:9px;height:12px;left:42px;bottom:62px"></div><div class="prop-w" style="width:9px;height:12px;left:57px;bottom:62px"></div>
                    <div class="prop-w" style="width:9px;height:12px;left:42px;bottom:43px"></div><div class="prop-w" style="width:9px;height:12px;left:57px;bottom:43px"></div>
                    <div class="prop-b" style="width:46px;height:56px;left:118px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:125px;bottom:37px"></div><div class="prop-w" style="width:7px;height:9px;left:138px;bottom:37px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Sale</span>
                </div>
                <div class="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div class="min-w-0">
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">₦56,000,000</div>
                        <div class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Asaba, Delta State</div>
                      </div>
                      <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Fri 12 Apr</div>
                    </div>
                    <div class="flex gap-4 text-[12px] text-navy-accent dark:text-[#8DAACC] flex-wrap pt-2 border-t border-chalk-3 dark:border-white/[.07] mb-3">
                      <span>🛏 3 beds</span><span>🚿 2 baths</span><span>📐 122 m²</span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="flex-1 min-w-[100px] text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[9px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                        <a href="">View property</a>
                    </button>
                    <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-[9px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt bg-transparent">
                        <a href="">Book viewing</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp">
                        <a href="https://wa.me/2348001234567">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                        </a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                        <a href="tel:+2348001234567">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Entry 6 -->
            <div class="hcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt history-entry" data-type="rent" data-loc="port harcourt" data-price="450000">
              <div class="flex flex-col sm:flex-row">
                <div class="relative sm:w-[180px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0">
                  <div class="prop-scene sky-1 h-full">
                    <div class="prop-b" style="width:58px;height:70px;left:28px"></div>
                    <div class="prop-w" style="width:8px;height:11px;left:35px;bottom:50px"></div><div class="prop-w" style="width:8px;height:11px;left:49px;bottom:50px"></div>
                    <div class="prop-w" style="width:8px;height:11px;left:35px;bottom:33px"></div>
                    <div class="prop-b" style="width:40px;height:48px;left:102px"></div>
                    <div class="prop-w" style="width:6px;height:8px;left:108px;bottom:31px"></div><div class="prop-w" style="width:6px;height:8px;left:120px;bottom:31px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-medium text-white/75 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <div class="flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                  <div>
                    <div class="flex items-start justify-between gap-3 mb-2 flex-wrap">
                      <div class="min-w-0">
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">₦450,000<span class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                        <div class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Rumuola, Port Harcourt</div>
                      </div>
                      <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Wed 9 Apr</div>
                    </div>
                    <div class="flex gap-4 text-[12px] text-navy-accent dark:text-[#8DAACC] flex-wrap pt-2 border-t border-chalk-3 dark:border-white/[.07] mb-3">
                      <span>🛏 3 beds</span><span>🚿 1 bath</span><span>📐 82 m²</span>
                    </div>
                  </div>
                  <div class="flex gap-2 flex-wrap">
                    <button class="flex-1 min-w-[100px] text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[9px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                        <a href="">View property</a>
                    </button>
                    <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-[9px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt bg-transparent">
                        <a href="">Book viewing</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp">
                        <a href="https://wa.me/2348001234567">
                            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                        </a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                        <a href="tel:+2348001234567">
                        <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        {:else}
        <!-- Empty state (hidden by default) -->
        <div id="emptyHistory" class="text-center py-16">
          <div class="float inline-block mb-6">
            <div class="w-20 h-20 rounded-3xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center mx-auto tt">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="10" cy="10" r="8" stroke="#8C8070" stroke-width="1.4"/><path d="M10 6v4l3 2" stroke="#8C8070" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
          </div>
          <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:24px">No history <em class="italic">found.</em></h3>
          <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] max-w-[340px] mx-auto mb-6">No properties match your filters. Try a broader search or time range.</p>
          <a href="/site/properties" class="inline-flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-6 py-3 rounded-full no-underline tt">
            Browse properties
          </a>
        </div>
        {/if}

      </div><!-- /historyList -->

      {#if list.length > 0}
      <!-- ══ PAGINATION ══ -->
      <div class="mt-10 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu">
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <!-- Per-page -->
          <div class="flex items-center gap-2 text-[13px] text-chalk-muted dark:text-[#6A7FA0]">
            <span class="hidden sm:inline">Show</span>
            <select class="bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt">
              <option>5 per page</option>
              <option>10 per page</option>
              <option>20 per page</option>
            </select>
            <span class="hidden sm:inline text-[12px]">· Showing 1–6 of 6 viewings</span>
          </div>

          <!-- Page numbers -->
          <div class="flex items-center gap-1.5">
            <button class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>Prev
            </button>
            <button class="pgbtn active w-9 h-9 rounded-xl text-[13px] border border-navy-dark cursor-pointer">1</button>
            <button class="pgbtn w-9 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 text-[13px] hover:border-navy-dark dark:hover:border-white/40 tt bg-transparent cursor-pointer">2</button>
            <button class="pgbtn w-9 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 text-[13px] hover:border-navy-dark dark:hover:border-white/40 tt bg-transparent cursor-pointer">3</button>
            <button class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
              Next<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
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
    /* ── core ── */
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    
    /* ── animations ── */
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .52s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.29s}
    .d7{animation-delay:.34s}.d8{animation-delay:.39s}
    @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
    .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
    @keyframes floatBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
    .float{animation:floatBob 3.8s ease-in-out infinite}
    @keyframes growBar{from{width:0}to{width:var(--w)}}
    .bar-grow{animation:growBar .9s cubic-bezier(.34,1.2,.64,1) .3s both}
    
    /* ── sidebar ── */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* ── time filter tabs ── */
    .tftab.active{background:#0A2463;color:#fff;border-color:#0A2463}
    .dark .tftab.active{background:#4A90E2;border-color:#4A90E2}
    .tftab:not(.active){color:#8C8070;border-color:#EDE7DC}
    .dark .tftab:not(.active),
    :global([data-theme="dark"]) .tftab:not(.active){color:#6A7FA0;border-color:rgba(255,255,255,.1)}
    .tftab:not(.active):hover{border-color:#0A2463;color:#0A2463}
    .dark .tftab:not(.active):hover, 
    :global([data-theme="dark"]) .tftab:not(.active):hover{border-color:#4A90E2;color:#4A90E2}
    
    /* ── history card ── */
    .hcard{transition:transform .22s,box-shadow .22s,border-color .2s}
    .hcard:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(10,36,99,.11)}
    .dark .hcard:hover{box-shadow:0 10px 36px rgba(0,0,0,.42)}
    .hcard:hover{border-color:#4A90E2!important}
    
    /* ── insight card hover ── */
    .ins-card{transition:transform .2s,box-shadow .2s,border-color .2s;cursor:pointer}
    .ins-card:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(10,36,99,.09);border-color:#4A90E2!important}
    .dark .ins-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.35)}
    
    /* ── group rule line ── */
    .group-rule{flex:1;height:1px;background:#EDE7DC}
    .dark .group-rule,
    :global([data-theme="dark"]) .group-rule {background:rgba(255,255,255,.08)}
    
    /* ── prop scene illustrations ── */
    .prop-scene{width:100%;height:100%;position:relative}
    .sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
    .sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
    .sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 40%,#1F3F6A 100%)}
    .sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
    .sky-5{background:linear-gradient(160deg,#1A2E50 0%,#2E5078 60%,#5E8AB0 100%)}
    .prop-b{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
    .prop-w{position:absolute;background:rgba(212,174,58,.68);border-radius:2px}
    
    /* ── pagination ── */
    .pgbtn.active{background:#0A2463;color:#fff;border-color:#0A2463}
    .dark .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
    
    /* ── custom date picker ── */
    .date-picker-wrap{display:none}
    .date-picker-wrap.open{display:flex}
    
    /* ── sort chip ── */
    .sort-chip.active{background:#0A2463;color:#fff;border-color:#0A2463}
    .dark .sort-chip.active{background:#4A90E2;border-color:#4A90E2}
    
    /* ── insight bar track ── */
    .bar-track{background:#EDE7DC;border-radius:4px;overflow:hidden}
    .dark .bar-track{background:rgba(255,255,255,.08)}

    .dark .border-white {
        border-color: rgba(255,255,255,0.08) !important;
    }
    
    /* ── responsive ── */
    @media(max-width:640px){
      .hide-xs{display:none!important}
      .full-xs{width:100%!important}
      .grid-xs-1{grid-template-columns:1fr!important}
    }
</style>