<script>
  import { themeStore } from "$lib/stores/theme.svelte";

 /** @type {{ onClick: () => void }} */
 let { onClick = () => {} } = $props();
</script>

<button onclick={onClick} class="btn-social" type="button">
{#if themeStore.theme === 'dark'}
    <svg xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="#FFFFFF"
      aria-hidden="true"
    >
    <path d="M16.37 12.73c.02 2.27 2.02 3.03 2.04 3.04-.02.05-.32 1.09-1.05 2.16-.63.93-1.29 1.85-2.32 1.87-1.01.02-1.34-.6-2.5-.6-1.16 0-1.52.58-2.48.62-1 .04-1.76-1-2.4-1.93-1.31-1.9-2.31-5.38-.97-7.7.66-1.15 1.84-1.88 3.13-1.9.98-.02 1.9.66 2.5.66.6 0 1.73-.82 2.91-.7.5.02 1.9.2 2.8 1.52-.07.04-1.67.97-1.66 2.96zM14.57 4.73c.53-.64.9-1.53.8-2.42-.77.03-1.7.5-2.26 1.14-.5.57-.94 1.47-.82 2.33.86.07 1.75-.44 2.28-1.05z"/>
  </svg>
  {:else}
  <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="currentColor"
    aria-hidden="true"
    >
    <path d="M16.37 12.73c.02 2.27 2.02 3.03 2.04 3.04-.02.05-.32 1.09-1.05 2.16-.63.93-1.29 1.85-2.32 1.87-1.01.02-1.34-.6-2.5-.6-1.16 0-1.52.58-2.48.62-1 .04-1.76-1-2.4-1.93-1.31-1.9-2.31-5.38-.97-7.7.66-1.15 1.84-1.88 3.13-1.9.98-.02 1.9.66 2.5.66.6 0 1.73-.82 2.91-.7.5.02 1.9.2 2.8 1.52-.07.04-1.67.97-1.66 2.96zM14.57 4.73c.53-.64.9-1.53.8-2.42-.77.03-1.7.5-2.26 1.14-.5.57-.94 1.47-.82 2.33.86.07 1.75-.44 2.28-1.05z"/>
 </svg>
{/if}
    Continue with Apple
</button>

<style>
  /* ── Social buttons ── */
  .btn-social {
    width: 100%; background: #ffffff; border: 1.5px solid #EDE7DC; border-radius: 12px;
    padding: 12px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.03em; color: #0A2463;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center; gap: 10px;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.15s;
  }
  .btn-social:hover {
    border-color: rgba(74,144,226,0.45); background: #F7F3EC;
    box-shadow: 0 4px 18px rgba(10,36,99,0.07); transform: translateY(-1px);
  }
  :global([data-theme="dark"]) .btn-social { background: #1A2438; border-color: rgba(255,255,255,0.09); color: #E8EDF5; }
  :global([data-theme="dark"]) .btn-social:hover { background: #1F2D45; border-color: rgba(74,144,226,0.40); box-shadow: 0 4px 18px rgba(0,0,0,0.32); }
</style>