<script lang="ts">
    import HeroStats from './HeroStats.svelte';
    import HeroSearch from './HeroSearch.svelte';
  
    const tags = ['Lagos Island', 'Port Harcourt GRA', 'Lekki Phase 1', 'Abuja Maitama', 'Victoria Island'];
  </script>
  
  <section class="relative min-h-screen bg-navy-dark flex flex-col items-center justify-center
                  px-[5vw] pt-[120px] pb-[80px] overflow-hidden">
  
    <!-- Arc rings -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%]
                w-[900px] h-[900px] pointer-events-none overflow-hidden">
      {#each [
        { size: 320, opacity: 0.18 },
        { size: 520, opacity: 0.12 },
        { size: 720, opacity: 0.12 },
        { size: 900, opacity: 0.06 },
      ] as ring}
        <div class="hero-arc-ring"
             style="width:{ring.size}px;height:{ring.size}px;
                    border-color:rgba(74,144,226,{ring.opacity});"></div>
      {/each}
    </div>
  
    <!-- Content -->
    <div class="relative z-10 text-center max-w-[780px] w-full animate-fadeUp px-2">
  
      <!-- Trust badge -->
      <span class="trust-badge px-[14px] py-[5px] mb-4 inline-flex">
        <span class="trust-dot"></span>
        Home hunting, re-imagined
      </span>
  
      <h1 class="animate-fadeUp2 font-display text-[clamp(36px,7vw,88px)]
                 font-light leading-[1.05] text-chalk mb-6">
        Find your place.<br><em class="italic text-blue-bright">Seamlessly.</em>
      </h1>
  
      <p class="animate-fadeUp3 text-16px font-light leading-[1.75] text-white/55
                max-w-[520px] mx-auto mb-11">
        Search smarter. View instantly. Connect with agents who know your market — all in one place.
      </p>
  
      <HeroSearch />
  
      <!-- Search tags -->
      <div class="animate-fadeUp5 flex gap-[10px] flex-wrap justify-center mt-[18px]">
        {#each tags as tag}
          <span class="search-tag">{tag}</span>
        {/each}
      </div>
  
    </div>
  
    
  </section>
  <HeroStats />