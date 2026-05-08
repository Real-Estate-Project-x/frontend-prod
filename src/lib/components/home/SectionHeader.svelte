<script lang="ts">
    let {
      eyebrow,
      title,
      subtitle,
      eyebrowColor = 'text-navy-accent',
    }: {
      eyebrow: string;
      title: string;
      subtitle?: string;
      eyebrowColor?: string;
    } = $props();
  </script>
  
  <p class="text-10px font-medium tracking-em-020 uppercase mb-3 {eyebrowColor}">
    {eyebrow}
  </p>
  <h2 class="section-title font-display text-[clamp(32px,4vw,52px)] font-normal
             leading-[1.1] text-navy-dark mb-4">
    <!-- eslint-disable-next-line svelte/no-at-html-tags -->
    {@html title}
  </h2>
  {#if subtitle}
    <p class="section-sub text-15px font-light leading-[1.75] text-chalk-muted max-w-[480px] mb-[52px]">
      {subtitle}
    </p>
  {/if}