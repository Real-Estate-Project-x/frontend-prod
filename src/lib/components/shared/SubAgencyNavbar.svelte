<script lang="ts">
  import { themeStore } from "$lib/stores/theme.svelte";
  import { subAgentSidebarStore as sidebarStore } from "$lib/stores/sAgentSidebar.svelte";

  let showNotifications = $state(false);

  const toggleBell = () => {
  showNotifications = !showNotifications;
  }

  // react to sidebar state changes
  $effect(() => {
    document.body.style.overflow = sidebarStore.open
      ? 'hidden'
      : '';
  });
</script>

<!-- ════════════════════════════════════════════════
     NAV  —  exact replica from reference files
════════════════════════════════════════════════ -->
<nav class="fixed top-0 left-0 right-0 z-50 bg-navy-dark dark:bg-[#080F1C] border-b border-white/[0.07] h-[68px] flex items-center justify-between px-[5vw] tt">
    <a href="/agency" class="flex items-center gap-3 no-underline flex-shrink-0">
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none"><rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/><path d="M8 28 Q8 18 18 14 Q28 18 28 28" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity=".25" fill="none"/><path d="M6 28 Q6 14 18 10 Q30 14 30 28" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity=".55" fill="none"/><path d="M4 29 Q4 11 18 6 Q32 11 32 29" stroke="white" stroke-width="2.5" stroke-linecap="round" fill="none"/><circle cx="18" cy="28" r="3.5" fill="#4A90E2"/></svg>
      <span class="text-white text-[18px] font-medium tracking-[.18em] hidden md:block">BLUPODD</span>
    </a>
    <div class="flex items-center gap-3 relative">
      <div class="relative">
        <button aria-label="Toggle notifications" onclick={toggleBell} class="w-9 h-9 rounded-full bg-white/[0.08] border border-white/15 flex items-center justify-center cursor-pointer hover:bg-white/15 tt flex-shrink-0">
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="white" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
          <span class="absolute top-[7px] right-[7px] w-2 h-2 rounded-full bg-ember border-2 border-navy-dark"></span>
        </button>
        {#if showNotifications}
        <div id="bellPanel" class="absolute top-12 right-0 w-[300px] bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[0.08] rounded-2xl shadow-[0_8px_40px_rgba(10,36,99,.18)] dark:shadow-[0_8px_40px_rgba(0,0,0,.5)] z-[60] overflow-hidden tt">
          <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[0.08] flex items-center justify-between"><span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Notifications</span><button onclick={toggleBell} class="text-[12px] text-blue-link bg-transparent border-none cursor-pointer font-sans">Close</button></div>
          <div class="flex gap-3 px-5 py-3.5 hover:bg-chalk-2 dark:hover:bg-white/[0.04] tt cursor-pointer"><div class="w-8 h-8 rounded-full bg-blue-bright/10 flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4A90E2" stroke-width="1.4"/><path d="M10 9v5M10 7h.01" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg></div><div class="flex-1 min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">5 new matches found</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">For "3-bed flat · Enugu · Gym"</div><div class="text-[11px] text-blue-bright mt-1">14 min ago</div></div></div>
          <div class="flex gap-3 px-5 py-3.5 hover:bg-chalk-2 dark:hover:bg-white/[0.04] tt cursor-pointer"><div class="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#D4AE3A" stroke-width="1.4"/><path d="M13 13l4 4" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round"/></svg></div><div class="flex-1 min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Price drop on a match</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">GRA Phase 2 · ₦850k → ₦780k/mo</div><div class="text-[11px] text-blue-bright mt-1">1 hour ago</div></div></div>
          <div class="flex gap-3 px-5 py-3.5 hover:bg-chalk-2 dark:hover:bg-white/[0.04] tt cursor-pointer"><div class="w-8 h-8 rounded-full bg-ember-light flex items-center justify-center flex-shrink-0 mt-0.5"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#C06035" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg></div><div class="flex-1 min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Viewing confirmed ✓</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Mon 14 Apr · 10:00 AM confirmed</div><div class="text-[11px] text-blue-bright mt-1">2 hours ago</div></div></div>
          <div class="px-5 py-3 border-t border-chalk-3 dark:border-white/[0.08] text-center"><a href="#" class="text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">View all notifications →</a></div>
        </div>
        {/if}
      </div>
      <!-- Theme icon toggle: sun = light, moon = dark -->
      <!-- Theme icon toggle: sun = light, moon = dark -->
      <button
      class="theme-toggle-btn"
      id="themeToggleBtn"
      aria-label="Toggle colour scheme"
      onclick={themeStore.toggle}
    >
      <!-- Sun — shown in light mode -->
      <span class="icon-sun" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.80)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1"  x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1"  y1="12" x2="3"  y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
        </svg>
      </span>
      <!-- Moon — shown in dark mode -->
      <span class="icon-moon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.80)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </button>
      <div class="flex items-center gap-2.5 cursor-pointer">
        <div class="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-medium text-white ring-2 ring-white/20 flex-shrink-0" style="background:linear-gradient(135deg,#1F3F6A,#4A90E2)">BO</div>
        <div class="hidden sm:block"><div class="text-[13px] font-medium text-white leading-none">Chukwuemeka O.</div><div class="text-[10px] text-white/50 mt-0.5">Agency account</div></div>
      </div>
       <!-- Hamburger — hidden on desktop (>1024px), visible on mobile -->
    <button
      type="button"
      onclick={sidebarStore.toggle}
      class="md:hidden hamburger-btn flex items-center justify-center w-8 h-8 text-white/70 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
      id="hamburgerBtn"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobileDrawer"
    >
      <!-- Hamburger icon -->
      <svg id="iconOpen" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="3" y1="5"  x2="17" y2="5"/>
        <line x1="3" y1="10" x2="17" y2="10"/>
        <line x1="3" y1="15" x2="17" y2="15"/>
      </svg>
      <!-- Close icon (hidden by default) -->
      <svg id="iconClose" class="hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="5" y1="5"  x2="15" y2="15"/>
        <line x1="15" y1="5" x2="5"  y2="15"/>
      </svg>
    </button>
  </div>
</nav>