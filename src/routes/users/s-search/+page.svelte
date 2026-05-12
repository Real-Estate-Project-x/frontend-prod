<script>
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";
  let openNewFilter = $state(false);
  let openEditFilter = $state(false);
  let haveAlerts = $state(false);
  let openDeleteModal = $state(false);
  const list = $state([1])

  const toggleNewFilter = () => openNewFilter = !openNewFilter;

  const toggleEditFilter = () => openEditFilter = !openEditFilter;

  const toggleAlerts = () => haveAlerts = !haveAlerts;

  const toggleDeleteModal = () => openDeleteModal = !openDeleteModal;
</script>

{#if openNewFilter}
<!-- ══════════════════════════════════════════
     FILTER / CREATE MODAL
══════════════════════════════════════════ -->
<div id="filterModal" class="fixed inset-0 z-[500] bg-navy-deep/65 modal-backdrop items-end sm:items-center justify-center p-0 sm:p-4 flex">
  <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[620px] max-h-[92vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.28)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden tt">
    <!-- drag pill mobile -->
    <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3 flex-shrink-0"></div>
    <!-- Header -->
    <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
      <div>
        <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5" id="modalSubtitle">New saved search</p>
        <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:22px">Set your filters</h2>
      </div>
      <button aria-label="Close modal" onclick={() => (openNewFilter = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted hover:text-navy-dark dark:hover:text-white hover:border-chalk-4 tt cursor-pointer bg-transparent">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>
    <!-- Body (scrollable) -->
    <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5">
      <!-- Search name -->
      <div class="mb-5">
        <label for="searchNameInput" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Search name</label>
        <input id="searchNameInput" type="text" placeholder="e.g. 3-bed flat Enugu with gym…"
          class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
      </div>
      <!-- Location + Type -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label for="searchCountry" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">State / City</label>
          <select id="searchCountry" class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>All Nigeria</option><option>Rivers State</option><option>Lagos State</option><option>Abuja FCT</option><option>Enugu State</option><option>Delta State</option><option>Anambra</option><option>Ogun State</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Listing type</label>
          <select class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>Any</option><option>For Rent</option><option>For Sale</option>
          </select>
        </div>
      </div>
      <!-- Bedrooms + Bathrooms -->
      <div class="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Bedrooms</label>
          <select class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>Any</option><option>1</option><option>2</option><option selected>3</option><option>4+</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Bathrooms</label>
          <select class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>Any</option><option>1</option><option>2</option><option>3+</option>
          </select>
        </div>
      </div>
      <!-- Price range -->
      <div class="mb-5">
        <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Price range (₦)</label>
        <div class="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Min price" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
          <input type="text" placeholder="Max price" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
        </div>
      </div>
      <!-- Property type -->
      <div class="mb-5">
        <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Property type</label>
        <div class="flex gap-2 flex-wrap">
          <button class="modal-chip active text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">Any</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Apartment</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Detached house</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Duplex</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Land</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Commercial</button>
        </div>
      </div>
      <!-- Amenities -->
      <div class="mb-5">
        <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Amenities</label>
        <div class="flex gap-2 flex-wrap">
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Gym</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">CCTV</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Swimming pool</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Parking</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Generator</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Furnished</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Virtual tour</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Serviced estate</button>
        </div>
      </div>
      <!-- Alerts section -->
      <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 tt">
        <div class="flex items-center justify-between mb-1">
          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Alert preferences</div>
        </div>
        <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Notify me via:</p>
        <div class="flex gap-3 flex-wrap">
          <label class="flex items-center gap-2 text-[13px] cursor-pointer text-navy-dark dark:text-blue-100"><input type="checkbox" checked class="accent-navy-dark dark:accent-blue-bright w-4 h-4"> Push</label>
          <label class="flex items-center gap-2 text-[13px] cursor-pointer text-navy-dark dark:text-blue-100"><input type="checkbox" checked class="accent-navy-dark dark:accent-blue-bright w-4 h-4"> Email</label>
          <label class="flex items-center gap-2 text-[13px] cursor-pointer text-navy-dark dark:text-blue-100"><input type="checkbox" class="accent-navy-dark dark:accent-blue-bright w-4 h-4"> SMS</label>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-chalk-3 dark:border-white/[.08] flex gap-3">
      <button onclick={() => (openNewFilter = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
      <button  class="flex-2 flex-1 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Save search</button>
    </div>
  </div>
</div>
{/if}

{#if openEditFilter}
<!-- ══════════════════════════════════════════
     FILTER / EDIT MODAL
══════════════════════════════════════════ -->
<div id="filterModal" class="fixed inset-0 z-[500] bg-navy-deep/65 modal-backdrop items-end sm:items-center justify-center p-0 sm:p-4 flex">
  <div class="relative bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[620px] max-h-[92vh] flex flex-col shadow-[0_24px_80px_rgba(10,36,99,.28)] dark:shadow-[0_24px_80px_rgba(0,0,0,.7)] overflow-hidden tt">
    <!-- drag pill mobile -->
    <div class="sm:hidden w-10 h-1 bg-chalk-3 dark:bg-white/15 rounded-full mx-auto mt-3 flex-shrink-0"></div>
    <!-- Header -->
    <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
      <div>
        <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5" id="modalSubtitle">Edit saved search</p>
        <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:22px">Update your filters</h2>
      </div>
      <button aria-label="Close modal" onclick={() => (openEditFilter = false)} class="w-8 h-8 rounded-xl border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-chalk-muted hover:text-navy-dark dark:hover:text-white hover:border-chalk-4 tt cursor-pointer bg-transparent">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </button>
    </div>
    <!-- Body (scrollable) -->
    <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5">
      <!-- Search name -->
      <div class="mb-5">
        <label for="searchNameInput" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Search name</label>
        <input id="searchNameInput" type="text" placeholder="e.g. 3-bed flat Enugu with gym…"
          class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
      </div>
      <!-- Location + Type -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
        <div>
          <label for="searchCountry" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">State / City</label>
          <select id="searchCountry" class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>All Nigeria</option><option>Rivers State</option><option>Lagos State</option><option>Abuja FCT</option><option>Enugu State</option><option>Delta State</option><option>Anambra</option><option>Ogun State</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Listing type</label>
          <select class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>Any</option><option>For Rent</option><option>For Sale</option>
          </select>
        </div>
      </div>
      <!-- Bedrooms + Bathrooms -->
      <div class="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Bedrooms</label>
          <select class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>Any</option><option>1</option><option>2</option><option selected>3</option><option>4+</option>
          </select>
        </div>
        <div>
          <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Bathrooms</label>
          <select class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
            <option>Any</option><option>1</option><option>2</option><option>3+</option>
          </select>
        </div>
      </div>
      <!-- Price range -->
      <div class="mb-5">
        <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Price range (₦)</label>
        <div class="grid grid-cols-2 gap-3">
          <input type="text" placeholder="Min price" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
          <input type="text" placeholder="Max price" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
        </div>
      </div>
      <!-- Property type -->
      <div class="mb-5">
        <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Property type</label>
        <div class="flex gap-2 flex-wrap">
          <button class="modal-chip active text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">Any</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Apartment</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Detached house</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Duplex</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Land</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Commercial</button>
        </div>
      </div>
      <!-- Amenities -->
      <div class="mb-5">
        <label class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Amenities</label>
        <div class="flex gap-2 flex-wrap">
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Gym</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">CCTV</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Swimming pool</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Parking</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Generator</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Furnished</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Virtual tour</button>
          <button class="modal-chip text-[12px] px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.1] text-chalk-muted dark:text-[#6A7FA0] cursor-pointer bg-transparent hover:border-navy-dark dark:hover:text-white tt">Serviced estate</button>
        </div>
      </div>
      <!-- Alerts section -->
      <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 tt">
        <div class="flex items-center justify-between mb-1">
          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Alert preferences</div>
        </div>
        <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Notify me via:</p>
        <div class="flex gap-3 flex-wrap">
          <label class="flex items-center gap-2 text-[13px] cursor-pointer text-navy-dark dark:text-blue-100"><input type="checkbox" checked class="accent-navy-dark dark:accent-blue-bright w-4 h-4"> Push</label>
          <label class="flex items-center gap-2 text-[13px] cursor-pointer text-navy-dark dark:text-blue-100"><input type="checkbox" checked class="accent-navy-dark dark:accent-blue-bright w-4 h-4"> Email</label>
          <label class="flex items-center gap-2 text-[13px] cursor-pointer text-navy-dark dark:text-blue-100"><input type="checkbox" class="accent-navy-dark dark:accent-blue-bright w-4 h-4"> SMS</label>
        </div>
      </div>
    </div>
    <!-- Footer -->
    <div class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-chalk-3 dark:border-white/[.08] flex gap-3">
      <button onclick={() => (openEditFilter = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-3 rounded-full cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
      <button  class="flex-2 flex-1 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-3 rounded-full cursor-pointer border-none tt">Update search</button>
    </div>
  </div>
</div>
{/if}

{#if openDeleteModal}
<!-- ══ DELETE CONFIRM MODAL ══ -->
<div id="deleteModal" class="fixed inset-0 z-[500] bg-navy-deep/65 modal-backdrop items-center justify-center p-4 flex">
  <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl w-full max-w-[380px] p-6 shadow-[0_16px_56px_rgba(10,36,99,.25)] dark:shadow-[0_16px_56px_rgba(0,0,0,.6)] tt">
    <div class="w-12 h-12 rounded-2xl bg-ember-light dark:bg-ember/15 flex items-center justify-center mb-4">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C06035" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
    </div>
    <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:20px">Delete saved search?</h3>
    <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65] mb-5" id="deleteMsg">This will remove the saved search and all associated alerts.</p>
    <div class="flex gap-3">
      <button onclick={() => (openDeleteModal = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-[11px] rounded-full cursor-pointer hover:bg-chalk-3 tt">Keep it</button>
      <button onclick={() => {}} class="flex-1 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep py-[11px] rounded-full cursor-pointer border-none tt">Delete</button>
    </div>
  </div>
</div>
{/if}

<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- Page header band -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[1100px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <a href="/users" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Dashboard
            </a>
            <span class="text-white/25 text-[12px]">/</span>
            <span class="text-[12px] text-white/60">Saved searches</span>
          </div>
          <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Smart monitoring</p>
          <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
            Saved searches
          </h1>
          <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
            <span class="w-[6px] h-[6px] rounded-full bg-blue-bright pulse-dot"></span>
            <strong class="text-white font-medium">3</strong> active searches
            <span class="w-1 h-1 rounded-full bg-white/25"></span>
            <strong class="text-white font-medium">14</strong> matching properties
            <span class="w-1 h-1 rounded-full bg-white/25"></span>
            <span class="text-[#E53E3E] font-medium flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-[#E53E3E] pulse-dot"></span>5 new today</span>
          </p>
        </div>
        <button onclick={toggleNewFilter} class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full tt self-start sm:self-end border-none cursor-pointer">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          New saved search
        </button>
      </div>
    </div>

      <!-- ─── Page body ─── -->
      <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto space-y-8">

      {#if list.length > 0}
        <!-- ── SUMMARY STAT STRIP ── -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 fu d1">
          <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 tt">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Active searches</div>
            <div class="font-display text-[28px] font-semibold text-navy-dark dark:text-blue-100 leading-none">3</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>All monitoring</div>
          </div>
          <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 tt">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Total matches</div>
            <div class="font-display text-[28px] font-semibold text-navy-dark dark:text-blue-100 leading-none">14</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-sage"></span>Across all searches</div>
          </div>
          <div class="bg-white dark:bg-[#131C2E] border border-[#EF4444]/40 dark:border-[#EF4444]/30 rounded-2xl p-4 tt">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">New today</div>
            <div class="font-display text-[28px] font-semibold text-[#DC2626] dark:text-[#EF4444] leading-none">5</div>
            <div class="text-[11px] text-[#DC2626] dark:text-[#EF4444] mt-1.5 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#DC2626] pulse-dot"></span>Newly matched listings</div>
          </div>
          <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 tt">
            <div class="text-[10px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Alerts active</div>
            <div class="font-display text-[28px] font-semibold text-navy-dark dark:text-blue-100 leading-none">3</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>Push + Email on</div>
          </div>
        </div>

        <!-- ════════════════════════════════════════
             SAVED SEARCH 1 — with new matches
        ════════════════════════════════════════ -->
        <div class="ss-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden" id="ss1">
          <!-- Card header -->
          <div class="px-4 sm:px-6 py-4 border-b border-chalk-3 dark:border-white/[.07]">
            <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <!-- Left: title + filter chips -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-2 flex-wrap">
                  <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">
                    3-bed flat · Enugu · Gym &amp; CCTV</h2>
                  <span class="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[.08em] bg-[#EF4444]/10 text-[#DC2626] dark:bg-[#EF4444]/15 dark:text-[#EF4444] px-2 py-[3px] rounded-full new-pulse"><span class="w-1.5 h-1.5 rounded-full bg-[#DC2626] dark:bg-[#EF4444]"></span>5 new</span>
                </div>
                <!-- Filter chips -->
                <div class="flex gap-1.5 flex-wrap ">
                  <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">📍 Enugu State</span>
                  <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">🛏 3 beds</span>
                  <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">🏠 Apartment</span>
                  <span class="text-[11px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[4px] rounded-full">Gym</span>
                  <span class="text-[11px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[4px] rounded-full">CCTV</span>
                  <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-2.5 py-[4px] rounded-full border border-chalk-3 dark:border-white/[.08]">For Rent</span>
                </div>
              </div>
              <!-- Right: actions -->
              <div class="flex items-center gap-2 flex-shrink-0 flex-wrap">
                <!-- Alert toggle -->
                <button onclick={toggleAlerts} class={`${haveAlerts ? 'alert-on' : 'alert-off'} flex items-center gap-1.5 alert-pill text-[11px] font-medium px-3 py-[6px] rounded-full border cursor-pointer bg-transparent tt`}>
                  <svg class="alert-icon w-[12px] h-[12px]" viewBox="0 0 20 20" fill="none">
                  {#if haveAlerts}
                  <path d="M3 3l14 14M10 2a6 6 0 016 6v2l1.5 2.5a1 1 0 01-.86 1.5H3.36a1 1 0 01-.86-1.5L4 10V8a6 6 0 012-4.47M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                  {:else}
                  <path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4"/>
                  {/if}
                  </svg>
                  {haveAlerts ? 'Alerts on' : 'Alerts off'}
                </button>
                <!-- Edit -->
                <button onclick={toggleEditFilter} class="flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] px-3 py-[6px] rounded-full cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 10l1.5-1.5 7-7 1.5 1.5-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 2l1.5-1.5 1.5 1.5-1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Edit
                </button>
                <!-- Delete -->
                <button onclick={toggleDeleteModal} class="flex items-center gap-1.5 text-[12px] font-medium text-ember dark:text-[#EDBA9B] bg-ember-light/50 dark:bg-ember/[.08] border border-ember-light dark:border-ember/25 px-3 py-[6px] rounded-full cursor-pointer hover:bg-ember-light hover:border-ember/40 tt">
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><polyline points="2 4 3 4 12 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M11 4l-.7 8a1 1 0 01-1 .93H4.7a1 1 0 01-1-.93L3 4M5.5 4V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  Delete
                </button>
              </div>
            </div>
            <!-- Meta row -->
            <div class="flex items-center gap-4 mt-3 flex-wrap">
              <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l2 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Created 12 Mar 2026 · Last matched <strong class="text-navy-dark dark:text-blue-100 font-medium">14 min ago</strong></span>
              <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M4 1v3M10 1v3M1 7h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg><strong class="text-navy-dark dark:text-blue-100 font-medium">7</strong> total matches</span>
              <span class="text-[11px] font-medium text-[#DC2626] dark:text-[#EF4444] flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-[#DC2626] dark:bg-[#EF4444] pulse-dot"></span>5 new since last visit</span>
            </div>
          </div>
  
          <!-- Property grid for search 1 -->
          <div class="px-5 sm:px-6 py-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
  
              <!-- NEW Property Card 1 -->
              <div class="pc bg-chalk dark:bg-[#0D1422] border-2 pc-new rounded-2xl overflow-hidden cursor-pointer tt">
                <div class="relative h-[158px] overflow-hidden">
                  <div class="prop-scene sky-3">
                    <div class="prop-b" style="width:76px;height:100px;left:44px"></div>
                    <div class="prop-w" style="width:11px;height:14px;left:52px;bottom:74px"></div><div class="prop-w" style="width:11px;height:14px;left:69px;bottom:74px"></div>
                    <div class="prop-w" style="width:11px;height:14px;left:52px;bottom:52px"></div><div class="prop-w" style="width:11px;height:14px;left:69px;bottom:52px"></div>
                    <div class="prop-w" style="width:11px;height:14px;left:52px;bottom:31px"></div>
                    <div class="prop-b" style="width:50px;height:62px;left:140px"></div>
                    <div class="prop-w" style="width:8px;height:10px;left:148px;bottom:42px"></div><div class="prop-w" style="width:8px;height:10px;left:162px;bottom:42px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] bg-[#DC2626] text-white px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-white/70"></span>New match</span>
                  <span class="absolute top-2.5 right-2.5 text-[9px] font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <div class="px-4 pt-3.5 pb-4">
                  <div class="font-display text-[19px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦780,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div>
                  <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Independence Layout, Enugu</div>
                  <div class="flex gap-3 text-[11px] text-navy-accent dark:text-[#8DAACC] mb-3 border-t border-chalk-3 dark:border-white/[.07] pt-3 flex-wrap">
                    <span class="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>3 beds</span>
                    <span class="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M2 9h12M2 9v3a1 1 0 001 1h10a1 1 0 001-1V9M14 9V5a2 2 0 00-2-2H8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>2 baths</span>
                    <span class="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/></svg>88 m²</span>
                  </div>
                  <div class="flex gap-2">
                    <button class="flex-1 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[8px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                      <a href="/site/properties/89">View property</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp agent">
                      <a href="https://wa.me/2348001234567" aria-label="Whatsapp Agent">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                      </a>
                    </button>
                    <a href="tel:+2348001234567" class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              </div>
  
              <!-- NEW Property Card 2 -->
              <div class="pc bg-chalk dark:bg-[#0D1422] border-2 pc-new rounded-2xl overflow-hidden cursor-pointer tt">
                <div class="relative h-[158px] overflow-hidden">
                  <div class="prop-scene sky-2">
                    <div class="prop-b" style="width:88px;height:118px;left:56px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:65px;bottom:90px"></div><div class="prop-w" style="width:12px;height:15px;left:83px;bottom:90px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:65px;bottom:67px"></div><div class="prop-w" style="width:12px;height:15px;left:83px;bottom:67px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:65px;bottom:44px"></div><div class="prop-w" style="width:12px;height:15px;left:83px;bottom:44px"></div>
                  </div>
                  <span class="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] bg-[#DC2626] text-white px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-white/70"></span>New match</span>
                  <span class="absolute top-2.5 right-2.5 text-[9px] font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <div class="px-4 pt-3.5 pb-4">
                  <div class="font-display text-[19px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦920,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div>
                  <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>GRA, Enugu State</div>
                  <div class="flex gap-3 text-[11px] text-navy-accent dark:text-[#8DAACC] mb-3 border-t border-chalk-3 dark:border-white/[.07] pt-3 flex-wrap">
                    <span class="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>3 beds</span>
                    <span class="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M2 9h12M2 9v3a1 1 0 001 1h10a1 1 0 001-1V9M14 9V5a2 2 0 00-2-2H8" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>2 baths</span>
                    <span class="flex items-center gap-1"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/></svg>102 m²</span>
                  </div>
                  <div class="flex gap-2">
                    <button class="flex-1 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[8px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                      <a href="/site/properties/89">View property</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp agent">
                      <a href="https://wa.me/2348001234567" aria-label="Whatsapp Agent">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                      </a>
                    </button>
                    <a href="tel:+2348001234567" class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              </div>
  
              <!-- Older property card -->
              <div class="pc bg-chalk dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden cursor-pointer tt">
                <div class="relative h-[158px] overflow-hidden">
                  <div class="prop-scene sky-1">
                    <div class="prop-b" style="width:68px;height:86px;left:38px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:46px;bottom:62px"></div><div class="prop-w" style="width:10px;height:13px;left:62px;bottom:62px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:46px;bottom:42px"></div><div class="prop-w" style="width:10px;height:13px;left:62px;bottom:42px"></div>
                    <div class="prop-b" style="width:46px;height:56px;left:125px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:132px;bottom:38px"></div><div class="prop-w" style="width:7px;height:9px;left:145px;bottom:38px"></div>
                  </div>
                  <span class="absolute top-2.5 right-2.5 text-[9px] font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Rent</span>
                </div>
                <div class="px-4 pt-3.5 pb-4">
                  <div class="font-display text-[19px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦650,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div>
                  <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3 flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Trans-Ekulu, Enugu</div>
                  <div class="flex gap-3 text-[11px] text-navy-accent dark:text-[#8DAACC] mb-3 border-t border-chalk-3 dark:border-white/[.07] pt-3 flex-wrap">
                    <span class="flex items-center gap-1">🛏 3 beds</span>
                    <span class="flex items-center gap-1">🚿 2 baths</span>
                    <span class="flex items-center gap-1">📐 92 m²</span>
                  </div>
                  <div class="flex gap-2">
                    <button class="flex-1 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[8px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                      <a href="/site/properties/89">View property</a>
                    </button>
                    <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0" title="WhatsApp agent">
                      <a href="https://wa.me/2348001234567" aria-label="Whatsapp Agent">
                        <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                      </a>
                    </button>
                    <a href="tel:+2348001234567" class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0" title="Call agent">
                      <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </a>
                  </div>
                </div>
              </div>
  
            </div>
  
            <!-- Pagination for SS1 -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-chalk-3 dark:border-white/[.07]">
              <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Showing 1–3 of 7 matches</span>
              <div class="flex items-center gap-1.5 flex-wrap justify-center">
                <button disabled class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] text-chalk-muted dark:text-[#6A7FA0] cursor-not-allowed opacity-40 flex items-center justify-center bg-transparent">‹</button>
                <button class="pgbtn active w-8 h-8 border rounded-lg text-[12px] flex items-center justify-center cursor-pointer">1</button>
                <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt">2</button>
                <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt">3</button>
                <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt">›</button>
                <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] ml-2">Show</span>
                <select class="bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] rounded-lg px-3 py-[5px] text-[12px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
                  <option>3 / page</option><option>6 / page</option><option>12 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div><!-- /SS1 -->
  
  
        <!-- ════════════════════════════════════════
           SAVED SEARCH 2
      ════════════════════════════════════════ -->
      <div class="ss-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden" id="ss2">
        <div class="px-4 sm:px-6 py-4 border-b border-chalk-3 dark:border-white/[.07]">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">4-bed duplex · GRA Port Harcourt</h2>
                <span class="text-[10px] font-semibold uppercase tracking-[.08em] bg-blue-bright/10 text-blue-bright px-2 py-[3px] rounded-full">2 new</span>
              </div>
              <div class="flex gap-1.5 flex-wrap">
                <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">📍 Port Harcourt</span>
                <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">🛏 4 beds</span>
                <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">🏠 Duplex</span>
                <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-2.5 py-[4px] rounded-full border border-chalk-3 dark:border-white/[.08]">For Sale</span>
                <span class="text-[11px] font-medium text-[#8A6A10] dark:text-gold bg-gold/10 px-2.5 py-[4px] rounded-full">₦80M – ₦150M</span>
              </div>
            </div>
            
            <div class="flex items-center gap-2 flex-shrink-0 flex-wrap">
              <button onclick={toggleAlerts} class={`${haveAlerts ? 'alert-on' : 'alert-off'} flex items-center gap-1.5 alert-pill text-[11px] font-medium px-3 py-[6px] rounded-full border cursor-pointer bg-transparent tt`}>
                <svg class="alert-icon w-[12px] h-[12px]" viewBox="0 0 20 20" fill="none">
                {#if haveAlerts}
                <path d="M3 3l14 14M10 2a6 6 0 016 6v2l1.5 2.5a1 1 0 01-.86 1.5H3.36a1 1 0 01-.86-1.5L4 10V8a6 6 0 012-4.47M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                {:else}
                <path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4"/>
                {/if}
                </svg>
                {haveAlerts ? 'Alerts on' : 'Alerts off'}
              </button>
              <button onclick={toggleEditFilter} class="flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] px-3 py-[6px] rounded-full cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 10l1.5-1.5 7-7 1.5 1.5-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 2l1.5-1.5 1.5 1.5-1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Edit
              </button>
              <button onclick={toggleDeleteModal} class="flex items-center gap-1.5 text-[12px] font-medium text-ember dark:text-[#EDBA9B] bg-ember-light/50 dark:bg-ember/[.08] border border-ember-light dark:border-ember/25 px-3 py-[6px] rounded-full cursor-pointer hover:bg-ember-light hover:border-ember/40 tt">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><polyline points="2 4 3 4 12 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M11 4l-.7 8a1 1 0 01-1 .93H4.7a1 1 0 01-1-.93L3 4M5.5 4V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Delete
              </button>
            </div>
          </div>
          <div class="flex items-center gap-4 mt-3 flex-wrap">
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l2 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Created 3 Feb 2026 · Last matched <strong class="text-navy-dark dark:text-blue-100 font-medium">2 hours ago</strong></span>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]"><strong class="text-navy-dark dark:text-blue-100 font-medium">5</strong> total matches · <strong class="text-blue-bright font-medium">2 new</strong></span>
          </div>
        </div>
        <!-- SS2 properties (2 cards) -->
        <div class="px-5 sm:px-6 py-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- New match -->
            <div class="pc bg-chalk dark:bg-[#0D1422] border-2 pc-new rounded-2xl overflow-hidden cursor-pointer tt">
              <div class="relative h-[152px] overflow-hidden">
                <div class="prop-scene sky-4">
                  <div class="prop-b" style="width:80px;height:110px;left:42px;border-radius:5px 5px 0 0"></div>
                  <div class="prop-w" style="width:11px;height:14px;left:50px;bottom:85px"></div><div class="prop-w" style="width:11px;height:14px;left:67px;bottom:85px"></div>
                  <div class="prop-w" style="width:11px;height:14px;left:50px;bottom:62px"></div><div class="prop-w" style="width:11px;height:14px;left:67px;bottom:62px"></div>
                  <div class="prop-w" style="width:11px;height:14px;left:50px;bottom:40px"></div><div class="prop-w" style="width:11px;height:14px;left:67px;bottom:40px"></div>
                  <div class="prop-b" style="width:55px;height:72px;left:140px"></div>
                  <div class="prop-w" style="width:8px;height:10px;left:148px;bottom:50px"></div><div class="prop-w" style="width:8px;height:10px;left:162px;bottom:50px"></div>
                </div>
                <span class="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] bg-[#DC2626] text-white px-2 py-[3px] rounded-full">New</span>
                <span class="absolute top-2.5 right-2.5 text-[9px] font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Sale</span>
              </div>
              <div class="px-4 pt-3.5 pb-4">
                <div class="font-display text-[19px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦110,000,000</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">GRA Phase 3, Port Harcourt</div>
                <div class="flex gap-3 text-[11px] text-navy-accent dark:text-[#8DAACC] mb-3 border-t border-chalk-3 dark:border-white/[.07] pt-3 flex-wrap">
                  <span>🛏 4 beds</span><span>🚿 4 baths</span><span>📐 210 m²</span>
                </div>
                <div class="flex gap-2">
                  <button class="flex-1 text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright py-[8px] rounded-full border-none cursor-pointer hover:opacity-90 tt">
                    <a href="/site/properties/89">View property</a>
                  </button>
                  <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0">
                    <a href="https://wa.me/2348001234567" aria-label="Whatsapp Agent">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                    </a>
                  </button>
                  <a href="tel:+2348001234567" class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                </div>
              </div>
            </div>
            <!-- Regular match -->
            <div class="pc bg-chalk dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden cursor-pointer tt">
              <div class="relative h-[152px] overflow-hidden">
                <div class="prop-scene sky-1">
                  <div class="prop-b" style="width:90px;height:108px;left:50px"></div>
                  <div class="prop-w" style="width:12px;height:15px;left:58px;bottom:82px"></div><div class="prop-w" style="width:12px;height:15px;left:76px;bottom:82px"></div>
                  <div class="prop-w" style="width:12px;height:15px;left:58px;bottom:58px"></div><div class="prop-w" style="width:12px;height:15px;left:76px;bottom:58px"></div>
                  <div class="prop-w" style="width:12px;height:15px;left:58px;bottom:35px"></div>
                  <div class="prop-b" style="width:56px;height:68px;left:158px"></div>
                  <div class="prop-w" style="width:8px;height:10px;left:166px;bottom:48px"></div><div class="prop-w" style="width:8px;height:10px;left:180px;bottom:48px"></div>
                </div>
                <span class="absolute top-2.5 right-2.5 text-[9px] font-medium text-white/70 bg-black/30 backdrop-blur-sm px-2 py-[3px] rounded-full">For Sale</span>
              </div>
              <div class="px-4 pt-3.5 pb-4">
                <div class="font-display text-[19px] font-semibold text-navy-dark dark:text-blue-100 mb-0.5">₦95,000,000</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">GRA Phase 2, Port Harcourt</div>
                <div class="flex gap-3 text-[11px] text-navy-accent dark:text-[#8DAACC] mb-3 border-t border-chalk-3 dark:border-white/[.07] pt-3 flex-wrap">
                  <span>🛏 4 beds</span><span>🚿 3 baths</span><span>📐 182 m²</span>
                </div>
                <div class="flex gap-2">
                  <button class="flex-1 text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] py-[8px] rounded-full cursor-pointer hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright tt bg-transparent">
                    <a href="/site/properties/89">View property</a>
                  </button>
                  <button class="w-9 h-9 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center cursor-pointer hover:bg-[#25D366]/20 tt flex-shrink-0">
                    <a href="https://wa.me/2348001234567">
                      <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a8 8 0 015.9 13.4L17 18l-2.7-1.05A8 8 0 1110 2z" fill="#25D366"/><path d="M7.5 9.5c.5 1.5 2 3 3.5 3.5l1-1c.2-.2.5-.2.8-.1l1.7.8c.3.1.5.4.5.7v1.1c0 .3-.3.6-.6.5A8 8 0 016 6.6c-.1-.3.2-.6.5-.6H7.6c.3 0 .6.2.7.5l.8 1.7c.1.3.1.6-.1.8l-1 1z" fill="white"/></svg>
                    </a>
                  </button>
                  <a href="tel:+2348001234567" class="w-9 h-9 rounded-full bg-blue-bright/10 border border-blue-bright/30 flex items-center justify-center cursor-pointer hover:bg-blue-bright/20 tt flex-shrink-0"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 3h4l1.5 3.5-2 1.5a10.1 10.1 0 004.5 4.5l1.5-2L16 12v4c-7.18 0-13-5.82-13-13z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
                </div>
              </div>
            </div>
          </div>
          <!-- SS2 pagination -->
          <div class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5 pt-4 border-t border-chalk-3 dark:border-white/[.07]">
            <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Showing 1–2 of 5 matches</span>
            <div class="flex items-center gap-1.5 flex-wrap justify-center">
              <button disabled class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] opacity-40 flex items-center justify-center bg-transparent cursor-not-allowed">‹</button>
              <button class="pgbtn active w-8 h-8 border rounded-lg text-[12px] flex items-center justify-center cursor-pointer">1</button>
              <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt">2</button>
              <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-lg text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt">›</button>
              <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] ml-2">Show</span>
              <select class="bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] rounded-lg px-3 py-[5px] text-[12px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
                <option>2 / page</option><option>6 / page</option>
              </select>
            </div>
          </div>
        </div>
      </div><!-- /SS2 -->


      <!-- ════════════════════════════════════════
           SAVED SEARCH 3 — Alerts OFF
      ════════════════════════════════════════ -->
      <div class="ss-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden" id="ss3">
        <div class="px-4 sm:px-6 py-4 border-b border-chalk-3 dark:border-white/[.07]">
          <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 mb-2 flex-wrap">
                <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">Studio · Lagos Island · under ₦400k/mo</h2>
              </div>
              <div class="flex gap-1.5 flex-wrap">
                <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">📍 Lagos Island</span>
                <span class="text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">🛏 Studio</span>
                <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] px-2.5 py-[4px] rounded-full border border-chalk-3 dark:border-white/[.08]">For Rent</span>
                <span class="text-[11px] font-medium text-[#8A6A10] dark:text-gold bg-gold/10 px-2.5 py-[4px] rounded-full">Max ₦400k/mo</span>
              </div>
            </div>
            <div class="flex items-center gap-2 flex-shrink-0 flex-wrap">
              <button onclick={toggleAlerts} class={`${haveAlerts ? 'alert-on' : 'alert-off'} flex items-center gap-1.5 alert-pill text-[11px] font-medium px-3 py-[6px] rounded-full border cursor-pointer bg-transparent tt`}>
                <svg class="alert-icon w-[12px] h-[12px]" viewBox="0 0 20 20" fill="none">
                {#if haveAlerts}
                <path d="M3 3l14 14M10 2a6 6 0 016 6v2l1.5 2.5a1 1 0 01-.86 1.5H3.36a1 1 0 01-.86-1.5L4 10V8a6 6 0 012-4.47M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
                {:else}
                <path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4"/>
                {/if}
                </svg>
                {haveAlerts ? 'Alerts on' : 'Alerts off'}
              </button>
              <button onclick={toggleEditFilter} class="flex items-center gap-1.5 text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] px-3 py-[6px] rounded-full cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 10l1.5-1.5 7-7 1.5 1.5-7 7L2 10z" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/><path d="M9.5 2l1.5-1.5 1.5 1.5-1.5 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Edit
              </button>
              <button onclick={toggleDeleteModal} class="flex items-center gap-1.5 text-[12px] font-medium text-ember dark:text-[#EDBA9B] bg-ember-light/50 dark:bg-ember/[.08] border border-ember-light dark:border-ember/25 px-3 py-[6px] rounded-full cursor-pointer hover:bg-ember-light tt">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><polyline points="2 4 3 4 12 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/><path d="M11 4l-.7 8a1 1 0 01-1 .93H4.7a1 1 0 01-1-.93L3 4M5.5 4V2.5a.5.5 0 01.5-.5h2a.5.5 0 01.5.5V4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Delete
              </button>
            </div>
          </div>
          <div class="flex items-center gap-4 mt-3 flex-wrap">
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5"><svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l2 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>Created 28 Jan 2026 · Last matched <strong class="text-navy-dark dark:text-blue-100 font-medium">3 days ago</strong></span>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]"><strong class="text-navy-dark dark:text-blue-100 font-medium">2</strong> total matches · no new</span>
          </div>
        </div>
        <!-- SS3 — no new results banner -->
        <div class="px-5 sm:px-6 py-6 flex flex-col sm:flex-row items-center gap-4">
          <div class="w-12 h-12 rounded-2xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#8C8070" stroke-width="1.5"/><path d="M21 21l-4.35-4.35" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round"/><path d="M8 11h6M11 8v6" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round"/></svg>
          </div>
          <div class="flex-1 min-w-0 text-center sm:text-left">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1">No new matches since your last visit</div>
            <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">2 properties match your search. New listings are checked every 6 hours — we'll notify you when something new appears.</p>
          </div>
          <button class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-2.5 rounded-full hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt flex-shrink-0 no-underline"
             onclick={toggleEditFilter}>Edit Filter → </button>
          <!-- <a href="search_results.html" class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.15] px-4 py-2.5 rounded-full hover:bg-navy-dark hover:text-white dark:hover:bg-blue-bright dark:hover:border-blue-bright tt flex-shrink-0 no-underline">Browse matches →</a> -->
        </div>
      </div><!-- /SS3 -->
        {:else}
  
        <!-- ════ EMPTY STATE (add 4th if ever 0 searches) ════ -->
        <!-- Shows only when no searches exist — hidden by default -->
        <div class="text-center py-16">
          <div class="float mb-6 inline-block">
            <div class="w-20 h-20 rounded-3xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center mx-auto tt">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#8C8070" stroke-width="1.4"/><path d="M21 21l-4.35-4.35" stroke="#8C8070" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
          </div>
          <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:24px">No saved searches <em class="italic">yet.</em></h3>
          <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] max-w-[340px] mx-auto mb-6">Create a saved search and we'll alert you the moment a matching property is listed.</p>
          <button onclick={toggleNewFilter} class="text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-6 py-3 rounded-full border-none cursor-pointer tt">
            Create your first search
          </button>
        </div>
        {/if}
  
      </div><!-- /body -->

    </main>
</div>

<style>
  /* ── core ── */
  .tt{transition:background-color .3s,color .3s,border-color .3s}
  select{-webkit-appearance:none;appearance:none}
  .scrollbar-hide::-webkit-scrollbar{display:none}
  .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
  
  /* ── animations ── */
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
  .pulse-dot{animation:pulse-dot 2.2s infinite}
  @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
  .fu{animation:fadeUp .52s ease both}
  .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
  .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.29s}
  @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
  .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
  @keyframes floatUp{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
  .float{animation:floatUp 3.5s ease-in-out infinite}
  @keyframes newPulse{0%,100%{box-shadow:0 0 0 0 rgba(220,38,38,.3)}50%{box-shadow:0 0 0 5px rgba(220,38,38,0)}}
  .new-pulse{animation:newPulse 2.5s ease-in-out infinite}
  
  /* ── sidebar ── */
  .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
  .dark .sb-link.active{background:rgba(74,144,226,.15)}
  .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
  .dark .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
  #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
  #sbOverlay.open{opacity:1;pointer-events:all}
  #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
  
  /* ── saved-search card ── */
  .ss-card{transition:box-shadow .22s,border-color .2s}
  .ss-card:hover{box-shadow:0 8px 30px rgba(10,36,99,.09)}
  .dark .ss-card:hover{box-shadow:0 8px 30px rgba(0,0,0,.35)}
  
  /* ── property card inside search ── */
  .pc{transition:transform .22s,box-shadow .22s,border-color .2s}
  .pc:hover{transform:translateY(-3px);box-shadow:0 12px 36px rgba(10,36,99,.13)}
  .dark .pc:hover{box-shadow:0 12px 36px rgba(0,0,0,.45)}
  .pc:hover{border-color:#4A90E2!important}
  
  /* ── new-match card ring ── */
  .pc-new{border-color:#DC2626!important}
  .dark .pc-new{border-color:#EF4444!important}
  
  /* ── prop illustrations ── */
  .prop-scene{width:100%;height:100%;position:relative}
  .sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
  .sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
  .sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 40%,#1F3F6A 100%)}
  .sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
  .prop-b{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
  .prop-w{position:absolute;background:rgba(212,174,58,.68);border-radius:2px}
  
  /* ── modals ── */
  /* #filterModal,#deleteModal,#editModal{display:none} */
  #filterModal.open,#deleteModal.open,#editModal.open{display:flex}
  #filterModal,.modal-backdrop{backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}
  
  /* ── pagination btn ── */
  .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
  .dark .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
  
  /* ── alert toggle ── */
  .alert-on .alert-icon{color:#4A7848}
  .alert-on .alert-pill{background:rgba(74,120,72,.12);color:#4A7848;border-color:rgba(74,120,72,.3)}
  .dark .alert-on .alert-pill{background:rgba(74,120,72,.18);color:#7DBF7A;border-color:rgba(74,120,72,.25)}
  .alert-off .alert-icon{color:#8C8070}
  .alert-off .alert-pill{background:rgba(140,128,112,.1);color:#8C8070;border-color:rgba(140,128,112,.2)}
  .dark .alert-off .alert-pill{background:rgba(106,127,160,.08);color:#6A7FA0;border-color:rgba(106,127,160,.15)}
  
  /* ── mobile responsive ── */
  @media(max-width:640px){
    .mobile-wrap{flex-wrap:wrap}
    .hide-xs{display:none!important}
  }
  </style>