<script lang="ts">
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";

  type TabType = 'all' | 'today' | 'upcoming' | 'past';
  let isTimeSlotModalOpen = $state(false);
  let isEditTimeSlotModalOpen = $state(false);
  let selectedTab = $state<TabType>('all');

  const toggleNewTimeSlot = () => isTimeSlotModalOpen = !isTimeSlotModalOpen;

  const toggleEditTimeSlot = () => isEditTimeSlotModalOpen = !isEditTimeSlotModalOpen;

  const setTab = (tab: TabType) => selectedTab = tab;

</script>

{#if isTimeSlotModalOpen}
<!-- ══════════════════════
     ADD TIME SLOT MODAL
══════════════════════ -->
<div id="addModal" class:open={isTimeSlotModalOpen} class="modal-wrap fixed inset-0 z-[500] bg-navy-deep/65 items-end sm:items-center justify-center p-0 sm:p-4" style="backdrop-filter:blur(6px)">
    <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[560px] max-h-[92vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.28)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden tt">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3 flex-shrink-0"></div>
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
        <div>
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Availability</p>
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:22px">Viewing Schedule</h2>
        </div>
        <button aria-label="Close" onclick={() => (isTimeSlotModalOpen = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted hover:text-navy-dark dark:hover:text-white tt cursor-pointer bg-transparent">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <!-- Scrollable body -->
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 space-y-4" id="dateBlocksContainer">
  
        <!-- Date block 1 (Loopable) -->
        <div class="date-block bg-chalk-2 dark:bg-[#1A2438] rounded-2xl p-4 tt">
          <div class="flex items-center justify-between mb-3">
            <label for="date" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Date</label>
            <button onclick={() => {}} class="text-[11px] text-chalk-muted hover:text-ember dark:hover:text-ember tt bg-transparent border-none cursor-pointer font-sans p-0 hide-first">Remove</button>
          </div>
          <input id="date" type="date" class="w-full bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt mb-3">
          <p class="text-[11px] font-medium tracking-[.06em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2.5">Select available time slots</p>
          <div class="flex flex-wrap gap-2">
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent on">7:00am – 8:00am</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">8:00am – 9:00am</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">9:00am – 10:00am</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">10:00am – 11:00am</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent on">11:00am – 12:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">12:00pm – 1:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">1:00pm – 2:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent on">2:00pm – 3:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">3:00pm – 4:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">4:00pm – 5:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">5:00pm – 6:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">6:00pm – 7:00pm</button>
            <button class="mpill text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-3.5 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] cursor-pointer tt bg-transparent">7:00pm – 8:00pm</button>
          </div>
        </div>
  
      </div>
      <!-- Footer -->
      <div class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-chalk-3 dark:border-white/[.08] space-y-3">
        <button onclick={() => {}} class="w-full text-[13px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt flex items-center justify-center gap-2">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
          Add Another Date
        </button>
        <button onclick={() => (isTimeSlotModalOpen = false)} class="w-full text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Save Schedule</button>
      </div>
    </div>
</div>
{/if}

{#if isEditTimeSlotModalOpen}
<!-- ══════════════════════
     EDIT MODAL
══════════════════════ -->
<div id="editModal" class:open={isEditTimeSlotModalOpen} class="modal-wrap fixed inset-0 z-[500] bg-navy-deep/65 items-end sm:items-center justify-center p-0 sm:p-4" style="backdrop-filter:blur(6px)">
    <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[480px] shadow-[0_24px_80px_rgba(10,36,99,.28)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden tt scale-in">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3"></div>
      <div class="px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
        <div>
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Edit availability</p>
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:22px">Edit Time Slot</h2>
        </div>
        <button aria-label="Close" onclick={() => (isEditTimeSlotModalOpen = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted hover:text-navy-dark dark:hover:text-white tt cursor-pointer bg-transparent">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="px-6 py-5 space-y-4">
        <div>
          <label for="editDate" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Date</label>
          <input id="editDate" type="text" readonly class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt">
        </div>
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="editStart" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Start time</label>
            <select id="editStart" class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
              <option>7:00am</option><option>8:00am</option><option>9:00am</option><option>10:00am</option><option>11:00am</option>
              <option>12:00pm</option><option>1:00pm</option><option>2:00pm</option><option>3:00pm</option><option>4:00pm</option><option>5:00pm</option><option>6:00pm</option><option>7:00pm</option>
            </select>
          </div>
          <div>
            <label for="editEnd" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">End time</label>
            <select id="editEnd" class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
              <option>8:00am</option><option>9:00am</option><option>10:00am</option><option>11:00am</option><option>12:00pm</option>
              <option>1:00pm</option><option>2:00pm</option><option>3:00pm</option><option>4:00pm</option><option>5:00pm</option><option>6:00pm</option><option>7:00pm</option><option>8:00pm</option>
            </select>
          </div>
        </div>
      </div>
      <div class="px-6 pb-6 pt-2 flex gap-3">
        <button onclick={() => (isEditTimeSlotModalOpen = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button class="flex-1 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Update slot</button>
      </div>
    </div>
</div>
{/if}


<!-- ══ LAYOUT ══ -->
<div class="flex pt-[68px] min-h-screen">
    <AgencySidebar />

    <!-- ══ MAIN ══ -->
    <main class="flex-1 min-w-0 overflow-x-hidden px-[5vw] lg:px-10 py-8">

        <!-- Page header -->
        <div class="flex flex-wrap items-start justify-between gap-4 mb-7 fu">
            <div>
                <p class="text-[10px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Agent Tools</p>
                <h1 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:clamp(26px,4vw,34px)">Scheduling</h1>
                <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mt-1">Manage your availability for property viewings</p>
            </div>
            <button onclick={toggleNewTimeSlot} class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-[10px] rounded-full border-none cursor-pointer tt flex-shrink-0">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
                Add Time Slot
            </button>
        </div>

        <!-- Stats row -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7 fu d1">
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-4 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Total slots</div>
            <div class="font-display text-[28px] font-semibold text-navy-dark dark:text-blue-100 leading-none">16</div>
            </div>
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-4 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Today</div>
            <div class="font-display text-[28px] font-semibold text-navy-dark dark:text-blue-100 leading-none">3</div>
            </div>
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-4 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Upcoming</div>
            <div class="font-display text-[28px] font-semibold text-navy-dark dark:text-blue-100 leading-none">10</div>
            </div>
            <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-4 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Booked</div>
            <div class="font-display text-[28px] font-semibold text-ember leading-none">6</div>
            </div>
        </div>

        <!-- Filter tabs -->
        <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-full p-1 inline-flex gap-0.5 mb-7 fu d2">
            {#each ['all', 'today', 'upcoming', 'past'] as tab}
                <button onclick={() =>setTab(tab as any)}
                    class={`ftab ${selectedTab === tab ? 'active' : ''} text-[12px] font-medium px-4 py-[7px] rounded-full border-none cursor-pointer capitalize`} data-tab="all">
                    {tab}
                </button>
            {/each}
        </div>

        <!-- Day groups -->
  <div class="space-y-4 fu d3">

    <!-- ── Today: Monday, May 5 ── -->
    <div class="day-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none" data-group="today">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4" class="text-chalk-muted dark:text-[#6A7FA0]"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"/></svg>
          </div>
          <div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Monday, May 5, 2026</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">3 time slot(s) available</div>
          </div>
        </div>
        <span class="text-[11px] font-medium bg-blue-bright/10 text-blue-link dark:text-blue-bright px-3 py-[5px] rounded-full flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>Today</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          9:00am – 10:00am
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          11:00am – 12:00pm
        </button>
        <button class="slot-pill disabled flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-4 py-[8px] rounded-full border border-chalk-3 dark:border-white/[.08]">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          2:00pm – 3:00pm
        </button>
        <button class="slot-pill flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-4 py-[8px] rounded-full border border-chalk-3 dark:border-white/[.08]">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          4:00pm – 5:00pm
        </button>
        <button class="slot-pill flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-4 py-[8px] rounded-full border border-chalk-3 dark:border-white/[.08]">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          5:00pm – 6:00pm
        </button>
      </div>
      <div class="mt-4 pt-4 border-t border-chalk-3 dark:border-white/[.06] flex flex-wrap gap-2 items-center">
        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Selected slots:</span>
        <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-[#1A2438] px-3 py-[4px] rounded-full flex items-center gap-1.5 tt">
          <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          9:00am – 10:00am
          <button onclick={toggleEditTimeSlot} class="ml-1 text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer p-0 font-sans text-[10px] tt">Edit</button>
        </span>
        <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-[#1A2438] px-3 py-[4px] rounded-full flex items-center gap-1.5 tt">
          <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          11:00am – 12:00pm
          <button onclick={toggleEditTimeSlot} class="ml-1 text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer p-0 font-sans text-[10px] tt">Edit</button>
        </span>
      </div>
    </div>

    <!-- ── Upcoming: Wednesday, May 7 ── -->
    <div class="day-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none" data-group="upcoming">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4" class="text-chalk-muted dark:text-[#6A7FA0]"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"/></svg>
          </div>
          <div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Wednesday, May 7, 2026</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">6 time slot(s) available</div>
          </div>
        </div>
        <span class="text-[11px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-3 py-[5px] rounded-full">Upcoming</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          7:00am – 8:00am
        </button>
        <button class="slot-pill flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-4 py-[8px] rounded-full border border-chalk-3 dark:border-white/[.08]">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          10:00am – 11:00am
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          1:00pm – 2:00pm
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          3:00pm – 4:00pm
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          4:00pm – 5:00pm
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          6:00pm – 7:00pm
        </button>
      </div>
      <div class="mt-4 pt-4 border-t border-chalk-3 dark:border-white/[.06] flex flex-wrap gap-2 items-center">
        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Selected:</span>
        <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-[#1A2438] px-3 py-[4px] rounded-full flex items-center gap-1.5 tt">7:00am – 8:00am <button onclick={toggleEditTimeSlot} class="ml-1 text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer p-0 font-sans text-[10px] tt">Edit</button></span>
        <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-[#1A2438] px-3 py-[4px] rounded-full flex items-center gap-1.5 tt">1:00pm – 2:00pm <button onclick={toggleEditTimeSlot} class="ml-1 text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer p-0 font-sans text-[10px] tt">Edit</button></span>
        <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-[#1A2438] px-3 py-[4px] rounded-full flex items-center gap-1.5 tt">3:00pm – 4:00pm <button onclick={toggleEditTimeSlot} class="ml-1 text-blue-link hover:text-navy-dark dark:hover:text-blue-bright bg-transparent border-none cursor-pointer p-0 font-sans text-[10px] tt">Edit</button></span>
        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">+2 more</span>
      </div>
    </div>

    <!-- ── Upcoming: Monday, June 15 ── -->
    <div class="day-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none" data-group="upcoming">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4" class="text-chalk-muted dark:text-[#6A7FA0]"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"/></svg>
          </div>
          <div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Monday, June 15, 2026</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">4 time slot(s) available</div>
          </div>
        </div>
        <span class="text-[11px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-3 py-[5px] rounded-full">Upcoming</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          10:00am – 11:00am
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          1:00pm – 2:00pm
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          2:00pm – 3:00pm
        </button>
        <button class="slot-pill selected flex items-center gap-1.5 text-[12px] font-medium px-4 py-[8px] rounded-full border border-transparent">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          3:00pm – 4:00pm
        </button>
      </div>
    </div>

    <!-- ── Past ── -->
    <div class="day-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-5 shadow-[0_2px_12px_rgba(10,36,99,.05)] dark:shadow-none opacity-60" data-group="past">
      <div class="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="currentColor" stroke-width="1.4" class="text-chalk-muted dark:text-[#6A7FA0]"/><path d="M7 2v4M13 2v4M3 9h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"/></svg>
          </div>
          <div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Friday, April 25, 2026</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">2 slot(s) were active</div>
          </div>
        </div>
        <span class="text-[11px] font-medium bg-chalk-3 dark:bg-white/[.08] text-chalk-muted dark:text-[#6A7FA0] px-3 py-[5px] rounded-full">Past</span>
      </div>
      <div class="flex flex-wrap gap-2">
        <div class="flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-4 py-[8px] rounded-full border border-chalk-3 dark:border-white/[.07]">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          10:00am – 11:00am
        </div>
        <div class="flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-4 py-[8px] rounded-full border border-chalk-3 dark:border-white/[.07]">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          3:00pm – 4:00pm
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
    .fu{animation:fadeUp .55s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .26s cubic-bezier(.22,.68,0,1.2) both}
    
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* tabs */
    .ftab{position:relative;transition:color .2s,background .2s}
    .ftab.active{background:white;color:#0A2463;box-shadow:0 1px 4px rgba(10,36,99,.12)}
    .dark .ftab.active{background:#131C2E;color:#E8EDF5}
    
    /* slot pill states */
    .slot-pill{cursor:pointer;transition:background .18s,color .18s,border-color .18s,box-shadow .18s}
    .slot-pill:hover:not(.selected):not(.disabled){border-color:#4A90E2;color:#0A2463}
    .dark .slot-pill:hover:not(.selected):not(.disabled){border-color:#4A90E2;color:#E8EDF5}
    .slot-pill.selected{background:#0A2463;color:white;border-color:#0A2463;box-shadow:0 2px 10px rgba(10,36,99,.25)}
    .dark .slot-pill.selected{background:#4A90E2;border-color:#4A90E2;color:white;box-shadow:0 2px 10px rgba(74,144,226,.3)}
    .slot-pill.disabled{opacity:.4;cursor:not-allowed;pointer-events:none}
    
    /* modal pill (in add modal) */
    .mpill{cursor:pointer;transition:background .15s,color .15s,border-color .15s}
    .mpill.on{background:#0A2463;color:white;border-color:#0A2463}
    .dark .mpill.on{background:#4A90E2;border-color:#4A90E2}
    .mpill:hover:not(.on){border-color:#4A90E2}
    
    /* modal backdrop */
    .modal-wrap{display:none;backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
    .modal-wrap.open{display:flex}
    
    /* day group card hover */
    .day-card{transition:box-shadow .22s,border-color .22s}
    .day-card:hover{box-shadow:0 6px 28px rgba(10,36,99,.08)}
    .dark .day-card:hover{box-shadow:0 6px 28px rgba(0,0,0,.32)}
    
    /* date block in add modal */
    .date-block{border:1.5px solid}
    .date-block{border-color:#EDE7DC}
    .dark .date-block{border-color:rgba(255,255,255,.09)}
    
    /* ── page number active ── */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
    
    @media(max-width:640px){.hide-xs{display:none!important}}
</style>