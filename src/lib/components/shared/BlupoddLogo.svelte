<script lang="ts">
    let { size = 36 }: { size?: number } = $props();
  </script>
  
  <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
    <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="white"
          stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
    <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="white"
          stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
    <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="white"
          stroke-width="2.5" stroke-linecap="round"/>
    <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
  </svg>