<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  let toastMsg = $state<string | null>()

  const showToast = (msg: string) => {
    toastMsg = msg;
    setTimeout(() => {
      toastMsg = null;
    }, 3000);
  }

  const handleSave = (data: boolean) => {
    console.log('Received from child:', data);
  }
</script>

<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
 <UserSidebar />


 <!-- ════════════════════════════════════════════════
     MAIN CONTENT
════════════════════════════════════════════════ -->
<main class="flex-1 min-w-0 overflow-x-hidden">

  <!-- ── Page header band ── -->
  <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
    <div class="max-w-[1100px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
      <div>
        <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Buyer dashboard</p>
        <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
          Good morning, <em class="italic" style="color:#4A90E2">Fatima.</em>
        </h1>
        <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
          <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
          <span id="todayStr"></span>
          <span class="w-1 h-1 rounded-full bg-white/25"></span>
          Last updated <strong class="text-white font-medium">just now</strong>
        </p>
      </div>
      <a href="/site/properties" class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full tt self-start sm:self-end no-underline shrink-0">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        Browse properties
      </a>
    </div>
  </div>

  <!-- ── Body ── -->
  <div class="px-6 lg:px-10 py-8 max-w-[1100px] mx-auto space-y-10">

    <!-- ════════════════════════════════════
         KPI CARDS  (max 6 — no charts)
    ════════════════════════════════════ -->
    <section>
      <div class="flex items-baseline justify-between mb-5 gap-3 flex-wrap">
        <div>
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Your activity</p>
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:clamp(20px,2.5vw,28px)">KPI <em class="italic">overview</em></h2>
        </div>
        <span class="flex items-center gap-1.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
          <span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>
          Live · updated now
        </span>
      </div>

      <!-- 3-col on desktop, 2 on tablet, 1 on mobile -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">

        <!-- ── KPI 1 — Properties Viewed ── -->
        <div class="kpi-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu d1">
          <div class="flex items-start justify-between mb-5">
            <div class="w-10 h-10 rounded-xl icon-blue flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="10" r="3" stroke="#4A90E2" stroke-width="1.4"/></svg>
            </div>
            <span class="trend-up text-[11px] font-medium px-2.5 py-[4px] rounded-full flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 8l3.5-5 2.5 2.5L9 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              ↑ 12%
            </span>
          </div>
          <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:42px">47</div>
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Properties Viewed</div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></span>
            14 in last 7 days
          </div>
        </div>

        <!-- ── KPI 2 — Saved Properties ── -->
        <div class="kpi-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu d2">
          <div class="flex items-start justify-between mb-5">
            <div class="w-10 h-10 rounded-xl icon-ember flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" stroke="#C06035" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10" cy="7" r="2" stroke="#C06035" stroke-width="1.4"/></svg>
            </div>
            <span class="trend-alert text-[11px] font-medium px-2.5 py-[4px] rounded-full">
              ↑ 3 new
            </span>
          </div>
          <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:42px">7</div>
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Saved Properties</div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0"></span>
            3 added this week
          </div>
        </div>

        <!-- ── KPI 3 — Active Search Alerts ── -->
        <div class="kpi-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu d3">
          <div class="flex items-start justify-between mb-5">
            <div class="w-10 h-10 rounded-xl icon-gold flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="flex items-center gap-1.5 trend-neutral text-[11px] font-medium px-2.5 py-[4px] rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>
              All live
            </span>
          </div>
          <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:42px">3</div>
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Active Search Alerts</div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot flex-shrink-0"></span>
            Push &amp; email enabled
          </div>
        </div>

        <!-- ── KPI 4 — Pending Viewings ── -->
        <div class="kpi-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu d4">
          <div class="flex items-start justify-between mb-5">
            <div class="w-10 h-10 rounded-xl icon-sage flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#4A7848" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="flex items-center gap-1.5 trend-up text-[11px] font-medium px-2.5 py-[4px] rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>
              Upcoming
            </span>
          </div>
          <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:42px">2</div>
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Pending Viewings</div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0"></span>
            Next: Mon 14 Apr, 10:00 AM
          </div>
        </div>

        <!-- ── KPI 5 — Messages from Agents ── -->
        <div class="kpi-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu d5">
          <div class="flex items-start justify-between mb-5">
            <div class="w-10 h-10 rounded-xl icon-navy flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z" stroke="#4A70A0" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="trend-new text-[11px] font-medium px-2.5 py-[4px] rounded-full flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>
              4 unread
            </span>
          </div>
          <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:42px">4</div>
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Agent Messages</div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></span>
            Latest 14 min ago
          </div>
        </div>

        <!-- ── KPI 6 — New Search Matches ── -->
        <div class="kpi-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu d6">
          <div class="flex items-start justify-between mb-5">
            <div class="w-10 h-10 rounded-xl icon-blue flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#4A90E2" stroke-width="1.4"/><path d="M13 13l4 4" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/><path d="M8 5.5v5M5.5 8h5" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="trend-up text-[11px] font-medium px-2.5 py-[4px] rounded-full flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M1 8l3.5-5 2.5 2.5L9 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              5 today
            </span>
          </div>
          <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:42px">14</div>
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">New Search Matches</div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot flex-shrink-0"></span>
            Across 3 saved searches
          </div>
        </div>

      </div>
    </section>

    <!-- ════════════════════════════════════
         QUICK ACTIONS  (2 → 4 cols)
    ════════════════════════════════════ -->
    <section class="fu d3">
      <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-4">Quick actions</p>
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">

        <a href="dashboard_saved.html" class="ql-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 flex flex-col gap-3 no-underline tt">
          <div class="w-9 h-9 rounded-xl icon-ember flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" stroke="#C06035" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10" cy="7" r="2" stroke="#C06035" stroke-width="1.4"/></svg>
          </div>
          <div>
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Saved properties</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">7 saved</div>
          </div>
        </a>

        <a href="dashboard_viewings.html" class="ql-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 flex flex-col gap-3 no-underline tt">
          <div class="w-9 h-9 rounded-xl icon-sage flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#4A7848" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <div>
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">My viewings</div>
            <div class="text-[11px] text-ember dark:text-[#EDBA9B] mt-0.5">2 upcoming</div>
          </div>
        </a>

        <a href="dashboard_saved_searches.html" class="ql-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 flex flex-col gap-3 no-underline tt">
          <div class="relative w-9 h-9 flex-shrink-0">
            <div class="w-9 h-9 rounded-xl icon-blue flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#4A90E2" stroke-width="1.4"/><path d="M13 13l4 4" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <span class="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-bright flex items-center justify-center text-[9px] font-bold text-white leading-none">5</span>
          </div>
          <div>
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Saved searches</div>
            <div class="text-[11px] text-blue-bright mt-0.5">5 new matches</div>
          </div>
        </a>

        <a href="properties.html" class="ql-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 flex flex-col gap-3 no-underline tt">
          <div class="w-9 h-9 rounded-xl icon-gold flex items-center justify-center flex-shrink-0">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M3 10L10 3l7 7v8a1 1 0 01-1 1H4a1 1 0 01-1-1v-8z" stroke="#D4AE3A" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 18v-6h6v6" stroke="#D4AE3A" stroke-width="1.4" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Browse listings</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Explore now →</div>
          </div>
        </a>

      </div>
    </section>

    <!-- ════════════════════════════════════
         RECENT ACTIVITY FEED
    ════════════════════════════════════ -->
    <section class="fu d4">
      <div class="flex items-baseline justify-between mb-4 gap-3 flex-wrap">
        <div>
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">What's been happening</p>
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:clamp(18px,2vw,24px)">Recent <em class="italic">activity</em></h2>
        </div>
        <a href="#" class="text-[12px] font-medium text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt shrink-0">View all →</a>
      </div>

      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt">

        <!-- row 1 -->
        <div class="act-row flex items-start gap-4 px-5 py-4 border-b border-chalk-3 dark:border-white/[.06] tt cursor-pointer" onclick={() => showToast('Opening saved search…')}>
          <div class="w-8 h-8 rounded-full bg-blue-bright/10 flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4A90E2" stroke-width="1.4"/><path d="M10 9v5M10 7h.01" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg></div>
          <div class="flex-1 min-w-0">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">5 new matches found</div>
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">For "3-bed flat · Enugu · Gym &amp; CCTV"</div>
          </div>
          <span class="text-[11px] text-blue-bright flex-shrink-0 mt-0.5 whitespace-nowrap">14 min ago</span>
        </div>

        <!-- row 2 -->
        <div class="act-row flex items-start gap-4 px-5 py-4 border-b border-chalk-3 dark:border-white/[.06] tt cursor-pointer" onclick={() => showToast('Opening property…')}>
          <div class="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M5 15l-3 3V5a1 1 0 011-1h14a1 1 0 011 1v8a1 1 0 01-1 1H5z" stroke="#D4AE3A" stroke-width="1.4" stroke-linejoin="round"/></svg></div>
          <div class="flex-1 min-w-0">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Price drop on saved property</div>
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">GRA Phase 2 · ₦850k <span class="text-sage dark:text-[#7DBF7A]">→ ₦780k/mo</span></div>
          </div>
          <span class="text-[11px] text-blue-bright flex-shrink-0 mt-0.5 whitespace-nowrap">1 hr ago</span>
        </div>

        <!-- row 3 -->
        <div class="act-row flex items-start gap-4 px-5 py-4 border-b border-chalk-3 dark:border-white/[.06] tt cursor-pointer" onclick={() => showToast('Opening viewings…')}>
          <div class="w-8 h-8 rounded-full bg-ember-light flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#C06035" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg></div>
          <div class="flex-1 min-w-0">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Viewing confirmed ✓</div>
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">Mon 14 Apr · 10:00 AM · Maitama 4-Bed Terrace</div>
          </div>
          <span class="text-[11px] text-blue-bright flex-shrink-0 mt-0.5 whitespace-nowrap">2 hrs ago</span>
        </div>

        <!-- row 4 -->
        <div class="act-row flex items-start gap-4 px-5 py-4 border-b border-chalk-3 dark:border-white/[.06] tt cursor-pointer" onclick={() => showToast('Opening saved properties…')}>
          <div class="w-8 h-8 rounded-full bg-sage-light flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" stroke="#4A7848" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10" cy="7" r="2" stroke="#4A7848" stroke-width="1.4"/></svg></div>
          <div class="flex-1 min-w-0">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Property saved</div>
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">Enugu North · 2-Bed Apartment · ₦450k/mo</div>
          </div>
          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0 mt-0.5 whitespace-nowrap">Yesterday</span>
        </div>

        <!-- row 5 -->
        <div class="act-row flex items-start gap-4 px-5 py-4 tt cursor-pointer" onclick={() => showToast('Opening viewing history…')}>
          <div class="w-8 h-8 rounded-full bg-navy-accent/10 dark:bg-white/[.06] flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="#4A70A0" stroke-width="1.4"/><circle cx="10" cy="10" r="3" stroke="#4A70A0" stroke-width="1.4"/></svg></div>
          <div class="flex-1 min-w-0">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Property viewed</div>
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">Lekki Phase 1 · 5-Bed Detached · ₦4.5M/mo</div>
          </div>
          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0 mt-0.5 whitespace-nowrap">2 days ago</span>
        </div>

      </div>
    </section>

  </div><!-- /body -->
</main>
</div>