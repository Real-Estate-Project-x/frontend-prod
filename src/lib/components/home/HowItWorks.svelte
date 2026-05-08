<script lang="ts">
    const steps = [
      {
        num: '01',
        head: 'Create your account',
        body: 'Sign up in seconds. Set your preferences — price range, bedrooms, location, kitchen type — and let Blupodd surface what matters.',
        tag: 'Buyers & renters',
        tagClass: 'step-tag-buyer',
      },
      {
        num: '02',
        head: 'Search & discover',
        body: 'Browse hundreds of verified listings with rich filters. No middlemen, no dead links. Just real properties, updated in real time.',
        tag: 'Buyers & renters',
        tagClass: 'step-tag-buyer',
      },
      {
        num: '03',
        head: 'Book a viewing instantly',
        body: 'Request an in-person visit or a virtual tour directly through the platform — no waiting on WhatsApp, no unanswered calls.',
        tag: 'Virtual available',
        tagClass: 'step-tag-virtual',
      },
      {
        num: '04',
        head: 'Agents get you there',
        body: 'Blupodd keeps agents central. Your confirmed viewing connects you directly to a professional who knows the property inside out.',
        tag: 'Agent-powered',
        tagClass: 'step-tag-agent',
      },
    ];
  </script>
  
  <section class="how-section bg-chalk-2 px-0 py-24">
    <div class="max-w-[1200px] mx-auto px-[5vw]">
  
      <p class="text-10px font-medium tracking-em-020 uppercase text-navy-accent mb-3">
        How it works
      </p>
      <h2 class="section-title font-display text-[clamp(32px,4vw,52px)] font-normal
                 leading-[1.1] text-navy-dark mb-4">
        Property search,<br>made effortless
      </h2>
      <p class="section-sub text-15px font-light leading-[1.75] text-chalk-muted
                max-w-[480px] mb-[52px]">
        From your first search to booking a viewing — Blupodd keeps the process clear, fast, and human.
      </p>
  
      <div class="steps-grid">
        {#each steps as step}
          <div class="step-card bg-chalk px-7 py-9 relative transition-colors duration-200 hover:bg-chalk-2">
            <div class="step-num font-display text-48px font-light text-chalk-3 leading-none mb-5">
              {step.num}
            </div>
            <div class="step-head text-16px font-medium text-navy-dark mb-2">{step.head}</div>
            <p class="step-body text-13px font-light leading-[1.7] text-chalk-muted">{step.body}</p>
            <span class="{step.tagClass} inline-block mt-[14px] text-10px font-medium
                         tracking-em-010 uppercase px-[10px] py-[3px] rounded-40">
              {step.tag}
            </span>
          </div>
        {/each}
      </div>
  
    </div>
  </section>