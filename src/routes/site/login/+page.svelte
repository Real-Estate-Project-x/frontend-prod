<script lang="ts">
  import { page } from '$app/state';
  import { AxiosError } from 'axios';
  import { goto } from "$app/navigation";
  import type { ToastType } from '$lib/types';
  import { ApiRequests } from "$lib/api/api.request";
  import { AppRole, LSKey } from "$lib/utils/constant";
  import { themeStore } from "$lib/stores/theme.svelte";
  import Toast from '$lib/components/shared/Toast.svelte';
  import { PUBLIC_ENCRYPTION_KEY, PUBLIC_SITE_BASE_URL } from "$env/static/public";
  import { extractLocalStorageInfo, getErrorMessage, setLocalStorageField } from "$lib/utils";
  import { onMount } from 'svelte';

  type LoginType = { 
    email: string, 
    password: string, 
    rememberMe: boolean
  }
  let payload = $state<LoginType>({
    email: "",
    password: "",
    rememberMe: false,
  });
  let showPassword = $state(false);

  // Toast
  let toastMsg     = $state('');
  let toastType = $state<ToastType>('info');
  let toastTimer: ReturnType<typeof setTimeout> | null = null;

  const togglePw = () => showPassword = !showPassword;

  const redirectUser = (role: string, redirectUrl?: string): string => {
    let baseUrl: string;

    switch (role) {
      case AppRole.ADMIN:
      case AppRole.LANDLORD:
      case AppRole.SUPER_ADMIN:
        baseUrl = '/admin/dashboard';
        break;

      case AppRole.AGENT:
        baseUrl = '/agency';
        break;

      case AppRole.CUSTOMER:
        baseUrl = '/users';
        break;

      case AppRole.SUB_AGENT:
        baseUrl = '/s-agents';
        break;

      default:
        baseUrl = '/';
    }

    if (!redirectUrl) {
      return baseUrl;
    }

    // Remove query params and trailing slashes
    const sanitizedRedirect = redirectUrl
      .split('?')[0]
      .replace(/\/+$/, '');

    // Exact match
    if (sanitizedRedirect === baseUrl) {
      return redirectUrl;
    }

    // Child route match
    if (sanitizedRedirect.startsWith(`${baseUrl}/`)) {
      // For even better security, normalize the URL
      return new URL(
        redirectUrl,
        PUBLIC_SITE_BASE_URL,
      ).pathname;
  
    }

    return baseUrl;
  };

  onMount(() => init());

  const init = () => {
    const userInfo = extractLocalStorageInfo(PUBLIC_ENCRYPTION_KEY);
    if (userInfo) {
      const redirectTo = page.url.searchParams.get('redirect_to');
      if (redirectTo) {
        goto(redirectUser(userInfo.roleName, redirectTo));
      } else {
        goto(redirectUser(userInfo.roleName));
      }
    }
  }

  const handleLogin = async (e: SubmitEvent) => {
    e.preventDefault();

    try {
      const result = await new ApiRequests().login(
        payload.email, 
        payload.password, 
        payload.rememberMe
      );

      if (result.data.success) {
        setLocalStorageField(LSKey.blp_data, result.data.data);
        const userInfo = extractLocalStorageInfo(PUBLIC_ENCRYPTION_KEY);
        if (userInfo) {
          const redirectTo = page.url.searchParams.get('redirect_to');
          if (redirectTo) {
            goto(redirectUser(userInfo.roleName, redirectTo));
          } else {
            goto(redirectUser(userInfo.roleName));
          }
        }
      }
    } catch(ex) {
      if (ex instanceof AxiosError) {
        const message = getErrorMessage(ex);
        showToast(message, 'error');
      }
      return;
    }
  }

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (msg: string, type: ToastType) => {
    toastMsg = msg;
    toastType = type;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastMsg = '', 3000);
  }
</script>

<!-- ═══════════════════════════════════════════════
     MAIN  —  full-height split layout below nav
═══════════════════════════════════════════════ -->
<div class="flex min-h-screen pt-[68px]">

    <!-- ════════════════════════════════
         LEFT PANEL — branding + trust
    ════════════════════════════════ -->
    <div class="panel-left hidden md:flex md:w-[46%] lg:w-[52%] flex-col relative animate-panelIn">
  
      <!-- Grid overlay -->
      <div class="panel-grid"></div>
  
      <!-- Ambient glows -->
      <div class="panel-glow" style="width:560px;height:480px;top:-80px;left:-120px;"></div>
      <div class="panel-glow" style="width:380px;height:340px;bottom:60px;right:-60px;opacity:0.6;"></div>
  
      <!-- Concentric arc rings (hero-arc-ring pattern from home_page.html) -->
      <div class="panel-arc" style="width:520px;height:520px;"></div>
      <div class="panel-arc" style="width:360px;height:360px;border-color:rgba(74,144,226,0.07);"></div>
      <div class="panel-arc" style="width:200px;height:200px;border-color:rgba(74,144,226,0.05);"></div>
  
      <!-- Architectural city illustration -->
      <div class="absolute bottom-0 left-0 right-0 pointer-events-none" style="height:56%;">
        <svg class="w-full h-full" viewBox="0 0 800 448" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
          <!-- Far buildings -->
          <rect x="28"  y="198" width="58"  height="250" rx="3" fill="rgba(255,255,255,0.04)"/>
          <rect x="38"  y="160" width="38"  height="44"  rx="2" fill="rgba(255,255,255,0.03)"/>
          <rect x="108" y="148" width="78"  height="300" rx="3" fill="rgba(255,255,255,0.04)"/>
          <rect x="118" y="114" width="58"  height="40"  rx="2" fill="rgba(255,255,255,0.03)"/>
          <rect x="198" y="190" width="52"  height="258" rx="3" fill="rgba(255,255,255,0.04)"/>
          <!-- Mid buildings -->
          <rect x="268" y="128" width="88"  height="320" rx="3" fill="rgba(255,255,255,0.06)"/>
          <rect x="280" y="96"  width="64"  height="38"  rx="2" fill="rgba(255,255,255,0.05)"/>
          <rect x="283" y="110" width="12" height="16" rx="1" fill="rgba(212,174,58,0.55)"/>
          <rect x="302" y="110" width="12" height="16" rx="1" fill="rgba(74,144,226,0.45)"/>
          <rect x="321" y="110" width="12" height="16" rx="1" fill="rgba(255,255,255,0.18)"/>
          <rect x="283" y="136" width="12" height="16" rx="1" fill="rgba(74,144,226,0.40)"/>
          <rect x="302" y="136" width="12" height="16" rx="1" fill="rgba(212,174,58,0.52)"/>
          <rect x="321" y="136" width="12" height="16" rx="1" fill="rgba(212,174,58,0.35)"/>
          <rect x="283" y="162" width="12" height="16" rx="1" fill="rgba(212,174,58,0.42)"/>
          <rect x="302" y="162" width="12" height="16" rx="1" fill="rgba(74,144,226,0.50)"/>
          <rect x="321" y="162" width="12" height="16" rx="1" fill="rgba(255,255,255,0.15)"/>
          <rect x="283" y="188" width="12" height="16" rx="1" fill="rgba(255,255,255,0.12)"/>
          <rect x="302" y="188" width="12" height="16" rx="1" fill="rgba(212,174,58,0.48)"/>
          <rect x="321" y="188" width="12" height="16" rx="1" fill="rgba(74,144,226,0.38)"/>
          <!-- Hero tower (tallest, centre) -->
          <rect x="378" y="46"  width="128" height="402" rx="4" fill="rgba(255,255,255,0.08)"/>
          <rect x="396" y="20"  width="92"  height="32"  rx="3" fill="rgba(255,255,255,0.06)"/>
          <rect x="430" y="4"   width="24"  height="20"  rx="2" fill="rgba(74,144,226,0.28)"/>
          <rect x="395" y="60"  width="14" height="18" rx="1" fill="rgba(212,174,58,0.58)"/>
          <rect x="416" y="60"  width="14" height="18" rx="1" fill="rgba(74,144,226,0.50)"/>
          <rect x="437" y="60"  width="14" height="18" rx="1" fill="rgba(212,174,58,0.42)"/>
          <rect x="458" y="60"  width="14" height="18" rx="1" fill="rgba(255,255,255,0.22)"/>
          <rect x="479" y="60"  width="14" height="18" rx="1" fill="rgba(74,144,226,0.38)"/>
          <rect x="395" y="90"  width="14" height="18" rx="1" fill="rgba(255,255,255,0.18)"/>
          <rect x="416" y="90"  width="14" height="18" rx="1" fill="rgba(212,174,58,0.52)"/>
          <rect x="437" y="90"  width="14" height="18" rx="1" fill="rgba(74,144,226,0.58)"/>
          <rect x="458" y="90"  width="14" height="18" rx="1" fill="rgba(212,174,58,0.38)"/>
          <rect x="479" y="90"  width="14" height="18" rx="1" fill="rgba(255,255,255,0.28)"/>
          <rect x="395" y="120" width="14" height="18" rx="1" fill="rgba(212,174,58,0.50)"/>
          <rect x="416" y="120" width="14" height="18" rx="1" fill="rgba(74,144,226,0.32)"/>
          <rect x="437" y="120" width="14" height="18" rx="1" fill="rgba(255,255,255,0.18)"/>
          <rect x="458" y="120" width="14" height="18" rx="1" fill="rgba(212,174,58,0.48)"/>
          <rect x="479" y="120" width="14" height="18" rx="1" fill="rgba(74,144,226,0.42)"/>
          <rect x="395" y="150" width="14" height="18" rx="1" fill="rgba(74,144,226,0.38)"/>
          <rect x="416" y="150" width="14" height="18" rx="1" fill="rgba(255,255,255,0.22)"/>
          <rect x="437" y="150" width="14" height="18" rx="1" fill="rgba(212,174,58,0.55)"/>
          <rect x="458" y="150" width="14" height="18" rx="1" fill="rgba(74,144,226,0.32)"/>
          <rect x="479" y="150" width="14" height="18" rx="1" fill="rgba(212,174,58,0.42)"/>
          <!-- Right cluster -->
          <rect x="524" y="88"  width="98"  height="360" rx="3" fill="rgba(255,255,255,0.07)"/>
          <rect x="534" y="64"  width="78"  height="30"  rx="2" fill="rgba(255,255,255,0.05)"/>
          <rect x="540" y="103" width="12" height="15" rx="1" fill="rgba(212,174,58,0.48)"/>
          <rect x="558" y="103" width="12" height="15" rx="1" fill="rgba(74,144,226,0.40)"/>
          <rect x="576" y="103" width="12" height="15" rx="1" fill="rgba(255,255,255,0.18)"/>
          <rect x="594" y="103" width="12" height="15" rx="1" fill="rgba(212,174,58,0.38)"/>
          <rect x="540" y="128" width="12" height="15" rx="1" fill="rgba(74,144,226,0.48)"/>
          <rect x="558" y="128" width="12" height="15" rx="1" fill="rgba(212,174,58,0.52)"/>
          <rect x="576" y="128" width="12" height="15" rx="1" fill="rgba(255,255,255,0.22)"/>
          <rect x="594" y="128" width="12" height="15" rx="1" fill="rgba(74,144,226,0.32)"/>
          <rect x="540" y="153" width="12" height="15" rx="1" fill="rgba(212,174,58,0.42)"/>
          <rect x="558" y="153" width="12" height="15" rx="1" fill="rgba(74,144,226,0.38)"/>
          <rect x="576" y="153" width="12" height="15" rx="1" fill="rgba(212,174,58,0.48)"/>
          <rect x="594" y="153" width="12" height="15" rx="1" fill="rgba(255,255,255,0.18)"/>
          <!-- Far right -->
          <rect x="636" y="158" width="68"  height="290" rx="3" fill="rgba(255,255,255,0.05)"/>
          <rect x="648" y="174" width="10" height="13" rx="1" fill="rgba(212,174,58,0.38)"/>
          <rect x="664" y="174" width="10" height="13" rx="1" fill="rgba(74,144,226,0.32)"/>
          <rect x="680" y="174" width="10" height="13" rx="1" fill="rgba(212,174,58,0.42)"/>
          <rect x="716" y="208" width="48"  height="240" rx="3" fill="rgba(255,255,255,0.04)"/>
          <rect x="724" y="223" width="9" height="12" rx="1" fill="rgba(212,174,58,0.35)"/>
          <rect x="738" y="223" width="9" height="12" rx="1" fill="rgba(74,144,226,0.30)"/>
          <!-- Ground + glow -->
          <rect x="0" y="446" width="800" height="2" rx="1" fill="rgba(74,144,226,0.12)"/>
          <ellipse cx="400" cy="448" rx="310" ry="16" fill="rgba(74,144,226,0.05)"/>
        </svg>
      </div>
  
      <!-- Panel content -->
      <div class="relative z-10 flex flex-col flex-1 px-[7%] py-12 justify-between">
  
        <!-- Top block -->
        <div>
          <div class="inline-flex mb-8 animate-fadeUp1">
            <span class="trust-badge">
              <span class="trust-dot"></span>
              Secure access
            </span>
          </div>
  
          <!-- Display heading (Cormorant italic — same as home_page.html hero) -->
          <h2 class="font-display font-light text-white leading-[1.08] mb-5 animate-fadeUp2"
              style="font-size: clamp(34px, 3.8vw, 56px);">
            Trusted property<br>access, <em class="italic" style="color:#4A90E2;">simplified.</em>
          </h2>
  
          <p class="font-sans font-light text-white/55 leading-[1.85] max-w-[380px] mb-9 animate-fadeUp3"
             style="font-size: 14px;">
            One platform. Verified listings, certified agents, and seamless virtual viewings — wherever you are.
          </p>
  
          <!-- Trust ticks -->
          <div class="space-y-3.5 animate-fadeUp4">
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                   style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">Every listing manually verified</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                   style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">Identity-verified agent network</span>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                   style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
                <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <span class="font-sans font-light text-white/60" style="font-size:13px;">No hidden fees — transparent pricing</span>
            </div>
          </div>
        </div>
  
        <!-- Testimonial card (testi-card from home_page.html) -->
        <div class="testi-card p-5 max-w-[380px] animate-fadeUp5">
          <div class="flex gap-[3px] mb-3">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
            <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          </div>
          <p class="font-display font-light italic text-white/75 leading-[1.65] mb-4" style="font-size:15px;">
            "Found and moved into my new home in three weeks. Blupodd made the whole process completely transparent."
          </p>
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-navy-strong flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0">FA</div>
            <div>
              <div class="font-sans font-medium text-white/85" style="font-size:13px;">Fatima A.</div>
              <div class="font-sans font-light text-white/40" style="font-size:11px;">Renter · Lagos, Nigeria</div>
            </div>
          </div>
        </div>
  
      </div>
    </div><!-- /panel-left -->

    <!-- ════════════════════════════════
       RIGHT PANEL — form
  ════════════════════════════════ -->
  <div class="panel-right flex-1 flex items-center justify-center relative px-5 sm:px-8 py-10">

    <!-- Mobile back-to-site -->
    <a href="/"
       class="md:hidden absolute top-5 left-5 flex items-center gap-1.5 text-[12px] font-normal text-chalk-muted hover:text-navy-dark transition-colors duration-200 no-underline z-10">
      <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
        <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Back
    </a>

    <!-- Form card -->
    <div class="form-card w-full max-w-[460px] right-inner mt-5" style="padding: 40px 44px;">

      <!-- Mobile logo -->
      <div class="md:hidden flex items-center gap-[10px] mb-8">
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

    
      <!-- ────── LOG IN FORM ────── -->
      <form id="formLogin" onsubmit={handleLogin}>
        <div class="mb-7 animate-fadeUp1">
          <h1 class="hero-text font-display font-light leading-[1.1] mb-1" style="font-size: clamp(28px, 3.5vw, 38px);">
            Welcome back.
          </h1>
          <p class="font-sans font-light text-chalk-muted" style="font-size: 14px;">Sign in to continue to Blupodd</p>
        </div>

        <!-- Social auth -->
        <div class="space-y-3 mb-6 animate-fadeUp2">
          <button class="btn-social" type="button">
            <svg width="17" height="17" viewBox="0 0 814 1000" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 411.6 3.1 270.5 3.1 136.8c0-58.9 10.2-116.3 30.8-168.2C61.5 42.3 98.5 18.6 137.4 5.5c26.4-8.6 54.5-13.7 83.2-13.7 77 0 119.8 38 191.1 38 25.2 0 105.2-40.1 178.6-40.1 27.2 0 108.2 2.6 168.5 87.4zm-180.9-122.5c-34 41.6-87 73.7-138.3 73.7-6.4 0-12.9-.6-18.6-1.9 1.3-46.8 22.4-95.5 54.5-131.7 36.4-41 89.4-73.7 140.7-78.3 1.3 7.1 1.9 14.2 1.9 21.3 0 44.2-18.6 90.9-40.2 116.9z"/>
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

        <!-- Divider -->
        <div class="auth-divider mb-6 animate-fadeUp3">
          <span class="font-sans font-light text-chalk-muted whitespace-nowrap" style="font-size:12px;letter-spacing:0.09em;text-transform:uppercase;">or sign in with email</span>
        </div>

        <!-- Email -->
        <div class="mb-4 animate-fadeUp3" id="loginEmailWrap">
          <label class="auth-label" for="loginEmail">Email address</label>
          <input required bind:value={payload.email} 
            type="email" 
            id="loginEmail" 
            class="auth-input" 
            placeholder="you@example.com" 
            autocomplete="email" 
          />
          <span class="error-msg">Please enter a valid email address.</span>
        </div>

        <!-- Password -->
        <div class="mb-2 animate-fadeUp4" id="loginPassWrap">
          <div class="flex items-center justify-between mb-[7px]">
            <label class="auth-label" for="loginPass" style="margin-bottom:0;">Password</label>
            <a href="/site/forgot-password" class="auth-link" style="font-size:12px;">Forgot password?</a>
          </div>
          <div class="relative">
            <input bind:value={payload.password} 
              required
              type={ showPassword ? "text" : "password"} 
              id="loginPass" 
              class="auth-input" 
              style="padding-right:48px;"
              placeholder="Enter your password" 
              autocomplete="current-password" 
            />
            <button class="pw-eye" type="button" onclick={togglePw} aria-label="Show password">
              {#if showPassword}
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
          <span class="error-msg">Incorrect email or password.</span>
        </div>

        <!-- Remember me -->
        <div class="flex items-center gap-2.5 mt-3.5 mb-7 animate-fadeUp4">
          <input bind:checked={payload.rememberMe} 
            type="checkbox" 
            id="rememberMe" 
            class="auth-check" 
          />
          <label for="rememberMe" class="font-sans font-normal text-chalk-muted cursor-pointer" style="font-size:13px;">
            Keep me signed in for 30 days
          </label>
        </div>

        <!-- Submit -->
        <button class="btn-primary animate-fadeUp5" type="submit" id="loginBtn">
          Log in to Blupodd
        </button>

        <p class="text-center font-sans font-light text-chalk-muted mt-5 animate-fadeUp6" style="font-size:13px;">
          Don't have an account?&nbsp;<a href="/site/sign-up" class="auth-link">Sign up for free</a>
        </p>

      </form><!-- /formLogin -->

    </div><!-- /form-card -->
  </div><!-- /panel-right -->
</div>

{#if toastMsg  && toastMsg !== ''}
<Toast toastMsg={toastMsg} type={toastType} />
{/if}

<style>
  /* ── Left panel ── */
  .panel-left {
    background: linear-gradient(155deg, #060E1C 0%, #0A2463 38%, #0E2444 65%, #060E1C 100%);
    position: relative; overflow: hidden; flex-shrink: 0;
  }
  .panel-grid {
    position: absolute; inset: 0;
    background-image: linear-gradient(rgba(74,144,226,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(74,144,226,0.055) 1px, transparent 1px);
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
  :global([data-theme="dark"]) .auth-input { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
  :global([data-theme="dark"]) .auth-input::placeholder { color: #6A7FA0; }
  :global([data-theme="dark"]) .auth-input:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
  /* :global([data-theme="dark"]) .auth-input:-webkit-autofill,
  :global([data-theme="dark"]) .auth-input:-webkit-autofill:hover,
  :global([data-theme="dark"]) .auth-input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px rgba(255,255,255,0.08) inset !important;
    -webkit-text-fill-color: #fff !important;
    caret-color: #fff;
  } */

  /* ── Password eye toggle ── */
  .pw-eye {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    background: none; border: none; cursor: pointer; padding: 4px;
    color: #8C8070; transition: color 0.2s;
    display: flex; align-items: center; justify-content: center;
  }
  .pw-eye:hover { color: #0A2463; }
  :global([data-theme="dark"]) .pw-eye { color: #6A7FA0; }
  :global([data-theme="dark"]) .pw-eye:hover { color: #E8EDF5; }

  /* ── Primary CTA — exact from home_page.html ── */
  .btn-primary {
    background: #C06035; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
    padding: 14px 36px; border-radius: 40px; border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    width: 100%;
  }
  .btn-primary:hover { background: #a04e28; transform: scale(1.015); box-shadow: 0 10px 32px rgba(192,96,53,0.32); }
  .btn-primary:active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }

  /* ── Social buttons ── */
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

  /* ── Divider ── */
  .auth-divider { display: flex; align-items: center; gap: 14px; }
  .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #EDE7DC; transition: background 0.3s; }
  :global([data-theme="dark"]) .auth-divider::before, :global([data-theme="dark"]) .auth-divider::after { background: rgba(255,255,255,0.08); }

  /* ── Auth tabs ── */
  .auth-tab {
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.04em;
    padding: 9px 20px; border-radius: 40px; border: none; cursor: pointer;
    transition: background 0.2s, color 0.2s, box-shadow 0.2s;
    background: transparent; color: #8C8070;
  }

  /* ── Field label ── */
  .auth-label {
    display: block;
    font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
    letter-spacing: 0.08em; text-transform: uppercase; color: #4A70A0;
    margin-bottom: 7px; transition: color 0.3s;
  }
  :global([data-theme="dark"]) .auth-label { color: #6A7FA0; }

  :global([data-theme="dark"]) .hero-text { color: #fff; }
  /* ── Auth link ── */
  .auth-link { font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; color: #1A6ADE; text-decoration: none; transition: color 0.2s; }
  .auth-link:hover { color: #0A2463; }
  :global([data-theme="dark"]) .auth-link { color: #4A90E2; }
  :global([data-theme="dark"]) .auth-link:hover { color: #8DAACC; }

  /* ── Error message ── */
  .error-msg { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #C06035; display: none; margin-top: 5px; }
  .show-error .error-msg { display: block; }

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

  /* ── Trust badge (left panel) ── */
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

  /* ── Mobile: hide left panel, adapt form card ── */
  @media (max-width: 768px) {
    .panel-left  { display: none !important; }
    .panel-right { width: 100% !important; }
    .form-card   { box-shadow: none !important; border-radius: 0 !important; border: none !important; min-height: calc(100dvh - 68px); }
    .right-inner { padding: 32px 24px !important; }
  }
</style>