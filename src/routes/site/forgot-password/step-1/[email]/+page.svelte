<script lang="ts">
    import { onMount } from 'svelte';
    import { AxiosError } from 'axios';
    import { goto, } from '$app/navigation';
    import type { PageData } from "./$types";
    import type { ToastType } from '$lib/types';
    import { getErrorMessage } from '$lib/utils';
    import { ApiRequests } from '$lib/api/api.request';
    import Toast from '$lib/components/shared/Toast.svelte';

    let { data }: { data: PageData } = $props();
    const emailValue = $derived<any>(data.email);

    onMount(() => startCountdown());

    let emailError = $state(false);

    // Toast
    let toastMsg     = $state('');
    let toastType = $state<ToastType>('info');
    let toastTimer: ReturnType<typeof setTimeout> | null = null;

    // Step 2 — OTP
    let otp        = $state(['', '', '', '', '', '']);
    let otpError   = $state(false);
    let countdown  = $state('09:59');
    let resendable = $state(false);

    // ── DOM refs ───────────────────────────────────────────────────────────────
    let otpRefs: HTMLInputElement[] = $state([]);
    let countdownInterval: ReturnType<typeof setInterval> | null = null;

    // ── Toast ──────────────────────────────────────────────────────────────────
     const showToast = (msg: string, type: ToastType) => {
      toastMsg = msg;
      toastType = type;
      if (toastTimer) clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toastMsg = '', 3000);
    }


    // ── OTP input handling ────────────────────────────────────────────────────
    const onOtpInput = (e: Event, idx: number) => {
      const input = e.target as HTMLInputElement;
      const val = input.value.replace(/\D/g, '');
      // keep only last char
      const char = val ? val[val.length - 1] : '';
      otp[idx] = char;
      otp = [...otp]; // trigger reactivity
      otpError = false;
      if (char && idx < 5) {
        otpRefs[idx + 1]?.focus();
      }
      // auto-submit when full
      if (otp.every(c => c !== '')) {
        setTimeout(verifyOtp, 150);
      }
    }

     // ── STEP 2: Countdown ────────────────────────────────────────────────────
     const startCountdown = () => {
      let seconds = 599;
      resendable = false;
      countdown = '09:59';
      if (countdownInterval) clearInterval(countdownInterval);
      countdownInterval = setInterval(() => {
        seconds--;
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        countdown = m + ':' + s;
        if (seconds <= 0) {
          clearInterval(countdownInterval!);
          countdown = '00:00';
          resendable = true;
        }
      }, 1000);
    }

    const sendCode = async () => {
      const val = emailValue.trim();
      if (!val || !val.includes('@')) {
        emailError = true;
        showToast('Please enter a valid email address', 'info');
        return;
      }

      try {
          const result = await new ApiRequests().forgotPassword(val);
          if (result.data.success) {
            showToast(result.data.message, 'success');
            goto(`/site/forgot-password/step-1/${val}`);
          }
        } catch(ex) {
          if (ex instanceof AxiosError) {
            const message = getErrorMessage(ex);
            showToast(message, 'error');
          }
          return;
        }
    }


    const resendCode = () => {
      startCountdown();
      sendCode();
    }

   const onOtpKeydown = (e: KeyboardEvent, idx: number) => {
      if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
        otp[idx - 1] = '';
        otp = [...otp];
        otpRefs[idx - 1]?.focus();
      }
      if (e.key === 'ArrowLeft'  && idx > 0) otpRefs[idx - 1]?.focus();
      if (e.key === 'ArrowRight' && idx < 5) otpRefs[idx + 1]?.focus();
    }
  
    const onOtpPaste = (e: ClipboardEvent) => {
      e.preventDefault();
      const text = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
      text.split('').forEach((ch, i) => { otp[i] = ch; });
      otp = [...otp];
      const focusIdx = Math.min(text.length, 5);
      otpRefs[focusIdx]?.focus();
      if (text.length === 6) setTimeout(verifyOtp, 150);
    }
  
    const verifyOtp = async () => {
      const code = otp.join('');
      try {
        const result = await new ApiRequests().verifyUser(emailValue, code);
        if (result.data.success) {
          if (countdownInterval) {
            clearInterval(countdownInterval);
          }
          showToast(result.data.message, 'success');
          goto(`/site/forgot-password/step-2/${emailValue}`);
        }
      } catch (ex) {
        if (ex instanceof AxiosError) {
          const message = getErrorMessage(ex);
          showToast(message, 'error');
        }
        return;
      }
    }
</script>

<svelte:head>
  <title>Blupodd — Forgot password [Step 2]</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

 <!-- ═══ MAIN SPLIT LAYOUT ═══ -->
 <div class="layout">
  
    <!-- ═══ LEFT PANEL ═══ -->
    <aside class="panel-left">
      <div class="panel-grid"></div>
      <div class="panel-glow" style="width:560px;height:480px;top:-80px;left:-120px;"></div>
      <div class="panel-glow" style="width:380px;height:340px;bottom:60px;right:-60px;opacity:0.6;"></div>
      <div class="panel-arc" style="width:520px;height:520px;"></div>
      <div class="panel-arc" style="width:360px;height:360px;border-color:rgba(74,144,226,0.07);"></div>
      <div class="panel-arc" style="width:200px;height:200px;border-color:rgba(74,144,226,0.05);"></div>
  
      <!-- City illustration -->
      <div class="city-wrap">
        <svg class="city-svg" viewBox="0 0 800 448" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax meet">
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
          <rect x="524" y="88" width="98" height="360" rx="3" fill="rgba(255,255,255,0.07)"/>
          <rect x="534" y="64" width="78" height="30" rx="2" fill="rgba(255,255,255,0.05)"/>
          <rect x="540" y="103" width="12" height="15" rx="1" fill="rgba(212,174,58,0.48)"/>
          <rect x="558" y="103" width="12" height="15" rx="1" fill="rgba(74,144,226,0.40)"/>
          <rect x="576" y="103" width="12" height="15" rx="1" fill="rgba(255,255,255,0.18)"/>
          <rect x="594" y="103" width="12" height="15" rx="1" fill="rgba(212,174,58,0.38)"/>
          <rect x="636" y="158" width="68" height="290" rx="3" fill="rgba(255,255,255,0.05)"/>
          <rect x="716" y="208" width="48" height="240" rx="3" fill="rgba(255,255,255,0.04)"/>
          <rect x="0" y="446" width="800" height="2" rx="1" fill="rgba(74,144,226,0.12)"/>
          <ellipse cx="400" cy="448" rx="310" ry="16" fill="rgba(74,144,226,0.05)"/>
        </svg>
      </div>
  
      <!-- Panel content -->
      <div class="panel-content">
        <div>
          <div class="trust-badge-wrap">
            <span class="trust-badge"><span class="trust-dot"></span>Account recovery</span>
          </div>
          <h2 class="panel-heading">
            Back in moments,<br><em style="color:#4A90E2;">safely.</em>
          </h2>
          <p class="panel-body">
            Resetting your password takes under two minutes. Your listings, viewings, and data are all exactly where you left them.
          </p>
          <div class="panel-checks">
            {#each ['Your data stays safe and intact', 'Code expires in 10 minutes', 'Verified email delivery only'] as item}
              <div class="check-row">
                <div class="check-dot">
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span class="check-label">{item}</span>
              </div>
            {/each}
          </div>
        </div>
  
        <div class="panel-bottom">
          <div class="panel-trust-line">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke="rgba(255,255,255,0.3)" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
            <span>Trusted by property seekers &amp; agents across Nigeria</span>
          </div>
        </div>
      </div>
    </aside>

    <!-- ═══ RIGHT PANEL ═══ -->
    <div class="panel-right">
      <div class="right-inner">
        <div class="step-block anim-stepIn">
          <a class="back-btn" href="/site/forgot-password">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Back
            </a>
  
            <p class="step-eyebrow">Step 2 of 3</p>
            <h1 class="step-heading">
              Check your<br><em class="italic" style="color:#4A90E2;">inbox.</em>
            </h1>
            <p class="step-body">We sent a 6-digit code to:</p>
            <p class="sent-email">{emailValue}</p>
  
            <div class="form-card">
              <!-- OTP cells -->
              <div>
                <label class="auth-label">Verification code</label>
                <div class="otp-row">
                  {#each otp as digit, idx}
                    <input
                      type="text"
                      maxlength="1"
                      inputmode="numeric"
                      pattern="[0-9]"
                      class="otp-cell"
                      class:filled={digit !== ''}
                      class:error={otpError}
                      value={digit}
                      bind:this={otpRefs[idx]}
                      oninput={(e) => onOtpInput(e, idx)}
                      onkeydown={(e) => onOtpKeydown(e, idx)}
                      onpaste={onOtpPaste}
                      autocomplete={idx === 0 ? 'one-time-code' : 'off'}
                      aria-label={`Digit ${idx + 1}`}
                    >
                  {/each}
                </div>
                {#if otpError}
                  <p class="error-text">Invalid code. Please try again.</p>
                {/if}
              </div>
  
              <!-- Countdown + resend -->
              <div class="countdown-row">
                <p class="resend-timer">Code expires in <strong>{countdown}</strong></p>
                <button
                  class="auth-link resend-btn"
                  class:disabled={!resendable}
                  disabled={!resendable}
                  onclick={resendCode}
                >Resend code</button>
              </div>
  
              <button class="btn-navy" onclick={verifyOtp}>Verify code</button>
            </div>
  
            <p class="step-footnote">Didn't get an email? Check your spam folder or try a different address.</p>
        </div>
      </div>
    </div>
</div>

{#if toastMsg  && toastMsg !== ''}
    <Toast toastMsg={toastMsg} type={toastType} />
{/if}

<style>
    /* ── Reset ────────────────────────────────────────────────────────────── */
    :global(html, body) { overflow-x: hidden; box-sizing: border-box; }
    :global(*, *::before, *::after) { box-sizing: border-box; }
  
    :global(body) {
      font-family: 'DM Sans', sans-serif;
      background: #FEFCF8;
      color: #0A2463;
      min-height: 100dvh;
      transition: background 0.3s, color 0.3s;
      margin: 0;
    }
    :global([data-theme="dark"] body) { background: #0B111E; color: #E8EDF5; }
  
    /* ── Navbar ───────────────────────────────────────────────────────────── */
    nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 200;
      background: #0A2463;
      display: flex; align-items: center; justify-content: space-between;
      height: 68px; padding: 0 5vw;
      border-bottom: 1px solid rgba(255,255,255,0.07);
      transition: background 0.3s;
    }
    .logo-link {
      display: flex; align-items: center; gap: 10px; text-decoration: none; flex-shrink: 0;
    }
    .logo-text {
      font-family: 'DM Sans', sans-serif;
      font-size: 18px; font-weight: 500;
      letter-spacing: 0.18em; color: #fff;
    }
    .nav-right {
      display: flex; align-items: center; gap: 20px;
    }
    .nav-back-link {
      display: flex; align-items: center; gap: 6px;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 400; letter-spacing: 0.06em;
      color: rgba(255,255,255,0.60); text-decoration: none;
      transition: color 0.2s;
    }
    .nav-back-link:hover { color: #fff; }
    .nav-sep { width: 1px; height: 16px; background: rgba(255,255,255,0.12); }
    .nav-browse-btn {
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 500; letter-spacing: 0.04em;
      background: #C06035; color: #fff; text-decoration: none;
      padding: 8px 20px; border-radius: 40px;
      transition: background 0.2s;
    }
    .nav-browse-btn:hover { background: #5C2416; }
    @media (max-width: 768px) {
      .nav-back-link { display: none; }
      .nav-sep       { display: none; }
      .nav-browse-btn{ display: none; }
    }
  
    /* ── Theme toggle ─────────────────────────────────────────────────────── */
    .theme-toggle-btn {
      width: 32px; height: 32px; border-radius: 50%; border: none;
      background: rgba(255,255,255,0.09);
      display: flex; align-items: center; justify-content: center;
      cursor: pointer; flex-shrink: 0;
      transition: background 0.22s, transform 0.22s; outline: none;
    }
    .theme-toggle-btn:hover { background: rgba(255,255,255,0.16); transform: rotate(15deg); }
  
    /* ── Layout ───────────────────────────────────────────────────────────── */
    .layout {
      display: flex;
      min-height: 100vh;
      padding-top: 68px;
    }
  
    /* ── Left panel ───────────────────────────────────────────────────────── */
    .panel-left {
      display: none;
      background: linear-gradient(155deg, #060E1C 0%, #0A2463 38%, #0E2444 65%, #060E1C 100%);
      position: relative; overflow: hidden; flex-shrink: 0;
      animation: panelIn 1.1s cubic-bezier(0.22,1,0.36,1) both;
    }
    @media (min-width: 768px) {
      .panel-left { display: flex; flex-direction: column; width: 46%; }
    }
    @media (min-width: 1024px) {
      .panel-left { width: 52%; }
    }
  
    .panel-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(74,144,226,0.055) 1px, transparent 1px),
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
  
    .city-wrap {
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 56%; pointer-events: none;
    }
    .city-svg { width: 100%; height: 100%; }
  
    .panel-content {
      position: relative; z-index: 10;
      display: flex; flex-direction: column; flex: 1;
      padding: 3rem 7%; justify-content: space-between;
    }
  
    .trust-badge-wrap { display: inline-flex; margin-bottom: 2rem; animation: fadeUp 0.9s 0.08s ease both; }
    .trust-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(74,144,226,0.12); border: 1px solid rgba(74,144,226,0.22);
      border-radius: 40px; padding: 5px 14px;
      font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
      letter-spacing: 0.10em; text-transform: uppercase; color: rgba(255,255,255,0.70);
    }
    .trust-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #4A90E2;
      animation: trustPulse 2.4s ease-in-out infinite;
    }
    @keyframes trustPulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(74,144,226,0.45); }
      50%      { box-shadow: 0 0 0 7px rgba(74,144,226,0); }
    }
  
    .panel-heading {
      font-family: 'Cormorant Garamond', serif;
      font-weight: 300; color: #fff; line-height: 1.08;
      font-size: clamp(34px, 3.8vw, 56px); margin: 0 0 1.25rem;
      animation: fadeUp 0.9s 0.16s ease both;
    }
    .panel-body {
      font-family: 'DM Sans', sans-serif; font-weight: 300;
      color: rgba(255,255,255,0.55); line-height: 1.85;
      font-size: 14px; max-width: 380px; margin: 0 0 2.25rem;
      animation: fadeUp 0.9s 0.24s ease both;
    }
    .panel-checks { display: flex; flex-direction: column; gap: 14px; animation: fadeUp 0.9s 0.32s ease both; }
    .check-row { display: flex; align-items: center; gap: 12px; }
    .check-dot {
      width: 20px; height: 20px; border-radius: 50%; flex-shrink: 0;
      display: flex; align-items: center; justify-content: center;
      background: rgba(74,144,226,0.18); border: 1px solid rgba(74,144,226,0.32);
    }
    .check-label { font-family: 'DM Sans', sans-serif; font-weight: 300; color: rgba(255,255,255,0.60); font-size: 13px; }
  
    .panel-bottom { animation: fadeUp 0.9s 0.40s ease both; }
    .panel-trust-line {
      border-top: 1px solid rgba(255,255,255,0.07);
      padding-top: 1.5rem;
      display: flex; align-items: center; gap: 12px;
      font-family: 'DM Sans', sans-serif; font-weight: 300;
      color: rgba(255,255,255,0.30); font-size: 12px;
    }
  
    /* ── Right panel ──────────────────────────────────────────────────────── */
    .panel-right {
      flex: 1; display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      background: #FEFCF8; transition: background 0.3s;
      min-height: calc(100vh - 68px);
    }
    :global([data-theme="dark"]) .panel-right { background: #0B111E; }
  
    .right-inner {
      width: 100%; max-width: 480px;
      padding: 3rem 1.5rem;
    }
    @media (min-width: 768px) { .right-inner { padding: 3rem 2.5rem; } }
    @media (max-width: 768px) { .right-inner { padding: 2rem 1.5rem; } }
  
    /* ── Step progress dots ───────────────────────────────────────────────── */
    .step-dots { display: flex; align-items: center; gap: 8px; margin-bottom: 2rem; }
    .step-dot { width: 8px; height: 8px; border-radius: 50%; background: #EDE7DC; transition: all 0.3s; }
    .step-dot.active { background: #4A90E2; width: 22px; border-radius: 4px; }
    .step-dot.done   { background: #4A7848; }
    :global([data-theme="dark"]) .step-dot { background: rgba(255,255,255,0.12); }
    :global([data-theme="dark"]) .step-dot.active { background: #4A90E2; }
    :global([data-theme="dark"]) .step-dot.done   { background: #4A7848; }
  
    /* ── Step block ───────────────────────────────────────────────────────── */
    .step-block { width: 100%; }
    .step-eyebrow {
      font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
      letter-spacing: 0.20em; text-transform: uppercase; color: #4A70A0; margin: 0 0 0.75rem;
    }
    :global([data-theme="dark"]) .step-eyebrow { color: #6A7FA0; }
    .step-heading {
      font-family: 'Cormorant Garamond', serif; font-weight: 300; line-height: 1.1;
      font-size: clamp(28px, 3.2vw, 42px); color: #0A2463; margin: 0 0 0.5rem;
    }
    :global([data-theme="dark"]) .step-heading { color: #E8EDF5; }
    .step-body {
      font-family: 'DM Sans', sans-serif; font-weight: 300;
      color: #8C8070; line-height: 1.75; font-size: 14px; margin: 0 0 2rem;
    }
    :global([data-theme="dark"]) .step-body { color: #6A7FA0; }
  
    /* ── Back button ──────────────────────────────────────────────────────── */
    .back-btn {
      display: flex; align-items: center; gap: 6px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
      color: #8C8070; background: none; border: none; cursor: pointer; padding: 0;
      transition: color 0.2s; margin-bottom: 1.5rem;
    }
    .back-btn:hover { color: #0A2463; }
    :global([data-theme="dark"]) .back-btn { color: #6A7FA0; }
  
    /* ── Form card ────────────────────────────────────────────────────────── */
    .form-card {
      background: #FEFCF8;
      border: 1px solid #EDE7DC;
      border-radius: 20px;
      box-shadow: 0 20px 56px rgba(10,36,99,0.11), 0 4px 16px rgba(10,36,99,0.05);
      padding: 1.75rem; display: flex; flex-direction: column; gap: 1.25rem;
      transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
    }
    :global([data-theme="dark"]) .form-card {
      background: #131C2E; border-color: rgba(255,255,255,0.07);
      box-shadow: 0 24px 72px rgba(0,0,0,0.50), 0 6px 20px rgba(0,0,0,0.28);
    }
  
    /* ── Field ────────────────────────────────────────────────────────────── */
    .field { display: flex; flex-direction: column; gap: 0; }
    .field-hint {
      font-family: 'DM Sans', sans-serif; font-size: 11px; color: #8C8070;
      margin: 0.5rem 0 0; line-height: 1.6;
    }
    :global([data-theme="dark"]) .field-hint { color: #6A7FA0; }
    .form-footer-link { text-align: center; }
  
    /* ── Auth label ───────────────────────────────────────────────────────── */
    .auth-label {
      display: block; font-family: 'DM Sans', sans-serif;
      font-size: 11px; font-weight: 500;
      letter-spacing: 0.08em; text-transform: uppercase; color: #4A70A0;
      margin-bottom: 7px; transition: color 0.3s;
    }
    :global([data-theme="dark"]) .auth-label { color: #6A7FA0; }
  
    /* ── Auth input ───────────────────────────────────────────────────────── */
    .auth-input {
      width: 100%; background: #ffffff;
      border: 1.5px solid #EDE7DC; border-radius: 12px;
      padding: 13px 16px;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 400;
      color: #0A2463; outline: none;
      transition: border-color 0.22s, box-shadow 0.22s, background 0.3s;
      -webkit-appearance: none;
    }
    .auth-input::placeholder { color: #8C8070; font-weight: 300; }
    .auth-input:focus { border-color: rgba(74,144,226,0.60); box-shadow: 0 0 0 3px rgba(74,144,226,0.13); }
    .auth-input.error { border-color: #C06035; box-shadow: 0 0 0 3px rgba(192,96,53,0.12); }
    :global([data-theme="dark"]) .auth-input { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
    :global([data-theme="dark"]) .auth-input::placeholder { color: #6A7FA0; }
    :global([data-theme="dark"]) .auth-input:focus { border-color: rgba(74,144,226,0.55); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
  
    /* ── Auth link ────────────────────────────────────────────────────────── */
    .auth-link {
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
      color: #1A6ADE; text-decoration: none; transition: color 0.2s;
      background: none; border: none; cursor: pointer; padding: 0;
    }
    .auth-link:hover { color: #0A2463; }
    :global([data-theme="dark"]) .auth-link { color: #4A90E2; }
    :global([data-theme="dark"]) .auth-link:hover { color: #8DAACC; }
  
    /* ── Sent email ───────────────────────────────────────────────────────── */
    .sent-email {
      font-family: 'DM Sans', sans-serif; font-weight: 500;
      color: #0A2463; font-size: 14px; margin: 0 0 1.75rem;
    }
    :global([data-theme="dark"]) .sent-email { color: #93C5FD; }
  
    /* ── OTP row ──────────────────────────────────────────────────────────── */
    .otp-row { display: flex; gap: 10px; justify-content: space-between; }
    .otp-cell {
      width: 52px; height: 60px;
      background: #ffffff; border: 1.5px solid #EDE7DC; border-radius: 12px;
      font-family: 'DM Sans', sans-serif; font-size: 24px; font-weight: 500;
      color: #0A2463; text-align: center; outline: none;
      transition: border-color 0.22s, box-shadow 0.22s, background 0.3s;
      caret-color: transparent;
      -webkit-appearance: none;
      -moz-appearance: textfield;
    }
    .otp-cell::-webkit-outer-spin-button,
    .otp-cell::-webkit-inner-spin-button { -webkit-appearance: none; }
    .otp-cell:focus { border-color: rgba(74,144,226,0.65); box-shadow: 0 0 0 3px rgba(74,144,226,0.15); }
    .otp-cell.filled { border-color: rgba(74,144,226,0.45); }
    .otp-cell.error  { border-color: #C06035; box-shadow: 0 0 0 3px rgba(192,96,53,0.12); }
    :global([data-theme="dark"]) .otp-cell { background: #1A2438; border-color: rgba(255,255,255,0.10); color: #E8EDF5; }
    :global([data-theme="dark"]) .otp-cell:focus  { border-color: rgba(74,144,226,0.55); }
    :global([data-theme="dark"]) .otp-cell.filled { border-color: rgba(74,144,226,0.40); }
    @media (max-width: 768px) { .otp-cell { width: 44px; height: 54px; font-size: 20px; } }
    @media (max-width: 400px) { .otp-cell { width: 38px; height: 48px; font-size: 18px; } }
  
    /* ── Error text ───────────────────────────────────────────────────────── */
    .error-text { font-family: 'DM Sans', sans-serif; font-size: 12px; color: #C06035; margin: 0.5rem 0 0; }
  
    /* ── Countdown row ────────────────────────────────────────────────────── */
    .countdown-row { display: flex; align-items: center; justify-content: space-between; }
    .resend-timer { font-family: 'DM Sans', sans-serif; font-size: 13px; color: #8C8070; margin: 0; }
    :global([data-theme="dark"]) .resend-timer { color: #6A7FA0; }
    .resend-btn { font-size: 13px; }
    .resend-btn.disabled { opacity: 0.40; cursor: default; pointer-events: none; }
  
    /* ── Step footnote ────────────────────────────────────────────────────── */
    .step-footnote {
      font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 300;
      color: #8C8070; text-align: center; margin: 1.25rem 0 0; line-height: 1.65;
    }
    :global([data-theme="dark"]) .step-footnote { color: #6A7FA0; }
  
    /* ── Buttons ──────────────────────────────────────────────────────────── */
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
  
    .btn-navy {
      background: #0A2463; color: #fff;
      font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
      padding: 14px 36px; border-radius: 40px; border: none; cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      width: 100%;
    }
    .btn-navy:hover { background: #1F3F6A; transform: scale(1.015); box-shadow: 0 10px 32px rgba(10,36,99,0.28); }
    :global([data-theme="dark"]) .btn-navy { background: #4A90E2; }
    :global([data-theme="dark"]) .btn-navy:hover { background: #2d74c4; }
  
    /* ── Password wrapper ─────────────────────────────────────────────────── */
    .pw-wrap { position: relative; }
    .pw-eye {
      position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; padding: 4px;
      color: #8C8070; transition: color 0.2s;
      display: flex; align-items: center; justify-content: center;
    }
    .pw-eye:hover { color: #0A2463; }
    :global([data-theme="dark"]) .pw-eye { color: #6A7FA0; }
    :global([data-theme="dark"]) .pw-eye:hover { color: #E8EDF5; }
    .pw-wrap .auth-input { padding-right: 48px; }
  
    /* ── Strength bars ────────────────────────────────────────────────────── */
    .strength-bars { display: flex; gap: 6px; margin: 10px 0 4px; }
    .str-seg { height: 3px; border-radius: 3px; flex: 1; background: #EDE7DC; transition: background 0.3s; }
    :global([data-theme="dark"]) .str-seg { background: rgba(255,255,255,0.08); }
  
    /* ── Step 4: success ──────────────────────────────────────────────────── */
    .success-circle-wrap { display: flex; justify-content: center; margin-bottom: 1.75rem; }
    .success-circle {
      width: 80px; height: 80px; border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      background: rgba(74,120,72,0.10); border: 2px solid rgba(74,120,72,0.22);
    }
  
    @keyframes drawCircle { to { stroke-dashoffset: 0; } }
    @keyframes drawCheck  { to { stroke-dashoffset: 0; } }
  
    .security-note {
      display: flex; align-items: flex-start; gap: 12px; margin-top: 1.5rem; text-align: left;
      background: #F7F3EC; border: 1px solid #EDE7DC; border-radius: 16px; padding: 1rem;
      color: #8C8070;
      transition: background 0.3s, border-color 0.3s;
    }
    :global([data-theme="dark"]) .security-note {
      background: #1A2438; border-color: rgba(255,255,255,0.07); color: #6A7FA0;
    }
    .security-note p { font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 300; line-height: 1.65; margin: 0; }
  
    /* ── Animations ───────────────────────────────────────────────────────── */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes panelIn {
      from { opacity: 0; transform: translateX(-32px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes stepIn {
      from { opacity: 0; transform: translateY(16px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
  
    .anim-fadeUp { animation: fadeUp 0.9s ease both; }
    .anim-stepIn { animation: stepIn 0.38s cubic-bezier(0.22,1,0.36,1) both; }
</style>