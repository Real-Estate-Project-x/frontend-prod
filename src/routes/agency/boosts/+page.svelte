<script lang="ts">
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";

  type TabType = 'all' | 'active' | 'scheduled' | 'expired';
  type ViewType = 'list' | 'grid';

  const now = Date.now();
  const D = (d: any) => new Date(now + d * 86400000);

  const PLAN_CSS = { starter:'plan-starter', pro:'plan-pro', elite:'plan-elite' };
    const STATUS_CSS = {
    active:    'sp-boosted',
    scheduled: 'sp-scheduled',
    expired:   'sp-expired',
    };
    const STATUS_LABEL = { active:'Active', scheduled:'Scheduled', expired:'Expired' };


  const BOOSTS = [
  /* ── ACTIVE ── */
  { id:'B001', propertyId:'p001', title:'3-Bed Apartment, GRA Phase 2', location:'GRA Phase 2, Port Harcourt', type:'For Rent', skyClass:'sky-1', plan:'elite', planLabel:'Elite', planCost:30000, status:'active', startDate:D(-8), endDate:D(22), daysTotal:30, viewsGained:1842, enquiries:24, viewings:6, clickRate:71, topRegion:'Abuja' },
  { id:'B002', propertyId:'p002', title:'4-Bed Duplex, Woji Estate', location:'Woji Estate, Port Harcourt', type:'For Sale', skyClass:'sky-2', plan:'pro', planLabel:'Pro', planCost:15000, status:'active', startDate:D(-6), endDate:D(8), daysTotal:14, viewsGained:892, enquiries:11, viewings:3, clickRate:58, topRegion:'Lagos' },
  { id:'B003', propertyId:'p003', title:'5-Bed Detached, GRA Phase 3', location:'GRA Phase 3, Port Harcourt', type:'For Sale', skyClass:'sky-3', plan:'elite', planLabel:'Elite', planCost:30000, status:'active', startDate:D(-14), endDate:D(16), daysTotal:30, viewsGained:2310, enquiries:31, viewings:9, clickRate:78, topRegion:'UK/Diaspora' },
  { id:'B004', propertyId:'p004', title:'2-Bed Apartment, Trans-Amadi', location:'Trans-Amadi, Port Harcourt', type:'For Rent', skyClass:'sky-4', plan:'starter', planLabel:'Starter', planCost:5000, status:'active', startDate:D(-3), endDate:D(4), daysTotal:7, viewsGained:304, enquiries:4, viewings:1, clickRate:43, topRegion:'Port Harcourt' },
  /* ── SCHEDULED ── */
  { id:'B005', propertyId:'p005', title:'3-Bed Terrace, Rumuola', location:'Rumuola, Port Harcourt', type:'For Sale', skyClass:'sky-5', plan:'pro', planLabel:'Pro', planCost:15000, status:'scheduled', startDate:D(3), endDate:D(17), daysTotal:14, viewsGained:0, enquiries:0, viewings:0, clickRate:0, topRegion:'—' },
  { id:'B006', propertyId:'p006', title:'1-Bed Studio, D-Line', location:'D-Line, Old GRA, Port Harcourt', type:'For Rent', skyClass:'sky-6', plan:'starter', planLabel:'Starter', planCost:5000, status:'scheduled', startDate:D(7), endDate:D(14), daysTotal:7, viewsGained:0, enquiries:0, viewings:0, clickRate:0, topRegion:'—' },
  /* ── EXPIRED ── */
  { id:'B007', propertyId:'p001', title:'3-Bed Apartment, GRA Phase 2', location:'GRA Phase 2, Port Harcourt', type:'For Rent', skyClass:'sky-1', plan:'pro', planLabel:'Pro', planCost:15000, status:'expired', startDate:D(-60), endDate:D(-46), daysTotal:14, viewsGained:1120, enquiries:15, viewings:4, clickRate:64, topRegion:'Lagos' },
  { id:'B008', propertyId:'p002', title:'4-Bed Duplex, Woji Estate', location:'Woji Estate, Port Harcourt', type:'For Sale', skyClass:'sky-2', plan:'elite', planLabel:'Elite', planCost:30000, status:'expired', startDate:D(-75), endDate:D(-45), daysTotal:30, viewsGained:2890, enquiries:38, viewings:11, clickRate:82, topRegion:'UK/Diaspora' },
  { id:'B009', propertyId:'p003', title:'5-Bed Detached, GRA Phase 3', location:'GRA Phase 3, Port Harcourt', type:'For Sale', skyClass:'sky-3', plan:'starter', planLabel:'Starter', planCost:5000, status:'expired', startDate:D(-90), endDate:D(-83), daysTotal:7, viewsGained:410, enquiries:5, viewings:2, clickRate:38, topRegion:'Abuja' },
  { id:'B010', propertyId:'p004', title:'2-Bed Apartment, Trans-Amadi', location:'Trans-Amadi, Port Harcourt', type:'For Rent', skyClass:'sky-4', plan:'pro', planLabel:'Pro', planCost:15000, status:'expired', startDate:D(-50), endDate:D(-36), daysTotal:14, viewsGained:780, enquiries:9, viewings:3, clickRate:55, topRegion:'Port Harcourt' },
  { id:'B011', propertyId:'p005', title:'3-Bed Terrace, Rumuola', location:'Rumuola, Port Harcourt', type:'For Sale', skyClass:'sky-5', plan:'pro', planLabel:'Pro', planCost:15000, status:'expired', startDate:D(-30), endDate:D(-16), daysTotal:14, viewsGained:650, enquiries:8, viewings:2, clickRate:49, topRegion:'Lagos' },
  { id:'B012', propertyId:'p006', title:'1-Bed Studio, D-Line', location:'D-Line, Old GRA, Port Harcourt', type:'For Rent', skyClass:'sky-6', plan:'elite', planLabel:'Elite', planCost:30000, status:'expired', startDate:D(-45), endDate:D(-15), daysTotal:30, viewsGained:1540, enquiries:20, viewings:5, clickRate:67, topRegion:'Abuja' },
];
  let isBoostDetailOpen = $state(false);
  let isNewBoostModalOpen = $state(false);
  let selectedTab = $state<TabType>('all');
  let selectedView = $state<ViewType>('grid');
  let list = [1];
  let selectedBoost = $state<any>(null);

    function fmtDate(d: any) { return d.toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' }); }
    function fmtN(n: any) { return n.toLocaleString('en-NG'); }
    function fmtMoney(n: any) { return '\u20a6' + n.toLocaleString('en-NG'); }
    function daysLeft(b: any) { return Math.max(0, Math.ceil((b.endDate - Date.now()) / 86400000)); }
    function daysRun(b: any)  { return Math.min(b.daysTotal, Math.max(0, Math.ceil((Date.now() - b.startDate) / 86400000))); }


  const setTab = (tab: TabType) => selectedTab = tab;
  const setView = (view: ViewType) => selectedView = view;
  
  const toggleNewBoost = () => isNewBoostModalOpen = !isNewBoostModalOpen;

  const toggleBoostDetail = (boostId: string) => {
    isBoostDetailOpen = !isBoostDetailOpen;
    selectedBoost = BOOSTS.find((b) => b.id === boostId)
  };

  const closeBoostModal = () => {
    isBoostDetailOpen = false;
    selectedBoost = null;
  }

  const getProgress = (b: any) => {
    const dr = daysRun(b);
    return b.daysTotal > 0
      ? Math.round((dr / b.daysTotal) * 100)
      : 0;
  };

  const getBarColor = (b: any) => {
    if (b.status === 'active') return '#D4AE3A';
    if (b.status === 'expired') return '#8C8070';
    return '#4A90E2';
  };
</script>

{#if isNewBoostModalOpen}
<!-- ═══════════════════════════════════════════
     NEW BOOST MODAL
     [SVELTE_COMPONENT: NewBoostModal]
═══════════════════════════════════════════ -->
<div id="newBoostModal" class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="absolute inset-0 modal-bg" onclick={() => (isNewBoostModalOpen = false)}></div>
    <div class="relative bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[480px] overflow-hidden shadow-[0_24px_80px_rgba(10,36,99,.22)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] scale-in tt">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3.5"></div>
      <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between">
        <div><p class="text-[10px] font-medium tracking-[.14em] uppercase text-gold mb-0.5">Boost</p><h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:20px">Boost a property</h2></div>
        <button aria-label="Close" onclick={() => (isNewBoostModalOpen = false)} 
            class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        </button>
      </div>
      <div class="px-6 py-5 space-y-4">
        <div>
            <label for="nbProperty" class="text-[11px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] block mb-2">Select property</label>
            <select id="nbProperty" class="w-full bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.1] rounded-xl text-[13px] text-navy-dark dark:text-blue-100 px-3 py-3 pr-8 outline-none cursor-pointer tt">
                <option value="">Choose a property…</option>
                <option>3-Bed Apartment, GRA Phase 2</option>
                <option>4-Bed Duplex, Woji Estate</option>
                <option>5-Bed Detached, GRA Phase 3</option>
                <option>2-Bed Apartment, Trans-Amadi</option>
                <option>1-Bed Studio, D-Line</option>
              </select>
          </div>
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
          <button onclick={() => (isNewBoostModalOpen = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer tt hover:border-chalk-4 dark:hover:border-white/20">Cancel</button>
          <button class="flex-1 text-[13px] font-medium text-navy-deep bg-gold hover:opacity-90 py-3 rounded-full border-none cursor-pointer tt">Activate boost</button>
        </div>
      </div>
    </div>
  </div>
{/if}


{#if isBoostDetailOpen && selectedBoost}
  {@const b = selectedBoost}
  {@const dl = daysLeft(b)}
  {@const pct = getProgress(b)}
  {@const barColor = getBarColor(b)}

  <div
    id="boostModal"
    class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4"
  >
    <div
      class="absolute inset-0 modal-bg"
      onclick={closeBoostModal}
    ></div>

    <div
      class="relative bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07]
      rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[600px]
      max-h-[90vh] flex flex-col overflow-hidden
      shadow-[0_24px_80px_rgba(10,36,99,.22)]
      dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] scale-in tt"
    >
      <!-- drag handle -->
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3.5 flex-shrink-0"></div>

      <!-- HEADER -->
      <div
        class="flex-shrink-0 px-6 py-4 border-b border-chalk-3 dark:border-white/[.07]
        flex items-center justify-between gap-3"
      >
        <div class="min-w-0">
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">
            Boost details
          </p>

          <h2
            class="font-display font-light text-navy-dark dark:text-blue-100 leading-tight truncate"
            style="font-size:20px"
          >
            {b.title}
          </h2>
        </div>

        <div class="flex items-center gap-2 flex-shrink-0">
          <span
            class={`${STATUS_CSS[b.status as keyof typeof STATUS_CSS]} text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full`}
          >
            {STATUS_LABEL[b.status as keyof typeof STATUS_LABEL]}
          </span>

          <!-- BADGE EXAMPLES (commented out) -->

          <!-- Success Badge -->
          <!--
          <span class="bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300 text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">
            Success
          </span>
          -->

          <!-- Warning Badge -->
          <!--
          <span class="bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300 text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">
            Pending
          </span>
          -->

          <!-- Error Badge -->
          <!--
          <span class="bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300 text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">
            Cancelled
          </span>
          -->

          <!-- Info Badge -->
          <!--
          <span class="bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300 text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">
            Scheduled
          </span>
          -->

          <button
            onclick={closeBoostModal}
            class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1]
            flex items-center justify-center text-chalk-muted
            dark:text-[#6A7FA0] hover:text-navy-dark
            dark:hover:text-white tt bg-transparent cursor-pointer"
          >
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path
                d="M2 2l10 10M12 2L2 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- BODY -->
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5">

        <!-- Property & plan header -->
        <div class="flex items-start gap-4 mb-5">
          <div
            class={`w-16 h-16 rounded-xl ${b.skyClass} flex-shrink-0 relative overflow-hidden`}
          >
            <svg
              class="absolute inset-0 w-full h-full opacity-30"
              viewBox="0 0 64 64"
              fill="none"
            >
              <rect x="4" y="24" width="14" height="40" rx="1.5" fill="white"/>
              <rect x="22" y="16" width="20" height="48" rx="1.5" fill="white" opacity=".9"/>
              <rect x="24" y="20" width="5" height="6" rx="1" fill="#D4AE3A"/>
              <rect x="33" y="20" width="5" height="6" rx="1" fill="#4A90E2"/>
            </svg>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1.5">

              <span
                class={`${PLAN_CSS[b.plan as keyof typeof PLAN_CSS]} text-[10px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full`}
              >
                {b.planLabel} plan
              </span>

              <!-- PLAN BADGE EXAMPLES -->

              <!--
              <span class="bg-gold/10 text-gold rounded-full px-2 py-1 text-[10px] uppercase font-semibold">
                Premium Plan
              </span>
              -->

              <!--
              <span class="bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300 rounded-full px-2 py-1 text-[10px] uppercase font-semibold">
                Featured
              </span>
              -->

              <span
                class="text-[11px] font-medium text-navy-dark dark:text-blue-100"
              >
                {fmtMoney(b.planCost)}
              </span>
            </div>

            <div
              class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1"
            >
              {b.location}
            </div>
          </div>
        </div>

        <!-- Duration card -->
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-2xl p-4 mb-4 tt">
          <div
            class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3"
          >
            Boost duration
          </div>

          <div class="flex items-center gap-4 mb-3 flex-wrap">
            <div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-0.5">
                Start
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">
                {fmtDate(b.startDate)}
              </div>
            </div>

            <div class="text-chalk-4 dark:text-white/20">→</div>

            <div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-0.5">
                End
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">
                {fmtDate(b.endDate)}
              </div>
            </div>

            <div class="ml-auto">
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-0.5">
                Duration
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">
                {b.daysTotal} days
              </div>
            </div>
          </div>

          <div
            class="flex items-center justify-between text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-1.5"
          >
            <span>
              {#if b.status === 'active'}
                {dl} day{dl !== 1 ? 's' : ''} remaining
              {:else if b.status === 'scheduled'}
                Not started yet
              {:else}
                Completed
              {/if}
            </span>

            <span>
              {#if b.status !== 'scheduled'}
                {pct}%
              {/if}
            </span>
          </div>

          <div class="h-2 perf-track rounded-full">
            <div
              class="h-full rounded-full transition-all duration-700"
              style={`width:${
                b.status === 'active'
                  ? pct
                  : b.status === 'expired'
                    ? 100
                    : 0
              }%;background:${barColor}`}
            ></div>
          </div>
        </div>

        <!-- Performance metrics -->
        <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Performance</div>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-3.5 tt text-center">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:22px">{fmtN(b.viewsGained)}</div>
            <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Views</div>
        </div>
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-3.5 tt text-center">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:22px">{b.enquiries}</div>
            <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Enquiries</div>
        </div>
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-3.5 tt text-center">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:22px">{b.viewings}</div>
            <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Viewings</div>
        </div>
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-3.5 tt text-center">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" style="font-size:22px">{b.clickRate}%</div>
            <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Click rate</div>
        </div>
        </div>

        <!-- Performance bar visualisation -->
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-4 mb-4 tt">
            <div class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] mb-3">Views vs click-through</div>
            <div class="flex items-center gap-3 mb-2">
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-14 flex-shrink-0">Views</span>
            <div class="flex-1 h-2 perf-track rounded-full"><div class="h-full bg-blue-bright rounded-full" style="--w:100%;width:100%;animation:growW .9s cubic-bezier(.34,1.2,.64,1) .3s both"></div></div>
            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 w-12 text-right">{fmtN(b.viewsGained)}</span>
            </div>
            <div class="flex items-center gap-3 mb-2">
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-14 flex-shrink-0">Enquiries</span>
            <div class="flex-1 h-2 perf-track rounded-full"><div class="h-full bg-gold rounded-full" style="width:${b.viewsGained>0?Math.round(b.enquiries/b.viewsGained*100*6):0}%;animation:growW .9s cubic-bezier(.34,1.2,.64,1) .4s both"></div></div>
            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 w-12 text-right">{b.enquiries}</span>
            </div>
            <div class="flex items-center gap-3">
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-14 flex-shrink-0">Viewings</span>
            <div class="flex-1 h-2 perf-track rounded-full"><div class="h-full bg-sage rounded-full" style="width:${b.viewsGained>0?Math.round(b.viewings/b.viewsGained*100*10):0}%;animation:growW .9s cubic-bezier(.34,1.2,.64,1) .5s both"></div></div>
            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 w-12 text-right">{b.viewings}</span>
            </div>
        </div>

        <!-- Top region + property link -->
        <div class="flex gap-3 mb-5 flex-wrap">
            <div class="flex-1 bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-3.5 tt">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Top region</div>
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">{b.topRegion}</div>
            </div>
            <div class="flex-1 bg-chalk-2 dark:bg-[#131C2E] rounded-xl p-3.5 tt">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Boost ID</div>
            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 font-mono">{b.id}</div>
            </div>
        </div>

        <!-- CTA buttons -->
        <div class="flex gap-2.5 flex-wrap">
          <a
            href={`/property/${b.propertyId}`}
            class="flex-1 flex items-center justify-center gap-2 text-[12px]
            font-medium text-navy-dark dark:text-blue-100 bg-chalk-2
            dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08]
            hover:border-blue-bright/40 py-3 rounded-full no-underline tt"
          >
            View listing
          </a>

          {#if b.status !== 'active' && b.status !== 'scheduled'}
            <button
              onclick={() => {
                // reBoost(b.id);
                closeBoostModal();
              }}
              class="flex-1 flex items-center justify-center gap-2 text-[12px]
              font-medium text-navy-deep bg-gold hover:opacity-90 py-3
              rounded-full border-none cursor-pointer tt"
            >
              Boost again
            </button>
          {/if}

          {#if b.status === 'active'}
            <button
              onclick={() => {
                // cancelBoost(b.id);
                closeBoostModal();
              }}
              class="flex-1 flex items-center justify-center gap-2 text-[12px]
              font-medium text-ember bg-ember-light/50
              dark:bg-ember/[.08] border border-ember-light
              dark:border-ember/20 hover:bg-ember-light
              hover:border-ember/30 py-3 rounded-full cursor-pointer tt"
            >
              Cancel boost
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- ══ LAYOUT ══ -->
<div class="flex pt-[68px] min-h-screen">
    <AgencySidebar />

    <!-- ═══════════════════════════════════════════
        MAIN CONTENT
    ═══════════════════════════════════════════ -->
    <main class="flex-1 min-w-0 overflow-x-hidden">

        <!-- PAGE HEADER -->
        <!-- [SVELTE_COMPONENT: PageHeader] -->
        <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
        <div class="max-w-[1100px] mx-auto">
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
                <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agent dashboard</p>
                <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
                Boosted <em class="italic text-gold">properties.</em>
                </h1>
                <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
                <span class="w-[6px] h-[6px] rounded-full bg-gold pulse-dot"></span>
                <span id="todayDate">Thursday, 14 May 2026</span>
                &nbsp;·&nbsp;
                <span id="hdrActive" class="text-white font-medium">4</span> active boosts
                &nbsp;·&nbsp;
                <span id="hdrTotalViews" class="text-white font-medium">12,738</span> total views gained
                </p>
            </div>
            <div class="flex items-center gap-2.5 flex-wrap">
                <button onclick={() => {}} class="flex items-center gap-2 text-[13px] font-medium text-white bg-white/[.08] border border-white/15 hover:bg-white/15 px-4 py-[9px] rounded-full tt cursor-pointer border-none">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 9V1M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M1 11v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                Export
                </button>
                <button onclick={toggleNewBoost} class="flex items-center gap-2 text-[13px] font-medium text-white bg-gold hover:opacity-90 px-4 py-[9px] rounded-full border-none cursor-pointer tt">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M10 2l1.5 3.5 3.5.5-2.5 2.4.6 3.5L10 10.3 6.9 12l.6-3.5L5 6.1l3.5-.5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
                Boost a property
                </button>
            </div>
            </div>
    
            <!-- ── SUMMARY STAT STRIP ── -->
            <!-- [SVELTE_COMPONENT: BoostStats] -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-7 stat-4">
            <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
                <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-gold pulse-dot"></span>Active boosts
                </div>
                <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="statActive">4</div>
                <div class="text-[11px] text-white/40 mt-1" id="statActiveSub">of – listings</div>
            </div>
            <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
                <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M1 7s3-5 6-5 6 5 6 5-3 5-6 5-6-5-6-5z" stroke="rgba(74,144,226,.8)" stroke-width="1.2"/><circle cx="7" cy="7" r="2" stroke="rgba(74,144,226,.8)" stroke-width="1.2"/></svg>
                Views gained
                </div>
                <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="statViews">12,738</div>
                <div class="text-[11px] text-white/40 mt-1">from all boosts</div>
            </div>
            <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
                <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 11l3-4 2 2 3-5 3 7" stroke="rgba(74,120,72,.8)" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Enquiries driven
                </div>
                <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="statEnquiries">165</div>
                <div class="text-[11px] text-white/40 mt-1">via boosted listings</div>
            </div>
            <div class="stat-card bg-white/[.06] dark:bg-white/[.04] border border-white/[.09] rounded-2xl p-4 tt cursor-default">
                <div class="text-[11px] text-white/50 mb-2 flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="1" y="4" width="12" height="9" rx="1.5" stroke="rgba(192,96,53,.8)" stroke-width="1.2"/><path d="M4 4V2.5A2.5 2.5 0 019 2.5V4" stroke="rgba(192,96,53,.8)" stroke-width="1.2" stroke-linecap="round"/></svg>
                Total spent
                </div>
                <div class="font-display font-semibold text-white leading-none" style="font-size:28px" id="statSpent">₦210,000</div>
                <div class="text-[11px] text-white/40 mt-1">all-time boost spend</div>
            </div>
            </div>
        </div>
        </div>

        <!-- BODY -->
  <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto space-y-5">

    <!-- ── CONTROLS BAR ── -->
    <!-- [SVELTE_COMPONENT: BoostControls] -->
    <div class="space-y-3 fu d1">

      <!-- Row 1: search + view toggle -->
      <div class="flex items-center gap-3 flex-wrap controls-stack">
        <!-- Search -->
        <div class="flex-1 min-w-[200px] relative">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] pointer-events-none" width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          <input id="searchInput" type="text" placeholder="Search by property name or location…" oninput={() => {}} class="w-full bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl pl-9 pr-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none focus:border-blue-bright/50 tt">
        </div>

        <!-- Sort select -->
        <div class="sel flex-shrink-0">
          <select id="sortSel" class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[13px] text-navy-dark dark:text-blue-100 px-3 py-[10px] pr-7 outline-none cursor-pointer tt">
            <option value="recent">Most recent</option>
            <option value="views-desc">Highest views</option>
            <option value="views-asc">Lowest views</option>
            <option value="end-soon">Ending soonest</option>
            <option value="spend-desc">Highest spend</option>
            <option value="alpha">A → Z</option>
          </select>
        </div>

        <!-- View toggle: Card / List -->
        <div class="flex gap-0.5 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-1 flex-shrink-0">
          <button id="btnCard" class:active={selectedView === 'grid'} onclick={() => setView('grid')} class="vtoggle-btn w-8 h-7 rounded-lg flex items-center justify-center transition-all border-none cursor-pointer" title="Card view">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/><rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
          </button>
          <button id="btnList" class:active={selectedView === 'list'} onclick={() => setView('list')} class="vtoggle-btn w-8 h-7 rounded-lg flex items-center justify-center transition-all border-none cursor-pointer" title="List view">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><line x1="4" y1="4" x2="15" y2="4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="4" y1="8" x2="15" y2="8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><line x1="4" y1="12" x2="15" y2="12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><circle cx="1.5" cy="4" r="1" fill="currentColor"/><circle cx="1.5" cy="8" r="1" fill="currentColor"/><circle cx="1.5" cy="12" r="1" fill="currentColor"/></svg>
          </button>
        </div>
      </div>

      <!-- Row 2: filter chips + date range -->
      <div class="flex items-center gap-2 flex-wrap">
        <!-- Status filter chips --> 
        <div class="flex gap-1.5 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-1">
            {#each ['all', 'active', 'scheduled', 'expired'] as status}
            <button onclick={() => setTab(status as any)}   
                class:active={status === selectedTab}    
                class="ptab capitalize text-[11px] font-medium px-3.5 py-1.5 rounded-lg bg-transparent border-none cursor-pointer tt">
                {status}
            </button>
            {/each}
        </div>

        <!-- Plan filter -->
        <div class="sel">
          <select id="planSel" onchange={() => {}} class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] pr-7 outline-none cursor-pointer tt">
            <option value="all">All plans</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="elite">Elite</option>
          </select>
        </div>

        <!-- Date range -->
        <div class="sel">
          <select id="dateSel" onchange={() => {}} class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] pr-7 outline-none cursor-pointer tt">
            <option value="all">All time</option>
            <option value="7">Last 7 days</option>
            <option value="30" selected>Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="custom">Custom range</option>
          </select>
        </div>

        <!-- Custom date inputs (shown only when "custom" selected) -->
        <div id="customDates" class="hidden flex items-center gap-2">
          <input type="date" id="dateFrom" class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] outline-none tt cursor-pointer" style="color-scheme:dark">
          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">to</span>
          <input type="date" id="dateTo" class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl text-[12px] text-navy-dark dark:text-blue-100 px-3 py-[8px] outline-none tt cursor-pointer" style="color-scheme:dark">
        </div>
      </div>

       <!-- ── RESULTS HEADER ── -->
        <div class="flex items-center justify-between flex-wrap gap-2">
            <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]" id="resultsLabel">
                Showing 1–5 of 5 boosts
            </p>
        </div>

        {#if list.length > 0}
        <!-- ── BOOST CARDS / LIST ── -->
        <!-- [SVELTE_COMPONENT: BoostList] -->
        <div id="boostGrid" class={`${selectedView === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 grid-cols-boost' : 'bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt'}`}>
            {#if selectedView === 'grid'}
            <!-- [SVELTE_COMPONENT: BoostCard] id="B004" -->
                <div class="boost-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt cursor-pointer fu boost-border-active" onclick={() => toggleBoostDetail('B001')}>
                
                <!-- Property thumbnail -->
                <div class="h-[130px] sky-4 relative flex-shrink-0">
                    <!-- Mini building illustration — same technique as dashboard prop-scene -->
                    <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 340 130" fill="none" preserveAspectRatio="xMidYMax meet">
                    <rect x="10" y="40" width="35" height="90" rx="2" fill="white"></rect><rect x="14" y="50" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="25" y="50" width="8" height="10" rx="1" fill="#4A90E2" opacity=".6"></rect>
                    <rect x="55" y="25" width="55" height="105" rx="2" fill="white" opacity=".9"></rect><rect x="60" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".8"></rect><rect x="74" y="35" width="9" height="12" rx="1" fill="#4A90E2" opacity=".7"></rect><rect x="88" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".6"></rect><rect x="60" y="53" width="9" height="12" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="74" y="53" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                    <rect x="125" y="10" width="75" height="120" rx="3" fill="white"></rect><rect x="131" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="147" y="22" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="163" y="22" width="10" height="14" rx="1" fill="white" opacity=".5"></rect><rect x="179" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="131" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="147" y="42" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="163" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="179" y="42" width="10" height="14" rx="1" fill="white" opacity=".4"></rect><rect x="131" y="62" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="147" y="62" width="10" height="14" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    <rect x="215" y="30" width="55" height="100" rx="2" fill="white" opacity=".85"></rect><rect x="221" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="235" y="42" width="9" height="12" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="249" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".5"></rect>
                    <rect x="285" y="45" width="40" height="85" rx="2" fill="white" opacity=".7"></rect><rect x="291" y="56" width="8" height="11" rx="1" fill="#D4AE3A" opacity=".6"></rect>
                    <rect x="0" y="128" width="340" height="2" fill="#4A90E2" opacity=".15"></rect>
                    </svg>
                    <!-- Type badge -->
                    <span class="absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full sp-active">For Rent</span>
                    <!-- Plan badge -->
                    <span class="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full plan-starter">Starter</span>
                    <!-- Active glow dot -->
                    <span class="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] font-medium text-white bg-navy-deep/55 backdrop-blur-sm px-2 py-[3px] rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>Live</span>
                </div>
                
                <!-- Card body -->
                <div class="p-4">
                    <!-- Title + status -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 leading-snug truncate">2-Bed Apartment, Trans-Amadi</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1 truncate">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="currentColor" stroke-width="1.1"></path></svg>
                        Trans-Amadi, Port Harcourt
                        </div>
                    </div>
                    <span class="sp-boosted text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    </div>
                
                    <!-- Dates -->
                    <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3.5">
                    <span class="flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.1"></rect><path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"></path></svg>11 May 2026</span>
                    <span class="text-chalk-4 dark:text-white/20">→</span>
                    <span>18 May 2026</span>
                    </div>
                
                    <!-- Progress bar (boost duration) -->
                    <div class="mb-3.5">
                    <div class="flex items-center justify-between text-[10px] text-chalk-muted dark:text-[#6A7FA0] mb-1.5">
                        <span>4 days remaining</span>
                        <span>57%</span>
                    </div>
                    <div class="h-1.5 perf-track rounded-full">
                        <div class="h-full rounded-full" style="width:57%;background:#D4AE3A;transition:width .9s cubic-bezier(.34,1.2,.64,1)"></div>
                    </div>
                    </div>
                
                    <!-- Performance metrics -->
                    <div class="grid grid-cols-3 gap-2 text-center pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">304</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Views</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">4</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Enquiries</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">43%</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">CTR</div>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostCard] id="B002" -->
                <div class="boost-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt cursor-pointer fu boost-border-active" onclick={() => toggleBoostDetail('B002')}>
                
                <!-- Property thumbnail -->
                <div class="h-[130px] sky-2 relative flex-shrink-0">
                    <!-- Mini building illustration — same technique as dashboard prop-scene -->
                    <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 340 130" fill="none" preserveAspectRatio="xMidYMax meet">
                    <rect x="10" y="40" width="35" height="90" rx="2" fill="white"></rect><rect x="14" y="50" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="25" y="50" width="8" height="10" rx="1" fill="#4A90E2" opacity=".6"></rect>
                    <rect x="55" y="25" width="55" height="105" rx="2" fill="white" opacity=".9"></rect><rect x="60" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".8"></rect><rect x="74" y="35" width="9" height="12" rx="1" fill="#4A90E2" opacity=".7"></rect><rect x="88" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".6"></rect><rect x="60" y="53" width="9" height="12" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="74" y="53" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                    <rect x="125" y="10" width="75" height="120" rx="3" fill="white"></rect><rect x="131" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="147" y="22" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="163" y="22" width="10" height="14" rx="1" fill="white" opacity=".5"></rect><rect x="179" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="131" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="147" y="42" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="163" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="179" y="42" width="10" height="14" rx="1" fill="white" opacity=".4"></rect><rect x="131" y="62" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="147" y="62" width="10" height="14" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    <rect x="215" y="30" width="55" height="100" rx="2" fill="white" opacity=".85"></rect><rect x="221" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="235" y="42" width="9" height="12" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="249" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".5"></rect>
                    <rect x="285" y="45" width="40" height="85" rx="2" fill="white" opacity=".7"></rect><rect x="291" y="56" width="8" height="11" rx="1" fill="#D4AE3A" opacity=".6"></rect>
                    <rect x="0" y="128" width="340" height="2" fill="#4A90E2" opacity=".15"></rect>
                    </svg>
                    <!-- Type badge -->
                    <span class="absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full sp-boosted">For Sale</span>
                    <!-- Plan badge -->
                    <span class="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full plan-pro">Pro</span>
                    <!-- Active glow dot -->
                    <span class="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] font-medium text-white bg-navy-deep/55 backdrop-blur-sm px-2 py-[3px] rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>Live</span>
                </div>
                
                <!-- Card body -->
                <div class="p-4">
                    <!-- Title + status -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 leading-snug truncate">4-Bed Duplex, Woji Estate</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1 truncate">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="currentColor" stroke-width="1.1"></path></svg>
                        Woji Estate, Port Harcourt
                        </div>
                    </div>
                    <span class="sp-boosted text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    </div>
                
                    <!-- Dates -->
                    <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3.5">
                    <span class="flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.1"></rect><path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"></path></svg>8 May 2026</span>
                    <span class="text-chalk-4 dark:text-white/20">→</span>
                    <span>22 May 2026</span>
                    </div>
                
                    <!-- Progress bar (boost duration) -->
                    <div class="mb-3.5">
                    <div class="flex items-center justify-between text-[10px] text-chalk-muted dark:text-[#6A7FA0] mb-1.5">
                        <span>8 days remaining</span>
                        <span>50%</span>
                    </div>
                    <div class="h-1.5 perf-track rounded-full">
                        <div class="h-full rounded-full" style="width:50%;background:#D4AE3A;transition:width .9s cubic-bezier(.34,1.2,.64,1)"></div>
                    </div>
                    </div>
                
                    <!-- Performance metrics -->
                    <div class="grid grid-cols-3 gap-2 text-center pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">892</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Views</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">11</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Enquiries</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">58%</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">CTR</div>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostCard] id="B001" -->
                <div class="boost-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt cursor-pointer fu boost-border-active" onclick={() => toggleBoostDetail('B003')}>
                
                <!-- Property thumbnail -->
                <div class="h-[130px] sky-1 relative flex-shrink-0">
                    <!-- Mini building illustration — same technique as dashboard prop-scene -->
                    <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 340 130" fill="none" preserveAspectRatio="xMidYMax meet">
                    <rect x="10" y="40" width="35" height="90" rx="2" fill="white"></rect><rect x="14" y="50" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="25" y="50" width="8" height="10" rx="1" fill="#4A90E2" opacity=".6"></rect>
                    <rect x="55" y="25" width="55" height="105" rx="2" fill="white" opacity=".9"></rect><rect x="60" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".8"></rect><rect x="74" y="35" width="9" height="12" rx="1" fill="#4A90E2" opacity=".7"></rect><rect x="88" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".6"></rect><rect x="60" y="53" width="9" height="12" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="74" y="53" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                    <rect x="125" y="10" width="75" height="120" rx="3" fill="white"></rect><rect x="131" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="147" y="22" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="163" y="22" width="10" height="14" rx="1" fill="white" opacity=".5"></rect><rect x="179" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="131" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="147" y="42" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="163" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="179" y="42" width="10" height="14" rx="1" fill="white" opacity=".4"></rect><rect x="131" y="62" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="147" y="62" width="10" height="14" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    <rect x="215" y="30" width="55" height="100" rx="2" fill="white" opacity=".85"></rect><rect x="221" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="235" y="42" width="9" height="12" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="249" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".5"></rect>
                    <rect x="285" y="45" width="40" height="85" rx="2" fill="white" opacity=".7"></rect><rect x="291" y="56" width="8" height="11" rx="1" fill="#D4AE3A" opacity=".6"></rect>
                    <rect x="0" y="128" width="340" height="2" fill="#4A90E2" opacity=".15"></rect>
                    </svg>
                    <!-- Type badge -->
                    <span class="absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full sp-active">For Rent</span>
                    <!-- Plan badge -->
                    <span class="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full plan-elite">Elite</span>
                    <!-- Active glow dot -->
                    <span class="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] font-medium text-white bg-navy-deep/55 backdrop-blur-sm px-2 py-[3px] rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>Live</span>
                </div>
                
                <!-- Card body -->
                <div class="p-4">
                    <!-- Title + status -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 leading-snug truncate">3-Bed Apartment, GRA Phase 2</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1 truncate">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="currentColor" stroke-width="1.1"></path></svg>
                        GRA Phase 2, Port Harcourt
                        </div>
                    </div>
                    <span class="sp-boosted text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    </div>
                
                    <!-- Dates -->
                    <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3.5">
                    <span class="flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.1"></rect><path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"></path></svg>6 May 2026</span>
                    <span class="text-chalk-4 dark:text-white/20">→</span>
                    <span>5 Jun 2026</span>
                    </div>
                
                    <!-- Progress bar (boost duration) -->
                    <div class="mb-3.5">
                    <div class="flex items-center justify-between text-[10px] text-chalk-muted dark:text-[#6A7FA0] mb-1.5">
                        <span>22 days remaining</span>
                        <span>30%</span>
                    </div>
                    <div class="h-1.5 perf-track rounded-full">
                        <div class="h-full rounded-full" style="width:30%;background:#D4AE3A;transition:width .9s cubic-bezier(.34,1.2,.64,1)"></div>
                    </div>
                    </div>
                
                    <!-- Performance metrics -->
                    <div class="grid grid-cols-3 gap-2 text-center pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">1,842</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Views</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">24</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Enquiries</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">71%</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">CTR</div>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostCard] id="B003" -->
                <div class="boost-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt cursor-pointer fu boost-border-active" onclick={() => toggleBoostDetail('B004')}>
                
                <!-- Property thumbnail -->
                <div class="h-[130px] sky-3 relative flex-shrink-0">
                    <!-- Mini building illustration — same technique as dashboard prop-scene -->
                    <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 340 130" fill="none" preserveAspectRatio="xMidYMax meet">
                    <rect x="10" y="40" width="35" height="90" rx="2" fill="white"></rect><rect x="14" y="50" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="25" y="50" width="8" height="10" rx="1" fill="#4A90E2" opacity=".6"></rect>
                    <rect x="55" y="25" width="55" height="105" rx="2" fill="white" opacity=".9"></rect><rect x="60" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".8"></rect><rect x="74" y="35" width="9" height="12" rx="1" fill="#4A90E2" opacity=".7"></rect><rect x="88" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".6"></rect><rect x="60" y="53" width="9" height="12" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="74" y="53" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                    <rect x="125" y="10" width="75" height="120" rx="3" fill="white"></rect><rect x="131" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="147" y="22" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="163" y="22" width="10" height="14" rx="1" fill="white" opacity=".5"></rect><rect x="179" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="131" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="147" y="42" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="163" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="179" y="42" width="10" height="14" rx="1" fill="white" opacity=".4"></rect><rect x="131" y="62" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="147" y="62" width="10" height="14" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    <rect x="215" y="30" width="55" height="100" rx="2" fill="white" opacity=".85"></rect><rect x="221" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="235" y="42" width="9" height="12" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="249" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".5"></rect>
                    <rect x="285" y="45" width="40" height="85" rx="2" fill="white" opacity=".7"></rect><rect x="291" y="56" width="8" height="11" rx="1" fill="#D4AE3A" opacity=".6"></rect>
                    <rect x="0" y="128" width="340" height="2" fill="#4A90E2" opacity=".15"></rect>
                    </svg>
                    <!-- Type badge -->
                    <span class="absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full sp-boosted">For Sale</span>
                    <!-- Plan badge -->
                    <span class="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full plan-elite">Elite</span>
                    <!-- Active glow dot -->
                    <span class="absolute bottom-3 left-3 flex items-center gap-1.5 text-[9px] font-medium text-white bg-navy-deep/55 backdrop-blur-sm px-2 py-[3px] rounded-full"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>Live</span>
                </div>
                
                <!-- Card body -->
                <div class="p-4">
                    <!-- Title + status -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 leading-snug truncate">5-Bed Detached, GRA Phase 3</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1 truncate">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="currentColor" stroke-width="1.1"></path></svg>
                        GRA Phase 3, Port Harcourt
                        </div>
                    </div>
                    <span class="sp-boosted text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    </div>
                
                    <!-- Dates -->
                    <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3.5">
                    <span class="flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.1"></rect><path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"></path></svg>30 Apr 2026</span>
                    <span class="text-chalk-4 dark:text-white/20">→</span>
                    <span>30 May 2026</span>
                    </div>
                
                    <!-- Progress bar (boost duration) -->
                    <div class="mb-3.5">
                    <div class="flex items-center justify-between text-[10px] text-chalk-muted dark:text-[#6A7FA0] mb-1.5">
                        <span>16 days remaining</span>
                        <span>50%</span>
                    </div>
                    <div class="h-1.5 perf-track rounded-full">
                        <div class="h-full rounded-full" style="width:50%;background:#D4AE3A;transition:width .9s cubic-bezier(.34,1.2,.64,1)"></div>
                    </div>
                    </div>
                
                    <!-- Performance metrics -->
                    <div class="grid grid-cols-3 gap-2 text-center pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">2,310</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Views</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">31</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Enquiries</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">78%</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">CTR</div>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostCard] id="B011" -->
                <div class="boost-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-2xl overflow-hidden tt cursor-pointer fu " onclick={() => toggleBoostDetail('B005')}>
                
                <!-- Property thumbnail -->
                <div class="h-[130px] sky-5 relative flex-shrink-0">
                    <!-- Mini building illustration — same technique as dashboard prop-scene -->
                    <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 340 130" fill="none" preserveAspectRatio="xMidYMax meet">
                    <rect x="10" y="40" width="35" height="90" rx="2" fill="white"></rect><rect x="14" y="50" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="25" y="50" width="8" height="10" rx="1" fill="#4A90E2" opacity=".6"></rect>
                    <rect x="55" y="25" width="55" height="105" rx="2" fill="white" opacity=".9"></rect><rect x="60" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".8"></rect><rect x="74" y="35" width="9" height="12" rx="1" fill="#4A90E2" opacity=".7"></rect><rect x="88" y="35" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".6"></rect><rect x="60" y="53" width="9" height="12" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="74" y="53" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                    <rect x="125" y="10" width="75" height="120" rx="3" fill="white"></rect><rect x="131" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="147" y="22" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="163" y="22" width="10" height="14" rx="1" fill="white" opacity=".5"></rect><rect x="179" y="22" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="131" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".8"></rect><rect x="147" y="42" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".9"></rect><rect x="163" y="42" width="10" height="14" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="179" y="42" width="10" height="14" rx="1" fill="white" opacity=".4"></rect><rect x="131" y="62" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="147" y="62" width="10" height="14" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    <rect x="215" y="30" width="55" height="100" rx="2" fill="white" opacity=".85"></rect><rect x="221" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".7"></rect><rect x="235" y="42" width="9" height="12" rx="1" fill="#4A90E2" opacity=".6"></rect><rect x="249" y="42" width="9" height="12" rx="1" fill="#D4AE3A" opacity=".5"></rect>
                    <rect x="285" y="45" width="40" height="85" rx="2" fill="white" opacity=".7"></rect><rect x="291" y="56" width="8" height="11" rx="1" fill="#D4AE3A" opacity=".6"></rect>
                    <rect x="0" y="128" width="340" height="2" fill="#4A90E2" opacity=".15"></rect>
                    </svg>
                    <!-- Type badge -->
                    <span class="absolute top-3 left-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full sp-boosted">For Sale</span>
                    <!-- Plan badge -->
                    <span class="absolute top-3 right-3 text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full plan-pro">Pro</span>
                    <!-- Active glow dot -->
                    
                </div>
                
                <!-- Card body -->
                <div class="p-4">
                    <!-- Title + status -->
                    <div class="flex items-start justify-between gap-2 mb-2">
                    <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 leading-snug truncate">3-Bed Terrace, Rumuola</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1 truncate">
                        <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1a3.5 3.5 0 013.5 3.5C9.5 7.5 6 11 6 11S2.5 7.5 2.5 4.5A3.5 3.5 0 016 1z" stroke="currentColor" stroke-width="1.1"></path></svg>
                        Rumuola, Port Harcourt
                        </div>
                    </div>
                    <span class="sp-expired text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Expired</span>
                    </div>
                
                    <!-- Dates -->
                    <div class="flex items-center gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3.5">
                    <span class="flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><rect x="1" y="2" width="10" height="9" rx="1" stroke="currentColor" stroke-width="1.1"></rect><path d="M1 5h10M4 1v2M8 1v2" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"></path></svg>14 Apr 2026</span>
                    <span class="text-chalk-4 dark:text-white/20">→</span>
                    <span>28 Apr 2026</span>
                    </div>
                
                    <!-- Progress bar (boost duration) -->
                    <div class="mb-3.5">
                    <div class="flex items-center justify-between text-[10px] text-chalk-muted dark:text-[#6A7FA0] mb-1.5">
                        <span>Completed</span>
                        <span>100%</span>
                    </div>
                    <div class="h-1.5 perf-track rounded-full">
                        <div class="h-full rounded-full" style="width:100%;background:#8C8070;transition:width .9s cubic-bezier(.34,1.2,.64,1)"></div>
                    </div>
                    </div>
                
                    <!-- Performance metrics -->
                    <div class="grid grid-cols-3 gap-2 text-center pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">650</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Views</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">8</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">Enquiries</div>
                    </div>
                    <div>
                        <div class="text-[14px] font-semibold font-display text-navy-dark dark:text-blue-100 leading-none">49%</div>
                        <div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em] mt-0.5">CTR</div>
                    </div>
                    </div>
                </div>
                </div>
            {:else}
                <div class="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-chalk-3 dark:border-white/[.07] bg-chalk-2 dark:bg-[#1A2438] tt">
                <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Property</div>
                <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Plan</div>
                <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Status</div>
                <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Dates</div>
                <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] text-right">Views / CTR</div>
                <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] text-right">Remaining</div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostRow] id="B004" -->
                <div class="lrow grid grid-cols-[1fr_auto_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 border-b border-chalk-3 dark:border-white/[.06] cursor-pointer tt" onclick={() => toggleBoostDetail('B001')}>
                    <!-- Property -->
                    <div class="min-w-0">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot flex-shrink-0"></span>
                        <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">2-Bed Apartment, Trans-Amadi</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">Trans-Amadi, Port Harcourt</div>
                        </div>
                    </div>
                    </div>
                    <!-- Plan -->
                    <span class="hide-mobile plan-starter text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Starter</span>
                    <!-- Status -->
                    <span class="hide-mobile sp-boosted text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    <!-- Dates -->
                    <div class="hide-mobile text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                    <div>11 May 2026</div>
                    <div class="text-[10px] text-chalk-4 dark:text-white/30 mt-0.5">→ 18 May 2026</div>
                    </div>
                    <!-- Views + CTR -->
                    <div class="hide-mobile text-right flex-shrink-0">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">304</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">43% CTR</div>
                    </div>
                    <!-- Days remaining badge -->
                    <div class="flex-shrink-0 text-right">
                    <span class="text-[11px] font-medium text-gold bg-gold/10 dark:bg-gold/15 px-2.5 py-[3px] rounded-full whitespace-nowrap">4d left</span>
                    </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostRow] id="B002" -->
                <div class="lrow grid grid-cols-[1fr_auto_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 border-b border-chalk-3 dark:border-white/[.06] cursor-pointer tt" onclick={() => toggleBoostDetail('B002')}>
                    <!-- Property -->
                    <div class="min-w-0">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot flex-shrink-0"></span>
                        <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">4-Bed Duplex, Woji Estate</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">Woji Estate, Port Harcourt</div>
                        </div>
                    </div>
                    </div>
                    <!-- Plan -->
                    <span class="hide-mobile plan-pro text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Pro</span>
                    <!-- Status -->
                    <span class="hide-mobile sp-boosted text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    <!-- Dates -->
                    <div class="hide-mobile text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                    <div>8 May 2026</div>
                    <div class="text-[10px] text-chalk-4 dark:text-white/30 mt-0.5">→ 22 May 2026</div>
                    </div>
                    <!-- Views + CTR -->
                    <div class="hide-mobile text-right flex-shrink-0">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">892</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">58% CTR</div>
                    </div>
                    <!-- Days remaining badge -->
                    <div class="flex-shrink-0 text-right">
                    <span class="text-[11px] font-medium text-gold bg-gold/10 dark:bg-gold/15 px-2.5 py-[3px] rounded-full whitespace-nowrap">8d left</span>
                    </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostRow] id="B001" -->
                <div class="lrow grid grid-cols-[1fr_auto_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 border-b border-chalk-3 dark:border-white/[.06] cursor-pointer tt" onclick={() => toggleBoostDetail('B003')}>
                    <!-- Property -->
                    <div class="min-w-0">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot flex-shrink-0"></span>
                        <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">3-Bed Apartment, GRA Phase 2</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">GRA Phase 2, Port Harcourt</div>
                        </div>
                    </div>
                    </div>
                    <!-- Plan -->
                    <span class="hide-mobile plan-elite text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Elite</span>
                    <!-- Status -->
                    <span class="hide-mobile sp-boosted text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    <!-- Dates -->
                    <div class="hide-mobile text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                    <div>6 May 2026</div>
                    <div class="text-[10px] text-chalk-4 dark:text-white/30 mt-0.5">→ 5 Jun 2026</div>
                    </div>
                    <!-- Views + CTR -->
                    <div class="hide-mobile text-right flex-shrink-0">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">1,842</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">71% CTR</div>
                    </div>
                    <!-- Days remaining badge -->
                    <div class="flex-shrink-0 text-right">
                    <span class="text-[11px] font-medium text-gold bg-gold/10 dark:bg-gold/15 px-2.5 py-[3px] rounded-full whitespace-nowrap">22d left</span>
                    </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostRow] id="B003" -->
                <div class="lrow grid grid-cols-[1fr_auto_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 border-b border-chalk-3 dark:border-white/[.06] cursor-pointer tt"onclick={() => toggleBoostDetail('B004')}>
                    <!-- Property -->
                    <div class="min-w-0">
                    <div class="flex items-center gap-2 min-w-0">
                        <span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot flex-shrink-0"></span>
                        <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">5-Bed Detached, GRA Phase 3</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">GRA Phase 3, Port Harcourt</div>
                        </div>
                    </div>
                    </div>
                    <!-- Plan -->
                    <span class="hide-mobile plan-elite text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Elite</span>
                    <!-- Status -->
                    <span class="hide-mobile sp-boosted text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Active</span>
                    <!-- Dates -->
                    <div class="hide-mobile text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                    <div>30 Apr 2026</div>
                    <div class="text-[10px] text-chalk-4 dark:text-white/30 mt-0.5">→ 30 May 2026</div>
                    </div>
                    <!-- Views + CTR -->
                    <div class="hide-mobile text-right flex-shrink-0">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">2,310</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">78% CTR</div>
                    </div>
                    <!-- Days remaining badge -->
                    <div class="flex-shrink-0 text-right">
                    <span class="text-[11px] font-medium text-gold bg-gold/10 dark:bg-gold/15 px-2.5 py-[3px] rounded-full whitespace-nowrap">16d left</span>
                    </div>
                </div>
                <!-- [SVELTE_COMPONENT: BoostRow] id="B011" -->
                <div class="lrow grid grid-cols-[1fr_auto_auto_auto_auto_auto] md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto] items-center gap-4 px-5 py-3.5 border-b border-chalk-3 dark:border-white/[.06] cursor-pointer tt" onclick={() => toggleBoostDetail('B005')}>
                    <!-- Property -->
                    <div class="min-w-0">
                    <div class="flex items-center gap-2 min-w-0">
                        
                        <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">3-Bed Terrace, Rumuola</div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 truncate">Rumuola, Port Harcourt</div>
                        </div>
                    </div>
                    </div>
                    <!-- Plan -->
                    <span class="hide-mobile plan-pro text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Pro</span>
                    <!-- Status -->
                    <span class="hide-mobile sp-expired text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex-shrink-0">Expired</span>
                    <!-- Dates -->
                    <div class="hide-mobile text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                    <div>14 Apr 2026</div>
                    <div class="text-[10px] text-chalk-4 dark:text-white/30 mt-0.5">→ 28 Apr 2026</div>
                    </div>
                    <!-- Views + CTR -->
                    <div class="hide-mobile text-right flex-shrink-0">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">650</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">49% CTR</div>
                    </div>
                    <!-- Days remaining badge -->
                    <div class="flex-shrink-0 text-right">
                    <span class="text-[11px] font-medium sp-expired px-2.5 py-[3px] rounded-full whitespace-nowrap">Ended</span>
                    </div>
                </div>
            {/if}
        </div>

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
    {:else}
    <!-- ── EMPTY STATE ── -->
    <div id="emptyState" class="py-16 text-center border-2 border-dashed border-chalk-3 dark:border-white/[.07] rounded-2xl">
      <div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.04] flex items-center justify-center mx-auto mb-5">
        <svg width="24" height="24" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke-linejoin="round"/></svg>
      </div>
      <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:20px">No boosts <em class="italic">found.</em></h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] max-w-[280px] mx-auto" id="emptyMsg">Try adjusting your filters or boost a property.</p>
      <button onclick={toggleNewBoost} class="mt-5 inline-flex items-center gap-2 text-[13px] font-medium text-white bg-gold hover:opacity-90 px-5 py-2.5 rounded-full border-none cursor-pointer tt">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
        Boost a property
      </button>
    </div>
    {/if}
    </div>

    </div>

    </main>
</div>

<style>
    /* ── Exact token set from agent_dashboard.html ── */
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
    @keyframes growW{from{width:0}to{width:var(--w)}}
    .grow-w{animation:growW .9s cubic-bezier(.34,1.2,.64,1) .4s both}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .26s cubic-bezier(.22,.68,0,1.2) both}
    
    /* sidebar — identical */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active,
    :global([data-theme="dark"]) .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover,
    :global([data-theme="dark"]) .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* stat card — identical */
    .stat-card{transition:transform .22s,box-shadow .22s}
    .stat-card:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(10,36,99,.11)}
    .dark .stat-card:hover,
    :global([data-theme="dark"]) .stat-card:hover{box-shadow:0 12px 36px rgba(0,0,0,.38)}
    
    /* period / filter tab — identical */
    .ptab.active{background:white;color:#0A2463;box-shadow:0 1px 4px rgba(10,36,99,.12)}
    .dark .ptab.active,
    :global([data-theme="dark"]) .ptab.active{background:#131C2E;color:#E8EDF5}
    
    /* lrow — identical */
    .lrow{transition:background .2s}
    .lrow:hover{background:rgba(247,243,236,.7)}
    .dark .lrow:hover,
    :global([data-theme="dark"]) .lrow:hover{background:rgba(255,255,255,.025)}
    
    /* bar tooltip — identical */
    .bar-tip{position:absolute;bottom:calc(100%+6px);left:50%;transform:translateX(-50%);background:#0A2463;color:white;font-size:10px;font-weight:500;padding:3px 8px;border-radius:6px;white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .18s;z-index:10}
    .dark .bar-tip,
    :global([data-theme="dark"]) .bar-tip{background:#1F3F6A}
    .btw:hover .bar-tip{opacity:1}
    
    /* status pills — identical + boost-specific additions */
    .sp-active{background:#EFF3EE;color:#4A7848}
    .dark .sp-active,
    :global([data-theme="dark"]) .sp-active{background:rgba(74,120,72,.2);color:#7DBF7A}
    .sp-boosted{background:#FBF6E9;color:#8A6A10}
    .dark .sp-boosted,
    :global([data-theme="dark"]) .sp-boosted {background:rgba(212,174,58,.15);color:#D4AE3A}
    .sp-expired{background:#F5D5C5;color:#5C2416}
    .dark .sp-expired,
    :global([data-theme="dark"]) .sp-expired {background:rgba(192,96,53,.15);color:#EDBA9B}
    .sp-scheduled{background:#E8EDF5;color:#1F3F6A}
    .dark .sp-scheduled,
    :global([data-theme="dark"]) .sp-scheduled{background:rgba(74,112,160,.15);color:#8DAACC}
    
    /* boost plan badges */
    .plan-starter{background:rgba(10,36,99,.07);color:#1F3F6A}
    .dark .plan-starter{background:rgba(74,112,160,.15);color:#8DAACC}
    .plan-pro{background:rgba(212,174,58,.12);color:#8A6A10}
    .dark .plan-pro{background:rgba(212,174,58,.18);color:#D4AE3A}
    .plan-elite{background:rgba(192,96,53,.12);color:#C06035}
    .dark .plan-elite{background:rgba(192,96,53,.18);color:#EDBA9B}

    .plan-card.active {outline: rgb(212, 174, 58) solid 2px;}
    
    /* activity icon */
    .ai-boost{background:rgba(212,174,58,.12);color:#B8922A}
    .dark .ai-boost,
    :global([data-theme="dark"]) .ai-boost{color:#D4AE3A}
    .ai-view{background:rgba(74,144,226,.1);color:#4A90E2}
    
    /* pagination */
    /* ── page number active ── */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active,
    :global([data-theme="dark"]) .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
    
    /* countdown ring */
    @keyframes countRing{from{stroke-dashoffset:var(--full)}to{stroke-dashoffset:var(--end)}}
    .ring-count{animation:countRing 1.4s cubic-bezier(.34,1,.64,1) .3s both}
    
    /* boost card */
    .boost-card{transition:transform .22s,box-shadow .22s,border-color .22s}
    .boost-card:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(10,36,99,.10)}
    .dark .boost-card:hover,
    :global([data-theme="dark"]) .boost-card:hover{box-shadow:0 12px 40px rgba(0,0,0,.36)}
    
    /* property sky gradients — from dashboard */
    .sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
    .sky-2{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
    .sky-3{background:linear-gradient(155deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
    .sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
    .sky-5{background:linear-gradient(160deg,#0E2444 0%,#1a3255 40%,#4A70A0 100%)}
    .sky-6{background:linear-gradient(155deg,#0A2463 0%,#1F3F6A 55%,#4A70A0 100%)}
    
    /* modal */
    .modal-bg{background:rgba(6,14,28,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    
    /* select arrow */
    .sel{position:relative;display:inline-block}
    .sel::after{content:'\25be';position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .sel::after{color:#6A7FA0}
    
    /* performance bar track */
    .perf-track{background:#EDE7DC;border-radius:4px;overflow:hidden}
    .dark .perf-track,
    :global([data-theme="dark"]) .perf-track{background:rgba(255,255,255,.07)}
    
    /* Active boost glow pulse */
    @keyframes boostGlow{0%,100%{box-shadow:0 0 0 0 rgba(212,174,58,.0)}50%{box-shadow:0 0 0 6px rgba(212,174,58,.0)}}
    .boost-active-glow{animation:boostGlow 3s ease infinite}
    .boost-border-active{border-color:rgba(212,174,58,.45)!important}
    .dark .boost-border-active,
    :global([data-theme="dark"]) .boost-border-active{border-color:rgba(212,174,58,.35)!important}
    
    /* view toggle */
    .vtoggle-btn.active{background:#0A2463;color:white}
    .dark .vtoggle-btn.active,
    :global([data-theme="dark"]) .vtoggle-btn.active{background:#4A90E2}
    .vtoggle-btn:not(.active){color:#8C8070}
    .dark .vtoggle-btn:not(.active),
    :global([data-theme="dark"]) .vtoggle-btn:not(.active){color:#6A7FA0}
    
    @media(max-width:768px){
      .grid-cols-boost{grid-template-columns:1fr!important}
      .hide-mobile{display:none!important}
    }
    @media(max-width:640px){
      .stat-4{grid-template-columns:1fr 1fr!important}
      .controls-stack{flex-direction:column!important;align-items:stretch!important}
    }
</style>