<script lang="ts">
let { 
    label,
    condition,
    }: { 
        label: string 
        condition: boolean, 
    } = $props();

</script>

<div class="flex items-center gap-2.5">
    {#if condition}
    <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sage">
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </div>
    {:else}
    <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border border-chalk-3 dark:border-white/[.1]"></div>
    {/if}
    <span class={`capitalize text-[13px] ${condition ? 'text-navy-dark dark:text-blue-100' : 'text-chalk-muted dark:text-[#6A7FA0]'}`}>{label}</span>
</div>