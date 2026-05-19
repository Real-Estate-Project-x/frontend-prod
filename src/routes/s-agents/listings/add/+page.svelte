<script lang="ts">
  import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";

  type UpForType = 'sale' | 'rent';
  type TourType = 'virtual' | 'in person';
  type PFileType = { file: File, preview: string };
  type CountType = { bathroom: number, kitchen: number, bedroom: number };
  type AddedCost = { label: string | undefined, amount: number | undefined }

  // Files
  let pPhotos: HTMLInputElement;
  let pVideo: HTMLInputElement;
  let pOwnerDocuments: HTMLInputElement;
  let pArchPlans: HTMLInputElement;

  let previewPhotos = $state<PFileType[]>([]);
  let previewVideo = $state<PFileType>();
  let previewArchPlans = $state<PFileType[]>([]);
  let previewOwnerDocs = $state<PFileType[]>([]);

  let isPhotoDragging = $state(false);

  let step = $state(1);
  let isLive= $state(false);
  let upFor = $state<UpForType>('sale');
  let tour = $state<TourType>('virtual');
  let count = $state<CountType>({
    bathroom: 1,
    bedroom: 1,
    kitchen: 1
  });
  let amenities = $state({
    laundry: false,
    wifi: false,
    playArea: false,
    gym: false,
    cctv:false,
    carPark: false,
    newBuilding: false,
  })
  let addedCost = $state<AddedCost[]>([{ label: 'Agency fee', amount: 50000 }]);
  const steps = [
        { label: 'basics', step: 1 }, 
        {label:'pricing', step: 2}, 
        {label: 'amenities', step: 3 },
        {label:'files', step: 4 },
        {label:'preview', step: 5 }
    ]

    let roomCount = $state(1);
    let bathroomCount = $state(1);
    let kitchenCount = $state(1);

    const toggleAmenity = (key: keyof typeof amenities) => {
        amenities[key] = !amenities[key];
    }

    const setCount = (key: keyof typeof count, value: number) => {
        if (value >= 1) count[key] = value
    }

    const addCostRow = () => {
        addedCost.push({ label: undefined, amount: 0 });
    }

    const removeCostRow = (label: string) => {
        addedCost = addedCost.filter((_) => _.label !== label);
    }

    const removePhoto = (indexLocation: number) => {
        previewPhotos = previewPhotos.filter((p, index) => index !== indexLocation);
    }

    const removeArchPlan = (indexLocation: number) => {
        previewArchPlans = previewArchPlans.filter((p, index) => index !== indexLocation);
    }

    const removeVideo = () => {
        previewVideo = undefined
    }

    const handleImageUploads = () => {
        const files = pPhotos?.files;
        if (!files || files.length === 0) return;

        console.log({files});

        for (const f of files) {
            previewPhotos.push({ file: f, preview: URL.createObjectURL(f) });
        }
    }

    const handleArchPlanUploads = () => {
        const files = pArchPlans?.files;
        if (!files || files.length === 0) return;

        console.log({files});

        for (const f of files) {
            previewArchPlans.push({ file: f, preview: URL.createObjectURL(f)});
        }
    }

    const handleOwnerDocUploads = () => {
        const files = pOwnerDocuments?.files;
        if (!files || files.length === 0) return;

        console.log({files});
        for (const f of files) {
            previewOwnerDocs.push({ file: f, preview: URL.createObjectURL(f)});
        }
    }

    const handleVideoUploads = () => {
        const files = pVideo?.files;
        if (!files || files.length === 0) return;

        const video = files[0];

        previewVideo = { file: video, preview: URL.createObjectURL(video) };
    }

    const saveDraft = () => {}

    const setUpFor = (value: UpForType) => upFor = value;

    const setTourType = (value: TourType) => tour = value;

    const setStep = (value: number) => {
        if (value <= 5) step = value
    };

    const goLive = () => isLive = true;

    const dragOver = (event: DragEvent) => {
      event.preventDefault();
      isPhotoDragging = true;
    }

    const dragLeave = () => {
      isPhotoDragging = false;
    }

    const dropFiles = (event: DragEvent, type: 'photos' | 'video' | 'plans' | 'docs') => {
    event.preventDefault();
    isPhotoDragging = false;

    const files = event.dataTransfer?.files;
    if (!files?.length) return;

    handleFiles(files, type);
  }

  const handleFiles = async(
    files: FileList,
    type: 'photos' | 'video' | 'plans' | 'docs'
  ) => {
    if (!files.length) return;

    // PHOTOS
    if (type === 'photos') {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;

        previewPhotos.push({
          file,
          preview: URL.createObjectURL(file),
        });

        // preview
      }
    }

    // VIDEO
    else if (type === 'video') {
        previewVideo = { 
            file: files[0], 
            preview: URL.createObjectURL(files[0]) 
        };
    }
    else if (type === 'docs') {
        for (const file of Array.from(files)) {

        previewOwnerDocs.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    }

    else if (type === 'plans') {
        for (const file of Array.from(files)) {

        previewArchPlans.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    }
  }
</script>

<!-- ══ LAYOUT SHELL ══ -->
<div class="flex pt-[68px] min-h-screen">
    <SubAgencySidebar />

    <!-- ══════════════════════════════════════════
     MAIN CONTENT
══════════════════════════════════════════ -->
<main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- PAGE HEADER -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[780px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
        <div>
          <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">New listing</p>
          <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
            Add a <em class="italic text-gold">property.</em>
          </h1>
          <p class="text-[13px] font-light text-white/50 mt-1.5">Complete each step carefully. Detailed listings get 3× more enquiries.</p>
        </div>
        <div class="flex items-center gap-3 flex-shrink-0">
          <!-- Auto-save indicator -->
          <div class="flex items-center gap-1.5 text-[11px] text-white/45" id="saveIndicator">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M2 7a5 5 0 1010 0 5 5 0 00-10 0z"/><path d="M5 7l1.5 1.5 2.5-2.5"/></svg>
            Draft saved
          </div>
          <button onclick={saveDraft} class="flex items-center gap-1.5 text-[12px] font-medium text-white/70 border border-white/20 hover:border-white/40 hover:text-white px-4 py-2 rounded-full tt bg-transparent cursor-pointer">
            Save draft
          </button>
        </div>
      </div>
    </div>

    <!-- STICKY STEPPER + PROGRESS -->
    <div class="sticky top-[68px] z-30 bg-white dark:bg-[#0D1422] border-b border-chalk-3 dark:border-white/[0.06] px-6 lg:px-10 py-4 tt shadow-[0_2px_12px_rgba(10,36,99,.05)]">
        <div class="max-w-[780px] mx-auto">
        <!-- Progress bar -->
        <div class="prog-bar mb-4">
            <div class="prog-fill" id="progFill" style="width: {((step - 1) / (steps.length - 1)) * 100}%"></div>
        </div>
        <!-- Step nodes -->
        <div class="flex items-start justify-between">
            {#each steps as s, index}
            <div class="flex flex-col items-center gap-1 flex-1">
                <div class="step-node" id="node{index+1}" class:active={step === s.step} class:done={step > s.step}>
                    {#if step > s.step}
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    {:else}
                        <span>{s.step}</span>
                    {/if}
                </div>
                <span class="step-label hide-sm capitalize" id="lbl{s.step}" class:active={step >= s.step}>{s.label}</span>
                </div>
                {#if s.step !== steps.length}
                <div class="step-line mt-4" id="line{s.step}" class:done={step > s.step}></div>
                {/if}
            {/each}
    
        </div>
        </div>
    </div>

    <!-- FORM AREA -->
    <div class="px-6 lg:px-10 py-8 max-w-[780px] mx-auto pb-24" id="formArea">

        {#if step === 1}
        <!-- ══ STEP 1: BASIC INFO ══ -->
        <div class="step-panel active fu" id="panel1">
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Basic information</h2>
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">Tell us about this property. Be specific — it helps buyers find the right listing.</p>
    
            <!-- Property type + Listing type -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
                <label for="propertyType" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Property type <span class="text-ember">*</span></label>
                <div class="sel-wrap">
                <select id="propertyType" class="inp cursor-pointer pr-8" required>
                    <option value="">Select property type</option>
                    <option>Apartment / Flat</option>
                    <option>Detached house</option>
                    <option>Semi-detached</option>
                    <option>Terraced house</option>
                    <option>Duplex</option>
                    <option>Bungalow</option>
                    <option>Studio</option>
                    <option>Land / Plot</option>
                    <option>Commercial space</option>
                    <option>Office</option>
                </select>
                </div>
                <p class="field-err" id="err-propertyType">Please select a property type.</p>
            </div>
    
            <div>
                <label for="propertyUpfor" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Listed for <span class="text-ember">*</span></label>
                <div id="propertyUpfor" class="flex gap-2">
                <button type="button" 
                    class:active={upFor === 'sale'} 
                    class="upfor-btn" 
                    id="upfor-sale" 
                    onclick={() => setUpFor('sale')}>
                    For Sale
                </button>
                <button type="button" 
                    class:active={upFor === 'rent'} 
                    class="upfor-btn" 
                    id="upfor-rent" 
                    onclick={() => setUpFor('rent')}>
                    For Rent
                </button>
                </div>
                <input type="hidden" id="upForVal" bind:value={upFor} />
            </div>
            </div>
    
            <!-- Title -->
            <div class="mb-5">
            <label for="propTitle" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Listing title <span class="text-ember">*</span></label>
            <input type="text" id="propTitle" class="inp" placeholder="e.g. Stunning 3-Bedroom Apartment in GRA Phase 2" maxlength="120" required>
            <div class="flex justify-between mt-1.5">
                <p class="field-err show" id="err-title" style="display:none">Please enter a listing title.</p>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-auto" id="titleCount">0/120</span>
            </div>
            </div>
    
            <!-- Address with suggestions -->
            <div class="mb-5 relative">
            <label for="propAddress" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Address <span class="text-ember">*</span></label>
            <div class="relative">
                <input type="text" id="propAddress" class="inp pr-10" placeholder="Start typing an address, landmark or area…" autocomplete="off" oninput={() => {}}>
                <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] pointer-events-none" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 015 5c0 4.5-5 9-5 9S3 10.5 3 6a5 5 0 015-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8" cy="6" r="2" stroke="currentColor" stroke-width="1.4"/></svg>
            </div>
            <div id="addrDropdown" class="hidden absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] rounded-xl shadow-[0_8px_32px_rgba(10,36,99,.12)] z-20 overflow-hidden tt"></div>
            <p class="field-err" id="err-address">Please enter an address.</p>
            </div>
    
            <!-- State -->
            <div class="mb-5">
            <label for="propState" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">State <span class="text-ember">*</span></label>
            <div class="sel-wrap">
                <select id="propState" class="inp cursor-pointer pr-8" required>
                <option value="">Select state</option>
                <option>Rivers State</option><option>Lagos State</option><option>Abuja FCT</option>
                <option>Delta State</option><option>Anambra</option><option>Ogun State</option>
                <option>Enugu</option><option>Kano</option><option>Oyo State</option>
                <option>Cross River</option><option>Edo State</option><option>Imo State</option>
                </select>
            </div>
            <p class="field-err" id="err-state">Please select a state.</p>
            </div>
    
            <!-- Description -->
            <div class="mb-6">
            <label for="propDesc" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Description <span class="text-ember">*</span></label>
            <textarea id="propDesc" class="inp resize-none leading-[1.7]" rows="5" placeholder="Describe the property in detail — neighbourhood, condition, standout features, nearby amenities…" maxlength="1200"></textarea>
            <div class="flex justify-between mt-1.5">
                <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Minimum 80 characters recommended</p>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="descCount">0/1200</span>
            </div>
            <p class="field-err" id="err-desc">Please add a description (min 80 characters).</p>
            </div>
    
            <!-- Virtual viewing -->
            <div class="mb-2">
            <div class="flex items-center gap-2 mb-3">
                <label for="virt-yes" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Virtual viewing availability</label>
                <!-- tooltip -->
                <div class="tooltip-wrap relative flex-shrink-0">
                <div class="w-4 h-4 rounded-full border border-chalk-4 dark:border-white/20 flex items-center justify-center cursor-default">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="#8C8070" stroke-width="1"/><path d="M5 4.5v3M5 3h.01" stroke="#8C8070" stroke-width="1" stroke-linecap="round"/></svg>
                </div>
                <div class="tooltip-text">Listings with virtual viewing tend to get 3× more engagement. Highly recommended.</div>
                </div>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div class="virt-card" id="virt-yes" class:active={tour === 'virtual'} onclick={() => setTourType('virtual')}>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-sage-light dark:bg-sage/15 flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A7848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.261a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                    </div>
                    <div>
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Virtual tour available</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Buyers can book a video walkthrough</div>
                    </div>
                    <div class={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${tour === 'virtual' ? 'bg-sage border-sage' : 'dark:border-white/20'}`}>
                    {#if tour === 'virtual'}
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                    </div>
                </div>
                </div>
                <div class="virt-card" class:active={tour === 'in person'} id="virt-no" onclick={() => setTourType('in person')}>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round"><rect x="3" y="8" width="14" height="10" rx="2"/><path d="M17 11l4-2v5l-4-2"/><path d="M3 8l9-5 5 3"/></svg>
                    </div>
                    <div>
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">In-person only</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Physical viewings only at this time</div>
                    </div>
                    <div class={`ml-auto w-5 h-5 rounded-full border-2 dark:border-white/20 flex items-center justify-center flex-shrink-0 ${tour === 'in person' ? 'bg-sage border-sage' : 'dark:border-white/20'}`} id="virt-no-check">
                        {#if tour === 'in person'}
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        {/if}
                    </div>
                </div>
                </div>
            </div>
            <input type="hidden" id="virtualVal" value="true">
            </div>
        </div><!-- /panel1 -->
        {/if}

        {#if step === 2}
        <!-- ══ STEP 2: PRICING & DETAILS ══ -->
        <div class="step-panel active fu" id="panel2">
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Pricing &amp; details</h2>
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">Set accurate pricing to attract serious buyers and renters.</p>
    
            <!-- Price + Duration -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
                <label for="propPrice" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Price (₦) <span class="text-ember">*</span></label>
                <div class="relative">
                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0]">₦</span>
                <input type="number" id="propPrice" class="inp pl-7" placeholder="e.g. 850000" min="0" required>
                </div>
                <p class="field-err" id="err-price">Please enter the listing price.</p>
            </div>
            <div>
                <label for="paymentDuration" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Payment period</label>
                <div class="sel-wrap">
                <select id="paymentDuration" class="inp cursor-pointer pr-8">
                    <option value="">Select (for rentals)</option>
                    <option>Per year</option>
                    <option>Per month</option>
                    <option>Per quarter</option>
                    <option>Bi-monthly</option>
                    <option>N/A – outright sale</option>
                </select>
                </div>
            </div>
            </div>
    
            <!-- Agency + Size -->
            <div class="grid grid-cols-1 gap-5 mb-5">
            <div>
                <label for="propSize" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Size (m²)</label>
                <input type="number" id="propSize" class="inp" placeholder="e.g. 110" min="0">
            </div>
            </div>
    
            <!-- Room counters -->
            <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-2xl p-5 mb-5 tt">
            <div class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-4">Room counts</div>
            <div class="grid grid-cols-3 gap-4">
                <div>
                <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2 text-center">Bedrooms</div>
                <div class="flex items-center justify-center gap-2">
                    <button type="button" class="cnt-btn" onclick={() => setCount('bedroom', count.bedroom - 1)}>−</button>
                    <span class="text-[16px] font-medium text-navy-dark dark:text-blue-100 min-w-[28px] text-center" id="val-bedrooms">{count.bedroom}</span>
                    <button type="button" class="cnt-btn" onclick={() => setCount('bedroom', count.bedroom + 1)}>+</button>
                </div>
                <input type="hidden" id="noOfBedrooms" bind:value={count.bedroom} />
                </div>
                <div>
                <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2 text-center">Toilets</div>
                <div class="flex items-center justify-center gap-2">
                    <button type="button" class="cnt-btn" onclick={() => setCount('bathroom', count.bathroom - 1)}>−</button>
                    <span class="text-[16px] font-medium text-navy-dark dark:text-blue-100 min-w-[28px] text-center" id="val-toilets">{count.bathroom}</span>
                    <button type="button" class="cnt-btn" onclick={() => setCount('bathroom', count.bathroom + 1)}>+</button>
                </div>
                <input type="hidden" id="noOfToilets" bind:value={count.bathroom} />
                </div>
                <div>
                <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2 text-center">Kitchens</div>
                <div class="flex items-center justify-center gap-2">
                    <button type="button" class="cnt-btn" onclick={() => setCount('kitchen', count.kitchen - 1)}>−</button>
                    <span class="text-[16px] font-medium text-navy-dark dark:text-blue-100 min-w-[28px] text-center" id="val-kitchens">{count.kitchen}</span>
                    <button type="button" class="cnt-btn" onclick={() => setCount('kitchen', count.kitchen + 1)}>+</button>
                </div>
                <input type="hidden" id="noOfKitchens" bind:value={count.kitchen} />
                </div>
            </div>
            </div>
    
            <!-- Broadband -->
            <div class="mb-5">
            <label for="broadband" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Average broadband speed (Mbps)</label>
            <input type="number" id="broadband" class="inp" placeholder="e.g. 50" min="0" max="10000">
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">Leave blank if unknown. This improves search visibility for remote workers.</p>
            </div>
    
            <!-- Additional costs -->
            <div>
            <div class="flex items-center justify-between mb-3">
                <label for="propertyaddedCost" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Additional costs</label>
                <button id="propertyaddedCost" aria-label="Add cost" type="button" onclick={addCostRow} class="flex items-center gap-1.5 text-[12px] font-medium text-blue-link hover:text-navy-dark dark:hover:text-blue-bright tt bg-transparent border-none cursor-pointer p-0">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>Add cost
                </button>
            </div>
            <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">e.g. Agency fee, legal fee, service charge. Transparency builds buyer trust.</p>
            <div id="costsContainer">
                {#each addedCost as row, index}
                <div class="cost-row" id="cost-{index}">
                    <input type="text" 
                        class="inp flex-1" 
                        placeholder="Cost name (e.g. Agency fee)" 
                        bind:value={row.label} 
                        oninput={() => {}} />
                    <div class="relative" style="width:140px;flex-shrink:0">
                      <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-chalk-muted dark:text-[#6A7FA0] pointer-events-none">₦</span>
                      <input type="number" 
                        class="inp pl-7" 
                        placeholder="Amount" 
                        min="0" 
                        bind:value={row.amount} />
                    </div>
                    <button aria-label="Remove cost" 
                        type="button" 
                        onclick={() => { if (row.label) removeCostRow(row.label) }} 
                        class="w-8 h-8 rounded-lg border border-chalk-3 dark:border-white/[.1] flex items-center justify-center cursor-pointer hover:border-ember hover:text-ember tt bg-transparent text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                    </button>
                </div>
                {/each}
            </div>
            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] italic" id="noCosts">No additional costs added yet.</div>
            </div>
        </div><!-- /panel2 -->
        {/if}

        {#if step === 3}
        <!-- ══ STEP 3: AMENITIES ══ -->
        <div class="step-panel active fu" id="panel3">
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Amenities &amp; features</h2>
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">Select all that apply. Accurate amenities attract the right buyers.</p>
    
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
    
            <button type="button" class="am-card" class:active={amenities.laundry} id="am-laundry" onclick={() => toggleAmenity('laundry')}>
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="20" height="18" rx="2"/><circle cx="12" cy="13" r="4"/><path d="M6 7h.01M9 7h.01"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Laundry</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Washing machine / laundry room</div></div>
                <div class="am-check">
                    {#if amenities.laundry}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                </div>
            </button>
    
            <button type="button" class="am-card" class:active={amenities.wifi} id="am-wifi"  onclick={() => toggleAmenity('wifi')}>
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Wi-Fi / Internet</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">High-speed internet connectivity</div></div>
                <div class="am-check">
                    {#if amenities.wifi}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                </div>
            </button>
    
            <button type="button" class="am-card" class:active={amenities.carPark} id="am-parking"  onclick={() => toggleAmenity('carPark')}>
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M9 8h4a2 2 0 010 4H9v4M9 8v8"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Car parking</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Dedicated parking space(s)</div></div>
                <div class="am-check">
                    {#if amenities.carPark}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                </div>
            </button>
    
            <button type="button" class:active={amenities.playArea} class="am-card" id="am-kids"  onclick={() => toggleAmenity('playArea')}>
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Kids play area</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Children's outdoor or indoor play</div></div>
                <div class="am-check">
                    {#if amenities.playArea}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                </div>
            </button>
    
            <button type="button" class="am-card" class:active={amenities.cctv} id="am-cctv"  onclick={() => toggleAmenity('cctv')}>
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 8l7-4 11 6-11 6-7-4v7M9 4v16"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">CCTV security</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Surveillance cameras installed</div></div>
                <div class="am-check">
                    {#if amenities.cctv}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                </div>
            </button>
    
            <button type="button" class="am-card" class:active={amenities.gym} id="am-gym"  onclick={() => toggleAmenity('gym')}>
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M6 4v16M18 4v16M2 8h4M18 8h4M2 16h4M18 16h4M8 12h8"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Gymnasium</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">On-site gym or fitness centre</div></div>
                <div class="am-check">
                    {#if amenities.gym}
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    {/if}
                </div>
            </button>
    
            <button type="button" class="am-card am-card-full" id="am-new" class:active={amenities.newBuilding}  onclick={() => toggleAmenity('newBuilding')} style="grid-column:1/-1">
                <div class="am-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg></div>
                <div class="min-w-0"><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">New build</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Brand new construction — never been occupied</div></div>
                <div class="am-check ml-auto">
                   {#if amenities.newBuilding}
                   <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
                   {/if}
                </div>
            </button>
    
            </div>
        </div><!-- /panel3 -->
        {/if}

        {#if step === 4}
         <!-- ══ STEP 4: FILE UPLOADS ══ -->
        <div class="step-panel active fu" id="panel4">
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Photos &amp; documents</h2>
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">Great photos are the single biggest driver of enquiries. Add as many as you can.</p>
    
            <!-- Photos -->
            <div class="mb-8">
            <div class="flex items-center justify-between mb-3">
                <div>
                <label class="block text-[13px] font-medium text-navy-dark dark:text-blue-100">Property photos <span class="text-ember">*</span></label>
                <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Minimum 3 photos. JPG, PNG, WEBP. Max 8 MB each.</p>
                </div>
                <span class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0]" id="photoCount">
                    {previewPhotos.length ?? 0} photos
                </span>
            </div>
            <div class="upload-zone" id="photoZone" 
                onclick={() => pPhotos.click()}
                ondragover={dragOver}
                ondragleave={dragLeave}
                ondrop={(e) => dropFiles(e, 'photos')}
            >
                <div class="w-12 h-12 rounded-2xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center mx-auto mb-3 tt">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                </div>
                <p class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1">Click to upload or drag &amp; drop</p>
                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Multiple files supported</p>
                <input type="file" bind:this={pPhotos} id="photoInput" class="hidden" multiple accept="image/*" onchange={handleImageUploads}>
            </div>

            {#if previewPhotos.length > 0}
            <!-- Photo previews -->
            <div class="flex flex-wrap gap-2 mt-3" id="photoPreviews">
            {#each previewPhotos as _, index}
            <div class="thumb-wrap">
                <img src={_.preview} alt="Photo-{index}" class="photo-thumb" />
                <button type="button" class="thumb-remove" onclick={() => removePhoto(index)}>✕</button>
                {#if index === 0}
                <span class="absolute bottom-0 left-0 right-0 bg-navy-dark/70 text-white text-[9px] text-center py-0.5 rounded-b-[10px]">Cover</span>
                {/if}
              </div>
            {/each}
            </div>
            {/if}
            <p class="field-err" id="err-photos">Please add at least 3 photos.</p>
            </div>
    
            <!-- Video -->
            <div class="mb-8">
            <label class="block text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Property video</label>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Optional but highly recommended. MP4, MOV, AVI. Max 200 MB.</p>
            <div class="upload-zone" 
                id="videoZone" 
                onclick={() => pVideo.click()} 
                ondragover={dragOver}
                ondragleave={dragLeave}
                ondrop={(e) => dropFiles(e, 'video')}
            >
                <div class="w-12 h-12 rounded-2xl bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center mx-auto mb-3 tt">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.261a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                </div>
                <p class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1">Upload a property video</p>
                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Single file, max 200 MB</p>
                <input type="file" 
                    bind:this={pVideo} 
                    id="videoInput" 
                    class="hidden" 
                    accept="video/*" 
                    onchange={handleVideoUploads} />
            </div>
            {#if previewVideo}
            <div id="videoPreviews" class="mt-2">
                <div class="flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-xl px-3 py-2 tt">
                    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="#4A90E2" stroke-width="1.3" stroke-linejoin="round">
                        <path d="M2 4h9a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1V5a1 1 0 011-1zM15 6l-3 2 3 2V6z"></path>
                    </svg>{previewVideo.file.name}
                    <button type="button" 
                        onclick={removeVideo}
                        class="ml-auto text-ember hover:text-ember-deep bg-transparent border-none cursor-pointer text-[12px]">
                        ✕
                    </button>
                </div>
            </div>
            {/if}
            </div>
    
            <!-- Architectural plans -->
            <div class="mb-8">
            <label class="block text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Architectural / floor plans</label>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Optional. PDF, JPG, PNG. Multiple files.</p>
            <div class="upload-zone" 
                id="planZone" 
                onclick={() => pArchPlans.click()} 
                ondragover={dragOver}
                ondragleave={dragLeave}
                ondrop={(e) => dropFiles(e, 'plans')}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round" class="mx-auto mb-2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6M9 17h4"/></svg>
                <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Upload floor plans (PDF or image)</p>
                <input type="file" 
                    bind:this={pArchPlans} 
                    id="planInput" 
                    class="hidden" 
                    multiple 
                    accept=".pdf,image/*" 
                    onchange={handleArchPlanUploads} />
            </div>
            {#if previewArchPlans.length > 0}
            <div id="planPreviews" class="flex flex-wrap gap-2 mt-2">
                {#each previewArchPlans as p}
                <div class="flex items-center gap-1.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-lg px-2.5 py-1.5 tt">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="#8C8070" stroke-width="1.3">
                        <path d="M2 2h7l3 3v7a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z"></path>
                    </svg>
                   {p.file.name}
                </div>
                {/each}
            </div>
            {/if}
            </div>

                <!-- Ownership docs -->
                <div>
                <label for="docInput" class="block text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Ownership documents</label>
                <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">C of O, Survey, Receipt of purchase etc. Documents are kept private and only visible to verified buyers.</p>
                <div class="upload-zone" 
                    id="docZone" 
                    onclick={() => pOwnerDocuments.click()} 
                    ondragover={dragOver}
                    ondragleave={dragLeave}
                    ondrop={(e) => dropFiles(e, 'docs')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round" class="mx-auto mb-2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Upload ownership documents (PDF)</p>
                    <input type="file" 
                        bind:this={pOwnerDocuments} 
                        id="docInput" 
                        class="hidden" 
                        multiple 
                        accept=".pdf,image/*" 
                        onchange={handleOwnerDocUploads} />
                </div>

                {#if previewOwnerDocs.length > 0}
                <div id="docPreviews" class="flex flex-wrap gap-2 mt-2">
                {#each previewOwnerDocs as p}
                <div class="flex items-center gap-1.5 text-[11px] text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-lg px-2.5 py-1.5 tt">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none" stroke="#8C8070" stroke-width="1.3">
                        <path d="M2 2h7l3 3v7a1 1 0 01-1 1H2a1 1 0 01-1-1V3a1 1 0 011-1z"></path>
                    </svg>
                   {p.file.name}
                </div>
                {/each}
                </div>
                {/if}
            </div>
        </div><!-- /panel4 -->
        {/if}

        {#if step === 5}
        <!-- ══ STEP 5: PREVIEW ══ -->
        <div class="step-panel active fu" id="panel5">
            <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Listing preview</h2>
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">This is how your property will appear to buyers. Review everything before going live.</p>
    
            <!-- Preview card -->
            <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl overflow-hidden tt mb-6 shadow-[0_4px_24px_rgba(10,36,99,.06)]">
    
            <!-- Preview image -->
            <div class="relative h-[220px] sm:h-[260px] sky-1 overflow-hidden" id="previewImageArea">
                <!-- Building illustration placeholder -->
                <div class="absolute inset-0 flex items-end justify-center pb-4">
                <div style="position:relative;width:260px;height:180px">
                    <div style="position:absolute;bottom:0;left:20px;width:90px;height:120px;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:30px;bottom:90px"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:50px;bottom:90px"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:30px;bottom:62px"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:50px;bottom:62px"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:30px;bottom:35px"></div>
                    <div style="position:absolute;bottom:0;left:150px;width:62px;height:76px;background:rgba(255,255,255,.1);border-radius:4px 4px 0 0"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.65);border-radius:2px;width:10px;height:13px;left:158px;bottom:52px"></div>
                    <div style="position:absolute;background:rgba(212,174,58,.65);border-radius:2px;width:10px;height:13px;left:174px;bottom:52px"></div>
                </div>
                </div>
                <!-- Tags -->
                <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
                <span class="preview-badge bg-ember-light text-ember-deep" id="prev-upfor">For Sale</span>
                <span class="preview-badge bg-[#E8EDF5] text-navy-strong" id="prev-upfor">For Rent</span>
                <span class="preview-badge bg-sage-light text-sage" id="prev-virtual-badge">Virtual tour</span>
                </div>
                <p class="absolute bottom-4 right-4 text-[11px] text-white/50 italic">Preview — add photos in step 4</p>
            </div>
    
            <!-- Preview body -->
            <div class="px-6 py-5">
                <div class="font-display text-[24px] font-semibold text-navy-dark dark:text-blue-100 mb-1" id="prev-price">₦ 8,700,000</div>
                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1" id="prev-title">3 Bedroom flat</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5 mb-4">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/></svg>
                <span id="prev-address">No. 50 fox road, Lagos state</span>
                </div>
    
                <!-- Key stats -->
                <div class="flex gap-4 pb-4 border-b border-chalk-3 dark:border-white/[.07] mb-4 flex-wrap">
                <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/><path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <span id="prev-beds">1 bedroom</span>
                </div>
                <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M2 9h12M2 9v3a1 1 0 001 1h10a1 1 0 001-1V9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                    <span id="prev-baths">2 bathrooms</span>
                </div>
                <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/></svg>
                    <span id="prev-size">949 m²</span>
                </div>
                <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M1 9h4l3-7 3 14 3-9 2 2h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    <span id="prev-type">Detached house</span>
                </div>
                </div>
    
                <!-- Description preview -->
                <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] mb-4 line-clamp-3" id="prev-desc">
                    Your property description will appear here once entered in step 1.
                </p>
    
                <!-- Selected amenities -->
                <div class="flex flex-wrap gap-1.5" id="prev-amenities">
                {#if Object.keys(amenities).some((k) => amenities[k as keyof typeof amenities])}
                {@const validAmenities = Object.keys(amenities).filter((a) => amenities[a as keyof typeof amenities])}
                {#each validAmenities as a}
                <span class="uppercase text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">
                    {a}
                </span>
                {/each}
                {:else}
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] italic">
                    No amenities selected yet
                </span>
                {/if}
                </div>
            </div>
            </div>
    
            <!-- Review checklist -->
            <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-2xl p-5 tt mb-6">
                <div class="text-[11px] font-medium tracking-[.1em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Pre-launch checklist</div>
                <div class="space-y-2.5" id="checklist">
            <div class="flex items-center gap-2.5">
              <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sage">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <span class="text-[13px] text-navy-dark dark:text-blue-100">Property title added</span>
            </div>
          
            <div class="flex items-center gap-2.5">
              <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sage">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <span class="text-[13px] text-navy-dark dark:text-blue-100">Address and state set</span>
            </div>
          
            <div class="flex items-center gap-2.5">
              <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sage">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <span class="text-[13px] text-navy-dark dark:text-blue-100">Description entered</span>
            </div>
          
            <div class="flex items-center gap-2.5">
              <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sage">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
              </div>
              <span class="text-[13px] text-navy-dark dark:text-blue-100">Price set</span>
            </div>
          
            <div class="flex items-center gap-2.5">
              <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 border border-chalk-3 dark:border-white/[.1]">
                
              </div>
              <span class="text-[13px] text-chalk-muted dark:text-[#6A7FA0]">At least 3 photos uploaded</span>
            </div>
          
                <div class="flex items-center gap-2.5">
                <div class="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-sage">
                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                </div>
                <span class="text-[13px] text-navy-dark dark:text-blue-100">Amenities selected</span>
                </div>
            </div>
            </div>
    
            <!-- Edit step buttons -->
            <div class="flex flex-wrap gap-2 mb-6">
            {#each steps as s, index}
            <!-- Avoid showing the last step as shortcut -->
            {#if index !== steps.length - 1}
            <button onclick={() => setStep(s.step)} 
                class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-4 py-2 rounded-full cursor-pointer bg-transparent tt">
                Edit {s.label}
            </button>
            {/if}
            {/each}
            </div>
        </div><!-- /panel5 -->
        {/if}

    </div> <!----<Form Area-->

    <!-- STICKY BOTTOM NAV BUTTONS -->
    <div class="w-full z-30 bg-white dark:bg-[#0D1422] border-t border-chalk-3 dark:border-white/[.07] px-4 sm:px-6 py-4 tt flex justify-center">
        <div class="w-full max-w-[1200px] flex items-center justify-between gap-3 flex-wrap">
        
        <div class="flex items-center gap-3">
            {#if step > 1}
            <button id="prevBtn" onclick={() => setStep(step - 1)} class="flex items-center gap-2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-5 py-[10px] rounded-full cursor-pointer bg-transparent tt">
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back
            </button>
            {/if}
    
            <span class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]" id="stepCounter">
            Step {step} of 5
            </span> 
        </div>
    
        <div class="flex items-center gap-3">
            {#if step === 5}
            <!-- Save & update button (only on step 5) -->
            <button id="goLiveBtn" onclick={goLive} class="flex items-center gap-2 text-[13px] font-medium text-white bg-sage hover:bg-[#3a6038] px-6 py-[10px] rounded-full border-none cursor-pointer tt">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M13 8A5 5 0 118 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M8 1l3 2-3 2V1z" fill="currentColor"/></svg>
            Go live
            </button>
            {:else}
            <button id="nextBtn" onclick={() => setStep(step + 1)} class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-6 py-[10px] rounded-full border-none cursor-pointer tt">
            Continue
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            {/if}
        </div>
    
        </div>
    </div>

    </main>
</div>

<style>
    /* ── core tokens ── */
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .48s ease both}
    .d1{animation-delay:.05s}.d2{animation-delay:.1s}.d3{animation-delay:.15s}.d4{animation-delay:.2s}.d5{animation-delay:.25s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .24s cubic-bezier(.22,.68,0,1.2) both}
    @keyframes growW{from{width:0}to{width:var(--w)}}
    .grow-w{animation:growW .8s cubic-bezier(.34,1.2,.64,1) .2s both}
    
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active,
    :global([data-theme="dark"]) .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover,
    :global([data-theme="dark"]) .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* form inputs */
    .inp{background:#fff;border:1.5px solid #EDE7DC;border-radius:10px;padding:10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;color:#0A2463;outline:none;width:100%;transition:border-color .2s,background .3s,box-shadow .2s}
    .inp:focus{border-color:rgba(74,144,226,.55);box-shadow:0 0 0 3px rgba(74,144,226,.08)}
    .dark .inp,
    :global([data-theme="dark"]) .inp{background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    .inp::placeholder{color:#8C8070}
    .dark .inp::placeholder,
    :global([data-theme="dark"]) .inp::placeholder{color:#4A5568}
    .inp.error{border-color:rgba(192,96,53,.6)!important;box-shadow:0 0 0 3px rgba(192,96,53,.07)!important}
    .inp.valid{border-color:rgba(74,120,72,.55)!important}
    
    /* select wrapper */
    .sel-wrap{position:relative}
    .sel-wrap::after{content:'▾';position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .sel-wrap::after,
    :global([data-theme="dark"]) .sel-wrap::after{color:#6A7FA0}
    
    /* stepper */
    .step-node.done{background:#0A2463;border-color:#0A2463;color:#fff}
    .dark .step-node.done,
    :global([data-theme="dark"]) .step-node.done{background:#4A90E2;border-color:#4A90E2}
    .step-node.active{background:#fff;border-color:#0A2463;color:#0A2463;box-shadow:0 0 0 4px rgba(10,36,99,.12)}
    .dark .step-node.active,
    :global([data-theme="dark"]) .step-node.active{background:#131C2E;border-color:#4A90E2;color:#4A90E2;box-shadow:0 0 0 4px rgba(74,144,226,.15)}
    .step-node{background:#F7F3EC;border:2px solid #EDE7DC;color:#8C8070;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:600;flex-shrink:0;transition:all .3s;font-family:'DM Sans',sans-serif}
    .dark .step-node,
    :global([data-theme="dark"]) .step-node{background:#1A2438;border-color:rgba(255,255,255,.12);color:#6A7FA0}
    .step-line{flex:1;height:2px;background:#EDE7DC;transition:background .4s;min-width:12px}
    .dark .step-line,
    :global([data-theme="dark"]) .step-line{background:rgba(255,255,255,.08)}
    .step-line.done{background:#0A2463}
    .dark .step-line.done,
    :global([data-theme="dark"]) .step-line.done{background:#4A90E2}
    .step-label{font-size:11px;font-family:'DM Sans',sans-serif;font-weight:400;color:#8C8070;margin-top:5px;white-space:nowrap;transition:color .3s}
    .dark .step-label,
    :global([data-theme="dark"]) .step-label{color:#6A7FA0}
    .step-label.active{color:#0A2463;font-weight:500}
    .dark .step-label.active,
    :global([data-theme="dark"]) .step-label.active{color:#4A90E2}
    .step-label.done{color:#0A2463}
    .dark .step-label.done,
    :global([data-theme="dark"]) .step-label.done{color:#4A90E2}
    
    /* progress bar */
    .prog-bar{background:#EDE7DC;height:4px;border-radius:2px;overflow:hidden}
    .dark .prog-bar,
    :global([data-theme="dark"]) .prog-bar{background:rgba(255,255,255,.08)}
    .prog-fill{height:100%;background:#0A2463;border-radius:2px;transition:width .5s cubic-bezier(.34,1.2,.64,1)}
    .dark .prog-fill,
    :global([data-theme="dark"]) .prog-fill{background:#4A90E2}
    
    /* up-for toggle */
    .upfor-btn{flex:1;text-align:center;font-size:13px;font-weight:500;padding:10px 0;border-radius:10px;border:1.5px solid #EDE7DC;background:transparent;color:#8C8070;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s}
    .upfor-btn.active{background:#0A2463;color:#fff;border-color:#0A2463}
    .dark .upfor-btn,
    :global([data-theme="dark"]) .upfor-btn{border-color:rgba(255,255,255,.1);color:#6A7FA0}
    .dark .upfor-btn.active,
    :global([data-theme="dark"]) .upfor-btn.active{background:#4A90E2;border-color:#4A90E2;color:#fff}
    
    /* amenity card */
    .am-card{border:1.5px solid #EDE7DC;border-radius:14px;padding:14px 16px;display:flex;align-items:center;gap:10px;cursor:pointer;transition:all .22s;background:transparent;font-family:'DM Sans',sans-serif;text-align:left;width:100%}
    .am-card:hover{border-color:rgba(74,144,226,.45);background:rgba(74,144,226,.04)}
    .am-card.active{border-color:#0A2463;background:rgba(10,36,99,.06);color:#0A2463}
    .dark .am-card,
    :global([data-theme="dark"]) .am-card{border-color:rgba(255,255,255,.1)}
    .dark .am-card:hover,
    :global([data-theme="dark"]) .am-card:hover{border-color:rgba(74,144,226,.45);background:rgba(74,144,226,.06)}
    .dark .am-card.active,
    :global([data-theme="dark"]) .am-card.active{border-color:#4A90E2;background:rgba(74,144,226,.1);color:#4A90E2}
    .am-icon{width:36px;height:36px;border-radius:10px;background:#F7F3EC;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:background .2s}
    .dark .am-icon,
    :global([data-theme="dark"]) .am-icon{background:#1A2438}
    .am-card.active .am-icon{background:rgba(10,36,99,.1)}
    .dark .am-card.active .am-icon,
    :global([data-theme="dark"]) .am-card.active .am-icon{background:rgba(74,144,226,.18)}
    .am-check{width:18px;height:18px;border-radius:50%;border:1.5px solid #D8CEBC;margin-left:auto;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:all .2s}
    .dark .am-check,
    :global([data-theme="dark"]) .am-check{border-color:rgba(255,255,255,.15)}
    .am-card.active .am-check{background:#0A2463;border-color:#0A2463}
    .dark .am-card.active .am-check,
    :global([data-theme="dark"]) .am-card.active .am-check{background:#4A90E2;border-color:#4A90E2}
    
    /* upload zone */
    .upload-zone{border:2px dashed #D8CEBC;border-radius:16px;padding:32px 20px;text-align:center;cursor:pointer;transition:all .2s}
    .upload-zone:hover,.upload-zone.drag-over{border-color:#4A90E2;background:rgba(74,144,226,.04)}
    .dark .upload-zone,
    :global([data-theme="dark"]) .upload-zone{border-color:rgba(255,255,255,.1)}
    .dark .upload-zone:hover,
    .dark .upload-zone.drag-over,
    :global([data-theme="dark"]) .upload-zone:hover,
    :global([data-theme="dark"]) .upload-zone.drag-over{border-color:#4A90E2;background:rgba(74,144,226,.06)}
    
    /* photo thumb */
    .photo-thumb{width:80px;height:80px;border-radius:10px;object-fit:cover;border:1.5px solid #EDE7DC}
    .dark .photo-thumb,
    :global([data-theme="dark"]) .photo-thumb{border-color:rgba(255,255,255,.1)}
    .thumb-wrap{position:relative;display:inline-block}
    .thumb-remove{position:absolute;top:-6px;right:-6px;width:18px;height:18px;border-radius:50%;background:#C06035;color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;line-height:1;transition:background .15s}
    .thumb-remove:hover{background:#5C2416}
    
    /* additional cost row */
    .cost-row{display:flex;gap:8px;align-items:center;margin-bottom:8px}
    
    /* virtual tooltip */
    .tooltip-text{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);background:#0A2463;color:#fff;font-size:11px;line-height:1.5;padding:8px 12px;border-radius:10px;width:220px;text-align:center;pointer-events:none;white-space:normal;z-index:50;opacity:0;transition:opacity .2s;font-family:'DM Sans',sans-serif}
    .dark .tooltip-text,
    :global([data-theme="dark"]) .tooltip-text{background:#4A90E2}
    .tooltip-text::after{content:'';position:absolute;top:100%;left:50%;transform:translateX(-50%);border:5px solid transparent;border-top-color:#0A2463}
    .dark .tooltip-text::after,
    :global([data-theme="dark"]) .tooltip-text::after{border-top-color:#4A90E2}
    .tooltip-wrap:hover .tooltip-text{opacity:1}
    
    /* virtual toggle */
    .virt-card{border:1.5px solid #EDE7DC;border-radius:16px;padding:16px 18px;cursor:pointer;transition:all .22s}
    .virt-card:hover{border-color:rgba(74,144,226,.4)}
    .virt-card.active{border-color:#0A2463;background:rgba(10,36,99,.04)}
    .dark .virt-card,
    :global([data-theme="dark"]) .virt-card{border-color:rgba(255,255,255,.1)}
    .dark .virt-card:hover,
    :global([data-theme="dark"]) .virt-card:hover{border-color:rgba(74,144,226,.4)}
    .dark .virt-card.active,
    :global([data-theme="dark"]) .virt-card.active{border-color:#4A90E2;background:rgba(74,144,226,.07)}
    
    /* step panel */
    .step-panel{display:none}
    .step-panel.active{display:block}
    
    /* preview card */
    .preview-badge{font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:.07em;padding:3px 10px;border-radius:20px}
    
    /* save draft indicator */
    @keyframes saveSpin{to{transform:rotate(360deg)}}
    .save-spin{animation:saveSpin .8s linear infinite}
    
    /* toast */
    #toast{transition:opacity .3s,transform .3s}
    
    /* address suggestions */
    .addr-suggestion{padding:10px 14px;cursor:pointer;font-size:13px;color:#0A2463;transition:background .15s;border-bottom:1px solid #EDE7DC;font-family:'DM Sans',sans-serif}
    .dark .addr-suggestion,
    :global([data-theme="dark"]) .addr-suggestion{color:#E8EDF5;border-bottom-color:rgba(255,255,255,.07)}
    .addr-suggestion:hover{background:#F7F3EC}
    .dark .addr-suggestion:hover,
    :global([data-theme="dark"]) .addr-suggestion:hover{background:rgba(255,255,255,.04)}
    .addr-suggestion:last-child{border-bottom:none}
    
    /* counter input */
    .cnt-btn{width:34px;height:34px;border-radius:8px;border:1.5px solid #EDE7DC;background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;color:#0A2463;transition:all .18s;flex-shrink:0;font-family:'DM Sans',sans-serif}
    .cnt-btn:hover{border-color:#0A2463;background:rgba(10,36,99,.06)}
    .dark .cnt-btn,
    :global([data-theme="dark"]) .cnt-btn{border-color:rgba(255,255,255,.1);color:#E8EDF5}
    .dark .cnt-btn:hover,
    :global([data-theme="dark"]) .cnt-btn:hover{border-color:#4A90E2;background:rgba(74,144,226,.08)}
    
    /* field error msg */
    .field-err{font-size:11px;color:#C06035;margin-top:4px;display:none}
    .field-err.show{display:block}
    
    @media(max-width:768px){
      .hide-md{display:none!important}
    }
    @media(max-width:640px){
      .hide-sm{display:none!important}
      .step-label{font-size:9px}
      .step-node{width:26px;height:26px;font-size:11px}
    }
</style>