<script lang="ts">
    import { browser } from '$app/environment';
    import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";
  
    // ── Dark mode
    let dark = $state(false);
    $effect(() => {
      if (!browser) return;
      document.documentElement.classList.toggle('dark', dark);
    });
  
    // ── Bell
    let bellOpen = $state(false);
  
    function toggleBell() {
      bellOpen = !bellOpen;
    }
  
    // Close bell on outside click — handled via Svelte event
    function handleDocClick(e: MouseEvent) {
      if (!bellOpen) return;
      const target = e.target as Element;
      if (!target.closest('[data-bell-trigger]') && !target.closest('[data-bell-panel]')) {
        bellOpen = false;
      }
      if (!target.closest('[data-assign-dd]') && !target.closest('[data-assign-trigger]')) {
        openDD = null;
      }
    }
  
    // ── Sidebar
    let sbOpen = $state(false);
  
    function toggleSb() { sbOpen = !sbOpen; }
    function closeSb()  { sbOpen = false; }
  
    // ── Filter
    let activeFilter = $state<'all' | 'virtual' | 'inperson'>('all');
  
    // ── Drag & drop
    let dragCardId = $state<string | null>(null);
    let dragOverCol = $state<string | null>(null);
  
    type ColKey = 'new' | 'assigned' | 'inprogress' | 'completed';
    type CardType = 'virtual' | 'inperson';
    type Priority = 'high' | 'medium' | 'low' | null;
  
    interface Agent { initials: string; bg: string; name: string; label?: string }
    interface Viewer { initials: string; bg: string; }
    interface KCard {
      id: string;
      type: CardType;
      priority?: Priority;
      title: string;
      subtitle: string;
      timeAgo: string;
      // assigned agent
      agent?: Agent;
      // requestor avatars
      viewers?: Viewer[];
      viewerLabel?: string;
      // bottom row
      datetime?: string;
      assignable?: boolean;        // show "+ Me" button
      statusBadge?: string;        // "Live now" / "Live" / "Done"
      statusBadgeClass?: string;
      liveLabel?: string;          // pulsing text at bottom
      completedLabel?: string;     // "Completed Mon, 5 May"
      col: ColKey;
      opacity80?: boolean;
    }
  
    let cards = $state<KCard[]>([
      // ── New Requests
      {
        id: 'card1', type: 'virtual', priority: 'high', col: 'new',
        title: '3-Bed Apartment, GRA Phase 2',
        subtitle: 'Port Harcourt · ₦1.8m/yr · Virtual tour requested',
        timeAgo: '2m ago',
        viewers: [
          { initials:'CI', bg:'bg-navy-strong' },
          { initials:'AM', bg:'bg-ember' },
          { initials:'+4', bg:'bg-sage' },
        ],
        viewerLabel: '6 viewers',
        datetime: 'Tue, 6 May · 10:00 AM',
        assignable: true,
      },
      {
        id: 'card2', type: 'inperson', priority: 'medium', col: 'new',
        title: '4-Bed Duplex, Woji Estate',
        subtitle: 'Port Harcourt · ₦2.4m/yr · On-site viewing',
        timeAgo: '18m ago',
        viewers: [{ initials:'NK', bg:'bg-gold' }],
        viewerLabel: 'Ngozi K. · 08031234567',
        datetime: 'Wed, 7 May · 2:00 PM',
        assignable: true,
      },
      {
        id: 'card3', type: 'virtual', priority: 'low', col: 'new',
        title: '2-Bed Flat, Trans Amadi',
        subtitle: 'Port Harcourt · ₦900k/yr · Virtual walkthrough',
        timeAgo: '1h ago',
        viewers: [
          { initials:'TU', bg:'bg-blue-bright' },
          { initials:'+2', bg:'bg-navy-mid' },
        ],
        viewerLabel: '3 viewers',
        datetime: 'Thu, 8 May · 11:00 AM',
        assignable: true,
      },
      // ── Assigned
      {
        id: 'card4', type: 'inperson', col: 'assigned',
        title: '5-Bed Detached, Rumuola',
        subtitle: 'Port Harcourt · ₦3.5m/yr · Inspection requested',
        timeAgo: '3h ago',
        agent: { initials:'CO', bg:'bg-navy-strong', name:'Chukwuemeka O.', label:'assigned' },
        viewers: [
          { initials:'BU', bg:'bg-ember-deep' },
        ],
        viewerLabel: 'Bose U. · 08098765432',
        datetime: 'Fri, 9 May · 9:30 AM',
      },
      {
        id: 'card5', type: 'virtual', col: 'assigned',
        title: '3-Bed Terrace, Eliozu',
        subtitle: 'Port Harcourt · ₦1.2m/yr · Group virtual session',
        timeAgo: '5h ago',
        agent: { initials:'AM', bg:'bg-ember', name:'Adaeze M.', label:'assigned' },
        viewers: [
          { initials:'JA', bg:'bg-blue-bright' },
          { initials:'+7', bg:'bg-sage' },
        ],
        viewerLabel: '8 viewers',
        datetime: 'Sat, 10 May · 3:00 PM',
      },
      // ── In Progress
      {
        id: 'card6', type: 'inperson', col: 'inprogress',
        title: '2-Bed Flat, Rumuigbo',
        subtitle: 'Port Harcourt · ₦750k/yr · Active visit',
        timeAgo: '',
        statusBadge: 'Live now',
        statusBadgeClass: 'bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B]',
        agent: { initials:'KU', bg:'bg-gold', name:'Kelechi U.' },
        viewers: [{ initials:'IO', bg:'bg-navy-accent' }],
        viewerLabel: 'Ifeoma O. · 08155551234',
        liveLabel: 'Started 14 min ago',
        liveDot: 'bg-ember',
      } as KCard & { liveDot?: string },
      {
        id: 'card7', type: 'virtual', col: 'inprogress',
        title: '4-Bed Semi-Detached, Peter Odili',
        subtitle: 'Port Harcourt · ₦2.8m/yr · Zoom session active',
        timeAgo: '',
        statusBadge: 'Live',
        statusBadgeClass: 'bg-blue-bright/10 text-blue-link dark:text-blue-bright',
        statusBadgePulse: 'bg-blue-bright',
        agent: { initials:'EA', bg:'bg-navy-strong', name:'Emeka A.' },
        viewers: [
          { initials:'SC', bg:'bg-blue-bright' },
          { initials:'+3', bg:'bg-ember' },
        ],
        viewerLabel: '4 on the call',
        liveLabel: 'Session started 30m ago',
        liveDot: 'bg-blue-bright',
      } as KCard & { liveDot?: string; statusBadgePulse?: string },
      // ── Completed
      {
        id: 'card8', type: 'inperson', col: 'completed', opacity80: true,
        title: '3-Bed Bungalow, Borokiri',
        subtitle: 'Port Harcourt · ₦1.1m/yr · Visit completed',
        timeAgo: '',
        statusBadge: 'Done',
        statusBadgeClass: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
        statusBadgeCheck: true,
        agent: { initials:'AM', bg:'bg-ember', name:'Adaeze M.' },
        viewers: [{ initials:'CP', bg:'bg-navy-accent' }],
        viewerLabel: 'Chidi P.',
        completedLabel: 'Completed Mon, 5 May',
      },
      {
        id: 'card9', type: 'virtual', col: 'completed', opacity80: true,
        title: '6-Bed Mansion, Old GRA',
        subtitle: 'Port Harcourt · ₦8m/yr · Virtual tour done',
        timeAgo: '',
        statusBadge: 'Done',
        statusBadgeClass: 'bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
        statusBadgeCheck: true,
        agent: { initials:'CO', bg:'bg-navy-strong', name:'Chukwuemeka O.' },
        viewers: [
          { initials:'LB', bg:'bg-gold' },
          { initials:'+5', bg:'bg-blue-bright' },
        ],
        viewerLabel: '6 viewers',
        completedLabel: 'Completed Sun, 4 May',
      },
    ]);
  
    // ── Assign "me" state per card
    let assignedMe = $state<Record<string, boolean>>({});
  
    function assignToMe(cardId: string) {
      assignedMe = { ...assignedMe, [cardId]: true };
    }
  
    // ── Assign dropdown
    let openDD = $state<string | null>(null);          // card id whose DD is open
    // per-card assigned-agent override from dropdown
    let assignedAgents = $state<Record<string, { initials: string; bg: string; name: string }>>({});
  
    const agentOptions = [
      { initials: 'EA', bg: 'bg-navy-strong', name: 'Emeka A.', you: true },
      { initials: 'CO', bg: 'bg-navy-mid',    name: 'Chukwuemeka O.' },
      { initials: 'AM', bg: 'bg-ember',        name: 'Adaeze M.' },
      { initials: 'KU', bg: 'bg-gold',         name: 'Kelechi U.' },
    ];
  
    function toggleAssignDD(cardId: string, e: Event) {
      e.stopPropagation();
      openDD = openDD === cardId ? null : cardId;
    }
  
    function doAssign(cardId: string, agent: typeof agentOptions[0], e: Event) {
      e.stopPropagation();
      assignedAgents = { ...assignedAgents, [cardId]: agent };
      openDD = null;
    }
  
    // ── Drag & drop
    function onDragStart(e: DragEvent, id: string) {
      dragCardId = id;
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => {}, 0);
    }
    function onDragOver(e: DragEvent, col: ColKey) {
      e.preventDefault();
      if (e.dataTransfer) e.dataTransfer.dropEffect = 'move';
      dragOverCol = col;
    }
    function onDragLeave(col: ColKey) {
      if (dragOverCol === col) dragOverCol = null;
    }
    function onDrop(e: DragEvent, col: ColKey) {
      e.preventDefault();
      dragOverCol = null;
      if (dragCardId) {
        cards = cards.map(c => c.id === dragCardId ? { ...c, col } : c);
        dragCardId = null;
      }
    }
    function onDragEnd() { dragCardId = null; dragOverCol = null; }
  
    // ── Modal
    let modalOpen = $state(false);
    let activeCardId = $state<string | null>(null);
  
    function openModal(id: string) { activeCardId = id; modalOpen = true; }
    function closeModal() { modalOpen = false; activeCardId = null; }
    function handleModalBg(e: MouseEvent) {
      if ((e.target as Element).hasAttribute('data-modal-bg')) closeModal();
    }
  
    // ── Move from modal
    let toast = $state('');
    let toastVisible = $state(false);
    let toastTimer: ReturnType<typeof setTimeout>;
  
    function showToast(msg: string) {
      toast = msg;
      toastVisible = true;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => { toastVisible = false; }, 2800);
    }
  
    function moveCard(col: ColKey) {
      if (activeCardId) {
        cards = cards.map(c => c.id === activeCardId ? { ...c, col } : c);
      }
      closeModal();
      const labels: Record<ColKey, string> = {
        new: 'New Requests', assigned: 'Assigned',
        inprogress: 'In Progress', completed: 'Completed',
      };
      showToast('Task moved to ' + labels[col]);
    }
  
    // ── Derived: cards per column (filtered)
    const cols: { key: ColKey; label: string; count: number }[] = [
      { key: 'new',         label: 'New Requests', count: 5 },
      { key: 'assigned',    label: 'Assigned',      count: 4 },
      { key: 'inprogress',  label: 'In Progress',   count: 3 },
      { key: 'completed',   label: 'Completed',     count: 8 },
    ];
  
    function visibleCards(col: ColKey) {
      return cards.filter(c => c.col === col && (activeFilter === 'all' || c.type === activeFilter));
    }
  
    // ── Column header dot/count classes
    const colDot: Record<ColKey, string> = {
      new:        'bg-blue-bright',
      assigned:   'bg-gold',
      inprogress: 'bg-ember',
      completed:  'bg-sage',
    };
    const colCountClass: Record<ColKey, string> = {
      new:        'bg-blue-bright/10 text-blue-link dark:bg-blue-bright/20 dark:text-[#7BB8F0]',
      assigned:   'bg-gold/12 text-[#8A6A10] dark:bg-gold/18 dark:text-gold',
      inprogress: 'bg-ember/10 text-ember dark:bg-ember/18 dark:text-[#EDBA9B]',
      completed:  'bg-sage/10 text-sage dark:bg-sage/20 dark:text-[#7DBF7A]',
    };
  </script>
  
  <svelte:head>
    <title>Blupodd — Tasks</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  </svelte:head>
  
  <!-- Global click handler for closing dropdowns/bell -->
  <svelte:document onclick={handleDocClick} />
  
  <svelte:window on:dragend={onDragEnd} />
  
  <div class="font-sans bg-chalk dark:bg-navy-deep text-navy-dark dark:text-blue-100 overflow-x-hidden tt min-h-screen">
 
  
  <!-- ══ LAYOUT ══ -->
  <div class="flex pt-[68px] min-h-screen">
  
    <SubAgencySidebar />
  
    <!-- ══ MAIN ══ -->
    <main class="flex-1 min-w-0 overflow-x-hidden">
      <div class="px-[5vw] lg:px-10 py-8">
  
        <!-- Page header -->
        <div class="flex flex-wrap items-start justify-between gap-4 mb-6 fu">
          <div>
            <p class="text-[10px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Agency Tools</p>
            <h1 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:clamp(26px,4vw,34px)">Viewing Tasks</h1>
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mt-1">Manage and assign property viewing requests across your team</p>
          </div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <!-- Filter chips -->
            <div class="flex items-center gap-1.5 bg-chalk-2 dark:bg-[#131C2E] rounded-full p-1">
              {#each [['all','All'],['virtual','Virtual'],['inperson','In-Person']] as [val, label]}
              <button
                onclick={() => activeFilter = val as typeof activeFilter}
                class="fchip text-[12px] font-medium px-3.5 py-[6px] rounded-full border border-transparent cursor-pointer tt {activeFilter === val ? 'bg-white dark:bg-[#1A2438] text-navy-dark dark:text-blue-100 shadow-sm' : 'text-chalk-muted dark:text-[#6A7FA0] bg-transparent'}"
              >{label}</button>
              {/each}
            </div>
            <!-- <button
              onclick={() => openModal('new')}
              class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-4 py-[9px] rounded-full border-none cursor-pointer tt flex-shrink-0"
            >
              <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
              New task
            </button> -->
          </div>
        </div>
  
        <!-- Summary chips -->
        <div class="flex flex-wrap gap-2 mb-7 fu d1">
          <span class="text-[12px] font-medium bg-blue-bright/10 text-blue-link dark:text-blue-bright px-3 py-[6px] rounded-full flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-blue-bright pulse-dot"></span>5 New</span>
          <span class="text-[12px] font-medium bg-gold/15 text-[#8A6A10] dark:text-gold px-3 py-[6px] rounded-full">4 Assigned</span>
          <span class="text-[12px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-3 py-[6px] rounded-full">3 In Progress</span>
          <span class="text-[12px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-3 py-[6px] rounded-full">8 Completed</span>
        </div>
  
        <!-- ══ KANBAN BOARD ══ -->
        <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 fu d2">
  
          {#each cols as col}
          {@const colCards = visibleCards(col.key)}
          <div
            class="kcol {`col-${col.key}`} flex flex-col gap-3 bg-chalk-2 dark:bg-[#0A1020] border border-chalk-3 dark:border-white/[.05] rounded-2xl p-3 min-h-[200px] tt {dragOverCol === col.key ? 'drag-over' : ''}"
            ondragover={(e) => onDragOver(e, col.key)}
            ondrop={(e) => onDrop(e, col.key)}
            ondragleave={() => onDragLeave(col.key)}
          >
            <!-- Column header -->
            <div class="flex items-center gap-2 px-1 mb-1">
              <span class="col-dot w-2 h-2 rounded-full flex-shrink-0 {colDot[col.key]}"></span>
              <span class="text-[12px] font-semibold text-navy-dark dark:text-blue-100 tracking-[.04em]">{col.label}</span>
              <span class="col-count ml-auto text-[11px] font-medium px-2 py-[2px] rounded-full {colCountClass[col.key]}">{col.count}</span>
            </div>
  
            <!-- Cards -->
            {#each colCards as card (card.id)}
            {@const c = card as KCard & { liveDot?: string; statusBadgePulse?: string; statusBadgeCheck?: boolean }}
            {@const meAssigned = assignedMe[card.id]}
            {@const agentOverride = assignedAgents[card.id]}
            <div
              class="kcard bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.07] rounded-xl p-4 shadow-[0_2px_8px_rgba(10,36,99,.06)] dark:shadow-none {card.opacity80 ? 'opacity-80' : ''} {dragCardId === card.id ? 'opacity-40' : ''}"
              draggable="true"
              ondragstart={(e) => onDragStart(e, card.id)}
              onclick={() => openModal(card.id)}
              role="button"
              tabindex="0"
            >
              <!-- Top row: type badge + time/status -->
              <div class="flex items-start justify-between mb-2.5">
                <div class="flex items-center gap-1.5">
                  {#if card.priority}
                  <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-0.5 pri-{card.priority}"></span>
                  {/if}
                  {#if card.type === 'virtual'}
                  <span class="vt-virtual text-[10px] font-medium px-2 py-[3px] rounded-full flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="9" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 6l3-2v6l-3-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    Virtual
                  </span>
                  {:else}
                  <span class="vt-inperson text-[10px] font-medium px-2 py-[3px] rounded-full flex items-center gap-1">
                    <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
                    In-Person
                  </span>
                  {/if}
                </div>
                {#if card.statusBadge}
                <span class="text-[10px] font-medium px-2 py-[2px] rounded-full flex items-center gap-1 {card.statusBadgeClass}">
                  {#if c.statusBadgePulse}
                  <span class="w-1.5 h-1.5 rounded-full pulse-dot {c.statusBadgePulse}"></span>
                  {/if}
                  {#if c.statusBadgeCheck}
                  <svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  {/if}
                  {card.statusBadge}
                </span>
                {:else if card.timeAgo}
                <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">{card.timeAgo}</span>
                {/if}
              </div>
  
              <!-- Me assigned row (if user clicked + Me) -->
              {#if meAssigned}
              <div class="flex items-center gap-2 mb-1">
                <div class="w-5 h-5 rounded-full bg-navy-strong flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">EA</div>
                <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100">You (Emeka A.)</span>
                <span class="text-[10px] text-blue-bright ml-1">✓</span>
              </div>
              {/if}
  
              <!-- Assigned agent (from card data or dropdown override) -->
              {#if agentOverride || card.agent}
              {@const ag = agentOverride ?? card.agent!}
              <div class="flex items-center gap-2 mb-1.5">
                <div class="w-5 h-5 rounded-full {ag.bg} flex items-center justify-center text-[8px] font-bold text-white flex-shrink-0">{ag.initials}</div>
                <span class="text-[11px] text-navy-dark dark:text-blue-100 font-medium">{ag.name}</span>
                {#if card.agent?.label}<span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">{card.agent.label}</span>{/if}
              </div>
              {/if}
  
              <!-- Title -->
              <a href="#" onclick={(e) => e.stopPropagation()} class="text-[13px] font-semibold text-navy-dark dark:text-blue-100 no-underline hover:text-blue-link block mb-1 leading-snug">{card.title}</a>
              <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">{card.subtitle}</p>
  
              <!-- Viewers / avatars -->
              {#if card.viewers && card.viewers.length > 0}
              <div class="flex items-center gap-2 mb-{card.datetime || c.liveLabel || card.completedLabel ? '3' : '0'}">
                <div class="av-stack flex">
                  {#each card.viewers as v}
                  <div class="av w-6 h-6 rounded-full {v.bg} flex items-center justify-center text-[9px] font-semibold text-white flex-shrink-0">{v.initials}</div>
                  {/each}
                </div>
                {#if card.viewerLabel}
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">{card.viewerLabel}</span>
                {/if}
              </div>
              {/if}
  
              <!-- Bottom row: datetime + action OR live label OR completed label -->
              {#if card.datetime}
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                  <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                  {card.datetime}
                </div>
                {#if card.assignable}
                  {#if meAssigned}
                  <button class="text-[11px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2.5 py-[4px] rounded-full border-none cursor-pointer tt">Assigned</button>
                  {:else}
                  <!-- Reassign dropdown for assigned col -->
                  {#if col.key === 'assigned'}
                  <div class="relative" onclick={(e) => e.stopPropagation()}>
                    <button
                      data-assign-trigger
                      onclick={(e) => toggleAssignDD(card.id, e)}
                      class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] hover:bg-chalk-3 dark:hover:bg-white/10 px-2.5 py-[4px] rounded-full border-none cursor-pointer tt"
                    >Reassign ▾</button>
                    {#if openDD === card.id}
                    <div data-assign-dd class="assign-dd open bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-xl shadow-[0_8px_32px_rgba(10,36,99,.15)] dark:shadow-[0_8px_32px_rgba(0,0,0,.5)] w-[180px] overflow-hidden">
                      <div class="px-3 pt-3 pb-1 text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Assign to</div>
                      {#each agentOptions as ag}
                      <button
                        onclick={(e) => doAssign(card.id, ag, e)}
                        class="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-chalk-2 dark:hover:bg-white/[.04] tt text-left cursor-pointer bg-transparent border-none font-sans"
                      >
                        <div class="w-6 h-6 rounded-full {ag.bg} flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0">{ag.initials}</div>
                        <span class="text-[12px] text-navy-dark dark:text-blue-100">{ag.name}</span>
                        {#if ag.you}<span class="ml-auto text-[10px] text-sage">You</span>{/if}
                      </button>
                      {/each}
                    </div>
                    {/if}
                  </div>
                  {:else}
                  <button
                    onclick={(e) => { e.stopPropagation(); assignToMe(card.id); }}
                    class="text-[11px] font-medium text-blue-link dark:text-blue-bright bg-blue-bright/10 hover:bg-blue-bright/20 px-2.5 py-[4px] rounded-full border-none cursor-pointer tt"
                  >+ Me</button>
                  {/if}
                  {/if}
                {/if}
              </div>
              {:else if c.liveLabel}
              <div class="flex items-center gap-1.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                <span class="w-1.5 h-1.5 rounded-full pulse-dot flex-shrink-0 {c.liveDot ?? 'bg-ember'}"></span>
                {c.liveLabel}
              </div>
              {:else if card.completedLabel}
              <div class="flex items-center gap-1.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M4.5 7l2 2 3-3" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                {card.completedLabel}
              </div>
              {/if}
  
            </div>
            {/each}
  
          </div>
          {/each}
  
        </div><!-- /kanban -->
      </div>
    </main>
  </div><!-- /flex -->
  
  <!-- ══ TASK DETAIL MODAL ══ -->
  {#if modalOpen}
  <div
    data-modal-bg
    class="fixed inset-0 z-[500] bg-navy-deep/65 flex items-end sm:items-center justify-center p-0 sm:p-4"
    style="backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)"
    onclick={handleModalBg}
  >
    <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[580px] max-h-[92vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.28)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden tt scale-in">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3 flex-shrink-0"></div>
      <!-- Modal header -->
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-start justify-between gap-3">
        <div class="min-w-0">
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Viewing Request</p>
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100 leading-snug" style="font-size:22px">3-Bed Apartment, GRA Phase 2</h2>
        </div>
        <button onclick={closeModal} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted hover:text-navy-dark dark:hover:text-white tt cursor-pointer bg-transparent flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <!-- Scrollable body -->
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 space-y-5">
        <!-- Property + type row -->
        <div class="flex flex-wrap items-center gap-2">
          <span class="vt-virtual text-[11px] font-medium px-3 py-[5px] rounded-full flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="9" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M10 6l3-2v6l-3-2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Virtual Viewing
          </span>
          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Port Harcourt · ₦1.8m/yr</span>
          <a href="#" class="ml-auto text-[11px] text-blue-link dark:text-blue-bright hover:underline no-underline">View listing →</a>
        </div>
  
        <!-- Date/time -->
        <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 tt">
          <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Requested Date &amp; Time</div>
          <div class="flex items-center gap-2 text-[13px] font-medium text-navy-dark dark:text-blue-100">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            Tuesday, 6 May 2026 · 10:00 AM – 11:00 AM
          </div>
        </div>
  
        <!-- Requestors -->
        <div>
          <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Requesting Users (6)</div>
          <div class="space-y-2.5">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-navy-strong flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">CI</div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Chidi Ibe</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">chidi.ibe@email.com · 08011234567</div>
              </div>
              <span class="text-[10px] font-medium bg-blue-bright/10 text-blue-link dark:text-blue-bright px-2 py-[3px] rounded-full flex-shrink-0">Primary</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-ember flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">AM</div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Adaeze M.</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">adaeze.m@email.com</div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 rounded-full bg-sage flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0">TU</div>
              <div class="min-w-0 flex-1">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Tunde U.</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">tunde.u@email.com</div>
              </div>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] pl-0.5">+3 more attendees</div>
          </div>
        </div>
  
        <!-- Assigned agent -->
        <div>
          <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2.5">Assigned Agent</div>
          <div class="flex items-center gap-3 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3 tt">
            <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-bold text-white ring-2 ring-blue-bright/20 flex-shrink-0">CO</div>
            <div class="flex-1 min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Chukwuemeka Okafor</div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Agent · Premier Properties PH</div>
            </div>
            <button class="text-[11px] font-medium text-blue-link dark:text-blue-bright bg-blue-bright/10 hover:bg-blue-bright/20 px-3 py-[6px] rounded-full border-none cursor-pointer tt">Reassign</button>
          </div>
        </div>
  
        <!-- Notes -->
        <div>
          <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Notes</div>
          <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3.5 text-[13px] text-navy-dark dark:text-blue-100 leading-[1.65] tt">Clients are interested in the master bedroom size and the parking availability. One viewer is flying in from Lagos and needs confirmation by Thursday.</div>
        </div>
  
        <!-- Move status -->
        <div>
          <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2.5">Move to</div>
          <div class="flex flex-wrap gap-2">
            <button onclick={() => moveCard('new')} class="move-btn text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] px-3.5 py-[7px] rounded-full cursor-pointer tt flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></span>New</button>
            <button onclick={() => moveCard('assigned')} class="move-btn text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] px-3.5 py-[7px] rounded-full cursor-pointer tt flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-gold flex-shrink-0"></span>Assigned</button>
            <button onclick={() => moveCard('inprogress')} class="move-btn text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] px-3.5 py-[7px] rounded-full cursor-pointer tt flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-ember flex-shrink-0"></span>In Progress</button>
            <button onclick={() => moveCard('completed')} class="move-btn text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] px-3.5 py-[7px] rounded-full cursor-pointer tt flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-sage flex-shrink-0"></span>Completed</button>
          </div>
        </div>
      </div>
      <!-- Footer -->
      <div class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-chalk-3 dark:border-white/[.08] flex gap-3">
        <button onclick={closeModal} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Close</button>
        <button onclick={closeModal} class="flex-1 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Save changes</button>
      </div>
    </div>
  </div>
  {/if}
  
  <!-- ══ TOAST ══ -->
  {#if toastVisible}
  <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999] bg-navy-dark dark:bg-[#131C2E] text-white text-[13px] font-medium px-5 py-3 rounded-full shadow-[0_8px_32px_rgba(10,36,99,.3)] flex items-center gap-2 tt" style="transition:opacity .3s,transform .3s">
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="#4A90E2" stroke-width="1.3"/><path d="M5.5 8l2 2 3-3" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
    {toast}
  </div>
  {/if}
  
  </div>
  
  <style>
    /* Tailwind config — injected via app.css / tailwind.config.js in real SvelteKit project.
       Keep these as-is; they replicate the inline config from the original HTML. */
  
    .tt { transition: background-color .3s, color .3s, border-color .3s; }
    select { -webkit-appearance: none; appearance: none; }
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  
    @keyframes pulse-dot {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: .4; transform: scale(.8); }
    }
    .pulse-dot { animation: pulse-dot 2.2s infinite; }
  
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fu  { animation: fadeUp .55s ease both; }
    .d1  { animation-delay: .04s; }
    .d2  { animation-delay: .09s; }
    .d3  { animation-delay: .14s; }
    .d4  { animation-delay: .19s; }
    .d5  { animation-delay: .24s; }
  
    @keyframes scaleIn {
      from { opacity: 0; transform: scale(.97) translateY(10px); }
      to   { opacity: 1; transform: scale(1) translateY(0); }
    }
    .scale-in { animation: scaleIn .28s cubic-bezier(.22,.68,0,1.2) both; }
  
    /* Sidebar */
    :global(.sb-link.active) { background: rgba(74,144,226,.12); color: #4A90E2; font-weight: 500; }
    :global(.dark .sb-link.active) { background: rgba(74,144,226,.15); }
    :global(.sb-link:not(.active):hover) { background: rgba(10,36,99,.05); }
    :global(.dark .sb-link:not(.active):hover) { background: rgba(255,255,255,.04); }
  
    /* Kanban card */
    :global(.kcard) { transition: box-shadow .22s, border-color .22s, transform .18s; cursor: pointer; }
    :global(.kcard:hover) { transform: translateY(-2px); box-shadow: 0 10px 32px rgba(10,36,99,.12); border-color: rgba(74,144,226,.3) !important; }
    :global(.dark .kcard:hover) { box-shadow: 0 10px 32px rgba(0,0,0,.4); border-color: rgba(74,144,226,.25) !important; }
  
    /* Column drag target */
    :global(.kcol.drag-over) { background: rgba(74,144,226,.04); border-color: rgba(74,144,226,.25) !important; }
    :global(.dark .kcol.drag-over) { background: rgba(74,144,226,.06); }
  
    /* Avatar stack */
    :global(.av-stack .av) { margin-left: -6px; box-shadow: 0 0 0 2px white; }
    :global(.dark .av-stack .av) { box-shadow: 0 0 0 2px #0D1422; }
    :global(.av-stack .av:first-child) { margin-left: 0; }
  
    /* Viewing type badges */
    :global(.vt-virtual)  { background: rgba(74,144,226,.1); color: #1A6ADE; }
    :global(.dark .vt-virtual)  { background: rgba(74,144,226,.18); color: #7BB8F0; }
    :global(.vt-inperson) { background: rgba(74,120,72,.1); color: #4A7848; }
    :global(.dark .vt-inperson) { background: rgba(74,120,72,.18); color: #7DBF7A; }
  
    /* Priority dots */
    :global(.pri-high)   { background: #DC2626; }
    :global(.pri-medium) { background: #D97706; }
    :global(.pri-low)    { background: #4A7848; }
  
    /* Assign dropdown */
    :global(.assign-dd) { position: absolute; right: 0; top: calc(100% + 6px); z-index: 50; }
  
    /* Move button */
    :global(.move-btn) { transition: background .18s, color .18s, opacity .18s; }
    :global(.move-btn:hover) { opacity: .85; }
  
    /* Col header accent */
    :global(.col-new .col-dot)        { background: #4A90E2; }
    :global(.col-assigned .col-dot)   { background: #D4AE3A; }
    :global(.col-inprogress .col-dot) { background: #C06035; }
    :global(.col-completed .col-dot)  { background: #4A7848; }
  
    :global(.col-new .col-count)        { background: rgba(74,144,226,.12); color: #1A6ADE; }
    :global(.dark .col-new .col-count)  { background: rgba(74,144,226,.2); color: #7BB8F0; }
    :global(.col-assigned .col-count)   { background: rgba(212,174,58,.12); color: #8A6A10; }
    :global(.dark .col-assigned .col-count) { background: rgba(212,174,58,.18); color: #D4AE3A; }
    :global(.col-inprogress .col-count) { background: rgba(192,96,53,.1); color: #C06035; }
    :global(.dark .col-inprogress .col-count) { background: rgba(192,96,53,.18); color: #EDBA9B; }
    :global(.col-completed .col-count)  { background: rgba(74,120,72,.1); color: #4A7848; }
    :global(.dark .col-completed .col-count) { background: rgba(74,120,72,.2); color: #7DBF7A; }
  </style>