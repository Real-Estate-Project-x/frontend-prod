<script lang="ts">
    let location = $state('');
    let type     = $state('Buy');
    let beds     = $state('Any beds');
  
    function handleSearch() {
      // Navigate or emit event
      console.log({ location, type, beds });
    }
  </script>
  
  <div class="animate-fadeUp4 search-bar-enhanced flex items-center rounded-40
              px-6 py-[6px] max-w-[640px] w-full mx-auto gap-3">
  
    <div class="search-input-group flex items-center gap-2 flex-1 min-w-0 search-row">
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
           class="flex-shrink-0 opacity-40">
        <circle cx="7" cy="7" r="5" stroke="white" stroke-width="1.5"/>
        <path d="M11 11l3 3" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
      </svg>
      <input type="text" bind:value={location} class="search-input"
             placeholder="City, neighbourhood, or postcode…" />
    </div>
  
    <div class="search-divider-h w-px h-5 bg-white/15 flex-shrink-0"></div>
  
    <select bind:value={type} class="search-select search-row">
      <option>Buy</option>
      <option>Rent</option>
    </select>
  
    <div class="search-divider-h w-px h-5 bg-white/15 flex-shrink-0"></div>
  
    <select bind:value={beds} class="search-select search-row">
      <option>Any beds</option>
      <option>1 bed</option>
      <option>2 beds</option>
      <option>3+ beds</option>
    </select>
  
    <button
      class="search-btn bg-ember hover:bg-[#a04e28] text-white font-sans text-13px
             font-medium tracking-[0.04em] px-6 py-3 rounded-40 border-none cursor-pointer
             whitespace-nowrap transition-all duration-200 hover:scale-[1.02] flex-shrink-0"
      onclick={handleSearch}
    >
      Search
    </button>
  </div>
