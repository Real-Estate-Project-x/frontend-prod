<script lang="ts">
    export interface Country {
      isoCode: string;
      name: string;
      dialCode: string;
      flag: string;
      pinned?: boolean;
    }
  
    interface Props {
      countries?:       Country[];
      selectedCountry?: Country;
      oninput?:         (e: Event) => void;
      onchange?:        (country: Country) => void;
      placeholder?:     string;
      value?:           string;
    }
  
    const DEFAULT_COUNTRIES: Country[] = []
  
    let {
      countries       = DEFAULT_COUNTRIES,
      selectedCountry = DEFAULT_COUNTRIES[0],
      oninput,
      onchange,
      placeholder     = '803 000 0000',
      value           = '',
    }: Props = $props();
  
    // Internal state
    let selected      = $state<Country>(selectedCountry);
    let open          = $state(false);
    let search        = $state('');
    let phoneValue    = $state(value);
    let searchInputEl = $state<HTMLInputElement | null>(null);
    let shellEl       = $state<HTMLDivElement   | null>(null);
  
    // Keep internal selected in sync if parent changes selectedCountry prop
    $effect(() => { selected = selectedCountry; });
    // Keep internal phoneValue in sync if parent changes value prop
    $effect(() => { phoneValue = value; });
  
    const pinnedResults = $derived(countries.filter(c =>  c.pinned && matchesSearch(c, search)));
    const restResults   = $derived(countries.filter(c => !c.pinned && matchesSearch(c, search)));
  
    const matchesSearch = (c: Country, q: string): boolean => {
      if (!q) return true;
      const lower = q.toLowerCase();
      return c.name.toLowerCase().includes(lower) || c.dialCode.includes(lower);
    }
  
    const selectCountry = (c: Country) => {
      selected = c;
      open     = false;
      search   = '';
      // Notify parent of country change
      onchange?.(c);
    }
  
    const toggleDropdown = () => {
      open = !open;
      if (open) setTimeout(() => searchInputEl?.focus(), 50);
      else search = '';
    }
  
    const handleInput = (e: Event) => {
      const input = e.target as HTMLInputElement;
      // Format the number
      let v = input.value.replace(/\D/g, '').slice(0, 11);
      if      (v.length > 7) v = v.slice(0,3) + ' ' + v.slice(3,7) + ' ' + v.slice(7);
      else if (v.length > 3) v = v.slice(0,3) + ' ' + v.slice(3);
      phoneValue    = v;
      input.value   = v; // keep DOM in sync before parent reads it
      // Forward the native event to parent — value is e.target.value
      oninput?.(e);
    }
  
    const handleOutsideClick = (e: MouseEvent) => {
      if (open && shellEl && !shellEl.contains(e.target as Node)) {
        open   = false;
        search = '';
      }
    }
</script>
  
<svelte:window onclick={handleOutsideClick} />
  
{#if countries && selectedCountry}
  <div class="field-root mb-3">
    <p class="field-label">Phone Number</p>
  
    <div bind:this={shellEl} class="shell">
  
      <button type="button" onclick={toggleDropdown} class="flag-btn">
        <span class="flag-emoji">{selected.flag}</span>
        <span class="dial-code">{selected.dialCode}</span>
        <svg class="chevron" class:chevron--up={open} viewBox="0 0 12 12" fill="none">
          <path d="M2 4L6 8L10 4" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
  
      <input
        type="tel"
        value={phoneValue}
        {placeholder}
        oninput={handleInput}
        class="phone-num"
        autocomplete="tel-national"
      />
  
      {#if open}
        <div class="dropdown">
          <div class="search-wrap">
            <input
              bind:this={searchInputEl}
              bind:value={search}
              type="text"
              placeholder="Search country…"
              class="search-input"
            />
          </div>
  
          <div class="country-list">
            {#if pinnedResults.length}
              {#if !search}
                <p class="section-header">Suggested</p>
              {/if}
              {#each pinnedResults as country (country.isoCode)}
                <button
                  type="button"
                  onclick={() => selectCountry(country)}
                  class="country-item"
                  class:country-item--active={selected.isoCode === country.isoCode}
                >
                  <span class="flag-emoji">{country.flag}</span>
                  <span class="country-name capitalize">{country.name}</span>
                  {#if country.pinned && !search}
                    <span class="pin-badge">NG</span>
                  {/if}
                  <span class="item-dial">+{country.dialCode}</span>
                </button>
              {/each}
              {#if restResults.length && !search}
                <p class="section-header">All countries</p>
              {/if}
            {/if}
  
            {#each restResults as country (country.isoCode)}
              <button
                type="button"
                onclick={() => selectCountry(country)}
                class="country-item"
                class:country-item--active={selected.isoCode === country.isoCode}
              >
                <span class="flag-emoji">{country.flag}</span>
                <span class="country-name capitalize">{country.name}</span>
                <span class="item-dial">+{country.dialCode}</span>
              </button>
            {/each}
  
            {#if pinnedResults.length === 0 && restResults.length === 0}
              <p class="no-results">No results</p>
            {/if}
          </div>
        </div>
      {/if}
    </div>
  </div>
{/if}

<style>
    .field-root {
      --bp-chalk:           #FEFCF8;
      --bp-navy-deep:   #060E1C;
      --bp-navy-dark:   #0A2463;
      --bp-blue:        #6A7FA0;
      --bp-blue-dim:    #4A70A0;
      --shell-bg:           #FEFCF8;
      --shell-border:       #C8D8EE;
      --shell-border-focus: #4A90E2;
      --shell-ring:         rgba(74,144,226,0.13);
      --divider:            #DCE8F5;
      --placeholder:        #8C8070;
      --text-main:          #0A2463;
      --text-muted:         #AAB5C4;
      --btn-hover-bg:       rgba(74,144,226,0.06);
      --drop-bg:            #FEFCF8;
      --drop-border:        #C8D8EE;
      --drop-shadow:        rgba(6,14,28,0.10);
      --search-bg:          #FFFFFF;
      --search-border:      #DCE8F5;
      --item-hover:         rgba(74,144,226,0.07);
      --item-active:        rgba(74,144,226,0.12);
      --badge-bg:           #4A70A0;
      font-family: 'DM Sans', sans-serif;
    }
  
    :global([data-theme="dark"]) .field-root {
      --shell-bg:           #0D1826;
      --shell-border:       rgba(74,144,226,0.22);
      --shell-border-focus: #4A90E2;
      --shell-ring:         rgba(74,144,226,0.15);
      --divider:            rgba(74,144,226,0.18);
      --placeholder:        #4A6080;
      --text-main:          #C8D8EE;
      --text-muted:         #3D5470;
      --btn-hover-bg:       rgba(74,144,226,0.10);
      --drop-bg:            #0D1826;
      --drop-border:        rgba(74,144,226,0.22);
      --drop-shadow:        rgba(0,0,0,0.40);
      --search-bg:          #111F32;
      --search-border:      rgba(74,144,226,0.20);
      --item-hover:         rgba(74,144,226,0.10);
      --item-active:        rgba(74,144,226,0.18);
      --badge-bg:           #1A3A6A;
    }
  
    .field-label {
      font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--bp-blue-dim); margin: 0 0 8px 0;
    }
    :global([data-theme="dark"]) .field-label { color: var(--bp-blue); }
  
    .shell {
      position: relative; display: flex; align-items: stretch;
      border-radius: 12px; border: 1.5px solid var(--shell-border);
      background: var(--shell-bg);
      transition: border-color 0.18s ease, box-shadow 0.18s ease; overflow: visible;
    }
    .shell:focus-within {
      border-color: var(--shell-border-focus);
      box-shadow: 0 0 0 3px var(--shell-ring);
    }
  
    .flag-btn {
      display: flex; align-items: center; gap: 6px;
      height: 52px; padding: 0 12px 0 14px;
      border: none; border-right: 1px solid var(--divider);
      border-radius: 12px 0 0 12px; background: transparent;
      cursor: pointer; font-family: inherit; transition: background 0.15s; flex-shrink: 0;
    }
    .flag-btn:hover { background: var(--btn-hover-bg); }
  
    .flag-emoji { font-size: 18px; line-height: 1; }
  
    .dial-code { font-size: 12px; font-weight: 600; color: var(--bp-blue-dim); }
    :global([data-theme="dark"]) .dial-code { color: var(--bp-blue); }
  
    .chevron {
      width: 11px; height: 11px; color: var(--text-muted);
      transition: transform 0.2s ease; flex-shrink: 0;
    }
    .chevron--up { transform: rotate(180deg); }
  
    .phone-num {
      flex: 1; min-width: 0; border: none; background: #ffffff;;
      padding: 0 16px; height: 52px; font-family: inherit;
      font-size: 15px; font-weight: 400; color: var(--text-main);
      outline: none; border-radius: 0 12px 12px 0;
    }
    :global([data-theme="dark"]) .phone-num { background: #1A2438; }
    .phone-num::placeholder { color: var(--placeholder); font-weight: 300; }
  
    .dropdown {
      position: absolute; top: calc(100% + 6px); left: 0;
      width: 300px; background: var(--drop-bg);
      border: 1px solid var(--drop-border); border-radius: 12px;
      box-shadow: 0 8px 32px var(--drop-shadow); z-index: 50; overflow: hidden;
    }
  
    .search-wrap { padding: 10px; border-bottom: 1px solid var(--divider); }
  
    .search-input {
      width: 100%; box-sizing: border-box;
      border: 1px solid var(--search-border); border-radius: 8px;
      padding: 8px 12px; font-family: inherit; font-size: 13px;
      color: var(--text-main); background: var(--search-bg);
      outline: none; transition: border-color 0.15s;
    }
    .search-input::placeholder { color: var(--placeholder); }
    .search-input:focus { border-color: var(--bp-blue); }
  
    .country-list {
      max-height: 240px; overflow-y: auto;
      scrollbar-width: thin; scrollbar-color: var(--shell-border) transparent;
    }
  
    .section-header {
      padding: 6px 14px 2px; margin: 0;
      font-size: 10px; font-weight: 700; letter-spacing: 0.08em;
      text-transform: uppercase; color: var(--text-muted);
    }
  
    .country-item {
      display: flex; align-items: center; gap: 10px;
      width: 100%; padding: 10px 14px; border: none;
      background: transparent; cursor: pointer; font-family: inherit;
      font-size: 13px; color: var(--text-main); text-align: left; transition: background 0.1s;
    }
    .country-item:hover { background: var(--item-hover); }
    .country-item--active { background: var(--item-active); font-weight: 600; }
  
    .country-name { flex: 1; }
  
    .item-dial { font-size: 12px; font-weight: 600; color: var(--bp-blue-dim); flex-shrink: 0; }
    :global([data-theme="dark"]) .item-dial { color: var(--bp-blue); }
  
    .pin-badge {
      background: var(--badge-bg); color: #fff;
      font-size: 9px; font-weight: 700; padding: 2px 5px; border-radius: 3px; flex-shrink: 0;
    }
  
    .no-results { padding: 16px; text-align: center; font-size: 13px; color: var(--text-muted); margin: 0; }
</style>