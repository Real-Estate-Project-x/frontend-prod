<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  type ViewingType = 'all' | 'in_person' | 'virtual';

  const list = [1];
  let isCancelModal = $state(false);
  let isRescheduleModal = $state(false);
  let rescheduleSlot = $state<string>("");
  let selectedViewingType = $state<ViewingType>('all');

  const setViewingType = (type: ViewingType) => selectedViewingType = type;

  const toggleRescheduleModal = () => isRescheduleModal = !isRescheduleModal;

  const toggleCancelModal = () => isCancelModal = !isCancelModal;

  const cancelViewing = (viewingId: string) => {
    toggleCancelModal();
  }

  const rebookViewing = (viewingId: string) => {}

  const resetFilter = () => {}

  const selectSlot = (slot: string) => rescheduleSlot = slot;
</script>

{#if isRescheduleModal}
<!-- ══════════════════ RESCHEDULE MODAL ══════════════════ -->
<div id="reschedModal" class="fixed inset-0 z-[600] bg-navy-deep/60 backdrop-blur-sm items-center justify-center p-4 flex">
    <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-7 w-full max-w-md relative tt">
      <button aria-label="Close Reschedule modal" onclick={() => (isRescheduleModal = false)} class="absolute top-4 right-4 w-8 h-8 rounded-full bg-chalk-2 dark:bg-white/[.08] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center cursor-pointer tt hover:bg-chalk-3 dark:hover:bg-white/15 border-none">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <h3 class="font-display text-[26px] font-light text-navy-dark dark:text-blue-100 mb-1">Reschedule viewing</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-6 leading-[1.65]" id="reschedPropertyName">3-Bed Apartment · GRA Phase 2</p>
      <div class="space-y-4 mb-5">
        <div>
          <label for="reschedDate" class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">New date <span class="text-ember">*</span></label>
          <input type="date" id="reschedDate" class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-[11px] text-[14px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt">
        </div>
        <div>
          <label for="reschedSlots" class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">New time <span class="text-ember">*</span></label>
          <div class="grid grid-cols-3 gap-1.5" id="reschedSlots">
            <button onclick={() => selectSlot('10am')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">9:00 AM</button>
            <button onclick={() => selectSlot('11am')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">10:00 AM</button>
            <button onclick={() => selectSlot('12pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">11:00 AM</button>
            <button onclick={() => selectSlot('1pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">12:00 PM</button>
            <button onclick={() => selectSlot('2pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">2:00 PM</button>
            <button onclick={() => selectSlot('3pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">3:00 PM</button>
            <button onclick={() => selectSlot('4pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">4:00 PM</button>
            <button onclick={() => selectSlot('5pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">5:00 PM</button>
            <button onclick={() => selectSlot('6pm')} class="slot-btn text-[12px] font-medium py-2.5 rounded-xl border border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent cursor-pointer tt">Flexible</button>
          </div>
        </div>
        <div>
          <label for="reschedReason" class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Reason <span class="text-[11px] font-normal text-chalk-muted dark:text-[#6A7FA0]">(optional)</span></label>
          <textarea id="reschedReason" rows="2" placeholder="Let the agent know why you need to reschedule…" class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-3 text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none resize-none focus:border-blue-link tt leading-relaxed"></textarea>
        </div>
      </div>
      <div class="flex gap-3">
        <button onclick={() => (isRescheduleModal = false)} class="flex-1 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] text-chalk-muted dark:text-[#6A7FA0] rounded-xl py-3 text-[13px] cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button class="flex-[2] bg-ember hover:bg-ember-deep text-white rounded-xl py-3 text-[13px] font-medium cursor-pointer border-none tt">Confirm reschedule</button>
      </div>
    </div>
</div>
{/if}

{#if isCancelModal}
<!-- ══════════════════ CANCEL MODAL ══════════════════ -->
<div id="cancelModal" class="fixed inset-0 z-[600] bg-navy-deep/60 backdrop-blur-sm items-center justify-center p-4 flex">
    <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-7 w-full max-w-md relative tt">
      <button aria-label="Close cancel modal" onclick={() => (isCancelModal = false)} class="absolute top-4 right-4 w-8 h-8 rounded-full bg-chalk-2 dark:bg-white/[.08] border-none flex items-center justify-center cursor-pointer tt hover:bg-chalk-3 dark:hover:bg-white/15">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
      <div class="w-12 h-12 rounded-full bg-ember-light dark:bg-ember/20 flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 9v4M12 17h.01" stroke="#C06035" stroke-width="2" stroke-linecap="round"/><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="#C06035" stroke-width="1.5" stroke-linecap="round"/></svg>
      </div>
      <h3 class="font-display text-[24px] font-light text-navy-dark dark:text-blue-100 mb-1">Cancel viewing</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-5 leading-[1.65]">Are you sure you want to cancel your viewing of <strong class="text-navy-dark dark:text-blue-100" id="cancelPropertyName">this property</strong>? The agent will be notified.</p>
      <div class="mb-5">
        <label for="cancelReason" class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Reason for cancellation</label>
        <select id="cancelReason" class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt focus:border-blue-link">
          <option value="">Select a reason…</option>
          <option>No longer interested in this property</option>
          <option>Found another property</option>
          <option>Schedule conflict</option>
          <option>Price negotiation pending</option>
          <option>Other</option>
        </select>
      </div>
      <div class="flex gap-3">
        <button onclick={() => (isCancelModal = false)} class="flex-1 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] text-chalk-muted dark:text-[#6A7FA0] rounded-xl py-3 text-[13px] cursor-pointer hover:bg-chalk-3 tt">Keep viewing</button>
        <button class="flex-[1] bg-ember hover:bg-ember-deep text-white rounded-xl py-3 text-[13px] font-medium cursor-pointer border-none tt">Yes, cancel</button>
      </div>
    </div>
</div>
{/if}

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
        <a href="/site/properties" class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full no-underline tt self-start sm:self-end">
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

            {#if list.length > 0}
            <!-- ══════════ TODAY GROUP ══════════ -->
            <div class="mb-8 fu d3" id="grp-today">
                <!-- Group header -->
                <div class="flex items-center gap-3 mb-4">
                <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-ember pulse-dot"></span>Today
                </span>
                <div class="group-rule"></div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">Mon 14 Apr 2026</span>
                </div>

                <!-- Viewing card: TODAY + CONFIRMED + IN-PERSON -->
                <div class="vcard viewing-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt fu d3 mb-4" data-type="inperson" data-group="today">
                <div class="flex">
                    <!-- Date column -->
                    <div class="flex-shrink-0 w-[72px] flex flex-col items-center justify-center bg-ember-light dark:bg-ember/15 py-5 px-2 text-center">
                    <div class="text-[10px] font-medium uppercase tracking-[.1em] text-ember">Apr</div>
                    <div class="font-display text-[28px] font-semibold text-ember leading-none mt-0.5">14</div>
                    <div class="text-[9px] text-ember/70 mt-0.5 uppercase tracking-[.06em]">Mon</div>
                    </div>
                    <!-- Main content -->
                    <div class="flex-1 min-w-0 p-5">
                    <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div class="min-w-0">
                        <div class="flex items-center gap-2 flex-wrap mb-1">
                            <span class="badge-inperson text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">In-person</span>
                            <span class="badge-confirmed text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>Confirmed</span>
                        </div>
                        <h3 class="text-[16px] font-medium text-navy-dark dark:text-blue-100 leading-tight">3-Bedroom Apartment, GRA Phase 2</h3>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
                            14 Aba Road, GRA Phase 2, Port Harcourt
                        </div>
                        </div>
                        <!-- Countdown -->
                        <div class="flex-shrink-0 bg-ember-light/50 dark:bg-ember/10 rounded-xl px-4 py-2.5 text-center hidden sm:block">
                        <div class="text-[9px] text-ember uppercase tracking-[.1em] mb-1">Starts in</div>
                        <div class="font-display text-[20px] font-semibold text-ember leading-none" id="todayCountdown">NOW!</div>
                        </div>
                    </div>
                    <!-- Time + Agent row -->
                    <div class="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                        <strong class="text-navy-dark dark:text-blue-100 font-medium">10:00 AM</strong> &nbsp;– 45 min est.
                        </div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                        <div class="w-5 h-5 rounded-full bg-navy-strong flex items-center justify-center text-[8px] font-medium text-white flex-shrink-0">CO</div>
                        Chukwuemeka Okafor · Premier Properties PH
                        </div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M2 7h12" stroke="currentColor" stroke-width="1.3"/></svg>
                        Ref: BLU-PH-2024-0421
                        </div>
                    </div>
                    <!-- Price + actions -->
                    <div class="flex items-center justify-between gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
                        <div>
                        <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦850,000<span class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                        <div class="flex items-center gap-3 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span>
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span>
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>115 m²</span>
                        </div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                        <a href="https://maps.google.com/?q=GRA+Phase+2+Port+Harcourt" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 no-underline hover:border-navy-dark dark:hover:border-white/30 tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
                            Get directions
                        </a>
                        <button onclick={() => {}} class="flex items-center gap-1.5 text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 bg-transparent cursor-pointer hover:border-navy-dark dark:hover:border-white/30 tt font-sans">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><rect x="2" y="2.5" width="12" height="11" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 1v3M11 1v3M2 6.5h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                            Add to calendar
                        </button>
                        <button onclick={toggleRescheduleModal} class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt font-sans">Reschedule</button>
                        <a href="/site/properties/12" class="flex items-center gap-1.5 text-[12px] font-medium text-white bg-ember hover:bg-ember-deep rounded-full px-4 py-2 no-underline tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                            View property
                        </a>
                        </div>
                    </div>
                    </div>
                </div>
                <!-- Agent contact strip -->
                <div class="flex items-center gap-3 px-5 py-3 border-t border-chalk-3 dark:border-white/[.06] bg-chalk-2 dark:bg-white/[.02] flex-wrap">
                    <a href="https://wa.me/2348001234567" target="_blank" class="flex items-center gap-1.5 text-[11px] text-navy-dark dark:text-blue-100 no-underline hover:text-blue-link tt"><div class="w-5 h-5 rounded-md bg-[#25D366] flex items-center justify-center flex-shrink-0"><svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg></div>WhatsApp agent</a>
                    <span class="text-chalk-4 dark:text-white/20 text-[11px]">·</span>
                    <a href="tel:+2348001234567" class="flex items-center gap-1.5 text-[11px] text-navy-dark dark:text-blue-100 no-underline hover:text-blue-link tt"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M2.5 3A1 1 0 013 3h2a1 1 0 01.97.75l.5 2a1 1 0 01-.25.97l-.8.8a8 8 0 003.33 3.33l.8-.8a1 1 0 01.97-.25l2 .5A1 1 0 0113 11v2a1 1 0 01-1 1h-.5C5.149 14 2 10.851 2 6v-.5a1 1 0 011-1z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Call agent</a>
                    <span class="text-chalk-4 dark:text-white/20 text-[11px]">·</span>
                    <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Booked 12 Apr 2026 · #VWG-20260414-001</span>
                </div>
                </div>
            </div>

            <!-- ══════════ UPCOMING GROUP ══════════ -->
            <div class="mb-8 fu d4" id="grp-upcoming">
                <div class="flex items-center gap-3 mb-4">
                <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-blue-bright"></span>Upcoming
                </span>
                <div class="group-rule"></div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">2 viewings</span>
                </div>
                <div class="space-y-4">

                <!-- Viewing 2: UPCOMING VIRTUAL PENDING -->
                <div class="vcard viewing-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt" data-type="virtual" data-group="upcoming">
                    <div class="flex">
                    <div class="flex-shrink-0 w-[72px] flex flex-col items-center justify-center bg-sage-light dark:bg-sage/15 py-5 px-2 text-center">
                        <div class="text-[10px] font-medium uppercase tracking-[.1em] text-sage">Apr</div>
                        <div class="font-display text-[28px] font-semibold text-sage leading-none mt-0.5">17</div>
                        <div class="text-[9px] text-sage/70 mt-0.5 uppercase tracking-[.06em]">Thu</div>
                    </div>
                    <div class="flex-1 min-w-0 p-5">
                        <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap mb-1">
                            <span class="badge-virtual text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="8" height="8" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="8" height="6" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M9 6l3-2v4l-3-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Virtual tour</span>
                            <span class="badge-pending text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">Awaiting confirmation</span>
                            </div>
                            <h3 class="text-[16px] font-medium text-navy-dark dark:text-blue-100 leading-tight">2-Bed Flat, Woji</h3>
                            <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
                            Woji, Port Harcourt (remote viewing)
                            </div>
                        </div>
                        <!-- Virtual fee pill -->
                        <div class="flex-shrink-0 bg-sage-light dark:bg-sage/15 rounded-xl px-4 py-2 text-center hidden sm:block">
                            <div class="text-[9px] text-sage uppercase tracking-[.1em] mb-0.5">Tour fee</div>
                            <div class="font-display text-[16px] font-semibold text-sage leading-none">₦5,000</div>
                            <div class="text-[9px] text-sage/70 mt-0.5">Refundable</div>
                        </div>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                            <strong class="text-navy-dark dark:text-blue-100 font-medium">2:00 PM</strong> &nbsp;· Google Meet
                        </div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                            <div class="w-5 h-5 rounded-full bg-sage flex items-center justify-center text-[8px] font-medium text-white flex-shrink-0">AM</div>
                            Amara Madu · Lekki Realty Partners
                        </div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M2 7h12" stroke="currentColor" stroke-width="1.3"/></svg>
                            Ref: BLU-PH-2024-0815
                        </div>
                        </div>
                        <div class="flex items-center justify-between gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
                        <div>
                            <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦420,000<span class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                            <div class="flex items-center gap-3 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 beds</span>
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span>
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>78 m²</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <button onclick={toggleRescheduleModal} class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt font-sans">Reschedule</button>
                            <button onclick={() => cancelViewing("1")} class="text-[12px] font-medium text-ember border border-ember-light dark:border-ember/30 rounded-full px-3.5 py-2 bg-transparent cursor-pointer hover:bg-ember hover:text-white tt font-sans">Cancel</button>
                            <a href="/site/properties/12" class="flex items-center gap-1.5 text-[12px] font-medium text-white bg-ember hover:bg-ember-deep rounded-full px-4 py-2 no-underline tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                            View property
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex items-center gap-3 px-5 py-3 border-t border-chalk-3 dark:border-white/[.06] bg-chalk-2 dark:bg-white/[.02] flex-wrap">
                    <a href="https://wa.me/2348001234567" target="_blank" class="flex items-center gap-1.5 text-[11px] text-navy-dark dark:text-blue-100 no-underline hover:text-blue-link tt"><div class="w-5 h-5 rounded-md bg-[#25D366] flex items-center justify-center flex-shrink-0"><svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg></div>WhatsApp agent</a>
                    <span class="text-chalk-4 dark:text-white/20 text-[11px]">·</span>
                    <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Booked 13 Apr 2026 · #VWG-20260417-002</span>
                    </div>
                </div>

                <!-- Viewing 3: UPCOMING IN-PERSON CONFIRMED -->
                <div class="vcard viewing-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt" data-type="inperson" data-group="upcoming">
                    <div class="flex">
                    <div class="flex-shrink-0 w-[72px] flex flex-col items-center justify-center bg-ember-light dark:bg-ember/15 py-5 px-2 text-center">
                        <div class="text-[10px] font-medium uppercase tracking-[.1em] text-ember">Apr</div>
                        <div class="font-display text-[28px] font-semibold text-ember leading-none mt-0.5">21</div>
                        <div class="text-[9px] text-ember/70 mt-0.5 uppercase tracking-[.06em]">Mon</div>
                    </div>
                    <div class="flex-1 min-w-0 p-5">
                        <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap mb-1">
                            <span class="badge-inperson text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">In-person</span>
                            <span class="badge-confirmed text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>Confirmed</span>
                            </div>
                            <h3 class="text-[16px] font-medium text-navy-dark dark:text-blue-100 leading-tight">4-Bedroom Duplex, Woji</h3>
                            <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
                            22 Woji Road, Woji, Port Harcourt
                            </div>
                        </div>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                            <strong class="text-navy-dark dark:text-blue-100 font-medium">11:00 AM</strong> &nbsp;– 60 min est.
                        </div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                            <div class="w-5 h-5 rounded-full bg-sage flex items-center justify-center text-[8px] font-medium text-white flex-shrink-0">BO</div>
                            Bola Okafor · Obio Realty
                        </div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="currentColor" stroke-width="1.3"/><path d="M2 7h12" stroke="currentColor" stroke-width="1.3"/></svg>
                            Ref: BLU-PH-2024-0992
                        </div>
                        </div>
                        <div class="flex items-center justify-between gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
                        <div>
                            <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦750,000<span class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                            <div class="flex items-center gap-3 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>4 beds</span>
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 baths</span>
                            <span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>165 m²</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <a href="https://maps.google.com/?q=Woji+Port+Harcourt" target="_blank" rel="noopener" class="flex items-center gap-1.5 text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 no-underline hover:border-navy-dark dark:hover:border-white/30 tt"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>Directions</a>
                            <button onclick={toggleRescheduleModal} class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 bg-transparent cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt font-sans">Reschedule</button>
                            <button onclick={() => cancelViewing("2")} class="text-[12px] font-medium text-ember border border-ember-light dark:border-ember/30 rounded-full px-3.5 py-2 bg-transparent cursor-pointer hover:bg-ember hover:text-white tt font-sans">Cancel</button>
                            <a href="/site/properties/12" class="flex items-center gap-1.5 text-[12px] font-medium text-white bg-ember hover:bg-ember-deep rounded-full px-4 py-2 no-underline tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                            View property
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex items-center gap-3 px-5 py-3 border-t border-chalk-3 dark:border-white/[.06] bg-chalk-2 dark:bg-white/[.02] flex-wrap">
                    <a href="https://wa.me/2348001234567" target="_blank" class="flex items-center gap-1.5 text-[11px] text-navy-dark dark:text-blue-100 no-underline hover:text-blue-link tt"><div class="w-5 h-5 rounded-md bg-[#25D366] flex items-center justify-center flex-shrink-0"><svg width="9" height="9" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0z"/></svg></div>WhatsApp agent</a>
                    <span class="text-chalk-4 dark:text-white/20 text-[11px]">·</span>
                    <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Booked 11 Apr 2026 · #VWG-20260421-003</span>
                    </div>
                </div>

                </div>
            </div>

            <!-- ══════════ PAST GROUP ══════════ -->
            <div class="fu d5" id="grp-past">
                <div class="flex items-center gap-3 mb-4">
                <span class="text-[11px] font-semibold tracking-[.14em] uppercase text-navy-dark dark:text-blue-100 flex-shrink-0 flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-chalk-muted dark:bg-white/30"></span>Past
                </span>
                <div class="group-rule"></div>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">3 viewings</span>
                </div>
                <div class="space-y-4">

                <!-- Past 1: COMPLETED + IN-PERSON -->
                <div class="vcard viewing-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt opacity-90" data-type="inperson" data-group="past">
                    <div class="flex">
                    <div class="flex-shrink-0 w-[72px] flex flex-col items-center justify-center bg-chalk-2 dark:bg-white/[.04] py-5 px-2 text-center">
                        <div class="text-[10px] font-medium uppercase tracking-[.1em] text-chalk-muted dark:text-[#6A7FA0]">Mar</div>
                        <div class="font-display text-[28px] font-semibold text-chalk-muted dark:text-[#6A7FA0] leading-none mt-0.5">03</div>
                        <div class="text-[9px] text-chalk-muted/70 dark:text-[#6A7FA0]/70 mt-0.5 uppercase tracking-[.06em]">Mon</div>
                    </div>
                    <div class="flex-1 min-w-0 p-5">
                        <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap mb-1">
                            <span class="badge-inperson text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">In-person</span>
                            <span class="badge-completed text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">Completed</span>
                            </div>
                            <h3 class="text-[16px] font-medium text-navy-dark dark:text-blue-100 leading-tight">3-Bedroom Apartment, GRA Phase 2</h3>
                            <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>GRA Phase 2, Port Harcourt</div>
                        </div>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg><strong class="text-navy-dark dark:text-blue-100 font-medium">10:00 AM</strong></div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]"><div class="w-5 h-5 rounded-full bg-navy-strong flex items-center justify-center text-[8px] font-medium text-white flex-shrink-0">CO</div>Chukwuemeka Okafor</div>
                        </div>
                        <div class="flex items-center justify-between gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
                        <div>
                            <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦850,000<span class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                            <div class="flex items-center gap-3 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]"><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>115 m²</span></div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <a href="/site/properties/12#write-review" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 no-underline hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">Leave review</a>
                            <a href="/site/properties/12" class="flex items-center gap-1.5 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:bg-navy-mid dark:hover:bg-blue-bright/80 rounded-full px-4 py-2 no-underline tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                            View property
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex items-center gap-3 px-5 py-3 border-t border-chalk-3 dark:border-white/[.06] bg-chalk-2 dark:bg-white/[.02]">
                    <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Viewed 3 Mar 2026 · #VWG-20260303-004 · ★ 5-star review left</span>
                    </div>
                </div>

                <!-- Past 2: COMPLETED + VIRTUAL -->
                <div class="vcard viewing-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt opacity-90" data-type="virtual" data-group="past">
                    <div class="flex">
                    <div class="flex-shrink-0 w-[72px] flex flex-col items-center justify-center bg-chalk-2 dark:bg-white/[.04] py-5 px-2 text-center">
                        <div class="text-[10px] font-medium uppercase tracking-[.1em] text-chalk-muted dark:text-[#6A7FA0]">Feb</div>
                        <div class="font-display text-[28px] font-semibold text-chalk-muted dark:text-[#6A7FA0] leading-none mt-0.5">18</div>
                        <div class="text-[9px] text-chalk-muted/70 dark:text-[#6A7FA0]/70 mt-0.5 uppercase tracking-[.06em]">Wed</div>
                    </div>
                    <div class="flex-1 min-w-0 p-5">
                        <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap mb-1">
                            <span class="badge-virtual text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full flex items-center gap-1"><svg width="8" height="8" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="8" height="6" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M9 6l3-2v4l-3-2" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>Virtual tour</span>
                            <span class="badge-completed text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">Completed</span>
                            </div>
                            <h3 class="text-[16px] font-medium text-navy-dark dark:text-blue-100 leading-tight">2-Bedroom Flat, Lekki Phase 1</h3>
                            <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>Lekki Phase 1, Lagos (viewed remotely)</div>
                        </div>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg><strong class="text-navy-dark dark:text-blue-100 font-medium">3:00 PM</strong>&nbsp;· Zoom</div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]"><div class="w-5 h-5 rounded-full bg-ember flex items-center justify-center text-[8px] font-medium text-white flex-shrink-0">AM</div>Amara Madu</div>
                        </div>
                        <div class="flex items-center justify-between gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
                        <div>
                            <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦680,000<span class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                            <div class="flex items-center gap-3 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]"><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 beds</span><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>90 m²</span></div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <a href="/site/properties/12#write-review" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] rounded-full px-3.5 py-2 no-underline hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">Leave review</a>
                            <a href="/site/properties/12" class="flex items-center gap-1.5 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:bg-navy-mid dark:hover:bg-blue-bright/80 rounded-full px-4 py-2 no-underline tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                            View property
                            </a>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex items-center gap-3 px-5 py-3 border-t border-chalk-3 dark:border-white/[.06] bg-chalk-2 dark:bg-white/[.02]">
                    <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Viewed 18 Feb 2026 · #VWG-20260218-005 · No review yet</span>
                    </div>
                </div>

                <!-- Past 3: CANCELLED -->
                <div class="vcard viewing-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt opacity-70" data-type="inperson" data-group="past">
                    <div class="flex">
                    <div class="flex-shrink-0 w-[72px] flex flex-col items-center justify-center bg-chalk-2 dark:bg-white/[.04] py-5 px-2 text-center">
                        <div class="text-[10px] font-medium uppercase tracking-[.1em] text-chalk-muted dark:text-[#6A7FA0]">Jan</div>
                        <div class="font-display text-[28px] font-semibold text-chalk-muted dark:text-[#6A7FA0] leading-none mt-0.5">30</div>
                        <div class="text-[9px] text-chalk-muted/70 dark:text-[#6A7FA0]/70 mt-0.5 uppercase tracking-[.06em]">Thu</div>
                    </div>
                    <div class="flex-1 min-w-0 p-5">
                        <div class="flex items-start justify-between gap-3 flex-wrap mb-3">
                        <div class="min-w-0">
                            <div class="flex items-center gap-2 flex-wrap mb-1">
                            <span class="badge-inperson text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">In-person</span>
                            <span class="badge-cancelled text-[9px] font-semibold uppercase tracking-[.08em] px-2.5 py-[3px] rounded-full">Cancelled</span>
                            </div>
                            <h3 class="text-[16px] font-medium text-navy-dark dark:text-blue-100 leading-tight line-through decoration-chalk-muted">3-Bed Apartment, D-Line</h3>
                            <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5"><svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>D-Line, Port Harcourt</div>
                        </div>
                        </div>
                        <div class="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]"><svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg><strong class="text-navy-dark dark:text-blue-100 font-medium">2:00 PM</strong></div>
                        <div class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Reason: Schedule conflict</div>
                        </div>
                        <div class="flex items-center justify-between gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
                        <div>
                            <div class="font-display text-[20px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦550,000<span class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0]"> / month</span></div>
                            <div class="flex items-center gap-3 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]"><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>102 m²</span></div>
                        </div>
                        <div class="flex items-center gap-2 flex-wrap">
                            <a href="/site/properties/12" class="flex items-center gap-1.5 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:bg-navy-mid dark:hover:bg-blue-bright/80 rounded-full px-4 py-2 no-underline tt">
                            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M1 8s3-5 7-5 7 5 7 5-3 5-7 5-7-5-7-5z" stroke="currentColor" stroke-width="1.3"/><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3"/></svg>
                            View property
                            </a>
                            <button onclick={() => rebookViewing("1")} class="flex items-center gap-1.5 text-[12px] font-medium text-ember border border-ember-light dark:border-ember/30 rounded-full px-4 py-2 bg-transparent cursor-pointer hover:bg-ember hover:text-white tt font-sans">Rebook</button>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="flex items-center gap-3 px-5 py-3 border-t border-chalk-3 dark:border-white/[.06] bg-chalk-2 dark:bg-white/[.02]">
                    <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Cancelled 28 Jan 2026 · #VWG-20260130-006</span>
                    </div>
                </div>

                </div>
            </div>

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
            <!-- ══════ NO RESULTS ══════ -->
            <div id="noResults" class="text-center py-14 fu">
                <p class="text-[14px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-3">No viewings match your filter.</p>
                <button onclick={resetFilter} class="text-[13px] text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer font-sans">Reset filters</button>
            </div>
            {/if}

            
        </div>
    </main>
</div>

<!-- TOAST -->
<div id="toast" class="fixed bottom-6 left-1/2 z-[400] text-[13px] font-medium text-white bg-navy-dark px-6 py-3 rounded-full shadow-[0_8px_32px_rgba(10,36,99,.28)] flex items-center gap-2.5 pointer-events-none opacity-0 tt" style="transform:translateX(-50%) translateY(20px)">
    <svg id="toastIcon" width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M3 8l4 4 6-7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
    <span id="toastMsg">Done</span>
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
    /* #reschedModal,#cancelModal{display:none} */
    #reschedModal.open,#cancelModal.open{display:flex}
    
    /* ── countdown digits ── */
    @keyframes flipNum{0%{transform:rotateX(90deg);opacity:0}100%{transform:rotateX(0);opacity:1}}
    .flip{animation:flipNum .3s ease both}
    
    /* ── page number active ── */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active,
    :global([data-theme="dark"]) .pgbtn.active {background:#4A90E2;border-color:#4A90E2}
</style>