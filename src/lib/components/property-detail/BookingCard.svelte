<script lang="ts">
  import { onMount } from "svelte";

    // ── BOOKING CARD — SVELTE 5 RUNES ──
    // Drop in: src/lib/components/BookingCard.svelte
  
    type ViewingType = 'in_person' | 'virtual' | null;
    let { type: bookingType }: { type: ViewingType } = $props();
  
    interface BookingState {
      type: ViewingType;
      date: string | null;
      dateLabel: string | null;
      time: string | null;
    }
  
    // ── Reactive state ──
    let step = $state(1); // 1 | 2 | 3
    let booking = $state<BookingState>({
      type: null,
      date: null,
      dateLabel: null,
      time: null,
    });

    onMount(() => {
      if (bookingType) selectViewingType(bookingType)
    });
  
    // Form fields
    let name = $state('');
    let phone = $state('');
    let email = $state('');
    let message = $state('');
    let platform = $state('');
    let dateInputValue = $state('');
  
    // UI state
    let selectedDateChip = $state<string | null>(null);
    let selectedTimeSlot = $state<string | null>(null);
    let shakeFields = $state<Record<string, boolean>>({});
    let toast = $state<string | null>(null);
  
    // ── Derived ──
    const isVirtual = $derived(booking.type === 'virtual');
  
    const step2TypeLabel = $derived(isVirtual ? 'Virtual tour' : 'In-person viewing');
  
    const step2BadgeClass = $derived(
      isVirtual
        ? 'ml-auto text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]'
        : 'ml-auto text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-ember-light text-ember-deep dark:bg-ember/20 dark:text-[#EDBA9B]'
    );
  
    const submitBtnClass = $derived(
      isVirtual
        ? 'w-full bg-sage hover:bg-[#3A5E38] text-white rounded-full py-[13px] text-[14px] font-medium border-none cursor-pointer tt flex items-center justify-center gap-2'
        : 'w-full bg-ember hover:bg-ember-deep text-white rounded-full py-[13px] text-[14px] font-medium border-none cursor-pointer tt flex items-center justify-center gap-2'
    );
  
    const confirmBadgeClass = $derived(
      isVirtual
        ? 'text-[9px] font-semibold tracking-[.1em] uppercase px-2 py-[3px] rounded-full bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A]'
        : 'text-[9px] font-semibold tracking-[.1em] uppercase px-2 py-[3px] rounded-full bg-ember-light text-ember-deep dark:bg-ember/20 dark:text-[#EDBA9B]'
    );
  
    const confirmSummary = $derived(
      isVirtual
        ? `Your virtual tour request has been sent to Chukwuemeka Okafor. You'll be contacted within 2 hours to confirm the link and process the ₦5,000 tour fee.`
        : `Your in-person viewing request has been sent to Chukwuemeka Okafor. You'll receive a confirmation by phone and email within 2 hours.`
    );
  
    // ── Stepper progress bar widths ──
    // Step 1 = 1/3, Step 2 = 2/3, Step 3 = 3/3
    const progressBars = $derived([
      step >= 1 ? booking.type === 'in_person' ? 'bg-ember' : 'bg-sage' : 'bg-chalk-3 dark:bg-white/[0.08]',
      step >= 2 ?  booking.type === 'in_person' ? 'bg-ember': 'bg-sage' : 'bg-chalk-3 dark:bg-white/[0.08]',
      step >= 3 ?  booking.type === 'in_person' ? 'bg-ember' : 'bg-sage' : 'bg-chalk-3 dark:bg-white/[0.08]',
    ]);
  
    // ── Helper: format time ──
    function formatTime(t: string): string {
      const [h, m] = t.split(':').map(Number);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 || 12;
      return `${h12}:${String(m).padStart(2, '0')} ${ampm}`;
    }
  
    // ── Actions ──
    function selectViewingType(type: 'in_person' | 'virtual') {
      booking.type = type;
    }
  
    function proceedToStep2() {
      if (!booking.type) return;
      step = 2;
    }
  
    function goBackToStep1() {
      step = 1;
    }
  
    function setDateChip(val: string, label: string) {
      selectedDateChip = val;
      if (val === 'custom') {
        booking.date = null;
        booking.dateLabel = null;
        dateInputValue = '';
        // Focus the date input after tick
        setTimeout(() => document.getElementById('dateInput')?.focus(), 50);
      } else {
        booking.date = val;
        booking.dateLabel = label;
        dateInputValue = val;
      }
    }
  
    function onDateChange(val: string) {
      if (!val) return;
      booking.date = val;
      const d = new Date(val + 'T00:00:00');
      booking.dateLabel = d.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      selectedDateChip = null; // deselect chips
    }
  
    function selectTimeSlot(val: string) {
      selectedTimeSlot = val;
      booking.time = val === 'flexible' ? 'Flexible timing' : formatTime(val);
    }
  
    function showToast(msg: string) {
      toast = msg;
      setTimeout(() => (toast = null), 3000);
    }
  
    function triggerShake(field: string) {
      shakeFields[field] = true;
      setTimeout(() => (shakeFields[field] = false), 400);
    }
  
    function submitBooking() {
      const payload = {
        type: booking.type,
        date: booking.date,
        time: booking.time,
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        property: 'BLU-PH-2024-0421',
        message: message.trim(),
        platform: isVirtual ? (platform || 'Any') : null,
        timestamp: new Date().toISOString(),
      };
      console.log('[Blupodd] Viewing request submitted:', payload);
      step = 3;
    }
  
    function addToCalendar() {
      const date = booking.date || '2026-04-14';
      const title = encodeURIComponent('Property viewing – 3-Bed Apartment GRA Phase 2');
      const details = encodeURIComponent(
        'Viewing booked via Blupodd. Property ref: BLU-PH-2024-0421\nAgent: Chukwuemeka Okafor · +234 800 123 4567'
      );
      const location = encodeURIComponent('GRA Phase 2, Port Harcourt, Rivers State, Nigeria');
      const start = date.replace(/-/g, '') + 'T100000';
      const end   = date.replace(/-/g, '') + 'T110000';
      const gcal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
      window.open(gcal, '_blank');
    }
  
    function resetBooking() {
      booking = { type: null, date: null, dateLabel: null, time: null };
      name = ''; phone = ''; email = ''; message = ''; platform = '';
      dateInputValue = '';
      selectedDateChip = null;
      selectedTimeSlot = null;
      step = 1;
    }
  
    // ── Date chips config ──
    const dateChips = [
      { val: '2026-04-14', label: 'Monday 14 April 2026',    display: 'Mon 14' },
      { val: '2026-04-15', label: 'Tuesday 15 April 2026',   display: 'Tue 15' },
      { val: '2026-04-16', label: 'Wednesday 16 April 2026', display: 'Wed 16' },
      { val: '2026-04-17', label: 'Thursday 17 April 2026',  display: 'Thu 17' },
      { val: '2026-04-19', label: 'Saturday 19 April 2026',  display: 'Sat 19' },
      { val: 'custom',     label: '',                         display: 'Custom…' },
    ];
  
    // ── Time slots config ──
    const timeSlots = [
      { val: '09:00',    display: '9:00 AM'  },
      { val: '10:00',    display: '10:00 AM' },
      { val: '11:00',    display: '11:00 AM' },
      { val: '12:00',    display: '12:00 PM' },
      { val: '14:00',    display: '2:00 PM'  },
      { val: '15:00',    display: '3:00 PM'  },
      { val: '16:00',    display: '4:00 PM'  },
      { val: '17:00',    display: '5:00 PM'  },
      { val: 'flexible', display: 'Flexible' },
    ];
  </script>
  
  <!-- ═══ BOOKING CARD — FULL INTERACTIVE FLOW ═══ -->
  <div id="bookingCard" class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[0.08] rounded-2xl shadow-[0_4px_24px_rgba(10,36,99,.08)] dark:shadow-[0_4px_24px_rgba(0,0,0,.3)] overflow-hidden tt">
  
    <!-- Header -->
    <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[0.08] flex items-center justify-between">
      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 flex items-center gap-2">
        <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="#4A90E2" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg>
        Book a viewing
      </div>
      <span class="text-[11px] text-sage dark:text-[#7DBF7A] flex items-center gap-1.5">
        <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>Available now
      </span>
    </div>
  
    <!-- Price -->
    <div class="px-5 pt-4 pb-3 border-b border-chalk-3 dark:border-white/[0.08]">
      <div class="font-display text-[30px] font-semibold text-navy-dark dark:text-blue-100 leading-none">₦850,000</div>
      <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-1">per calendar month</div>
    </div>
  
    <!-- ── STEP 1: Type selection ── -->
    {#if step === 1}
    <div class="p-5">
      <p class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-3 uppercase tracking-[.08em]">Choose viewing type</p>
  
       <!-- Virtual option -->
       <button
       type="button"
       id="v-virtual-btn"
       onclick={() => selectViewingType('virtual')}
       class="viewing-type-btn w-full flex items-start gap-3.5 p-4 rounded-xl border-2 tt cursor-pointer mb-5 text-left group
         {booking.type === 'virtual'
           ? 'border-sage bg-sage/[0.04] dark:bg-sage/[0.06]'
           : 'border-chalk-3 dark:border-white/[0.08] bg-transparent hover:border-sage hover:bg-sage/[0.04] dark:hover:bg-sage/[0.06]'}">
       <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 tt
         {booking.type === 'virtual' ? 'bg-sage text-white' : 'bg-sage-light dark:bg-sage/20 group-hover:bg-sage group-hover:text-white'}">
         <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
           class="tt {booking.type === 'virtual' ? 'text-white' : 'text-sage group-hover:text-white'}"
           stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
           <rect x="2" y="7" width="15" height="11" rx="2"/>
           <path d="M17 11l5-3v8l-5-3"/>
         </svg>
       </div>
       <div class="flex-1 min-w-0">
         <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Virtual tour
           <span class="ml-1.5 text-[10px] font-medium tracking-[.06em] uppercase px-2 py-[2px] rounded-full bg-sage-light dark:bg-sage/20 text-sage dark:text-[#7DBF7A]">₦5,000</span>
         </div>
         <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.5]">Live video walkthrough with the agent from anywhere. Fee refunded on successful signing.</div>
         <div class="flex items-center gap-1.5 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
           <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
           Available same day in most cases
         </div>
       </div>
       <!-- Radio -->
       <div class="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
         {booking.type === 'virtual' ? 'border-sage' : 'border-chalk-3 dark:border-white/20'}">
         {#if booking.type === 'virtual'}
           <div class="w-2.5 h-2.5 rounded-full bg-sage"></div>
         {/if}
       </div>
     </button>
     
      <!-- In-person option -->
      <button
        type="button"
        id="v-inperson-btn"
        onclick={() => selectViewingType('in_person')}
        class="viewing-type-btn w-full flex items-start gap-3.5 p-4 rounded-xl border-2 tt cursor-pointer mb-2.5 text-left group
          {booking.type === 'in_person'
            ? 'border-ember bg-ember/[0.04] dark:bg-ember/[0.06]'
            : 'border-chalk-3 dark:border-white/[0.08] bg-transparent hover:border-ember hover:bg-ember/[0.04] dark:hover:bg-ember/[0.06]'}">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 tt
          {booking.type === 'in_person' ? 'bg-ember text-white' : 'bg-ember-light dark:bg-ember/20 group-hover:bg-ember group-hover:text-white'}">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
            class="tt {booking.type === 'in_person' ? 'text-white' : 'text-ember group-hover:text-white'}"
            stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
            <path d="M9 21V12h6v9"/>
          </svg>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">In-person viewing</div>
          <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.5]">Visit the property with the agent in person. Choose a date &amp; time that suits you.</div>
          <div class="flex items-center gap-1.5 mt-2 text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
            <svg width="11" height="11" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            Typically confirmed within 2 hours
          </div>
        </div>
        <!-- Radio -->
        <div class="w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5 flex items-center justify-center
          {booking.type === 'in_person' ? 'border-ember' : 'border-chalk-3 dark:border-white/20'}">
          {#if booking.type === 'in_person'}
            <div class="w-2.5 h-2.5 rounded-full bg-ember"></div>
          {/if}
        </div>
      </button>
  
      <button
        onclick={proceedToStep2}
        disabled={!booking.type}
        class="w-full bg-navy-dark hover:bg-navy-mid text-white rounded-full py-[13px] text-[14px] font-medium border-none cursor-pointer tt
          {!booking.type ? 'opacity-40 pointer-events-none' : ''}">
        Continue →
      </button>
      <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] text-center mt-3">No payment taken at this stage · Free cancellation</p>
    </div>
    {/if}
  
    <!-- ── STEP 2: Date, time & contact details ── -->
    {#if step === 2}
    <div class="p-5">
      <!-- Step header with back button -->
      <div class="flex items-center gap-3 mb-4">
        <button
          onclick={goBackToStep1}
          class="w-8 h-8 rounded-full border border-chalk-3 dark:border-white/[0.08] flex items-center justify-center text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt cursor-pointer bg-transparent flex-shrink-0">
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <div>
          <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">{step2TypeLabel}</div>
          <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">3-Bed Apartment · GRA Phase 2</div>
        </div>
        <span class={step2BadgeClass}>{isVirtual ? 'Virtual' : 'In-person'}</span>
      </div>
  
      <!-- Progress steps indicator (stepper UI) -->
      <div class="flex items-center gap-1.5 mb-5">
        {#each progressBars as barClass}
          <div class="h-1.5 rounded-full flex-1 {barClass}"></div>
        {/each}
      </div>
  
      <!-- Date selection -->
      <div class="mb-4">
        <label class="block text-[11px] font-medium text-navy-dark dark:text-blue-100 uppercase tracking-[.08em] mb-2">
          Preferred date <span class="text-ember">*</span>
        </label>
        <!-- Quick date chips -->
        <div class="flex gap-1.5 mb-2.5 overflow-x-auto scrollbar-hide pb-0.5">
          {#each dateChips as chip}
            <button
              onclick={() => setDateChip(chip.val, chip.label)}
              class="date-chip flex-shrink-0 text-[11px] font-medium px-3 py-[6px] rounded-lg border tt cursor-pointer whitespace-nowrap
                {selectedDateChip === chip.val
                  ? 'bg-navy-dark text-white border-navy-dark'
                  : 'border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent'}">
              {chip.display}
            </button>
          {/each}
        </div>
        <input
          id="dateInput"
          type="date"
          min="2026-04-13"
          bind:value={dateInputValue}
          onchange={(e) => onDateChange((e.target as HTMLInputElement).value)}
          class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 outline-none focus:border-blue-link tt"
        />
      </div>
  
      <!-- Time slot selection -->
      <div class="mb-4">
        <label class="block text-[11px] font-medium text-navy-dark dark:text-blue-100 uppercase tracking-[.08em] mb-2">
          Preferred time <span class="text-ember">*</span>
        </label>
        <div class="grid grid-cols-3 gap-1.5">
          {#each timeSlots as slot}
            <button
              onclick={() => selectTimeSlot(slot.val)}
              class="time-slot text-[12px] font-medium py-2 rounded-lg border tt cursor-pointer
                {selectedTimeSlot === slot.val
                  ? 'bg-navy-dark text-white border-navy-dark'
                  : 'border-chalk-3 dark:border-white/10 text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white bg-transparent'}">
              {slot.display}
            </button>
          {/each}
        </div>
      </div>
  
      <!-- Your details -->
      <div class="mb-4 pt-4 border-t border-chalk-3 dark:border-white/[0.08]">
        <label for="extra-questions" class="block text-[11px] font-medium text-navy-dark dark:text-blue-100 uppercase tracking-[.08em] mb-3">
          Extra details
        </label>
        <div class="space-y-2.5">
          <textarea
            id="extra-questions"
            bind:value={message}
            rows="2"
            placeholder="Any specific questions or requests? (optional)"
            class="w-full bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-xl px-4 py-[10px] text-[13px] text-navy-dark dark:text-blue-100 placeholder-chalk-muted dark:placeholder-[#6A7FA0] outline-none resize-none leading-relaxed focus:border-blue-link tt">
          </textarea>
        </div>
      </div>
  
      <!-- Virtual tour fee note -->
      {#if isVirtual}
        <div class="mb-4 bg-sage-light dark:bg-sage/[0.12] border border-sage/20 dark:border-sage/30 rounded-xl px-4 py-3 flex items-start gap-3">
          <svg width="15" height="15" viewBox="0 0 20 20" fill="none" class="text-sage flex-shrink-0 mt-0.5"><circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.4"/><path d="M10 9v5M10 7h.01" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          <div class="text-[12px] font-light text-sage dark:text-[#7DBF7A] leading-[1.6]">
            A fee of <strong class="font-medium">₦5,000</strong> applies for virtual tours. This is fully refundable if viewing does not hold.
          </div>
        </div>
      {/if}
  
      <!-- Submit button -->
      <button onclick={submitBooking} class={submitBtnClass}>
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="14" rx="2" stroke="white" stroke-width="1.4"/><path d="M7 2v4M13 2v4M3 9h14" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
        <span>{isVirtual ? 'Request virtual tour' : 'Confirm viewing request'}</span>
      </button>
      <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] text-center mt-3">No payment now · The agent will confirm your slot within 2 hours</p>
    </div>
    {/if}
  
    <!-- ── STEP 3: Confirmation ── -->
    {#if step === 3}
    <div class="p-6 text-center">
      <div class="w-14 h-14 rounded-full bg-sage-light dark:bg-sage/20 flex items-center justify-center mx-auto mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 12l4 4 10-9" stroke="#4A7848" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h3 class="font-display text-[24px] font-light text-navy-dark dark:text-blue-100 mb-2">Viewing requested!</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] mb-4">{confirmSummary}</p>
  
      <!-- Booking summary pill -->
      <div class="bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[0.08] rounded-xl px-4 py-3 text-left mb-5 tt">
        <div class="flex items-center gap-2 mb-2.5">
          <div class={confirmBadgeClass}>{isVirtual ? 'Virtual' : 'In-person'}</div>
          <span class="text-[12px] font-medium text-navy-dark dark:text-blue-100">Viewing booked</span>
        </div>
        <div class="space-y-1.5">
          <div class="flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <span>{booking.dateLabel || booking.date}</span>
          </div>
          <div class="flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3"/><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            <span>{booking.time}</span>
          </div>
          <div class="flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M8 1C5.24 1 3 3.24 3 6c0 3.75 5 9 5 9s5-5.25 5-9c0-2.76-2.24-5-5-5z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><circle cx="8" cy="6" r="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
            <span>3-Bed Apartment · GRA Phase 2, PH</span>
          </div>
        </div>
      </div>
  
      <div class="flex gap-2">
        <button
          onclick={addToCalendar}
          class="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-medium py-2.5 rounded-full border border-chalk-3 dark:border-white/[0.08] text-navy-dark dark:text-blue-100 hover:border-navy-dark dark:hover:border-white/30 bg-transparent cursor-pointer tt">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
          Add to calendar
        </button>
        <button
          onclick={resetBooking}
          class="flex-1 text-[12px] font-medium py-2.5 rounded-full bg-chalk-2 dark:bg-white/[0.06] text-chalk-muted dark:text-[#6A7FA0] hover:bg-chalk-3 dark:hover:bg-white/10 border-none cursor-pointer tt">
          Book another
        </button>
      </div>
    </div>
    {/if}
  
  </div>
  
  <!-- Toast notification -->
  {#if toast}
    <div class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-navy-dark text-white text-[13px] font-medium px-5 py-3 rounded-full shadow-lg">
      {toast}
    </div>
  {/if}
  
<style>
  /* Shake animation for validation errors */
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%       { transform: translateX(-5px); }
    40%       { transform: translateX(5px); }
    60%       { transform: translateX(-4px); }
    80%       { transform: translateX(4px); }
  }
  :global(.animate-shake) {
    animation: shake 0.35s ease;
  }
  
  /* Pulse dot for "Available now" */
  :global(.pulse-dot) {
    animation: pulse 2s ease-in-out infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.5; transform: scale(1.4); }
  }
  
  /* Hide scrollbar for date chips */
  :global(.scrollbar-hide) {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  :global(.scrollbar-hide::-webkit-scrollbar) {
    display: none;
  }

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

  /* blue-100 text */
  :global([data-theme="dark"]) .text-blue-100 {
    color: #C8D8F0 !important;
  }

  /* Similar section background */
  :global([data-theme="dark"]) .bg-chalk-2 {
    background-color: #111826 !important;
  }
</style>