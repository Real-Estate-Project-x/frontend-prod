<script lang="ts">
  import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";
  
  let openArchiveModal = $state(false);
  let openBoostModal   = $state(false);
  let openLightbox = $state(false);
  let showVideo = $state(false);
  let showDesc = $state(false);

  const toggleArchiveModal = () => openArchiveModal = !openArchiveModal;

  const toggleDesc = () => showDesc = !showDesc;

  const toggleBoostModal = () => openBoostModal = !openBoostModal;

  const toggleLightbox = () => openLightbox = !openLightbox;

  const closeLightbox = () => openLightbox = false;

  const toggleVideo = () => showVideo = !showVideo;

  const unarchive = () => {}
</script>

{#if openLightbox}
<!-- ════════════ LIGHTBOX MODAL ════════════ -->
<div id="lightboxModal" class="fixed inset-0 z-[600] bg-navy-deep/90 backdrop-blur-md items-center justify-center p-4 flex" onclick={closeLightbox}>
  <div class="w-full max-w-4xl relative" onclick={(e) => e.stopPropagation()}>
    <button onclick={closeLightbox} class="absolute -top-4 -right-3 z-10 w-9 h-9 rounded-full bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center cursor-pointer shadow-lg">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <!-- Gallery counter + scene -->
    <div class="bg-gradient-to-br from-[#0E2444] via-[#1F3F6A] to-[#4A70A0] rounded-2xl overflow-hidden relative" style="height:520px">
      <div class="absolute bottom-0 left-[100px] w-[200px] h-[310px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[240px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[240px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[200px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[200px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[160px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[160px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[120px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[120px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-0 left-[360px] w-[130px] h-[230px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[185px] left-[374px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[185px] left-[400px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[152px] left-[374px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[152px] left-[400px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[119px] left-[374px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-0 left-[540px] w-[90px] h-[150px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[112px] left-[552px] w-[14px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[112px] left-[574px] w-[14px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <!-- Hero overlay grad -->
      <div class="absolute inset-0 hero-grad pointer-events-none"></div>
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div class="w-2 h-2 rounded-full bg-white"></div>
        <div class="w-2 h-2 rounded-full bg-white/35"></div>
        <div class="w-2 h-2 rounded-full bg-white/35"></div>
      </div>
      <div class="absolute bottom-4 right-5 text-[12px] font-medium text-white bg-navy-deep/60 backdrop-blur-sm px-3 py-1 rounded-full">1 / 12</div>
    </div>
    <!-- Thumbnails strip -->
    <div class="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#0E2444] via-[#1F3F6A] to-[#4A70A0] border-2 border-blue-bright cursor-pointer"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#1F3F6A] via-[#4A70A0] to-[#8DAACC] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#0A2463] via-[#0E2444] to-[#1F3F6A] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#060E1C] via-[#0A2463] to-[#1F3F6A] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#1A2E50] via-[#2E5078] to-[#5E8AB0] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
    </div>
  </div>
</div>
{/if}

{#if openArchiveModal}
<!-- ══════════════════════
     ARCHIVE MODAL
══════════════════════ -->
<div id="archiveModal" class="open modal-wrap fixed inset-0 z-[500] bg-navy-deep/70 items-end sm:items-center justify-center p-0 sm:p-4" onclick={() => (openArchiveModal = false)} style="backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)">
    <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[480px] shadow-[0_24px_80px_rgba(10,36,99,.3)] dark:shadow-[0_24px_80px_rgba(0,0,0,.8)] tt scale-in">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3"></div>
      <div class="px-6 pt-6 pb-5">
        <div class="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 flex items-center justify-center mb-4">
          <svg class="text-amber-600" width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="1.5" y="3.5" width="17" height="13" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M1.5 7.5h17M7.5 10.5h5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
        </div>
        <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">Archive this listing?</h2>
        <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.7]">Archiving will remove <strong class="text-navy-dark dark:text-blue-100">4-Bed Duplex, GRA Phase 2</strong> from the public marketplace. No one will be able to find or enquire about this property. You can restore it at any time.</p>
      </div>
      <div class="px-6 pb-6 flex gap-3">
        <button onclick={() => (openArchiveModal = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button onclick={() => {}} class="flex-1 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep py-3 rounded-full cursor-pointer border-none tt">Archive listing</button>
      </div>
    </div>
</div>
{/if}

{#if openBoostModal}
<!-- ══════════════════════
     BOOST MODAL
══════════════════════ -->
<div id="boostModal" class="open modal-wrap fixed inset-0 z-[500] bg-navy-deep/70 items-end sm:items-center justify-center p-0 sm:p-4" onclick={() => (openBoostModal = false)} style="backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)">
    <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[560px] max-h-[92vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.3)] dark:shadow-[0_24px_80px_rgba(0,0,0,.8)] overflow-hidden tt scale-in">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3 flex-shrink-0"></div>
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-start justify-between">
        <div>
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Promote listing</p>
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:22px">Boost this property</h2>
        </div>
        <button onclick={() => (openBoostModal = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted hover:text-navy-dark dark:hover:text-white tt cursor-pointer bg-transparent"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
      </div>
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 space-y-4">
        <!-- Plans -->
        <div class="text-[11px] sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Choose a plan</div>
        <div class="space-y-3">
          <label class="plan-card block bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 cursor-pointer tt">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2"><span class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">Starter</span><span class="text-[10px] font-medium bg-navy-dark/8 dark:bg-white/[.08] text-navy-dark dark:text-[#8DAACC] px-2 py-[2px] rounded-full">7 days</span></div>
              <span class="font-display font-semibold text-navy-dark dark:text-blue-100">₦25,000</span>
            </div>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Featured on homepage · Est. 200–400 extra views</p>
          </label>
          <label class="plan-card selected block bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 cursor-pointer tt">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2"><span class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">Pro</span><span class="text-[10px] font-medium bg-gold/20 text-[#8A6A10] dark:text-gold px-2 py-[2px] rounded-full">14 days</span><span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2 py-[2px] rounded-full">Popular</span></div>
              <span class="font-display font-semibold text-navy-dark dark:text-blue-100">₦55,000</span>
            </div>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Top placement + email campaigns · Est. 800–1,200 extra views</p>
          </label>
          <label class="plan-card block bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 cursor-pointer tt">
            <div class="flex items-center justify-between mb-1">
              <div class="flex items-center gap-2"><span class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">Elite</span><span class="text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[2px] rounded-full">30 days</span></div>
              <span class="font-display font-semibold text-navy-dark dark:text-blue-100">₦120,000</span>
            </div>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Premium placement + social + push notifications · Est. 2,000–3,500 extra views</p>
          </label>
        </div>
  
        <!-- Reach estimate -->
        <div class="bg-blue-bright/[.06] dark:bg-blue-bright/[.08] border border-blue-bright/20 rounded-xl px-4 py-3 flex items-center gap-3">
          <svg class="flex-shrink-0 text-blue-bright" width="16" height="16" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M10 9v5M10 7h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          <p class="text-[12px] text-navy-accent dark:text-[#8DAACC] leading-[1.6]">Pro plan boosts reach by <strong class="text-navy-dark dark:text-blue-100">+312%</strong> on average for properties in GRA Phase 2. Estimated 1,100 additional views in 14 days.</p>
        </div>
      </div>
      <div class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-chalk-3 dark:border-white/[.08] flex gap-3">
        <button onclick={() => (openBoostModal = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button onclick={() => {}} class="flex-1 text-[13px] font-medium text-white bg-gold hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt flex items-center justify-center gap-2"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>Activate boost</button>
      </div>
    </div>
  </div>
{/if}

<!-- ══ LAYOUT ══ -->
<div class="flex pt-[68px] min-h-screen">
  <SubAgencySidebar />

    <!-- ══ MAIN CONTENT ══ -->
<main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- ── DARK HERO HEADER ── -->
    <div class="hero-sky px-[5vw] lg:px-10 py-8 border-b border-white/[0.07]">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-[12px] text-white/40 mb-5 fu">
        <a href="/agency/listings" class="no-underline hover:text-white/70 tt">My listings</a>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span class="text-white/70">4-Bed Duplex, GRA Phase 2</span>
      </div>
  
      <div class="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
        <div class="fu d1">
          <div class="flex items-center gap-3 mb-3 flex-wrap">
            <span class="text-[10px] font-medium tracking-[.14em] uppercase text-blue-bright bg-blue-bright/15 px-3 py-[5px] rounded-full">Residential</span>
            <span id="statusBadge" class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/25 dark:text-[#7DBF7A] px-3 py-[5px] rounded-full flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>Active listing</span>
            <span class="text-[10px] font-medium bg-gold/25 text-gold px-3 py-[5px] rounded-full flex items-center gap-1.5"><svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>Elite Boost Active</span>
          </div>
          <h1 class="font-display font-light text-white leading-[1.06]" style="font-size:clamp(26px,3.8vw,44px)">4-Bed Duplex, <em class="italic text-chalk-3">GRA Phase 2</em></h1>
          <div class="flex items-center gap-3 mt-2 flex-wrap">
            <span class="font-display font-semibold text-white" style="font-size:clamp(20px,2.5vw,28px)">₦3,500,000<span class="text-white/50 font-light text-[16px]">/yr</span></span>
            <span class="text-white/40">·</span>
            <span class="text-[13px] text-white/60 flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>GRA Phase 2, Port Harcourt</span>
            <span class="text-white/40">·</span>
            <span class="text-[12px] text-white/50">Added 14 Apr 2026</span>
          </div>
        </div>
  
        <!-- Quick Actions -->
        <div class="flex items-center gap-2.5 flex-wrap fu d2">
          <button onclick={toggleBoostModal} class="flex items-center gap-2 text-[13px] font-medium text-white bg-gold hover:opacity-90 px-4 py-[10px] rounded-full border-none cursor-pointer tt">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
            Boost property
          </button>
          <a href="/agency/listings/edit" class="flex items-center gap-2 text-[13px] font-medium text-white bg-white/[.1] hover:bg-white/[.18] border border-white/15 px-4 py-[10px] rounded-full no-underline tt cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 10l1.4-4 7-7 2.6 2.6-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Edit listing
          </a>
          <button onclick={toggleArchiveModal} class="flex items-center gap-2 text-[13px] font-medium text-white/70 hover:text-white bg-white/[.06] hover:bg-white/[.12] border border-white/10 px-4 py-[10px] rounded-full border-none cursor-pointer tt">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1.5" y="3.5" width="11" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M1 3.5h12M5.5 6.5h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            Archive
          </button>
        </div>
      </div>
    </div>

    <div class="px-[5vw] lg:px-10 py-8 max-w-[1180px] space-y-8">

        <!-- ── ARCHIVED BANNER (hidden by default) ── -->
        <div id="archivedBanner" class="archived-banner items-center gap-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 rounded-2xl px-5 py-4">
          <svg class="flex-shrink-0 text-amber-600" width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 4v7M10 13v.5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/><circle cx="10" cy="10" r="8.5" stroke="currentColor" stroke-width="1.4"/></svg>
          <div class="flex-1 min-w-0">
            <span class="text-[13px] font-medium text-amber-800 dark:text-amber-300">This listing has been archived.</span>
            <span class="text-[12px] text-amber-600 dark:text-amber-400 ml-2">It is no longer visible to the public.</span>
          </div>
          <button onclick={unarchive} class="text-[12px] font-medium text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-800/30 hover:bg-amber-200 dark:hover:bg-amber-800/50 px-3 py-1.5 rounded-full border-none cursor-pointer tt">Restore listing</button>
        </div>
    
        <!-- ══ KPI CARDS ══ -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 fu">
          <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
            <div class="flex items-center justify-between mb-3">
              <div class="w-8 h-8 rounded-xl bg-blue-bright/10 flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="#4A90E2" stroke-width="1.4"/><circle cx="10" cy="10" r="2.5" stroke="#4A90E2" stroke-width="1.4"/></svg></div>
              <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2 py-[3px] rounded-full flex items-center gap-1">↑ 12%</span>
            </div>
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:28px">2,847</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Total property views</div>
            <div class="perf-track mt-3"><div class="perf-fill bg-blue-bright grow-w" style="--w:72%"></div></div>
          </div>
    
          <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
            <div class="flex items-center justify-between mb-3">
              <div class="w-8 h-8 rounded-xl bg-ember-light flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#C06035" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg></div>
              <span class="text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-ember pulse-dot"></span>2 today</span>
            </div>
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:28px">18</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Scheduled viewings</div>
            <div class="perf-track mt-3"><div class="perf-fill bg-ember grow-w" style="--w:45%"></div></div>
          </div>
    
          <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
            <div class="flex items-center justify-between mb-3">
              <div class="w-8 h-8 rounded-xl bg-navy-dark/8 dark:bg-white/[.06] flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z" stroke="#0A2463" stroke-width="1.4" stroke-linejoin="round" class="dark:stroke-[#8DAACC]"/></svg></div>
              <span class="text-[10px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] px-2 py-[3px] rounded-full">↑ 4</span>
            </div>
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:28px">64</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Total enquiries</div>
            <div class="perf-track mt-3"><div class="perf-fill bg-navy-dark dark:bg-navy-accent grow-w" style="--w:60%"></div></div>
          </div>
    
          <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
            <div class="flex items-center justify-between mb-3">
              <div class="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2l1.5 4.5H16l-3.7 2.7 1.4 4.3L10 11.1 6.3 13.5l1.4-4.3L4 6.5h4.5z" stroke="#D4AE3A" stroke-width="1.3" stroke-linejoin="round"/></svg></div>
              <span class="text-[10px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] px-2 py-[3px] rounded-full">↑ 9</span>
            </div>
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:28px">143</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Saves / wishlist</div>
            <div class="perf-track mt-3"><div class="perf-fill bg-gold grow-w" style="--w:55%"></div></div>
          </div>
        </div>

        <!-- ══ GALLERY + PROPERTY DETAILS ══ -->
        <div class="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6 fu d1">

            <!-- Left: Gallery -->
            <div class="space-y-3">
            <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Property Images</div>
            <!-- Hero image -->
            <div class="relative rounded-2xl overflow-hidden bg-navy-mid aspect-[16/9] cursor-pointer group" onclick={() => toggleLightbox()}>
                <div class="absolute inset-0 hero-sky flex items-center justify-center">
                <div class="text-center">
                    <svg class="mx-auto mb-3 opacity-30" width="52" height="52" viewBox="0 0 52 52" fill="none"><path d="M6 40 L16 26 L24 34 L34 20 L46 40z" stroke="white" stroke-width="2" stroke-linejoin="round"/><circle cx="14" cy="14" r="5" stroke="white" stroke-width="2"/></svg>
                    <span class="text-white/30 text-[13px]">Main hero photo</span>
                </div>
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-navy-deep/60 to-transparent opacity-0 group-hover:opacity-100 tt flex items-end justify-start p-4">
                <span class="text-white text-[12px] font-medium flex items-center gap-1.5"><svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="white" stroke-width="1.3"/><path d="M4.5 7l2 2 3-3" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>View full photo</span>
                </div>
                <span class="absolute top-3 right-3 text-[11px] font-medium text-white bg-navy-deep/60 backdrop-blur px-3 py-1.5 rounded-full">1 / 8</span>
            </div>
            <!-- Thumbnail row -->
            <div class="grid grid-cols-4 gap-2">
                <div class="thumb active rounded-xl overflow-hidden aspect-square bg-navy-mid cursor-pointer" onclick={() => toggleLightbox()}>
                <div class="w-full h-full hero-sky flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 52 52" fill="none"><path d="M6 40 L16 26 L24 34 L34 20 L46 40z" stroke="white" stroke-width="2.5" stroke-linejoin="round" opacity=".4"/><circle cx="14" cy="14" r="5" stroke="white" stroke-width="2.5" opacity=".4"/></svg></div>
                </div>
                <div class="thumb rounded-xl overflow-hidden aspect-square cursor-pointer" style="background:linear-gradient(135deg,#1F3F6A,#4A70A0)" onclick={() => toggleLightbox()}>
                <div class="w-full h-full flex items-center justify-center opacity-40"><svg width="18" height="18" viewBox="0 0 52 52" fill="none"><path d="M6 40 L16 26 L24 34 L34 20 L46 40z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg></div>
                </div>
                <div class="thumb rounded-xl overflow-hidden aspect-square cursor-pointer" style="background:linear-gradient(135deg,#0A2463,#1F3F6A)" onclick={() => toggleLightbox()}>
                <div class="w-full h-full flex items-center justify-center opacity-40"><svg width="18" height="18" viewBox="0 0 52 52" fill="none"><circle cx="14" cy="14" r="5" stroke="white" stroke-width="2.5"/></svg></div>
                </div>
                <div class="thumb rounded-xl overflow-hidden aspect-square cursor-pointer relative" style="background:linear-gradient(135deg,#0E2444,#1a3255)" onclick={() => toggleLightbox()}>
                <div class="w-full h-full flex items-center justify-center opacity-40"><svg width="18" height="18" viewBox="0 0 52 52" fill="none"><path d="M10 42V20L26 8L42 20V42H30V30H22V42z" stroke="white" stroke-width="2.5" stroke-linejoin="round"/></svg></div>
                <div class="absolute inset-0 bg-navy-deep/50 flex items-center justify-center"><span class="text-white text-[13px] font-semibold">+4</span></div>
                </div>
            </div>
            </div>
    
            <!-- Right: Quick Info panel -->
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none space-y-4">
            <div class="sec-label text-chalk-muted dark:text-[#6A7FA0]">Property Details</div>
            <div class="grid grid-cols-2 gap-2.5">
                <div class="info-chip tt">
                <svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 18V7l7-5 7 5v11H13V13H7v5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
                <div><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Bedrooms</div><div class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">4</div></div>
                </div>
                <div class="info-chip tt">
                <svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 10h14M17 10v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M5 10V5a1 1 0 011-1h2.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                <div><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Toilets</div><div class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">5</div></div>
                </div>
                <div class="info-chip tt">
                <svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="8" width="16" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M6 8V5a4 4 0 018 0v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                <div><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Kitchens</div><div class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">2</div></div>
                </div>
                <div class="info-chip tt">
                <svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 2v16M2 7h5M2 13h5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                <div><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Sq. footage</div><div class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">420 m²</div></div>
                </div>
                <div class="info-chip tt col-span-2">
                <svg class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M2 5l8-3 8 3v7a8 8 0 01-8 5 8 8 0 01-8-5V5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg>
                <div><div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Broadband</div><div class="text-[13px] font-semibold text-navy-dark dark:text-blue-100">100 Mbps fibre</div></div>
                </div>
            </div>
    
            <div class="border-t border-chalk-3 dark:border-white/[.06] pt-4">
                <div class="text-[10px] sec-label text-chalk-muted dark:text-[#6A7FA0] mb-2.5">Additional costs</div>
                <div class="space-y-2">
                <div class="flex justify-between text-[12px]"><span class="text-chalk-muted dark:text-[#6A7FA0]">Service charge</span><span class="font-medium text-navy-dark dark:text-blue-100">₦180,000/yr</span></div>
                <div class="flex justify-between text-[12px]"><span class="text-chalk-muted dark:text-[#6A7FA0]">Agency fee</span><span class="font-medium text-navy-dark dark:text-blue-100">10% (one-off)</span></div>
                <div class="flex justify-between text-[12px]"><span class="text-chalk-muted dark:text-[#6A7FA0]">Caution deposit</span><span class="font-medium text-navy-dark dark:text-blue-100">₦350,000</span></div>
                </div>
            </div>
    
            <div class="border-t border-chalk-3 dark:border-white/[.06] pt-4 flex gap-2.5">
                <button onclick={toggleBoostModal} class="flex-1 text-[12px] font-medium text-white bg-gold hover:opacity-90 py-2.5 rounded-full border-none cursor-pointer tt flex items-center justify-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.8 3.5 3.9.55-2.85 2.75.68 3.9L7 9.85l-3.53 1.85.68-3.9L1.3 5.05l3.9-.55z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
                Boost
                </button>
                <a href="edit_property.html" class="flex-1 text-[12px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 py-2.5 rounded-full no-underline tt cursor-pointer flex items-center justify-center gap-1.5">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 10l1.4-4 7-7 2.6 2.6-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Edit
                </a>
            </div>
            </div>
        </div>

        <!-- ══ VIDEO SECTION ══ -->
        <div class="fu d2">
            <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Property Video</div>
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
            <div class="video-wrap m-0 rounded-none" style="border-radius:0">
                <div class="absolute inset-0 hero-sky flex flex-col items-center justify-center gap-3">
                <button aria-label="Play video" onclick={toggleVideo} class="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center cursor-pointer hover:bg-white/25 tt">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"/></svg>
                </button>
                {#if showVideo}
                <iframe title="Property video" src="https://www.youtube.com/embed/2O7K-8G2nwU?autoplay=1" 
                    allow="autoplay;fullscreen" 
                    allowfullscreen 
                    class="absolute inset-0 w-full h-full">
                </iframe>
                {/if}
                <span class="text-white/60 text-[13px]">Property walkthrough · 4:22</span>
                </div>
            </div>
            </div>
        </div>

        <!-- ══ DESCRIPTION + AMENITIES ══ -->
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 fu d3">
            <div class="space-y-5">
            <!-- Description -->
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-6 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
                <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Description</div>
                <p class="text-[13px] text-navy-dark dark:text-[#B8C8E0] leading-[1.8]" id="descText">This elegant 4-bedroom duplex sits within the prestigious GRA Phase 2 estate, Port Harcourt. Featuring a fully fitted kitchen, en-suite bedrooms, a private garden, and covered parking for 3 vehicles. The property enjoys 24-hour power supply, CCTV security, and direct access to the estate's recreational facilities. Modern finishes throughout with high-quality Italian tiles, a home theatre setup in the lounge, and a butler's pantry.</p>
                {#if !showDesc}
                <button onclick={toggleDesc} 
                    id="descToggle" 
                    class="text-[12px] text-blue-link dark:text-blue-bright mt-2 bg-transparent border-none cursor-pointer font-sans p-0 tt hover:opacity-75">
                    Show more
                </button>
                {/if}

                {#if showDesc}
                    <p class="text-[13px] text-navy-dark dark:text-[#B8C8E0] leading-[1.8] mt-3">The ground floor comprises a spacious reception hall, formal dining room, family lounge, one guest bedroom with en-suite, modern kitchen with island, laundry room, and a powder room. The first floor hosts three large bedrooms all with en-suites, a study/home office, and a private balcony with estate views.</p>
                    <button onclick={toggleDesc} 
                    id="descMoreToggle" 
                    class="text-[12px] text-blue-link dark:text-blue-bright mt-2 bg-transparent border-none cursor-pointer font-sans p-0 tt hover:opacity-75">
                    Show less
                </button>
                {/if}
            </div>
    
            <!-- Amenities -->
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-6 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none">
                <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Amenities</div>
                <div class="flex flex-wrap gap-2">
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Swimming pool</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Generator backup</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">24hr security</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">CCTV</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Fibre broadband</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Covered parking (×3)</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Private garden</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Home theatre</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Air conditioning</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Estate gym</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Borehole water</span>
                <span class="amenity text-[11px] font-medium px-3 py-[6px] rounded-full tt">Solar inverter</span>
                </div>
            </div>
            </div>
    
            <!-- Right: Performance insight -->
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.06)] dark:shadow-none h-fit">
            <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-4">Listing Performance</div>
            <div class="space-y-3.5">
                <div>
                <div class="flex justify-between text-[12px] mb-1.5"><span class="text-chalk-muted dark:text-[#6A7FA0]">View rate</span><span class="font-medium text-navy-dark dark:text-blue-100">72%</span></div>
                <div class="perf-track"><div class="perf-fill bg-blue-bright grow-w" style="--w:72%"></div></div>
                </div>
                <div>
                <div class="flex justify-between text-[12px] mb-1.5"><span class="text-chalk-muted dark:text-[#6A7FA0]">Enquiry conversion</span><span class="font-medium text-navy-dark dark:text-blue-100">34%</span></div>
                <div class="perf-track"><div class="perf-fill bg-sage grow-w" style="--w:34%"></div></div>
                </div>
                <div>
                <div class="flex justify-between text-[12px] mb-1.5"><span class="text-chalk-muted dark:text-[#6A7FA0]">Save rate</span><span class="font-medium text-navy-dark dark:text-blue-100">55%</span></div>
                <div class="perf-track"><div class="perf-fill bg-gold grow-w" style="--w:55%"></div></div>
                </div>
                <div>
                <div class="flex justify-between text-[12px] mb-1.5"><span class="text-chalk-muted dark:text-[#6A7FA0]">Boost impact</span><span class="font-medium text-gold">+312% views</span></div>
                <div class="perf-track"><div class="perf-fill bg-gold grow-w" style="--w:88%"></div></div>
                </div>
            </div>
    
            <div class="mt-4 pt-4 border-t border-chalk-3 dark:border-white/[.06] bg-gold/[.06] dark:bg-gold/[.08] rounded-xl p-3">
                <div class="text-[11px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Elite Boost is running</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Expires 14 May 2026 · 7 days remaining</div>
            </div>
            </div>
        </div>

        <!-- ══ ARCHITECTURAL PLANS ══ -->
    <div class="fu d4">
        <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Architectural Plans</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-blue-bright/10 flex items-center justify-center flex-shrink-0"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#4A90E2" stroke-width="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/></svg></div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Ground floor plan</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF · 2.4 MB</div>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="flex-1 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 py-2 rounded-xl cursor-pointer tt border-none">View</button>
              <button class="flex-1 text-[11px] font-medium text-blue-link dark:text-blue-bright bg-blue-bright/10 hover:bg-blue-bright/15 py-2 rounded-xl cursor-pointer tt border-none">Download</button>
            </div>
          </div>
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#4A7848" stroke-width="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#4A7848" stroke-width="1.3" stroke-linecap="round"/></svg></div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">First floor plan</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF · 1.9 MB</div>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="flex-1 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 py-2 rounded-xl cursor-pointer tt border-none">View</button>
              <button class="flex-1 text-[11px] font-medium text-blue-link dark:text-blue-bright bg-blue-bright/10 hover:bg-blue-bright/15 py-2 rounded-xl cursor-pointer tt border-none">Download</button>
            </div>
          </div>
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 rounded-xl bg-ember-light flex items-center justify-center flex-shrink-0"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#C06035" stroke-width="1.4"/><path d="M7 7h6M7 10h6M7 13h4" stroke="#C06035" stroke-width="1.3" stroke-linecap="round"/></svg></div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Roof plan</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">DWG · 3.1 MB</div>
              </div>
            </div>
            <div class="flex gap-2">
              <button class="flex-1 text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 py-2 rounded-xl cursor-pointer tt border-none">View</button>
              <button class="flex-1 text-[11px] font-medium text-blue-link dark:text-blue-bright bg-blue-bright/10 hover:bg-blue-bright/15 py-2 rounded-xl cursor-pointer tt border-none">Download</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- ══ OWNERSHIP DOCUMENTS ══ -->
      <div class="fu d5">
        <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-3">Ownership Documents</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-navy-dark/8 dark:bg-white/[.06] flex items-center justify-center flex-shrink-0 tt">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M2 5l8-3 8 3v7a8 8 0 01-8 5 8 8 0 01-8-5V5z" stroke="#0A2463" stroke-width="1.4" stroke-linejoin="round" class="dark:stroke-[#8DAACC]"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Certificate of Occupancy</div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF · Verified · 1.2 MB</div>
              <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2 py-[2px] rounded-full mt-1 inline-block">✓ Verified</span>
            </div>
            <button class="text-[12px] font-medium text-blue-link dark:text-blue-bright hover:opacity-75 bg-transparent border-none cursor-pointer font-sans flex-shrink-0 tt">Download</button>
          </div>
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-navy-dark/8 dark:bg-white/[.06] flex items-center justify-center flex-shrink-0 tt">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#0A2463" stroke-width="1.4" class="dark:stroke-[#8DAACC]"/><path d="M6 8h8M6 11h8M6 14h5" stroke="#0A2463" stroke-width="1.3" stroke-linecap="round" class="dark:stroke-[#8DAACC]"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Deed of Assignment</div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF · Verified · 0.9 MB</div>
              <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2 py-[2px] rounded-full mt-1 inline-block">✓ Verified</span>
            </div>
            <button class="text-[12px] font-medium text-blue-link dark:text-blue-bright hover:opacity-75 bg-transparent border-none cursor-pointer font-sans flex-shrink-0 tt">Download</button>
          </div>
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#D4AE3A" stroke-width="1.4"/><path d="M6 8h8M6 11h8M6 14h5" stroke="#D4AE3A" stroke-width="1.3" stroke-linecap="round"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Survey Plan</div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF · Pending review · 2.1 MB</div>
              <span class="text-[10px] font-medium bg-gold/15 text-[#8A6A10] dark:text-gold px-2 py-[2px] rounded-full mt-1 inline-block">⏳ Pending</span>
            </div>
            <button class="text-[12px] font-medium text-blue-link dark:text-blue-bright hover:opacity-75 bg-transparent border-none cursor-pointer font-sans flex-shrink-0 tt">Download</button>
          </div>
          <div class="doc-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.05)] dark:shadow-none flex items-center gap-4">
            <div class="w-10 h-10 rounded-xl bg-navy-dark/8 dark:bg-white/[.06] flex items-center justify-center flex-shrink-0 tt">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="3" y="2" width="14" height="16" rx="2" stroke="#0A2463" stroke-width="1.4" class="dark:stroke-[#8DAACC]"/><path d="M6 8h8M6 11h8M6 14h5" stroke="#0A2463" stroke-width="1.3" stroke-linecap="round" class="dark:stroke-[#8DAACC]"/></svg>
            </div>
            <div class="flex-1 min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Building Approval</div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF · Verified · 1.7 MB</div>
              <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2 py-[2px] rounded-full mt-1 inline-block">✓ Verified</span>
            </div>
            <button class="text-[12px] font-medium text-blue-link dark:text-blue-bright hover:opacity-75 bg-transparent border-none cursor-pointer font-sans flex-shrink-0 tt">Download</button>
          </div>
        </div>
      </div>

      <!-- ══ TODAY'S VIEWINGS ══ -->
        <div class="fu d6">
            <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div>
                <div class="sec-label text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Today's Viewings</div>
                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Wednesday, 7 May 2026</p>
            </div>
            <a href="/agency/viewing" class="text-[12px] font-medium text-blue-link dark:text-blue-bright no-underline hover:opacity-75 tt">View all viewings →</a>
            </div>
    
            <div class="space-y-3">
            <!-- Viewing card 1 — Virtual -->
            <div class="vc bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none">
                <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-navy-strong flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0">CI</div>
                    <div class="min-w-0">
                    <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Chidi Ibe</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">chidi.ibe@email.com · 08011234567</div>
                    </div>
                </div>
                <div class="flex items-center gap-2 flex-wrap flex-shrink-0">
                    <span class="text-[10px] font-medium bg-blue-bright/10 text-blue-link dark:text-blue-bright px-2.5 py-[5px] rounded-full flex items-center gap-1.5"><svg width="9" height="9" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="9" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 6l3-2v6l-3-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>Virtual</span>
                    <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2.5 py-[5px] rounded-full">Confirmed</span>
                </div>
                </div>
                <div class="flex items-center justify-between mt-4 flex-wrap gap-3">
                <div class="flex items-center gap-4 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                    <span class="flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>10:00 AM – 11:00 AM</span>
                </div>
                <div class="flex gap-2">
                    <button class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 px-3.5 py-2 rounded-full cursor-pointer tt border-none">View details</button>
                    <button class="text-[12px] font-medium text-white bg-blue-bright hover:bg-blue-link px-3.5 py-2 rounded-full cursor-pointer tt border-none flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="9" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 6l3-2v6l-3-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Start virtual
                    </button>
                </div>
                </div>
            </div>
    
            <!-- Viewing card 2 — In-person -->
            <div class="vc bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none">
                <div class="flex flex-wrap items-start justify-between gap-3">
                <div class="flex items-center gap-3 min-w-0">
                    <div class="w-10 h-10 rounded-full bg-ember flex items-center justify-center text-[13px] font-semibold text-white flex-shrink-0">NK</div>
                    <div class="min-w-0">
                    <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Ngozi Kalu</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">ngozi.kalu@email.com · 08091234567</div>
                    </div>
                </div>
                <div class="flex items-center gap-2 flex-wrap flex-shrink-0">
                    <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2.5 py-[5px] rounded-full flex items-center gap-1.5"><svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>In-Person</span>
                    <span class="text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2.5 py-[5px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-ember pulse-dot"></span>Pending</span>
                </div>
                </div>
                <div class="flex items-center justify-between mt-4 flex-wrap gap-3">
                <div class="flex items-center gap-4 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                    <span class="flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>2:00 PM – 3:30 PM</span>
                </div>
                <div class="flex gap-2">
                    <button class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 px-3.5 py-2 rounded-full cursor-pointer tt border-none">View details</button>
                    <button class="text-[12px] font-medium text-white bg-navy-dark dark:bg-navy-accent hover:opacity-90 px-3.5 py-2 rounded-full cursor-pointer tt border-none flex items-center gap-1.5">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M5 10l2 2 5-6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Confirm
                    </button>
                </div>
                </div>
            </div>
    
            </div>
        </div>

        <!-- bottom spacer -->
        <div class="h-8"></div>
  
    </div>

</div>

<style>
    .tt{transition:background-color .3s,color .3s,border-color .3s,box-shadow .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .55s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.30s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.96) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .28s cubic-bezier(.22,.68,0,1.2) both}
    @keyframes growW{from{width:0}to{width:var(--w)}}
    .grow-w{animation:growW 1s cubic-bezier(.34,1.2,.64,1) .5s both}
    
    /* stat cards */
    .stat-card{transition:transform .22s,box-shadow .22s}
    .stat-card:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(10,36,99,.11)}
    .dark .stat-card:hover{box-shadow:0 12px 36px rgba(0,0,0,.38)}
    
    /* gallery */
    .thumb{cursor:pointer;transition:opacity .2s,ring-color .2s}
    .thumb:hover{opacity:.85}
    .thumb.active{box-shadow:0 0 0 2px #4A90E2}
    
    /* modal */
    .modal-wrap{display:none;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    .modal-wrap.open{display:flex}
    
    /* boost plan radio */
    .plan-card{cursor:pointer;border:2px solid transparent;transition:border-color .2s,background .2s}
    .plan-card:hover{border-color:rgba(74,144,226,.35)}
    .plan-card.selected{border-color:#4A90E2;background:rgba(74,144,226,.06)}
    .dark .plan-card.selected{background:rgba(74,144,226,.1)}
    
    /* viewing cards */
    .vc:hover{box-shadow:0 6px 28px rgba(10,36,99,.09)}
    .dark .vc:hover{box-shadow:0 6px 28px rgba(0,0,0,.35)}
    .vc{transition:box-shadow .22s}
    
    /* archive confirm badge */
    .archived-banner{display:none}
    .archived-banner.show{display:flex}
    
    /* sky gradient hero */
    .hero-sky{background:linear-gradient(160deg,#060E1C 0%,#0A2463 40%,#1F3F6A 75%,#4A70A0 100%)}
    
    /* section dividers */
    .sec-label{letter-spacing:.16em;font-size:10px;font-weight:500;text-transform:uppercase}
    
    /* info chip */
    .info-chip{display:flex;align-items:center;gap:8px;padding:12px 14px;border-radius:14px;border:1px solid}
    .info-chip{border-color:#EDE7DC;background:#FEFCF8}
    .dark .info-chip,
    :global([data-theme="dark"]) .info-chip{border-color:rgba(255,255,255,.07);background:#0D1422}
    
    /* performance bar */
    .perf-track{background:#EDE7DC;border-radius:4px;overflow:hidden;height:5px}
    .dark .perf-track,
    :global([data-theme="dark"]) .perf-track{background:rgba(255,255,255,.08)}
    .perf-fill{height:100%;border-radius:4px}
    
    /* doc file card */
    .doc-card:hover{border-color:rgba(74,144,226,.35)!important}
    .doc-card{transition:border-color .2s,box-shadow .2s}
    .doc-card:hover{box-shadow:0 4px 18px rgba(10,36,99,.08)}
    
    /* video embed wrapper */
    .video-wrap{position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:16px}
    .video-wrap iframe,.video-wrap video{position:absolute;top:0;left:0;width:100%;height:100%}
    
    /* amenity pill */
    .amenity{background:#F7F3EC;color:#1F3F6A;border:1px solid #EDE7DC}
    .dark .amenity,
    :global([data-theme="dark"]) .amenity{background:rgba(31,63,106,.25);color:#8DAACC;border-color:rgba(255,255,255,.07)}
    
    @media(max-width:640px){.hide-xs{display:none!important}}
</style>