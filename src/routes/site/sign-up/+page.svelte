<script lang="ts">
  import { AxiosError } from "axios";
  import { goto } from "$app/navigation";
  import type { PageData } from "./$types";
  import type { ToastType } from "$lib/types";
  import { ApiRequests } from "$lib/api/api.request";
  import { themeStore } from "$lib/stores/theme.svelte";
  import Toast from "$lib/components/shared/Toast.svelte";
  import PhoneInput from "$lib/components/shared/PhoneInput.svelte";
  import { getErrorMessage, isFormComplete, normalizeAndValidatePhone } from "$lib/utils";
  import { onMount } from "svelte";

  type UserForm = { 
    firstName: string, 
    lastName: string, 
    email: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
    isTAndCAgreed: boolean,
  }

  type AgencyForm = {
    logoId: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    agencyName: string;
    agencyBio: string;
    businessAddress: string;
    isRegistered: boolean;
    regNumber: string;
    focusAreas: string[];
    isTAndCAgreed: boolean;
  };
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
  type AccountTypes = 'customer' | 'agency';
  let accountType = $state<AccountTypes>('customer');
  let logoFile: HTMLInputElement;
  let isCountryOpen = $state(false);
  let showUserPassword = $state(false);
  let showUserConfirmPassword = $state(false);

  let showAgencyPassword = $state(false);
  let showAgencyConfirmPassword = $state(false);
  let previewUrl = $state<string | null>(null);
  let agentStep = $state(1);
  let userFormData = $state<UserForm>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    isTAndCAgreed: false,
  });
  let agencyFormData = $state<AgencyForm>({
    logoId: '',
    agencyBio: '',
    agencyName: '',
    businessAddress:'',
    email: '',
    firstName: '',
    lastName: '',
    focusAreas: [],
    regNumber: '',
    isRegistered: false,
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    isTAndCAgreed: false,
  });
  const stepFields: Record<string, (keyof AgencyForm)[]> = {
    basicInfo: ["firstName", "lastName", "email", "phoneNumber", "password", "confirmPassword"],
    agencyInfo: ["logoId", "regNumber", "isRegistered", "agencyName", "agencyBio", "businessAddress", "focusAreas"],
    termsAndConditions: ["isTAndCAgreed"],
  };
  let timeout: ReturnType<typeof setTimeout>;


  let { data }: { data: PageData } = $props();

  const countries = $derived<any[]>(data.countries.data);
  const countryIp = $derived(data.ipCountry.data);
  let selected = $state(countryIp);

  // Toast
  let toastMsg     = $state('');
  let toastType = $state<ToastType>('info');
  let toastTimer: ReturnType<typeof setTimeout> | null = null;

  const STEP_LABELS = [
    '',
    'Personal details',
    'Agency profile',
    'Review & confirm'
  ];

  const STEP_PCTS = ['', '33%', '66%', '100%'];
  const STEP_WIDTHS = ['', '33%', '66%', '100%'];

  const handleClick = () => {
    logoFile.click();
  }


  const handleEmailInput = (event: Event) => {
    const email = (event.target as HTMLInputElement).value;

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      checkEmailAvailability(email);
    }, 2000); // wait 2s after user stops typing
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

  const checkEmailAvailability = async (email: string) => {
    try {
      await new ApiRequests().verifyEmailAvailability(email);
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

  const handleLogoUpload = async () => {
    const files = logoFile?.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    previewUrl = URL.createObjectURL(file);

    try {
      const result = await new ApiRequests(ip).uploadFiles([file]);
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

  const isStepValid = (stepIndex: number) => {
    const stepKey = Object.keys(stepFields)[stepIndex - 1];
    const fields = stepFields[stepKey];

    for (const field of fields) {
      const value = agencyFormData[field];

      // handle arrays
      if (Array.isArray(value) && value.length === 0) return false;

      // handle booleans (like T&C)
      if (typeof value === "boolean" && value === false) return false;

      // handle strings
      if (typeof value === "string" && value.trim() === "") return false;

      // null/undefined safety
      if (value === null || value === undefined) return false;
    }

    return true;
  }

  const goNext = () => {
  if (!isStepValid(agentStep)) {
    showToast('Please complete all required fields before continuing', 'error');
    return;
  }

  if (agentStep === 1) {
    const validateMatch = validatePasswordMatch(agencyFormData, 'password', 'confirmPassword');
    if (validateMatch) {
      showToast(validateMatch, 'error');
      return;
    } 
  }

  if (agentStep === 2) {
    if (!isAgencyBioValid) {
      showToast('Agency bio must be at least 80 characters', 'error');
      return;
    }
  }

  if (agentStep < Object.keys(stepFields).length) {
    agentStep += 1;
  }
}

  const agentNext = (step: number) => agentStep = step;

  // derived strength
  const strength = $derived(() => {
    let score = 0;

    if (userFormData.password.length >= 8) score++;
    if (/[A-Z]/.test(userFormData.password)) score++;
    if (/[0-9]/.test(userFormData.password)) score++;
    if (/[^A-Za-z0-9]/.test(userFormData.password)) score++;

    return score;
  });

  // derived strength
  const agentPasswordStrength = $derived(() => {
    let score = 0;

    const password = agencyFormData.password
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  });

  const colours = ['', '#C06035', '#D4AE3A', '#4A90E2', '#4A7848'];
  const labels = ['', 'Weak', 'Fair', 'Strong', 'Very strong'];

  const toggleCountry = () => {
    isCountryOpen = !isCountryOpen;
  };

  const closeCountry = () => {
    isCountryOpen = false;
  };

  // click outside action
  const clickOutside = (node: HTMLElement) => {
    const handleClick = (e: MouseEvent) => {
      if (!node.contains(e.target as Node)) {
        close();
      }
    };

    document.addEventListener('click', handleClick, true);

    return {
      destroy() {
        document.removeEventListener('click', handleClick, true);
      }
    };
  }

  const selectCountry = (country: any) => {
    selected = country;
    isCountryOpen = false;
  };

  const toggleUserPw = () => { showUserPassword = !showUserPassword; };

  const toggleUserConfirmPw = () => showUserConfirmPassword = !showUserConfirmPassword;
  
  const toggleAgencyPw = () => { showAgencyPassword = !showAgencyPassword; };

  const toggleAgencyConfirmPw = () => showAgencyConfirmPassword = !showAgencyConfirmPassword;

  const switchAcctType = (type = 'customer') => {
    accountType = type as AccountTypes;
  }

  // reactive derived value (Svelte 5 runes style)
  const isFormValid = $derived(isFormComplete(userFormData, ['isTAndCAgreed']));

  const isAgencyFormValid = $derived(isFormComplete(agencyFormData, ['isTAndCAgreed']));

  const isAgencyBioValid = $derived(agencyFormData.agencyBio.trim().length >= 80);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (msg: string, type: ToastType) => {
    toastMsg = msg;
    toastType = type;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastMsg = '', 3000);
  }

  const setUserFormField = <K extends keyof UserForm>(
    field: K,
    value: UserForm[K]
  ) => {
	  userFormData[field] = value;
  }

  const setFocusAreas = (focusArea: string) => {
    const focusAreas = [...agencyFormData.focusAreas];
    if (focusAreas.includes(focusArea)) {
      focusAreas.splice(focusAreas.indexOf(focusArea), 1);
    } else {
      focusAreas.push(focusArea);
    }
    setAgencyFormField('focusAreas', focusAreas);
  }

  const setAgencyFormField = <K extends keyof AgencyForm>(
    field: K,
    value: AgencyForm[K]
  ) => {
	  agencyFormData[field] = value;
  }

  const validatePasswordMatch = <T extends Record<string, any>>(
    form: T,
    passwordField: keyof T = 'password',
    confirmField: keyof T = 'confirmPassword'
  ): string | null => {
    if (form[passwordField] !== form[confirmField]) {
      return 'Passwords do not match';
    }
    return null;
  }

  const handleUserSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      const isFormValid = isFormComplete(userFormData, ['isTAndCAgreed']);
      if (!isFormValid) {
        showToast('Please complete all fields and accept Terms & Conditions', 'error');
        return;
      }

      const validateMatch = validatePasswordMatch(userFormData, 'password', 'confirmPassword');
      if (validateMatch) {
        showToast(validateMatch, 'error');
        return;
      } 

      const formattedPhoneNo = normalizeAndValidatePhone({
        countryCode: selected.isoCode,
        phone: userFormData.phoneNumber,
      });
      const result = await new ApiRequests().userSignup({ 
        ...userFormData, 
        phoneNumber: formattedPhoneNo
      });
      if (result.data.success) {
        showToast(result.data.message, 'success');
        const redirectUrl =  `/site/verify-account/${result.data.data.slug}`;
        setTimeout(() => goto(redirectUrl), 3000);
      }
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

  const handleAgentSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      const isFormValid = isFormComplete(agencyFormData, ['isTAndCAgreed']);
      if (!isFormValid) {
        showToast('Please complete all fields and accept Terms & Conditions', 'error');
        return;
      }

      const validateMatch = validatePasswordMatch(agencyFormData, 'password', 'confirmPassword');
      if (validateMatch) {
        showToast(validateMatch, 'error');
        return;
      }
      
      const formattedPhoneNo = normalizeAndValidatePhone({
        countryCode: selected.isoCode,
        phone: agencyFormData.phoneNumber, 
      });
      const result = await new ApiRequests().agencySignup({
         ...agencyFormData, 
         phoneNumber: formattedPhoneNo 
      });
      if (result.data.success) {
        showToast(result.data.message, 'success');
        const redirectUrl =  `/site/verify-account/${result.data.data.slug}`;
        setTimeout(() => goto(redirectUrl), 3000);
      }
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

</script>

<!-- ═══════════════════════════════════════════════
     MAIN SPLIT LAYOUT
═══════════════════════════════════════════════ -->
<div class="flex min-h-screen pt-[68px]">

    <!-- ══════════════════════════════════
         LEFT PANEL — identical to login
    ══════════════════════════════════ -->
    <div class="panel-left hidden md:flex md:w-[44%] lg:w-[48%] flex-col relative animate-panelIn">
  
      <div class="panel-grid"></div>
      <div class="panel-glow" style="width:560px;height:480px;top:-80px;left:-120px;"></div>
      <div class="panel-glow" style="width:380px;height:340px;bottom:60px;right:-60px;opacity:0.6;"></div>
      <div class="panel-arc" style="width:520px;height:520px;"></div>
      <div class="panel-arc" style="width:360px;height:360px;border-color:rgba(74,144,226,0.07);"></div>
      <div class="panel-arc" style="width:200px;height:200px;border-color:rgba(74,144,226,0.05);"></div>
  
      <!-- City illustration (same SVG as login) -->
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
  
      <!-- Left panel content — adapted for sign-up context -->
      <div class="relative z-10 flex flex-col flex-1 px-[7%] py-12 justify-between">
        <div>
          <div class="inline-flex mb-8 animate-fadeUp1">
            <span class="trust-badge"><span class="trust-dot"></span>Join the platform</span>
          </div>
  
          <h2 class="font-display font-light text-white leading-[1.08] mb-5 animate-fadeUp2"
              style="font-size: clamp(32px, 3.5vw, 52px);">
            Your next home<br>starts <em class="italic" style="color:#4A90E2;">here.</em>
          </h2>
  
          <p class="font-sans font-light text-white/55 leading-[1.85] max-w-[360px] mb-9 animate-fadeUp3"
             style="font-size: 14px;">
            Join thousands of verified buyers, renters, and agents across Nigeria and beyond.
          </p>
  
          <!-- Trust points -->
          <div class="space-y-3.5 animate-fadeUp4">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">Free to join — no subscription required</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">Save properties and schedule viewings</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">Direct access to verified agents</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style="background:rgba(212,174,58,0.18);border:1px solid rgba(212,174,58,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#D4AE3A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">Agents: list and boost properties instantly</span>
            </div>
          </div>
        </div>
  
        <!-- Agent social proof testimonial -->
        <div class="testi-card p-5 max-w-[360px] animate-fadeUp5">
          <div class="flex gap-[3px] mb-3">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          </div>
          <p class="font-display font-light italic text-white/75 leading-[1.65] mb-4" style="font-size:15px;">
            "I closed six deals in my first month. The dashboard and verified listings gave my clients total confidence."
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
       RIGHT PANEL — sign-up form
  ══════════════════════════════════ -->
  <div class="panel-right flex-1 flex items-start justify-center relative px-5 sm:px-8 py-10 overflow-y-auto">

    <!-- Mobile back -->
    <a href="index.html" class="md:hidden absolute top-5 left-5 flex items-center gap-1.5 text-[12px] font-normal text-chalk-muted hover:text-navy-dark transition-colors no-underline z-10">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      Back
    </a>

    <!-- Form card -->
    <div class="form-card w-full max-w-[500px] right-inner mt-6 mb-6" style="padding: 36px 44px;">


      <!-- Mobile logo -->
      <div class="md:hidden flex items-center gap-[10px] mb-7">
      {#if themeStore.theme === 'light'}
        <svg width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
          <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
          <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
          <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
          <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
        </svg>
        {:else}
        <svg width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <!-- Base platform (slightly brighter for dark bg) -->
            <rect x="4" y="28" width="28" height="4" rx="2" fill="#5AA8FF"/>
          
            <!-- Outer waves (soft glow effect using lighter stroke) -->
            <path d="M8 28 Q8 18 18 14 Q28 18 28 28"
                  fill="none"
                  stroke="#9FCBFF"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  opacity="0.25"/>
          
            <path d="M6 28 Q6 14 18 10 Q30 14 30 28"
                  fill="none"
                  stroke="#9FCBFF"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  opacity="0.5"/>
          
            <!-- Main wave (highest contrast) -->
            <path d="M4 29 Q4 11 18 6 Q32 11 32 29"
                  fill="none"
                  stroke="#D6E9FF"
                  stroke-width="2.5"
                  stroke-linecap="round"/>
          
            <!-- Center node -->
            <circle cx="18" cy="28" r="3.5" fill="#5AA8FF"/>
          </svg>
        {/if}
        <span class="font-sans text-[16px] font-medium tracking-em-018">BLUPODD</span>
      </div>

      <!-- ─────────────────────────────────
           ACCOUNT TYPE SWITCHER
           Customer | Agent
      ───────────────────────────────── -->
      <div class="mb-7 animate-fadeUp">
        <div class="tab-strip flex items-center gap-1 rounded-[14px] p-1.5" id="acctTabWrap">
          <button class={`acct-tab ${accountType === 'customer' ? 'active' : ''}`} 
            id="tabCustomer" 
            onclick={() => switchAcctType('customer')}>
            <span class="flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><circle cx="8" cy="5" r="3"/><path d="M2 14c0-3.314 2.686-5 6-5s6 1.686 6 5"/></svg>
              Customer
            </span>
          </button>
          <button class={`acct-tab ${accountType === 'agency' ? 'active' : ''}`}
           id="tabAgent" 
           onclick={() => switchAcctType('agency')}>
            <span class="flex items-center justify-center gap-2">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><rect x="1" y="10" width="14" height="5" rx="2"/><circle cx="8" cy="5" r="3"/><path d="M5 10V8a3 3 0 016 0v2"/></svg>
              Agent
            </span>
          </button>
        </div>
      </div>

      {#if accountType === 'customer'}
      <!-- ═══════════════════════════════════════
           CUSTOMER SIGN-UP — single step
      ═══════════════════════════════════════ -->
      <div id="panelCustomer" class="form-panel">

        <div class="mb-6 animate-fadeUp1">
          <h1 class="font-display font-light leading-[1.1] mb-1" style="font-size: clamp(26px, 3vw, 36px);">
            Create account.
          </h1>
          <p class="font-sans font-light text-chalk-muted" style="font-size: 14px;">Start finding your perfect home today</p>
        </div>

        <!-- Social auth -->
        <div class="space-y-2.5 mb-5 animate-fadeUp2">
          <button class="btn-social" type="button">
            <svg xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="#FFFFFF"
              aria-hidden="true"
            >
            <path d="M16.37 12.73c.02 2.27 2.02 3.03 2.04 3.04-.02.05-.32 1.09-1.05 2.16-.63.93-1.29 1.85-2.32 1.87-1.01.02-1.34-.6-2.5-.6-1.16 0-1.52.58-2.48.62-1 .04-1.76-1-2.4-1.93-1.31-1.9-2.31-5.38-.97-7.7.66-1.15 1.84-1.88 3.13-1.9.98-.02 1.9.66 2.5.66.6 0 1.73-.82 2.91-.7.5.02 1.9.2 2.8 1.52-.07.04-1.67.97-1.66 2.96zM14.57 4.73c.53-.64.9-1.53.8-2.42-.77.03-1.7.5-2.26 1.14-.5.57-.94 1.47-.82 2.33.86.07 1.75-.44 2.28-1.05z"/>
          </svg>
            Continue with Apple
          </button>
          <button class="btn-social" type="button">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
        </div>

        <div class="auth-divider mb-5 animate-fadeUp3">
          <span class="font-sans font-light text-chalk-muted whitespace-nowrap" style="font-size:12px;letter-spacing:0.09em;text-transform:uppercase;">or sign up with email</span>
        </div>

        <form onsubmit={handleUserSubmit}>
          <!-- Name row -->
          <div class="grid grid-cols-2 gap-3 mb-3 two-col animate-fadeUp3">
            <div>
              <label class="auth-label" for="cFirstName">First name</label>
              <input oninput={(e) => setUserFormField("firstName", (e.target as HTMLInputElement).value)} 
                bind:value={userFormData.firstName}
                type="text" 
                required
                id="cFirstName" 
                class="auth-input" 
                placeholder="Amara" 
                autocomplete="given-name" 
              />
            </div>
            <div>
              <label class="auth-label" for="cLastName">Last name</label>
              <input oninput={(e) => setUserFormField("lastName", (e.target as HTMLInputElement).value)} 
                bind:value={userFormData.lastName}
                type="text" 
                required
                id="cLastName" 
                class="auth-input" 
                placeholder="Okonkwo" 
                autocomplete="family-name" 
              />
            </div>
          </div>

          <!-- Email -->
          <div class="mb-3 animate-fadeUp3" id="cEmailWrap">
            <label class="auth-label" for="cEmail">Email address</label>
            <input oninput={(e) => {
              setUserFormField("email", (e.target as HTMLInputElement).value);
              handleEmailInput(e);
            }} 
              bind:value={userFormData.email}
              type="email" 
              id="cEmail" 
              required
              class="auth-input" 
              placeholder="you@example.com" 
              autocomplete="email" 
            />
            <span class="error-msg">Please enter a valid email address.</span>
          </div>

          <!-- Fix the on_input handler -->
          <PhoneInput 
            onchange={(country) => selectCountry(country)}
            oninput={(e) => {
              setUserFormField("phoneNumber", (e.target as HTMLInputElement).value);
              handlePhoneNoInput(e);
            }} 
            countries={countries.map((country) => ({...country, isPinned: country.id === selected.id}))} 
            selectedCountry={{...selected, isPinned: true}}  
          />

          <!-- Password -->
          <div class="mb-2 animate-fadeUp4" id="cPassWrap">
            <label class="auth-label" for="cPass">Password</label>
            <div class="relative">
              <input type={showUserPassword ? "text" : "password"} 
                  oninput={(e) => setUserFormField("password", (e.target as HTMLInputElement).value)}
                  bind:value={userFormData.password}
                  id="cPass" 
                  required
                  class="auth-input" 
                  style="padding-right:48px;" 
                  placeholder="At least 8 characters" 
                  autocomplete="new-password" />
                  <button 
                    class="pw-eye" 
                    type="button" 
                    onclick={toggleUserPw}
                    aria-label={showUserPassword ? "Hide password" : "Show password"}
                  >
                    {#if showUserPassword}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M13.45 13.45A7.07 7.07 0 0110 14c-5 0-9-4-9-4s1.34-2.29 3.45-3.84M17 10s-1.22 2.08-3.55 3.45M4 4l12 12" />
                      </svg>
                    {:else}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" />
                        <circle cx="10" cy="10" r="3"/>
                      </svg>
                    {/if}
                  </button>
            </div>
          <!-- Strength bars -->
          <div class="flex gap-1.5 mt-2">
              {#each [1, 2, 3, 4] as i}
              <div
                  class="str-seg"
                  style="background: {i <= strength() && strength() > 0 ? colours[strength()] : ''}"
              ></div>
              {/each}
          </div>
          <span
              class="font-sans font-light text-chalk-muted mt-1 block text-[11px]"
              style="color: {colours[strength()] || ''}"
          >
              {userFormData.password.length ? labels[strength()] : ''}
          </span>

          <!-- Error -->
          {#if userFormData.password.length > 0 && userFormData.password.length < 8}
          <span class="error-msg block">Password must be at least 8 characters.</span>
          {/if}
          </div>

          <!-- Confirm password -->
          <div class="mb-4 animate-fadeUp4" id="cConfWrap">
            <label class="auth-label" for="cConf">Confirm password</label>
            <div class="relative">
              <input oninput={(e) => setUserFormField("confirmPassword", (e.target as HTMLInputElement).value)}
                bind:value={userFormData.confirmPassword}
                type={showUserConfirmPassword ? "text" : "password"} 
                id="cConf" 
                required
                class="auth-input" 
                style="padding-right:48px;" 
                placeholder="Repeat your password" 
                autocomplete="new-password" 
              />
              <button class="pw-eye" type="button" onclick={toggleUserConfirmPw} aria-label="Show password">
                {#if showUserConfirmPassword}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M13.45 13.45A7.07 7.07 0 0110 14c-5 0-9-4-9-4s1.34-2.29 3.45-3.84M17 10s-1.22 2.08-3.55 3.45M4 4l12 12" />
                      </svg>
                    {:else}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" />
                        <circle cx="10" cy="10" r="3"/>
                      </svg>
                    {/if}
              </button>
            </div>
            <span class="error-msg">Passwords don't match.</span>
          </div>

          <!-- Terms -->
          <div class="flex items-start gap-2.5 mb-5 animate-fadeUp5">
            <input
              bind:checked={userFormData.isTAndCAgreed} 
              type="checkbox" 
              id="cTerms" 
              class="auth-check" 
              style="margin-top:2px;" 
            />
            <label for="cTerms" class="font-sans font-light text-chalk-muted cursor-pointer leading-[1.7]" style="font-size:12px;">
              I agree to Blupodd's <a href="/site/privacy-policy" class="auth-link" style="font-size:12px;">Terms of Service</a> and <a href="/site/privacy-policy" class="auth-link" style="font-size:12px;">Privacy Policy</a>
            </label>
          </div>

          <button disabled={!isFormValid} 
            class:disabled={!isFormValid}
            class="btn-primary animate-fadeUp5" 
            type="submit" 
            id="cSubmitBtn">
            Create account
          </button>

          <p class="text-center font-sans font-light text-chalk-muted mt-5 animate-fadeUp6" style="font-size:13px;">
            Already have an account?&nbsp;<a href="/site/login" class="auth-link">Log in</a>
          </p>
      </form>

      </div><!-- /panelCustomer -->
      {:else}
      <!-- ═══════════════════════════════════════
           AGENT SIGN-UP — 3-step multi-step form
      ═══════════════════════════════════════ -->
      <div id="panelAgent" class="form-panel">

        <!-- Progress bar -->
        <div class="mb-6 animate-fadeUp">
          <div class="flex items-center justify-between mb-2.5">
            <span class="font-sans font-light text-chalk-muted" style="font-size:12px;" id="agentStepLabel">
                Step {agentStep} of 3 — Personal details
            </span>
            <span class="font-sans font-medium" id="agentStepPct" style="font-size:12px;color:#C06035;">
                {STEP_PCTS[agentStep]}
            </span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" id="agentProgressBar" style={`width:${STEP_PCTS[agentStep]}`}></div>
          </div>
          <div class="flex items-center gap-2.5 mt-3">
          {#each [1, 2, 3] as i}
            <div class={`step-dot ${i === agentStep ? 'active' : ''} ${i < agentStep ? 'done' : ''}`} 
                id="sdot{i}"></div>
            {/each}
            <span class="font-sans font-light text-chalk-muted ml-1" style="font-size:11px;" id="agentStepName">
            {STEP_LABELS[agentStep]}
            </span>
          </div>
        </div>

        <form onsubmit={handleAgentSubmit}>
          {#if agentStep === 1}
          <!-- ─── STEP 1: Personal details ─── -->
          <div id="agentStep1" class="form-panel">
            <div class="mb-5 animate-fadeUp1">
              <h1 class="font-display font-light leading-[1.1] mb-1" style="font-size: clamp(24px, 2.8vw, 34px);">Personal details.</h1>
              <p class="font-sans font-light text-chalk-muted" style="font-size:14px;">Let's start with who you are</p>
            </div>

            <div class="grid grid-cols-2 gap-3 mb-3 two-col animate-fadeUp2">
              <div>
                <label class="auth-label" for="aFirstName">First name</label>
                <input 
                  oninput={(e) => setAgencyFormField('firstName', (e.target as HTMLInputElement).value)}
                  bind:value={agencyFormData.firstName}
                  type="text" 
                  required
                  id="aFirstName" 
                  class="auth-input" 
                  placeholder="Chukwuemeka" 
                  autocomplete="given-name" 
                />
              </div>
              <div>
                <label class="auth-label" for="aLastName">Last name</label>
                <input 
                  oninput={(e) => setAgencyFormField('lastName', (e.target as HTMLInputElement).value)}
                  bind:value={agencyFormData.lastName}
                  type="text" 
                  required
                  id="aLastName" 
                  class="auth-input" 
                  placeholder="Okafor" 
                  autocomplete="family-name" 
                />
              </div>
            </div>

            <div class="mb-3 animate-fadeUp2" id="aEmailWrap">
              <label class="auth-label" for="aEmail">Email address</label>
              <input 
                  oninput={(e) => {
                    setAgencyFormField('email', (e.target as HTMLInputElement).value);
                    handleEmailInput(e);
                  }}
                  bind:value={agencyFormData.email}
                  type="email" 
                  required
                  id="aEmail" 
                  class="auth-input" 
                  placeholder="agent@example.com" 
                  autocomplete="email" 
                />
              <span class="error-msg">Please enter a valid email address.</span>
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

            <div class="mb-2 animate-fadeUp4" id="aPassWrap">
              <label class="auth-label" for="aPass">Password</label>
              <div class="relative">
                <input 
                  oninput={(e) => setAgencyFormField('password', (e.target as HTMLInputElement).value)}
                  bind:value={agencyFormData.password}
                  type={showAgencyPassword ? "text" : "password"} 
                  id="aPass" 
                  class="auth-input" 
                  style="padding-right:48px;" 
                  placeholder="At least 8 characters" 
                  autocomplete="new-password" 
                />
                <button class="pw-eye" type="button" onclick={toggleAgencyPw} aria-label="Show password">
                  {#if showAgencyPassword}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M13.45 13.45A7.07 7.07 0 0110 14c-5 0-9-4-9-4s1.34-2.29 3.45-3.84M17 10s-1.22 2.08-3.55 3.45M4 4l12 12" />
                      </svg>
                    {:else}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" />
                        <circle cx="10" cy="10" r="3"/>
                      </svg>
                    {/if}
                </button>
              </div>
              <!-- Strength bars -->
              <div class="flex gap-1.5 mt-2">
                  {#each [1, 2, 3, 4] as i}
                  <div
                      class="str-seg"
                      style="background: {i <= agentPasswordStrength() && agentPasswordStrength() > 0 ? colours[agentPasswordStrength()] : ''}"
                  ></div>
                  {/each}
              </div>
              <span
                  class="font-sans font-light text-chalk-muted mt-1 block text-[11px]"
                  style="color: {colours[agentPasswordStrength()] || ''}"
              >
                  {agencyFormData.password.length ? labels[agentPasswordStrength()] : ''}
              </span>

              <!-- Error -->
              {#if agencyFormData.password.length > 0 && agencyFormData.password.length < 8}
              <span class="error-msg block">Password must be at least 8 characters.</span>
              {/if}
          </div>

            <div class="mb-5 animate-fadeUp4" id="aConfWrap">
              <label class="auth-label" for="aConf">Confirm password</label>
              <div class="relative">
                <input 
                  oninput={(e) => setAgencyFormField('confirmPassword', (e.target as HTMLInputElement).value)}
                  bind:value={agencyFormData.confirmPassword}
                  type={showAgencyConfirmPassword ? "text" : "password"} 
                  id="aConf" 
                  class="auth-input" 
                  style="padding-right:48px;" 
                  placeholder="Repeat your password" 
                  autocomplete="new-password" />
                <button class="pw-eye" type="button" onclick={toggleAgencyConfirmPw} aria-label="Show password">
                  {#if showAgencyConfirmPassword}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M13.45 13.45A7.07 7.07 0 0110 14c-5 0-9-4-9-4s1.34-2.29 3.45-3.84M17 10s-1.22 2.08-3.55 3.45M4 4l12 12" />
                      </svg>
                    {:else}
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        stroke="currentColor" 
                        stroke-width="1.5"
                      >
                        <path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" />
                        <circle cx="10" cy="10" r="3"/>
                      </svg>
                    {/if}
                </button>
              </div>
              <span class="error-msg">Passwords don't match.</span>
            </div>

            <button class="btn-primary animate-fadeUp5" type="button" onclick={goNext}>
              Continue
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="display:inline-block;margin-left:6px;vertical-align:-2px;"><path d="M6 3l5 5-5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>

            <p class="text-center font-sans font-light text-chalk-muted mt-4" style="font-size:13px;">
              Already have an account?&nbsp;<a href="/site/login" class="auth-link">Log in</a>
            </p>
          </div><!-- /site/agentstep1 -->
          {/if}

          {#if agentStep === 2}
          <!-- ─── STEP 2: Agency profile ─── -->
          <div id="agentStep2" class="form-panel">
            <div class="mb-5 animate-fadeUp1">
              <button class="flex items-center gap-2 font-sans font-normal text-chalk-muted hover:text-navy-dark transition-colors mb-4 bg-transparent border-none cursor-pointer p-0" onclick={() => agentNext(1)} style="font-size:13px;">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Back
              </button>
              <h1 class="font-display font-light leading-[1.1] mb-1" style="font-size: clamp(24px, 2.8vw, 34px);">Agency profile.</h1>
              <p class="font-sans font-light text-chalk-muted" style="font-size:14px;">Tell us about your agency</p>
            </div>

            <!-- Agency logo upload -->
            <div class="mb-4 animate-fadeUp2">
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

            <div class="mb-3 animate-fadeUp2" id="aAgencyNameWrap">
              <label class="auth-label" for="aAgencyName">Agency name</label>
              <input 
                oninput={(e) => setAgencyFormField('agencyName', (e.target as HTMLInputElement).value)}
                bind:value={agencyFormData.agencyName}
                required
                type="text" 
                id="aAgencyName" 
                class="auth-input" 
                placeholder="e.g. Premier Properties PH" 
              />
              <span class="error-msg">Agency name is required.</span>
            </div>

            <div class="mb-3 animate-fadeUp3">
              <label class="auth-label" for="aAddress">Business address</label>
              <textarea 
                oninput={(e) =>
                  setAgencyFormField(
                    'businessAddress',
                    (e.target as HTMLTextAreaElement).value
                  )
                }
                bind:value={agencyFormData.businessAddress} 
                id="aAddress" 
                class="auth-textarea" 
                rows="3" 
                placeholder="e.g. 14 Augustine Nwosu Close, GRA, PH">
              </textarea>
            </div>

            <div class="mb-5 animate-fadeUp4">
              <label class="auth-label" for="aDesc">
                Brief description 
                <!-- <span class="font-sans normal-case" style="font-size:11px;letter-spacing:0;text-transform:none;color:#8C8070;">(optional)</span> -->
              </label>
              <textarea id="aDesc"
                class="auth-textarea" 
                rows="3" 
                placeholder="Describe your agency — specialization, years of experience, key locations…"
                bind:value={agencyFormData.agencyBio} 
                oninput={(e) =>
                  setAgencyFormField(
                    'agencyBio',
                    (e.target as HTMLTextAreaElement).value
                  )
                }
                >
              </textarea>
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

            <button class="btn-primary animate-fadeUp5" type="button" onclick={goNext}>
              Continue
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style="display:inline-block;margin-left:6px;vertical-align:-2px;"><path d="M6 3l5 5-5 5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div><!-- /site/agentstep2 -->
          {/if}

          {#if agentStep === 3}
          <!-- ─── STEP 3: Confirm & agree ─── -->
          <div id="agentStep3" class="form-panel">
            <div class="mb-5 animate-fadeUp1">
              <button class="flex items-center gap-2 font-sans font-normal text-chalk-muted hover:text-navy-dark transition-colors mb-4 bg-transparent border-none cursor-pointer p-0" onclick={() => agentNext(2)} style="font-size:13px;">
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Back
              </button>
              <h1 class="font-display font-light leading-[1.1] mb-1" style="font-size: clamp(24px, 2.8vw, 34px);">Almost done.</h1>
              <p class="font-sans font-light text-chalk-muted" style="font-size:14px;">Review and confirm your details</p>
            </div>

            <!-- Summary card -->
            <div class="section-card mb-5 animate-fadeUp2">
              <div class="section-head">Your details</div>
              <div class="grid grid-cols-2 gap-x-4 gap-y-2.5 two-col">
                <div>
                  <div class="auth-label" style="margin-bottom:3px;">Name</div>
                  <div class="font-sans font-normal" style="font-size:14px;" id="summaryName">
                    {agencyFormData.firstName} {agencyFormData.lastName}
                  </div>
                </div>

                <div>
                  <div class="auth-label" style="margin-bottom:3px;">Email</div>
                  <div class="font-sans font-normal truncate" style="font-size:14px;" id="summaryEmail">
                    {agencyFormData.email}
                  </div>
                </div>

                <div>
                  <div class="auth-label" style="margin-bottom:3px;">Agency</div>
                  <div class="font-sans font-normal" style="font-size:14px;" id="summaryAgency">
                    {agencyFormData.agencyName}
                  </div>
                </div>

                <div>
                  <div class="auth-label" style="margin-bottom:3px;">Phone Number</div>
                  <div class="font-sans font-normal" style="font-size:14px;" id="summaryPhone">
                    {agencyFormData.phoneNumber}
                  </div>
                </div>

                <div>
                  <div class="auth-label" style="margin-bottom:3px;">Focus Areas</div>
                  <div class="ai-specs" id="agentSpecs">
                    {#each agencyFormData.focusAreas as _}
                    <span class="ai-spec" 
                      class:active={agencyFormData.focusAreas.includes(_)} 
                      onclick={() => setFocusAreas(_)}>
                      {_}
                    </span>
                    {/each}
                  </div>
                </div>

                <div>
                  <div class="auth-label" style="margin-bottom:3px;">Location</div>
                  <div class="font-sans font-normal" style="font-size:14px;" id="summaryState">
                    {agencyFormData.businessAddress}
                  </div>
                </div>

              </div>
            </div>

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

            <button 
              class:disabled={!isAgencyFormValid}
              disabled={!isAgencyFormValid}
              class="btn-primary animate-fadeUp4" 
              type="submit" 
              id="aSubmitBtn"
            >
              Create agent account
            </button>

            <p class="text-center font-sans font-light text-chalk-muted mt-4 animate-fadeUp5" style="font-size:13px;">
              Already have an account?&nbsp;<a href="/site/login" class="auth-link">Log in</a>
            </p>
          </div><!-- /site/agentstep3 -->
          {/if}
        </form>

      </div><!-- /panelAgent -->
      {/if}

    </div><!-- /form-card -->
  </div><!-- /panel-right -->

</div><!-- /main -->

{#if toastMsg  && toastMsg !== ''}
<Toast toastMsg={toastMsg} type={toastType} />
{/if}
    

<style>
/* ── Left panel (identical to login) ── */
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

/* ── Form card (identical to login) ── */
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

/* ── Auth inputs (identical to login) ── */
.auth-input {
  position: relative; z-index: 1;
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
:global([data-theme="dark"]) .auth-input { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
:global([data-theme="dark"]) .auth-input::placeholder { color: #6A7FA0; }
:global([data-theme="dark"]) .auth-input:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }

/* ── Textarea variant ── */
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
:global([data-theme="dark"]) .auth-textarea::placeholder { color: #6A7FA0; }
:global([data-theme="dark"]) .auth-textarea:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }

/* ── Password eye toggle ── */
.pw-eye {
  position: absolute; right: 14px; top: 50%; transform: translateY(-50%); z-index: 99;
  background: none; border: none; cursor: pointer; padding: 4px;
  color: #8C8070; transition: color 0.2s;
  display: flex; align-items: center; justify-content: center;
}
.pw-eye:hover { color: #0A2463; }
:global([data-theme="dark"]) .pw-eye { color: #6A7FA0; }
:global([data-theme="dark"]) .pw-eye:hover { color: #E8EDF5; }


/* ── Primary CTA (identical to login) ── */
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

/* ── Secondary / ghost button ── */
.btn-ghost {
  background: transparent; color: #0A2463;
  font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400; letter-spacing: 0.03em;
  padding: 13px 36px; border-radius: 40px;
  border: 1.5px solid #EDE7DC; cursor: pointer;
  transition: border-color 0.2s, background 0.2s, color 0.2s;
  width: 100%;
}
.btn-ghost:hover { border-color: rgba(10,36,99,0.4); background: #F7F3EC; }
:global([data-theme="dark"]) .btn-ghost { color: #E8EDF5; border-color: rgba(255,255,255,0.12); }
:global([data-theme="dark"]) .btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: rgba(255,255,255,0.25); }

/* ── Social buttons (identical to login) ── */
.btn-social {
  width: 100%; background: #ffffff; border: 1.5px solid #EDE7DC; border-radius: 12px;
  padding: 12px 16px;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.03em; color: #0A2463;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center; gap: 10px;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s, transform 0.15s;
}
.btn-social:hover {
  border-color: rgba(74,144,226,0.45); background: #F7F3EC;
  box-shadow: 0 4px 18px rgba(10,36,99,0.07); transform: translateY(-1px);
}
:global([data-theme="dark"]) .btn-social { background: #1A2438; border-color: rgba(255,255,255,0.09); color: #E8EDF5; }
:global([data-theme="dark"]) .btn-social:hover { background: #1F2D45; border-color: rgba(74,144,226,0.40); box-shadow: 0 4px 18px rgba(0,0,0,0.32); }

/* ── Divider (identical to login) ── */
.auth-divider { display: flex; align-items: center; gap: 14px; }
.auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #EDE7DC; transition: background 0.3s; }
:global([data-theme="dark"]) .auth-divider::before, [data-theme="dark"] .auth-divider::after { background: rgba(255,255,255,0.08); }

/* ── Account type tabs — the main Customer / Agent switch ── */
.acct-tab {
  flex: 1; text-align: center;
  font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.04em;
  padding: 10px 16px; border-radius: 12px; border: none;
  cursor: pointer;
  transition: background 0.22s, color 0.22s, box-shadow 0.22s;
  background: transparent; color: #8C8070;
}
.acct-tab.active {
  background: #ffffff; color: #0A2463; font-weight: 500;
  box-shadow: 0 2px 10px rgba(10,36,99,0.10);
}
.acct-tab:not(.active):hover { color: #0A2463; }
:global([data-theme="dark"]) .acct-tab { color: #6A7FA0; }
:global([data-theme="dark"]) .acct-tab.active { background: #1A2438; color: #E8EDF5; box-shadow: 0 2px 10px rgba(0,0,0,0.32); }
:global([data-theme="dark"]) .acct-tab:not(.active):hover { color: #E8EDF5; }

/* ── Tab strip (identical to login .tab-strip) ── */
.tab-strip { background: #EDE7DC; transition: background 0.3s; }
:global([data-theme="dark"]) .tab-strip { background: #1A2438; }

/* ── Field label (identical to login) ── */
.auth-label {
  display: block;
  font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase; color: #4A70A0;
  margin-bottom: 7px; transition: color 0.3s;
}
:global([data-theme="dark"]) .auth-label { color: #6A7FA0; }

/* ── Links (identical to login) ── */
.auth-link { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: #1A6ADE; text-decoration: none; transition: color 0.2s; }
.auth-link:hover { color: #0A2463; }
:global([data-theme="dark"]) .auth-link { color: #4A90E2; }
:global([data-theme="dark"]) .auth-link:hover { color: #8DAACC; }

/* ── Error message (identical to login) ── */
.error-msg { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #C06035; display: none; margin-top: 5px; }
.show-error .error-msg { display: block; }

/* ── Password strength (identical to login) ── */
.str-seg { height: 3px; border-radius: 3px; flex: 1; background: #EDE7DC; transition: background 0.3s; }
:global([data-theme="dark"]) .str-seg { background: rgba(255,255,255,0.08); }

/* ── Checkbox (identical to login) ── */
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

/* ── Trust badge (identical to login) ── */
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

/* ── Testimonial card (identical to login) ── */
.testi-card {
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
  border-radius: 16px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  transition: border-color 0.25s;
}
.testi-card:hover { border-color: rgba(255,255,255,0.16); }

/* ── Progress dots (multi-step agent form) ── */
.step-dot {
  width: 8px; height: 8px; border-radius: 50%;
  background: #EDE7DC; transition: background 0.3s, transform 0.3s;
  flex-shrink: 0;
}
.step-dot.active { background: #C06035; transform: scale(1.25); }
.step-dot.done   { background: #4A7848; }
:global([data-theme="dark"]) .step-dot { background: rgba(255,255,255,0.12); }
:global([data-theme="dark"]) .step-dot.active { background: #C06035; }
:global([data-theme="dark"]) .step-dot.done   { background: #4A7848; }

/* ── Progress bar strip ── */
.progress-track { height: 2px; background: #EDE7DC; border-radius: 2px; transition: background 0.3s; }
:global([data-theme="dark"]) .progress-track { background: rgba(255,255,255,0.08); }
.progress-fill { height: 100%; border-radius: 2px; background: #C06035; transition: width 0.4s cubic-bezier(0.4,0,0.2,1); }

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

/* ── Section divider card ── */
.section-card {
  background: #ffffff; border: 1px solid #EDE7DC; border-radius: 14px; padding: 18px 18px 14px;
  transition: background 0.3s, border-color 0.3s;
}
:global([data-theme="dark"]) .section-card { background: rgba(255,255,255,0.03); border-color: rgba(255,255,255,0.07); }

/* ── Section heading within form ── */
.section-head {
  font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase; color: #4A70A0;
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 14px; transition: color 0.3s;
}
:global([data-theme="dark"]) .section-head { color: #6A7FA0; }
.section-head::after { content: ''; flex: 1; height: 1px; background: #EDE7DC; transition: background 0.3s; }
:global([data-theme="dark"]) .section-head::after { background: rgba(255,255,255,0.07); }

/* .ai-agency{font-size:14px;color:rgba(255,255,255,.55);font-weight:300;margin-bottom:7px} */
.ai-agency strong{color:rgba(255,255,255,.82);font-weight:500}
.ai-loc{font-size:13px;color:rgba(255,255,255,.42);display:flex;align-items:center;gap:6px;margin-bottom:13px}
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

/* ── Toast (identical to login) ── */
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

/* ── Form panel slide animation ── */
.form-panel { transition: opacity 0.25s ease, transform 0.28s cubic-bezier(0.22,1,0.36,1); }
.form-panel.hidden { display: none; }
.form-panel.entering { animation: slideRight 0.3s cubic-bezier(0.22,1,0.36,1) both; }
.form-panel.exiting  { animation: slideLeft  0.25s ease both; }

/* ── Mobile (identical breakpoints to login) ── */
@media (max-width: 768px) {
  .panel-left  { display: none !important; }
  .panel-right { width: 100% !important; }
  .form-card   { box-shadow: none !important; border-radius: 0 !important; border: none !important; min-height: calc(100dvh - 68px); }
  .right-inner { padding: 28px 20px !important; }
  .two-col     { grid-template-columns: 1fr !important; }
}
@media (max-width: 400px) {
  .phone-flag-btn { padding: 0 8px; }
}

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
</style>