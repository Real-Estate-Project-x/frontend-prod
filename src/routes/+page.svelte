<script lang="ts">
  import { onMount } from 'svelte';
  import { themeStore } from '$lib/stores/theme.svelte';
  import Footer from '$lib/components/shared/Footer.svelte';
  import Navbar from '$lib/components/shared/Navbar.svelte';
  import FinalCTA from '$lib/components/home/FinalCTA.svelte';
  import AgentCTA from '$lib/components/home/AgentCTA.svelte';
  import WhyBlupodd from '$lib/components/home/WhyBlupodd.svelte';
  import QuickExplore from '$lib/components/home/QuickExplore.svelte';
  import MobileDrawer from '$lib/components/shared/MobileDrawer.svelte';
  import FeaturedAgents from '$lib/components/home/FeaturedAgents.svelte';
  import BlupoddLoader from '$lib/components/shared/BlupoddLoader.svelte';
  import '../app.css';

  let isLoading = $state(true);

  // Restore theme from localStorage on first client render
  onMount(() => {
    themeStore.init();

    setTimeout(() => (isLoading = !isLoading), 1000)
  });
</script>

<svelte:head>
    <title>Blupodd — Find Your Place</title>
    <meta name="description" content="Search smarter. View instantly. Connect with agents who know your market." />
  </svelte:head>

  {#if isLoading}
  <BlupoddLoader />
  {/if}
  
  <Navbar />
  <MobileDrawer />

  <!-- ══════════════════════════════════════════════
     HERO
══════════════════════════════════════════════ -->
  <section class="relative min-h-screen bg-navy-dark flex flex-col items-center justify-center px-[5vw] pt-[140px] pb-[110px] overflow-hidden hero-pb">

    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[52%] pointer-events-none" style="width:900px;max-width:200vw">
      <div class="hero-arc-ring" style="width:280px;height:280px;border-color:rgba(74,144,226,.2)"></div>
      <div class="hero-arc-ring" style="width:480px;height:480px"></div>
      <div class="hero-arc-ring" style="width:680px;height:680px;border-color:rgba(74,144,226,.07)"></div>
      <div class="hero-arc-ring" style="width:880px;height:880px;border-color:rgba(74,144,226,.04)"></div>
    </div>
  
    <div class="relative z-10 w-full max-w-[1180px] mx-auto">
  
      <div class="hero-grid grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-center lg:items-start mb-10 lg:mb-14">
  
        <!-- COPY -->
        <div class="text-center lg:text-left">
          <div class="animate-fadeUp inline-flex items-center gap-2 mb-5">
            <span class="trust-badge-ui">
              <span class="trust-dot"></span>
              Home hunting, re-imagined
            </span>
          </div>
  
          <h1 class="animate-fadeUp1 font-display text-chalk font-light leading-[1.04] mb-5" style="font-size:clamp(38px,6.2vw,74px)">
            Find your place.<br><em class="italic text-blue-bright">Seamlessly.</em>
          </h1>
  
          <p class="animate-fadeUp2 text-16px font-light text-white/50 mb-7 max-w-[460px] mx-auto lg:mx-0">
            Buy, rent, or sell with confidence. Search verified listings, book viewings, and connect with trusted agents — all in one place.
          </p>
  
          <!-- SEARCH BAR — hero focal point -->
          <div class="animate-fadeUp3">
            <p class="section-eyebrow !text-white/45 !mb-[10px] text-center lg:text-left">Start your search</p>
            <div class="sb flex items-center rounded-40 pl-6 pr-[6px] py-[6px] w-full mx-auto lg:mx-0 gap-3">
              <div class="flex items-center gap-[10px] flex-1 min-w-0">
                <svg width="17" height="17" viewBox="0 0 16 16" fill="none" class="flex-shrink-0 opacity-45" aria-hidden="true"><circle cx="7" cy="7" r="5" stroke="white" stroke-width="1.5"/><path d="M11 11l3 3" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
                <input type="text" class="si" placeholder="City, neighbourhood, LGA or postcode…" aria-label="Search location">
              </div>
              <div class="sb-divider w-px h-6 bg-white/15 flex-shrink-0"></div>
              <select class="ss" aria-label="Buy or rent"><option>Buy</option><option>Rent</option></select>
              <div class="sb-divider w-px h-6 bg-white/15 flex-shrink-0"></div>
              <select class="ss" aria-label="Number of bedrooms"><option>Any beds</option><option>1 bed</option><option>2 beds</option><option>3+ beds</option></select>
              <button class="sb-btn bg-ember hover:bg-ember-deep text-white font-sans text-13px font-medium px-7 py-[13px] rounded-40 border-none cursor-pointer whitespace-nowrap transition-all duration-200 hover:scale-[1.02] flex-shrink-0">
                Search
              </button>
            </div>
  
            <div class="hero-cta-row flex gap-4 justify-center lg:justify-start flex-wrap mt-6">
              <a href="#listings-near-you" class="btn-primary no-underline inline-block">Browse properties</a>
              <a href="#agent-cta" class="btn-secondary no-underline inline-block">Become an agent</a>
            </div>
  
            <div class="flex gap-[9px] flex-wrap justify-center lg:justify-start mt-6">
              <button class="search-tag">Lagos Island</button>
              <button class="search-tag">Port Harcourt GRA</button>
              <button class="search-tag">Lekki Phase 1</button>
              <button class="search-tag">Abuja Maitama</button>
              <button class="search-tag">Victoria Island</button>
            </div>
          </div>
        </div>
  
        <!-- ILLUSTRATION -->
        <div class="animate-fadeUp4 hero-illustration w-full max-w-[440px] mx-auto lg:max-w-none">
          <svg class="w-full h-auto" viewBox="0 0 600 560" fill="none" role="img" aria-label="Illustration of a residential neighbourhood: a family arriving at a modern home with a for-sale sign and hedge, a row of townhouses and an apartment block along the street, a location pin marking the search route, and a key representing a completed purchase">
            <!-- street -->
            <rect x="14" y="514" width="572" height="20" rx="2" fill="#0E2444" opacity="0.65"/>
            <g stroke="#FEFCF8" stroke-opacity="0.18" stroke-width="3" stroke-linecap="round" stroke-dasharray="16 12">
              <path d="M20 524h560"/>
            </g>
            <rect x="14" y="510" width="572" height="4" fill="#4A7848" opacity="0.4"/>
  
            <!-- ground shadow -->
            <ellipse cx="320" cy="503" rx="235" ry="18" fill="#0E2444" opacity="0.55"/>
  
            <!-- clouds -->
            <g fill="#FEFCF8" opacity="0.08">
              <circle cx="475" cy="66" r="24"/><circle cx="503" cy="58" r="18"/><circle cx="447" cy="62" r="16"/>
              <circle cx="118" cy="48" r="16"/><circle cx="142" cy="42" r="12"/>
            </g>
            <!-- birds -->
            <g stroke="#FEFCF8" stroke-opacity="0.32" stroke-width="2" stroke-linecap="round" fill="none">
              <path d="M336 88q8-10 16 0q8-10 16 0"/>
              <path d="M374 108q6-8 12 0q6-8 12 0"/>
            </g>
  
            <!-- background apartment block -->
            <rect x="34" y="168" width="104" height="292" rx="6" fill="#1F3F6A"/>
            <g fill="#D4AE3A" opacity="0.5">
              <rect x="52" y="192" width="15" height="19" rx="1"/><rect x="80" y="192" width="15" height="19" rx="1"/><rect x="108" y="192" width="15" height="19" rx="1"/>
              <rect x="52" y="226" width="15" height="19" rx="1"/><rect x="80" y="226" width="15" height="19" rx="1"/><rect x="108" y="226" width="15" height="19" rx="1"/>
              <rect x="52" y="260" width="15" height="19" rx="1"/><rect x="80" y="260" width="15" height="19" rx="1"/><rect x="108" y="260" width="15" height="19" rx="1"/>
              <rect x="52" y="294" width="15" height="19" rx="1"/><rect x="80" y="294" width="15" height="19" rx="1"/><rect x="108" y="294" width="15" height="19" rx="1"/>
            </g>
  
            <!-- background townhouse row -->
            <g opacity="0.85">
              <path d="M478 300 L512 268 L546 300 Z" fill="#0E2444"/>
              <rect x="484" y="300" width="56" height="112" fill="#1F3F6A"/>
              <path d="M540 312 L566 288 L592 312 Z" fill="#0E2444"/>
              <rect x="546" y="312" width="46" height="100" fill="#4A70A0"/>
              <g fill="#D4AE3A" opacity="0.5">
                <rect x="494" y="322" width="12" height="15" rx="1"/><rect x="518" y="322" width="12" height="15" rx="1"/>
                <rect x="494" y="352" width="12" height="15" rx="1"/><rect x="518" y="352" width="12" height="15" rx="1"/>
                <rect x="556" y="332" width="10" height="13" rx="1"/><rect x="576" y="332" width="10" height="13" rx="1"/>
              </g>
              <!-- little roof dormers for townhouse character -->
              <rect x="504" y="268" width="16" height="10" fill="#0E2444"/>
            </g>
  
            <!-- streetlamp -->
            <g opacity="0.75">
              <rect x="466" y="392" width="4" height="122" fill="#4A70A0"/>
              <circle cx="468" cy="388" r="9" fill="#D4AE3A" opacity="0.6"/>
              <circle cx="468" cy="388" r="16" fill="#D4AE3A" opacity="0.12"/>
            </g>
  
            <!-- route from pin to front door -->
            <path d="M330 132C300 220 258 300 300 402" stroke="#4A90E2" stroke-width="2.5" stroke-dasharray="2 11" stroke-linecap="round" opacity="0.5"/>
  
            <!-- main house -->
            <path d="M197 302 L330 192 L463 302 Z" fill="#4A70A0"/>
            <rect x="222" y="302" width="216" height="198" fill="#1F3F6A"/>
            <rect x="398" y="214" width="20" height="54" fill="#0E2444"/>
            <g fill="#FEFCF8" opacity="0.22">
              <circle cx="408" cy="200" r="7"/><circle cx="414" cy="183" r="9"/><circle cx="406" cy="165" r="11"/>
            </g>
  
            <!-- windows -->
            <rect x="248" y="332" width="42" height="42" rx="3" fill="#D4AE3A" opacity="0.55"/>
            <path d="M269 332v42M248 353h42" stroke="#0A2463" stroke-width="2"/>
            <rect x="372" y="332" width="42" height="42" rx="3" fill="#D4AE3A" opacity="0.55"/>
            <path d="M393 332v42M372 353h42" stroke="#0A2463" stroke-width="2"/>
  
            <!-- door -->
            <rect x="300" y="402" width="60" height="98" rx="6" fill="#0A2463" stroke="#D4AE3A" stroke-opacity="0.5" stroke-width="2"/>
            <circle cx="345" cy="453" r="3" fill="#D4AE3A"/>
  
            <!-- porch steps -->
            <rect x="284" y="500" width="92" height="9" fill="#0E2444"/>
            <rect x="294" y="509" width="72" height="9" fill="#0E2444" opacity="0.7"/>
  
            <!-- tree -->
            <rect x="152" y="440" width="10" height="56" fill="#5C4326"/>
            <circle cx="157" cy="420" r="33" fill="#4A7848"/>
            <circle cx="132" cy="435" r="21" fill="#4A7848" opacity="0.85"/>
  
            <!-- low hedge along the front yard -->
            <g fill="#4A7848" opacity="0.55">
              <circle cx="205" cy="490" r="10"/><circle cx="220" cy="493" r="11"/><circle cx="236" cy="490" r="10"/>
            </g>
  
            <!-- real-estate yard sign -->
            <g>
              <rect x="228" y="452" width="3" height="42" fill="#5C4326"/>
              <rect x="215" y="440" width="30" height="20" rx="2" fill="#FEFCF8" opacity="0.94"/>
              <rect x="220" y="446" width="20" height="2.5" fill="#C06035"/>
              <rect x="220" y="451" width="14" height="2.5" fill="#0A2463" opacity="0.5"/>
            </g>
  
            <!-- key -->
            <g transform="translate(456,424) rotate(-24)">
              <circle cx="0" cy="0" r="23" fill="none" stroke="#D4AE3A" stroke-width="8"/>
              <rect x="19" y="-5" width="54" height="10" fill="#D4AE3A"/>
              <rect x="58" y="5" width="8" height="13" fill="#D4AE3A"/>
              <rect x="70" y="5" width="8" height="17" fill="#D4AE3A"/>
            </g>
  
            <!-- location pin -->
            <circle class="hero-pin-pulse" cx="330" cy="107" r="30" fill="none" stroke="#C06035" stroke-width="1.5" opacity="0.35"/>
            <path d="M330 62c-18 0-32 14-32 32 0 24 32 56 32 56s32-32 32-56c0-18-14-32-32-32z" fill="#C06035"/>
            <circle cx="330" cy="94" r="11" fill="#FEFCF8"/>
  
            <!-- family walking toward the door -->
            <circle cx="150" cy="472" r="12" fill="#FEFCF8" opacity="0.92"/>
            <path d="M138 488c0-14 24-14 24 0v33h-24z" fill="#FEFCF8" opacity="0.92"/>
            <circle cx="184" cy="483" r="9" fill="#4A90E2" opacity="0.92"/>
            <path d="M175 496c0-10 18-10 18 0v24h-18z" fill="#4A90E2" opacity="0.92"/>
            <path d="M161 501l14-2" stroke="#FEFCF8" stroke-width="3" stroke-linecap="round" opacity="0.7"/>
  
            <!-- suitcase -->
            <g transform="translate(118,506)">
              <rect x="0" y="0" width="25" height="17" rx="3" fill="#D4AE3A"/>
              <path d="M7 0v-5a4 4 0 0 1 4-4a4 4 0 0 1 4 4v5" fill="none" stroke="#D4AE3A" stroke-width="3"/>
            </g>
          </svg>
  
          <div class="hero-chip absolute -bottom-3 left-3 sm:left-6">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none" class="flex-shrink-0"><circle cx="10" cy="7" r="4" stroke="#4A90E2" stroke-width="1.4"/><path d="M3 18c0-4 3.13-6 7-6s7 2 7 6" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg>
            <span class="text-12px text-white/80 font-light">380+ trusted, verified agents</span>
          </div>
        </div>
  
      </div>
    </div>
  
    <!-- Trust strip -->
    <div class="animate-fadeUp5 absolute bottom-0 left-0 right-0 border-t border-white/[0.07]" style="background:rgba(6,14,28,.5);backdrop-filter:blur(8px)">
      <div class="trust-strip-inner flex justify-center flex-wrap max-w-[900px] mx-auto">
        <div class="trust-item">
          <div class="w-8 h-8 rounded-full bg-blue-bright/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" stroke="#4A90E2" stroke-width="1.4" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="font-display text-[22px] font-semibold text-chalk leading-none">4,200+</div>
            <div class="text-10px text-white/40 tracking-em-008 uppercase mt-0.5">Active listings</div>
          </div>
        </div>
        <div class="trust-item">
          <div class="w-8 h-8 rounded-full bg-blue-bright/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="#4A90E2" stroke-width="1.4"/><path d="M3 18c0-4 3.13-6 7-6s7 2 7 6" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <div>
            <div class="font-display text-[22px] font-semibold text-chalk leading-none">380+</div>
            <div class="text-10px text-white/40 tracking-em-008 uppercase mt-0.5">Verified agents</div>
          </div>
        </div>
        <div class="trust-item">
          <div class="w-8 h-8 rounded-full bg-blue-bright/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 2 4-1 1 4 3 2-1 4-2 3-4-1-3 2-3-2-4 1-1-4-3-2 1-4 2-3 4 1z" stroke="#4A90E2" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 10l2 2 4-4" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="font-display text-[22px] font-semibold text-chalk leading-none">98%</div>
            <div class="text-10px text-white/40 tracking-em-008 uppercase mt-0.5">Satisfaction rate</div>
          </div>
        </div>
        <div class="trust-item">
          <div class="w-8 h-8 rounded-full bg-blue-bright/10 flex items-center justify-center flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="3" width="16" height="14" rx="2" stroke="#4A90E2" stroke-width="1.4"/><path d="M6 8l3 3 5-5" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <div class="font-display text-[22px] font-semibold text-chalk leading-none">Virtual</div>
            <div class="text-10px text-white/40 tracking-em-008 uppercase mt-0.5">Tours available</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
  <QuickExplore />

  <!-- ══════════════════════════════════════════════
     LISTING NEAR YOU
══════════════════════════════════════════════ -->
<section id="listings-near-you" class="surface-2 bg-chalk-2 py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Near you</p>
          <h2 class="section-title">Listings near you</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Fresh properties in and around your area.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="near"><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦950,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Terrace Duplex</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Lekki Phase 1, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 beds</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">110 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">CO</div>
          <span class="agent-name-sm">Chukwuemeka O.</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦62,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">4 Bed Detached House</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans-Amadi, Port Harcourt</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 beds</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">110 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">NW</div>
          <span class="agent-name-sm">Nkechi Williams</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-3"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦2,200,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">2 Bed Serviced Flat</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Maitama, Abuja</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 beds</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">110 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">AO</div>
          <span class="agent-name-sm">Amara Okonkwo</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦1,350,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">2 Bed Apartment</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Victoria Island, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 beds</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">110 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">FA</div>
          <span class="agent-name-sm">Fatima Abdullahi</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div></div>
    </div>
  </section>

<!-- ══════════════════════════════════════════════
    SPONSORED LISTINGS [Start]
══════════════════════════════════════════════ -->
  <section id="sponsored-listings" class="surface-1 bg-chalk py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Promoted</p>
          <h2 class="section-title">Sponsored listings</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Boosted by agents for extra visibility.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="sponsored"><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦62,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">4 Bed Detached House</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans-Amadi, Port Harcourt</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">NW</div>
          <span class="agent-name-sm">Nkechi Williams</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦480,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">5 Bed Waterfront Villa</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Banana Island, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">TB</div>
          <span class="agent-name-sm">Tunde Balogun</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦320,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Luxury Penthouse</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Ikoyi, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">AN</div>
          <span class="agent-name-sm">Adaeze Nwosu</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-5"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦210,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">4 Bed Smart Home</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Katampe Extension, Abuja</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">ZB</div>
          <span class="agent-name-sm">Zainab Bello</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div></div>
    </div>
  </section>

  <section id="recently-added" class="surface-2 bg-chalk-2 py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Just listed</p>
          <h2 class="section-title">Recently added</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">New on Blupodd this week.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="recent"><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦950,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Terrace Duplex</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Lekki Phase 1, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">CO</div>
          <span class="agent-name-sm">Chukwuemeka O.</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-3"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦2,200,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">2 Bed Serviced Flat</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Maitama, Abuja</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">AO</div>
          <span class="agent-name-sm">Amara Okonkwo</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div>
      <div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦320,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Luxury Penthouse</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Ikoyi, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">AN</div>
          <span class="agent-name-sm">Adaeze Nwosu</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-5"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦4,500,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Grade A Office Space</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Wuse 2, Abuja</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">IM</div>
          <span class="agent-name-sm">Ibrahim Musa</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div></div>
    </div>
  </section>

  <section id="apartments-for-rent" class="surface-1 bg-chalk py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Renting</p>
          <h2 class="section-title">Apartments for rent</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Flats and apartments ready to move into.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="aptRent"><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦950,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Terrace Duplex</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Lekki Phase 1, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">CO</div>
          <span class="agent-name-sm">Chukwuemeka O.</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-3"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦2,200,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">2 Bed Serviced Flat</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Maitama, Abuja</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">AO</div>
          <span class="agent-name-sm">Amara Okonkwo</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦1,350,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">2 Bed Apartment</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Victoria Island, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">FA</div>
          <span class="agent-name-sm">Fatima Abdullahi</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦850,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Studio Apartment</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">GRA Ikeja, Lagos</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">SA</div>
          <span class="agent-name-sm">Segun Adewale</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div></div>
    </div>
  </section>

  <section id="houses-for-sale" class="surface-2 bg-chalk-2 py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Buying</p>
          <h2 class="section-title">Houses for sale</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Freehold and leasehold homes across Nigeria.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="houseSale">
        <div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦62,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">4 Bed Detached House</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans-Amadi, Port Harcourt</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">NW</div>
          <span class="agent-name-sm">Nkechi Williams</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div>
      <div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦15,500,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Bungalow</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Independence Layout, Enugu</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">CE</div>
          <span class="agent-name-sm">Chidi Eze</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div>
      <div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦45,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Semi-Detached</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans Woji, Port Harcourt</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">NW</div>
          <span class="agent-name-sm">Nkechi Williams</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div><div class="listing-card">
        <div class="relative h-[190px] overflow-hidden">
          <div class="prop-scene prop-sky-3"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
          <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
          <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
          <button class="fav-btn" aria-label="Save to favorites">
            <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
          </button>
        </div>
        <div class="px-5 pt-[16px] pb-0 flex-1">
          <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦28,000,000 </div>
          <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">4 Bed Duplex</div>
          <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Independence Layout, Enugu</div>
          <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
              <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="meta-item">4 beds</span>
            </div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
            <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
          </div>
          <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
        </div>
        <div class="agent-strip">
          <div class="agent-avatar-sm">CE</div>
          <span class="agent-name-sm">Chidi Eze</span>
          <span class="agent-verified-sm">✓ Verified</span>
        </div>
      </div></div>
    </div>
  </section>

  <section id="luxury-properties" class="surface-1 bg-chalk py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Premium</p>
          <h2 class="section-title">Luxury properties</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Exceptional homes for discerning buyers.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="luxury"><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦480,000,000 </div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">5 Bed Waterfront Villa</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Banana Island, Lagos</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="meta-item">4 beds</span>
          </div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">TB</div>
        <span class="agent-name-sm">Tunde Balogun</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦320,000,000 </div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Luxury Penthouse</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Ikoyi, Lagos</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="meta-item">4 beds</span>
          </div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">AN</div>
        <span class="agent-name-sm">Adaeze Nwosu</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-5"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦210,000,000 </div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">4 Bed Smart Home</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Katampe Extension, Abuja</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="meta-item">4 beds</span>
          </div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">ZB</div>
        <span class="agent-name-sm">Zainab Bello</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="badge-boost"><svg width="8" height="8" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 6h6l-5 3.5 2 6L10 14l-5 3.5 2-6L2 8h6z" fill="#060E1C"></path></svg>Boosted</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦680,000,000 </div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">6 Bed Mansion</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Guzape, Abuja</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="meta-item">4 beds</span>
          </div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">3 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div> <span class="meta-item">180 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">TB</div>
        <span class="agent-name-sm">Tunde Balogun</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div></div>
    </div>
  </section>

  <section id="affordable-homes" class="surface-2 bg-chalk-2 py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Budget friendly</p>
          <h2 class="section-title">Affordable homes</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Great value picks without compromising on trust.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="affordable"><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦15,500,000 </div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Bungalow</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Independence Layout, Enugu</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 beds</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">140 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">CE</div>
        <span class="agent-name-sm">Chidi Eze</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-1"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-navy-dark text-white">For rent</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦850,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ month</span></div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Studio Apartment</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">GRA Ikeja, Lagos</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">1 bed</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">1 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">45 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">SA</div>
        <span class="agent-name-sm">Segun Adewale</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦3,900,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Warehouse &amp; Yard</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans-Ekulu, Enugu</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">Open plan</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">1 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">500 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">CO</div>
        <span class="agent-name-sm">Chinedu Okafor</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-4"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦45,000,000 </div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">3 Bed Semi-Detached</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans Woji, Port Harcourt</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 beds</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">150 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">NW</div>
        <span class="agent-name-sm">Nkechi Williams</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div></div>
    </div>
  </section>

  <section id="commercial-properties" class="surface-1 bg-chalk py-16 section-py px-[5vw]">
    <div class="max-w-[1200px] mx-auto">
      <div class="listings-header flex items-end justify-between mb-8 gap-4">
        <div>
          <p class="section-eyebrow">Business</p>
          <h2 class="section-title">Commercial properties</h2>
          <p class="text-13px font-light text-chalk-muted dark:text-white/50 mt-2">Offices, shops and warehouses for your business.</p>
        </div>
        <a href="#" class="view-more-btn">View more <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></a>
      </div>
      <div class="grid grid-cols-[repeat(auto-fill,minmax(270px,1fr))] gap-5" data-grid="commercial"><div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-5"><div class="prop-building" style="width:90px;height:115px;left:52px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:80px;bottom:98px"></div><div class="prop-building" style="width:60px;height:72px;left:162px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:172px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:190px;bottom:46px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦4,500,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Grade A Office Space</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Wuse 2, Abuja</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">Open plan</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">2 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">210 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">IM</div>
        <span class="agent-name-sm">Ibrahim Musa</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div>
    <div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-3"><div class="prop-building" style="width:70px;height:96px;left:34px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:44px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:62px;bottom:72px"></div><div class="prop-building" style="width:46px;height:60px;left:150px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:160px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:178px;bottom:46px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦6,200,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Retail Shop Complex</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Onitsha Main Market, Anambra</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">Open plan</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">3 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">300 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">NO</div>
        <span class="agent-name-sm">Ngozi Obi</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div>
    <div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-2"><div class="prop-building" style="width:100px;height:130px;left:60px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:70px;bottom:98px"></div><div class="prop-window" style="width:12px;height:15px;left:88px;bottom:98px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦3,900,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Warehouse &amp; Yard</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">Trans-Ekulu, Enugu</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">Open plan</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">1 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">500 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">CO</div>
        <span class="agent-name-sm">Chinedu Okafor</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div>
    <div class="listing-card">
      <div class="relative h-[190px] overflow-hidden">
        <div class="prop-scene prop-sky-5"><div class="prop-building" style="width:58px;height:80px;left:40px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:50px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:68px;bottom:46px"></div><div class="prop-building" style="width:80px;height:110px;left:130px;bottom:0"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:20px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:46px"></div><div class="prop-window" style="width:12px;height:15px;left:140px;bottom:72px"></div><div class="prop-window" style="width:12px;height:15px;left:158px;bottom:72px"></div></div>
        <span class="absolute top-3 left-3 text-10px font-medium tracking-em-008 uppercase px-[10px] py-1 rounded-40 bg-ember text-white">For sale</span>
        <span class="verified-pill"><svg width="9" height="9" viewBox="0 0 20 20" fill="none"><path d="M7 10l2 2 4-4" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Verified</span>
        <button class="fav-btn" aria-label="Save to favorites">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.6-10-9.3C0.4 8.2 2 4.5 5.6 4 8 3.6 10.3 5 12 7.3 13.7 5 16 3.6 18.4 4 22 4.5 23.6 8.2 22 11.7 19.5 16.4 12 21 12 21z"></path></svg>
        </button>
      </div>
      <div class="px-5 pt-[16px] pb-0 flex-1">
        <div class="font-display text-22px font-semibold text-navy-dark dark:text-chalk mb-1">₦8,900,000 <span class="text-13px font-light text-chalk-muted dark:text-white/40">/ year</span></div>
        <div class="text-13px font-medium text-navy-dark/80 dark:text-chalk/80 mb-1">Commercial Plaza</div>
        <div class="text-12px text-chalk-muted dark:text-white/45 mb-[12px]">New GRA, Owerri</div>
        <div class="flex gap-4 pt-[12px] border-t border-chalk-3 mb-[14px] flex-wrap">
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">Open plan</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">4 baths</span></div>
          <div class="text-12px text-navy-accent dark:text-blue-bright/80 flex items-center gap-[5px]"><div class="w-1.5 h-1.5 rounded-full bg-blue-bright flex-shrink-0"></div><span class="meta-item">400 m²</span></div>
        </div>
        <div class="flex gap-2 pb-5"><button class="btn-view">Book viewing</button><button class="btn-virtual">Virtual tour</button></div>
      </div>
      <div class="agent-strip">
        <div class="agent-avatar-sm">CA</div>
        <span class="agent-name-sm">Chioma Anyanwu</span>
        <span class="agent-verified-sm">✓ Verified</span>
      </div>
    </div>
  </div>
    </div>
  </section>

<FeaturedAgents />
<WhyBlupodd />
<AgentCTA />
<FinalCTA />

<Footer />

<style>
    /* ─── SEARCH BAR ─── */
    .sb{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.24);box-shadow:0 24px 70px rgba(6,14,28,.55),0 6px 24px rgba(74,144,226,.16),inset 0 1px 0 rgba(255,255,255,.08);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);transition:box-shadow .3s,border-color .3s,transform .3s}
    .sb:focus-within{border-color:rgba(74,144,226,.6);box-shadow:0 28px 80px rgba(6,14,28,.6),0 0 0 3px rgba(74,144,226,.22)}
    .si{flex:1;background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:15px;color:#fff;min-width:0}
    .si::placeholder{color:rgba(255,255,255,.4)}
    .ss{background:none;border:none;outline:none;font-family:'DM Sans',sans-serif;font-size:13px;color:rgba(255,255,255,.68);cursor:pointer;padding:0 4px;-webkit-appearance:none;appearance:none;white-space:nowrap}
    .ss option{color:#0A2463;background:#fff}
    
    /* ─── THEME TOGGLE ─── */
    .dm-btn{width:32px;height:32px;border-radius:50%;border:none;background:rgba(255,255,255,.09);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;transition:background .22s,transform .22s;outline:none}
    .dm-btn:hover{background:rgba(255,255,255,.16);transform:rotate(15deg)}
    .dm-btn .icon-sun{display:flex}.dm-btn .icon-moon{display:none}
    :global([data-theme="dark"]) .dm-btn .icon-sun{display:none}:global([data-theme="dark"]) .dm-btn .icon-moon{display:flex}
    
    /* ─── HAMBURGER / DRAWER ─── */
    .mobile-drawer{display:none;position:fixed;top:68px;left:0;right:0;background:#0A2463;border-bottom:1px solid rgba(255,255,255,.07);z-index:190;padding:20px 5vw 28px;flex-direction:column;gap:0;max-height:calc(100vh - 68px);overflow-y:auto}
    :global([data-theme="dark"]) .mobile-drawer{background:#080F1C}
    .mobile-drawer.open{display:flex}
    .mob-link{display:block;font-size:14px;color:rgba(255,255,255,.65);text-decoration:none;padding:13px 0;border-bottom:1px solid rgba(255,255,255,.06);transition:color .2s}
    .mob-link:hover{color:#fff}
    
    /* ─── AUTH STATES ─── */
    .auth-out{display:flex}.auth-in{display:none}
    .logged-in .auth-out{display:none}.logged-in .auth-in{display:flex}
    .mob-auth-out{display:flex}.mob-auth-in{display:none}
    .logged-in .mob-auth-out{display:none}.logged-in .mob-auth-in{display:block}
    
    /* ─── HAMBURGER ─── */
    .hamburger-btn{display:none}
    @media(max-width:1024px){.nav-links-desktop{display:none!important}.hamburger-btn{display:flex}}
    
    /* ─── QUICK EXPLORE CARDS ─── */
    .explore-card{position:relative;border-radius:16px;overflow:hidden;cursor:pointer;aspect-ratio:3/4;display:flex;flex-direction:column;justify-content:flex-end;transition:transform .28s,box-shadow .28s}
    .explore-card:hover{transform:translateY(-6px);box-shadow:0 24px 60px rgba(10,36,99,.22)}
    .explore-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,14,28,.88) 0%,rgba(6,14,28,.2) 55%,transparent 100%)}
    .explore-card:hover .explore-card-overlay{background:linear-gradient(to top,rgba(6,14,28,.94) 0%,rgba(6,14,28,.3) 60%,rgba(10,36,99,.08) 100%)}
    .explore-card:hover .explore-arrow{transform:translate(3px,-3px)}
    .explore-arrow{transition:transform .25s}
    
    /* ─── TRUST PULSE ─── */
    .trust-dot{width:6px;height:6px;border-radius:50%;background:#4A90E2;animation:trustPulse 2.4s ease-in-out infinite;flex-shrink:0}
    @keyframes trustPulse{0%,100%{box-shadow:0 0 0 0 rgba(74,144,226,.45)}50%{box-shadow:0 0 0 7px rgba(74,144,226,0)}}
    .trust-badge-ui{display:inline-flex;align-items:center;gap:8px;background:rgba(74,144,226,.12);border:1px solid rgba(74,144,226,.22);border-radius:40px;padding:5px 14px;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.7)}
    
    /* ─── PROP SCENE ILLUSTRATIONS ─── */
    .prop-scene{width:100%;height:100%;display:flex;align-items:flex-end;justify-content:center;padding-bottom:20px;position:relative}
    .prop-sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 50%,#4A70A0 100%)}
    .prop-sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
    .prop-sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 40%,#1F3F6A 100%)}
    .prop-sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
    .prop-sky-5{background:linear-gradient(160deg,#1A2E50 0%,#2E5078 60%,#5E8AB0 100%)}
    .prop-building{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
    .prop-window{position:absolute;background:rgba(212,174,58,.68);border-radius:2px}
    
    /* ─── LISTING CARD ─── */
    .listing-card{border-radius:16px;overflow:hidden;border:1px solid #EDE7DC;background:#FEFCF8;transition:transform .25s,box-shadow .25s,border-color .2s;cursor:pointer;display:flex;flex-direction:column}
    .listing-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(10,36,99,.1);border-color:#4A90E2}
    :global([data-theme="dark"]) .listing-card{background:#131C2E;border-color:rgba(255,255,255,.08)}
    .btn-view{flex:1;text-align:center;font-size:12px;font-weight:500;font-family:'DM Sans',sans-serif;padding:9px 0;border-radius:40px;border:1px solid #0A2463;color:#0A2463;cursor:pointer;transition:all .2s;background:none}
    .btn-view:hover{background:#0A2463;color:#fff}
    .btn-virtual{flex:1;text-align:center;font-size:12px;font-weight:500;font-family:'DM Sans',sans-serif;padding:9px 0;border-radius:40px;background:#EFF3EE;color:#4A7848;border:none;cursor:pointer;transition:background .2s}
    .btn-virtual:hover{background:#D0DECC}
    :global([data-theme="dark"]) .btn-view{border-color:rgba(255,255,255,.2);color:#E8EDF5}
    :global([data-theme="dark"]) .btn-view:hover{background:rgba(255,255,255,.08)}
    :global([data-theme="dark"]).btn-virtual{background:rgba(74,120,72,.18);color:#7DBF7A}
    :global([data-theme="dark"]) .btn-virtual:hover{background:rgba(74,120,72,.3)}
    :global([data-theme="dark"]) .listing-card .border-chalk-3{border-color:rgba(255,255,255,.08)}
    .agent-strip{display:flex;align-items:center;gap:8px;padding:9px 17px;border-top:1px solid #EDE7DC;background:#F7F3EC;transition:background .3s,border-color .3s}
    :global([data-theme="dark"]) .agent-strip{background:#111826;border-color:rgba(255,255,255,.08)}
    .agent-avatar-sm{width:24px;height:24px;border-radius:50%;background:#1F3F6A;display:flex;align-items:center;justify-content:center;font-size:9px;font-weight:500;color:#fff;flex-shrink:0}
    .agent-name-sm{font-size:11px;color:#8C8070;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    :global([data-theme="dark"]) .agent-name-sm{color:#6A7FA0}
    .agent-verified-sm{margin-left:auto;font-size:9px;color:#4A7848;font-weight:500;letter-spacing:.06em;text-transform:uppercase;white-space:nowrap;flex-shrink:0}
    :global([data-theme="dark"]) .agent-verified-sm{color:#7DBF7A}
    
    /* ─── BADGES / FAVORITE ─── */
    .badge-boost{position:absolute;top:12px;right:12px;background:#D4AE3A;color:#060E1C;font-size:9px;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:3px 8px;border-radius:20px;display:flex;align-items:center;gap:4px}
    .fav-btn{position:absolute;bottom:12px;right:12px;width:30px;height:30px;border-radius:50%;background:rgba(6,14,28,.45);backdrop-filter:blur(4px);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:background .2s,transform .2s}
    .fav-btn:hover{background:rgba(6,14,28,.65);transform:scale(1.08)}
    .fav-btn.active svg{fill:#C06035;stroke:#C06035}
    .fav-btn svg{width:14px;height:14px;stroke:#fff;fill:none;stroke-width:1.6;transition:fill .2s,stroke .2s}
    .verified-pill{position:absolute;top:12px;right:12px;display:flex;align-items:center;gap:3px;background:rgba(74,120,72,.85);color:#fff;font-size:9px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:3px 8px;border-radius:20px}
    
    /* ─── TRUST STRIP ─── */
    .trust-item{display:flex;align-items:center;gap:11px;padding:18px 36px;border-right:1px solid rgba(255,255,255,.07)}
    .trust-item:last-child{border-right:none}
    
    /* ─── SEARCH TAGS ─── */
    .search-tag{font-size:11px;color:rgba(255,255,255,.45);border:1px solid rgba(255,255,255,.12);padding:4px 12px;border-radius:20px;cursor:pointer;transition:border-color .2s,color .2s;white-space:nowrap;background:none}
    .search-tag:hover{border-color:rgba(74,144,226,.5);color:#4A90E2}
    
    /* ─── SECTION HEADER + VIEW MORE ─── */
    .view-more-btn{font-size:13px;font-weight:500;color:#4A70A0;display:inline-flex;align-items:center;gap:6px;background:none;border:none;cursor:pointer;text-decoration:none;white-space:nowrap;transition:color .2s}
    .view-more-btn:hover{color:#0A2463}
    :global([data-theme="dark"]) .view-more-btn{color:#4A90E2}
    :global([data-theme="dark"]) .view-more-btn:hover{color:#8DAACC}
    .section-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:#4A70A0;margin-bottom:8px}
    :global([data-theme="dark"]) .section-eyebrow{color:#4A90E2}
    .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3.2vw,42px);font-weight:300;line-height:1.1;color:#0A2463}
    :global([data-theme="dark"]) .section-title{color:#FEFCF8}
    
    /* ─── AGENT CARD ─── */
    .agent-card{border-radius:16px;overflow:hidden;border:1px solid #EDE7DC;background:#FEFCF8;padding:28px 24px;text-align:center;transition:transform .25s,box-shadow .25s,border-color .2s}
    .agent-card:hover{transform:translateY(-5px);box-shadow:0 20px 48px rgba(10,36,99,.1);border-color:#4A90E2}
    :global([data-theme="dark"]) .agent-card{background:#131C2E;border-color:rgba(255,255,255,.08)}
    .agent-avatar-lg{width:64px;height:64px;border-radius:50%;margin:0 auto 14px;background:linear-gradient(135deg,#1F3F6A,#4A70A0);display:flex;align-items:center;justify-content:center;font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;color:#fff;position:relative}
    .agent-badge-check{position:absolute;bottom:-2px;right:-2px;width:20px;height:20px;border-radius:50%;background:#4A7848;border:2px solid #FEFCF8;display:flex;align-items:center;justify-content:center}
    :global([data-theme="dark"]) .agent-badge-check{border-color:#131C2E}
    
    /* ─── BTN STYLES ─── */
    .btn-primary{background:#C06035;color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 36px;border-radius:40px;border:none;cursor:pointer;transition:background .2s,transform .15s}
    .btn-primary:hover{background:#a04e28;transform:scale(1.02)}
    .btn-secondary{background:transparent;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:400;padding:14px 36px;border-radius:40px;border:1px solid rgba(255,255,255,.2);cursor:pointer;transition:border-color .2s,color .2s}
    .btn-secondary:hover{border-color:rgba(255,255,255,.5);color:#fff}
    .btn-outline-navy{background:none;color:#0A2463;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:11px 26px;border-radius:40px;border:1px solid #0A2463;cursor:pointer;transition:all .2s}
    .btn-outline-navy:hover{background:#0A2463;color:#fff}
    :global([data-theme="dark"]) .btn-outline-navy{color:#E8EDF5;border-color:rgba(255,255,255,.25)}
    :global([data-theme="dark"]) .btn-outline-navy:hover{background:rgba(255,255,255,.08)}
    
    /* ─── FOOTER ─── */
    .footer-link{display:block;font-size:13px;color:rgba(255,255,255,.55);text-decoration:none;margin-bottom:10px;transition:color .2s}
    .footer-link:hover{color:#fff}
    .footer-legal-link{font-size:12px;color:rgba(255,255,255,.25);text-decoration:none}
    .footer-legal-link:hover{color:rgba(255,255,255,.6)}
    
    /* ─── DARK SECTION SURFACES ─── */
    :global([data-theme="dark"]) .surface-1{background:#0B111E}
    :global([data-theme="dark"]) .surface-2{background:#111826;}
    :global([data-theme="dark"]) nav{background:#080F1C!important}
    
    /* ─── DROPDOWN ─── */
    .user-dropdown{position:absolute;top:calc(100% + 8px);right:0;min-width:196px;background:#071E4A;border:1px solid rgba(255,255,255,.09);border-radius:12px;padding:5px;box-shadow:0 16px 48px rgba(6,14,28,.6),0 4px 12px rgba(6,14,28,.3);opacity:0;transform:translateY(-6px);pointer-events:none;transition:opacity .2s,transform .2s;z-index:300}
    :global([data-theme="dark"]) .user-dropdown{background:#0C1830;border-color:rgba(255,255,255,.07)}
    .user-dropdown.open{opacity:1;transform:translateY(0);pointer-events:auto}
    .dd-header{padding:9px 11px 8px;border-bottom:1px solid rgba(255,255,255,.07);margin-bottom:3px}
    .dd-header-name{font-size:13px;font-weight:500;color:#fff;letter-spacing:.02em;line-height:1.3}
    .dd-header-email{font-size:11px;font-weight:300;color:rgba(255,255,255,.38);margin-top:2px}
    .dd-item{display:flex;align-items:center;gap:9px;width:100%;padding:8px 11px;border-radius:7px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;letter-spacing:.03em;color:rgba(255,255,255,.6);text-decoration:none;background:none;border:none;cursor:pointer;text-align:left;transition:background .18s,color .18s}
    .dd-item:hover{background:rgba(255,255,255,.06);color:#fff}
    .dd-item svg{width:13px;height:13px;flex-shrink:0;color:rgba(255,255,255,.3);transition:color .18s}
    .dd-item:hover svg{color:rgba(255,255,255,.6)}
    .dd-sep{height:1px;background:rgba(255,255,255,.07);margin:3px 6px}
    .dd-item-logout{color:rgba(255,255,255,.48)}
    .dd-item-logout:hover{background:rgba(192,96,53,.12);color:#EDBA9B}
    .dd-item-logout:hover svg{color:#C06035}
    .user-avatar{width:28px;height:28px;border-radius:50%;flex-shrink:0;background:rgba(74,144,226,.2);border:1px solid rgba(74,144,226,.35);display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:500;letter-spacing:.04em;color:#fff;transition:background .2s,border-color .2s}
    .user-trigger:hover .user-avatar,[aria-expanded="true"] .user-avatar{background:rgba(74,144,226,.35);border-color:rgba(74,144,226,.6)}
    .user-chevron{width:12px;height:12px;color:rgba(255,255,255,.38);transition:transform .22s,color .2s;flex-shrink:0}
    [aria-expanded="true"] .user-chevron{transform:rotate(180deg);color:rgba(255,255,255,.65)}
    
    /* ─── HERO ILLUSTRATION ─── */
    .hero-illustration{position:relative}
    .hero-pin-pulse{animation:pinPulse 2.6s ease-in-out infinite;transform-origin:center}
    @keyframes pinPulse{0%,100%{opacity:.35}50%{opacity:.06}}
    .hero-chip{display:inline-flex;align-items:center;gap:8px;background:rgba(6,14,28,.55);border:1px solid rgba(255,255,255,.14);border-radius:40px;padding:8px 16px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);box-shadow:0 12px 32px rgba(6,14,28,.4);white-space:nowrap}
    
    /* ─── HERO ARC RINGS ─── */
    .hero-arc-ring{position:absolute;border-radius:50%;border:1px solid rgba(74,144,226,.1);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
    .cta-ring{position:absolute;border-radius:50%;border:1px solid rgba(74,144,226,.08);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
    .agents-arc{position:absolute;right:-120px;top:50%;transform:translateY(-50%);width:500px;height:500px;border-radius:50%;border:1px solid rgba(255,255,255,.06);pointer-events:none}
    .agents-arc::before{content:'';position:absolute;inset:60px;border-radius:50%;border:1px solid rgba(255,255,255,.05)}
    .agents-arc::after{content:'';position:absolute;inset:120px;border-radius:50%;border:1px solid rgba(255,255,255,.04)}
    
  
    .btn-gold {
      display: inline-block;
      background: #D4AE3A;
      color: #060E1C;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: .06em;
      padding: 14px 34px;
      border-radius: 40px;
      text-decoration: none;
      transition: transform .2s, opacity .2s;
      border: none;
      cursor: pointer;
    }
    .btn-gold:hover {
      opacity: .88;
      transform: scale(1.03);
    }

    /* ─── STAT strip responsive ─── */
    @media(max-width:640px){
      .trust-strip-inner{display:grid!important;grid-template-columns:1fr 1fr}
      .trust-item{border-right:1px solid rgba(255,255,255,.07)!important}
      .trust-item:nth-child(even){border-right:none!important}
      .trust-item:nth-child(3),.trust-item:nth-child(4){border-top:1px solid rgba(255,255,255,.07)}
    }
    
    /* ─── RESPONSIVE ─── */
    @media(max-width:1024px){.nav-links-desktop{display:none!important}}
    @media(max-width:1023px){
      .hero-grid{grid-template-columns:1fr!important}
      .hero-illustration{max-width:380px!important;margin:0 auto!important}
    }
    @media(max-width:900px){
      .explore-grid{grid-template-columns:1fr 1fr!important;gap:20px!important}
      .agents-grid-cta{grid-template-columns:1fr!important;gap:44px!important}
      .agents-arc{right:-260px!important;opacity:.6}
    }
    @media(max-width:768px){
      .footer-top-grid{grid-template-columns:1fr 1fr!important;gap:32px!important}
      .footer-bottom-row{flex-direction:column!important;gap:12px!important;align-items:flex-start!important}
      .agents-grid-cta{grid-template-columns:1fr!important;gap:48px!important}
      .section-py{padding-top:56px!important;padding-bottom:56px!important}
      .agents-arc{right:-200px!important}
      .listings-header{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
      .explore-grid{grid-template-columns:1fr 1fr!important;gap:18px!important}
      .explore-card{min-height:180px!important}
      .trust-item{padding:16px 18px!important}
    }
    @media(max-width:640px){
      .footer-top-grid{grid-template-columns:1fr!important}
      .explore-grid{grid-template-columns:1fr 1fr;gap:16px!important;row-gap:18px!important}
      .explore-card{aspect-ratio:4/3;min-height:170px!important}
      .hero-pb{padding-bottom:172px!important}
      .hero-illustration{max-width:300px!important}
      .section-py{padding-top:44px!important;padding-bottom:44px!important}
      .hero-cta-row{flex-direction:column!important;align-items:stretch!important}
      .hero-cta-row a{width:100%!important;text-align:center!important}
    }
    @media(max-width:480px){
      .sb{flex-direction:column!important;padding:16px 18px!important;border-radius:20px!important;gap:10px!important;align-items:stretch!important}
      .sb-divider{display:none!important}
      .si,.ss{width:100%!important;padding:10px 0!important;border-bottom:1px solid rgba(255,255,255,.08)}
      .sb-btn{width:100%!important;margin-top:2px!important;padding:14px 0!important;border-radius:12px!important}
      /* single, wider banner-style cards so labels never crowd or overlap on narrow phones */
      .explore-grid{grid-template-columns:1fr!important;row-gap:16px!important}
      .explore-card{aspect-ratio:21/9!important;min-height:130px!important}
      .trust-strip-inner{max-width:100%!important}
      .hero-illustration{max-width:250px!important}
      nav{padding-left:16px!important;padding-right:16px!important}
    }
    @media(max-width:360px){
      .explore-card{aspect-ratio:16/9!important;min-height:120px!important}
      .search-tag{padding:5px 13px!important}
    }
</style>