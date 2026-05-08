<section class="cta-section relative bg-navy-deep text-center px-[5vw] py-24 overflow-hidden">

    <!-- Decorative rings -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
      {#each [300, 500, 700] as size, i}
        <div class="cta-ring"
             style="width:{size}px;height:{size}px;
                    {i === 2 ? 'border-color:rgba(74,144,226,0.04);' : ''}">
        </div>
      {/each}
    </div>
  
    <p class="relative z-10 text-10px font-medium tracking-em-020 uppercase text-blue-bright mb-3">
      Get started
    </p>
    <h2 class="cta-title relative z-10 font-display text-[clamp(36px,5vw,64px)]
               font-light text-chalk leading-[1.1] mb-4">
      Your next home is<br>closer than you think.
    </h2>
    <p class="relative z-10 text-15px text-white/45 mb-11">
      Join thousands of Nigerians searching smarter with Blupodd.
    </p>
    <div class="relative z-10 flex gap-[14px] justify-center flex-wrap">
      <button class="btn-primary">Find a property</button>
      <button class="btn-secondary">List as an agent</button>
    </div>
  
  </section>