<script lang="ts">
    const stats = [
      { value: '4,200+',  label: 'Active listings' },
      { value: '380+',    label: 'Verified agents' },
      { value: '98%',     label: 'Satisfaction rate' },
      { value: 'Virtual', label: 'Tours available' },
    ];
</script>
  
  <div class="hero-stats-strip border-t bg-navy-deep">
    {#each stats as stat}
      <div class="stat-item">
        <div class="font-display text-28px font-semibold text-chalk">{stat.value}</div>
        <div class="text-11px text-white/40 tracking-em-008 uppercase mt-0.5">{stat.label}</div>
      </div>
    {/each}
  </div>