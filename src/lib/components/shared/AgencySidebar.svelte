<script lang="ts">
  import { sidebarStore } from "$lib/stores/sidebar.svelte";

  const closeSb = () => {
    sidebarStore.close();

    document.body.style.overflow = '';
  };
</script>

<div id="sbOverlay" 
    class={`fixed inset-0 z-[39] bg-navy-deep/55 backdrop-blur-sm lg:hidden ${sidebarStore.open ? 'open' : ''}`} 
    onclick={closeSb}></div>

<!-- ══════════════════════════════════════════
     SIDEBAR
══════════════════════════════════════════ -->
<aside id="dashSb" 
    class={`fixed top-[68px] left-0 bottom-0 z-40 w-[252px] bg-white dark:bg-[#0D1422] border-r border-chalk-3 dark:border-white/[0.06] flex flex-col overflow-y-auto scrollbar-hide tt lg:translate-x-0 lg:sticky lg:top-[68px] lg:h-100vh flex-shrink-0 ${
    sidebarStore.open
      ? 'translate-x-0'
      : '-translate-x-full'
  }`}>

  <!-- Agent strip -->
  <div class="px-5 pt-6 pb-5 border-b border-chalk-3 dark:border-white/[0.06]">
    <div class="flex items-center gap-3 mb-4">
      <div class="relative flex-shrink-0">
        <div class="w-12 h-12 rounded-full bg-navy-strong flex items-center justify-center text-[15px] font-medium text-white ring-2 ring-blue-bright/25">CO</div>
        <span class="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-sage border-2 border-white dark:border-[#0D1422] flex items-center justify-center"><svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
      </div>
      <div class="min-w-0">
        <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 truncate">Chukwuemeka Okafor</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>Online</div>
      </div>
    </div>
    <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3 tt">
      <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-1">Premier Properties PH</div>
      <div class="flex items-center justify-between mb-1.5">
        <div class="flex gap-0.5"><div class="w-[11px] h-[11px] rounded-full bg-gold"></div><div class="w-[11px] h-[11px] rounded-full bg-gold"></div><div class="w-[11px] h-[11px] rounded-full bg-gold"></div><div class="w-[11px] h-[11px] rounded-full bg-gold"></div><div class="w-[11px] h-[11px] rounded-full overflow-hidden bg-chalk-3 dark:bg-white/10"><div class="h-full bg-gold" style="width:90%"></div></div></div>
        <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100">4.9 · 214 reviews</span>
      </div>
      <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Member since Jan 2023</div>
    </div>
  </div>

  <!-- Nav links -->
  <nav class="px-3 py-4 flex-1">
    <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Dashboard</div>
    <a href="/agency" class="sb-link active flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/></svg>
      Overview
    </a>
    <a href="/agency/tasks" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>Tasks <span class="ml-auto text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[2px] rounded-full flex items-center gap-0.5">
      <span class="w-1.5 h-1.5 rounded-full bg-ember pulse-dot"></span>5 new</span>
    </a>
    <a href="/agency/sub-agents" class="sb-link active flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="4" stroke="currentColor" stroke-width="1.4"></circle><circle cx="15" cy="7" r="3" stroke="currentColor" stroke-width="1.4"></circle><path d="M1 18c0-3 2.7-5 6-5s6 2 6 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path><path d="M15 12c2 0 4 1.3 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"></path></svg>
      Sub agents <span class="ml-auto text-[10px] font-medium bg-blue-bright/15 text-blue-bright px-2 py-[2px] rounded-full flex items-center gap-0.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>12</span>
    </a>
    <a href="/agency/boosts" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
      Boosted <span class="ml-auto text-[10px] font-medium bg-gold/20 text-gold px-2 py-[2px] rounded-full flex items-center gap-0.5"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>4 live</span>
    </a>
    <a href="/agency/viewing" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      Viewings <span class="ml-auto text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[2px] rounded-full flex items-center gap-0.5"><span class="w-1.5 h-1.5 rounded-full bg-ember pulse-dot"></span>6 today</span>
    </a>
    <a href="/agency/scheduling" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      Scheduling
    </a>

    <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Listings</div>
    <a href="/agency/listings" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M3 16V9M7 16V5M11 16V10M15 16V3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      Listings <span class="ml-auto text-[10px] font-medium bg-chalk-3 dark:bg-white/[.1] text-chalk-muted dark:text-[#6A7FA0] px-2 py-[2px] rounded-full">42</span>
    </a>
    <a href="/agency/listings/add" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-4 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" class="svelte-ue6wej"></path></svg>
      Add listing
    </a>

    <!-- <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Analytics</div>
    <a href="/agency/listings" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M2 8h16M6 1v4M14 1v4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      Performance <span class="ml-auto text-[10px] font-medium bg-chalk-3 dark:bg-white/[.1] text-chalk-muted dark:text-[#6A7FA0] px-2 py-[2px] rounded-full">42</span>
    </a>

    <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-4 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M2 10h3l2-7 3 14 2-9 2 4h4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Leads &amp; pipeline
    </a> -->

    <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Account</div>
    <a href="/agency/profile" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M3 18c0-4 3.13-6 7-6s7 2 7 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      Profile
    </a>
    <a href="/agency/profile/settings" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.5" stroke="currentColor" stroke-width="1.4"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.41 1.41M15.37 15.37l1.41 1.41M3.22 16.78l1.41-1.41M15.37 4.63l1.41-1.41" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
      Settings
    </a>
    <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl text-[13px] text-ember no-underline hover:bg-ember-light/40 dark:hover:bg-ember/[.07] tt cursor-pointer">
      <svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M7 3H4a1 1 0 00-1 1v12a1 1 0 001 1h3M13 15l4-5-4-5M17 10H7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Sign out
    </a>
  </nav>
</aside>
