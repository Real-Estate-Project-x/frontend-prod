<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  type ViewingType = 'all' | 'in_person' | 'virtual';

  let selectedViewingType = $state<ViewingType>('all');

  const setViewingType = (type: ViewingType) => selectedViewingType = type;

</script>

<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />
   
   
    <!-- ════════════════════════════════════════════════
        MAIN CONTENT
   ════════════════════════════════════════════════ -->
   <!-- ════ MAIN ════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- Page header -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[920px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <a href="dashboard.html" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Dashboard
            </a>
            <span class="text-white/25 text-[12px]">/</span>
            <span class="text-[12px] text-white/60">Viewings</span>
          </div>
          <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">My viewings</h1>
          <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2">
            <span class="w-[6px] h-[6px] rounded-full bg-ember pulse-dot"></span>
            <strong class="text-white font-medium">2 upcoming</strong> &nbsp;·&nbsp; 1 today &nbsp;·&nbsp; 6 total
          </p>
        </div>
        <a href="property_detail.html" class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full no-underline tt self-start sm:self-end">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1v14M1 8h14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          Book a viewing
        </a>
      </div>
    </div>

        <!-- Body -->
        <div class="px-6 lg:px-10 py-7 max-w-[920px] mx-auto">

            <!-- ── STATS STRIP ── -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 fu d1">
                <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl px-5 py-4 text-center tt">
                    <div class="font-display text-[30px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">2</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Upcoming</div>
                </div>
                <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl px-5 py-4 text-center tt">
                    <div class="font-display text-[30px] font-semibold text-sage dark:text-[#7DBF7A] leading-none mb-1">3</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Completed</div>
                </div>
                <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl px-5 py-4 text-center tt">
                    <div class="font-display text-[30px] font-semibold text-ember leading-none mb-1">1</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Cancelled</div>
                </div>
                <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl px-5 py-4 text-center tt">
                    <div class="font-display text-[30px] font-semibold text-blue-bright leading-none mb-1">6</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Total</div>
                </div>
            </div>

            <!-- ── FILTER TABS + SEARCH ── -->
            <div class="flex flex-col sm:flex-row gap-3 mb-7 fu d2">
                <!-- Type tabs -->
                <div class="flex gap-1.5 overflow-x-auto scrollbar-hide">
                    <button onclick={() => setViewingType('all')} class={`vtab ${selectedViewingType === 'all' ? 'active' : ''} flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt`}>All <span class="text-[10px] ml-0.5 opacity-70">6</span></button>
                    <button onclick={() => setViewingType('in_person')} class={`vtab ${selectedViewingType === 'in_person' ? 'active' : ''} flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] bg-transparent cursor-pointer tt hover:border-navy-dark hover:text-navy-dark dark:hover:text-white`}>In-person</button>
                    <button onclick={() => setViewingType('virtual')} class={`vtab ${selectedViewingType === 'virtual' ? 'active' : ''} flex-shrink-0 text-[12px] font-medium px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] bg-transparent cursor-pointer tt hover:border-navy-dark hover:text-navy-dark dark:hover:text-white`}>Virtual</button>
                </div>
                <!-- Search -->
                <div class="flex-1 flex items-center gap-2.5 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-2.5 focus-within:border-blue-link tt sm:max-w-xs ml-auto">
                <svg width="14" height="14" class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                <input type="text" placeholder="Search viewings…" oninput={() => {}} class="flex-1 bg-transparent border-none outline-none text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                </div>
            </div>

        </div>

    </main>

</div>

<style>
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .52s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.08s}.d3{animation-delay:.13s}
    .d4{animation-delay:.18s}.d5{animation-delay:.23s}.d6{animation-delay:.28s}
    .d7{animation-delay:.33s}.d8{animation-delay:.38s}.d9{animation-delay:.43s}
    @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
    .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
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
    
    /* ── viewing card ── */
    .vcard{transition:transform .22s,box-shadow .22s,border-color .2s}
    .vcard:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(10,36,99,.1)}
    .dark .vcard:hover,
    :global([data-theme="dark"]) .vcard:hover {box-shadow:0 10px 32px rgba(0,0,0,.4)}
    
    /* ── group header line ── */
    .group-rule{flex:1;height:1px;background:var(--ruler)}
    :root{--ruler:#EDE7DC}
    .dark, :global([data-theme="dark"]){--ruler:rgba(255,255,255,.08)}
    
    /* ── tab active ── */
    .vtab.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .vtab.active,
    :global([data-theme="dark"]) .vtab.active{background:#4A90E2;border-color:#4A90E2}
    
    /* ── status badges ── */
    .badge-inperson{background:#F5D5C5;color:#5C2416}
    .dark .badge-inperson,
    :global([data-theme="dark"]) .badge-inperson {background:rgba(192,96,53,.2);color:#EDBA9B}
    .badge-virtual{background:#EFF3EE;color:#4A7848}
    .dark .badge-virtual,
    :global([data-theme="dark"]) .badge-virtual {background:rgba(74,120,72,.2);color:#7DBF7A}
    .badge-confirmed{background:#EFF3EE;color:#4A7848}
    .dark .badge-confirmed,
    :global([data-theme="dark"]) .badge-confirmed {background:rgba(74,120,72,.2);color:#7DBF7A}
    .badge-pending{background:#FBF6E9;color:#8A6A10}
    .dark .badge-pending,
    :global([data-theme="dark"]) .badge-pending {background:rgba(212,174,58,.15);color:#D4AE3A}
    .badge-completed{background:#E8EDF5;color:#1F3F6A}
    .dark .badge-completed,
    :global([data-theme="dark"]) .badge-completed {background:rgba(74,112,160,.15);color:#8DAACC}
    .badge-cancelled{background:#F5D5C5;color:#5C2416;opacity:.7}
    .dark .badge-cancelled,
    :global([data-theme="dark"]) .badge-cancelled {background:rgba(192,96,53,.12);color:#EDBA9B;opacity:.7}
    
    /* ── modal ── */
    #reschedModal,#cancelModal{display:none}
    #reschedModal.open,#cancelModal.open{display:flex}
    
    /* ── countdown digits ── */
    @keyframes flipNum{0%{transform:rotateX(90deg);opacity:0}100%{transform:rotateX(0);opacity:1}}
    .flip{animation:flipNum .3s ease both}
    
    /* ── page number active ── */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active,
    :global([data-theme="dark"]) .pgbtn.active {background:#4A90E2;border-color:#4A90E2}
</style>