<script lang="ts">
    import type { Listing } from '$lib/types';
  
    type Filter = 'All' | 'Buy' | 'Rent' | 'Virtual';
  
    const filters: Filter[] = ['All', 'Buy', 'Rent', 'Virtual'];
    let activeFilter = $state<Filter>('All');
  
    const listings: Listing[] = [
      { id: '1', price: '₦850,000', priceLabel: '/ month', address: 'Lekki Phase 1, Lagos',
        beds: 3, baths: 2, area: '110 m²', type: 'rent', featured: true, scene: 1 },
      { id: '2', price: '₦95,000,000', address: 'GRA Phase 2, Port Harcourt',
        beds: 4, baths: 3, area: '185 m²', type: 'buy', scene: 2 },
      { id: '3', price: '₦2,200,000', priceLabel: '/ year', address: 'Maitama, Abuja',
        beds: 2, baths: 2, area: '75 m²', type: 'virtual', boosted: true, scene: 3 },
    ];
  
    const filtered = $derived(
      activeFilter === 'All'
        ? listings
        : listings.filter(l => l.type === activeFilter.toLowerCase())
    );
  </script>
  
  <section class="listings-section bg-chalk px-0 py-24">
    <div class="max-w-[1200px] mx-auto px-[5vw]">
  
      <div class="listings-header flex items-end justify-between mb-9 gap-4">
        <div>
          <p class="text-10px font-medium tracking-em-020 uppercase text-navy-accent mb-3">
            Featured listings
          </p>
          <h2 class="section-title font-display text-[clamp(32px,4vw,52px)]
                     font-normal leading-[1.1] text-navy-dark m-0">
            Properties worth seeing
          </h2>
        </div>
  
        <!-- Filter chips -->
        <div class="flex gap-2 flex-wrap">
          {#each filters as f}
            <button
              class="chip text-12px font-normal px-4 py-1.5 rounded-40
                     border border-chalk-3 text-chalk-muted bg-chalk"
              class:active={activeFilter === f}
              onclick={() => activeFilter = f}
            >
              {f}
            </button>
          {/each}
        </div>
      </div>
  
      <div class="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-5">

        <!-- Card 1 -->
        <div class="listing-card">
          <div class="listing-img relative h-[200px] overflow-hidden">
            <div class="prop-scene prop-sky-1">
              <div class="prop-building" style="width:90px;height:110px;left:50px;bottom:0;"></div>
              <div class="prop-window" style="width:14px;height:18px;left:62px;bottom:80px;"></div>
              <div class="prop-window" style="width:14px;height:18px;left:82px;bottom:80px;"></div>
              <div class="prop-window" style="width:14px;height:18px;left:62px;bottom:52px;"></div>
              <div class="prop-window" style="width:14px;height:18px;left:82px;bottom:52px;"></div>
              <div class="prop-building" style="width:60px;height:70px;left:160px;bottom:0;"></div>
              <div class="prop-window" style="width:10px;height:12px;left:170px;bottom:48px;"></div>
              <div class="prop-window" style="width:10px;height:12px;left:186px;bottom:48px;"></div>
            </div>
            <span class="listing-badge badge-rent absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
            <span class="badge-boost">Featured</span>
          </div>
          <div class="listing-body px-5 pt-[18px] pb-5">
            <div class="listing-price font-display text-22px font-semibold text-navy-dark mb-1">
              ₦850,000 <span class="text-13px font-light text-chalk-muted">/ month</span>
            </div>
            <div class="listing-address text-13px text-chalk-muted mb-[14px]">Lekki Phase 1, Lagos</div>
            <div class="listing-meta flex gap-4 pt-[14px] border-t border-chalk-3">
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>3 beds</div>
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>2 baths</div>
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>110 m²</div>
            </div>
            <div class="listing-cta flex gap-2 mt-[14px]">
              <a href="/site/properties/12" class="btn-view">
                Details
              </a>
              <button class="btn-virtual">Virtual tour</button>
            </div>
          </div>
        </div>
  
        <!-- Card 2 -->
        <div class="listing-card">
          <div class="listing-img relative h-[200px] overflow-hidden">
            <div class="prop-scene prop-sky-2">
              <div class="prop-building" style="width:110px;height:140px;left:70px;bottom:0;border-radius:6px 6px 0 0;"></div>
              <div class="prop-window" style="width:16px;height:20px;left:85px;bottom:105px;"></div>
              <div class="prop-window" style="width:16px;height:20px;left:110px;bottom:105px;"></div>
              <div class="prop-window" style="width:16px;height:20px;left:85px;bottom:75px;"></div>
              <div class="prop-window" style="width:16px;height:20px;left:110px;bottom:75px;"></div>
              <div class="prop-window" style="width:16px;height:20px;left:85px;bottom:46px;"></div>
              <div class="prop-window" style="width:16px;height:20px;left:110px;bottom:46px;"></div>
            </div>
            <span class="listing-badge badge-buy absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          </div>
          <div class="listing-body px-5 pt-[18px] pb-5">
            <div class="listing-price font-display text-22px font-semibold text-navy-dark mb-1">₦95,000,000</div>
            <div class="listing-address text-13px text-chalk-muted mb-[14px]">GRA Phase 2, Port Harcourt</div>
            <div class="listing-meta flex gap-4 pt-[14px] border-t border-chalk-3">
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>4 beds</div>
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>3 baths</div>
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>185 m²</div>
            </div>
            <div class="listing-cta flex gap-2 mt-[14px]">
              <a href="//site/properties/12" class="btn-view">
                Details
              </a>
              <button class="btn-virtual">Virtual tour</button>
            </div>
          </div>
        </div>
  
        <!-- Card 3 -->
        <div class="listing-card">
          <div class="listing-img relative h-[200px] overflow-hidden">
            <div class="prop-scene prop-sky-3">
              <div class="prop-building" style="width:80px;height:90px;left:40px;bottom:0;"></div>
              <div class="prop-window" style="width:12px;height:14px;left:50px;bottom:64px;"></div>
              <div class="prop-window" style="width:12px;height:14px;left:68px;bottom:64px;"></div>
              <div class="prop-window" style="width:12px;height:14px;left:50px;bottom:42px;"></div>
              <div class="prop-window" style="width:12px;height:14px;left:68px;bottom:42px;"></div>
              <div class="prop-building" style="width:70px;height:60px;left:145px;bottom:0;"></div>
              <div class="prop-window" style="width:10px;height:12px;left:156px;bottom:38px;"></div>
              <div class="prop-window" style="width:10px;height:12px;left:172px;bottom:38px;"></div>
            </div>
            <span class="listing-badge badge-virtual absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-sage text-white">Virtual only</span>
            <span class="badge-boost">Boosted</span>
          </div>
          <div class="listing-body px-5 pt-[18px] pb-5">
            <div class="listing-price font-display text-22px font-semibold text-navy-dark mb-1">
              ₦2,200,000 <span class="text-13px font-light text-chalk-muted">/ year</span>
            </div>
            <div class="listing-address text-13px text-chalk-muted mb-[14px]">Maitama, Abuja</div>
            <div class="listing-meta flex gap-4 pt-[14px] border-t border-chalk-3">
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>2 beds</div>
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>2 baths</div>
              <div class="meta-item text-12px text-navy-accent flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>75 m²</div>
            </div>
            <div class="listing-cta flex gap-2 mt-[14px]">
              <a href="//site/properties/12" class="btn-view">
                Details
              </a>
              <button class="btn-virtual" style="flex:1.4;">Book virtual tour</button>
            </div>
          </div>
        </div>
      </div>
  
      <div class="text-center mt-11">
        <a class="btn-primary text-14px px-10 py-[14px]" href="/site/properties">
          Browse all listings
        </a>
      </div>
  
    </div>
  </section>