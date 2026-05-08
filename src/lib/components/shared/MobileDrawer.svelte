<script lang="ts">
    import { authStore } from '$lib/stores/auth.svelte';
  
    // Receive open state from Navbar via a shared store or prop.
    // Simplest approach: re-export a module-level rune store.
    import { drawerStore } from '$lib/stores/drawer.svelte';
  </script>
  
  <!-- Backdrop -->
  {#if drawerStore.open}
    <div
      class="fixed inset-0 z-[90] bg-black/40 lg:hidden"
      onclick={drawerStore.close}
      aria-hidden="true"
    ></div>
  {/if}
  
  <div
    class="mobile-drawer"
    class:open={drawerStore.open}
    role="navigation"
    aria-label="Mobile menu"
  >
    {#each ['Home','Properties','Agents','Contact'] as link}
      <a href="#" class="mob-link" onclick={drawerStore.close}>{link}</a>
    {/each}
  
    {#if authStore.isLoggedIn}
      <div class="mob-auth-in">
        <div class="mob-user-row">
          <div class="mob-user-avatar">{authStore.user.initials}</div>
          <div>
            <div class="mob-user-name">{authStore.user.name}</div>
            <div class="mob-user-email">{authStore.user.email}</div>
          </div>
        </div>
        <div class="mt-2">
          <a href="/saved"    class="mob-dd-link">Saved Properties</a>
          <a href="/viewings" class="mob-dd-link">Scheduled Viewings</a>
          <a href="/searches" class="mob-dd-link">Saved Search</a>
          <a href="/profile"  class="mob-dd-link">Profile</a>
          <button class="mob-dd-link logout w-full text-left"
                  onclick={() => { authStore.logout(); drawerStore.close(); }}>
            Log out
          </button>
        </div>
      </div>
    {:else}
      <div class="mob-auth flex items-center gap-3">
        <a href="/site/login"  class="text-13px font-normal text-white/65 hover:text-white">Log in</a>
        <a href="/signup" class="text-13px font-medium text-white bg-ember hover:bg-ember-deep
                                 px-5 py-[8px] rounded-40 transition-colors">Sign up</a>
      </div>
    {/if}
  </div>