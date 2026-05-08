<script lang="ts">
    import { themeStore } from '$lib/stores/theme.svelte';
    import { authStore } from '$lib/stores/auth.svelte';
    import BlupoddLogo from '$lib/components/shared/BlupoddLogo.svelte';
    import ThemeToggle from './ThemeToggle.svelte';
    import UserDropdown from './UserDropdown.svelte';
  
    let drawerOpen = $state(false);
    let isLoggedIn = $state(false);
    let isMobileNav = $state(false);
  
    // Exported so MobileDrawer can bind to it
    export { drawerOpen };
  
    const toggleDrawer = () => drawerOpen = !drawerOpen;

    const toggleMobileNav = () => isMobileNav = !isMobileNav;
  
    // Close drawer on resize to desktop
    $effect(() => {
      function onResize() { if (window.innerWidth > 1024) drawerOpen = false; }
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    });
  </script>
  
  <!-- ═══════════════════════════════════════════════
     NAVBAR
═══════════════════════════════════════════════ -->
<nav class="fixed top-0 left-0 right-0 z-[100] bg-navy-dark flex items-center justify-between h-[68px] px-[5vw] border-b border-white/[0.07]">

  <!-- Logo -->
  <a href="/site" class="flex items-center gap-[10px] no-underline flex-shrink-0">
    <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
      <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
      <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
      <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
    </svg>
    <span class="font-sans text-[18px] font-medium tracking-em-018 text-white">BLUPODD</span>
  </a>

  <!-- Right side -->
  <div class="flex items-center gap-6">

    <!-- Desktop nav links — hidden ≤1024px -->
    <ul class="nav-links-desktop flex items-center gap-8 list-none">
      <li><a href="/site" class="text-13px font-normal tracking-em-006 text-white/65 no-underline hover:text-white transition-colors duration-200">Home</a></li>
      <li><a href="/site/properties" class="text-13px font-normal tracking-em-006 text-white/65 no-underline hover:text-white transition-colors duration-200">Properties</a></li>
      <li><a href="/site/agents" class="text-13px font-normal tracking-em-006 text-white/65 no-underline hover:text-white transition-colors duration-200">Agents</a></li>
      <li><a href="/site/contacts" class="text-13px font-normal tracking-em-006 text-white/65 no-underline hover:text-white transition-colors duration-200">Contact</a></li>
    </ul>

    <!-- ── DESKTOP AUTH ── -->
    <div class="nav-links-desktop flex items-center gap-5">

      <!-- Divider -->
      <div class="w-px h-4 bg-white/[0.12] flex-shrink-0"></div>

      {#if isLoggedIn}
     <!-- LOGGED IN: User dropdown trigger -->
      <!-- [Logged in state] -->
      <div class="items-center relative">
        <button
          class="user-trigger flex items-center gap-[7px] bg-none border-none cursor-pointer"
          id="desktopUserTrigger"
          aria-haspopup="true"
          aria-expanded="false"
          aria-label="User menu"
        >
          <span class="user-avatar">AO</span>
          <span class="text-13px font-normal tracking-em-006 text-white/65 hover:text-white transition-colors duration-200 hidden sm:inline whitespace-nowrap">Amara O.</span>
          <svg class="user-chevron" viewBox="0 0 12 12" fill="none" aria-hidden="true">
            <path d="M2.5 4.5l3.5 3 3.5-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>

        <!-- Dropdown panel -->
        <div class="user-dropdown" id="desktopDropdown" role="menu">

          <!-- User header -->
          <div class="dd-header">
            <div class="dd-header-name">Amara Okonkwo</div>
            <div class="dd-header-email">amara@example.com</div>
          </div>

          <!-- Saved Properties -->
          <a href="#" class="dd-item" role="menuitem">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M2 2h10v10l-5-3-5 3V2z"/>
            </svg>
            Saved Properties
          </a>

          <!-- Scheduled Viewings -->
          <a href="#" class="dd-item" role="menuitem">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <rect x="1" y="2.5" width="12" height="10" rx="1.5"/>
              <path d="M4.5 1v3M9.5 1v3M1 6.5h12"/>
            </svg>
            Scheduled Viewings
          </a>

          <!-- Saved Search -->
          <a href="#" class="dd-item" role="menuitem">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <circle cx="6" cy="6" r="4"/>
              <path d="M10 10l3 3"/>
            </svg>
            Saved Search
          </a>

          <!-- Profile -->
          <a href="#" class="dd-item" role="menuitem">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="7" cy="4.5" r="2.5"/>
              <path d="M1.5 13c0-2.76 2.462-5 5.5-5s5.5 2.24 5.5 5"/>
            </svg>
            Profile
          </a>

          <div class="dd-sep" role="separator"></div>

          <!-- Logout -->
          <button class="dd-item dd-item-logout w-full" role="menuitem" id="desktopLogoutBtn">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
              <path d="M5 2H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2M9.5 9.5l3-3-3-3M12.5 6.5H5"/>
            </svg>
            Log out
          </button>

        </div><!-- /desktop dropdown -->
      </div><!-- /auth-in -->
      {:else}
       <!-- LOGGED OUT: Log In + Sign Up -->
      <!-- [Logged out state] -->
      <div class="auth-out items-center gap-5">
        <a href="/site/login" class="text-13px font-normal tracking-em-006 text-white/65 no-underline hover:text-white transition-colors duration-200 whitespace-nowrap">
          Log in
        </a>
        <a href="/site/sign-up" class="text-13px font-medium tracking-[0.04em] text-white no-underline bg-ember hover:bg-ember-deep px-5 py-[8px] rounded-40 transition-colors duration-200 whitespace-nowrap">
          Sign up
        </a>
      </div>

      
      {/if}

    </div><!-- /desktop auth -->

    <!-- Theme icon toggle: sun = light, moon = dark -->
    <button
      class="theme-toggle-btn"
      id="themeToggleBtn"
      aria-label="Toggle colour scheme"
      onclick={themeStore.toggle}
    >
      <!-- Sun — shown in light mode -->
      <span class="icon-sun" aria-hidden="true">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.80)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1"  x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22"   x2="5.64"  y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1"  y1="12" x2="3"  y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22"  y1="19.78" x2="5.64"  y2="18.36"/>
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"/>
        </svg>
      </span>
      <!-- Moon — shown in dark mode -->
      <span class="icon-moon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.80)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </span>
    </button>

    <!-- Hamburger — hidden on desktop (>1024px), visible on mobile -->
    <button
      type="button"
      onclick={toggleMobileNav}
      class="md:hidden hamburger-btn flex items-center justify-center w-8 h-8 text-white/70 hover:text-white transition-colors border-none bg-transparent cursor-pointer"
      id="hamburgerBtn"
      aria-label="Open menu"
      aria-expanded="false"
      aria-controls="mobileDrawer"
    >
      <!-- Hamburger icon -->
      <svg id="iconOpen" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="3" y1="5"  x2="17" y2="5"/>
        <line x1="3" y1="10" x2="17" y2="10"/>
        <line x1="3" y1="15" x2="17" y2="15"/>
      </svg>
      <!-- Close icon (hidden by default) -->
      <svg id="iconClose" class="hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
        <line x1="5" y1="5"  x2="15" y2="15"/>
        <line x1="15" y1="5" x2="5"  y2="15"/>
      </svg>
    </button>

  </div><!-- /right side -->
</nav>

<!-- ═══════════════════════════════════════════════
     MOBILE DRAWER
═══════════════════════════════════════════════ -->
<div class={`mobile-drawer ${isMobileNav ? 'open' : ''}`} 
  id="mobileDrawer" 
  role="navigation"
  aria-label="Mobile menu">

  <!-- Nav links -->
  <a href="/site" class="mob-link">Home</a>
  <a href="/site/properties" class="mob-link">Properties</a>
  <a href="/site/agents" class="mob-link">Agents</a>
  <a href="/site/contacts" class="mob-link">Contact</a>

  {#if isLoggedIn}
  <!-- Logged in user section -->
  <!-- [Mobile logged in state] -->
  <div>
    <div class="mob-user-row">
      <div class="mob-user-avatar">AO</div>
      <div>
        <div class="mob-user-name">Amara Okonkwo</div>
        <div class="mob-user-email">amara@example.com</div>
      </div>
    </div>
    <div class="mt-2">
      <a href="#" class="mob-dd-link">Saved Properties</a>
      <a href="#" class="mob-dd-link">Scheduled Viewings</a>
      <a href="#" class="mob-dd-link">Saved Search</a>
      <a href="#" class="mob-dd-link">Profile</a>
      <a href="#" class="mob-dd-link logout" id="mobileLogoutBtn">Log out</a>
    </div>
  </div>
  {:else}
   <!-- Logged out auth -->
  <!-- [Mobile logged out state] -->
  <div class="mob-auth mob-auth-out gap-3">
    <a href="/site/login" class="text-13px font-normal tracking-em-006 text-white/65 no-underline hover:text-white transition-colors duration-200 whitespace-nowrap">
      Log in
    </a>
    <a href="/site/sign-up" class="text-13px font-medium tracking-[0.04em] text-white no-underline bg-ember hover:bg-ember-deep px-5 py-[8px] rounded-40 transition-colors duration-200 whitespace-nowrap">
      Sign up
    </a>
  </div>
  {/if}
</div>