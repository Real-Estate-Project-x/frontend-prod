<script lang="ts">
  // export let size = 128;         // px — any size, scales perfectly
  // export let speed = 1;         // multiplier: 0.5 = slower, 2 = faster
  // export let variant = 'pulse';  // 'draw' | 'pulse' | 'orbit'

  let { size = 120, speed =1.0, variant = 'pulse' } = $props();
</script>

<!--
  Blupodd Loader — SVG animation component
  Fully transparent background. Drop anywhere.

  Usage:
    <BlupoddLoader />
    <BlupoddLoader size={48} variant="pulse" />
    <BlupoddLoader size={128} variant="orbit" speed={0.8} />
-->

<section class="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm" style="background: rgba(6, 14, 28, .08);">
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 68 72"
  width={size}
  height={size}
  role="img"
  aria-label="Loading…"
  style="display:block; overflow:visible;"
  class={variant}
  style:--dur="{(2 / speed).toFixed(2)}s"
>
  {#if variant === 'draw'}
    <!-- Base bar -->
    <rect class="base" x="4" y="62" width="60" height="5" rx="2.5" fill="#4A8FE8"/>
    <!-- Arcs drawn outer→mid→inner -->
    <path class="arc arc-outer"
      d="M4 63 Q4 16 34 4 Q64 16 64 63"
      fill="none" stroke="white" stroke-width="5.5" stroke-linecap="round"/>
    <path class="arc arc-mid"
      d="M9 62 Q9 24 34 13 Q59 24 59 62"
      fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.58"/>
    <path class="arc arc-inner"
      d="M14 62 Q14 32 34 22 Q54 32 54 62"
      fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.28"/>
    <!-- Anchor dot -->
    <g class="dot">
      <circle cx="34" cy="62" r="5.5" fill="#4A8FE8"/>
      <circle cx="34" cy="62" r="5.5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    </g>

  {:else if variant === 'pulse'}
    <!-- Pulse rings emanating from logo centre -->
    <circle class="ring ring-1" cx="34" cy="36" r="28" fill="none" stroke="#4A8FE8" stroke-width="1"/>
    <circle class="ring ring-2" cx="34" cy="36" r="28" fill="none" stroke="#4A8FE8" stroke-width="1"/>
    <!-- Static logo, floating -->
    <g class="float">
      <rect x="4" y="62" width="60" height="5" rx="2.5" fill="#4A8FE8"/>
      <path d="M14 62 Q14 32 34 22 Q54 32 54 62"
        fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.28"/>
      <path d="M9 62 Q9 24 34 13 Q59 24 59 62"
        fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.58"/>
      <path d="M4 63 Q4 16 34 4 Q64 16 64 63"
        fill="none" stroke="white" stroke-width="5.5" stroke-linecap="round"/>
      <circle class="dot-breathe" cx="34" cy="62" r="5.5" fill="#4A8FE8"/>
      <circle cx="34" cy="62" r="5.5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    </g>

  {:else if variant === 'orbit'}
    <!-- Static logo -->
    <rect x="4" y="62" width="60" height="5" rx="2.5" fill="#4A8FE8"/>
    <path d="M14 62 Q14 32 34 22 Q54 32 54 62"
      fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.28"/>
    <path d="M9 62 Q9 24 34 13 Q59 24 59 62"
      fill="none" stroke="white" stroke-width="5" stroke-linecap="round" opacity="0.58"/>
    <path d="M4 63 Q4 16 34 4 Q64 16 64 63"
      fill="none" stroke="white" stroke-width="5.5" stroke-linecap="round"/>
    <circle cx="34" cy="62" r="5.5" fill="#4A8FE8"/>
    <circle cx="34" cy="62" r="5.5" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <!-- Orbiting dots -->
    <circle class="orb orb-1" cx="34" cy="34" r="3" fill="#4A8FE8"/>
    <circle class="orb orb-2" cx="34" cy="34" r="2" fill="#4A8FE8" opacity="0.5"/>
  {/if}
</svg>
</section>
<style>
  /* ─── Shared ─────────────────────────── */
  svg { overflow: visible; }

  /* ─── Variant: draw ──────────────────── */
  .draw .base {
    transform-origin: 34px 64.5px;
    animation: baseIn var(--dur) cubic-bezier(.4,0,.2,1) infinite;
  }
  .draw .arc {
    animation: arcDraw var(--dur) cubic-bezier(.4,0,.2,1) infinite;
  }
  .draw .arc-outer { stroke-dasharray: 240; stroke-dashoffset: 240; }
  .draw .arc-mid   { stroke-dasharray: 190; stroke-dashoffset: 190; animation-delay: calc(var(--dur) * 0.1); }
  .draw .arc-inner { stroke-dasharray: 145; stroke-dashoffset: 145; animation-delay: calc(var(--dur) * 0.2); }
  .draw .dot {
    transform-origin: 34px 62px;
    animation: dotPop var(--dur) cubic-bezier(.4,0,.2,1) calc(var(--dur) * 0.3) infinite;
  }

  @keyframes baseIn {
    0%,4%   { transform: scaleX(0); opacity: 0; }
    20%     { transform: scaleX(1); opacity: 1; }
    80%     { opacity: 1; }
    100%    { opacity: 0; }
  }
  @keyframes arcDraw {
    0%      { stroke-dashoffset: 240; opacity: 0; }
    12%     { opacity: 1; }
    58%     { stroke-dashoffset: 0; opacity: 1; }
    82%     { opacity: 1; }
    100%    { stroke-dashoffset: 0; opacity: 0; }
  }
  @keyframes dotPop {
    0%,40%  { transform: scale(0); opacity: 0; }
    56%     { transform: scale(1.3); opacity: 1; }
    68%     { transform: scale(1);   opacity: 1; }
    84%     { opacity: 1; }
    100%    { opacity: 0; }
  }

  /* ─── Variant: pulse ─────────────────── */
  .pulse .ring {
    transform-origin: 34px 36px;
    animation: pulseOut var(--dur) ease-in-out infinite;
  }
  .pulse .ring-2 { animation-delay: calc(var(--dur) * 0.5); }
  .pulse .float {
    transform-origin: 34px 33px;
    animation: floatY var(--dur) ease-in-out infinite;
  }
  .pulse .dot-breathe {
    transform-origin: 34px 62px;
    animation: dotBreath var(--dur) ease-in-out infinite;
  }

  @keyframes pulseOut {
    0%    { transform: scale(.8);  opacity: 0;    }
    20%   {                         opacity: .45;  }
    80%   { transform: scale(1.8); opacity: 0;    }
    100%  { transform: scale(.8);  opacity: 0;    }
  }
  @keyframes floatY {
    0%,100% { transform: translateY(0);    }
    50%     { transform: translateY(-3px); }
  }
  @keyframes dotBreath {
    0%,100% { transform: scale(1);   }
    50%     { transform: scale(1.4); }
  }

  /* ─── Variant: orbit ─────────────────── */
  .orbit .orb {
    transform-origin: 34px 34px;
    animation: orbitSpin var(--dur) linear infinite;
  }
  .orbit .orb-2 { animation-delay: calc(var(--dur) * -0.5); }

  @keyframes orbitSpin {
    0%    { transform: rotate(0deg)   translateX(34px) rotate(0deg);    opacity: 0; }
    8%    {                                                               opacity: 1; }
    92%   {                                                               opacity: 1; }
    100%  { transform: rotate(360deg) translateX(34px) rotate(-360deg); opacity: 0; }
  }
</style>
