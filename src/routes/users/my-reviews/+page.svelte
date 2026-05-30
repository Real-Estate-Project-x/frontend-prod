<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";
  
  type FilterType = 'all' | 'reviewed' | 'pending'

  let openReviewModal = $state(false);
  let selectedFilter = $state<FilterType>('all');

    const setFilter = (value: FilterType) => selectedFilter = value;

  const toggleReviewModal = () => openReviewModal = !openReviewModal;

  const closeReviewModal = () => openReviewModal = false;
</script>

{#if openReviewModal}
<!-- ══════════════════════════════════
     REVIEW MODAL
══════════════════════════════════ -->
<div id="reviewModal" class="open fixed inset-0 z-[600] bg-navy-deep/65 backdrop-blur-sm items-end sm:items-center justify-center p-0 sm:p-4">
    <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-t-3xl sm:rounded-2xl w-full sm:max-w-[540px] max-h-[96vh] flex flex-col relative shadow-[0_24px_72px_rgba(10,36,99,.22)] dark:shadow-[0_24px_72px_rgba(0,0,0,.65)] tt overflow-hidden">
      <!-- drag pill mobile -->
      <div class="sm:hidden w-10 h-1 rounded-full bg-chalk-3 dark:bg-white/15 mx-auto mt-3 flex-shrink-0"></div>
  
      <!-- Modal header -->
      <div class="flex-shrink-0 px-6 pt-5 pb-4 border-b border-chalk-3 dark:border-white/[.08] flex items-start justify-between gap-4">
        <div>
          <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5" id="modalEyebrow">Leave a review</p>
          <h2 class="font-display text-[24px] font-light text-navy-dark dark:text-blue-100 leading-tight" id="modalTitle">3-Bedroom Apartment, GRA Phase 2</h2>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5 flex items-center gap-1.5" id="modalMeta">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="8" cy="6" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>
            GRA Phase 2, Port Harcourt · Viewed 3 Mar 2026
          </div>
        </div>
        <button onclick={closeReviewModal} class="w-8 h-8 rounded-full bg-chalk-2 dark:bg-white/[.08] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center cursor-pointer tt hover:bg-chalk-3 flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
  
      <!-- Modal body (scrollable) -->
      <div class="flex-1 overflow-y-auto scrollbar-hide px-6 py-5">
  
        <!-- Star rating -->
        <div class="mb-5">
          <label class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-3">Overall rating <span class="text-ember">*</span></label>
          <div class="flex gap-2 items-center" id="starRow">
            <span class="star-i" data-val="1">★</span>
            <span class="star-i" data-val="2">★</span>
            <span class="star-i" data-val="3">★</span>
            <span class="star-i" data-val="4">★</span>
            <span class="star-i" data-val="5">★</span>
            <span class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] ml-2" id="ratingLabel"></span>
          </div>
        </div>
  
        <!-- Quick tags -->
        <div class="mb-5">
          <label class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2.5">Highlights <span class="text-[11px] font-normal text-chalk-muted dark:text-[#6A7FA0]">(optional)</span></label>
          <div class="flex gap-2 flex-wrap">
            <button class="qtag">Property accuracy</button>
            <button class="qtag">Agent professionalism</button>
            <button class="qtag">Viewing experience</button>
            <button class="qtag">Property condition</button>
            <button class="qtag">Accurate pricing</button>
            <button class="qtag">Responsive agent</button>
          </div>
        </div>
  
        <!-- Comment textarea -->
        <div class="mb-4">
          <label class="block text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2">Your review <span class="text-ember">*</span></label>
          <textarea id="reviewComment" rows="5" maxlength="1200"
            placeholder="Tell others about your viewing experience — what did you love, what could be improved?"
            class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-2xl px-4 py-3.5 text-[14px] font-light text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none resize-none focus:border-blue-link tt leading-relaxed"></textarea>
          <div class="flex justify-between mt-1.5">
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Your review is visible to property seekers.</span>
            <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="reviewCharCount">0/1200</span>
          </div>
        </div>
  
        <!-- Error message -->
        <p id="reviewError" class="hidden text-[12px] text-ember mb-2">Please add a star rating and write a short review.</p>
  
      </div>
  
      <!-- Modal footer -->
      <div class="flex-shrink-0 px-6 pb-6 pt-4 border-t border-chalk-3 dark:border-white/[.08] flex gap-3">
        <button onclick={closeReviewModal} class="flex-1 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] text-chalk-muted dark:text-[#6A7FA0] rounded-full py-3 text-[13px] cursor-pointer hover:bg-chalk-3 dark:hover:bg-white/10 tt">Cancel</button>
        <button onclick={() => {}} class="flex-[2] bg-ember hover:bg-ember-deep text-white rounded-full py-3 text-[13px] font-medium cursor-pointer border-none tt">Submit review</button>
      </div>
    </div>
  </div>
{/if}

<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
  <main class="flex-1 min-w-0 overflow-x-hidden">
    <!-- Page header band -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
        <div class="max-w-[900px] mx-auto">
        <div class="flex items-center gap-2 mb-3 flex-wrap">
            <a href="/users" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Dashboard
            </a>
            <span class="text-white/25 text-[12px]">/</span>
            <span class="text-[12px] text-white/60">My reviews</span>
        </div>
        <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Community trust</p>
        <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">My <em class="italic text-gold">reviews.</em></h1>
        <p class="text-[13px] font-light text-white/50 mt-2 max-w-[520px] leading-[1.7]">Your reviews help other property seekers make informed decisions while rewarding agencies that consistently deliver great experiences.</p>
        </div>
    </div>

    <!-- BODY -->
  <div class="px-6 lg:px-10 py-7 max-w-[900px] mx-auto space-y-8">

    <!-- ══ SECTION 1: AWAITING REVIEW ══ -->
    <section class="fu d1">
      <div class="flex items-center gap-3 mb-4 flex-wrap">
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="w-2 h-2 rounded-full bg-gold pulse-dot flex-shrink-0"></span>
          <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Awaiting your review</h2>
        </div>
        <div class="group-rule"></div>
        <span class="text-[11px] font-medium text-gold bg-gold/10 px-3 py-[3px] rounded-full flex-shrink-0 flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>3 pending</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <!-- Pending card 1 -->
        <div class="rcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden pending-accent tt">
          <div class="h-[140px] relative overflow-hidden prop-sky-1">
            <div class="pb" style="width:70px;height:88px;left:36px"></div>
            <div class="pw" style="width:10px;height:13px;left:44px;bottom:64px"></div><div class="pw" style="width:10px;height:13px;left:60px;bottom:64px"></div>
            <div class="pw" style="width:10px;height:13px;left:44px;bottom:44px"></div><div class="pw" style="width:10px;height:13px;left:60px;bottom:44px"></div>
            <div class="pw" style="width:10px;height:13px;left:44px;bottom:25px"></div>
            <div class="pb" style="width:48px;height:58px;left:130px"></div>
            <div class="pw" style="width:7px;height:9px;left:138px;bottom:38px"></div><div class="pw" style="width:7px;height:9px;left:150px;bottom:38px"></div>
            <span class="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] bg-gold text-navy-deep px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-navy-mid"></span>Review pending</span>
          </div>
          <div class="p-4">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5 leading-snug">3-Bed Apartment, GRA Phase 2</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mb-1">
              <svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>
              GRA Phase 2, Port Harcourt
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-1">Viewed 3 Mar 2026 · Premier Properties PH</div>
            <div class="flex gap-1 mb-3">★★★★★</div>
            <button onclick={toggleReviewModal} class="w-full text-[12px] font-medium text-white bg-ember hover:bg-ember-deep py-[9px] rounded-full border-none cursor-pointer tt">Leave review</button>
          </div>
        </div>

        <!-- Pending card 2 -->
        <div class="rcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden pending-accent tt">
          <div class="h-[140px] relative overflow-hidden prop-sky-2">
            <div class="pb" style="width:82px;height:102px;left:44px"></div>
            <div class="pw" style="width:11px;height:14px;left:52px;bottom:78px"></div><div class="pw" style="width:11px;height:14px;left:69px;bottom:78px"></div>
            <div class="pw" style="width:11px;height:14px;left:52px;bottom:57px"></div><div class="pw" style="width:11px;height:14px;left:69px;bottom:57px"></div>
            <div class="pw" style="width:11px;height:14px;left:52px;bottom:37px"></div>
            <div class="pb" style="width:52px;height:66px;left:148px"></div>
            <div class="pw" style="width:8px;height:10px;left:156px;bottom:46px"></div>
            <span class="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] bg-gold text-navy-deep px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-navy-mid"></span>Review pending</span>
          </div>
          <div class="p-4">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5 leading-snug">2-Bed Flat, Maitama</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mb-1"><svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Maitama, Abuja FCT</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-1">Viewed 28 Feb 2026 · Apex Estate Agents</div>
            <div class="flex gap-1 mb-3 text-chalk-3 dark:text-white/20 text-[13px]">★★★★★</div>
            <button onclick={toggleReviewModal} class="w-full text-[12px] font-medium text-white bg-ember hover:bg-ember-deep py-[9px] rounded-full border-none cursor-pointer tt">Leave review</button>
          </div>
        </div>

        <!-- Pending card 3 -->
        <div class="rcard bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden pending-accent tt">
          <div class="h-[140px] relative overflow-hidden prop-sky-3">
            <div class="pb" style="width:64px;height:80px;left:32px"></div>
            <div class="pw" style="width:9px;height:12px;left:39px;bottom:58px"></div><div class="pw" style="width:9px;height:12px;left:54px;bottom:58px"></div>
            <div class="pw" style="width:9px;height:12px;left:39px;bottom:39px"></div>
            <div class="pb" style="width:44px;height:54px;left:118px"></div>
            <div class="pw" style="width:7px;height:9px;left:124px;bottom:35px"></div><div class="pw" style="width:7px;height:9px;left:136px;bottom:35px"></div>
            <span class="absolute top-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.08em] bg-gold text-navy-deep px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-navy-mid"></span>Review pending</span>
          </div>
          <div class="p-4">
            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5 leading-snug">Studio Apt, Woji</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mb-1"><svg width="9" height="9" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Woji, Port Harcourt</div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-1">Viewed 22 Feb 2026 · Silverline Realty</div>
            <div class="flex gap-1 mb-3 text-chalk-3 dark:text-white/20 text-[13px]">★★★★★</div>
            <button onclick={toggleReviewModal} class="w-full text-[12px] font-medium text-white bg-ember hover:bg-ember-deep py-[9px] rounded-full border-none cursor-pointer tt">Leave review</button>
          </div>
        </div>

      </div>
    </section>

    <!-- ══ SECTION 2: IMPACT BANNER ══ -->
    <section class="fu d2">
      <div class="bg-gradient-to-br from-navy-mid to-navy-strong border border-white/[.08] rounded-2xl p-5 flex items-start gap-4 tt">
        <div class="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AE3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div class="min-w-0">
          <div class="text-[14px] font-medium text-white mb-1">Your feedback keeps Blupodd trustworthy</div>
          <p class="text-[13px] font-light text-white/55 leading-[1.7] max-w-[520px]">Property ratings help highlight exceptional agents, improve transparency, and help future buyers and renters make informed decisions. Every review you submit is read by real people looking for their next home.</p>
          <div class="flex gap-4 mt-3 flex-wrap">
            <div class="text-center"><div class="font-display text-[20px] font-semibold text-white leading-none">47</div><div class="text-[10px] text-white/40 mt-0.5 uppercase tracking-[.07em]">Reviews left</div></div>
            <div class="w-px h-10 bg-white/10 self-center"></div>
            <div class="text-center"><div class="font-display text-[20px] font-semibold text-white leading-none">4.7</div><div class="text-[10px] text-white/40 mt-0.5 uppercase tracking-[.07em]">Avg rating given</div></div>
            <div class="w-px h-10 bg-white/10 self-center"></div>
            <div class="text-center"><div class="font-display text-[20px] font-semibold text-white leading-none">3</div><div class="text-[10px] text-white/40 mt-0.5 uppercase tracking-[.07em]">Pending</div></div>
          </div>
        </div>
      </div>
    </section>

    <!-- ══ SECTION 3: ALL VIEWED PROPERTIES ══ -->
    <section class="fu d3">
      <!-- Section heading + search + filters -->
      <div class="flex items-center gap-3 mb-4 flex-wrap">
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="w-2 h-2 rounded-full bg-blue-bright flex-shrink-0"></span>
          <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100">All viewed properties</h2>
        </div>
        <div class="group-rule"></div>
        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">9 total</span>
      </div>

      <!-- Search + filter bar -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-4 mb-5 tt flex flex-wrap gap-3 items-center">
        <!-- Search input -->
        <div class="flex-1 min-w-[180px] flex items-center gap-2.5 bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-[9px] focus-within:border-blue-link tt">
          <svg width="13" height="13" class="text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="5" stroke="currentColor" stroke-width="1.4"/><path d="M11 11l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          <input type="text" id="searchInput" placeholder="Search by property, agency or location…" oninput={() => {}} class="flex-1 bg-transparent border-none outline-none text-[13px] font-light text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] min-w-0">
        </div>
        <!-- Filter tabs -->
        <div class="flex gap-1 p-1.5 bg-chalk-2 dark:bg-[#1A2438] rounded-2xl tt overflow-x-auto scrollbar-hide flex-shrink-0">
        {#each ['all', 'reviewed', 'pending'] as _}
          <button class="ftab capitalize" class:active={_ === selectedFilter} 
            onclick={() => setFilter(_ as any)}>
            All
          </button>
        {/each}
        </div>
        <!-- Sort -->
        <div class="relative flex-shrink-0">
          <select onchange={() => {}} class="bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 pr-8 py-[9px] text-[13px] text-navy-dark dark:text-blue-100 outline-none cursor-pointer tt font-sans">
            <option value="recent">Most recent</option>
            <option value="rated_high">Highest rated</option>
            <option value="rated_low">Lowest rated</option>
          </select>
          <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-chalk-muted dark:text-[#6A7FA0]" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
      </div>

      <!-- Property cards list -->
      <div class="space-y-4" id="reviewList">

        <!-- ── REVIEWED: Card 1 ── -->
        <div class="rcard review-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt" data-status="reviewed" data-title="3-Bed Apartment GRA Phase 2" data-agency="Premier Properties PH" data-loc="Port Harcourt">
          <div class="flex flex-col sm:flex-row">
            <!-- Thumb -->
            <div class="relative sm:w-[160px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0 prop-sky-1">
              <div class="pb" style="width:62px;height:78px;left:28px"></div>
              <div class="pw" style="width:9px;height:12px;left:35px;bottom:56px"></div><div class="pw" style="width:9px;height:12px;left:49px;bottom:56px"></div>
              <div class="pw" style="width:9px;height:12px;left:35px;bottom:38px"></div><div class="pw" style="width:9px;height:12px;left:49px;bottom:38px"></div>
              <div class="pw" style="width:9px;height:12px;left:35px;bottom:22px"></div>
              <div class="pb" style="width:42px;height:52px;left:110px"></div>
              <div class="pw" style="width:7px;height:9px;left:117px;bottom:33px"></div>
              <span class="absolute bottom-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.06em] bg-sage text-white px-2 py-[3px] rounded-full flex items-center gap-1"><svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Reviewed</span>
            </div>
            <!-- Content -->
            <div class="flex-1 min-w-0 p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <div class="min-w-0">
                    <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-snug">3-Bed Apartment, GRA Phase 2</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mt-0.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>GRA Phase 2, Port Harcourt</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Premier Properties PH · Viewed 3 Mar 2026</div>
                  </div>
                </div>
                <!-- Stars display -->
                <div class="flex items-center gap-1.5 my-2.5">
                  <span class="star-d">★</span><span class="star-d">★</span><span class="star-d">★</span><span class="star-d">★</span><span class="star-d">★</span>
                  <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 ml-1">5.0</span>
                </div>
                <!-- Review comment preview -->
                <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65] line-clamp-2">The agent was incredibly professional and the property matched the listing exactly. Great natural light in the master bedroom. Would absolutely recommend to others looking in GRA Phase 2.</p>
                <!-- Tags -->
                <div class="flex gap-1.5 flex-wrap mt-2.5">
                  <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[3px] rounded-full">Property accuracy</span>
                  <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[3px] rounded-full">Agent professionalism</span>
                  <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[3px] rounded-full">Viewing experience</span>
                </div>
              </div>
              <div class="flex gap-2 mt-4 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                <button onclick={toggleReviewModal} class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.12] hover:border-blue-bright hover:text-blue-bright px-4 py-[7px] rounded-full cursor-pointer bg-transparent tt">Edit review</button>
                <a href="/site/properties/12" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.08] no-underline hover:border-chalk-4 tt">View property →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- ── REVIEWED: Card 2 ── -->
        <div class="rcard review-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt" data-status="reviewed" data-title="4-Bed Duplex Lekki Phase 1" data-agency="Apex Estate Agents" data-loc="Lagos">
          <div class="flex flex-col sm:flex-row">
            <div class="relative sm:w-[160px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0 prop-sky-4">
              <div class="pb" style="width:74px;height:92px;left:36px"></div>
              <div class="pw" style="width:10px;height:13px;left:44px;bottom:68px"></div><div class="pw" style="width:10px;height:13px;left:60px;bottom:68px"></div>
              <div class="pw" style="width:10px;height:13px;left:44px;bottom:48px"></div><div class="pw" style="width:10px;height:13px;left:60px;bottom:48px"></div>
              <div class="pw" style="width:10px;height:13px;left:44px;bottom:29px"></div>
              <div class="pb" style="width:48px;height:60px;left:128px"></div>
              <div class="pw" style="width:7px;height:9px;left:136px;bottom:40px"></div>
              <span class="absolute bottom-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.06em] bg-sage text-white px-2 py-[3px] rounded-full flex items-center gap-1"><svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Reviewed</span>
            </div>
            <div class="flex-1 min-w-0 p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <div class="min-w-0">
                    <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-snug">4-Bed Duplex, Lekki Phase 1</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mt-0.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Lekki Phase 1, Lagos</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Apex Estate Agents · Viewed 14 Jan 2026</div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 my-2.5">
                  <span class="star-d">★</span><span class="star-d">★</span><span class="star-d">★</span><span class="star-d">★</span><span class="star-d empty">★</span>
                  <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 ml-1">4.0</span>
                </div>
                <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65] line-clamp-2">Spacious property in an excellent location. The agent was responsive but arrived slightly late. Property was well maintained overall — I would visit again.</p>
                <div class="flex gap-1.5 flex-wrap mt-2.5">
                  <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[3px] rounded-full">Responsive agent</span>
                  <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 px-2.5 py-[3px] rounded-full">Property condition</span>
                </div>
              </div>
              <div class="flex gap-2 mt-4 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                <button onclick={toggleReviewModal} class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.12] hover:border-blue-bright hover:text-blue-bright px-4 py-[7px] rounded-full cursor-pointer bg-transparent tt">Edit review</button>
                <a href="/site/properties/12" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.08] no-underline hover:border-chalk-4 tt">View property →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- ── REVIEWED: Card 3 ── -->
        <div class="rcard review-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt" data-status="reviewed" data-title="Commercial Space Aba Road" data-agency="Silverline Realty" data-loc="Port Harcourt">
          <div class="flex flex-col sm:flex-row">
            <div class="relative sm:w-[160px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0 prop-sky-3">
              <div class="pb" style="width:56px;height:68px;left:28px"></div>
              <div class="pw" style="width:8px;height:11px;left:34px;bottom:48px"></div><div class="pw" style="width:8px;height:11px;left:48px;bottom:48px"></div>
              <div class="pw" style="width:8px;height:11px;left:34px;bottom:32px"></div>
              <div class="pb" style="width:80px;height:100px;left:96px;border-radius:5px 5px 0 0"></div>
              <div class="pw" style="width:10px;height:13px;left:104px;bottom:76px"></div><div class="pw" style="width:10px;height:13px;left:120px;bottom:76px"></div>
              <div class="pw" style="width:10px;height:13px;left:136px;bottom:76px"></div>
              <div class="pw" style="width:10px;height:13px;left:104px;bottom:56px"></div><div class="pw" style="width:10px;height:13px;left:120px;bottom:56px"></div>
              <span class="absolute bottom-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.06em] bg-sage text-white px-2 py-[3px] rounded-full flex items-center gap-1"><svg width="7" height="7" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>Reviewed</span>
            </div>
            <div class="flex-1 min-w-0 p-5 flex flex-col justify-between">
              <div>
                <div class="flex items-start justify-between gap-3 flex-wrap mb-1">
                  <div class="min-w-0">
                    <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-snug">Commercial Space, Aba Road</div>
                    <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mt-0.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Aba Road, Port Harcourt</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Silverline Realty · Viewed 5 Jan 2026</div>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 my-2.5">
                  <span class="star-d">★</span><span class="star-d">★</span><span class="star-d">★</span><span class="star-d empty">★</span><span class="star-d empty">★</span>
                  <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100 ml-1">3.0</span>
                </div>
                <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65] line-clamp-2">Decent location but the space was smaller than advertised. Agent was helpful but listing accuracy could be improved. Good for a startup but not what we ultimately needed.</p>
              </div>
              <div class="flex gap-2 mt-4 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                <button onclick={toggleReviewModal} class="text-[12px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.12] hover:border-blue-bright hover:text-blue-bright px-4 py-[7px] rounded-full cursor-pointer bg-transparent tt">Edit review</button>
                <a href="/site/properties/12" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white px-4 py-[7px] rounded-full border border-chalk-3 dark:border-white/[.08] no-underline hover:border-chalk-4 tt">View property →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- ── PENDING: Card 4 ── -->
        <div class="rcard review-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden pending-accent tt" data-status="pending" data-title="3-Bed Apartment GRA Phase 2" data-agency="Premier Properties PH" data-loc="Port Harcourt">
          <div class="flex flex-col sm:flex-row">
            <div class="relative sm:w-[160px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0 prop-sky-1">
              <div class="pb" style="width:70px;height:88px;left:36px"></div>
              <div class="pw" style="width:10px;height:13px;left:44px;bottom:64px"></div><div class="pw" style="width:10px;height:13px;left:60px;bottom:64px"></div>
              <div class="pw" style="width:10px;height:13px;left:44px;bottom:44px"></div><div class="pw" style="width:10px;height:13px;left:60px;bottom:44px"></div>
              <div class="pw" style="width:10px;height:13px;left:44px;bottom:25px"></div>
              <div class="pb" style="width:48px;height:58px;left:130px"></div>
              <div class="pw" style="width:7px;height:9px;left:138px;bottom:38px"></div>
              <span class="absolute bottom-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.06em] bg-gold text-navy-deep px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-navy-mid"></span>Pending review</span>
            </div>
            <div class="flex-1 min-w-0 p-5 flex flex-col justify-between">
              <div>
                <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-snug mb-0.5">3-Bed Apartment, GRA Phase 2</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mb-0.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>GRA Phase 2, Port Harcourt</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Premier Properties PH · Viewed 3 Mar 2026</div>
                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.6]">Share your experience to help others find the right home.</p>
              </div>
              <div class="flex gap-2 mt-4 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                <button onclick={toggleReviewModal} class="text-[12px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[9px] rounded-full border-none cursor-pointer tt">Rate property</button>
                <a href="/site/properties/12" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white px-4 py-[9px] rounded-full border border-chalk-3 dark:border-white/[.08] no-underline hover:border-chalk-4 tt">View property →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- ── PENDING: Card 5 ── -->
        <div class="rcard review-card bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden pending-accent tt" data-status="pending" data-title="2-Bed Flat Maitama" data-agency="Apex Estate Agents" data-loc="Abuja">
          <div class="flex flex-col sm:flex-row">
            <div class="relative sm:w-[160px] h-[140px] sm:h-auto overflow-hidden flex-shrink-0 prop-sky-2">
              <div class="pb" style="width:82px;height:102px;left:44px"></div>
              <div class="pw" style="width:11px;height:14px;left:52px;bottom:78px"></div><div class="pw" style="width:11px;height:14px;left:69px;bottom:78px"></div>
              <div class="pw" style="width:11px;height:14px;left:52px;bottom:57px"></div><div class="pw" style="width:11px;height:14px;left:69px;bottom:57px"></div>
              <div class="pw" style="width:11px;height:14px;left:52px;bottom:37px"></div>
              <div class="pb" style="width:52px;height:66px;left:148px"></div>
              <div class="pw" style="width:8px;height:10px;left:156px;bottom:46px"></div>
              <span class="absolute bottom-2.5 left-2.5 text-[9px] font-semibold uppercase tracking-[.06em] bg-gold text-navy-deep px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-navy-mid"></span>Pending review</span>
            </div>
            <div class="flex-1 min-w-0 p-5 flex flex-col justify-between">
              <div>
                <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-snug mb-0.5">2-Bed Flat, Maitama</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1 mb-0.5"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>Maitama, Abuja FCT</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Apex Estate Agents · Viewed 28 Feb 2026</div>
                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.6]">Your honest feedback helps future renters make better decisions.</p>
              </div>
              <div class="flex gap-2 mt-4 pt-3.5 border-t border-chalk-3 dark:border-white/[.07] flex-wrap">
                <button onclick={toggleReviewModal} class="text-[12px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-[9px] rounded-full border-none cursor-pointer tt">Rate property</button>
                <a href="/site/properties/12" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-white px-4 py-[9px] rounded-full border border-chalk-3 dark:border-white/[.08] no-underline hover:border-chalk-4 tt">View property →</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state (hidden by default) -->
        <div id="emptyState" class="hidden text-center py-14">
          <div class="w-16 h-16 rounded-2xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center mx-auto mb-4 tt">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8C8070" stroke-width="1.3" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </div>
          <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:22px">No results found.</h3>
          <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0]">Try adjusting your search or filter.</p>
        </div>

      </div><!-- /reviewList -->

      <!-- ── PAGINATION ── -->
      <!-- <div class="flex items-center justify-between gap-4 pt-6 border-t border-chalk-3 dark:border-white/[.07] mt-4 flex-wrap">
        <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]" id="pageInfo">Showing 1–5 of 9 properties</span>
        <div class="flex items-center gap-1.5 flex-wrap justify-center">
          <button disabled class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-xl text-[12px] text-chalk-muted dark:text-[#6A7FA0] opacity-40 flex items-center justify-center bg-transparent cursor-not-allowed"><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
          <button class="pgbtn active w-8 h-8 border rounded-xl text-[12px] flex items-center justify-center cursor-pointer">1</button>
          <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-xl text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt" onclick="changePage(2)">2</button>
          <button class="pgbtn w-8 h-8 border border-chalk-3 dark:border-white/[.1] rounded-xl text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:text-white flex items-center justify-center cursor-pointer bg-transparent tt" onclick="changePage(3)">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div> -->
    </section>

    <!-- ══════ PAGINATION ══════ -->
   <div class="mt-10 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <!-- Per-page -->
      <div class="flex items-center gap-2 text-[13px] text-chalk-muted dark:text-[#6A7FA0]">
        <span class="hidden sm:inline">Show</span>
        <select class="bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt">
          <option>5 per page</option>
          <option selected>10 per page</option>
          <option>20 per page</option>
        </select>
        <span class="hidden sm:inline text-[12px]">· Showing 1–6 of 6 viewings</span>
      </div>

      <!-- Page numbers -->
      <div class="flex items-center gap-1.5">
        <button class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Prev
        </button>
        <button class="pgbtn active w-9 h-9 rounded-xl text-[13px] border border-navy-dark cursor-pointer">1</button>
        <button class="pgbtn w-9 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 text-[13px] hover:border-navy-dark dark:hover:border-white/40 tt bg-transparent cursor-pointer">2</button>
        <button class="pgbtn w-9 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 text-[13px] hover:border-navy-dark dark:hover:border-white/40 tt bg-transparent cursor-pointer">3</button>
        <button class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer">
          Next<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>

      <!-- Jump to -->
      <div class="hidden sm:flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
        Go to
        <input type="number" min="1" max="3" value="1" class="w-14 bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 outline-none text-center tt focus:border-blue-link">
        of 3
      </div>
    </div>
  </div>

  </div><!-- /body -->

   
    </main>

</div>

<style>
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .52s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.29s}
    .d7{animation-delay:.34s}.d8{animation-delay:.39s}
    @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
    .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
    
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* review card hover */
    .rcard{transition:transform .22s,box-shadow .22s,border-color .2s}
    .rcard:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(10,36,99,.09)}
    .dark .rcard:hover{box-shadow:0 10px 32px rgba(0,0,0,.4)}
    
    /* group-rule */
    .group-rule{flex:1;height:1px;background:var(--ruler)}
    :root{--ruler:#EDE7DC}
    .dark, :global([data-theme="dark"]){
        --ruler:rgba(255,255,255,.08);
    }
    
    /* filter tab */
    .ftab{font-size:13px;font-weight:400;padding:7px 16px;border-radius:9px;border:none;cursor:pointer;font-family:'DM Sans',sans-serif;background:transparent;color:#8C8070;transition:background .18s,color .18s,box-shadow .18s;white-space:nowrap}
    .ftab.active{background:white;color:#0A2463;box-shadow:0 1px 4px rgba(10,36,99,.12);font-weight:500}
    .dark .ftab,
    :global([data-theme="dark"]) .ftab{color:#6A7FA0}
    .dark .ftab.active,
    :global([data-theme="dark"]) .ftab.active{background:#131C2E;color:#E8EDF5}
    
    /* star interactive */
    .star-i{font-size:22px;cursor:pointer;color:#D8CEBC;transition:color .15s;line-height:1;user-select:none}
    .dark .star-i{color:rgba(255,255,255,.18)}
    .star-i.lit{color:#D4AE3A}
    .star-i:hover,.star-i:hover ~ .star-i{color:#D8CEBC}
    
    /* star display */
    .star-d{font-size:13px;color:#D4AE3A;line-height:1}
    .star-d.empty{color:#D8CEBC}
    .dark .star-d.empty{color:rgba(255,255,255,.18)}
    
    /* quick tag */
    .qtag{font-size:11px;font-weight:500;padding:5px 12px;border-radius:20px;border:1.5px solid #EDE7DC;color:#8C8070;background:transparent;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .18s;white-space:nowrap}
    .dark .qtag,
    :global([data-theme="dark"]) .qtag{border-color:rgba(255,255,255,.1);color:#6A7FA0}
    .qtag.active{border-color:#4A90E2;background:rgba(74,144,226,.09);color:#0A2463}
    .dark .qtag.active,
    :global([data-theme="dark"]) .qtag.active{color:#4A90E2;background:rgba(74,144,226,.12)}
    .qtag:not(.active):hover{border-color:#8C8070;color:#0A2463}
    .dark .qtag:not(.active):hover,
    :global([data-theme="dark"]) .qtag:not(.active):hover{border-color:rgba(255,255,255,.25);color:#E8EDF5}
    
    /* modal */
    #reviewModal{display:none}
    #reviewModal.open{display:flex}
    
    /* page num active */
    .pgbtn.active{background:#0A2463;color:white;border-color:#0A2463}
    .dark .pgbtn.active{background:#4A90E2;border-color:#4A90E2}
    
    /* pending card accent border */
    .pending-accent{border-left:3px solid #C06035!important}
    
    /* building illustration */
    .prop-sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
    .prop-sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
    .prop-sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 40%,#1F3F6A 100%)}
    .prop-sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
    .pb{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0}
    .pw{position:absolute;background:rgba(212,174,58,.68);border-radius:2px}
</style>