<script lang="ts">
  import { onMount } from "svelte";
  import { AxiosError } from "axios";
  import { goto } from "$app/navigation";
  import { capitalize, isEmpty, toLower, toUpper } from "lodash-es";
  import type { PageData } from "./$types";
  import { ApiRequests } from "$lib/api/api.request";
  import type { PFileType, ToastType } from "$lib/types";
  import Toast from "$lib/components/shared/Toast.svelte";
  import type { ExtraFee, GeoPoint } from "$lib/api/type.dto";
  import AmenityIcon from "$lib/components/shared/AmenityIcon.svelte";
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";
  import PrelaunchChecklist from "$lib/components/agency/add-listing/PrelaunchChecklist.svelte";
  import SuccessNotification from "$lib/components/agency/add-listing/SuccessNotification.svelte";
  import { cleanObject, currencyFormatter, generatePreviewUrls, getAmenityNames, getErrorMessage, getListingType, toFileArray } from "$lib/utils";
  import { ListingFor, ListingMediaType, ListingPaymentDuration, ListingResponseStatus, PropertyCategory, RegionScope } from "$lib/utils/constant";

  type ListingForm = {
    paymentPeriod: string;
    regionScope: string;
    title: string;
    description: string;
    listingTypeId: string;
    agencyId: string;
    geoPoint: GeoPoint;
    stateName :string;
    cityName: string;
    countryName: string;
    priceAmount: number;
    extraFees: ExtraFee[];
    bedrooms: number;
    toilets: number;
    sizeSqm: number;
    requirements: string[];
    amenities: string[]
    isBrandNew: boolean;
    photoIds: string[],
    videoId: string;
    archPlanIds: string[];
    priceCurrency: string;
    broadbandMbps: number;
    listingFor: string;
    hasVirtualTour: boolean;
    address: string;
  };

    // Files
    let pPhotos: HTMLInputElement;
    let pVideo: HTMLInputElement;
    let pArchPlans: HTMLInputElement;

    let previewPhotos = $state<PFileType[]>([]);
    let previewVideo = $state<PFileType>();
    let previewArchPlans = $state<PFileType[]>([]);

    let isPhotoDragging = $state(false);

    let step = $state(1);
    const steps = [
        {label: 'basics', step: 1 }, 
        {label:'pricing', step: 2}, 
        {label: 'amenities', step: 3 },
        {label:'files', step: 4 },
        {label:'preview', step: 5 }
    ];

    const setListingFormField = <K extends keyof ListingForm>(
        field: K,
        value: ListingForm[K]
    ) => {
	  listingFormData[field] = value;
    };

    let { data }: { data: PageData } = $props();

    const agency = $derived(data.agency.data);
    const states = $derived(data.states.data);
    const currencies = $derived(data.currencies.data);
    const countryIp = $derived(data.countryIp.data);
    const listingTypes = $derived<any[]>(data.listingTypes.data);
    const listingAmenities = $derived<any[]>(data.amenities.data);

    let listingFormData = $state<ListingForm>({  //  
        regionScope: countryIp.bpRegion ?? RegionScope.WEST_AFRICA,
        title: '',
        description: '',
        address: '',
        agencyId: '', // preset from local_storage
        amenities: [],
        requirements: ['curfew'],
        archPlanIds: [],
        bedrooms: 0,
        broadbandMbps: 0,
        cityName: '',
        countryName: '',
        extraFees: [{ label: 'Agency fee', amount: 0 }],
        geoPoint: { latitude: 0, longitude: 0 },
        hasVirtualTour: true,
        isBrandNew: false,
        listingTypeId: '',
        photoIds: [],
        priceAmount: 0,
        sizeSqm: 0,
        stateName: '',
        toilets: 0,
        videoId: '',
        priceCurrency: countryIp.currency ?? '',
        listingFor: ListingFor.RENT,
        paymentPeriod: ListingPaymentDuration.MONTHLY,
    });
    const prelaunchList = $derived([
        { condition: !!listingFormData.title, label: 'Property title added' },
	    { condition: !!(listingFormData.address && listingFormData.stateName), label: 'Address and state set' },
	    { condition: !!listingFormData.description, label: 'Description entered' },
	    { condition: !!listingFormData.priceAmount, label: 'Price set' },
	    { condition: listingFormData.photoIds.length >= 3, label: 'At least 3 photos uploaded' },
	    { condition: listingFormData.amenities.length >= 1, label: 'Amenities selected' },
    ]);
    let listingObject = $state<any>();
    let listingSuccessStatus = $state<ListingResponseStatus | null>();

    let sizeSqm = $state(String(listingFormData.sizeSqm));
    let broadbandMbps = $state(String(listingFormData.broadbandMbps));
    let addressSelections = $state<any[]>([]);


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
  };

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
    else if (type === 'plans') {
        for (const file of Array.from(files)) {

        previewArchPlans.push({
          file,
          preview: URL.createObjectURL(file),
        });
      }
    }
  }

    const handleAddressInput = (address: string) => {
        setTimeout(async () => {
            const result = await new ApiRequests().autocompleteAddress(address);
            if (result.data.success) {
                addressSelections = result.data.data;
            }
        }, 3000);
    }

    const onAddressSelect = (addressObject: any) => {
        setListingFormField('countryName', addressObject.country);
        setListingFormField('stateName', toLower(addressObject.state));
        setListingFormField('address', addressObject.formattedAddress);

        const { geolocation } = addressObject;
        setListingFormField('geoPoint', {
            latitude: +geolocation.latitude,
            longitude: +geolocation.longitude,
        });
        if (!isEmpty(addressObject.city)) {
            setListingFormField('cityName', addressObject.city);
        }

        addressSelections = [];
    }

    const updateExtraFees = () => {
        setListingFormField('extraFees', [...listingFormData.extraFees]);
    }

    onMount(async () => {
        if (countryIp.bpRegion === RegionScope.WEST_AFRICA) {
            goto('/agency/listing/add');
            return;
        }

        // preset agency id as constant
        setListingFormField('agencyId', agency.id);
    });

    let amenitiesById = $derived(new Map(listingAmenities.map((a) => [a.id, a])));
    let selectedNames = $derived(getAmenityNames(listingFormData.amenities, amenitiesById));

    // Track selected listingType object
    let listingTypeById = $derived(new Map(listingTypes.map((a) => [a.id, a])));
    let selectedListingType = $derived(getListingType(listingFormData.listingTypeId, listingTypeById));

    const toggleAmenity = (amenityId: string) => {
        const currentAmenities = listingFormData.amenities;
        
        const updatedAmenities = currentAmenities.includes(amenityId)
		? currentAmenities.filter((id) => id !== amenityId)
		: [...currentAmenities, amenityId]

        // remove duplicates & set value
        setListingFormField('amenities', [...new Set(updatedAmenities)]);
    };

    const setCount = (key: 'bedrooms' | 'toilets', value: number) => {
        if (value >= 0) setListingFormField(key, value)
    };

    const addCostRow = () => {
        listingFormData.extraFees.push({ label: '', amount: 0 });
        updateExtraFees();
    };

    const removeCostRow  = (indexToRemove: number) => {
        const newList = listingFormData.extraFees.filter((_, index) => index !== indexToRemove)
        setListingFormField('extraFees', newList);
        updateExtraFees();
    }

    const updateRequirements = () => {
        setListingFormField('requirements', [...listingFormData.requirements]);
    }

    const addRequirementRow = () => {
        listingFormData.requirements.push('');
        updateRequirements();
    }

    const removeRequirementRow = (indexToRemove: number) => {
        const newList = listingFormData.requirements.filter((_, index) => index !== indexToRemove);
        setListingFormField('requirements', newList);
        updateRequirements();
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

    const handleVideoUpload = async () => {
        const files = pVideo?.files;
        if (!files || files.length <= 0) {
            showToast('Please upload a listing video', 'error');
            return;
        }

        const file = files[0];

        const previewResult = generatePreviewUrls([file] as any);
        if (previewResult) {
            previewVideo = previewResult[0]
        }

        try {
            // upload to cloud
            const result = await new ApiRequests().uploadMedia([file], ListingMediaType.VIDEO);
            if (result.data.success) {
                // set to state
                const videoIds = (result.data.data as any[]).map(({ id }) => id);
                setListingFormField('videoId', videoIds[0]);
            }

        } catch (ex) {
            if (ex instanceof AxiosError) {
                const message = getErrorMessage(ex);
                showToast(message, 'error');
            }
            return;
        }
    }
    
    const handleImageUploads = async () => {
        const files = pPhotos?.files;
        if (!files || files.length < 3) {
            showToast('Please upload at least 3 images', 'error');
            return;
        }

        // convert FileList to File[]
        const fileArray = toFileArray(files);

        // create preview urls
        previewPhotos = generatePreviewUrls(fileArray as any);
      
        try {
            // upload to cloud
            const result = await new ApiRequests().uploadMedia(fileArray, ListingMediaType.PHOTO);
            if (result.data.success) {
                // set to state
                const photoIds = (result.data.data as any[]).map(({ id }) => id);
                setListingFormField('photoIds', photoIds);
            }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                const message = getErrorMessage(ex);
                showToast(message, 'error');
            }
            return;
        }
    }

    const handleArchPlanUploads = async () => {
        const files = pArchPlans?.files;
        if (!files || files.length === 0) {
            showToast('Please upload at least 1 plan', 'error');
            return;
        }

        // convert FileList to File[]
        const fileArray = toFileArray(files);

        // create preview urls
        previewArchPlans = generatePreviewUrls(fileArray as any);

        try {
            // upload to cloud
            const result = await new ApiRequests().uploadMedia(fileArray, ListingMediaType.ARCH_PLANS);
            if (result.data.success) {
                // set to state
                const planIds = (result.data.data as any[]).map(({ id }) => id);
                setListingFormField('archPlanIds', planIds);
            }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                const message = getErrorMessage(ex);
                showToast(message, 'error');
            }
            return;
        }
    }

    const setStep = (value: number) => {
        if (value <= 5) step = value
    };

    const saveDraft = () => {
        // send to backend and prefill if agent comes back
    }

    const clearForm = () => {
        listingFormData = {  //  
            regionScope: countryIp.bpRegion ?? RegionScope.WEST_AFRICA,
            title: '',
            description: '',
            address: '',
            agencyId: '', // preset from local_storage
            amenities: [],
            requirements: ['curfew'],
            archPlanIds: [],
            bedrooms: 0,
            broadbandMbps: 0,
            cityName: '',
            countryName: '',
            extraFees: [{ label: 'Agency fee', amount: 0 }],
            geoPoint: { latitude: 0, longitude: 0 },
            hasVirtualTour: true,
            isBrandNew: false,
            listingTypeId: '',
            photoIds: [],
            priceAmount: 0,
            sizeSqm: 0,
            stateName: '',
            toilets: 0,
            videoId: '',
            priceCurrency: countryIp.currency ?? '',
            listingFor: ListingFor.RENT,
            paymentPeriod: ListingPaymentDuration.MONTHLY,
        };
    };

    // Toast
    let toastMsg     = $state('');
    let toastType = $state<ToastType>('info');
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    // ── Toast ──────────────────────────────────────────────────────────────────
    const showToast = (msg: string, type: ToastType) => {
      toastMsg = msg;
      toastType = type;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastMsg = '', 3000);
    };

    const handleSubmit = async (e: SubmitEvent) => {
        e.preventDefault();

        if (isEmpty(listingFormData.videoId)) {
            showToast('Please upload a listing video', 'error');
            return;
        }

        // Check if form is valid [all required fields filled out]
     
        const payload = cleanObject(listingFormData);

        try {
            // save listing
            const result = await new ApiRequests().createIntlListing(payload as any);
            if (result.data.success) {
                showToast(result.data.message, 'success');
                
                // clear form
                clearForm();

                // show success div
                listingObject = result.data.data;
                listingSuccessStatus = ListingResponseStatus[listingFormData.listingFor === ListingFor.SALE ? "AWAITING_CONFIRMATION" : "DRAFT"];
                return;
            }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                showToast(getErrorMessage(ex), 'error');
            }
            return;
        }
    };

    const publishListing = async () => {
        // Check if form is valid [all required fields filled out]

        const req = new ApiRequests();
        const payload = cleanObject(listingFormData);

        try {
            // save listing
            const result = await req.createIntlListing(payload as any);
            if (result.data.success) {
                const listingId = result.data.data.id;
                if (isEmpty(listingId)) {
                    const message = "Listing saved. Could not get listing_id..try publishing manually"
                    showToast(message, 'error');
                    // navigate to listing page
                    setTimeout(() => goto('/agency/listings'), 2000);
                    return;
                }

                // publish listing
                const publishResult = await req.publishListing(listingId);
                if (publishResult.data.success) {
                    showToast(publishResult.data.message, 'success');
                    
                    // clear form
                    clearForm();

                    // navigate to listing page
                    listingObject = result.data.data;
                    listingSuccessStatus = ListingResponseStatus.LIVE;
                    return;
                }
            }
        } catch (ex) {
            if (ex instanceof AxiosError) {
                showToast(getErrorMessage(ex), 'error');
            }
            return;
        }
    };
</script>

<!-- ══ LAYOUT SHELL ══ -->
<div class="flex pt-[68px] min-h-screen">
    <AgencySidebar />

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

        <form onsubmit={handleSubmit}>
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
                            <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Listed for <span class="text-ember">*</span></label>
                            <div class="flex gap-2">
                              <!-- <div onclick={() => setListingFormField('listingFor', ListingFor.RENT)} 
                                    class="upfor-btn active" 
                                    id="upfor-rent" 
                                    style="cursor:default">
                                For Rent
                               </div> -->
                               <button type="button" 
                                onclick={() => setListingFormField('listingFor', ListingFor.RENT)} 
                                class="upfor-btn active" 
                                id="upfor-rent" 
                                style="cursor:default">
                                For Rent
                                </button>
                            </div>
                            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">International agent listings are rental-only.</p>
                            <input type="hidden" id="upForVal" bind:value={listingFormData.listingFor} />
                        </div>

                        <div>
                            <label for="propertyType" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Property type <span class="text-ember">*</span></label>
                            <div class="sel-wrap">
                            <select id="propertyType" 
                                required
                                class="inp cursor-pointer pr-8" 
                                bind:value={listingFormData.listingTypeId}
                                onchange={(e) =>
                                    setListingFormField('listingTypeId', (e.currentTarget as HTMLSelectElement).value)
                                }
                                >
                                <option value="">Select property type</option>
                                {#each listingTypes as _}
                                    <option value={_.id}>{_.displayName}</option>
                                {/each}
                            </select>
                            </div>
                            <p class="field-err" id="err-propertyType">Please select a property type.</p>
                        </div>
                    </div>
            
                    <!-- Title -->
                    <div class="mb-5">
                    <label for="propTitle" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Listing title <span class="text-ember">*</span></label>
                    <input type="text"
                        bind:value={listingFormData.title}
                        oninput={(e) => setListingFormField("title", (e.target as HTMLInputElement).value)}
                        id="propTitle" 
                        class="inp" 
                        placeholder="e.g. Stunning 3-Bedroom Apartment in GRA Phase 2"
                        maxlength="120" 
                        required />
                    <div class="flex justify-between mt-1.5">
                        <p class="field-err show" id="err-title" style="display:none">Please enter a listing title.</p>
                        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] ml-auto" id="titleCount">0/120</span>
                    </div>
                    </div>

                    <!-- Address with suggestions -->
                    <div class="mb-5 relative">
                        <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Address <span class="text-ember">*</span></label>
                        <div class="relative">
                        <input type="text" 
                            required
                            bind:value={listingFormData.address}
                            id="propAddress" 
                            class="inp pr-10" 
                            placeholder="Start typing an address, closest landmark or area…" 
                            autocomplete="off" 
                            oninput={(e) => handleAddressInput((e.target as HTMLInputElement).value)}
                        />
                        <svg class="absolute right-3 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] pointer-events-none" width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1a5 5 0 015 5c0 4.5-5 9-5 9S3 10.5 3 6a5 5 0 015-5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><circle cx="8" cy="6" r="2" stroke="currentColor" stroke-width="1.4"/></svg>
                        </div>

                        {#if addressSelections.length > 0}
                        <div id="addrDropdown" class="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] rounded-xl shadow-[0_8px_32px_rgba(10,36,99,.12)] z-20 overflow-hidden tt">
                            {#each addressSelections as _}
                                <div class="addr-suggestion" onclick={(e) =>  onAddressSelect(_)}>
                                    {_.formattedAddress}
                                </div>
                            {/each}
                        </div>
                        {/if}
                        <p class="field-err" id="err-address">Please enter an address.</p>
                    </div>
            
                    <!-- State -->
                    <div class="mb-5">
                    <label for="propState" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">State <span class="text-ember">*</span></label>
                    <div class="sel-wrap">
                        <select id="propState" 
                            required
                            bind:value={listingFormData.stateName}
                            class="inp cursor-pointer pr-8" 
                            onchange={(e) =>
                                setListingFormField('stateName', (e.currentTarget as HTMLSelectElement).value)
                            }>
                        <option value="">Select state</option>
                        {#each states as state}
                        <option selected={state.name === listingFormData.stateName} value={state.name}>{capitalize(state.name)}</option>
                        {/each}
                        </select>
                    </div>
                    <p class="field-err" id="err-state">Please select a state.</p>
                    </div>
            
                    <!-- Description -->
                    <div class="mb-6">
                    <label for="propDesc" class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Description <span class="text-ember">*</span></label>
                    <textarea id="propDesc" 
                        required
                        class="inp resize-none leading-[1.7]" 
                        rows="5" 
                        placeholder="Describe the property in detail — neighbourhood, condition, standout features, nearby amenities…"
                        maxlength="1200"
                        bind:value={listingFormData.description}
                        oninput={(e) =>
                        setListingFormField(
                            'description',
                            (e.target as HTMLTextAreaElement).value
                        )
                        }></textarea>
                    <div class="flex justify-between mt-1.5">
                        <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Minimum 80 characters recommended</p>
                        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="descCount">0/1200</span>
                    </div>
                    <p class="field-err" id="err-desc">Please add a description (min 80 characters).</p>
                    </div>

                    <!-- Virtual viewing -->
                    <div class="mb-2">
                        <div class="flex items-center gap-2 mb-3">
                        <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Virtual viewing availability</label>
                        <!-- tooltip -->
                        <div class="tooltip-wrap relative flex-shrink-0">
                            <div class="w-4 h-4 rounded-full border border-chalk-4 dark:border-white/20 flex items-center justify-center cursor-default">
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4.5" stroke="#8C8070" stroke-width="1"/><path d="M5 4.5v3M5 3h.01" stroke="#8C8070" stroke-width="1" stroke-linecap="round"/></svg>
                            </div>
                            <div class="tooltip-text">Virtual tours let buyers book a video walkthrough from anywhere — standard for all international listings.</div>
                        </div>
                        </div>
                        <div class="grid grid-cols-1 gap-3">
                        <div class="virt-card active" 
                            id="virt-yes" 
                            style="cursor:default"
                            onclick={() => setListingFormField('hasVirtualTour', true)}>
                            <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-xl bg-sage-light dark:bg-sage/15 flex items-center justify-center flex-shrink-0">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#4A7848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.261a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
                            </div>
                            <div>
                                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Virtual tour available</div>
                                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Buyers can book a video walkthrough</div>
                            </div>
                            <div class="ml-auto w-5 h-5 rounded-full border-2 border-sage flex items-center justify-center flex-shrink-0 bg-sage">
                               {#if listingFormData.hasVirtualTour}
                               <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                                    <path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                               {/if}
                            </div>
                            </div>
                        </div>
                        </div>
                        <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-2">Virtual viewings are available for international listings.</p>
                        <input type="hidden" id="virtualVal" bind:value={listingFormData.hasVirtualTour} />
                    </div>
                </div><!-- /panel1 -->
                {/if}

                {#if step === 2}
                <!-- ══ STEP 2: PRICING & DETAILS ══ -->
                <div class="step-panel active fu" id="panel2">
                    <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Pricing &amp; details</h2>
                    <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">
                        Set accurate pricing to attract serious renters.
                    </p>

                    <!-- Price + Currency + Duration -->
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-1">
                        <div>
                        <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Rent price <span class="text-ember">*</span></label>
                        <div class="relative">
                            <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0]" id="priceCurrencySymbol">£</span>
                            <input type="number" 
                                required
                                id="propPrice" 
                                class="inp pl-7" 
                                placeholder="e.g. 850000" 
                                min="0" 
                                bind:value={listingFormData.priceAmount}
                                oninput={(e) => setListingFormField('priceAmount', Number((e.target as HTMLInputElement).value))} 
                            />
                        </div>
                        </div>
                        <div>
                        <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Base currency <span class="text-ember">*</span></label>
                        <div class="sel-wrap">
                            <select required
                                id="baseCurrency" 
                                class="inp cursor-pointer pr-8" 
                                bind:value={listingFormData.priceCurrency}
                                onchange={(e) =>
                                    setListingFormField('priceCurrency', (e.currentTarget as HTMLSelectElement).value)
                                }>
                                {#each currencies as _}
                                <option value={_.currency} data-symbol={_.currencySymbol}>
                                    {_.currency} — {_.currencySymbol} ({toUpper(_.name)})
                                </option>
                                {/each}
                            </select>
                        </div>
                        </div>
                        <div>
                        <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">Payment period <span class="text-ember">*</span></label>
                        <div class="sel-wrap">
                            <select required
                                id="paymentDuration" 
                                class="inp cursor-pointer pr-8"
                                bind:value={listingFormData.paymentPeriod}
                                onchange={(e) =>
                                    setListingFormField('paymentPeriod', (e.currentTarget as HTMLSelectElement).value)
                                }>
                                <option value="">Select payment period</option>
                                {#each Object.values(ListingPaymentDuration) as _}
                                <option value={_}>{capitalize(_)}</option>
                                {/each}
                            </select>
                        </div>
                        </div>
                    </div>
            
                    <!-- Agency + Size -->
                    <div class="grid grid-cols-1 gap-5 mb-5">
                    <div>
                        <label for="propSize" 
                            class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">
                            Size (m²)
                        </label>
                        <input type="number" 
                            id="propSize" 
                            class="inp" 
                            placeholder="e.g. 110" 
                            min="0" 
                            bind:value={sizeSqm}
                            oninput={(e) => setListingFormField('sizeSqm', Number(sizeSqm))}
                        />
                    </div>
                    </div>

                    {#if selectedListingType && selectedListingType.propertyCategory === PropertyCategory.RESIDENTIAL}
                    <!-- Room counters -->
                    <div class="bg-chalk-2 dark:bg-[#131C2E] rounded-2xl p-5 mb-5 tt">
                        <div class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-4">Room counts</div>
                        <div class="grid grid-cols-2 gap-4">
                        <div>
                            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2 text-center">Bedrooms</div>
                            <div class="flex items-center justify-center gap-2">
                            <button type="button" 
                                class="cnt-btn" 
                                onclick={() => setCount('bedrooms', listingFormData.bedrooms - 1)}
                            >
                                −
                            </button>
                            <span class="text-[16px] font-medium text-navy-dark dark:text-blue-100 min-w-[28px] text-center" id="val-bedrooms">
                                {listingFormData.bedrooms}
                            </span>
                            <button type="button" 
                                class="cnt-btn" 
                                onclick={() => setCount('bedrooms', listingFormData.bedrooms + 1)}>
                                +
                            </button>
                            </div>
                            <input type="hidden" id="noOfBedrooms" bind:value={listingFormData.bedrooms} />
                        </div>
                        <div>
                            <div class="text-[12px] font-medium text-navy-dark dark:text-blue-100 mb-2 text-center">Toilets</div>
                            <div class="flex items-center justify-center gap-2">
                            <button type="button" 
                                class="cnt-btn" 
                                onclick={() => setCount('toilets', listingFormData.toilets - 1)}>
                                −
                            </button>
                            <span class="text-[16px] font-medium text-navy-dark dark:text-blue-100 min-w-[28px] text-center" id="val-toilets">
                                {listingFormData.toilets}
                            </span>
                            <button type="button" 
                                class="cnt-btn" 
                                onclick={() => setCount('toilets', listingFormData.toilets + 1)}>
                                +
                            </button>
                            </div>
                            <input type="hidden" id="noOfToilets" bind:value={listingFormData.toilets}>
                        </div>
                        </div>
                    </div>
                    {/if}
            
                    <!-- Broadband -->
                    <div class="mb-5">
                    <label for="broadband" 
                        class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2">
                        Average broadband speed (Mbps)
                    </label>
                    <input type="number" 
                        id="broadband" 
                        class="inp" 
                        placeholder="e.g. 50" 
                        min="0" 
                        max="10000" 
                        bind:value={broadbandMbps}
                        oninput={(e) =>setListingFormField('broadbandMbps', Number(broadbandMbps))}
                    />
                    <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">
                        Leave blank if unknown. This improves search visibility for remote workers.
                    </p>
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
                            {#each listingFormData.extraFees as row, index}
                            <div class="cost-row" id="cost-{index}">
                                <input type="text" 
                                    class="inp flex-1" 
                                    placeholder="Cost name (e.g. Agency fee)" 
                                    bind:value={row.label}/>
                                <div class="relative" style="width:140px;flex-shrink:0">
                                <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[13px] text-chalk-muted dark:text-[#6A7FA0] pointer-events-none">₦</span>
                                <input type="number" 
                                    class="inp pl-7" 
                                    placeholder="Amount" 
                                    min="0" 
                                    bind:value={row.amount}
                                    oninput={updateExtraFees} 
                                />
                                </div>
                                <button aria-label="Remove cost" 
                                    type="button" 
                                    onclick={() => removeCostRow(index) } 
                                    class="w-8 h-8 rounded-lg border border-chalk-3 dark:border-white/[.1] flex items-center justify-center cursor-pointer hover:border-ember hover:text-ember tt bg-transparent text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path>
                                    </svg>
                                </button>
                            </div>
                            {/each}
                        </div>
                        <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] italic" id="noCosts">No additional costs added yet.</div>
                    </div>

                     <!-- Requirements -->
                     <div class="mt-5">
                        <div class="flex items-center justify-between mb-3">
                        <label class="block text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0]">Requirements</label>
                        <button onclick={addRequirementRow} 
                            type="button" 
                            class="flex items-center gap-1.5 text-[12px] font-medium text-blue-link hover:text-navy-dark dark:hover:text-blue-bright tt bg-transparent border-none cursor-pointer p-0">
                            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                            </svg>
                            Add requirement
                        </button>
                        </div>
                        <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">Add any building rules or landlord instructions that every tenant must follow (e.g. curfew, generator restrictions, washing machine restrictions, visitor policies, etc.).</p>
                        <div id="requirementsContainer">
                            {#each listingFormData.requirements as row, index}
                            <div class="cost-row">
                                <input type="text"
                                    bind:value={listingFormData.requirements[index]} 
                                    oninput={updateRequirements}
                                    required
                                    class="inp flex-1" 
                                    placeholder="Requirement (e.g. Curfew by 10 PM)" 
                                />
                                <button onclick={() => removeRequirementRow(index) } 
                                    type="button"  
                                    aria-label="Remove requirement" 
                                    class="w-8 h-8 rounded-lg border border-chalk-3 dark:border-white/[.1] flex items-center justify-center cursor-pointer hover:border-ember hover:text-ember tt bg-transparent text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">
                                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                    </svg>
                                </button>
                            </div>
                            {/each}
                        </div>
                        {#if listingFormData.requirements.length <= 0}
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] italic" id="noRequirements">
                                No requirements added yet.
                            </div>
                        {/if}
                    </div>
                </div><!-- /panel2 -->
                {/if}

                {#if step === 3}
                <!-- ══ STEP 3: AMENITIES ══ -->
                <div class="step-panel active fu" id="panel3">
                    <h2 class="font-display font-light text-navy-dark dark:text-blue-100 mb-1" style="font-size:clamp(22px,2.5vw,30px)">Amenities &amp; features</h2>
                    <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] mb-7">Select all that apply. Accurate amenities attract the right buyers.</p>
            
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {#each listingAmenities as amenity}
                        {@const isActive = listingFormData.amenities.includes(amenity.id)}
                        <button type="button" 
                            id={`am-${amenity.displayName}`}  
                            class="am-card" 
                            class:active={isActive} 
                            onclick={() => toggleAmenity(amenity.id)}>
                                <div class="am-icon">
                                    <AmenityIcon iconKey={amenity.iconKey} />
                                </div>
                                <div class="min-w-0">
                                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">
                                        {amenity.displayName}
                                    </div>
                                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                                        {amenity.description}
                                    </div>
                                </div>
                                <div class="am-check">
                                    {#if isActive}
                                    <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon">
                                        <path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    {/if}
                                </div>
                        </button>
                        {/each}
            
                        <button type="button" 
                            id="am-new" 
                            style="grid-column:1/-1"
                            class="am-card am-card-full"
                            class:active={listingFormData.isBrandNew}  
                            onclick={() => setListingFormField('isBrandNew', !listingFormData.isBrandNew)} 
                        >
                            <div class="am-icon">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                                    <path d="M9 22V12h6v10"/>
                                </svg>
                            </div>
                            <div class="min-w-0">
                                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">
                                    New build
                                </div>
                                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                                    Brand new construction — never been occupied
                                </div>
                            </div>
                            <div class="am-check ml-auto">
                            {#if listingFormData.isBrandNew}
                            <svg width="8" height="8" viewBox="0 0 10 10" fill="none" class="check-icon">
                                <path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
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
                        <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Multiple files supported (JPG, PNG)</p>
                        <input type="file" 
                            bind:this={pPhotos} 
                            id="photoInput" 
                            class="hidden"
                            multiple 
                            accept="image/*" 
                            onchange={handleImageUploads}
                        />
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
                        onchange={() => {}}
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
                            onchange={handleVideoUpload} />
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
                        <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Upload floor plans (JPG, PNG)</p>
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
                </div><!-- /panel4 -->
            {/if}

            {#if step === 5}
                <!-- ══ STEP 5: PREVIEW ══ -->
                {#if listingFormData.title !== '' && listingFormData.description !== ''}
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
                                {#if listingFormData.photoIds.length > 0}
                                    <div style="position:relative;width:260px;height:180px">
                                        <img src={previewPhotos[0].preview} 
                                            alt={listingFormData.title} 
                                            class="img-full-fit" 
                                        />
                                    </div>
                                {:else}
                                    <div style="position:absolute;bottom:0;left:20px;width:90px;height:120px;background:rgba(255,255,255,.13);border-radius:4px 4px 0 0"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:30px;bottom:90px"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:50px;bottom:90px"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:30px;bottom:62px"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:50px;bottom:62px"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.68);border-radius:2px;width:13px;height:17px;left:30px;bottom:35px"></div>
                                    <div style="position:absolute;bottom:0;left:150px;width:62px;height:76px;background:rgba(255,255,255,.1);border-radius:4px 4px 0 0"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.65);border-radius:2px;width:10px;height:13px;left:158px;bottom:52px"></div>
                                    <div style="position:absolute;background:rgba(212,174,58,.65);border-radius:2px;width:10px;height:13px;left:174px;bottom:52px"></div>
                                {/if}
                            </div>
                        </div>
                        <!-- Tags -->
                        <div class="absolute top-4 left-4 flex gap-2 flex-wrap">
                        {#if listingFormData.listingFor === ListingFor.SALE}
                        <span  id="prev-upfor" class="preview-badge bg-ember-light text-ember-deep">For Sale</span>
                        {/if}

                        {#if listingFormData.listingFor === ListingFor.RENT}
                        <span  id="prev-upfor" class="preview-badge bg-[#E8EDF5] text-navy-strong">For Rent</span>
                        {/if}

                        {#if listingFormData.hasVirtualTour}
                        <span class="preview-badge bg-sage-light text-sage" id="prev-virtual-badge">Virtual tour</span>
                        {/if}
                        </div>

                        {#if listingFormData.photoIds.length <= 0}
                        <p class="absolute bottom-4 right-4 text-[11px] text-white/50 italic">Preview — add photos in step 4</p>
                        {/if}
                    </div>
            
                    <!-- Preview body -->
                    <div class="px-6 py-5">
                        {#if listingFormData.priceAmount}
                        <div id="prev-price" class="font-display text-[24px] font-semibold text-navy-dark dark:text-blue-100 mb-1">
                            ₦ {currencyFormatter(listingFormData.priceAmount)}
                        </div>
                        {/if}
                        
                        {#if listingFormData.title}
                        <div id="prev-title" class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1 capitalize">
                            {listingFormData.title}
                        </div>
                        {/if}

                        {#if listingFormData.address}
                        <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5 mb-4">
                            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
                                <path d="M7 1C4.79 1 3 2.79 3 5c0 3 4 8 4 8s4-5 4-8c0-2.21-1.79-4-4-4z" stroke="#4A90E2" stroke-width="1.3"/>
                                <circle cx="7" cy="5" r="1.5" stroke="#4A90E2" stroke-width="1.3"/>
                            </svg>
                            <span id="prev-address">{listingFormData.address}</span>
                        </div>
                        {/if}
            
                        <!-- Key stats -->
                        <div class="flex gap-4 pb-4 border-b border-chalk-3 dark:border-white/[.07] mb-4 flex-wrap">
                        {#if listingFormData.bedrooms}
                        <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="6" width="12" height="8" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
                                <path d="M5 6V4a3 3 0 016 0v2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" />
                            </svg>
                            <span id="prev-beds">{listingFormData.bedrooms} bedroom</span>
                        </div>
                        {/if}

                        {#if listingFormData.toilets}
                        <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M2 9h12M2 9v3a1 1 0 001 1h10a1 1 0 001-1V9" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                            </svg>
                            <span id="prev-baths">2 bathrooms</span>
                        </div>
                        {/if}

                        {#if listingFormData.sizeSqm}
                        <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="currentColor" stroke-width="1.3"/>
                            </svg>
                            <span id="prev-size">{listingFormData.sizeSqm} m²</span>
                        </div>
                        {/if}

                        <div class="text-[12px] text-navy-accent dark:text-[#8DAACC] flex items-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                                <path d="M1 9h4l3-7 3 14 3-9 2 2h3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <span id="prev-type">Detached house</span>
                        </div>
                        </div>
            
                        {#if listingFormData.description}
                        <!-- Description preview -->
                        <p id="prev-desc" class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] mb-4 line-clamp-3">{listingFormData.description}</p>
                        {/if}
            
                        <!-- Selected amenities -->
                        <div class="flex flex-wrap gap-1.5" id="prev-amenities">

                        {#if selectedNames.length > 0}
                            {#each selectedNames as a}
                            <span class="uppercase text-[11px] font-medium text-navy-accent dark:text-[#8DAACC] bg-[#E8EDF5] dark:bg-navy-strong/40 px-2.5 py-[4px] rounded-full">{a}</span>
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
                        {#each prelaunchList as item}
                        <PrelaunchChecklist 
                            label={item.label} 
                            condition={item.condition} 
                        />
                        {/each}
                    </div>
                </div>

                    <!-- Publish reassurance note -->
                    <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-6 leading-[1.7]">
                        Your listing is saved as a draft by default — publishing isn't required right now. When you're ready, choose <strong class="text-navy-dark dark:text-blue-100 font-medium">Publish listing</strong> below to make it live, or continue as a draft and publish later from <strong class="text-navy-dark dark:text-blue-100 font-medium">Update Listing</strong> or <strong class="text-navy-dark dark:text-blue-100 font-medium">View Listings</strong>.
                    </p>
            
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
                {:else}
                    {#if listingObject && listingSuccessStatus}
                        <SuccessNotification 
                            listingSlug={listingObject.slug} 
                            status={listingSuccessStatus} 
                            onClick={() => setStep(1)} 
                        />
                    {/if}
                {/if}
            {/if}
            </div> <!----<Form Area-->

            <!-- STICKY BOTTOM NAV BUTTONS -->
            <div class="w-full z-30 bg-white dark:bg-[#0D1422] border-t border-chalk-3 dark:border-white/[.07] px-4 sm:px-6 py-4 tt flex justify-center">
                <div class="w-full max-w-[1200px] flex items-center justify-between gap-3 flex-wrap">
                
                <div class="flex items-center gap-3">
                    {#if step > 1}
                    <button id="prevBtn" 
                        onclick={() => setStep(step - 1)} 
                        class="flex items-center gap-2 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-5 py-[10px] rounded-full cursor-pointer bg-transparent tt">
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
                    <div class="flex items-center gap-3">
                        <!-- Step 5 actions: draft is the default outcome, publish is optional -->
                        <button type="submit" 
                            disabled={listingObject && listingSuccessStatus}
                            id="saveDraftStep5Btn" 
                            class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-6 py-[10px] rounded-full border-none cursor-pointer tt">
                        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 7a6 6 0 1112 0 6 6 0 01-12 0z"/>
                            <path d="M5 7l1.5 1.5L11 4.5" />
                        </svg>
                        Save as draft
                        </button>
                        {#if listingFormData.listingFor === ListingFor.SALE}
                        <button type="button" 
                            disabled={listingObject && listingSuccessStatus}
                            id="goLiveBtn" 
                            onclick={publishListing}
                            class="flex items-center gap-2 text-[13px] font-medium text-white bg-sage hover:bg-[#3a6038] px-6 py-[10px] rounded-full border-none cursor-pointer tt">
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                <path d="M13 8A5 5 0 118 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                <path d="M8 1l3 2-3 2V1z" fill="currentColor"/>
                            </svg>
                            Submit listing
                        </button>
                        {:else}
                        <button type="button" 
                            disabled={listingObject && listingSuccessStatus}
                            id="goLiveBtn" 
                            onclick={publishListing}
                            class="flex items-center gap-2 text-[13px] font-medium text-white bg-sage hover:bg-[#3a6038] px-6 py-[10px] rounded-full border-none cursor-pointer tt">
                            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                                <path d="M13 8A5 5 0 118 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M8 1l3 2-3 2V1z" fill="currentColor" />
                            </svg>
                            Publish listing
                        </button>
                        {/if}
                    </div>
                    {:else}
                    <button type="button" 
                        id="nextBtn" 
                        onclick={() => setStep(step + 1)} 
                        class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-6 py-[10px] rounded-full border-none cursor-pointer tt">
                        Continue
                        <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                            <path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </button>
                    {/if}
                </div>
                </div>
            </div>
        </form>
    </main>
</div>

{#if toastMsg  && toastMsg !== ''}
    <Toast toastMsg={toastMsg} type={toastType} />
{/if}

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
    .dark .addr-suggestion{color:#E8EDF5;border-bottom-color:rgba(255,255,255,.07)}
    .addr-suggestion:hover{background:#F7F3EC}
    .dark .addr-suggestion:hover{background:rgba(255,255,255,.04)}
    .addr-suggestion:last-child{border-bottom:none}
    
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

    /* additional cost row */
    .cost-row{display:flex;gap:8px;align-items:center;margin-bottom:8px}
    
    @media(max-width:768px){
      .hide-md{display:none!important}
    }
    @media(max-width:640px){
      .hide-sm{display:none!important}
      .step-label{font-size:9px}
      .step-node{width:26px;height:26px;font-size:11px}
    }
</style>
