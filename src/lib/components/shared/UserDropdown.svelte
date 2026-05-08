<script lang="ts">
    import { authStore } from '$lib/stores/auth.svelte';
  
    let open = $state(false);
  
    function toggle() { open = !open; }
    function close()  { open = false; }
  
    // Close on outside click
    $effect(() => {
      if (!open) return;
      function handler(e: MouseEvent) {
        const el = document.getElementById('user-dropdown-root');
        if (el && !el.contains(e.target as Node)) close();
      }
      document.addEventListener('click', handler);
      return () => document.removeEventListener('click', handler);
    });
  
    // Close on Escape
    $effect(() => {
      function handler(e: KeyboardEvent) { if (e.key === 'Escape') close(); }
      document.addEventListener('keydown', handler);
      return () => document.removeEventListener('keydown', handler);
    });
  
    const menuItems = [
      { label: 'Saved Properties',   href: '/saved' },
      { label: 'Scheduled Viewings', href: '/viewings' },
      { label: 'Saved Search',       href: '/searches' },
      { label: 'Profile',            href: '/profile' },
    ];
  </script>
  
  <div id="user-dropdown-root" class="relative flex items-center">
    <button
      class="user-trigger flex items-center gap-[7px] bg-transparent border-none cursor-pointer"
      aria-haspopup="true"
      aria-expanded={open}
      aria-label="User menu"
      onclick={toggle}
    >
      <span class="user-avatar">{authStore.user.initials}</span>
      <span class="hidden sm:inline text-13px font-normal tracking-em-006 text-white/65
                   hover:text-white transition-colors whitespace-nowrap">
        {authStore.user.name.split(' ')[0]} {authStore.user.name.split(' ')[1]?.[0]}.
      </span>
      <svg class="user-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor"
              stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  
    <!-- Dropdown panel -->
    {#if open}
      <div class="user-dropdown open" role="menu">
        <div class="dd-header">
          <div class="dd-header-name">{authStore.user.name}</div>
          <div class="dd-header-email">{authStore.user.email}</div>
        </div>
  
        {#each menuItems as item}
          <a href={item.href} class="dd-item" role="menuitem" onclick={close}>
            {item.label}
          </a>
        {/each}
  
        <div class="dd-sep" role="separator"></div>
  
        <button
          class="dd-item dd-item-logout w-full text-left"
          role="menuitem"
          onclick={() => { authStore.logout(); close(); }}
        >
          Log out
        </button>
      </div>
    {/if}
  </div>