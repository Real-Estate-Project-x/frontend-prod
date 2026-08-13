<script lang="ts">
  import { AMENITY_ICON_PATHS, type AmenityIconKey } from "$lib/utils/amenity-icon-path";
  
    /**
     * AmenityIcon.svelte
     *
     * Renders a hand-drawn amenity icon by iconKey (the same key stored on
     * ListingAmenity.iconKey in Postgres — no translation layer needed).
     *
     */
  
    let {
      iconKey,
      size = 20,
      strokeWidth = 1.6,
      class: className = ''
    }: {
      iconKey: string;
      size?: number;
      strokeWidth?: number;
      class?: string;
    } = $props();
  
    let isKnown = $derived(iconKey in AMENITY_ICON_PATHS);
    let inner = $derived(AMENITY_ICON_PATHS[(isKnown ? iconKey : 'fallback') as AmenityIconKey]);
  
    $effect(() => {
      if (!isKnown && import.meta.env.DEV) {
        console.warn(`[AmenityIcon] No icon registered for iconKey "${iconKey}" — rendering fallback.`);
      }
    });
  </script>
  
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    stroke="currentColor"
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    class={className}
    aria-hidden="true"
  >
    {@html inner}
  </svg>