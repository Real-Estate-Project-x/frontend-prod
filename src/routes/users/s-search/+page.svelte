<script>
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";
  let openNewFilter = $state(false);
  let openEditFilter = $state(false);

  const toggleNewFilter = () => openNewFilter = !openNewFilter;

  const toggleEditFilter = () => openEditFilter = !openEditFilter;

</script>
<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- Page header band -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[1100px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <div class="flex items-center gap-2 mb-3">
            <a href="/users" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Dashboard
            </a>
            <span class="text-white/25 text-[12px]">/</span>
            <span class="text-[12px] text-white/60">Saved searches</span>
          </div>
          <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Smart monitoring</p>
          <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
            Saved searches
          </h1>
          <p class="text-[13px] font-light text-white/50 mt-2 flex items-center gap-2 flex-wrap">
            <span class="w-[6px] h-[6px] rounded-full bg-blue-bright pulse-dot"></span>
            <strong class="text-white font-medium">3</strong> active searches
            <span class="w-1 h-1 rounded-full bg-white/25"></span>
            <strong class="text-white font-medium">14</strong> matching properties
            <span class="w-1 h-1 rounded-full bg-white/25"></span>
            <span class="text-[#E53E3E] font-medium flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-[#E53E3E] pulse-dot"></span>5 new today</span>
          </p>
        </div>
        <button onclick={toggleNewFilter} class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[10px] rounded-full tt self-start sm:self-end border-none cursor-pointer">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          New saved search
        </button>
      </div>
    </div>

    </main>
</div>