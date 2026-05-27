<script lang="ts">
const handleResend = () => {}

const handleVerify = () => {}
</script>

<!-- ═══════════════════════════════════════════════
     MAIN — two-panel layout (identical to login.html)
═══════════════════════════════════════════════ -->
<div class="flex min-h-screen pt-[68px]">
    <!-- ════════════════════════════
         LEFT PANEL — brand / trust
    ════════════════════════════ -->
    <div class="panel-left hidden md:flex flex-col justify-between w-[46%] p-12 animate-panelIn">
  
      <!-- Background decoration -->
      <div class="panel-grid"></div>
      <div class="panel-glow" style="width:520px;height:520px;top:-8%;left:-14%;opacity:0.55;"></div>
      <div class="panel-glow" style="width:360px;height:360px;bottom:12%;right:-10%;opacity:0.30;background:radial-gradient(ellipse,rgba(192,96,53,0.12) 0%,transparent 70%);"></div>
      <div class="panel-arc" style="width:320px;height:320px;"></div>
      <div class="panel-arc" style="width:520px;height:520px;opacity:0.55;"></div>
      <div class="panel-arc" style="width:720px;height:720px;opacity:0.28;"></div>
  
      <!-- Top: logo + trust badge -->
      <div class="relative z-10">
        <div class="flex items-center gap-[10px] mb-12">
          <svg width="30" height="30" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
            <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
            <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
            <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
          </svg>
          <span class="font-sans text-[15px] font-medium text-white tracking-em-018">BLUPODD</span>
        </div>
  
        <div class="trust-badge mb-8">
          <span class="trust-dot"></span>
          Account Verification
        </div>
  
        <h2 class="font-display font-light text-white leading-[1.12] mb-5" style="font-size: clamp(30px, 2.8vw, 42px);">
          One step away<br>from your<br><em class="italic text-blue-bright">new home.</em>
        </h2>
        <p class="font-sans font-light text-white/55 leading-[1.75] max-w-[340px]" style="font-size:14px;">
          Verifying your email keeps your account secure and ensures you receive important updates about your property search.
        </p>
      </div>
  
      <!-- Middle: security features -->
      <div class="relative z-10 space-y-4 my-auto py-8">
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
               style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <span class="font-sans font-light text-white/60" style="font-size:13px;">Your data is fully encrypted</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
               style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <span class="font-sans font-light text-white/60" style="font-size:13px;">Code expires in 10 minutes</span>
        </div>
        <div class="flex items-center gap-3">
          <div class="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
               style="background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.32);">
            <svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="#4A90E2" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <span class="font-sans font-light text-white/60" style="font-size:13px;">Never share your code with anyone</span>
        </div>
      </div>
  
      <!-- Bottom: testimonial -->
      <div class="testi-card p-5 max-w-[380px] relative z-10 animate-fadeUp5">
        <div class="flex gap-[3px] mb-3">
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
          <svg width="11" height="11" viewBox="0 0 14 14" fill="#D4AE3A"><path d="M7 1l1.5 3.5 3.7.5-2.7 2.6.6 3.7L7 9.7l-3.1 1.6.6-3.7L1.8 5l3.7-.5z"/></svg>
        </div>
        <p class="font-display font-light italic text-white/75 leading-[1.65] mb-4" style="font-size:15px;">
          "The setup was incredibly smooth. I had my account ready and was browsing listings within minutes."
        </p>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-navy-strong flex items-center justify-center text-[11px] font-medium text-white flex-shrink-0">EO</div>
          <div>
            <div class="font-sans font-medium text-white/85" style="font-size:13px;">Emeka O.</div>
            <div class="font-sans font-light text-white/40" style="font-size:11px;">Buyer · Abuja, Nigeria</div>
          </div>
        </div>
      </div>
  
    </div><!-- /panel-left -->

    <!-- ════════════════════════════
       RIGHT PANEL — OTP form
    ════════════════════════════ -->
    <div class="panel-right flex-1 flex items-center justify-center relative px-5 sm:px-8 py-10">
        <!-- Mobile back link -->
        <a href="/site/sign-up"
            class="md:hidden absolute top-5 left-5 flex items-center gap-1.5 text-[12px] font-normal text-chalk-muted hover:text-navy-dark transition-colors duration-200 no-underline z-10"
            style="text-decoration:none;">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
                <path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back
        </a>

        <!-- Form card -->
        <div class="form-card w-full max-w-[460px] right-inner" style="padding: 40px 44px;">

        <!-- Mobile logo -->
        <div class="md:hidden flex items-center gap-[10px] mb-8">
            <svg class="block dark:hidden" width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
            <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
            <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
            <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="#0A2463" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
            </svg>
            <svg class="hidden dark:block" width="28" height="28" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/>
            <path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/>
            <path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/>
            <path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            <circle cx="18" cy="28" r="3.5" fill="#4A90E2"/>
            </svg>
            <span class="font-sans text-[16px] font-medium tracking-em-018">BLUPODD</span>
        </div>

        <!-- ══════════════════════════
            OTP FORM
        ══════════════════════════ -->
        <div id="formOtp">

            <!-- Step indicator + header -->
            <div class="mb-7 animate-fadeUp1">

            <!-- Step pill -->
            <div class="mb-5">
                <span class="step-pill">
                <span class="step-dot"></span>
                Step 2 of 2
                </span>
            </div>

            <!-- Headline -->
            <h1 class="hero-text font-display font-light text-navy-dark leading-[1.1] mb-2" style="font-size: clamp(28px, 3.5vw, 36px);">
                Verify your account.
            </h1>
            <p class="font-sans font-light text-chalk-muted leading-[1.65]" style="font-size:14px;">
                We sent a 6-digit code to your email address. Enter it below to activate your account.
            </p>

            </div>

            <!-- Email address display -->
            <div class="mb-7 animate-fadeUp2">
            <span class="auth-label" style="display:block;margin-bottom:8px;">Code sent to</span>
            <div class="flex items-center gap-2.5">
                <span class="email-chip">
                <!-- Envelope icon -->
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style="flex-shrink:0;">
                    <rect x="1" y="3" width="12" height="9" rx="2" stroke="#4A90E2" stroke-width="1.3"/>
                    <path d="M1 5l6 4 6-4" stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <span id="displayEmail">a•••@example.com</span>
                </span>
            </div>
            </div>

            <!-- ── 6-digit OTP input row ── -->
            <div class="mb-2 animate-fadeUp3">
            <label class="auth-label" style="margin-bottom:14px;">Verification code</label>

            <div id="otpGroup" class="otp-gap flex justify-between" style="gap:10px;">
                <input class="otp-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" id="otp1" autocomplete="one-time-code" placeholder="·" aria-label="Digit 1">
                <input class="otp-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" id="otp2" autocomplete="off" placeholder="·" aria-label="Digit 2">
                <input class="otp-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" id="otp3" autocomplete="off" placeholder="·" aria-label="Digit 3">
                <input class="otp-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" id="otp4" autocomplete="off" placeholder="·" aria-label="Digit 4">
                <input class="otp-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" id="otp5" autocomplete="off" placeholder="·" aria-label="Digit 5">
                <input class="otp-input" type="text" inputmode="numeric" pattern="[0-9]*" maxlength="1" id="otp6" autocomplete="off" placeholder="·" aria-label="Digit 6">
            </div>

            <!-- Inline error message -->
            <p id="otpError" class="font-sans text-ember mt-3 hidden" style="font-size:12px;">
                That code doesn't match. Please try again.
            </p>
            </div>

            <!-- Resend / countdown row -->
            <div class="flex items-center justify-between mb-8 animate-fadeUp4">
            <p class="font-sans font-light text-chalk-muted" style="font-size:13px;">
                Didn't receive it?
            </p>
            <div class="flex items-center gap-1.5">
                <button
                id="resendBtn"
                class="resend-link cursor-pointer"
                onclick={handleResend}
                disabled
                type="button"
                >Resend code</button>
                <span id="resendTimer" class="font-sans font-light text-chalk-muted" style="font-size:13px;">
                &nbsp;in <span id="timerVal">0:59</span>
                </span>
            </div>
            </div>

            <!-- Submit CTA -->
            <button
            class="btn-primary animate-fadeUp5"
            type="button"
            onclick={handleVerify}
            id="verifyBtn"
            >
            Verify &amp; activate account
            </button>

            <!-- Footer note -->
            <p class="text-center font-sans font-light text-chalk-muted mt-5 animate-fadeUp6" style="font-size:13px;">
            Already verified?&nbsp;<a href="/site/login" class="auth-link">Sign in</a>
            </p>

        </div><!-- /formOtp -->

        <!-- ══════════════════════════
            SUCCESS STATE
        ══════════════════════════ -->
        <div id="formSuccess" class="hidden text-center">

            <!-- Check ring -->
            <div class="flex justify-center mb-6 animate-checkIn">
            <div class="success-ring">
                <svg width="32" height="32" viewBox="0 0 36 36" fill="none">
                <circle cx="18" cy="18" r="17" stroke="rgba(74,148,72,0.30)" stroke-width="1.5"/>
                <path d="M10 18.5l5.5 5.5 10.5-11" stroke="#4A7848" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </div>
            </div>

            <h1 class="font-display font-light text-navy-dark leading-[1.1] mb-3 animate-fadeUp1" style="font-size: clamp(26px, 3vw, 34px);">
            Account verified.
            </h1>
            <p class="font-sans font-light text-chalk-muted leading-[1.70] mb-8 animate-fadeUp2 mx-auto" style="font-size:14px;max-width:320px;">
            Your account is now active. Welcome to Blupodd — let's find your perfect place.
            </p>

            <!-- Progress bar -->
            <div class="mb-8 animate-fadeUp3">
            <div class="w-full h-[3px] rounded-full overflow-hidden" style="background:#EDE7DC;">
                <div id="successBar" class="h-full rounded-full" style="background:#4A7848;width:0%;transition:width 1.8s cubic-bezier(0.22,1,0.36,1);"></div>
            </div>
            <p class="font-sans font-light text-chalk-muted mt-2 text-center" style="font-size:12px;">Redirecting you to your dashboard…</p>
            </div>

            <a href="dashboard.html" class="btn-primary animate-fadeUp4" style="text-decoration:none;display:block;text-align:center;">
            Go to dashboard
            </a>

        </div><!-- /formSuccess -->

        </div><!-- /form-card -->
    </div><!-- /panel-right -->

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
    
    /* ── OTP digit inputs ── */
    .otp-input {
      width: 52px;
      height: 60px;
      background: #ffffff;
      border: 1.5px solid #EDE7DC;
      border-radius: 14px;
      text-align: center;
      font-family: 'DM Sans', sans-serif;
      font-size: 22px;
      font-weight: 500;
      color: #0A2463;
      caret-color: #4A90E2;
      outline: none;
      transition: border-color 0.22s ease, box-shadow 0.22s ease, background 0.3s, transform 0.15s;
      -webkit-appearance: none;
      -moz-appearance: textfield;
      appearance: textfield;
    }
    .otp-input::-webkit-outer-spin-button,
    .otp-input::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
    .otp-input::placeholder { color: #D8CEBC; font-size: 18px; }
    .otp-input:focus {
      border-color: rgba(74,144,226,0.65);
      box-shadow: 0 0 0 3px rgba(74,144,226,0.14);
      transform: translateY(-2px);
    }
    .otp-input.filled {
      border-color: rgba(74,144,226,0.50);
      background: #F3F7FD;
    }
    .otp-input.error {
      border-color: #C06035;
      box-shadow: 0 0 0 3px rgba(192,96,53,0.12);
      animation: shake 0.38s ease;
    }
    :global([data-theme="dark"]) .otp-input {
      background: #1A2438;
      border-color: rgba(255,255,255,0.10);
      color: #E8EDF5;
    }
    :global([data-theme="dark"]) .otp-input:focus {
      border-color: rgba(74,144,226,0.55);
      box-shadow: 0 0 0 3px rgba(74,144,226,0.15);
    }
    :global([data-theme="dark"]) .otp-input.filled {
      border-color: rgba(74,144,226,0.45);
      background: #162238;
    }
    
    /* Shake animation for wrong code */
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%       { transform: translateX(-5px); }
      40%       { transform: translateX(5px); }
      60%       { transform: translateX(-4px); }
      80%       { transform: translateX(4px); }
    }
    
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
    
    /* ── Resend link / timer ── */
    .resend-link {
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400;
      color: #1A6ADE; cursor: pointer; background: none; border: none; padding: 0;
      transition: color 0.2s;
    }
    .resend-link:hover { color: #0A2463; }
    .resend-link:disabled { color: #8C8070; cursor: default; }
    :global([data-theme="dark"]) .resend-link { color: #4A90E2; }
    :global([data-theme="dark"]) .resend-link:hover { color: #8DAACC; }
    :global([data-theme="dark"]) .resend-link:disabled { color: #4A5A70; }
    
    /* ── Auth label ── */
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
    
    /* ── Email chip ── */
    .email-chip {
      display: inline-flex; align-items: center; gap: 6px;
      background: rgba(74,144,226,0.08); border: 1px solid rgba(74,144,226,0.20);
      border-radius: 40px; padding: 4px 12px 4px 8px;
      font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 500; color: #0A2463;
      transition: background 0.3s, border-color 0.3s, color 0.3s;
    }
    :global([data-theme="dark"]) .email-chip {
      background: rgba(74,144,226,0.12); border-color: rgba(74,144,226,0.25); color: #8DAACC;
    }
    
    /* ── Progress step pill ── */
    .step-pill {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(74,144,226,0.10); border: 1px solid rgba(74,144,226,0.22);
      border-radius: 40px; padding: 5px 14px;
      font-family: 'DM Sans', sans-serif; font-size: 11px; font-weight: 500;
      letter-spacing: 0.10em; text-transform: uppercase; color: #4A70A0;
      transition: background 0.3s, color 0.3s;
    }
    :global([data-theme="dark"]) .step-pill {
      background: rgba(74,144,226,0.12); border-color: rgba(74,144,226,0.25); color: #6A8AAC;
    }
    .step-pill .step-dot {
      width: 6px; height: 6px; border-radius: 50%; background: #4A90E2; flex-shrink: 0;
      box-shadow: 0 0 0 0 rgba(74,144,226,0.45);
      animation: trustPulse 2.4s ease-in-out infinite;
    }
    @keyframes trustPulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(74,144,226,0.45); }
      50%       { box-shadow: 0 0 0 7px rgba(74,144,226,0); }
    }
    
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
    
    /* ── Testimonial card ── */
    .testi-card {
      background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 16px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
      transition: border-color 0.25s;
    }
    .testi-card:hover { border-color: rgba(255,255,255,0.16); }
    
    /* ── Success state ── */
    .success-ring {
      width: 72px; height: 72px; border-radius: 50%;
      background: rgba(74,120,72,0.12); border: 1.5px solid rgba(74,148,72,0.30);
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    :global([data-theme="dark"]) .success-ring {
      background: rgba(74,148,72,0.16); border-color: rgba(74,148,72,0.35);
    }
    
    /* ── Divider ── */
    .auth-divider { display: flex; align-items: center; gap: 14px; }
    .auth-divider::before, .auth-divider::after { content: ''; flex: 1; height: 1px; background: #EDE7DC; transition: background 0.3s; }
    :global([data-theme="dark"]) .auth-divider::before, :global([data-theme="dark"]) .auth-divider::after { background: rgba(255,255,255,0.08); }
    
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
    
    /* ── Mobile: hide left panel ── */
    @media (max-width: 768px) {
      .panel-left  { display: none !important; }
      .panel-right { width: 100% !important; }
      .form-card   { margin-top: 20px; box-shadow: none !important; border-radius: 0 !important; border: none !important; min-height: calc(100dvh - 68px); }
      .right-inner { padding: 32px 24px !important; }
    }
    @media (max-width: 400px) {
      .otp-input { width: 44px !important; height: 54px !important; font-size: 20px !important; }
      .otp-gap   { gap: 8px !important; }
    }
</style>