<script lang="ts">
let closeSidebar = $state(false);

const closeSb = () => closeSidebar = false;

const handleSave = (data: boolean) => {
	console.log('Received from child:', data);
}
</script>

<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <div id="sbOverlay" class={`${closeSidebar ? 'open' : ''}  fixed inset-0 z-[39] bg-navy-deep/55 backdrop-blur-sm lg:hidden`} onclick={closeSb}></div>
    <!-- ════ SIDEBAR  —  exact replica from reference files, Overview active ════ -->
<aside id="dashSb" class={`${closeSidebar ? '-translate-x-full' : ''} fixed top-[68px] left-0 bottom-0 z-40 w-[252px] bg-white dark:bg-[#0D1422] border-r border-chalk-3 dark:border-white/[0.06] flex flex-col overflow-y-auto scrollbar-hide tt -translate-x-full lg:translate-x-0 lg:sticky lg:top-[68px] lg:h-100vh flex-shrink-0`}>
    <div class="px-5 pt-6 pb-5 border-b border-chalk-3 dark:border-white/[0.06]">
      <div class="flex items-center gap-3 mb-4">
        <div class="w-12 h-12 rounded-full flex items-center justify-center text-[15px] font-medium text-white ring-2 ring-blue-bright/25 flex-shrink-0" style="background:linear-gradient(135deg,#1F3F6A,#4A90E2)">FA</div>
        <div class="min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 truncate">Fatima Abubakar</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Buyer account</div></div>
      </div>
      <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3 tt">
        <div class="flex items-center gap-3">
          <div class="relative w-[44px] h-[44px] flex-shrink-0">
            <svg width="44" height="44" viewBox="0 0 90 90" style="transform:rotate(-90deg)"><circle cx="45" cy="45" r="40" fill="none" stroke="#EDE7DC" stroke-width="8" class="dark:stroke-white/[.08]"/><circle cx="45" cy="45" r="40" fill="none" stroke="#4A90E2" stroke-width="8" stroke-dasharray="251" stroke-dashoffset="251" stroke-linecap="round" id="profileRing" class="ring-anim"/></svg>
            <span class="absolute inset-0 flex items-center justify-center text-[10px] font-semibold text-navy-dark dark:text-blue-100">75%</span>
          </div>
          <div class="min-w-0"><div class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Profile complete</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 leading-[1.45]">Add phone to unlock all features</div><button class="text-[11px] text-blue-link mt-1.5 bg-transparent border-none cursor-pointer font-sans p-0 tt hover:text-navy-dark dark:hover:text-blue-bright">Complete →</button></div>
        </div>
      </div>
    </div>
    <nav class="px-3 py-4 flex-1">
      <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Main</div>
      <a href="#" class="sb-link active flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/><rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" stroke-width="1.4"/></svg>Overview</a>
      <a href="dashboard_saved.html" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10" cy="7" r="2" stroke="currentColor" stroke-width="1.4"/></svg>Saved properties<span class="ml-auto text-[10px] font-medium bg-chalk-3 dark:bg-white/[.1] text-chalk-muted dark:text-[#6A7FA0] px-2 py-[2px] rounded-full">7</span></a>
      <a href="dashboard_viewings.html" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Viewings<span class="ml-auto text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[2px] rounded-full">2</span></a>
      <a href="dashboard_viewing_history.html" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M10 6v4l3 2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Viewing history</a>
      <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-4 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>My reviews</a>
      <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Searches</div>
      <a href="dashboard_saved_searches.html" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="5.5" stroke="currentColor" stroke-width="1.4"/><path d="M13 13l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Saved searches<span class="ml-auto text-[10px] font-medium bg-blue-bright/20 text-blue-bright px-2 py-[2px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>3</span></a>
      <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-4 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M3 4h14M3 8h10M3 12h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Search alerts<span class="ml-auto w-2 h-2 rounded-full bg-blue-bright pulse-dot"></span></a>
      <div class="text-[9px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] px-3 mb-2">Account</div>
      <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M3 18c0-4 3.13-6 7-6s7 2 7 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Profile</a>
      <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mb-0.5 text-[13px] text-chalk-muted dark:text-[#6A7FA0] no-underline tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.5" stroke="currentColor" stroke-width="1.4"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.41 1.41M15.37 15.37l1.41 1.41M3.22 16.78l1.41-1.41M15.37 4.63l1.41-1.41" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>Settings</a>
      <a href="#" class="sb-link flex items-center gap-3 px-3 py-[9px] rounded-xl mt-1 text-[13px] text-ember no-underline hover:bg-ember-light/40 dark:hover:bg-ember/[.07] tt cursor-pointer"><svg class="w-[15px] h-[15px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M7 3H4a1 1 0 00-1 1v12a1 1 0 001 1h3M13 15l4-5-4-5M17 10H7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Sign out</a>
    </nav>
  </aside>
    </div>