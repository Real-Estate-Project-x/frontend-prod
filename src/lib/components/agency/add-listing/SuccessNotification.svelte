<script lang="ts">
   import { ListingResponseStatus } from "$lib/utils/constant";

    let { 
        listingSlug,
        onClick,
        status = ListingResponseStatus.DRAFT, 
    }: { 
        onClick: () => void,
        listingSlug: string,
        status: ListingResponseStatus,
    } = $props();

</script>

{#if status === ListingResponseStatus.LIVE}
    <!-- ============================================
     STEP 6 — LISTING SUCCESS (LIVE)
     ============================================ -->
    <section id="on_success" class="step-panel">
        <div class="max-w-[560px] mx-auto py-10 sm:py-14 text-center">
      
          <div class="success-ring inline-flex items-center justify-center w-[84px] h-[84px] rounded-full bg-sage-light dark:bg-sage/15 mb-7 tt">
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle class="success-circle" cx="26" cy="26" r="22" stroke="#4A7848" stroke-width="2.5"/>
              <path class="success-check" d="M16 27l7 7 13-15" stroke="#4A7848" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
      
          <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2.5" style="font-size:clamp(26px,3.5vw,34px)">Your listing is <em class="italic text-gold">live.</em></h2>
          <p class="text-[13.5px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] max-w-[400px] mx-auto mb-8">Your property has been successfully published and is now visible to potential buyers and renters on Blupodd.</p>
      
          <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-2xl px-6 py-5 mb-8 tt text-left">
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="successTitle">Your property listing</span>
              <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-3 py-[5px] rounded-full flex items-center gap-1.5 flex-shrink-0"><span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>Live</span>
            </div>
            <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Available now to everyone browsing Blupodd.</p>
          </div>
      
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/site/properties/{listingSlug}" class="w-full sm:w-auto flex items-center justify-center gap-2 text-[13px] font-medium text-white bg-sage hover:bg-[#3a6038] px-7 py-[11px] rounded-full border-none cursor-pointer tt no-underline">
              View Listing
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <button onclick={() => location.reload()} class="w-full sm:w-auto flex items-center justify-center gap-2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-7 py-[11px] rounded-full cursor-pointer bg-transparent tt">
              Add Another Listing
            </button>
          </div>
      
          <a href="/agency/listings" class="inline-block mt-6 text-[12px] text-blue-link dark:text-blue-bright no-underline hover:opacity-75 tt">Back to my listings →</a>
        </div>
    </section>
{:else if status === ListingResponseStatus.AWAITING_CONFIRMATION}
    <!-- ============================================
     STEP 6 — AWAITING APPROVAL
    ============================================ -->
    <section id="on_awaiting_approval" class="step-panel">
        <div class="max-w-[560px] mx-auto py-10 sm:py-14 text-center">
      
          <!-- Icon -->
          <div class="state-icon-wrap icon-wrap-pending">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="15" stroke="#D4AE3A" stroke-width="2"/>
              <g class="pending-hand">
                <path d="M20 12v8l6 3" stroke="#D4AE3A" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
            </svg>
          </div>
      
          <!-- Message -->
          <h2 class="state-fade font-display font-light text-navy-dark dark:text-blue-100 mb-2.5" style="font-size:clamp(26px,3.5vw,34px)">Your listing is <em class="italic text-gold">under review.</em></h2>
          <p class="state-fade text-[13.5px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] max-w-[400px] mx-auto mb-8">Our team verifies every sale listing before it goes live. This usually takes less than 24 hours — we'll notify you the moment it's approved.</p>
      
          <!-- Confirmation -->
          <div class="state-fade bg-chalk-2 dark:bg-[#131C2E] rounded-2xl px-6 py-5 mb-8 tt text-left">
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="pendingTitle">Your property listing</span>
              <span class="pending-pill text-[10px] font-medium px-3 py-[5px] rounded-full flex items-center gap-1.5 flex-shrink-0"><span class="pending-dot w-1.5 h-1.5 rounded-full"></span>Pending review</span>
            </div>
            <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Submitted for verification · not yet visible to buyers.</p>
          </div>
      
          <!-- Actions -->
          <div class="state-fade flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/agency/listings" class="w-full sm:w-auto flex items-center justify-center gap-2 text-[13px] font-medium text-white bg-navy-dark hover:bg-navy-mid px-7 py-[11px] rounded-full border-none cursor-pointer tt no-underline">
              Track Status
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </a>
            <button onclick={() => location.reload()} class="w-full sm:w-auto flex items-center justify-center gap-2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-7 py-[11px] rounded-full cursor-pointer bg-transparent tt">
              Add Another Listing
            </button>
          </div>
      
          <a href="/agency/listings" class="state-fade inline-block mt-6 text-[12px] text-blue-link dark:text-blue-bright no-underline hover:opacity-75 tt">Back to my listings →</a>
        </div>
    </section>
{:else if status === ListingResponseStatus.DRAFT}
    <!-- ============================================
     STEP 6 — DRAFT SAVED
    ============================================ -->
    <section id="on_draft_saved" class="step-panel">
        <div class="max-w-[560px] mx-auto py-10 sm:py-14 text-center">
      
          <!-- Icon -->
          <div class="state-icon-wrap icon-wrap-draft">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M12 8h12l6 6v16a2 2 0 01-2 2H12a2 2 0 01-2-2V10a2 2 0 012-2z" stroke="#4A90E2" stroke-width="2" stroke-linejoin="round"/>
              <path d="M24 8v6h6" stroke="#4A90E2" stroke-width="2" stroke-linejoin="round"/>
              <path d="M14 22h12M14 26h8" stroke="#4A90E2" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
      
          <!-- Message -->
          <h2 class="state-fade font-display font-light text-navy-dark dark:text-blue-100 mb-2.5" style="font-size:clamp(26px,3.5vw,34px)">Your listing is saved as a <em class="italic text-blue-bright">draft.</em></h2>
          <p class="state-fade text-[13.5px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] max-w-[400px] mx-auto mb-8">Nothing has been published yet. Your progress is saved — publish whenever you're ready.</p>
      
          <!-- Confirmation -->
          <div class="state-fade bg-chalk-2 dark:bg-[#131C2E] rounded-2xl px-6 py-5 mb-8 tt text-left">
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100" id="draftTitle">Your property listing</span>
              <span class="draft-pill text-[10px] font-medium px-3 py-[5px] rounded-full flex items-center gap-1.5 flex-shrink-0"><span class="draft-dot w-1.5 h-1.5 rounded-full"></span>Draft</span>
            </div>
            <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Only visible to you until you publish.</p>
          </div>
      
          <!-- Actions -->
          <div class="state-fade flex flex-col sm:flex-row items-center justify-center gap-3">
            <button type="button" onclick={onClick} class="w-full sm:w-auto flex items-center justify-center gap-2 text-[13px] font-medium text-white bg-navy-dark hover:bg-navy-mid px-7 py-[11px] rounded-full border-none cursor-pointer tt no-underline">
                Continue Editing
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                    <path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            <button class="w-full sm:w-auto flex items-center justify-center gap-2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-7 py-[11px] rounded-full cursor-pointer bg-transparent tt">
              Save &amp; Exit
            </button>
          </div>
      
          <a href="/agency/listings" class="state-fade inline-block mt-6 text-[12px] text-blue-link dark:text-blue-bright no-underline hover:opacity-75 tt">Back to my listings →</a>
        </div>
    </section>
{/if}

<style>
    /* ============================================
    LISTING SUCCESS (LIVE) — supporting styles
    ============================================ */
    .success-circle,.success-check{stroke-dashoffset:0}
    .success-ring{box-shadow:0 0 0 0 rgba(74,120,72,0)}
    @media (prefers-reduced-motion: no-preference){
        .success-circle{stroke-dasharray:166;stroke-dashoffset:166;animation:successCircle .6s cubic-bezier(.65,0,.45,1) .1s forwards}
        .success-check{stroke-dasharray:48;stroke-dashoffset:48;animation:successCheck .45s cubic-bezier(.65,0,.45,1) .55s forwards}
        .success-ring{animation:successRingPulse 1.6s ease-out .68s 1}
        @keyframes successCircle{to{stroke-dashoffset:0}}
        @keyframes successCheck{to{stroke-dashoffset:0}}
        @keyframes successRingPulse{0%{box-shadow:0 0 0 0 rgba(74,120,72,.22)}100%{box-shadow:0 0 0 16px rgba(74,120,72,0)}}
    }
    /* ============================================
    AWAITING APPROVAL — supporting styles
    ============================================ */
    .icon-wrap-pending{background:rgba(212,174,58,.15)}
    :global([data-theme="dark"]) .icon-wrap-pending{background:rgba(212,174,58,.18)}
    .pending-pill{background:rgba(212,174,58,.18);color:#8A6A10}
    :global([data-theme="dark"]) .pending-pill{background:rgba(212,174,58,.2);color:#D4AE3A}
    .pending-dot{background:#D4AE3A;animation:pendingPulse 2.2s ease-in-out infinite}
    @keyframes pendingPulse{0%,100%{opacity:1}50%{opacity:.35}}
        .pending-hand{transform-origin:20px 20px}
    @media (prefers-reduced-motion: no-preference){
        .pending-hand{animation:pendingTick 3s steps(12) infinite}
        @keyframes pendingTick{to{transform:rotate(360deg)}}
    }

    /* ============================================
   DRAFT SAVED — supporting styles
   ============================================ */
   .icon-wrap-draft{background:rgba(74,144,226,.12)}
   :global([data-theme="dark"]) .icon-wrap-draft{background:rgba(74,144,226,.16)}
   .draft-pill{background:rgba(140,128,112,.14);color:#8C8070}
   :global([data-theme="dark"]) .draft-pill{background:rgba(255,255,255,.08);color:#6A7FA0}
   .draft-dot{background:#8C8070}

    /* ============================================
    LISTING STATUS PANELS — shared icon wrapper
    ============================================ */
    .state-icon-wrap{display:inline-flex;align-items:center;justify-content:center;width:84px;height:84px;border-radius:50%;margin-bottom:28px}
    .state-fade{opacity:0;animation:stateFadeIn .5s ease .15s forwards}
    @media (prefers-reduced-motion: no-preference){
        @keyframes stateFadeIn{to{opacity:1}}
    }
    @media (prefers-reduced-motion: reduce){
        .state-fade{opacity:1;animation:none}
    }
</style>