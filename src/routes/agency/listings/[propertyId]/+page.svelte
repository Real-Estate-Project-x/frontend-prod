<script lang="ts">
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";
  let openArchiveModal = $state(false);
  let openBoostModal   = $state(false);

  const toggleArchiveModal = () => openArchiveModal = !openArchiveModal;

  const toggleBoostModal = () => openBoostModal = !openBoostModal;
</script>

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
    <AgencySidebar />

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
    
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
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
    .dark .info-chip{border-color:rgba(255,255,255,.07);background:#0D1422}
    
    /* performance bar */
    .perf-track{background:#EDE7DC;border-radius:4px;overflow:hidden;height:5px}
    .dark .perf-track{background:rgba(255,255,255,.08)}
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
    .dark .amenity{background:rgba(31,63,106,.25);color:#8DAACC;border-color:rgba(255,255,255,.07)}
    
    @media(max-width:640px){.hide-xs{display:none!important}}
</style>