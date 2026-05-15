<script lang="ts">
  import { goto } from "$app/navigation";
import BookingCard from "$lib/components/property-detail/BookingCard.svelte";

type ViewingType = 'in_person' | 'virtual';

let isReportModalOpen = $state(false);
let isLightboxOpen = $state(false);
let isFavourite = $state(false);
let readMore = $state(false);
let rating = $state(0);
let selectedPlan = $state(null);
let showVideo = $state(false);
let selectedViewingType = $state<ViewingType>('in_person')

const setViewingType = (type: ViewingType) => selectedViewingType = type;

const shareProperty = () => {}

const toggleShowVideo = () => showVideo = !showVideo

const setSelectedPlan = (plan: any) => selectedPlan = plan;

const setRating = (rate: number) => rating = rate;

const toggleReadMore = () => readMore = !readMore;

const toggleFavourite = () => isFavourite = !isFavourite;

const virtualBtnFocus = () => {
  setViewingType('virtual');
  goto('/site/properties/12#v-virtual-btn');
}

const openLightboxModal = () => {
  isLightboxOpen = true;
}

const closeLightboxModal = () => {
  isLightboxOpen = false;
}

const openReportModal = () => {
  isReportModalOpen = true;
}

const closeReportModal = () => {
  isReportModalOpen = false;
}
</script>


{#if isReportModalOpen}
<!-- ════════════ REPORT MODAL ════════════ -->
<div id="reportModal" class="fixed inset-0 z-[600] bg-navy-deep/65 backdrop-blur-sm items-center justify-center p-4 flex">
  <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-7 w-full max-w-[440px] relative shadow-[0_24px_72px_rgba(10,36,99,.25)] tt">
    <button aria-label="Close report modal" onclick={closeReportModal} class="absolute top-4 right-4 w-8 h-8 rounded-full bg-chalk-2 dark:bg-white/[.08] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center cursor-pointer tt hover:bg-chalk-3">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <div id="reportFormView">
      <h3 class="font-display text-[24px] font-light text-navy-dark dark:text-blue-100 mb-1">Report this listing</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-5 leading-[1.7]">Reports are reviewed within 24 hours and treated confidentially.</p>
      <label for="reportReason" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Reason <span class="text-ember">*</span></label>
      <div class="relative mb-4">
        <select id="reportReason" class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none cursor-pointer tt pr-8">
          <option value="">Select a reason…</option>
          <option>Property does not exist</option><option>Misleading information</option>
          <option>Fraudulent listing</option><option>Duplicate listing</option>
          <option>Inappropriate content</option><option>Wrong price</option>
          <option>Unresponsive / fraudulent agent</option><option>Other</option>
        </select>
        <svg class="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-chalk-muted dark:text-[#6A7FA0]" width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <label for="reportText" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Details <span class="text-ember">*</span></label>
      <textarea id="reportText" maxlength="1000"
        class="w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-3 text-[13px] text-navy-dark dark:text-blue-100 outline-none resize-none h-24 leading-relaxed mb-1 tt focus:border-blue-link placeholder-chalk-muted dark:placeholder-[#6A7FA0]"
        placeholder="Describe the issue in detail…"></textarea>
      <div id="reportCC" class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] text-right mb-5">0/1000</div>
      <div class="flex gap-3">
        <button onclick={closeReportModal} class="flex-1 bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] text-chalk-muted dark:text-[#6A7FA0] rounded-full py-3 text-[13px] cursor-pointer hover:bg-chalk-3 tt">Cancel</button>
        <button onclick={() => {}} class="flex-[2] bg-ember hover:bg-ember-deep text-white rounded-full py-3 text-[13px] font-medium cursor-pointer border-none tt">Submit report</button>
      </div>
    </div>
    <div id="reportSuccessView" class="hidden text-center py-4">
      <div class="w-14 h-14 rounded-full bg-sage-light dark:bg-sage/20 flex items-center justify-center mx-auto mb-4"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-9" stroke="#4A7848" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
      <h3 class="font-display text-[22px] font-light text-navy-dark dark:text-blue-100 mb-2">Report submitted</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-5">Thank you for helping keep Blupodd trustworthy.</p>
      <button onclick={closeReportModal} class="bg-navy-dark hover:bg-navy-mid text-white rounded-full px-8 py-2.5 text-[13px] font-medium cursor-pointer border-none tt">Close</button>
    </div>
  </div>
</div>
{/if}

{#if isLightboxOpen}
<!-- ════════════ LIGHTBOX MODAL ════════════ -->
<div id="lightboxModal" class="fixed inset-0 z-[600] bg-navy-deep/90 backdrop-blur-md items-center justify-center p-4 flex" onclick={closeLightboxModal}>
  <div class="w-full max-w-4xl relative" onclick={(e) => e.stopPropagation()}>
    <button onclick={closeLightboxModal} class="absolute -top-4 -right-3 z-10 w-9 h-9 rounded-full bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] flex items-center justify-center cursor-pointer shadow-lg">
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    </button>
    <!-- Gallery counter + scene -->
    <div class="bg-gradient-to-br from-[#0E2444] via-[#1F3F6A] to-[#4A70A0] rounded-2xl overflow-hidden relative" style="height:520px">
      <div class="absolute bottom-0 left-[100px] w-[200px] h-[310px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[240px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[240px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[200px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[200px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[160px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[160px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[120px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[120px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-0 left-[360px] w-[130px] h-[230px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[185px] left-[374px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[185px] left-[400px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[152px] left-[374px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[152px] left-[400px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[119px] left-[374px] w-[18px] h-[22px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-0 left-[540px] w-[90px] h-[150px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[112px] left-[552px] w-[14px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[112px] left-[574px] w-[14px] h-[17px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <!-- Hero overlay grad -->
      <div class="absolute inset-0 hero-grad pointer-events-none"></div>
      <div class="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        <div class="w-2 h-2 rounded-full bg-white"></div>
        <div class="w-2 h-2 rounded-full bg-white/35"></div>
        <div class="w-2 h-2 rounded-full bg-white/35"></div>
      </div>
      <div class="absolute bottom-4 right-5 text-[12px] font-medium text-white bg-navy-deep/60 backdrop-blur-sm px-3 py-1 rounded-full">1 / 12</div>
    </div>
    <!-- Thumbnails strip -->
    <div class="flex gap-2 mt-3 overflow-x-auto scrollbar-hide pb-1">
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#0E2444] via-[#1F3F6A] to-[#4A70A0] border-2 border-blue-bright cursor-pointer"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#1F3F6A] via-[#4A70A0] to-[#8DAACC] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#0A2463] via-[#0E2444] to-[#1F3F6A] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#060E1C] via-[#0A2463] to-[#1F3F6A] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
      <div class="h-16 w-24 flex-shrink-0 rounded-xl bg-gradient-to-br from-[#1A2E50] via-[#2E5078] to-[#5E8AB0] border-2 border-transparent cursor-pointer hover:border-blue-bright/50 tt"></div>
    </div>
  </div>
</div>
{/if}

<!-- TOAST -->
<div id="toast" class="fixed bottom-24 left-1/2 -translate-x-1/2 z-[500] bg-navy-dark dark:bg-[#1A2438] text-white text-[13px] font-medium px-5 py-3 rounded-full shadow-[0_8px_32px_rgba(10,36,99,.25)] flex items-center gap-2.5 opacity-0" style="transform:translateX(-50%) translateY(20px);transition:opacity .28s,transform .28s"></div>

<div style="margin-top:68px">

<!-- ════════════ BREADCRUMB ════════════ -->
<div class="bg-chalk-2 dark:bg-[#111826] border-b border-chalk-3 dark:border-white/[.08] px-[5vw] py-3 tt">
  <div class="max-w-[1320px] mx-auto flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex-wrap">
    <a href="/" class="no-underline hover:text-navy-dark dark:hover:text-white tt text-chalk-muted dark:text-[#6A7FA0]">Home</a>
    <span class="text-chalk-4 dark:text-white/20">/</span>
    <a href="/site/properties" class="no-underline hover:text-navy-dark dark:hover:text-white tt text-chalk-muted dark:text-[#6A7FA0]">Properties</a>
    <span class="text-chalk-4 dark:text-white/20">/</span>
    <span class="text-navy-dark dark:text-blue-100">3-Bed Apartment · GRA Phase 2</span>
  </div>
</div>

<!-- ════════════════════════════════════
     IMAGE GALLERY — MOSAIC GRID
════════════════════════════════════ -->
<div class="max-w-[1320px] mx-auto px-[5vw] pt-6 pb-2">
  <div class="gallery-grid grid gap-2.5 rounded-2xl overflow-hidden" style="grid-template-columns:2fr 1fr;grid-template-rows:296px 180px">

    <!-- MAIN image: 2 rows -->
    <div class="row-span-2 relative bg-gradient-to-br from-[#0E2444] via-[#1F3F6A] to-[#4A70A0] overflow-hidden cursor-pointer group" onclick={openLightboxModal}>
      <!-- Building scene -->
      <div class="absolute bottom-0 left-[100px] w-[200px] h-[320px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[248px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[248px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[208px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[208px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[168px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[168px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[128px] left-[118px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[128px] left-[150px] w-[22px] h-[28px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-0 left-[370px] w-[110px] h-[200px] bg-white/[0.12] rounded-t"></div>
      <div class="absolute bottom-[165px] left-[382px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[165px] left-[404px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[135px] left-[382px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[135px] left-[404px] w-[15px] h-[19px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <!-- Gradient overlay -->
      <div class="absolute inset-0 hero-grad pointer-events-none"></div>
      <!-- Hover zoom effect -->
      <div class="absolute inset-0 bg-navy-deep/0 group-hover:bg-navy-deep/15 transition-colors duration-300"></div>
      <!-- Bottom tags -->
      <div class="absolute bottom-5 left-5 flex gap-2 flex-wrap">
        <span class="text-[10px] font-semibold tracking-[.1em] uppercase px-3 py-1 rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
        <span class="text-[9px] font-semibold tracking-[.1em] uppercase px-[9px] py-1 rounded-full bg-gold text-navy-deep flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-navy-mid"></span>Boosted</span>
        <span class="text-[10px] font-semibold tracking-[.1em] uppercase px-3 py-1 rounded-full bg-sage text-white flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-white/60 pulse-dot"></span>Virtual tour</span>
      </div>
      <!-- All photos btn -->
      <button onclick={(e) => { 
          e.stopPropagation();
          openLightboxModal();
        } } 
       class="absolute top-5 right-5 flex items-center gap-2 text-[12px] font-medium text-white bg-navy-deep/70 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full hover:bg-navy-deep/90 tt cursor-pointer">
        <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="5.5" height="5.5" rx="1" stroke="white" stroke-width="1.3"/><rect x="9.5" y="1" width="5.5" height="5.5" rx="1" stroke="white" stroke-width="1.3"/><rect x="1" y="9.5" width="5.5" height="5.5" rx="1" stroke="white" stroke-width="1.3"/><rect x="9.5" y="9.5" width="5.5" height="5.5" rx="1" stroke="white" stroke-width="1.3"/></svg>
        All 12 photos
      </button>
    </div>

    <!-- Thumb 1 -->
    <div class="gallery-thumb-col relative bg-gradient-to-br from-[#1F3F6A] via-[#4A70A0] to-[#8DAACC] overflow-hidden cursor-pointer gallery-thumb rounded-tr-2xl" onclick={openLightboxModal}>
      <div class="absolute bottom-0 left-[40px] w-[80px] h-[120px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[92px] left-[50px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[92px] left-[68px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[68px] left-[50px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[68px] left-[68px] w-[12px] h-[15px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute inset-0 bg-navy-deep/0 hover:bg-navy-deep/20 transition-colors duration-250"></div>
    </div>

    <!-- Thumb 2 — +9 more overlay -->
    <div class="gallery-thumb-col relative bg-gradient-to-br from-[#0A2463] via-[#0E2444] to-[#1F3F6A] overflow-hidden cursor-pointer gallery-thumb rounded-br-2xl" onclick={openLightboxModal}>
      <div class="absolute bottom-0 left-[36px] w-[68px] h-[90px] bg-white/[0.13] rounded-t"></div>
      <div class="absolute bottom-[64px] left-[44px] w-[10px] h-[13px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <div class="absolute bottom-[64px] left-[60px] w-[10px] h-[13px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
      <!-- +9 overlay -->
      <div class="absolute inset-0 bg-navy-deep/60 flex items-center justify-center">
        <div class="text-center">
          <div class="font-display text-[28px] font-semibold text-white leading-none">+9</div>
          <div class="text-[11px] font-light text-white/65 mt-1">more photos</div>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- ════════════════════════════════════
     MAIN CONTENT GRID
════════════════════════════════════ -->
<div class="max-w-[1320px] mx-auto px-[5vw] pb-20 pt-7">
  <div class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">

    <!-- ───────────── LEFT COLUMN ───────────── -->
    <div class="space-y-6">

      <!-- ══ PROPERTY HEADER CARD ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-6 tt shadow-[0_2px_18px_rgba(10,36,99,.05)] fu d1">

        <!-- Top action row -->
        <div class="flex items-center justify-between mb-5 flex-wrap gap-3">
          <div class="flex gap-2 flex-wrap">
            <span class="text-[11px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] px-3 py-1.5 rounded-full tt">Ref: BLU-PH-2024-0421</span>
            <span class="text-[11px] font-medium text-sage dark:text-[#7DBF7A] bg-sage-light dark:bg-sage/15 border border-sage/20 px-3 py-1.5 rounded-full flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>Available now</span>
          </div>
          <div class="flex gap-2">
            <button id="favBtn" onclick={toggleFavourite} class="w-9 h-9 rounded-full border border-chalk-3 dark:border-white/[.1] flex items-center justify-center cursor-pointer hover:border-rose-400 hover:text-rose-400 tt bg-transparent text-chalk-muted dark:text-[#6A7FA0]" title="Save property">
            {#if isFavourite}
              <svg id="heartIcon" width="15" height="15" viewBox="0 0 20 20" fill="#E53E3E" stroke="#E53E3E" stroke-width="1.5">
                <path d="M10 17C10 17 2 12 2 6.5A4.5 4.5 0 0110 3.5 4.5 4.5 0 0118 6.5C18 12 10 17 10 17z" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" />
              </svg>
            {:else}
              <svg id="heartIcon" width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M10 17C10 17 2 12 2 6.5A4.5 4.5 0 0110 3.5 4.5 4.5 0 0118 6.5C18 12 10 17 10 17z" 
                  stroke-linecap="round" 
                  stroke-linejoin="round" />
              </svg>
            {/if}
            </button>
            <button onclick={shareProperty} class="w-9 h-9 rounded-full border border-chalk-3 dark:border-white/[.1] flex items-center justify-center cursor-pointer hover:border-navy-dark hover:text-navy-dark dark:hover:text-white tt bg-transparent text-chalk-muted dark:text-[#6A7FA0]" title="Share">
              <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="15" cy="4" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="5" cy="10" r="2" stroke="currentColor" stroke-width="1.4"/><circle cx="15" cy="16" r="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 9l6-3.5M7 11l6 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            </button>
            <button onclick={openReportModal} class="flex items-center gap-1.5 text-[12px] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-ember hover:text-ember px-3 py-1.5 rounded-full cursor-pointer bg-transparent tt">
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v4M8 10.5h.01" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              Report
            </button>
          </div>
        </div>

        <!-- Price + Title -->
        <div class="mb-4">
          <div class="font-display text-[clamp(28px,4vw,40px)] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">
            ₦850,000 <span class="text-[16px] font-light text-chalk-muted dark:text-[#6A7FA0]">/ month</span>
          </div>
          <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">≈ ₦10.2M per annum · Agency fee 10% · Service charge ₦80k/yr</div>
          <h1 class="font-display text-[clamp(20px,2.5vw,28px)] font-light text-navy-dark dark:text-blue-100 leading-[1.2] mb-2">
            Spacious 3-Bedroom Apartment with Pool &amp; Gym, GRA Phase 2
          </h1>
          <div class="flex items-center gap-2 text-[13px] text-chalk-muted dark:text-[#6A7FA0]">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 015 5c0 4.5-5 9-5 9S3 10.5 3 6a5 5 0 015-5z" stroke="#4A90E2" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8" cy="6" r="2" stroke="#4A90E2" stroke-width="1.4"/></svg>
            GRA Phase 2, Port Harcourt, Rivers State
          </div>
        </div>

        <!-- Key stats chips -->
        <div class="flex gap-3 flex-wrap pt-4 border-t border-chalk-3 dark:border-white/[.08]">
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><rect x="2" y="9" width="16" height="9" rx="1.5"/><path d="M6 9V7a4 4 0 018 0v2"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">3 beds</span>
          </div>
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M2 11h16M2 11v4a1 1 0 001 1h14a1 1 0 001-1v-4M18 11V7a3 3 0 00-6 0v4"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">2 baths</span>
          </div>
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><rect x="2" y="2" width="16" height="16" rx="1.5"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">115 m²</span>
          </div>
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M3 5h14a1 1 0 011 1v8a1 1 0 01-1 1H3a1 1 0 01-1-1V6a1 1 0 011-1z"/><path d="M1 9h18"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">4th floor</span>
          </div>
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M3 8l7-5 7 5v8a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"/><path d="M7 18V11h6v7"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Apartment</span>
          </div>
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke-linejoin="round"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">4.7 rating</span>
          </div>
          <div class="flex items-center gap-2 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3 py-2 tt">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#D4AE3A" stroke-width="1.4"><path d="M4 15V7l6-4 6 4v8"/><path d="M8 15v-4h4v4"/></svg>
            <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Part furnished</span>
          </div>
        </div>
      </div>

      <!-- ══ DESCRIPTION ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d2">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center gap-2">
          <div class="section-dot"></div>
          <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">About this property</span>
        </div>
        <div class="p-6">
          <p class="text-[14px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.85] mb-3">
            A spacious and beautifully maintained 3-bedroom apartment on the 4th floor of a modern high-rise in GRA Phase 2, one of Port Harcourt's most sought-after residential neighbourhoods. The property features a large open-plan living and dining area with floor-to-ceiling windows offering panoramic city views, a fully fitted kitchen with granite worktops and integrated appliances, and three generously proportioned bedrooms.
          </p>
          {#if readMore}
          <p id="descMore" class="text-[14px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.85]">
            The master bedroom includes an en-suite bathroom and walk-in wardrobe. All bedrooms have fitted wardrobes and air conditioning. The living space opens onto a private balcony overlooking the well-maintained estate grounds. The development has 24-hour security, dedicated generator backup, two covered parking spaces, and an on-site facilities manager. Located minutes from the GRA interchange, major hospitals, and international schools. Available for immediate occupancy.
          </p>
          {/if}
          <button id="readMoreBtn" onclick={toggleReadMore} class="text-[13px] font-medium text-blue-link hover:text-navy-dark dark:hover:text-blue-bright tt cursor-pointer mt-1 bg-transparent border-none font-sans">{readMore ? "← Read less" : "Read more →"}</button>
        </div>
      </div>

      <!-- ══ AMENITIES ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d2">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center gap-2">
          <div class="section-dot"></div>
          <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Features &amp; amenities</span>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            <!-- Amenity chips — richer UI -->
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><circle cx="10" cy="13" r="4"/><path d="M6 6l1 2M14 6l-1 2M10 2v2"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Swimming pool</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M4 4h12M4 10h3M13 10h3M4 16h12M7 4v12M13 4v12"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Gym / fitness</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M3 7l7-4 7 4v8a1 1 0 01-1 1H4a1 1 0 01-1-1V7z"/><path d="M8 18V11h4v7"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">24-hr security</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="12" width="16" height="6" rx="1.5"/><path d="M5 12V8a5 5 0 0110 0v4"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">CCTV cameras</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M2 10h3l2-7 3 14 2-9 2 4h4"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Full generator</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="2" width="5" height="16" rx="1"/><rect x="13" y="2" width="5" height="16" rx="1"/><path d="M7 6h6M7 10h6M7 14h6"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">2 parking spaces</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M5 12.55a11 11 0 0110 0M2 10a14 14 0 0116 0M8 15.55a5 5 0 014 0M11 18h.01"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">High-speed Wi-Fi</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M8 2l4 4-4 4M12 14H2M18 2v16"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Private balcony</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><rect x="3" y="3" width="14" height="14" rx="2"/><path d="M10 7v6M7 10h6"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Elevator access</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M3 6h14M3 10h14M3 14h8"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Open-plan kitchen</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M5 8V4a2 2 0 014 0v4M11 8V4a2 2 0 014 0v4M2 8h16v10H2z"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Air conditioning</span>
            </div>
            <div class="am-chip flex items-center gap-2.5 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-3.5 py-3 tt cursor-default">
              <svg width="15" height="15" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round"><path d="M4 4h12v12H4z"/><path d="M8 4v12M12 4v12M4 8h12M4 12h12"/></svg>
              <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Water treatment</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ PROPERTY DETAILS TABLE ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d3">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center gap-2">
          <div class="section-dot"></div>
          <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Property details</span>
        </div>
        <div class="p-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 detail-grid gap-0">
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Reference</span><span class="font-medium text-navy-dark dark:text-blue-100">BLU-PH-2024-0421</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Listing type</span><span class="font-medium text-navy-dark dark:text-blue-100">For Rent</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Property type</span><span class="font-medium text-navy-dark dark:text-blue-100">Apartment / Flat</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Bedrooms</span><span class="font-medium text-navy-dark dark:text-blue-100">3</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Bathrooms</span><span class="font-medium text-navy-dark dark:text-blue-100">2 (1 en-suite)</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Floor area</span><span class="font-medium text-navy-dark dark:text-blue-100">115 m²</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Floor level</span><span class="font-medium text-navy-dark dark:text-blue-100">4th floor</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Furnishing</span><span class="font-medium text-navy-dark dark:text-blue-100">Part-furnished</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Kitchen</span><span class="font-medium text-navy-dark dark:text-blue-100">Open plan</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Parking</span><span class="font-medium text-navy-dark dark:text-blue-100">2 covered spaces</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Service charge</span><span class="font-medium text-navy-dark dark:text-blue-100">₦80,000 / yr</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Legal fee</span><span class="font-medium text-navy-dark dark:text-blue-100">₦50,000 (one-time)</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] border-b border-chalk-3 dark:border-white/[.07] text-[13px] sm:pr-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Agency fee</span><span class="font-medium text-navy-dark dark:text-blue-100">10% annual rent</span></div>
            <div class="detail-row flex justify-between items-baseline py-[9px] text-[13px] sm:pl-6"><span class="font-light text-chalk-muted dark:text-[#6A7FA0]">Available from</span><span class="font-medium text-sage dark:text-[#7DBF7A]">Immediately</span></div>
          </div>
        </div>
      </div>

       <!-- ══ VIDEO ══ -->
       <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d2">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center gap-2">
          <div class="section-dot"></div>
          <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">VIDEO</span>
        </div>
        <div class="pt-4 px-2">
          <div class="video-wrap relative" style="padding-bottom:56.25%">
            <div class="absolute inset-0 flex flex-col items-center justify-center gap-4" style="background:linear-gradient(160deg,#0A2463 0%,#1F3F6A 60%,#4A70A0 100%)">
              <button aria-label="Play video" id="playBtn" onclick={toggleShowVideo} class="w-16 h-16 rounded-full bg-white/15 border-2 border-white/40 flex items-center justify-center cursor-pointer tt hover:bg-white/25 hover:scale-105 transition-all">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z"></path></svg>
              </button>
              <div class="text-13px font-light text-white/60">Property walkthrough · 3:47</div>
              <div class="text-11px text-white/35">Click to play</div>
            </div>
            {#if showVideo}
            <div id="videoEmbed" class="absolute inset-0">
              <iframe title="Property video" src="https://www.youtube.com/embed/2O7K-8G2nwU?autoplay=1" 
                allow="autoplay;fullscreen" 
                allowfullscreen 
                class="absolute inset-0 w-full h-full">
              </iframe>
            </div>
            {/if}
          </div>
          <div class="px-5 py-4 border-t border-chalk-3 dark:border-white/[0.08] flex items-center gap-3">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="7" width="12" height="10" rx="2" stroke="#4A90E2" stroke-width="1.4"></rect><path d="M14 11l5-3v8l-5-3"></path></svg>
            <span class="text-12px text-chalk-muted dark:text-[#6A7FA0]">Full property walkthrough · GRA Phase 2, Port Harcourt</span>
          </div>
        </div>
      </div>

      <!-- ══ VIRTUAL VIEWING ══ -->
      <div class="bg-gradient-to-br from-navy-mid to-navy-strong border border-white/[.1] rounded-2xl overflow-hidden shadow-[0_8px_32px_rgba(10,36,99,.18)] fu d3">
        <div class="p-6">
          <div class="flex items-start gap-4 flex-wrap">
            <div class="w-12 h-12 rounded-2xl bg-sage/25 border border-sage/30 flex items-center justify-center flex-shrink-0 vt-pulse">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7DBF7A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.261a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
            </div>
            <div class="flex-1 min-w-[200px]">
              <div class="flex items-center gap-2 mb-1">
                <span class="text-[15px] font-medium text-white">Virtual tour available</span>
                <span class="text-[9px] font-semibold uppercase tracking-[.1em] bg-sage/30 text-[#7DBF7A] px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-[#7DBF7A] pulse-dot"></span>Live</span>
              </div>
              <p class="text-[13px] font-light text-white/60 leading-[1.6] mb-4">Book a live video walkthrough with the agent — from anywhere in the world. No travel needed. Diaspora-friendly.</p>
              <div class="flex gap-3 flex-wrap">
                <button onclick={virtualBtnFocus} class="flex items-center gap-2 text-[13px] font-medium text-white bg-sage hover:bg-[#3d6337] px-5 py-2.5 rounded-full border-none cursor-pointer tt">
                  <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4h9a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1zM13 7l3-2v6l-3-2V7z"/></svg>
                  Book virtual tour
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ MAP ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d4">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="section-dot"></div>
            <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Location</span>
          </div>
          <a href="https://maps.google.com/?q=4.8156,7.0498" target="_blank" rel="noopener" class="text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">Open in Google Maps →</a>
        </div>
        <div class="p-4">
          <div id="map" class="border border-chalk-3 dark:border-white/[.08]">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.02908313926!2d7.520785275907154!3d6.518002573225329!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1044a355c1df2061%3A0xe7f931dbbc652522!2sAbakpa%20Nike%20400103%2C%20Enugu%2C%20Nigeria!5e0!3m2!1sen!2suk!4v1778232094727!5m2!1sen!2suk" style="border:0;width:100%;height:100%" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
          <!-- Nearby -->
          <div class="grid grid-cols-2 gap-3 mt-4">
            <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl px-4 py-3 tt">
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.07em] mb-1">Nearest school</div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">GRA International <span class="text-[11px] font-light text-chalk-muted dark:text-[#6A7FA0]">· 0.4 km</span></div>
            </div>
            <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl px-4 py-3 tt">
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.07em] mb-1">Nearest hospital</div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">BMH Port Harcourt <span class="text-[11px] font-light text-chalk-muted dark:text-[#6A7FA0]">· 1.2 km</span></div>
            </div>
            <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl px-4 py-3 tt">
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.07em] mb-1">Shopping</div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">GRA Shopping Mall <span class="text-[11px] font-light text-chalk-muted dark:text-[#6A7FA0]">· 0.8 km</span></div>
            </div>
            <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl px-4 py-3 tt">
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.07em] mb-1">Airport</div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">PH Int'l Airport <span class="text-[11px] font-light text-chalk-muted dark:text-[#6A7FA0]">· 22 km</span></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ ARCHITECTURAL PLANS ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d2">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center gap-2">
          <div class="section-dot"></div>
          <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">ARCHITECTURAL PLANS</span>
        </div>
        <div class="p-6">
          <div id="planMain" class="rounded-xl overflow-hidden mb-4 relative" style="height:280px;background:linear-gradient(135deg,#F7F3EC 0%,#EDE7DC 100%)">
            <div class="absolute inset-0 flex items-center justify-center">
              <!-- Floor plan SVG illustration -->
              <img src="https://blupodd.sirv.com/uploads/plans/plan_1.jpeg" 
                class="w-full h-full object-cover" 
                alt="plan_image" 
              />
            </div>
            <div class="absolute top-3 right-3 flex gap-2">
              <button class="text-11px font-medium text-navy-dark dark:text-blue-100 bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] px-3 py-1.5 rounded-lg cursor-pointer tt hover:border-navy-dark dark:hover:border-blue-bright">Zoom in</button>
              <button class="text-11px font-medium text-navy-dark dark:text-blue-100 bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] px-3 py-1.5 rounded-lg cursor-pointer tt hover:border-navy-dark dark:hover:border-blue-bright">Download</button>
            </div>
          </div>

          <!-- PLAN THUMBNAILS -->
          <div class="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            <button type="button" class="plan-thumb active" onclick={() => setSelectedPlan(0)} style="background:linear-gradient(135deg,#F7F3EC,#EDE7DC)">
              <div class="w-full h-full flex items-center justify-center text-10px text-navy-accent font-medium">
              <img src="https://blupodd.sirv.com/uploads/plans/plan_1.jpeg" 
                class="w-full h-full object-cover" 
                alt="plan_image" 
              />
              </div>
            </button>
            <button type="button" class="plan-thumb" onclick={() => setSelectedPlan(1)} style="background:linear-gradient(135deg,#EDE7DC,#D8CEBC)">
              <div class="w-full h-full flex items-center justify-center text-10px text-navy-accent font-medium">
              <img src="https://blupodd.sirv.com/uploads/plans/plan_2.png" 
                class="w-full h-full object-cover" 
                alt="plan_image" 
              />
              </div>
            </button>
            <button type="button" class="plan-thumb" onclick={() => setSelectedPlan(2)} style="background:linear-gradient(135deg,#F7F3EC,#EDE7DC)">
              <div class="w-full h-full flex items-center justify-center text-10px text-navy-accent font-medium">
              <img src="https://blupodd.sirv.com/uploads/plans/plan_3.jpeg" 
                class="w-full h-full object-cover" 
                alt="plan_image" 
              />
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- ══ RATINGS & REVIEWS ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_18px_rgba(10,36,99,.04)] fu d4">
        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="section-dot"></div>
            <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Ratings &amp; reviews</span>
          </div>
          <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">47 verified reviews</span>
        </div>

        <!-- Rating summary -->
        <div class="flex flex-wrap gap-6 items-center p-6 border-b border-chalk-3 dark:border-white/[.08]">
          <div class="text-center flex-shrink-0">
            <div class="font-display text-[56px] font-semibold text-navy-dark dark:text-blue-100 leading-none">4.7</div>
            <div class="flex gap-1 justify-center mt-2 mb-1">
              <div class="w-3.5 h-3.5 rounded-full bg-gold"></div><div class="w-3.5 h-3.5 rounded-full bg-gold"></div><div class="w-3.5 h-3.5 rounded-full bg-gold"></div><div class="w-3.5 h-3.5 rounded-full bg-gold"></div>
              <div class="w-3.5 h-3.5 rounded-full overflow-hidden" style="background:linear-gradient(90deg,#D4AE3A 70%,#EDE7DC 70%)"></div>
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">47 reviews</div>
          </div>
          <div class="flex-1 min-w-[160px] space-y-2">
            <div class="flex items-center gap-2"><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-3 text-right">5</span><div class="flex-1 rating-bar h-1.5 rounded-full overflow-hidden"><div class="h-full rounded-full bg-gold" style="width:72%"></div></div><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-6">34</span></div>
            <div class="flex items-center gap-2"><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-3 text-right">4</span><div class="flex-1 rating-bar h-1.5 rounded-full overflow-hidden"><div class="h-full rounded-full bg-gold" style="width:17%"></div></div><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-6">8</span></div>
            <div class="flex items-center gap-2"><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-3 text-right">3</span><div class="flex-1 rating-bar h-1.5 rounded-full overflow-hidden"><div class="h-full rounded-full bg-gold" style="width:6%"></div></div><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-6">3</span></div>
            <div class="flex items-center gap-2"><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-3 text-right">2</span><div class="flex-1 rating-bar h-1.5 rounded-full overflow-hidden"><div class="h-full rounded-full bg-gold" style="width:2%"></div></div><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-6">1</span></div>
            <div class="flex items-center gap-2"><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-3 text-right">1</span><div class="flex-1 rating-bar h-1.5 rounded-full overflow-hidden"><div class="h-full rounded-full bg-gold" style="width:2%"></div></div><span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] w-6">1</span></div>
          </div>
          <div class="flex flex-wrap gap-2">
            <span class="text-[11px] px-3 py-1 rounded-full bg-chalk-2 dark:bg-white/[.06] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.08]">Great location</span>
            <span class="text-[11px] px-3 py-1 rounded-full bg-chalk-2 dark:bg-white/[.06] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.08]">Good security</span>
            <span class="text-[11px] px-3 py-1 rounded-full bg-chalk-2 dark:bg-white/[.06] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.08]">Well maintained</span>
            <span class="text-[11px] px-3 py-1 rounded-full bg-chalk-2 dark:bg-white/[.06] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.08]">Responsive agent</span>
            <span class="text-[11px] px-3 py-1 rounded-full bg-chalk-2 dark:bg-white/[.06] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.08]">Value for money</span>
          </div>
        </div>

        <!-- Write a review -->
        <div id="write-review" class="p-6 border-b border-chalk-3 dark:border-white/[.08] bg-gold/[.035] dark:bg-gold/[.04]">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><polygon points="8,1 10,6 15,6.5 11,10 12.5,15 8,12 3.5,15 5,10 1,6.5 6,6" stroke="#D4AE3A" stroke-width="1.2" fill="#D4AE3A"/></svg>
            </div>
            <span class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Rate this property</span>
            <span class="ml-auto text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Viewed 3 Mar 2026</span>
          </div>
          <div class="flex gap-2 mb-4">
            <button class="star-btn w-10 h-10 rounded-full border border-chalk-3 dark:border-white/10 bg-chalk-2 dark:bg-white/[.06] text-chalk-muted text-[16px] cursor-pointer hover:border-gold hover:bg-gold/10 hover:text-gold tt" data-val="1" onclick={() => setRating(1)}>★</button>
            <button class="star-btn w-10 h-10 rounded-full border border-chalk-3 dark:border-white/10 bg-chalk-2 dark:bg-white/[.06] text-chalk-muted text-[16px] cursor-pointer hover:border-gold hover:bg-gold/10 hover:text-gold tt" data-val="2" onclick={() => setRating(2)}>★</button>
            <button class="star-btn w-10 h-10 rounded-full border border-chalk-3 dark:border-white/10 bg-chalk-2 dark:bg-white/[.06] text-chalk-muted text-[16px] cursor-pointer hover:border-gold hover:bg-gold/10 hover:text-gold tt" data-val="3" onclick={() => setRating(3)}>★</button>
            <button class="star-btn w-10 h-10 rounded-full border border-chalk-3 dark:border-white/10 bg-chalk-2 dark:bg-white/[.06] text-chalk-muted text-[16px] cursor-pointer hover:border-gold hover:bg-gold/10 hover:text-gold tt" data-val="4" onclick={() => setRating(4)}>★</button>
            <button class="star-btn w-10 h-10 rounded-full border border-chalk-3 dark:border-white/10 bg-chalk-2 dark:bg-white/[.06] text-chalk-muted text-[16px] cursor-pointer hover:border-gold hover:bg-gold/10 hover:text-gold tt" data-val="5" onclick={() => setRating(5)}>★</button>
            <span id="ratingLabel" class="ml-2 self-center text-[12px] text-chalk-muted dark:text-[#6A7FA0]"></span>
          </div>
          <textarea id="reviewText" class="w-full bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-3 text-[13px] font-light text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none resize-none h-24 leading-relaxed tt focus:border-blue-link mb-3"
            placeholder="Share your experience — what did you love, what could be improved?"></textarea>
          <div class="flex items-center gap-3">
            <button onclick={() => {}} class="bg-navy-dark hover:bg-navy-mid text-white rounded-full px-6 py-2.5 text-[13px] font-medium cursor-pointer border-none tt">Submit review</button>
            <span id="reviewSuccess" class="hidden text-[12px] font-medium text-sage dark:text-[#7DBF7A]">✓ Review submitted — thank you!</span>
          </div>
        </div>

        <!-- Review items -->
        <div class="divide-y divide-chalk-3 dark:divide-white/[.08]">
          <div class="p-6">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-ember flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0">FA</div>
              <div class="flex-1 min-w-0">
                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Fatima Abubakar</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Booked a virtual tour</div>
                <div class="flex gap-1 mt-1.5"><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div></div>
              </div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">12 Feb 2026</div>
            </div>
            <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.75]">I viewed this apartment virtually from Abuja and was thoroughly impressed. The rooms are much larger than the photos suggest, and the estate feels very secure. The agent was incredibly responsive and had all documents ready. Would not hesitate to recommend.</p>
            <span class="inline-block mt-2.5 text-[10px] font-medium tracking-[.06em] uppercase px-2.5 py-[3px] rounded-full bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]">Virtual tour</span>
          </div>
          <div class="p-6">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-sage flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0">EO</div>
              <div class="flex-1 min-w-0">
                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Emeka Okafor</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">In-person viewing</div>
                <div class="flex gap-1 mt-1.5"><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-chalk-3 dark:bg-white/[.08]"></div></div>
              </div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">28 Jan 2026</div>
            </div>
            <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.75]">Great property in a superb location. GRA Phase 2 is one of the safest areas in PH and this building reflects that quality. Pool and gym are well maintained. Deducting one star because kitchen appliances were slightly dated — agent mentioned they'd be replaced. Very positive overall.</p>
          </div>
          <div class="p-6">
            <div class="flex items-start gap-3 mb-3">
              <div class="w-10 h-10 rounded-full bg-navy-strong flex items-center justify-center text-[13px] font-medium text-white flex-shrink-0">AK</div>
              <div class="flex-1 min-w-0">
                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Adaeze Kanu</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Diaspora buyer · UK</div>
                <div class="flex gap-1 mt-1.5"><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div><div class="w-[9px] h-[9px] rounded-full bg-gold"></div></div>
              </div>
              <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">15 Jan 2026</div>
            </div>
            <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.75]">Buying from the UK, the virtual tour was a lifesaver. The agent walked me through every room, answered all my questions, and had the documents ready immediately. The whole process was smooth. Highly recommend Blupodd for diaspora buyers.</p>
            <span class="inline-block mt-2.5 text-[10px] font-medium tracking-[.06em] uppercase px-2.5 py-[3px] rounded-full bg-blue-bright/10 text-blue-link dark:text-blue-bright">Diaspora buyer</span>
          </div>

          <!-- Reviews pagination -->
          <div class="flex items-center justify-center gap-1.5 p-4 border-t border-chalk-3 dark:border-white/[0.08]">
            <button class="flex items-center gap-1 px-3 h-8 rounded-lg border border-chalk-3 dark:border-white/10 text-[11px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 tt bg-transparent cursor-pointer"><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Prev</button>
            <button class="w-8 h-8 rounded-lg bg-navy-dark text-white text-[12px] border border-navy-dark cursor-pointer">1</button>
            <button class="w-8 h-8 rounded-lg border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark tt bg-transparent cursor-pointer">2</button>
            <button class="w-8 h-8 rounded-lg border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark tt bg-transparent cursor-pointer">3</button>
            <span class="text-chalk-muted dark:text-[#6A7FA0] text-[12px] px-1">…</span>
            <button class="w-8 h-8 rounded-lg border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark tt bg-transparent cursor-pointer">6</button>
            <button class="flex items-center gap-1 px-3 h-8 rounded-lg border border-chalk-3 dark:border-white/10 text-[11px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 tt bg-transparent cursor-pointer">Next<svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></button>
          </div>
        </div>
      </div>
    </div><!-- /left column -->

    <!-- ───────────── RIGHT COLUMN (SIDEBAR) ───────────── -->
    <div class="space-y-5 sticky-sidebar">
      <!-- ═══ BOOKING CARD — FULL INTERACTIVE FLOW ═══ -->
      <BookingCard type={selectedViewingType} />
      <!-- END BOOKING CARD -->

      <!-- === AGENT CARD === -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[0.08] rounded-2xl overflow-hidden tt">
        <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[0.08] flex items-center justify-between">
          <div class="text-13px font-medium text-navy-dark dark:text-blue-100">Listed by</div>
          <a href="/site/agents/c-estate-holdings" class="text-12px text-blue-link dark:text-blue-bright no-underline hover:text-navy-dark dark:hover:text-white tt">View profile →</a>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-3.5 mb-4">
            <div class="w-12 h-12 rounded-full bg-navy-strong flex items-center justify-center text-[16px] font-medium text-white flex-shrink-0">CO</div>
            <div>
              <div class="text-14px font-medium text-navy-dark dark:text-blue-100">Chukwuemeka Okafor</div>
              <div class="text-12px text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Premier Properties PH · Principal</div>
              <div class="flex items-center gap-3 mt-1.5 flex-wrap">
                <span class="text-[10px] font-medium uppercase tracking-[.07em] text-sage dark:text-[#7DBF7A]">✓ Identity verified</span>
                <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">·</span>
                <span class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]">Responds in &lt;1hr</span>
              </div>
            </div>
          </div>
          <div class="flex gap-4 mb-4 pb-4 border-b border-chalk-3 dark:border-white/[0.08]">
            <div class="text-center flex-1"><div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100">42</div><div class="text-11px text-chalk-muted dark:text-[#6A7FA0]">Listings</div></div>
            <div class="w-px bg-chalk-3 dark:bg-white/[0.08]"></div>
            <div class="text-center flex-1"><div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100">4.9</div><div class="text-11px text-chalk-muted dark:text-[#6A7FA0]">Rating</div></div>
            <div class="w-px bg-chalk-3 dark:bg-white/[0.08]"></div>
            <div class="text-center flex-1"><div class="font-display text-[22px] font-semibold text-navy-dark dark:text-blue-100">7yr</div><div class="text-11px text-chalk-muted dark:text-[#6A7FA0]">Experience</div></div>
          </div>
          <a href="https://wa.me/2348001234567" target="_blank" rel="noopener" class="flex items-center gap-3 p-3 rounded-xl border border-chalk-3 dark:border-white/[0.08] hover:border-navy-dark dark:hover:border-white/30 tt no-underline mb-2 group">
            <div class="w-8 h-8 rounded-lg bg-[#25D366] flex items-center justify-center flex-shrink-0"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"></path></svg></div>
            <div><span class="block text-13px font-medium text-navy-dark dark:text-blue-100">WhatsApp</span><span class="block text-11px text-chalk-muted dark:text-[#6A7FA0]">Chat instantly</span></div>
          </a>
          <a href="tel:+2348001234567" class="flex items-center gap-3 p-3 rounded-xl border border-chalk-3 dark:border-white/[0.08] hover:border-navy-dark dark:hover:border-white/30 tt no-underline">
            <div class="w-8 h-8 rounded-lg bg-navy-dark flex items-center justify-center flex-shrink-0"><svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 4a1 1 0 011-1h2.5a1 1 0 011 .75l.75 3a1 1 0 01-.3.97l-1.2 1.2a10.5 10.5 0 004.27 4.27l1.2-1.2a1 1 0 01.97-.3l3 .75A1 1 0 0117 13.5V16a1 1 0 01-1 1h-1C7.16 17 3 12.84 3 8V5a1 1 0 010-1z" stroke="white" stroke-width="1.4" stroke-linecap="round"></path></svg></div>
            <div><span class="block text-13px font-medium text-navy-dark dark:text-blue-100">Call agent</span><span class="block text-11px text-chalk-muted dark:text-[#6A7FA0]">+234 800 123 4567</span></div>
          </a>
        </div>
      </div>

      <!-- ══ MY NOTES (logged-in) ══ -->
      <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt shadow-[0_2px_14px_rgba(10,36,99,.05)] fu d3">
        <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[.08] flex items-center justify-between">
          <div class="flex items-center gap-2 text-[13px] font-medium text-navy-dark dark:text-blue-100">
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H7l-4 3V4z" stroke="#4A90E2" stroke-width="1.4" stroke-linejoin="round"/></svg>
            My notes
          </div>
          <span id="noteCountBadge" class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] px-2.5 py-[3px] rounded-full">2 notes</span>
        </div>
        <div class="p-4">
          <div id="notesList" class="space-y-2.5 mb-4">
            <div id="note-1" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-3 tt">
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] tracking-[.04em] mb-1.5">3 Mar 2026 · 14:22</div>
              <div class="text-[13px] font-light text-navy-dark dark:text-blue-100 leading-[1.65]">Great natural light in the master bedroom. Ask about repainting 2nd bedroom before move-in.</div>
              <button  class="text-[11px] text-ember hover:text-ember-deep mt-2 bg-transparent border-none cursor-pointer font-sans tt">Delete</button>
            </div>
            <div id="note-2" class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-3 tt">
              <div class="text-[10px] text-chalk-muted dark:text-[#6A7FA0] tracking-[.04em] mb-1.5">3 Mar 2026 · 15:08</div>
              <div class="text-[13px] font-light text-navy-dark dark:text-blue-100 leading-[1.65]">Service charge ₦80k/yr reasonable. Generator 10pm–6am. 2 parking confirmed. Ask if pool heated.</div>
              <button class="text-[11px] text-ember hover:text-ember-deep mt-2 bg-transparent border-none cursor-pointer font-sans tt">Delete</button>
            </div>
          </div>
          <div class="border-t border-chalk-3 dark:border-white/[.08] pt-4">
            <textarea id="newNoteInput" class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-3 text-[13px] font-light text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none resize-none h-20 leading-relaxed tt focus:border-blue-link mb-3"
              placeholder="Add a private note…"></textarea>
            <button onclick={() => {}} class="w-full bg-navy-dark hover:bg-navy-mid text-white rounded-full py-[10px] text-[13px] font-medium border-none cursor-pointer tt">Add note</button>
          </div>
        </div>
      </div>

      <!-- ══ DIASPORA BADGE ══ -->
      <div class="bg-gradient-to-br from-navy-mid to-navy-strong border border-white/[.08] rounded-2xl p-5 fu d4">
        <div class="flex items-start gap-3">
          <div class="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4AE3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a14 14 0 010 20M12 2a14 14 0 000 20"/></svg>
          </div>
          <div class="min-w-0">
            <div class="text-[13px] font-medium text-white mb-1">Diaspora-friendly listing</div>
            <p class="text-[12px] font-light text-white/55 leading-[1.6]">Virtual tours available. Agent can assist with documentation for overseas buyers. Trusted across 14 countries.</p>
          </div>
        </div>
      </div>

    </div><!-- /right column -->

</div>
</div>

<!-- ════════════ SIMILAR PROPERTIES ════════════ -->
<div class="bg-chalk-2 dark:bg-[#111826] py-16 px-[5vw] tt">
  <div class="max-w-[1320px] mx-auto">
    <div class="flex items-end justify-between mb-8 flex-wrap gap-4">
      <div>
        <p class="text-[10px] font-medium tracking-[.2em] uppercase text-navy-accent dark:text-blue-bright mb-2">More like this</p>
        <h2 class="font-display font-light text-navy-dark dark:text-blue-100 leading-[1.1]" style="font-size:clamp(26px,3vw,38px)">Similar properties</h2>
      </div>
      <a href="/states/rivers state" class="text-[13px] font-medium text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">See all in Rivers State →</a>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
      <!-- Similar 1 -->
      <a href="/site/properties/81" class="sim-card group bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden no-underline tt flex flex-col">
        <div class="h-[160px] relative overflow-hidden bg-gradient-to-br from-[#1F3F6A] via-[#4A70A0] to-[#8DAACC]">
          <div class="absolute bottom-0 left-[44px] w-[80px] h-[100px] bg-white/[0.13] rounded-t"></div>
          <div class="absolute bottom-[74px] left-[54px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[74px] left-[72px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[52px] left-[54px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[52px] left-[72px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute inset-0 hero-grad group-hover:opacity-80 tt"></div>
          <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
        </div>
        <div class="p-4 flex-1"><div class="font-display text-[18px] font-semibold text-navy-dark dark:text-blue-100 mb-[2px]">₦700,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div><div class="flex items-center gap-[4px] text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[4px] h-[4px] rounded-full bg-blue-bright flex-shrink-0"></div>GRA Phase 3, Port Harcourt</div><div class="flex gap-3 pt-2.5 border-t border-chalk-3 dark:border-white/[.08]"><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>105 m²</span></div></div>
      </a>
      <!-- Similar 2 -->
      <a href="/site/properties/82" class="sim-card group bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden no-underline tt flex flex-col">
        <div class="h-[160px] relative overflow-hidden bg-gradient-to-br from-[#0A2463] via-[#0E2444] to-[#1F3F6A]">
          <div class="absolute bottom-0 left-[48px] w-[95px] h-[120px] bg-white/[0.13] rounded-t"></div>
          <div class="absolute bottom-[90px] left-[58px] w-[12px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[90px] left-[78px] w-[12px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[64px] left-[58px] w-[12px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[64px] left-[78px] w-[12px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[38px] left-[58px] w-[12px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute inset-0 hero-grad group-hover:opacity-80 tt"></div>
          <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
          <span class="absolute top-2 right-2 text-[8px] font-semibold tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-gold text-navy-deep flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-navy-mid"></span>Boosted</span>
        </div>
        <div class="p-4 flex-1"><div class="font-display text-[18px] font-semibold text-navy-dark dark:text-blue-100 mb-[2px]">₦1,100,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div><div class="flex items-center gap-[4px] text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[4px] h-[4px] rounded-full bg-blue-bright flex-shrink-0"></div>GRA Phase 1, Port Harcourt</div><div class="flex gap-3 pt-2.5 border-t border-chalk-3 dark:border-white/[.08]"><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>4 beds</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 baths</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>160 m²</span></div></div>
      </a>
      <!-- Similar 3 -->
      <a href="/site/properties/83" class="sim-card group bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden no-underline tt flex flex-col">
        <div class="h-[160px] relative overflow-hidden bg-gradient-to-br from-[#060E1C] via-[#0A2463] to-[#1F3F6A]">
          <div class="absolute bottom-0 left-[40px] w-[72px] h-[88px] bg-white/[0.13] rounded-t"></div>
          <div class="absolute bottom-[62px] left-[50px] w-[10px] h-[13px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[62px] left-[67px] w-[10px] h-[13px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[43px] left-[50px] w-[10px] h-[13px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute inset-0 hero-grad group-hover:opacity-80 tt"></div>
          <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-ember-light text-ember-deep dark:bg-ember/20 dark:text-[#EDBA9B]">For Sale</span>
        </div>
        <div class="p-4 flex-1"><div class="font-display text-[18px] font-semibold text-navy-dark dark:text-blue-100 mb-[2px]">₦65,000,000</div><div class="flex items-center gap-[4px] text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[4px] h-[4px] rounded-full bg-blue-bright flex-shrink-0"></div>Trans-Amadi, Port Harcourt</div><div class="flex gap-3 pt-2.5 border-t border-chalk-3 dark:border-white/[.08]"><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>118 m²</span></div></div>
      </a>
      <!-- Similar 4 -->
      <a href="/site/properties/84" class="sim-card group bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden no-underline tt flex flex-col">
        <div class="h-[160px] relative overflow-hidden bg-gradient-to-br from-[#1A2E50] via-[#2E5078] to-[#5E8AB0]">
          <div class="absolute bottom-0 left-[44px] w-[86px] h-[110px] bg-white/[0.13] rounded-t"></div>
          <div class="absolute bottom-[82px] left-[54px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[82px] left-[72px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[58px] left-[54px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[58px] left-[72px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[34px] left-[54px] w-[11px] h-[14px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute inset-0 hero-grad group-hover:opacity-80 tt"></div>
          <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
        </div>
        <div class="p-4 flex-1"><div class="font-display text-[18px] font-semibold text-navy-dark dark:text-blue-100 mb-[2px]">₦600,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div><div class="flex items-center gap-[4px] text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[4px] h-[4px] rounded-full bg-blue-bright flex-shrink-0"></div>Woji, Port Harcourt</div><div class="flex gap-3 pt-2.5 border-t border-chalk-3 dark:border-white/[.08]"><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>98 m²</span></div></div>
      </a>
      <!-- Similar 5 -->
      <a href="/site/properties/85" class="sim-card group bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden no-underline tt flex flex-col">
        <div class="h-[160px] relative overflow-hidden bg-gradient-to-br from-[#0E2444] via-[#163660] to-[#2E5480]">
          <div class="absolute bottom-0 left-[40px] w-[100px] h-[125px] bg-white/[0.13] rounded-t"></div>
          <div class="absolute bottom-[95px] left-[50px] w-[13px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[95px] left-[70px] w-[13px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[68px] left-[50px] w-[13px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[68px] left-[70px] w-[13px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute bottom-[42px] left-[50px] w-[13px] h-[16px] bg-[rgba(212,174,58,.65)] rounded-sm"></div>
          <div class="absolute inset-0 hero-grad group-hover:opacity-80 tt"></div>
          <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-[#E8EDF5] text-navy-strong dark:bg-blue-bright/15 dark:text-[#8DAACC]">For Rent</span>
          <span class="absolute top-2 right-2 text-[9px] font-medium tracking-[.07em] uppercase px-2 py-[3px] rounded-full bg-sage text-white flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-white/60"></span>Virtual</span>
        </div>
        <div class="p-4 flex-1"><div class="font-display text-[18px] font-semibold text-navy-dark dark:text-blue-100 mb-[2px]">₦950,000 <span class="text-[12px] font-light text-chalk-muted">/mo</span></div><div class="flex items-center gap-[4px] text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-2.5"><div class="w-[4px] h-[4px] rounded-full bg-blue-bright flex-shrink-0"></div>GRA Phase 2, Port Harcourt</div><div class="flex gap-3 pt-2.5 border-t border-chalk-3 dark:border-white/[.08]"><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>3 beds</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>2 baths</span><span class="text-[10px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-blue-bright"></span>112 m²</span></div></div>
      </a>
    </div>
  </div>
</div>
</div>

<style>
  .tt{transition:background-color .3s,color .3s,border-color .3s}
  select{-webkit-appearance:none;appearance:none}
  @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
  .pulse-dot{animation:pulse-dot 2.2s infinite}
  @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
  .fu{animation:fadeUp .7s cubic-bezier(.22,.68,0,1) both}
  .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}.d4{animation-delay:.24s}.d5{animation-delay:.3s}
  @keyframes slideUp{from{transform:translateX(-50%) translateY(60px);opacity:0}to{transform:translateX(-50%) translateY(0);opacity:1}}
  .toast-show{animation:slideUp .35s cubic-bezier(.34,1.56,.64,1) forwards}
  .scrollbar-hide::-webkit-scrollbar{display:none}
  .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
  /* Ham */
  .ham-open .ham-1{transform:translateY(7px) rotate(45deg)}
  .ham-open .ham-2{opacity:0}
  .ham-open .ham-3{transform:translateY(-7px) rotate(-45deg)}
  /* Map */
  #map{height:300px;border-radius:14px;z-index:1}
  .leaflet-popup-content-wrapper{border-radius:14px!important;box-shadow:0 8px 32px rgba(10,36,99,.15)!important}
  .leaflet-popup-content{margin:14px 16px!important;font-family:'DM Sans',sans-serif!important}
  :global([data-theme="dark"]) .leaflet-popup-content-wrapper{background:#131C2E!important;color:#E8EDF5!important}
  .leaflet-popup-tip{background:white!important}
  :global([data-theme="dark"]) .leaflet-popup-tip{background:#131C2E!important}
  /* Gallery hover */
  .gallery-thumb{transition:transform .22s,box-shadow .22s}
  .gallery-thumb:hover{transform:scale(1.02)}
  /* Sticky sidebar */
  @media(min-width:1024px){.sticky-sidebar{position:sticky;top:80px}}
  /* Amenity chip hover */
  .am-chip:hover{border-color:#4A90E2!important;background:rgba(74,144,226,.06)!important}
  /* Detail row */
  .detail-row:last-child{border-bottom:none!important}
  /* Similar card */
  .sim-card{transition:transform .22s,box-shadow .22s,border-color .2s}
  .sim-card:hover{transform:translateY(-4px);box-shadow:0 16px 44px rgba(10,36,99,.12);border-color:#4A90E2!important}
  :global([data-theme="dark"]) .sim-card:hover{box-shadow:0 16px 44px rgba(0,0,0,.45)}
  /* Section heading dot */
  .section-dot{width:6px;height:6px;border-radius:50%;background:#4A90E2;flex-shrink:0}
  /* Hero gradient overlay */
  .hero-grad{background:linear-gradient(to top,rgba(6,14,28,.65) 0%,rgba(6,14,28,.15) 50%,transparent 100%)}
  /* Glassmorphism booking card */
  .glass-card{background:rgba(255,255,255,.82);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px)}
  :global([data-theme="dark"]) .glass-card{background:rgba(13,20,34,.88)}
  /* Viewing book btn pulse */
  @keyframes cta-glow{0%,100%{box-shadow:0 0 0 0 rgba(192,96,53,.35)}50%{box-shadow:0 0 0 8px rgba(192,96,53,0)}}
  .cta-pulse{animation:cta-glow 2.8s ease infinite}
  /* Mobile sticky CTA bar */
  #mobileCTA{display:none}
  @media(max-width:1023px){#mobileCTA{display:flex}}
  /* Progress bar for rating */
  .rating-bar{background:#EDE7DC;border-radius:4px;overflow:hidden}
  :global([data-theme="dark"]) .rating-bar{background:rgba(255,255,255,.08)}
  /* Virtual viewing glow */
  @keyframes vt-glow{0%,100%{box-shadow:0 0 0 0 rgba(74,120,72,.3)}50%{box-shadow:0 0 0 8px rgba(74,120,72,0)}}

  /* White cards → dark surface */
  :global([data-theme="dark"]) .bg-white {
    background-color: #131C2E !important;
  }

  /* chalk-2 backgrounds → dark surface variant */
  :global([data-theme="dark"]) .bg-chalk-2 {
    background-color: #1A2438 !important;
  }

  /* chalk background → dark input bg */
  :global([data-theme="dark"]) .bg-chalk {
    background-color: #1A2438 !important;
  }

  /* chalk-3 borders → white/8% */
  :global([data-theme="dark"]) .border-chalk-3 {
    border-color: rgba(255,255,255,0.08) !important;
  }

  /* chalk-3 dividers */
  :global([data-theme="dark"]) .divide-chalk-3 > * + * {
    border-color: rgba(255,255,255,0.08) !important;
  }

  /* navy-dark text → light */
  :global([data-theme="dark"]) .text-navy-dark {
    color: #E8EDF5 !important;
  }

  /* chalk-muted text → muted blue */
  :global([data-theme="dark"]) .text-chalk-muted {
    color: #6A7FA0 !important;
  }

  /* navy-accent text */
  :global([data-theme="dark"]) .text-navy-accent {
    color: #8DAACC !important;
  }

  /* Similar section background */
  :global([data-theme="dark"]) .bg-chalk-2 {
    background-color: #111826 !important;
  }

  /* plan gallery */
  .plan-thumb{width:160px;height:120px;flex-shrink:0;border-radius:12px;overflow:hidden;border:2px solid;cursor:pointer;transition:border-color .2s,transform .2s}
  .plan-thumb{border-color:#EDE7DC}
  :global([data-theme="dark"]) .plan-thumb{border-color:rgba(255,255,255,.08)}
  .plan-thumb.active{border-color:#4A90E2}
  .plan-thumb:hover{transform:scale(1.03)}

  .vt-pulse{animation:vt-glow 3s ease infinite}
  /* Image mosaic responsive */
  @media(max-width:767px){
    .gallery-grid{grid-template-columns:1fr!important;grid-template-rows:260px!important}
    .gallery-thumb-col{display:none!important}
  }
  @media(max-width:640px){
    .detail-grid{grid-template-columns:1fr!important}
  }
</style>