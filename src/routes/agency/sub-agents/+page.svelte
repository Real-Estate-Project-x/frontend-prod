<script lang="ts">
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";
  
  type StatusTab = 'all' | 'active' | 'inactive';
  type ActivityTab = 'all' | 'high' | 'medium' | 'low';

  let isNewAgentModalOpen = $state(false);
  let isEditAgentModalOpen  = $state(false);
  let selectedActivity = $state<ActivityTab>('all');
  let selectedStatus = $state<StatusTab>('all');
    const list = [1];

  const setActivity = (value: ActivityTab) => selectedActivity = value;
    
  const setStatus = (value: StatusTab) => selectedStatus = value;

  const toggleNewAgentModal = () => isNewAgentModalOpen = !isNewAgentModalOpen;

  const toggleEditAgentModal = () => isEditAgentModalOpen = !isEditAgentModalOpen;

</script>

{#if isNewAgentModalOpen}
<!-- ══ NEW USER MODAL ══ -->
<div id="addModal" class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="absolute inset-0 modal-bg" onclick={() => (isNewAgentModalOpen = false)}></div>
    <div class="relative bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[520px] max-h-[90vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.22)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden scale-in tt">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3.5 flex-shrink-0"></div>
      <!-- Modal header -->
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div>
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:20px">Invite <em class="italic text-blue-bright">user.</em></h2>
          </div>
        </div>
        <button aria-label="Close modal" onclick={() => (isNewAgentModalOpen = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white hover:border-chalk-4 tt bg-transparent cursor-pointer flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <!-- Modal body -->
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="firstName" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">First name</label>
            <input id="firstName" type="text" class="inp" placeholder="First name">
          </div>
          <div>
            <label for="lastName" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Last name</label>
            <input id="lastName" type="text" class="inp" placeholder="Last name">
          </div>
        </div>
        <div>
          <label for="email" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Email</label>
          <input id="email" type="email" class="inp" placeholder="user@email.com">
        </div>
        <div>
          <label for="phone" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Phone (WhatsApp)</label>
          <input id="phone" type="tel" class="inp" value={"+234 803 111 0001"} placeholder="+234 …">
        </div>
        <div>
            <label for="status" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Status</label>
            <div class="sel-wrap w-full">
              <select id="status" class="sel-styled w-full">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        <div>
          <label for="notes" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Internal notes / tags</label>
          <textarea id="notes" rows="3" class="inp resize-none" placeholder="Add internal notes or tags about this user…"></textarea>
        </div>
        <!-- Validation message -->
        <div id="editError" class="hidden text-[12px] text-ember bg-ember-light/50 px-3 py-2 rounded-lg"></div>
      </div>
      <!-- Modal footer -->
      <div class="flex-shrink-0 px-6 pb-6 pt-3 border-t border-chalk-3 dark:border-white/[0.07] flex gap-2.5">
        <button onclick={() => (isNewAgentModalOpen = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button class="flex-1 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Send invite</button>
      </div>
    </div>
  </div>
{/if}

{#if isEditAgentModalOpen}
<!-- ══ EDIT USER MODAL ══ -->
<div id="editModal" class="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="absolute inset-0 modal-bg" onclick={() => (isEditAgentModalOpen = false)}></div>
    <div class="relative bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[520px] max-h-[90vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.22)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden scale-in tt">
      <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3.5 flex-shrink-0"></div>
      <!-- Modal header -->
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <div id="editAvatar" class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0">CO</div>
          <div>
            <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Edit user</p>
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 leading-none" style="font-size:20px" id="editTitle">Chukwuemeka Okafor</h2>
          </div>
        </div>
        <button aria-label="Close modal" onclick={() => (isEditAgentModalOpen = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white hover:border-chalk-4 tt bg-transparent cursor-pointer flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 2l10 10M12 2L2 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <!-- Modal body -->
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5 space-y-4">
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label for="editFirstName" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">First name</label>
            <input id="editFirstName" type="text" class="inp" placeholder="First name">
          </div>
          <div>
            <label for="editLastName" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Last name</label>
            <input id="editLastName" type="text" class="inp" placeholder="Last name">
          </div>
        </div>
        <div>
          <label for="editEmail" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Email</label>
          <input id="editEmail" type="email" class="inp" placeholder="user@email.com">
        </div>
        <div>
          <label for="editPhone" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Phone (WhatsApp)</label>
          <input id="editPhone" type="tel" class="inp" value={"+234 803 111 0001"} placeholder="+234 …">
        </div>
        <div>
            <label for="editStatus" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Status</label>
            <div class="sel-wrap w-full">
              <select id="editStatus" class="sel-styled w-full">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        <div>
          <label for="editNotes" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5 block">Internal notes / tags</label>
          <textarea id="editNotes" rows="3" class="inp resize-none" placeholder="Add internal notes or tags about this user…"></textarea>
        </div>
        <!-- Validation message -->
        <div id="editError" class="hidden text-[12px] text-ember bg-ember-light/50 px-3 py-2 rounded-lg"></div>
      </div>
      <!-- Modal footer -->
      <div class="flex-shrink-0 px-6 pb-6 pt-3 border-t border-chalk-3 dark:border-white/[0.07] flex gap-2.5">
        <button onclick={() => (isEditAgentModalOpen = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button class="flex-1 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Save changes</button>
      </div>
    </div>
  </div>
{/if}

<!-- ══ LAYOUT SHELL ══ -->
<div class="flex pt-[68px] min-h-screen">
<AgencySidebar />

<!-- ══ MAIN ══ -->
<main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- Page header -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agency admin</p>
            <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
              Agency <em class="italic text-blue-bright">users.</em>
            </h1>
            <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
              <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
              <span id="todayDate">Friday, 15 May 2026</span>
              &nbsp;&middot;&nbsp;
              <span id="headerCount" class="text-white font-medium">12</span> users in agency
            </p>
          </div>
          <div class="flex items-center gap-2.5 flex-wrap">
            <button onclick={() => {}} class="flex items-center gap-2 text-[12px] font-medium text-white/70 border border-white/20 hover:border-white/40 px-4 py-2 rounded-full tt cursor-pointer bg-transparent">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v9M4 7l3 3 3-3M2 11h10" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Export CSV
            </button>
            <button onclick={toggleNewAgentModal} class="flex items-center gap-2 text-[12px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-2 rounded-full tt cursor-pointer border-none">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg>
              Add new agent
            </button>
          </div>
        </div>
        <!-- Quick stats strip -->
        <div class="flex gap-5 mt-5 flex-wrap">
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-sage"></span><span class="text-[12px] text-white/50">Active <strong id="stripActive" class="text-white font-medium ml-1">10</strong></span></div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-gold"></span><span class="text-[12px] text-white/50">Agents <strong id="stripAgents" class="text-white font-medium ml-1">9</strong></span></div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-blue-bright"></span><span class="text-[12px] text-white/50">Total listings <strong id="stripListings" class="text-white font-medium ml-1">282</strong></span></div>
          <div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-ember"></span><span class="text-[12px] text-white/50">Total inquiries <strong id="stripInquiries" class="text-white font-medium ml-1">1710</strong></span></div>
        </div>
      </div>
    </div>

    <!-- Body -->
  <div class="px-6 lg:px-10 py-7 max-w-[1200px] mx-auto">

    <!-- ══ KPI CARDS ══ -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 stat-grid">
      <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d1">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Total users</div>
          <div class="w-8 h-8 rounded-xl bg-blue-bright/10 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="4" stroke="#4A90E2" stroke-width="1.4"/><circle cx="15" cy="7" r="3" stroke="#4A90E2" stroke-width="1.4"/><path d="M1 18c0-3 2.7-5 6-5s6 2 6 5" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/><path d="M15 12c2 0 4 1.3 4 4" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg></div>
        </div>
        <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" id="kpiTotal" style="font-size:32px">12</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">across all roles</div>
      </div>
      <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d2">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Active users</div>
          <div class="w-8 h-8 rounded-xl bg-sage-light flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="#4A7848" stroke-width="1.4"/><path d="M7 10l2 2 4-4" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        </div>
        <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" id="kpiActive" style="font-size:32px">10</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="kpiActiveRate">–% of total</div>
      </div>
      <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d3">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Total listings</div>
          <div class="w-8 h-8 rounded-xl bg-gold/15 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M2 5.5L10 2l8 3.5V12a8 8 0 01-16 0V5.5z" stroke="#D4AE3A" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 12V9h6v3" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
        </div>
        <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" id="kpiListings" style="font-size:32px">282</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="kpiAvgListings">avg – per agent</div>
      </div>
      <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d4">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Active listings</div>
          <div class="w-8 h-8 rounded-xl bg-blue-bright/10 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke="#4A90E2" stroke-width="1.4"/><path d="M2 8h16" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/><path d="M6 13h3M11 13h3" stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/></svg></div>
        </div>
        <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" id="kpiActiveListings" style="font-size:32px">186</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="kpiActiveListingRate">–% of total</div>
      </div>
      <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d5">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Total inquiries</div>
          <div class="w-8 h-8 rounded-xl bg-ember-light flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z" stroke="#C06035" stroke-width="1.4" stroke-linejoin="round"/></svg></div>
        </div>
        <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" id="kpiInquiries" style="font-size:32px">1.7k</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="kpiEngagement">–% view→inquiry rate</div>
      </div>
      <div class="stat-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d6">
        <div class="flex items-center justify-between mb-3">
          <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Total views</div>
          <div class="w-8 h-8 rounded-xl bg-blue-bright/10 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="#4A90E2" stroke-width="1.4"/><circle cx="10" cy="10" r="2.5" stroke="#4A90E2" stroke-width="1.4"/></svg></div>
        </div>
        <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1" id="kpiViews" style="font-size:32px">51.4k</div>
        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">across all listings</div>
      </div>
      <div class="stat-card col-span-2 bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt fu d7">
        <div class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Most active user</div>
        <div id="kpiTopUser" class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-navy-strong flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0" id="kpiTopAvatar">CO</div>
          <div class="min-w-0">
            <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 leading-none mb-0.5" id="kpiTopName">Chukwuemeka Okafor</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="kpiTopMeta">Admin · 312 inquiries</div>
          </div>
          <div class="ml-auto text-right flex-shrink-0">
            <div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:22px" id="kpiTopListings">42</div>
            <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">listings</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ══ CONTROLS ══ -->
    <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-4 mb-4 tt fu d8">
        <div class="flex flex-col gap-3 controls-row">
          <!-- Row 1: search + sort -->
          <div class="flex items-center gap-3 flex-wrap">
            <!-- Search -->
            <!-- <div class="relative flex-1 min-w-[200px]">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0]" width="13" height="13" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M10.5 10.5l4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <input id="searchInput" type="text" placeholder="Search by name, email, phone…" oninput={() => {}} class="inp pl-9 !py-[8px]" />
            </div> -->
            <div class="search-input-wrap">
                <svg class="search-input-icon" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.5" class="svelte-dqe1u"></circle><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="svelte-dqe1u"></path></svg> 
                <input type="text" placeholder="Search by name, email, phone…" 
                id="mainSearch" />
            </div>
            <!-- Sort -->
            <div class="sel-wrap flex-shrink-0">
              <select id="sortSel" class="sel-styled">
                <option value="active">Most active</option>
                <option value="listings">Highest listings</option>
                <option value="joined">Recently joined</option>
                <option value="alpha">Alphabetical</option>
              </select>
            </div>
            <!-- Items per page -->
            <!-- <div class="sel-wrap flex-shrink-0">
              <select id="perPageSel" class="sel-styled">
                <option value="8">8 / page</option>
                <option value="15" selected>15 / page</option>
                <option value="25">25 / page</option>
              </select>
            </div> -->
          </div>
          <!-- Row 2: filter chips -->
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] mr-1">Status:</span>
            {#each ['all', 'active', 'inactive'] as _}
            <button onclick={() => setStatus(_ as any)} class:active={_ === selectedStatus} class="capitalize fchip text-[11px] font-medium px-3 py-[5px] rounded-full border border-chalk-3 dark:border-white/10 bg-transparent text-navy-dark dark:text-blue-100 cursor-pointer tt">
                {_}
            </button>
            {/each}
            
            <span class="text-chalk-3 dark:text-white/10 mx-1">|</span>
            <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] mr-1">Activity:</span>
            {#each ['all', 'high', 'medium', 'low'] as _}
            <button onclick={() => setActivity(_ as any)} class:active={_ === selectedActivity} class="capitalize fchip text-[11px] font-medium px-3 py-[5px] rounded-full border border-chalk-3 dark:border-white/10 bg-transparent text-navy-dark dark:text-blue-100 cursor-pointer tt">{_}</button>
            {/each}
          </div>
        </div>
      </div>

      <!-- ══ TABLE ══ -->
    <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl overflow-hidden tt mb-6">
        {#if list.length > 0}
        <div class="table-scroll">
          <table class="w-full min-w-[900px]">
            <thead>
              <tr class="border-b border-chalk-3 dark:border-white/[0.07]">
                <th class="text-left px-5 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">User</th>
                <th class="text-left px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Contact</th>
                <th class="text-center px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Status</th>
                <th class="text-right px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Listings</th>
                <th class="text-right px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Active</th>
                <th class="text-right px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Views</th>
                <th class="text-right px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Inquiries</th>
                <th class="text-left px-4 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] hide-md">Last active</th>
                <th class="text-right px-5 py-3.5 text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Actions</th>
              </tr>
            </thead>
            <tbody id="userTableBody">
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">CO</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Chukwuemeka Okafor</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-admin text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Admin</span>
                          <span class="act-high text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">c.okafor@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 803 111 0001</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">42</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">31</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">8.4k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">312</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.7% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">AM</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Adaeze Mba</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-high text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">adaeze.m@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 806 222 0002</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">38</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">27</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">7.2k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">284</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.9% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">EU</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Emeka Uzor</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-high text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">e.uzor@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 809 333 0003</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">35</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">24</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">6.1k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">215</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.5% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">FA</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Fatima Aliyu</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-high text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">fatima.a@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 812 444 0004</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">29</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">20</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">5.4k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">188</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.5% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">TB</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Taiwo Babatunde</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-high text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">taiwo.b@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 701 777 0007</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">26</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">18</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">4.7k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">156</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.4% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">UN</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Uchenna Nwosu</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-high text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">High</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">u.nwosu@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 713 111 0011</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">23</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">16</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">4.1k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">139</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.4% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">AO</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Amaka Obi</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-medium text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Medium</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">amaka.o@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 704 888 0008</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">19</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">13</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">3.8k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">103</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">2.7% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">KU</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Kelechi Uchenna</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-medium text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Medium</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">k.uchenna@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 815 555 0005</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-inactive text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Inactive</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">21</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">8</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">3.1k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">72</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">2.3% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">13mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">ZM</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Zainab Mohammed</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-medium text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Medium</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">z.mohammed@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 716 222 0012</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">17</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">12</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">2.9k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">88</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.0% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">NE</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Ngozi Eze</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-staff text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Staff</span>
                          <span class="act-medium text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Medium</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">ngozi.e@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 818 666 0006</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">14</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">10</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">2.9k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">91</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">3.2% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">BF</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Bola Fashola</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-agent text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Agent</span>
                          <span class="act-low text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Low</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">bola.f@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 710 000 0010</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-inactive text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Inactive</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">11</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">2</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">1.5k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">28</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">1.8% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">13mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
                <tr class="urow border-b border-chalk-3 dark:border-white/[0.05] tt">
                  <td class="px-5 py-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-navy-strong flex items-center justify-center text-[12px] font-medium text-white flex-shrink-0">SA</div>
                      <div class="min-w-0">
                        <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate">Seun Adeyemi</div>
                        <div class="flex items-center gap-1.5 mt-0.5">
                          <span class="role-staff text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Staff</span>
                          <span class="act-low text-[9px] font-semibold uppercase tracking-[.06em] px-2 py-[2px] rounded-full">Low</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">seun.a@premierph.ng</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">+234 707 999 0009</div>
                  </td>
                  <td class="px-4 py-4 text-center">
                    <span class="sp-active text-[10px] font-semibold uppercase tracking-[.06em] px-2.5 py-[3px] rounded-full">Active</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">7</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">total</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">5</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">live</div>
                  </td>
                  <td class="px-4 py-4 text-right hide-md">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">1.2k</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">views</div>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">34</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">2.8% rate</div>
                  </td>
                  <td class="px-4 py-4 hide-md">
                    <div class="text-[12px] text-navy-dark dark:text-blue-100">12mo ago</div>
                    <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">last seen</div>
                  </td>
                  <td class="px-5 py-4 text-right">
                    <button onclick={toggleEditAgentModal} class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright/40 hover:text-blue-bright px-3 py-1.5 rounded-lg tt cursor-pointer">Edit</button>
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
        {:else}
        <!-- Empty state -->
        <div id="emptyState" class="py-16 text-center">
          <div class="w-14 h-14 rounded-2xl bg-chalk-2 dark:bg-white/[.05] flex items-center justify-center mx-auto mb-5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" class="text-chalk-muted dark:text-[#6A7FA0]"><circle cx="9" cy="7" r="5"/><circle cx="17" cy="9" r="4"/><path d="M1 21c0-4 3.6-7 8-7s8 3 8 7"/><path d="M17 15c2.7 0 5 1.8 5 5" stroke-linecap="round"/></svg>
          </div>
          <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">No users <em class="italic">found.</em></h3>
          <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">No users match the current filters.</p>
        </div>
        {/if}
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

        <!-- ══ ACTIVITY INSIGHTS ══ -->
        <div class="mt-5 mb-2">
            <div class="flex items-center justify-between mb-4">
            <div>
                <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:22px">Activity <em class="italic text-blue-bright">insights.</em></h2>
                <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Top performers and engagement overview</p>
            </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    
                <!-- Top performers -->
                <div class="ins-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt">
                    <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-4">Top performing agents</div>
                    <div id="topPerformers" class="space-y-3">
                    <div class="flex items-center gap-3">
                        <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">AM</div>
                        <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Adaeze Mba</span>
                            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 ml-2 flex-shrink-0">38</span>
                        </div>
                        <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-blue-bright rounded-full grow-w" style="--w:100%;width:100%"></div></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">EU</div>
                        <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Emeka Uzor</span>
                            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 ml-2 flex-shrink-0">35</span>
                        </div>
                        <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-blue-bright rounded-full grow-w" style="--w:92%;width:92%"></div></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">FA</div>
                        <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Fatima Aliyu</span>
                            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 ml-2 flex-shrink-0">29</span>
                        </div>
                        <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-blue-bright rounded-full grow-w" style="--w:76%;width:76%"></div></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">TB</div>
                        <div class="flex-1 min-w-0">
                        <div class="flex items-center justify-between mb-1">
                            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Taiwo Babatunde</span>
                            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 ml-2 flex-shrink-0">26</span>
                        </div>
                        <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-blue-bright rounded-full grow-w" style="--w:68%;width:68%"></div></div>
                        </div>
                    </div>
                    </div>
                </div>
    
            <!-- Highest engagement -->
            <div class="ins-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt">
                <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-4">Highest engagement (view→inquiry)</div>
                <div id="topEngagement" class="space-y-3">
                <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">AM</div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Adaeze Mba</span>
                    <span class="text-[11px] font-medium text-ember ml-2 flex-shrink-0">3.9%</span>
                </div>
                <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-ember rounded-full" style="width:100%"></div></div>
                </div>
                </div>
                <div class="flex items-center gap-3">
                <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">CO</div>
                <div class="flex-1 min-w-0">
                <div class="flex items-center justify-between mb-1">
                    <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Chukwuemeka Okafor</span>
                    <span class="text-[11px] font-medium text-ember ml-2 flex-shrink-0">3.7%</span>
                </div>
                <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-ember rounded-full" style="width:94%"></div></div>
                </div>
                </div>
            <div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">EU</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Emeka Uzor</span>
                <span class="text-[11px] font-medium text-ember ml-2 flex-shrink-0">3.5%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-ember rounded-full" style="width:89%"></div></div>
            </div>
        </div><div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">FA</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Fatima Aliyu</span>
                <span class="text-[11px] font-medium text-ember ml-2 flex-shrink-0">3.5%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-ember rounded-full" style="width:88%"></div></div>
            </div>
        </div></div>
            </div>
    
            <!-- Listing upload trend -->
            <div class="ins-card bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.07] rounded-2xl p-5 tt">
                <div class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-4">Listing distribution by agent</div>
                <div id="listingDistribution" class="space-y-3"><div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">CO</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Chukwuemeka Okafor</span>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-2 flex-shrink-0">15%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-gold rounded-full" style="width:15%"></div></div>
            </div>
        </div><div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">AM</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Adaeze Mba</span>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-2 flex-shrink-0">13%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-gold rounded-full" style="width:13%"></div></div>
            </div>
        </div><div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">EU</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Emeka Uzor</span>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-2 flex-shrink-0">12%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-gold rounded-full" style="width:12%"></div></div>
            </div>
        </div><div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">FA</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Fatima Aliyu</span>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-2 flex-shrink-0">10%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-gold rounded-full" style="width:10%"></div></div>
            </div>
        </div><div class="flex items-center gap-3">
            <div class="w-7 h-7 rounded-full bg-navy-strong flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">TB</div>
            <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between mb-1">
                <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 truncate">Taiwo Babatunde</span>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-2 flex-shrink-0">9%</span>
            </div>
            <div class="perf-track h-[5px] rounded-full"><div class="h-full bg-gold rounded-full" style="width:9%"></div></div>
            </div>
        </div></div>
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
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.29s}.d7{animation-delay:.34s}.d8{animation-delay:.39s}
    @keyframes growW{from{width:0}to{width:var(--w)}}
    .grow-w{animation:growW .9s cubic-bezier(.34,1.2,.64,1) .4s both}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .26s cubic-bezier(.22,.68,0,1.2) both}
    
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
    
    /* stat card */
    .stat-card{transition:transform .22s,box-shadow .22s}
    .stat-card:hover{transform:translateY(-2px);box-shadow:0 12px 36px rgba(10,36,99,.11)}
    .dark .stat-card:hover,
    :global([data-theme="dark"]) .stat-card:hover{box-shadow:0 12px 36px rgba(0,0,0,.38)}
    
    /* user row */
    .urow{transition:background .2s}
    .urow:hover{background:rgba(247,243,236,.7)}
    .dark .urow:hover,
    :global([data-theme="dark"]) .urow:hover{background:rgba(255,255,255,.025)}
    
    /* status pills */
    .sp-active{background:#EFF3EE;color:#4A7848}
    .dark .sp-active,
    :global([data-theme="dark"]) .sp-active{background:rgba(74,120,72,.2);color:#7DBF7A}
    .sp-inactive{background:#F5D5C5;color:#5C2416}
    .dark .sp-inactive,
    :global([data-theme="dark"]) .sp-inactive{background:rgba(192,96,53,.15);color:#EDBA9B}
    
    /* role badges */
    .role-admin{background:rgba(10,36,99,.08);color:#1F3F6A}
    .dark .role-admin,
    :global([data-theme="dark"]) .role-admin{background:rgba(74,112,160,.15);color:#8DAACC}
    .role-agent{background:rgba(212,174,58,.12);color:#8A6A10}
    .dark .role-agent,
    :global([data-theme="dark"]) .role-agent{background:rgba(212,174,58,.18);color:#D4AE3A}
    .role-staff{background:rgba(74,120,72,.1);color:#4A7848}
    .dark .role-staff,
    :global([data-theme="dark"]) .role-staff{background:rgba(74,120,72,.18);color:#7DBF7A}
    
    /* activity level */
    .act-high{background:rgba(74,120,72,.12);color:#4A7848}
    .dark .act-high,
    :global([data-theme="dark"]) .act-high{background:rgba(74,120,72,.2);color:#7DBF7A}
    .act-medium{background:rgba(212,174,58,.12);color:#8A6A10}
    .dark .act-medium,
    :global([data-theme="dark"]) .act-medium{background:rgba(212,174,58,.18);color:#D4AE3A}
    .act-low{background:rgba(192,96,53,.1);color:#C06035}
    .dark .act-low,
    :global([data-theme="dark"]) .act-low{background:rgba(192,96,53,.15);color:#EDBA9B}
    
    /* modal */
    .modal-bg{background:rgba(6,14,28,.72);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    
    /* sel wrapper */
    .sel-wrap{position:relative;display:inline-block}
    .sel-wrap::after{content:'▾';position:absolute;right:10px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .sel-wrap::after,
    :global([data-theme="dark"]) .sel-wrap::after{color:#6A7FA0}
    .sel-styled{background:#fff;border:1.5px solid #EDE7DC;border-radius:10px;padding:8px 32px 8px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:#0A2463;outline:none;cursor:pointer;transition:border-color .2s}
    .sel-styled:focus{border-color:rgba(74,144,226,.55)}
    .dark .sel-styled,
    :global([data-theme="dark"]) .sel-styled{background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    
    /* perf bar */
    .perf-track{background:#EDE7DC;border-radius:4px;overflow:hidden}
    .dark .perf-track,
    :global([data-theme="dark"]) .perf-track{background:rgba(255,255,255,.07)}
    
    /* toast */
    #toast{transition:opacity .3s,transform .3s}
    
    /* filter chip */
    .fchip.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .fchip.active,
    :global([data-theme="dark"]) .fchip.active{background:#4A90E2;border-color:#4A90E2}
    
    /* insight card */
    .ins-card{transition:transform .22s,box-shadow .22s}
    .ins-card:hover{transform:translateY(-2px);box-shadow:0 8px 28px rgba(10,36,99,.1)}
    .dark .ins-card:hover,
    :global([data-theme="dark"]) .ins-card:hover {box-shadow:0 8px 28px rgba(0,0,0,.3)}
    
    /* empty state */
    .empty-border{border:2px dashed #EDE7DC}
    .dark .empty-border,
    :global([data-theme="dark"]) .empty-border{border-color:rgba(255,255,255,.08)}
    
    /* modal tab */
    .mtab{color:#8C8070;border-bottom-color:transparent}
    .dark .mtab,
    :global([data-theme="dark"]) .mtab{color:#6A7FA0}
    .mtab.active{color:#0A2463;border-bottom-color:#0A2463}
    .dark .mtab.active,
    :global([data-theme="dark"]) .mtab.active{color:#4A90E2;border-bottom-color:#4A90E2}
    
    /* input */
    .inp{background:#fff;border:1.5px solid #EDE7DC;border-radius:10px;padding:9px 13px;font-family:'DM Sans',sans-serif;font-size:13px;color:#0A2463;outline:none;width:100%;transition:border-color .2s}
    .inp:focus{border-color:rgba(74,144,226,.55)}
    .dark .inp,
    :global([data-theme="dark"]) .inp{background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    .inp::placeholder{color:#8C8070}
    .dark .inp::placeholder,
    :global([data-theme="dark"]) .inp::placeholder{color:#4A5568}

    /* Row 1: search + selects */
    .search-input-wrap{flex:1 1 220px;min-width:0;display:flex;align-items:center;gap:10px;background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;padding:10px 16px;transition:border-color .2s,background .3s}
    .search-input-wrap #mainSearch {flex:2 1 100px;}
    .search-input-wrap:focus-within{border-color:var(--blue-link)}
    .search-input-wrap input{flex:1;min-width:0;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text);width:100%}
    .search-input-wrap input::placeholder{color:var(--text-s)}
    .search-input-icon{color:var(--text-s);flex-shrink:0}
    
    @media(max-width:768px){
      .hide-md{display:none!important}
      .table-scroll{overflow-x:auto}
      .sel-wrap{display:block; width: 100%;}
      .sel-wrap select{ width:100%; }
    }
    @media(max-width:640px){
      .stat-grid{grid-template-columns:1fr 1fr!important}
      .controls-row{flex-direction:column!important;align-items:stretch!important}
      .sel-wrap{display:block; width: 100%;}
      .sel-wrap select{ width:100%; }
    }
</style>