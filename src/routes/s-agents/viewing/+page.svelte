<script lang="ts">
  import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";

  type FilterType = 'today' | 'upcoming' | 'past';
  type MTabType = 'details' | 'property' | 'virtual meeting';

  const VIEWINGS = [
  // ── TODAY ──────────────────────────────────────────────
  {
    id: "v001",
    clientName: "Fatima Adeyemi",
    clientInitials: "FA",
    clientAvatarColor: "#4A70A0",
    clientPhone: "+234 805 234 5678",
    clientChatUrl: "https://wa.me/2348001234567",
    date: new Date(new Date().setHours(9, 30, 0, 0)),   // today 09:30
    durationMin: 45,
    type: "virtual",           // "virtual" | "in-person"
    status: "confirmed",       // "confirmed" | "pending" | "completed" | "cancelled"
    meetLink: "https://meet.google.com/abc-defg-hij",
    meetCode: "abc-defg-hij",
    notes: "Client interested in 3-bedroom. Has pre-approval for up to \u20a650M. Second viewing.",
    property: {
      id: "p001",
      title: "3-Bed Apartment, GRA Phase 2",
      address: "14 Peter Odili Road, GRA Phase 2, Port Harcourt",
      price: "\u20a6850,000 / month",
      badge: "For Rent",
      badgeStyle: "sp-active",
      beds: "3 beds",
      baths: "2 baths",
      area: "140 m\u00b2",
      skyClass: "sky-1",
      url: "/agency/listings/p001"
    }
  },
  {
    id: "v002",
    clientName: "Emeka Okonkwo",
    clientInitials: "EO",
    clientAvatarColor: "#C06035",
    clientPhone: "+234 706 789 0123",
    clientChatUrl: "https://wa.me/2348001234567",
    date: new Date(new Date().setHours(11, 0, 0, 0)),   // today 11:00
    durationMin: 60,
    type: "in-person",
    status: "confirmed",
    meetLink: null,
    meetCode: null,
    notes: "Looking for family home. Wants to view master bedroom and kitchen area carefully.",
    property: {
      id: "p002",
      title: "4-Bed Duplex, Woji Estate",
      address: "8 Woji Close, Woji Estate, Port Harcourt",
      price: "\u20a6120,000,000",
      badge: "For Sale",
      badgeStyle: "sp-boosted",
      beds: "4 beds",
      baths: "3 baths",
      area: "240 m\u00b2",
      skyClass: "sky-2",
      url: "/agency/listings/p002"
    }
  },
  {
    id: "v003",
    clientName: "Ngozi Chukwu",
    clientInitials: "NC",
    clientAvatarColor: "#4A7848",
    clientPhone: "+234 803 345 6789",
    clientChatUrl: "https://wa.me/2348001234567",
    date: new Date(new Date().setHours(14, 30, 0, 0)),  // today 14:30
    durationMin: 30,
    type: "virtual",
    status: "pending",
    meetLink: "https://meet.google.com/jkl-mnop-qrs",
    meetCode: "jkl-mnop-qrs",
    notes: "",
    property: {
      id: "p003",
      title: "2-Bed Apartment, Trans-Amadi",
      address: "22 Trans-Amadi Industrial Layout, PH",
      price: "\u20a6450,000 / month",
      badge: "For Rent",
      badgeStyle: "sp-active",
      beds: "2 beds",
      baths: "1 bath",
      area: "90 m\u00b2",
      skyClass: "sky-3",
      url: "/agency/listings/p003"
    }
  },
  {
    id: "v004",
    clientName: "Tunde Williams",
    clientInitials: "TW",
    clientAvatarColor: "#1F3F6A",
    clientPhone: "+234 811 456 7890",
    clientChatUrl: "https://wa.me/2348001234567",
    date: new Date(new Date().setHours(16, 0, 0, 0)),   // today 16:00
    durationMin: 45,
    type: "in-person",
    status: "confirmed",
    meetLink: null,
    meetCode: null,
    notes: "Overseas-based buyer. Accompanied by his sister as proxy. Very serious buyer.",
    property: {
      id: "p004",
      title: "5-Bed Detached, GRA Phase 3",
      address: "4 Lord Lugard Ave, GRA Phase 3, Port Harcourt",
      price: "\u20a6280,000,000",
      badge: "For Sale",
      badgeStyle: "sp-boosted",
      beds: "5 beds",
      baths: "5 baths",
      area: "400 m\u00b2",
      skyClass: "sky-4",
      url: "/agency/listings/p004"
    }
  },
  // ── UPCOMING ─────────────────────────────────────────────
  {
    id: "v005",
    clientName: "Amaka Eze",
    clientInitials: "AE",
    clientAvatarColor: "#B8922A",
    clientPhone: "+234 802 567 8901",
    clientChatUrl: "https://wa.me/2348001234567",
    date: (() => { const d = new Date(); d.setDate(d.getDate()+1); d.setHours(10,0,0,0); return d; })(),
    durationMin: 45,
    type: "virtual",
    status: "confirmed",
    meetLink: "https://meet.google.com/tuv-wxyz-abc",
    meetCode: "tuv-wxyz-abc",
    notes: "First-time buyer. Relocating from Lagos.",
    property: {
      id: "p001",
      title: "3-Bed Apartment, GRA Phase 2",
      address: "14 Peter Odili Road, GRA Phase 2, Port Harcourt",
      price: "\u20a6850,000 / month",
      badge: "For Rent",
      badgeStyle: "sp-active",
      beds: "3 beds",
      baths: "2 baths",
      area: "140 m\u00b2",
      skyClass: "sky-1",
      url: "/agency/listings/p001"
    }
  },
  {
    id: "v006",
    clientName: "Chidi Nwosu",
    clientInitials: "CN",
    clientAvatarColor: "#4A70A0",
    clientPhone: "+234 704 678 9012",
    clientChatUrl: "https://wa.me/2348001234567",
    date: (() => { const d = new Date(); d.setDate(d.getDate()+2); d.setHours(15,30,0,0); return d; })(),
    durationMin: 60,
    type: "in-person",
    status: "pending",
    meetLink: null,
    meetCode: null,
    notes: "",
    property: {
      id: "p005",
      title: "3-Bed Terrace, Rumuola",
      address: "18 Rumuola Road, Rumuola, Port Harcourt",
      price: "\u20a665,000,000",
      badge: "For Sale",
      badgeStyle: "sp-draft",
      beds: "3 beds",
      baths: "2 baths",
      area: "160 m\u00b2",
      skyClass: "sky-5",
      url: "/agency/listings/p005"
    }
  },
  {
    id: "v007",
    clientName: "Sade Adeyemi",
    clientInitials: "SA",
    clientAvatarColor: "#C06035",
    clientPhone: "+234 809 789 0123",
    clientChatUrl: "https://wa.me/2348001234567",
    date: (() => { const d = new Date(); d.setDate(d.getDate()+3); d.setHours(11,0,0,0); return d; })(),
    durationMin: 30,
    type: "virtual",
    status: "confirmed",
    meetLink: "https://meet.google.com/bcd-efgh-ijk",
    meetCode: "bcd-efgh-ijk",
    notes: "Investor, looking for rental yield. Already viewed two other units in the same building.",
    property: {
      id: "p006",
      title: "1-Bed Studio, D-Line",
      address: "7 D-Line Road, Old GRA, Port Harcourt",
      price: "\u20a6280,000 / month",
      badge: "For Rent",
      badgeStyle: "sp-active",
      beds: "1 bed",
      baths: "1 bath",
      area: "52 m\u00b2",
      skyClass: "sky-6",
      url: "/agency/listings/p006"
    }
  },
  // ── PAST ─────────────────────────────────────────────────
  {
    id: "v008",
    clientName: "Rotimi Adeleke",
    clientInitials: "RA",
    clientAvatarColor: "#1F3F6A",
    clientPhone: "+234 701 890 1234",
    clientChatUrl: "https://wa.me/2348001234567",
    date: (() => { const d = new Date(); d.setDate(d.getDate()-1); d.setHours(10,0,0,0); return d; })(),
    durationMin: 45,
    type: "in-person",
    status: "completed",
    meetLink: null,
    meetCode: null,
    notes: "Viewing went well. Client will send formal offer within 48 hours.",
    property: {
      id: "p002",
      title: "4-Bed Duplex, Woji Estate",
      address: "8 Woji Close, Woji Estate, Port Harcourt",
      price: "\u20a6120,000,000",
      badge: "For Sale",
      badgeStyle: "sp-boosted",
      beds: "4 beds",
      baths: "3 baths",
      area: "240 m\u00b2",
      skyClass: "sky-2",
      url: "/agency/listings/p002"
    }
  },
  {
    id: "v009",
    clientName: "Bisi Olatunji",
    clientInitials: "BO",
    clientAvatarColor: "#B8922A",
    clientPhone: "+234 803 901 2345",
    clientChatUrl: "https://wa.me/2348001234567",
    date: (() => { const d = new Date(); d.setDate(d.getDate()-2); d.setHours(14,0,0,0); return d; })(),
    durationMin: 60,
    type: "virtual",
    status: "completed",
    meetLink: null,
    meetCode: null,
    notes: "No follow-up needed. Client has decided to wait 6 months.",
    property: {
      id: "p003",
      title: "2-Bed Apartment, Trans-Amadi",
      address: "22 Trans-Amadi Industrial Layout, PH",
      price: "\u20a6450,000 / month",
      badge: "For Rent",
      badgeStyle: "sp-active",
      beds: "2 beds",
      baths: "1 bath",
      area: "90 m\u00b2",
      skyClass: "sky-3",
      url: "/agency/listings/p003"
    }
  },
  {
    id: "v010",
    clientName: "Zainab Lawal",
    clientInitials: "ZL",
    clientAvatarColor: "#4A7848",
    clientPhone: "+234 706 012 3456",
    clientChatUrl: "https://wa.me/2348001234567",
    date: (() => { const d = new Date(); d.setDate(d.getDate()-3); d.setHours(9,0,0,0); return d; })(),
    durationMin: 30,
    type: "in-person",
    status: "cancelled",
    meetLink: null,
    meetCode: null,
    notes: "Client cancelled due to travel. To be rescheduled.",
    property: {
      id: "p001",
      title: "3-Bed Apartment, GRA Phase 2",
      address: "14 Peter Odili Road, GRA Phase 2, Port Harcourt",
      price: "\u20a6850,000 / month",
      badge: "For Rent",
      badgeStyle: "sp-active",
      beds: "3 beds",
      baths: "2 baths",
      area: "140 m\u00b2",
      skyClass: "sky-1",
      url: "/agency/listings/p001"
    }
  }
];

const STATUS_CONFIG = {
  confirmed: { css: "sp-confirmed", label: "Confirmed" },
  pending:   { css: "sp-pending",   label: "Pending"   },
  completed: { css: "sp-completed", label: "Completed" },
  cancelled: { css: "sp-cancelled", label: "Cancelled" },
};
const TYPE_CONFIG = {
  virtual:   { css: "sp-virtual",   label: "Virtual",   icon: "video" },
  "in-person": { css: "sp-inperson", label: "In-person", icon: "pin"  },
};

  let selectedViewing = $state<any>(null);
  let showDetailsModal = $state(false);
  let selectedFilter = $state<FilterType>('today');
  let selectedMTab = $state<MTabType>('details');
  let list = [1];

  const setFilter = (filter: FilterType) => selectedFilter = filter;

  const setMFilter = (filter: MTabType) => selectedMTab = filter;

  const toggleShowDetailsModal = (viewingId: string) => {
    showDetailsModal = !showDetailsModal;
    selectedViewing = VIEWINGS.find((v) => v.id == viewingId);
  }

  const closeDetailsModal = () => showDetailsModal = false;

  const calculateTabs = (v: any) => {
    return v.type === 'virtual' ? ['details', 'property', 'virtual meeting'] : ['details', 'property']
  }

</script>

{#if showDetailsModal && selectedViewing}
{@const v = selectedViewing}
{@const sCfg = STATUS_CONFIG[v.status as keyof typeof STATUS_CONFIG] || { css: "sp-draft", label: v.status }}
<!-- ══════════════════════════════
     VIEWING DETAIL MODAL
     [SVELTE_COMPONENT: ViewingDetailModal]
══════════════════════════════ -->
<div id="viewingModal" class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="absolute inset-0 modal-overlay" onclick={closeDetailsModal}></div>
  
    <div class="relative bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[680px] max-h-[92vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.22)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden scale-in tt">
  
      <!-- Modal drag handle (mobile) -->
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3.5 flex-shrink-0"></div>
  
      <!-- Modal header -->
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div id="mTypeIcon" class={`${v.type === 'virtual' ? 'bg-blue-bright/10' : 'bg-sage-light'} w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0`}>
            {#if v.type === 'virtual'}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"><path d="M2 4h9a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1zM15 6l-3 2 3 2V6z"></path></svg>
            {:else}
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#4A7848" stroke-width="1.3"><path d="M8 1a5 5 0 015 5c0 4.5-5 9-5 9S3 10.5 3 6a5 5 0 015-5z"></path><circle cx="8" cy="6" r="2"></circle></svg>
            {/if}
        </div>
          <div class="min-w-0">
            <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5" id="mTypeLabel">Virtual viewing</p>
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 leading-none truncate" style="font-size:20px" id="mClientName">Emeka Okonkwo</h2>
          </div>
        </div>
        <div class="flex items-center gap-2 flex-shrink-0">
          <div id="mStatusPill" class={`text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full ${sCfg.css}`}>
            {sCfg.label}
          </div>
          <button aria-label="Close" onclick={closeDetailsModal} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white hover:border-chalk-4 dark:hover:border-white/25 tt bg-transparent cursor-pointer">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
  
      <!-- Modal tab bar -->
      <div class="flex-shrink-0 flex border-b border-chalk-3 dark:border-white/[0.07] px-6 overflow-x-auto scrollbar-hide">
        {#each calculateTabs(v) as t}
            <button onclick={() => setMFilter(t as any)} 
            class:active={t === selectedMTab}
            class="capitalize mtab border-b-2 text-[12px] font-medium px-4 py-3 bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer font-sans whitespace-nowrap tt">
               {t}
            </button>
        {/each}
      </div>
  
      <!-- Modal body (scrollable) -->
      <div class="flex-1 overflow-y-auto scrollbar-hide">
  
        {#if selectedMTab === 'details'}
        <!-- ── TAB 0: Viewing Details ── -->
        <!-- [SVELTE_COMPONENT: ViewingDetailsTab] -->
        <div id="mTab0" class="px-6 py-5 space-y-5">
  
          <!-- Time block -->
          <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-2xl p-5 tt">
            <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Scheduled time</div>
            <div class="flex items-center gap-4 flex-wrap">
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-blue-bright/10 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="3" width="16" height="15" rx="2"/><path d="M2 8h16M6 1v4M14 1v4"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Date</div>
                  <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="mDate">Thu, 14 May 2026</div>
                </div>
              </div>
              <div class="w-px h-8 bg-chalk-3 dark:bg-white/[.08]"></div>
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-ember-light/60 dark:bg-ember/15 flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="10" r="8"/><path d="M10 5v5l3.5 3.5"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Time</div>
                  <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="mTime">11:00 (60 mins)</div>
                </div>
              </div>
              <div class="w-px h-8 bg-chalk-3 dark:bg-white/[.08]"></div>
              <div class="flex items-center gap-2.5">
                <div class="w-9 h-9 rounded-xl bg-sage-light flex items-center justify-center flex-shrink-0">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M10 2a5 5 0 015 5c0 4-5 9-5 9S5 11 5 7a5 5 0 015-5z"/><circle cx="10" cy="7" r="2"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Duration</div>
                  <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="mDuration">60 minutes</div>
                </div>
              </div>
            </div>
            <!-- Countdown badge -->
            <div id="mCountdown" class="hidden mt-3.5 inline-flex items-center gap-2 bg-ember/[.08] border border-ember/20 rounded-full px-3 py-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-ember countdown-live"></span>
              <span class="text-[11px] font-medium text-ember" id="mCountdownText">Starts in –</span>
            </div>
          </div>
  
          <!-- Client block -->
          <div>
            <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Client</div>
            <div class="flex items-center gap-3 p-4 bg-chalk-2 dark:bg-[#131C2E] rounded-2xl tt">
              <div id="mClientAvatar" class="w-11 h-11 rounded-full bg-navy-strong flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0">EO</div>
              <div class="flex-1 min-w-0">
                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="mClientFull">Emeka Okonkwo</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5" id="mClientPhone">+234 706 789 0123</div>
              </div>
              <!-- Chat link (spec requirement) -->
              <a id="mChatLink" href="#" class="flex items-center gap-2 text-[12px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline bg-blue-bright/[.08] dark:bg-blue-bright/[.1] border border-blue-bright/20 px-3 py-1.5 rounded-full tt flex-shrink-0">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 2h12a1 1 0 011 1v7a1 1 0 01-1 1H5.5L2 14V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
                Chat
              </a>
            </div>
          </div>
  
          <!-- Notes -->
          <div id="mNotesBlock">
            <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Notes</div>
            <div class="p-4 bg-chalk-2 dark:bg-[#131C2E] rounded-2xl text-[13px] font-light text-navy-dark dark:text-blue-100 leading-relaxed tt" id="mNotes">
                Looking for family home. Wants to view master bedroom and kitchen area carefully.
            </div>
          </div>
  
          <!-- Quick actions -->
          <div class="flex gap-2.5 flex-wrap">
            <a id="mPropertyLink" href="/agency/listings/01" class="flex items-center gap-2 text-[12px] font-medium text-navy-dark dark:text-blue-100 no-underline bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.08] hover:border-blue-bright/40 px-4 py-2.5 rounded-full tt">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 6l6-4 6 4v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 15V9h4v6" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
              View property
            </a>
            <button onclick={() => {}} class="flex items-center gap-2 text-[12px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.08] hover:border-gold/40 px-4 py-2.5 rounded-full tt cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M1 6h14M5 1v3M11 1v3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              Reschedule
            </button>
            <button id="mCancelBtn" onclick={closeDetailsModal} class="flex items-center gap-2 text-[12px] font-medium text-ember bg-ember-light/40 dark:bg-ember/[.08] border border-ember-light dark:border-ember/20 hover:bg-ember-light hover:border-ember/30 px-4 py-2.5 rounded-full tt cursor-pointer">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              Cancel
            </button>
          </div>
  
        </div><!-- /mTab0 -->
        {/if}
  
        {#if selectedMTab === 'property'}
        <!-- ── TAB 1: Property ── -->
        <!-- [SVELTE_COMPONENT: PropertyPreviewTab] -->
        <div id="mTab1" class="px-6 py-5 space-y-4">
  
          <!-- Property thumbnail card -->
          <div class="rounded-2xl overflow-hidden border border-chalk-3 dark:border-white/[.08] tt">
            <div id="mPropThumb" class="h-[180px] relative sky-1">
              <!-- Inline building illustration (same prop-scene style from dashboard) -->
              <svg class="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 180" fill="none" preserveAspectRatio="xMidYMax meet">
                <rect x="30" y="60" width="60" height="120" rx="3" fill="white" opacity=".25"/>
                <rect x="40" y="40" width="40" height="25" rx="2" fill="white" opacity=".18"/>
                <rect x="120" y="30" width="80" height="150" rx="3" fill="white" opacity=".3"/>
                <rect x="130" y="10" width="60" height="25" rx="2" fill="white" opacity=".2"/>
                <rect x="135" y="44" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".7"/>
                <rect x="152" y="44" width="10" height="14" rx="1" fill="#4A90E2" opacity=".6"/>
                <rect x="169" y="44" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".5"/>
                <rect x="135" y="66" width="10" height="14" rx="1" fill="#4A90E2" opacity=".55"/>
                <rect x="152" y="66" width="10" height="14" rx="1" fill="#D4AE3A" opacity=".65"/>
                <rect x="220" y="50" width="70" height="130" rx="3" fill="white" opacity=".28"/>
                <rect x="230" y="65" width="10" height="13" rx="1" fill="#D4AE3A" opacity=".6"/>
                <rect x="246" y="65" width="10" height="13" rx="1" fill="#4A90E2" opacity=".55"/>
                <rect x="262" y="65" width="10" height="13" rx="1" fill="white" opacity=".35"/>
                <rect x="310" y="70" width="60" height="110" rx="3" fill="white" opacity=".22"/>
              </svg>
              <div class="absolute top-3 left-3 flex gap-1.5">
                <span id="mPropBadge" class="text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">For Rent</span>
              </div>
            </div>
            <div class="p-4 bg-white dark:bg-[#131C2E] tt">
              <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-tight mb-1" style="font-size:19px" id="mPropPrice">
                ₦850,000 / month
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5" id="mPropTitle">
                14 Peter Odili Road, GRA Phase 2, Port Harcourt
              </div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5 mb-3" id="mPropAddress">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1a4 4 0 014 4c0 3.5-4 8-4 8S3 8.5 3 5a4 4 0 014-4z" stroke="currentColor" stroke-width="1.2"/></svg>
                <span id="mPropAddrText">3-Bed Apartment, GRA Phase 2</span>
              </div>
              <div class="flex gap-3 text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-4" id="mPropMeta">
                <span id="mPropBeds" class="flex items-center gap-1"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="1" y="6" width="12" height="6" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M1 9V4a2 2 0 012-2h8a2 2 0 012 2v5" stroke="currentColor" stroke-width="1.1"/></svg>
                3 beds
                </span>
                <span id="mPropBaths" class="flex items-center gap-1"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M1 7a4 4 0 004 4h4a4 4 0 004-4M3 7V3a2 2 0 012-2h.5" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>2 baths</span>
                <span id="mPropArea" class="flex items-center gap-1"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="1" y="1" width="12" height="12" rx="1" stroke="currentColor" stroke-width="1.1"/><path d="M4 4h6M4 7h6M4 10h3" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>140 m²</span>
              </div>
              <a id="mPropFullLink" href="/agency/listings/10" class="flex items-center justify-center gap-2 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:bg-navy-mid dark:hover:bg-blue-link py-2.5 rounded-full no-underline tt">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M2 6l6-4 6 4v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M6 15V9h4v6" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/></svg>
                Open full property listing
              </a>
            </div>
          </div>
  
        </div><!-- /mTab1 -->
        {/if}
  
        {#if selectedMTab === 'virtual meeting'}
        <!-- ── TAB 2: Virtual Meeting ── -->
        <!-- [SVELTE_COMPONENT: VirtualMeetingTab] -->
        <div id="mTab2" class="px-6 py-5 space-y-5">
  
          <!-- Join meeting CTA (spec requirement) -->
          <div id="mJoinSection" class="hidden">
            <div class="bg-blue-bright/[.07] dark:bg-blue-bright/[.1] border border-blue-bright/20 rounded-2xl p-5">
              <div class="flex items-center gap-3 mb-3">
                <!-- Google Meet logo mark -->
                <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style="background:linear-gradient(135deg,#00BFA5 0%,#1A73E8 50%,#EA4335 100%)">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M15 11l2.293-2.293a1 1 0 011.414 0L20 10v4l-1.293 1.293a1 1 0 01-1.414 0L15 13v-2zM4 8a2 2 0 012-2h9a2 2 0 012 2v8a2 2 0 01-2 2H6a2 2 0 01-2-2V8z"/></svg>
                </div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Google Meet</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Virtual viewing session</div>
                </div>
              </div>
              <div class="flex items-center gap-2 mb-3">
                <div class="meet-pill text-[11px] font-medium px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-blue-bright"></span>
                  <span id="mMeetId">meet.google.com/xxx-xxxx-xxx</span>
                </div>
                <button onclick={() => {}} class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent border-none cursor-pointer">Copy</button>
              </div>
              <a id="mJoinBtn" href="#" target="_blank" class="flex items-center justify-center gap-2 text-[13px] font-medium text-white no-underline py-3 rounded-full tt" style="background:linear-gradient(135deg,#1A73E8 0%,#0d5ab3 100%)">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 10l5-3v10l-5-3v-4zM4 6h9a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/></svg>
                Join Google Meet now
              </a>
            </div>
          </div>
  
          <!-- In-person notice (shown when not virtual) -->
          <div id="mInPersonNotice" class="hidden p-5 bg-sage-light dark:bg-sage/[.12] border border-sage/20 rounded-2xl">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-xl bg-sage/20 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M10 2a5 5 0 015 5c0 4-5 9-5 9S5 11 5 7a5 5 0 015-5z"/><circle cx="10" cy="7" r="2"/></svg>
              </div>
              <div>
                <div class="text-[13px] font-medium text-sage">In-person viewing</div>
                <div class="text-[12px] font-light text-sage/80 mt-0.5">This is an in-person viewing. No video link required.</div>
              </div>
            </div>
          </div>
  
          <!-- How to download Google Meet -->
          <div>
            <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Download Google Meet</div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a href="https://apps.apple.com/app/google-meet/id1013231476" target="_blank" class="flex items-center gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.07] rounded-xl no-underline hover:border-blue-bright/40 tt">
                <div class="w-9 h-9 rounded-xl bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" class="text-navy-dark dark:text-blue-100"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Download on</div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">App Store</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="ml-auto text-chalk-muted dark:text-[#6A7FA0]"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.meetings" target="_blank" class="flex items-center gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.07] rounded-xl no-underline hover:border-blue-bright/40 tt">
                <div class="w-9 h-9 rounded-xl bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center flex-shrink-0">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 20.5v-17l17 8.5-17 8.5z" fill="#EA4335"/><path d="M3 3.5l10 10" stroke="#FBBC04" stroke-width="1.2"/><path d="M3 20.5l10-10" stroke="#34A853" stroke-width="1.2"/><path d="M13 13.5l7-4.5" stroke="#4285F4" stroke-width="1.2"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Get it on</div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Google Play</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="ml-auto text-chalk-muted dark:text-[#6A7FA0]"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
              <a href="https://meet.google.com/" target="_blank" class="sm:col-span-2 flex items-center gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.07] rounded-xl no-underline hover:border-blue-bright/40 tt">
                <div class="w-9 h-9 rounded-xl" style="background:linear-gradient(135deg,#1A73E8 0%,#34A853 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                  <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="11" height="12" rx="1.5" stroke="white" stroke-width="1.3"/><path d="M13 8l5-3v10l-5-3V8z" stroke="white" stroke-width="1.3" stroke-linejoin="round"/></svg>
                </div>
                <div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Use in browser</div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">meet.google.com — no install needed</div>
                </div>
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" class="ml-auto text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0"><path d="M5 3l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </a>
            </div>
          </div>
  
          <!-- How to join instructions (spec requirement) -->
          <div>
            <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">How to join a Google Meet</div>
            <div class="space-y-3">
              <div class="flex gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] rounded-xl tt">
                <div class="step-circle flex-shrink-0">1</div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Open Google Meet</div>
                  <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-relaxed">Launch the app on your phone, tablet, or go to <span class="text-blue-link dark:text-blue-bright font-medium">meet.google.com</span> in any browser.</div>
                </div>
              </div>
              <div class="flex gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] rounded-xl tt">
                <div class="step-circle flex-shrink-0">2</div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Sign in with Google</div>
                  <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-relaxed">Use any Gmail account. If you don't have one, create a free account at <span class="text-blue-link dark:text-blue-bright font-medium">accounts.google.com</span>.</div>
                </div>
              </div>
              <div class="flex gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] rounded-xl tt">
                <div class="step-circle flex-shrink-0">3</div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Enter the meeting code</div>
                  <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-relaxed">Click <em class="not-italic font-medium text-navy-dark dark:text-blue-100">"Join a meeting"</em>, then type or paste the meeting code (format: <span class="font-mono text-[11px] text-blue-link dark:text-blue-bright">xxx-xxxx-xxx</span>).</div>
                </div>
              </div>
              <div class="flex gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] rounded-xl tt">
                <div class="step-circle flex-shrink-0">4</div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Allow camera &amp; microphone</div>
                  <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-relaxed">When prompted, allow access to your camera and microphone. You can also join with audio only — click <em class="not-italic font-medium text-navy-dark dark:text-blue-100">"Join now"</em>.</div>
                </div>
              </div>
              <div class="flex gap-3 p-3.5 bg-chalk-2 dark:bg-[#131C2E] rounded-xl tt">
                <div class="step-circle flex-shrink-0">5</div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Conduct the viewing</div>
                  <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-relaxed">Walk the client through the property using your camera. Use screen share to show floor plans, or turn on captions for accessibility.</div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Tips card -->
          <div class="p-4 bg-gold/[.07] border border-gold/20 rounded-xl">
            <div class="flex items-start gap-2.5">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" class="flex-shrink-0 mt-0.5 text-gold"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3M8 10.5v.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <div>
                <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-1">Pro tip</div>
                <div class="text-[11px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-relaxed">Join 5 minutes early to test your camera and audio. Ensure good lighting and a stable internet connection before the client joins.</div>
              </div>
            </div>
          </div>
  
        </div><!-- /mTab2 -->
        {/if}
  
      </div><!-- /modal body -->
  
    </div><!-- /modal card -->
  </div><!-- /viewingModal -->
  {/if}

<!-- ══ LAYOUT SHELL ══ -->
<div class="flex pt-[68px] min-h-screen">
   <SubAgencySidebar />

    <!-- ══════════════════════════════
     MAIN
    ══════════════════════════════ -->
    <main class="flex-1 min-w-0 overflow-x-hidden">

        <!-- Page header -->
        <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
        <div class="max-w-[1100px] mx-auto">
            <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
                <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agent dashboard</p>
                <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
                Viewing <em class="italic text-blue-bright">schedule.</em>
                </h1>
                <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
                <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
                <span id="todayDate">Thursday, 14 May 2026</span>
                &nbsp;&middot;&nbsp;
                <span id="headerCount" class="text-white font-medium">4 viewings</span> viewings shown
                </p>
            </div>
            <!-- Top-right sort control (required spec) -->
            <div class="flex items-center gap-3 flex-wrap">
                <!-- Filter chips (quick access) -->
                <div class="flex gap-1.5">
                {#each ['today', 'upcoming', 'past'] as _}
                <button onclick={() => setFilter(_ as any)} class:active={_ === selectedFilter} class="capitalize fchip text-[11px] font-medium px-3.5 py-[7px] rounded-full border border-chalk-4/60 dark:border-white/10 bg-white/[.08] dark:bg-white/[.06] text-white cursor-pointer tt">
                    {_}
                </button>
                {/each}
                </div>
                <!-- Sort select (spec: top-right) -->
                <div class="sort-wrap">
                <select id="sortSel" onchange={() => {}} class="bg-white/[.1] dark:bg-white/[.07] border border-white/15 text-white text-[12px] font-medium rounded-full px-3.5 py-[7px] pr-7 outline-none cursor-pointer tt">
                    <option value="asc">Earliest first</option>
                    <option value="desc">Latest first</option>
                    <option value="client">Client A–Z</option>
                    <option value="status">By status</option>
                </select>
                </div>
            </div>
            </div>
    
            <!-- Stat strip -->
            <div class="flex gap-5 mt-5 flex-wrap">
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-sage"></span>
                <span class="text-[12px] text-white/50">Confirmed <strong id="statConfirmed" class="text-white font-medium ml-1">3</strong></span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-gold"></span>
                <span class="text-[12px] text-white/50">Pending <strong id="statPending" class="text-white font-medium ml-1">1</strong></span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-blue-bright"></span>
                <span class="text-[12px] text-white/50">Virtual <strong id="statVirtual" class="text-white font-medium ml-1">2</strong></span>
            </div>
            <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-navy-accent"></span>
                <span class="text-[12px] text-white/50">In-person <strong id="statInperson" class="text-white font-medium ml-1">2</strong></span>
            </div>
            </div>
        </div>
        </div>

        <!-- Body content -->
    <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto">

        {#if list.length > 0}
            <!-- Viewing cards grid -->
            <!-- [SVELTE_COMPONENT: ViewingsList] -->
            <div id="viewingsGrid" class="space-y-4">
                <!-- [SVELTE_COMPONENT: ViewingCard] data-id="v001" -->
                <div class="vcard bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl overflow-hidden tt cursor-pointer fu" onclick={() => toggleShowDetailsModal('v001')}>
                <div class="vcard-inner flex" style="min-height:140px;">
                    <!-- Property thumbnail -->
                    <div class="vcard-thumb sky-1 flex-shrink-0 relative" style="width:160px;border-radius:0;">
                    <!-- Mini building illustration -->
                    <svg class="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 160 180" fill="none" preserveAspectRatio="xMidYMax meet">
                        <rect x="10" y="60" width="30" height="120" rx="2" fill="white"></rect>
                        <rect x="50" y="40" width="50" height="140" rx="2" fill="white" opacity=".8"></rect>
                        <rect x="55" y="52" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="68" y="52" width="8" height="10" rx="1" fill="#4A90E2" opacity=".8"></rect>
                        <rect x="55" y="68" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                        <rect x="68" y="68" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="55" y="84" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                        <rect x="68" y="84" width="8" height="10" rx="1" fill="white" opacity=".5"></rect>
                        <rect x="110" y="70" width="40" height="110" rx="2" fill="white" opacity=".7"></rect>
                        <rect x="115" y="82" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".8"></rect>
                        <rect x="128" y="82" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    </svg>
                    <!-- Type pill overlay -->
                    <div class="absolute top-3 left-3"><span class="sp-virtual text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M2 4h9a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1zM15 6l-3 2 3 2V6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>Virtual</span></div>
                    
                    <div class="absolute bottom-3 left-3 right-3">
                        <div class="text-[9px] font-medium text-white/70 bg-navy-deep/60 backdrop-blur-sm px-2 py-1 rounded-lg text-center truncate">
                        abc-defg-hij
                        </div>
                    </div>
                    
                    </div>
                
                    <!-- Card body -->
                    <div class="vcard-body flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                        <!-- Top row: time + status -->
                        <div class="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0]">Today</span>
                            <span class="text-[11px] font-semibold text-navy-dark dark:text-blue-100">09:30</span>
                            <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">45 min</span>
                            </div>
                            
                        </div>
                        <div class="flex items-center gap-1.5 flex-shrink-0"><span class="sp-confirmed text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full">Confirmed</span></div>
                        </div>
                
                        <!-- Client -->
                        <div class="flex items-center gap-2.5 mb-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0" style="background:#4A70A0">FA</div>
                        <div class="min-w-0">
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Fatima Adeyemi</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">+234 805 234 5678</div>
                        </div>
                        </div>
                
                        <!-- Property title -->
                        <div class="flex items-start gap-2">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" class="flex-shrink-0 mt-0.5 text-chalk-muted dark:text-[#6A7FA0]"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        <div class="min-w-0">
                            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">3-Bed Apartment, GRA Phase 2</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate">14 Peter Odili Road, GRA Phase 2, Port Harcourt</div>
                        </div>
                        </div>
                    </div>
                
                    <!-- Bottom row: CTA links -->
                    <div class="flex items-center gap-2.5 mt-3.5 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                        <!-- Property link (spec requirement) -->
                        <a href="/agency/listings/12/p001" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        View property
                        </a>
                        <span class="w-px h-3 bg-chalk-3 dark:bg-white/[.12]"></span>
                        <a href="https://wa.me/2348001234567" target="_blank" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5L2 12V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        Chat
                        </a>
                        
                        <span class="w-px h-3 bg-chalk-3 dark:bg-white/[.12]"></span>
                        <a href="https://meet.google.com/abc-defg-hij" target="_blank" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 3h7a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zM13 5l-3 2 3 2V5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        Join Meet
                        </a>
                        <button onclick={(e) => {
                            e.stopPropagation();
                            toggleShowDetailsModal('v001');
                        }} class="ml-auto flex items-center gap-1 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent border-none cursor-pointer">
                        Details
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: ViewingCard] data-id="v002" -->
                <div class="vcard bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl overflow-hidden tt cursor-pointer fu" onclick={() => toggleShowDetailsModal('v002')}>
                <div class="vcard-inner flex" style="min-height:140px;">
                    <!-- Property thumbnail -->
                    <div class="vcard-thumb sky-2 flex-shrink-0 relative" style="width:160px;border-radius:0;">
                    <!-- Mini building illustration -->
                    <svg class="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 160 180" fill="none" preserveAspectRatio="xMidYMax meet">
                        <rect x="10" y="60" width="30" height="120" rx="2" fill="white"></rect>
                        <rect x="50" y="40" width="50" height="140" rx="2" fill="white" opacity=".8"></rect>
                        <rect x="55" y="52" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="68" y="52" width="8" height="10" rx="1" fill="#4A90E2" opacity=".8"></rect>
                        <rect x="55" y="68" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                        <rect x="68" y="68" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="55" y="84" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                        <rect x="68" y="84" width="8" height="10" rx="1" fill="white" opacity=".5"></rect>
                        <rect x="110" y="70" width="40" height="110" rx="2" fill="white" opacity=".7"></rect>
                        <rect x="115" y="82" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".8"></rect>
                        <rect x="128" y="82" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    </svg>
                    <!-- Type pill overlay -->
                    <div class="absolute top-3 left-3"><span class="sp-inperson text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 1a4 4 0 014 4c0 3.5-4 9-4 9S4 8.5 4 5a4 4 0 014-4z" stroke="currentColor" stroke-width="1.3"></path><circle cx="8" cy="5" r="1.5" stroke="currentColor" stroke-width="1.3"></circle></svg>In-person</span></div>
                    
                    
                    </div>
                
                    <!-- Card body -->
                    <div class="vcard-body flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                        <!-- Top row: time + status -->
                        <div class="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0]">Today</span>
                            <span class="text-[11px] font-semibold text-navy-dark dark:text-blue-100">11:00</span>
                            <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">60 min</span>
                            </div>
                            
                        </div>
                        <div class="flex items-center gap-1.5 flex-shrink-0"><span class="sp-confirmed text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full">Confirmed</span></div>
                        </div>
                
                        <!-- Client -->
                        <div class="flex items-center gap-2.5 mb-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0" style="background:#C06035">EO</div>
                        <div class="min-w-0">
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Emeka Okonkwo</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">+234 706 789 0123</div>
                        </div>
                        </div>
                
                        <!-- Property title -->
                        <div class="flex items-start gap-2">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" class="flex-shrink-0 mt-0.5 text-chalk-muted dark:text-[#6A7FA0]"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        <div class="min-w-0">
                            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">4-Bed Duplex, Woji Estate</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate">8 Woji Close, Woji Estate, Port Harcourt</div>
                        </div>
                        </div>
                    </div>
                
                    <!-- Bottom row: CTA links -->
                    <div class="flex items-center gap-2.5 mt-3.5 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                        <!-- Property link (spec requirement) -->
                        <a href="/agency/listings/p002" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        View property
                        </a>
                        <span class="w-px h-3 bg-chalk-3 dark:bg-white/[.12]"></span>
                        <a href="https://wa.me/2348001234567" target="_blank" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5L2 12V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        Chat
                        </a>
                        
                        <button onclick={(e) => {
                            e.stopPropagation();
                            toggleShowDetailsModal('v002');
                        }}  class="ml-auto flex items-center gap-1 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent border-none cursor-pointer">
                        Details
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: ViewingCard] data-id="v003" -->
                <div class="vcard bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl overflow-hidden tt cursor-pointer fu" onclick={() => toggleShowDetailsModal('v003')}>
                <div class="vcard-inner flex" style="min-height:140px;">
                    <!-- Property thumbnail -->
                    <div class="vcard-thumb sky-3 flex-shrink-0 relative" style="width:160px;border-radius:0;">
                    <!-- Mini building illustration -->
                    <svg class="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 160 180" fill="none" preserveAspectRatio="xMidYMax meet">
                        <rect x="10" y="60" width="30" height="120" rx="2" fill="white"></rect>
                        <rect x="50" y="40" width="50" height="140" rx="2" fill="white" opacity=".8"></rect>
                        <rect x="55" y="52" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="68" y="52" width="8" height="10" rx="1" fill="#4A90E2" opacity=".8"></rect>
                        <rect x="55" y="68" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                        <rect x="68" y="68" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="55" y="84" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                        <rect x="68" y="84" width="8" height="10" rx="1" fill="white" opacity=".5"></rect>
                        <rect x="110" y="70" width="40" height="110" rx="2" fill="white" opacity=".7"></rect>
                        <rect x="115" y="82" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".8"></rect>
                        <rect x="128" y="82" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    </svg>
                    <!-- Type pill overlay -->
                    <div class="absolute top-3 left-3"><span class="sp-virtual text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M2 4h9a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1zM15 6l-3 2 3 2V6z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path></svg>Virtual</span></div>
                    
                    <div class="absolute bottom-3 left-3 right-3">
                        <div class="text-[9px] font-medium text-white/70 bg-navy-deep/60 backdrop-blur-sm px-2 py-1 rounded-lg text-center truncate">
                        jkl-mnop-qrs
                        </div>
                    </div>
                    
                    </div>
                
                    <!-- Card body -->
                    <div class="vcard-body flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                        <!-- Top row: time + status -->
                        <div class="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0]">Today</span>
                            <span class="text-[11px] font-semibold text-navy-dark dark:text-blue-100">14:30</span>
                            <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">30 min</span>
                            </div>
                            
                        </div>
                        <div class="flex items-center gap-1.5 flex-shrink-0"><span class="sp-pending text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full">Pending</span></div>
                        </div>
                
                        <!-- Client -->
                        <div class="flex items-center gap-2.5 mb-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0" style="background:#4A7848">NC</div>
                        <div class="min-w-0">
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Ngozi Chukwu</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">+234 803 345 6789</div>
                        </div>
                        </div>
                
                        <!-- Property title -->
                        <div class="flex items-start gap-2">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" class="flex-shrink-0 mt-0.5 text-chalk-muted dark:text-[#6A7FA0]"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        <div class="min-w-0">
                            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">2-Bed Apartment, Trans-Amadi</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate">22 Trans-Amadi Industrial Layout, PH</div>
                        </div>
                        </div>
                    </div>
                
                    <!-- Bottom row: CTA links -->
                    <div class="flex items-center gap-2.5 mt-3.5 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                        <!-- Property link (spec requirement) -->
                        <a href="/agency/listings/p003" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        View property
                        </a>
                        <span class="w-px h-3 bg-chalk-3 dark:bg-white/[.12]"></span>
                        <a href="https://wa.me/2348001234567" target="_blank" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5L2 12V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        Chat
                        </a>
                        
                        <span class="w-px h-3 bg-chalk-3 dark:bg-white/[.12]"></span>
                        <a href="https://meet.google.com/jkl-mnop-qrs" target="_blank" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 3h7a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V4a1 1 0 011-1zM13 5l-3 2 3 2V5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        Join Meet
                        </a>
                        <button onclick={(e) => {
                            e.stopPropagation();
                            toggleShowDetailsModal('v003');
                        }}  class="ml-auto flex items-center gap-1 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent border-none cursor-pointer">
                        Details
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div>
                <!-- [SVELTE_COMPONENT: ViewingCard] data-id="v004" -->
                <div class="vcard bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl overflow-hidden tt cursor-pointer fu" onclick={() => toggleShowDetailsModal('v004')}>
                <div class="vcard-inner flex" style="min-height:140px;">
                    <!-- Property thumbnail -->
                    <div class="vcard-thumb sky-4 flex-shrink-0 relative" style="width:160px;border-radius:0;">
                    <!-- Mini building illustration -->
                    <svg class="absolute inset-0 w-full h-full opacity-25" viewBox="0 0 160 180" fill="none" preserveAspectRatio="xMidYMax meet">
                        <rect x="10" y="60" width="30" height="120" rx="2" fill="white"></rect>
                        <rect x="50" y="40" width="50" height="140" rx="2" fill="white" opacity=".8"></rect>
                        <rect x="55" y="52" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="68" y="52" width="8" height="10" rx="1" fill="#4A90E2" opacity=".8"></rect>
                        <rect x="55" y="68" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                        <rect x="68" y="68" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".9"></rect>
                        <rect x="55" y="84" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".7"></rect>
                        <rect x="68" y="84" width="8" height="10" rx="1" fill="white" opacity=".5"></rect>
                        <rect x="110" y="70" width="40" height="110" rx="2" fill="white" opacity=".7"></rect>
                        <rect x="115" y="82" width="8" height="10" rx="1" fill="#D4AE3A" opacity=".8"></rect>
                        <rect x="128" y="82" width="8" height="10" rx="1" fill="#4A90E2" opacity=".7"></rect>
                    </svg>
                    <!-- Type pill overlay -->
                    <div class="absolute top-3 left-3"><span class="sp-inperson text-[9px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 16 16" fill="none"><path d="M8 1a4 4 0 014 4c0 3.5-4 9-4 9S4 8.5 4 5a4 4 0 014-4z" stroke="currentColor" stroke-width="1.3"></path><circle cx="8" cy="5" r="1.5" stroke="currentColor" stroke-width="1.3"></circle></svg>In-person</span></div>
                    
                    
                    </div>
                
                    <!-- Card body -->
                    <div class="vcard-body flex-1 min-w-0 p-4 sm:p-5 flex flex-col justify-between">
                    <div>
                        <!-- Top row: time + status -->
                        <div class="flex items-start justify-between gap-2 mb-3">
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                            <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0]">Today</span>
                            <span class="text-[11px] font-semibold text-navy-dark dark:text-blue-100">16:00</span>
                            <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">45 min</span>
                            </div>
                            
                        </div>
                        <div class="flex items-center gap-1.5 flex-shrink-0"><span class="sp-confirmed text-[9px] font-semibold uppercase tracking-[.07em] px-2.5 py-[3px] rounded-full">Confirmed</span></div>
                        </div>
                
                        <!-- Client -->
                        <div class="flex items-center gap-2.5 mb-3">
                        <div class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0" style="background:#1F3F6A">TW</div>
                        <div class="min-w-0">
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Tunde Williams</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">+234 811 456 7890</div>
                        </div>
                        </div>
                
                        <!-- Property title -->
                        <div class="flex items-start gap-2">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none" class="flex-shrink-0 mt-0.5 text-chalk-muted dark:text-[#6A7FA0]"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        <div class="min-w-0">
                            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">5-Bed Detached, GRA Phase 3</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate">4 Lord Lugard Ave, GRA Phase 3, Port Harcourt</div>
                        </div>
                        </div>
                    </div>
                
                    <!-- Bottom row: CTA links -->
                    <div class="flex items-center gap-2.5 mt-3.5 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                        <!-- Property link (spec requirement) -->
                        <a href="/agency/listings/p004" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-blue-link dark:text-blue-bright no-underline hover:underline">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 5.5L7 2l5 3.5V12a1 1 0 01-1 1H3a1 1 0 01-1-1V5.5z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path><path d="M5 13V8h4v5" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        View property
                        </a>
                        <span class="w-px h-3 bg-chalk-3 dark:bg-white/[.12]"></span>
                        <a href="https://wa.me/2348001234567" target="_blank" onclick={(e) => e.stopPropagation()} class="flex items-center gap-1.5 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">
                        <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 2h10a1 1 0 011 1v6a1 1 0 01-1 1H5L2 12V3a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"></path></svg>
                        Chat
                        </a>
                        
                        <button onclick={(e) => {
                            e.stopPropagation();
                            toggleShowDetailsModal('v004');
                        }}  class="ml-auto flex items-center gap-1 text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white tt bg-transparent border-none cursor-pointer">
                        Details
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </button>
                    </div>
                    </div>
                </div>
                </div></div>

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
            <!-- Empty state -->
            <!-- [SVELTE_COMPONENT: EmptyState] -->
            <div id="emptyState" class="empty-state rounded-2xl p-14 text-center">
                <div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.05] flex items-center justify-center mx-auto mb-5">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/></svg>
                </div>
                <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">No viewings <em class="italic">here.</em></h3>
                <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] max-w-[320px] mx-auto" id="emptyMsg">No viewings match the current filter.</p>
            </div>
        {/if}

        </div>

    </main>
</div>

<style>
    /* ── Exact tokens from agent_dashboard.html ── */
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .55s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.29s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .28s cubic-bezier(.22,.68,0,1.2) both}
    
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
    
    /* status pills */
    .sp-confirmed{background:#EFF3EE;color:#4A7848}
    .dark .sp-confirmed,
    :global([data-theme="dark"]).sp-confirmed{background:rgba(74,120,72,.18);color:#7DBF7A}
    .sp-pending{background:#FBF6E9;color:#8A6A10}
    .dark .sp-pending,
    :global([data-theme="dark"]) .sp-pending{background:rgba(212,174,58,.15);color:#D4AE3A}
    .sp-completed{background:#E8EDF5;color:#1F3F6A}
    .dark .sp-completed,
    :global([data-theme="dark"]) .sp-completed{background:rgba(74,112,160,.15);color:#8DAACC}
    .sp-cancelled{background:#F5D5C5;color:#5C2416}
    .dark .sp-cancelled,
    :global([data-theme="dark"]) .sp-cancelled{background:rgba(192,96,53,.15);color:#EDBA9B}
    .sp-inperson{background:#EFF3EE;color:#4A7848}
    .dark .sp-inperson,
    :global([data-theme="dark"]) .sp-inperson{background:rgba(74,120,72,.15);color:#7DBF7A}
    .sp-virtual{background:rgba(74,144,226,.1);color:#1A6ADE}
    .dark .sp-virtual,
    :global([data-theme="dark"]) .sp-virtual{background:rgba(74,144,226,.15);color:#4A90E2}
    
    /* period tab (ptab) — identical to dashboard */
    .ptab.active{background:white;color:#0A2463;box-shadow:0 1px 4px rgba(10,36,99,.12)}
    .dark .ptab.active,
    :global([data-theme="dark"]) .ptab.active{background:#131C2E;color:#E8EDF5}
    
    /* viewing card */
    .vcard{transition:transform .22s,box-shadow .22s,border-color .22s}
    .vcard:hover{transform:translateY(-2px);box-shadow:0 14px 40px rgba(10,36,99,.10)}
    .dark .vcard:hover,
    :global([data-theme="dark"]) .vcard:hover{box-shadow:0 14px 40px rgba(0,0,0,.38)}
    
    /* property thumb gradients (same as dashboard illustrations) */
    .sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
    .sky-2{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
    .sky-3{background:linear-gradient(155deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
    .sky-4{background:linear-gradient(160deg,#0E2444 0%,#1a3255 40%,#4A70A0 100%)}
    .sky-5{background:linear-gradient(155deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
    .sky-6{background:linear-gradient(160deg,#0A2463 0%,#1F3F6A 55%,#4A70A0 100%)}
    
    /* pagination */
    .pg-btn{transition:background .18s,color .18s,border-color .18s}
    .pg-btn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pg-btn.active,
    :global([data-theme="dark"]) .pg-btn.active{background:#4A90E2;border-color:#4A90E2}
    .pg-btn:not(.active):not(:disabled):hover{background:rgba(10,36,99,.06);border-color:rgba(10,36,99,.2)}
    .dark .pg-btn:not(.active):not,
    :global([data-theme="dark"]) .pg-btn:not(.active):not(:disabled):hover{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.15)}
    
    /* modal overlay */
    .modal-overlay{background:rgba(6,14,28,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    
    /* modal tab */
    .mtab.active{border-bottom-color:#4A90E2;color:#0A2463}
    .dark .mtab.active,
    :global([data-theme="dark"]) .mtab.active{color:#E8EDF5;border-bottom-color:#4A90E2}
    .mtab:not(.active){border-bottom-color:transparent;color:#8C8070}
    .dark .mtab:not(.active),
    :global([data-theme="dark"]) .mtab:not(.active){color:#6A7FA0}
    .mtab:not(.active):hover,
    :global([data-theme="dark"]):not(.active):hover {color:#0A2463}
    .dark .mtab:not(.active):hover,
    :global([data-theme="dark"]) .mtab:not(.active):hover{color:#E8EDF5}
    
    /* sort select custom arrow */
    .sort-wrap{position:relative}
    .sort-wrap::after{content:"\25BE";position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .sort-wrap::after{color:#6A7FA0}
    
    /* empty state */
    .empty-state{border:2px dashed #EDE7DC}
    .dark .empty-state{border-color:rgba(255,255,255,.08)}
    
    /* Google Meet colour pill */
    .meet-pill{background:rgba(74,144,226,.1);border:1px solid rgba(74,144,226,.2);color:#1A6ADE}
    .dark .meet-pill,
    :global([data-theme="dark"]) .meet-pill {background:rgba(74,144,226,.12);border-color:rgba(74,144,226,.25);color:#4A90E2}
    
    /* step indicator */
    .step-circle{width:24px;height:24px;border-radius:50%;background:#0A2463;color:white;font-size:11px;font-weight:600;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .dark .step-circle{background:#4A90E2}
    
    /* countdown badge */
    @keyframes countdownPulse{0%,100%{opacity:1}50%{opacity:.6}}
    .countdown-live{animation:countdownPulse 2s infinite}
    
    /* filter chip */
    .fchip.active,.fchip:hover{background:#0A2463;color:white;border-color:#0A2463}
    .dark .fchip.active,.dark .fchip:hover{background:#4A90E2;border-color:#4A90E2}
    
    /* responsive */
    @media(max-width:640px){
      .vcard-inner{flex-direction:column!important}
      .vcard-thumb{width:100%!important;height:140px!important;border-radius:10px 10px 0 0!important}
      .vcard-body{padding:14px!important}
    }
</style>