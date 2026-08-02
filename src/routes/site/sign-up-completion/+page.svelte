<script lang="ts">
  import { isEmpty } from 'lodash-es';
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import { AxiosError } from "axios";
  import type { PageData } from "./$types";
  import type { ToastType } from "$lib/types";
  import { authClient } from "$lib/auth-client";
  import { ApiRequests } from "$lib/api/api.request";
  import PhoneInput from "$lib/components/shared/PhoneInput.svelte";
  import { capitalize, getErrorMessage, normalizeAndValidatePhone } from "$lib/utils";
  import Welcome from "$lib/components/sign-up-completion/welcome.svelte";


  type AgencyForm = { 
    logoId: string;
    phoneNumber: string;
    firstName: string;
    lastName: string;
    email: string;
    focusAreas: string[];
    isRegistered: boolean;
    regNumber: string;
    isTAndCAgreed: boolean;
    agencyName: string;
    agencyBio: string;
    businessAddress: string;
  }

  let { data }: { data: PageData } = $props();

  const countries = $derived<any[]>(data.countries.data);
  const countryIp = $derived(data.ipCountry.data);

  let logoFile: HTMLInputElement;
  let previewUrl = $state<string | null>(null);

  let realEstateFocusAreas = $state([
    "Residential Properties",
    "Luxury Homes & Estates",
    "Commercial Properties",
    "Land & Plots",
    "Off-Plan Developments",
    "Short-Let & Vacation Rentals",
    "Rental Apartments",
    "Affordable Housing",
    "Industrial & Warehousing",
    "Property Investment Advisory",
  ]);

  let agencyFormData = $state<AgencyForm>({ 
    agencyName: '',
    agencyBio: '',
    businessAddress: '',
    logoId: '',
    phoneNumber: '',
    email: '',
    firstName: '',
    lastName: '',
    focusAreas: [],
    isRegistered: false,
    regNumber: '',
    isTAndCAgreed: false,
  });

  // Toast
  let toastMsg     = $state('');
  let toastType = $state<ToastType>('info');
  let toastTimer: ReturnType<typeof setTimeout> | null = null;


  let provider = $state<string | null>('');
  let showForm = $state(false);

  let isCountryOpen = $state(false);
  let selected = $state(countryIp);

  let user = $state<any>(null);

  let timeout: ReturnType<typeof setTimeout>;

  const prefillProfile = (user: any) => {
    setAgencyFormField('email', user.email);
      
    const names = user.name.split(' ');
    setAgencyFormField('firstName', names[0]);

    if (!isEmpty(names[1])) {
      setAgencyFormField('lastName', names[1]);
    }
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (msg: string, type: ToastType) => {
    toastMsg = msg;
    toastType = type;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastMsg = '', 3000);
  }

  const handleClick = () =>  logoFile.click();

  const setFocusAreas = (focusArea: string) => {
    const focusAreas = [...agencyFormData.focusAreas];
    if (focusAreas.includes(focusArea)) {
      focusAreas.splice(focusAreas.indexOf(focusArea), 1);
    } else {
      focusAreas.push(focusArea);
    }
    setAgencyFormField('focusAreas', focusAreas);
  }

  const handleLogoUpload = async () => {
    const files = logoFile?.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    previewUrl = URL.createObjectURL(file);

    try {
      const result = await new ApiRequests().uploadFiles([file]);
      if (result.data.success) {
        showToast(result.data.message, 'success');
        // Set logo_id
        setAgencyFormField('logoId', result.data.data[0].id)
        return;
      }
    } catch (ex) {
        previewUrl = null;
        if (ex instanceof AxiosError) {
          const message = getErrorMessage(ex);
          showToast(message, 'error');
        }
        return;
      }
  }
  
  const selectCountry = (country: any) => {
    selected = country;
    isCountryOpen = false;
  };

  const checkPhoneNumberAvailability = async (phoneNo: string) => {
    try {
      await new ApiRequests().verifyPhoneNumberAvailability(phoneNo);
      // no need to track the success
    } catch(ex) {
      if (ex instanceof AxiosError) {
        const message = getErrorMessage(ex);
        showToast(message, 'error');
      } else if (ex instanceof Error) {
        showToast(ex.message, 'error');
      }
      return;
    }
  }

  const handlePhoneNoInput = (event: Event) => {
    const phone = (event.target as HTMLInputElement).value;
    const formattedPhoneNo = normalizeAndValidatePhone({
      phone,
      countryCode: selected.isoCode,
      });

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      checkPhoneNumberAvailability(formattedPhoneNo);
    }, 2000); // wait 2s after user stops typing
  }

  const setAgencyFormField = <K extends keyof AgencyForm>(
    field: K,
    value: AgencyForm[K]
  ) => {
	  agencyFormData[field] = value;
  }

   onMount(async () => {
    const queryParams = page.url.searchParams;

    provider = queryParams.get('provider');

    const { data: session, error } = await authClient.getSession();
    console.log({ session });
    if (session) {
      user = session.user;
      prefillProfile(user);
    }
  });
</script>



<!-- ═══════════════════════════════════════════════
     MAIN SPLIT LAYOUT
═══════════════════════════════════════════════ -->
<div class="flex min-h-screen pt-[68px]">

  <!-- ══════════════════════════════════
       LEFT PANEL — same scene, copy adapted
  ══════════════════════════════════ -->
  <div class="panel-left hidden md:flex md:w-[42%] lg:w-[45%] flex-col relative animate-panelIn">

    <div class="panel-grid"></div>
    <div class="panel-glow" style="width:560px;height:480px;top:-80px;left:-120px;"></div>
    <div class="panel-glow" style="width:380px;height:340px;bottom:60px;right:-60px;opacity:0.6;"></div>
    <div class="panel-arc" style="width:520px;height:520px;"></div>
    <div class="panel-arc" style="width:360px;height:360px;border-color:rgba(74,144,226,0.07);"></div>
    <div class="panel-arc" style="width:200px;height:200px;border-color:rgba(74,144,226,0.05);"></div>

    <!-- City illustration (same SVG as signup) -->
    <div class="absolute bottom-0 left-0 right-0 pointer-events-none" style="height:52%;">
      <svg class="w-full h-full" viewBox="0 0 800 448" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
        <rect x="28" y="198" width="58" height="250" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="38" y="160" width="38" height="44" rx="2" fill="rgba(255,255,255,0.03)"/>
        <rect x="108" y="148" width="78" height="300" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="118" y="114" width="58" height="40" rx="2" fill="rgba(255,255,255,0.03)"/>
        <rect x="198" y="190" width="52" height="258" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="268" y="128" width="88" height="320" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="280" y="96" width="64" height="38" rx="2" fill="rgba(255,255,255,0.05)"/>
        <rect x="283" y="110" width="12" height="16" rx="1" fill="rgba(212,174,58,0.55)"/>
        <rect x="302" y="110" width="12" height="16" rx="1" fill="rgba(74,144,226,0.45)"/>
        <rect x="321" y="110" width="12" height="16" rx="1" fill="rgba(255,255,255,0.18)"/>
        <rect x="283" y="136" width="12" height="16" rx="1" fill="rgba(74,144,226,0.40)"/>
        <rect x="302" y="136" width="12" height="16" rx="1" fill="rgba(212,174,58,0.52)"/>
        <rect x="321" y="136" width="12" height="16" rx="1" fill="rgba(212,174,58,0.35)"/>
        <rect x="283" y="162" width="12" height="16" rx="1" fill="rgba(212,174,58,0.42)"/>
        <rect x="302" y="162" width="12" height="16" rx="1" fill="rgba(74,144,226,0.50)"/>
        <rect x="321" y="162" width="12" height="16" rx="1" fill="rgba(255,255,255,0.15)"/>
        <rect x="378" y="46" width="128" height="402" rx="4" fill="rgba(255,255,255,0.08)"/>
        <rect x="396" y="20" width="92" height="32" rx="3" fill="rgba(255,255,255,0.06)"/>
        <rect x="430" y="4" width="24" height="20" rx="2" fill="rgba(74,144,226,0.28)"/>
        <rect x="395" y="60" width="14" height="18" rx="1" fill="rgba(212,174,58,0.58)"/>
        <rect x="416" y="60" width="14" height="18" rx="1" fill="rgba(74,144,226,0.50)"/>
        <rect x="437" y="60" width="14" height="18" rx="1" fill="rgba(212,174,58,0.42)"/>
        <rect x="458" y="60" width="14" height="18" rx="1" fill="rgba(255,255,255,0.22)"/>
        <rect x="479" y="60" width="14" height="18" rx="1" fill="rgba(74,144,226,0.38)"/>
        <rect x="395" y="90" width="14" height="18" rx="1" fill="rgba(255,255,255,0.18)"/>
        <rect x="416" y="90" width="14" height="18" rx="1" fill="rgba(212,174,58,0.52)"/>
        <rect x="437" y="90" width="14" height="18" rx="1" fill="rgba(74,144,226,0.58)"/>
        <rect x="458" y="90" width="14" height="18" rx="1" fill="rgba(212,174,58,0.38)"/>
        <rect x="479" y="90" width="14" height="18" rx="1" fill="rgba(255,255,255,0.28)"/>
        <rect x="395" y="120" width="14" height="18" rx="1" fill="rgba(212,174,58,0.50)"/>
        <rect x="416" y="120" width="14" height="18" rx="1" fill="rgba(74,144,226,0.32)"/>
        <rect x="437" y="120" width="14" height="18" rx="1" fill="rgba(255,255,255,0.18)"/>
        <rect x="458" y="120" width="14" height="18" rx="1" fill="rgba(212,174,58,0.48)"/>
        <rect x="479" y="120" width="14" height="18" rx="1" fill="rgba(74,144,226,0.42)"/>
        <rect x="524" y="88" width="98" height="360" rx="3" fill="rgba(255,255,255,0.07)"/>
        <rect x="534" y="64" width="78" height="30" rx="2" fill="rgba(255,255,255,0.05)"/>
        <rect x="540" y="103" width="12" height="15" rx="1" fill="rgba(212,174,58,0.48)"/>
        <rect x="558" y="103" width="12" height="15" rx="1" fill="rgba(74,144,226,0.40)"/>
        <rect x="576" y="103" width="12" height="15" rx="1" fill="rgba(255,255,255,0.18)"/>
        <rect x="636" y="158" width="68" height="290" rx="3" fill="rgba(255,255,255,0.05)"/>
        <rect x="648" y="174" width="10" height="13" rx="1" fill="rgba(212,174,58,0.38)"/>
        <rect x="664" y="174" width="10" height="13" rx="1" fill="rgba(74,144,226,0.32)"/>
        <rect x="680" y="174" width="10" height="13" rx="1" fill="rgba(212,174,58,0.42)"/>
        <rect x="716" y="208" width="48" height="240" rx="3" fill="rgba(255,255,255,0.04)"/>
        <rect x="0" y="446" width="800" height="2" rx="1" fill="rgba(74,144,226,0.12)"/>
        <ellipse cx="400" cy="448" rx="310" ry="16" fill="rgba(74,144,226,0.05)"/>
      </svg>
    </div>

    <!-- Left panel content — adapted for completion context -->
    <div class="relative z-10 flex flex-col flex-1 px-[7%] py-12 justify-between">
      <div>
        <div class="inline-flex mb-8 animate-fadeUp1">
          <span class="trust-badge"><span class="trust-dot"></span>One step to go</span>
        </div>

        <h2 class="font-display font-light text-white leading-[1.08] mb-5 animate-fadeUp2"
            style="font-size: clamp(30px, 3.2vw, 48px);">
          Almost a<br>verified <em class="italic" style="color:#4A90E2;">agent.</em>
        </h2>

        <p class="font-sans font-light text-white/55 leading-[1.85] max-w-[340px] mb-9 animate-fadeUp3"
           style="font-size: 14px;">
          Your account is connected. A short agency profile is all that stands between you and your first listing.
        </p>

        <!-- Trust points -->
        <div class="space-y-3.5 animate-fadeUp4">
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(74,120,72,0.18);border:1px solid rgba(74,120,72,0.32);">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A7848" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="font-sans font-light text-white/60" style="font-size:13px;">Identity verified via secure provider</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="font-sans font-light text-white/60" style="font-size:13px;">Takes under two minutes to finish</span>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(212,174,58,0.18);border:1px solid rgba(212,174,58,0.32);">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#D4AE3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </div>
            <span class="font-sans font-light text-white/60" style="font-size:13px;">List and boost properties instantly once approved</span>
          </div>
        </div>
      </div>

      <!-- Agent social proof testimonial -->
      <div class="testi-card p-5 max-w-[340px] animate-fadeUp5">
        <div class="flex gap-[3px] mb-3">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
        </div>
        <p class="font-display font-light italic text-white/75 leading-[1.65] mb-4" style="font-size:15px;">
          "Signing up with Google took ten seconds. The rest of my agency profile took less than two minutes."
        </p>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-navy-strong flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0">EO</div>
          <div>
            <div class="font-sans font-medium text-white/85" style="font-size:13px;">Emeka Okonkwo</div>
            <div class="font-sans font-light text-white/40" style="font-size:11px;">Verified Agent · Port Harcourt</div>
          </div>
        </div>
      </div>
    </div>
  </div><!-- /panel-left -->

  <!-- ══════════════════════════════════
       RIGHT PANEL — completion form
  ══════════════════════════════════ -->
  <div class="panel-right flex-1 flex items-start justify-center relative px-5 sm:px-8 py-10 overflow-y-auto">

    <!-- Mobile back -->
    <a href="/site/sign-up" class="md:hidden absolute top-5 left-5 flex items-center gap-1.5 text-[12px] font-normal text-chalk-muted hover:text-navy-dark transition-colors no-underline z-10">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Back
    </a>

    <!-- Form card -->
    <div class="form-card w-full max-w-[600px] right-inner mt-6 mb-6" style="padding: 40px 46px;">

      <!-- Mobile logo -->
      <div class="md:hidden flex items-center gap-[10px] mb-7">
        <svg width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
          <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
          <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
          <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
        </svg>
        <span class="font-sans text-[16px] font-medium tracking-em-018">BLUPODD</span>
      </div>

        <Welcome 
          provider={provider ?? ''} 
          onDismiss={() => (showForm = true)} 
        />

        <!-- ═══════════════════════════════════════
           COMPLETION FORM — agent only, no tabs
      ═══════════════════════════════════════ -->
      {#if showForm}
      <div id="completionForm">

        <div class="mb-7 animate-fadeUp">
          <h1 class="font-display font-light leading-[1.1] mb-1.5" style="font-size: clamp(26px, 3vw, 36px);">
            Complete Your Agent Account
          </h1>
          <p class="font-sans font-light text-chalk-muted" style="font-size: 14px;">Just a few business details to activate your listings</p>
        </div>

         <!-- Connected identity chip -->
         <div class="identity-chip mb-7 animate-fadeUp1">
          <img class="identity-avatar" id="identityAvatar" src={user.image} alt={user.name} />
          <div class="flex-1 min-w-0">
            <div class="font-sans font-medium truncate" style="font-size:14px;" id="identityName">{user.name}</div>
            <div class="font-sans font-light text-chalk-muted truncate" style="font-size:12px;" id="identityEmail">{user.email}</div>
          </div>
          <span class="verified-pill flex-shrink-0">
            <svg width="9" height="9" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10l4.5 4.5L17 5"/></svg>
            Verified
          </span>
        </div>

        <!-- ── Section: Your details (prefilled) ── -->
        <div class="section-head animate-fadeUp2">
          <span class="shead-icon"><svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#4A70A0" stroke-width="1.4" stroke-linecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"/></svg></span>
          Your details
        </div>
        <div class="grid grid-cols-2 gap-3 mb-3 two-col animate-fadeUp2">
          <div>
            <label class="auth-label" for="fFirstName">First name</label>
            <input type="text" 
              id="fFirstName" 
              class="auth-input" 
              oninput={(e) => setAgencyFormField("firstName", (e.target as HTMLInputElement).value)}
              bind:value={agencyFormData.firstName}  
              autocomplete="given-name" 
            />
          </div>
          <div>
            <label class="auth-label" for="fLastName">Last name</label>
            <input type="text" 
              id="fLastName" 
              class="auth-input" 
              oninput={(e) => setAgencyFormField("lastName", (e.target as HTMLInputElement).value)}
              bind:value={agencyFormData.lastName}  
              autocomplete="family-name" 
            />
          </div>
        </div>
        <div class="mb-3 animate-fadeUp2">
          <label class="auth-label" for="fEmail">Email address</label>
          <input type="email" 
            id="fEmail" 
            class="auth-input" 
            oninput={(e) => setAgencyFormField("email", (e.target as HTMLInputElement).value)}
            bind:value={agencyFormData.email} 
            disabled 
          />
          <p class="helper-text">Provided by {capitalize(provider ?? '')} — can't be changed here</p>
        </div>
        <!-- Fix the on_input handler -->
        <PhoneInput 
          onchange={(country) => selectCountry(country)}
          oninput={(e) => {
            setAgencyFormField("phoneNumber", (e.target as HTMLInputElement).value);
            handlePhoneNoInput(e);
          }} 
          countries={countries.map((country) => ({...country, isPinned: country.id === selected.id}))} 
          selectedCountry={{...selected, isPinned: true}}  
        />

        <!-- ── Section: Agency profile ── -->
        <div class="section-head animate-fadeUp3">
          <span class="shead-icon"><svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="#4A70A0" stroke-width="1.4" stroke-linecap="round"><rect x="1" y="10" width="14" height="5" rx="2"/><circle cx="8" cy="5" r="3"/><path d="M5 10V8a3 3 0 016 0v2"/></svg></span>
          Agency profile
        </div>

        <!-- Agency logo upload -->
        <div class="mb-4 animate-fadeUp3">
          <label for="logoFile" class="auth-label">Agency logo</label>
          <button type="button" class="upload-zone" id="logoZone" onclick={handleClick}>
            {#if previewUrl}
            <div id="logoPreviewWrap">
              <img src={previewUrl} 
                id="logoPreview" 
                class="w-16 h-16 rounded-xl object-cover mx-auto mb-2" 
                alt="Logo preview" />
            </div>
            {:else}
            <div id="logoPlaceholder">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style="background:rgba(74,144,226,0.10);border:1.5px dashed rgba(74,144,226,0.35);">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"><rect x="2" y="2" width="16" height="16" rx="3"/><circle cx="10" cy="9" r="3"/><path d="M2 16l4-4 3 3 4-4 5 5"/></svg>
              </div>
              <p class="font-sans font-medium" style="font-size:13px;color:#4A70A0;">Upload agency logo</p>
              <p class="font-sans font-light text-chalk-muted mt-0.5" style="font-size:11px;">PNG, JPG · max 5 MB · Recommended 200×200</p>
            </div>
            {/if}
            <input type="file"
              onchange={handleLogoUpload}
              bind:this={logoFile} 
              id="logoFile" 
              required
              accept="image/*" 
              class="hidden" 
            />
          </button>
        </div>

        <div class="mb-3 animate-fadeUp3" id="fAgencyNameWrap">
          <label class="auth-label" for="fAgencyName">Agency name</label>
          <input type="text" 
            id="fAgencyName" 
            class="auth-input" 
            placeholder="e.g. Premier Properties PH" 
            bind:value={agencyFormData.agencyName}
            oninput={(e) => setAgencyFormField('agencyName', (e.target as HTMLInputElement).value)}
          />
          <span class="error-msg">Agency name is required.</span>
        </div>

        <div class="mb-3 animate-fadeUp4">
          <label class="auth-label" for="fDesc">Brief description <span class="font-sans normal-case" style="font-size:10px;letter-spacing:0;text-transform:none;color:#8C8070;">(optional)</span></label>
          <textarea id="fDesc" 
            class="auth-textarea" 
            rows="3" 
            oninput={(e) =>
              setAgencyFormField(
                'agencyBio',
                (e.target as HTMLTextAreaElement).value
              )
            }
            bind:value={agencyFormData.agencyBio} 
            placeholder="Describe your agency — specialization, years of experience, key locations…">
            </textarea>
        </div>

        <div class="mb-3 animate-fadeUp4">
          <label class="auth-label" for="fAddress">Business address</label>
          <textarea id="fAddress" 
            class="auth-textarea" 
            rows="3" 
            oninput={(e) =>
              setAgencyFormField(
                'businessAddress',
                (e.target as HTMLTextAreaElement).value
              )
            }
            bind:value={agencyFormData.businessAddress} 
            placeholder="e.g. 14 Augustine Nwosu Close, GRA, PH">
          </textarea>
        </div>

        <div class="mb-5 animate-fadeUp4">
          <label class="auth-label" for="fState">State of operation</label>
          <select id="fState" class="auth-select">
            <option value="" disabled selected>Select state</option>
            <option>Rivers State</option><option>Lagos State</option><option>Abuja FCT</option>
            <option>Anambra State</option><option>Delta State</option><option>Edo State</option>
            <option>Enugu State</option><option>Oyo State</option><option>Kano State</option>
            <option>Cross River State</option><option>Imo State</option><option>Kaduna State</option>
          </select>
        </div>

        <div class="mb-5 animate-fadeUp4">
          <label class="auth-label" for="aDesc">Focus Areas</label>
          <div class="ai-specs" id="agentSpecs">
            {#each realEstateFocusAreas as _}
            <span class="ai-spec" 
              class:active={agencyFormData.focusAreas.includes(_)} 
              onclick={() => setFocusAreas(_)}>
              {_}
            </span>
            {/each}
          </div>
          <p class="mt-5 helper-text">Choose the property types you specialize in — helps buyers find you</p>
        </div>
 

        <div class="space-y-3 mb-4 animate-fadeUp3">
          <div class="flex items-start gap-2.5">
            <input bind:checked={agencyFormData.isRegistered} 
              type="checkbox" 
              id="aTerms" 
              class="auth-check" 
              style="margin-top:2px;" 
            />
            <label for="aTerms" class="font-sans font-light text-chalk-muted cursor-pointer leading-[1.7]" style="font-size:12px;">
              Yes, I am a registered real estate company
            </label>
          </div>
        </div>

        {#if agencyFormData.isRegistered}
        <div class="mb-3 animate-fadeUp2" id="aAgencyRegNumbeWrap">
          <label class="auth-label" for="aAgencyRegNumber">Registration Number</label>
          <input 
            oninput={(e) => setAgencyFormField('regNumber', (e.target as HTMLInputElement).value)}
            bind:value={agencyFormData.regNumber}  
            required 
            type="text" 
            id="aAgencyRegNumber" 
            class="auth-input" 
            placeholder="e.g. RC 123456" 
          />
          <span class="error-msg">RC Number</span>
        </div>
        {/if}

         <!-- Agreements -->
         <div class="space-y-3 mb-6 animate-fadeUp3">
          <div class="flex items-start gap-2.5">
            <input 
              bind:checked={agencyFormData.isTAndCAgreed} 
              type="checkbox" 
              id="aTerms" 
              class="auth-check" 
              style="margin-top:2px;"
            />
            <label for="aTerms" class="font-sans font-light text-chalk-muted cursor-pointer leading-[1.7]" style="font-size:12px;">
              I agree to Blupodd's <a href="/site/privacy-policy" class="auth-link" style="font-size:12px;">Terms of Service</a> and <a href="/site/privacy-policy" class="auth-link" style="font-size:12px;">Privacy Policy</a>
            </label>
          </div>
        </div>

        <button class="btn-primary animate-fadeUp5" type="button">
          Create agent account
        </button>
      </div>
      {/if}
     
    </div>
  
  </div>

</div>


<style>
  html, body { overflow-x: hidden; }
  *, *::before, *::after { box-sizing: border-box; }
  
  body {
    font-family: 'DM Sans', sans-serif;
    background: #FEFCF8;
    color: #0A2463;
    min-height: 100dvh;
    transition: background 0.3s, color 0.3s;
  }
  :global([data-theme="dark"]) body { background: #0B111E; color: #E8EDF5; }
  
  /* ── Theme toggle ── */
  .theme-toggle-btn {
    width: 32px; height: 32px; border-radius: 50%; border: none;
    background: rgba(255,255,255,0.09);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; flex-shrink: 0;
    transition: background 0.22s ease, transform 0.22s ease;
    outline: none;
  }
  .theme-toggle-btn:hover { background: rgba(255,255,255,0.16); transform: rotate(15deg); }
  .theme-toggle-btn .icon-sun  { display: flex; }
  .theme-toggle-btn .icon-moon { display: none; }
  :global([data-theme="dark"]) .theme-toggle-btn .icon-sun  { display: none; }
  :global([data-theme="dark"]) .theme-toggle-btn .icon-moon { display: flex; }
  
  /* ── Left panel ── */
  .panel-left {
    background: linear-gradient(155deg, #060E1C 0%, #0A2463 38%, #0E2444 65%, #060E1C 100%);
    position: relative; overflow: hidden; flex-shrink: 0;
  }
  .panel-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(74,144,226,0.055) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(74,144,226,0.055) 1px, transparent 1px);
    background-size: 64px 64px;
    mask-image: radial-gradient(ellipse 85% 90% at 30% 55%, black 0%, transparent 100%);
  }
  .panel-arc {
    position: absolute; border-radius: 50%;
    border: 1px solid rgba(74,144,226,0.10);
    top: 50%; left: 50%; transform: translate(-50%,-50%);
    pointer-events: none;
  }
  .panel-glow {
    position: absolute; border-radius: 50%;
    background: radial-gradient(ellipse, rgba(74,144,226,0.16) 0%, transparent 70%);
    pointer-events: none;
  }
  
  /* ── Right panel ── */
  .panel-right { background: #FEFCF8; transition: background 0.3s; }
  :global([data-theme="dark"]) .panel-right { background: #0B111E; }
  
  /* ── Form card ── */
  .form-card {
    background: #FEFCF8;
    border: 1px solid #EDE7DC;
    border-radius: 20px;
    box-shadow: 0 20px 56px rgba(10,36,99,0.11), 0 4px 16px rgba(10,36,99,0.05);
    transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
  }
  :global([data-theme="dark"]) .form-card {
    background: #131C2E;
    border-color: rgba(255,255,255,0.07);
    box-shadow: 0 24px 72px rgba(0,0,0,0.50), 0 6px 20px rgba(0,0,0,0.28);
  }
  
  /* ── Auth inputs ── */
  .auth-input {
    width: 100%; background: #ffffff;
    border: 1.5px solid #EDE7DC; border-radius: 12px;
    padding: 13px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400;
    color: #0A2463; outline: none;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.3s;
    -webkit-appearance: none;
  }
  .auth-input::placeholder { color: #8C8070; font-weight: 300; }
  .auth-input:focus { border-color: rgba(74,144,226,0.60); box-shadow: 0 0 0 3px rgba(74,144,226,0.13); }
  .auth-input.error { border-color: #C06035; box-shadow: 0 0 0 3px rgba(192,96,53,0.12); }
  .auth-input:disabled { opacity: 0.65; cursor: not-allowed; }
  :global([data-theme="dark"]) .auth-input { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
  :global([data-theme="dark"]) .auth-input::placeholder { color: #6A7FA0; }
  :global([data-theme="dark"]) .auth-input:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
  
  /* ── Textarea ── */
  .auth-textarea {
    width: 100%; background: #ffffff;
    border: 1.5px solid #EDE7DC; border-radius: 12px;
    padding: 13px 16px; resize: none;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400;
    color: #0A2463; outline: none;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.3s;
  }
  .auth-textarea::placeholder { color: #8C8070; font-weight: 300; }
  .auth-textarea:focus { border-color: rgba(74,144,226,0.60); box-shadow: 0 0 0 3px rgba(74,144,226,0.13); }
  :global([data-theme="dark"]) .auth-textarea { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
  :global([data-theme="dark"]).auth-textarea::placeholder { color: #6A7FA0; }
  :global([data-theme="dark"]) .auth-textarea:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
  
  /* ── Primary CTA ── */
  .btn-primary {
    background: #C06035; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
    padding: 14px 36px; border-radius: 40px; border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    width: 100%;
  }
  .btn-primary:hover { background: #a04e28; transform: scale(1.015); box-shadow: 0 10px 32px rgba(192,96,53,0.32); }
  .btn-primary:active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; transform: none; box-shadow: none; }
  
  /* ── Field label ── */
  .auth-label {
    display: block;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; color: #4A70A0;
    margin-bottom: 7px; transition: color 0.3s;
  }
  :global([data-theme="dark"]) .auth-label { color: #6A7FA0; }
  
  /* ── Links ── */
  .auth-link { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: #1A6ADE; text-decoration: none; transition: color 0.2s; }
  .auth-link:hover { color: #0A2463; }
  :global([data-theme="dark"]) .auth-link { color: #4A90E2; }
  :global([data-theme="dark"]) .auth-link:hover { color: #8DAACC; }
  
  /* ── Error message ── */
  .error-msg { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #C06035; display: none; margin-top: 5px; }
  .show-error .error-msg { display: block; }
  
  /* ── Helper text ── */
  .helper-text { font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 300; color: #8C8070; margin-top: 5px; }
  :global([data-theme="dark"]) .helper-text { color: #6A7FA0; }
  
  /* ── Checkbox ── */
  .auth-check {
    width: 16px; height: 16px; flex-shrink: 0; border-radius: 4px;
    border: 1.5px solid #D8CEBC; background: #fff; cursor: pointer;
    appearance: none; -webkit-appearance: none;
    transition: border-color 0.2s, background 0.2s; position: relative;
  }
  .auth-check:checked { background: #0A2463; border-color: #0A2463; }
  .auth-check:checked::after {
    content: ''; position: absolute; left: 4px; top: 1.5px;
    width: 6px; height: 9px; border: 1.5px solid #fff;
    border-left: none; border-top: none; transform: rotate(45deg);
  }
  :global([data-theme="dark"]) .auth-check { background: #1A2438; border-color: rgba(255,255,255,0.15); }
  :global([data-theme="dark"]) .auth-check:checked { background: #4A90E2; border-color: #4A90E2; }
  
  /* ── Trust badge ── */
  .trust-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(74,144,226,0.12); border: 1px solid rgba(74,144,226,0.22);
    border-radius: 40px; padding: 5px 14px;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.10em; text-transform: uppercase; color: rgba(255,255,255,0.70);
  }
  .trust-dot {
    width: 6px; height: 6px; border-radius: 50%; background: #4A90E2;
    box-shadow: 0 0 0 0 rgba(74,144,226,0.45);
    animation: trustPulse 2.4s ease-in-out infinite;
  }
  @keyframes trustPulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(74,144,226,0.45); }
    50%       { box-shadow: 0 0 0 7px rgba(74,144,226,0); }
  }
  
  /* ── Testimonial card ── */
  .testi-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
    border-radius: 16px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
    transition: border-color 0.25s;
  }
  .testi-card:hover { border-color: rgba(255,255,255,0.16); }
  
  /* ── Phone input — flag selector ── */
  .phone-wrap { display: flex; gap: 0; }
  .phone-flag-btn {
    background: #ffffff; border: 1.5px solid #EDE7DC; border-right: none;
    border-radius: 12px 0 0 12px;
    padding: 0 12px; cursor: pointer;
    display: flex; align-items: center; gap: 5px;
    font-family: 'DM Sans', sans-serif; font-size: 13px; color: #0A2463;
    white-space: nowrap; flex-shrink: 0;
    transition: background 0.2s, border-color 0.22s;
  }
  .phone-flag-btn:hover { background: #F7F3EC; border-color: rgba(74,144,226,0.45); }
  .phone-flag-btn:focus { outline: none; border-color: rgba(74,144,226,0.60); }
  :global([data-theme="dark"]) .phone-flag-btn { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
  :global([data-theme="dark"]) .phone-flag-btn:hover { background: #1F2D45; border-color: rgba(74,144,226,0.40); }
  .phone-input-num {
    flex: 1; background: #ffffff;
    border: 1.5px solid #EDE7DC; border-left: none;
    border-radius: 0 12px 12px 0;
    padding: 13px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400;
    color: #0A2463; outline: none;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.3s;
    min-width: 0;
  }
  .phone-input-num::placeholder { color: #8C8070; font-weight: 300; }
  .phone-wrap:focus-within .phone-flag-btn,
  .phone-wrap:focus-within .phone-input-num {
    border-color: rgba(74,144,226,0.60);
  }
  .phone-wrap:focus-within { box-shadow: 0 0 0 3px rgba(74,144,226,0.13); border-radius: 12px; }
  :global([data-theme="dark"]) .phone-input-num { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
  :global([data-theme="dark"]) .phone-input-num::placeholder { color: #6A7FA0; }
  :global([data-theme="dark"]) .phone-wrap:focus-within .phone-flag-btn,
  :global([data-theme="dark"]) .phone-wrap:focus-within .phone-input-num {
    border-color: rgba(74,144,226,0.55);
  }
  
  /* Country dropdown */
  .country-dropdown {
    position: absolute; top: calc(100% + 6px); left: 0;
    width: 230px; max-height: 220px; overflow-y: auto;
    background: #ffffff; border: 1.5px solid #EDE7DC;
    border-radius: 12px;
    box-shadow: 0 16px 48px rgba(10,36,99,0.15), 0 4px 12px rgba(10,36,99,0.08);
    z-index: 50;
    opacity: 0; transform: translateY(-4px);
    pointer-events: none;
    transition: opacity 0.18s ease, transform 0.18s ease;
    scrollbar-width: thin; scrollbar-color: #EDE7DC transparent;
  }
  .country-dropdown.open { opacity: 1; transform: translateY(0); pointer-events: auto; }
  :global([data-theme="dark"]) .country-dropdown {
    background: #131C2E; border-color: rgba(255,255,255,0.10);
    box-shadow: 0 16px 48px rgba(0,0,0,0.55);
  }
  .country-option {
    display: flex; align-items: center; gap: 8px;
    padding: 9px 12px; cursor: pointer;
    font-family: 'DM Sans', sans-serif; font-size: 13px; color: #0A2463;
    transition: background 0.15s;
  }
  .country-option:hover { background: #F7F3EC; }
  :global([data-theme="dark"]) .country-option { color: #E8EDF5; }
  :global([data-theme="dark"]) .country-option:hover { background: rgba(255,255,255,0.05); }
  .country-option .cflag { font-size: 15px; flex-shrink: 0; }
  .country-option .cname { flex: 1; min-width: 0; }
  .country-option .cdial { font-size: 11px; color: #8C8070; flex-shrink: 0; }
  :global([data-theme="dark"]) .country-option .cdial { color: #6A7FA0; }
  
  /* ── Select styled like input ── */
  .auth-select {
    width: 100%; background: #ffffff;
    border: 1.5px solid #EDE7DC; border-radius: 12px;
    padding: 13px 16px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400;
    color: #0A2463; outline: none; cursor: pointer;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.3s;
    -webkit-appearance: none; appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M2 4l4 4 4-4' stroke='%238C8070' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 36px;
  }
  .auth-select:focus { border-color: rgba(74,144,226,0.60); box-shadow: 0 0 0 3px rgba(74,144,226,0.13); }
  :global([data-theme="dark"]) .auth-select { background-color: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
  :global([data-theme="dark"]) .auth-select:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
  
  /* ── Section card / heading ── */
  .section-card {
    background: #ffffff; border: 1px solid #EDE7DC; border-radius: 14px; padding: 20px 20px 18px;
    transition: background 0.3s, border-color 0.3s;
  }
  :global([data-theme="dark"]) .section-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.07); }
  .section-head {
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.12em; text-transform: uppercase; color: #4A70A0;
    display: flex; align-items: center; gap: 8px;
    margin-bottom: 16px; transition: color 0.3s;
  }
  :global([data-theme="dark"]) .section-head { color: #6A7FA0; }
  .section-head::after { content: ''; flex: 1; height: 1px; background: #EDE7DC; transition: background 0.3s; }
  :global([data-theme="dark"]) .section-head::after { background: rgba(255,255,255,0.07); }
  .section-head .shead-icon {
    width: 22px; height: 22px; border-radius: 7px; flex-shrink: 0;
    background: rgba(74,144,226,0.12); display: flex; align-items: center; justify-content: center;
  }
  
  .ai-specs{display:flex;gap:7px;flex-wrap:wrap}
  .ai-spec{
    cursor: pointer;
    font-size:11px;
    font-weight:500;
    padding:4px 11px;
    border-radius:20px;
    background: rgba(15, 23, 42, 0.06);
    color: rgba(15, 23, 42, 0.65);
    border: 1px solid rgba(15, 23, 42, 0.12);
  }
  :global([data-theme="dark"]) .ai-spec {
    background:rgba(255,255,255,.07);
    color:rgba(255,255,255,.65);
    border:1px solid rgba(255,255,255,.11)
  }
  /* Selected state - light */
  .ai-spec.active,
  .ai-spec:hover {
    background: rgba(37, 99, 235, 0.12);
    color: #6A7FA0;
    border-color: rgba(37, 99, 235, 0.35);
    font-weight: 600;
  }
  :global([data-theme="dark"]) .ai-spec.active,
  :global([data-theme="dark"]) .ai-spec:hover {
    color: rgba(255, 255, 255, 0.75);
    background: rgba(37, 99, 235, 0.12);
    border-color: rgba(37, 99, 235, 0.35);
  }

  /* ── Toast ── */
  #toast {
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%) translateY(12px);
    background: #0A2463; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.04em;
    padding: 11px 22px; border-radius: 40px;
    box-shadow: 0 8px 32px rgba(10,36,99,0.30);
    opacity: 0; pointer-events: none;
    transition: opacity 0.3s ease, transform 0.3s ease;
    white-space: nowrap; z-index: 9999;
  }
  :global([data-theme="dark"]) #toast { background: #1F3F6A; }
  #toast.show { opacity: 1; transform: translateX(-50%) translateY(0); }
  
  /* ══════════════════════════════════════
     Provider-connected identity chip
  ══════════════════════════════════════ */
  .identity-chip {
    display: flex; align-items: center; gap: 12px;
    background: #ffffff; border: 1.5px solid #EDE7DC; border-radius: 14px;
    padding: 12px 14px;
    transition: background 0.3s, border-color 0.3s;
  }
  :global([data-theme="dark"]) .identity-chip { background: #1A2438; border-color: rgba(255,255,255,0.10); }
  .identity-avatar {
    width: 40px; height: 40px; border-radius: 50%; object-fit: cover; flex-shrink: 0;
    border: 1.5px solid #EDE7DC;
  }
  :global([data-theme="dark"]) .identity-avatar { border-color: rgba(255,255,255,0.12); }
  .verified-pill {
    display: inline-flex; align-items: center; gap: 4px;
    background: rgba(74,120,72,0.12); border: 1px solid rgba(74,120,72,0.28);
    border-radius: 40px; padding: 2px 9px 2px 7px;
    font-family: 'DM Sans', sans-serif; font-size: 10px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase; color: #4A7848;
  }
  :global([data-theme="dark"]) .verified-pill { background: rgba(74,120,72,0.20); color: #7FBF7C; border-color: rgba(74,120,72,0.35); }
  
  /* ── Form panel entrance (revealed after notice) ── */
  #completionForm { transition: opacity 0.35s ease, transform 0.4s cubic-bezier(0.22,1,0.36,1); }
  
  /* ══════════════════════════════════════
     Upload zone — premium drag & drop
  ══════════════════════════════════════ */
/* ── File upload zone ── */
.upload-zone {
  width: 100%;
  border: 1.5px dashed #D8CEBC; border-radius: 12px;
  padding: 24px 16px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
  cursor: pointer; text-align: center;
  transition: border-color 0.22s, background 0.22s;
  background: #ffffff;
}
.upload-zone:hover { border-color: rgba(74,144,226,0.50); background: #F7F3EC; }
.upload-zone.has-file { border-color: #4A7848; background: #EFF3EE; border-style: solid; }
:global([data-theme="dark"]) .upload-zone { background: #1A2438; border-color: rgba(255,255,255,0.12); }
:global([data-theme="dark"]) .upload-zone:hover { border-color: rgba(74,144,226,0.45); background: #1F2D45; }
:global([data-theme="dark"]) .upload-zone.has-file { background: rgba(74,120,72,0.15); border-color: #4A7848; }

  /* ══════════════════════════════════════
     Focus area chips — removable tag selector
  ══════════════════════════════════════ */
  .chip-field {
    width: 100%; min-height: 48px;
    border: 1.5px solid #EDE7DC; border-radius: 12px;
    padding: 8px 10px;
    display: flex; flex-wrap: wrap; gap: 6px; align-items: center;
    background: #ffffff;
    transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.3s;
  }
  .chip-field:focus-within { border-color: rgba(74,144,226,0.60); box-shadow: 0 0 0 3px rgba(74,144,226,0.13); }
  :global([data-theme="dark"]) .chip-field { background: #1A2438; border-color: rgba(255,255,255,0.10); }
  :global([data-theme="dark"]) .chip-field:focus-within { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
  
  .focus-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(74,144,226,0.12); border: 1px solid rgba(74,144,226,0.28);
    border-radius: 40px; padding: 5px 6px 5px 12px;
    font-family: 'DM Sans', sans-serif; font-size: 12.5px; font-weight: 500; color: #0A2463;
    animation: chipPop 0.22s cubic-bezier(0.22,1,0.36,1) both;
    white-space: nowrap;
  }
  :global([data-theme="dark"]) .focus-chip { background: rgba(74,144,226,0.20); color: #E8EDF5; border-color: rgba(74,144,226,0.35); }
  .focus-chip button {
    width: 16px; height: 16px; border-radius: 50%; border: none; cursor: pointer;
    background: rgba(10,36,99,0.12); color: #0A2463;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    transition: background 0.18s;
    padding: 0;
  }
  .focus-chip button:hover { background: rgba(192,96,53,0.30); color: #C06035; }
  :global([data-theme="dark"]) .focus-chip button { background: rgba(255,255,255,0.12); color: #E8EDF5; }
  :global([data-theme="dark"]).focus-chip button:hover { background: rgba(192,96,53,0.35); color: #F5D5C5; }
  
  .chip-field-input {
    flex: 1; min-width: 100px; border: none; outline: none; background: transparent;
    font-family: 'DM Sans', sans-serif; font-size: 13.5px; color: #0A2463; padding: 6px 4px;
  }
  .chip-field-input::placeholder { color: #8C8070; font-weight: 300; }
  :global([data-theme="dark"]) .chip-field-input { color: #E8EDF5; }
  
  .chip-suggestions {
    display: flex; flex-wrap: wrap; gap: 6px; margin-top: 9px;
  }
  .chip-suggestion {
    font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 400; color: #4A70A0;
    background: #F7F3EC; border: 1px solid #EDE7DC; border-radius: 40px;
    padding: 5px 13px; cursor: pointer; transition: background 0.18s, border-color 0.18s, transform 0.15s;
  }
  .chip-suggestion:hover { background: #EDE7DC; border-color: rgba(74,144,226,0.40); transform: translateY(-1px); }
  .chip-suggestion.picked { display: none; }
  :global([data-theme="dark"]) .chip-suggestion { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.09); color: #8DAACC; }
  :global([data-theme="dark"]) .chip-suggestion:hover { background: rgba(255,255,255,0.08); border-color: rgba(74,144,226,0.40); }
  
  /* ══════════════════════════════════════
     Registered-company reveal panel
  ══════════════════════════════════════ */
  .reveal-wrap { overflow: hidden; }
  .reveal-wrap.reveal-open { animation: revealDown 0.32s cubic-bezier(0.22,1,0.36,1) both; }
  .reveal-wrap.reveal-closed { display: none; }
  
  /* ── Company toggle row ── */
  .toggle-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    background: #ffffff; border: 1.5px solid #EDE7DC; border-radius: 14px;
    padding: 14px 16px;
    transition: background 0.3s, border-color 0.3s;
  }
  :global([data-theme="dark"]) .toggle-row { background: #1A2438; border-color: rgba(255,255,255,0.10); }
  .switch {
    width: 40px; height: 23px; border-radius: 40px; border: none; cursor: pointer;
    background: #D8CEBC; position: relative; flex-shrink: 0;
    transition: background 0.22s ease;
  }
  .switch::after {
    content: ''; position: absolute; top: 2.5px; left: 2.5px;
    width: 18px; height: 18px; border-radius: 50%; background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.25);
    transition: transform 0.22s cubic-bezier(0.22,1,0.36,1);
  }
  .switch.on { background: #4A7848; }
  .switch.on::after { transform: translateX(17px); }
  :global([data-theme="dark"]) .switch { background: rgba(255,255,255,0.15); }
  
  /* ── Mobile ── */
  @media (max-width: 768px) {
    .panel-left  { display: none !important; }
    .panel-right { width: 100% !important; }
    .form-card   { box-shadow: none !important; border-radius: 0 !important; border: none !important; min-height: calc(100dvh - 68px); }
    .right-inner { padding: 28px 20px !important; }
    .two-col     { grid-template-columns: 1fr !important; }
    .upload-zone { flex-direction: row; }
  }
</style>