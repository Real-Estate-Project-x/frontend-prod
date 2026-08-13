<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/state";
    import { AxiosError } from "axios";
    import { goto } from "$app/navigation";
    import type { PageData } from "./$types";
    import type { ToastType } from "$lib/types";
    import { getErrorMessage } from "$lib/utils";
    import { authClient } from "$lib/auth-client";
    import Toast from "$lib/components/shared/Toast.svelte";
    import { AppRole, type AuthProvider } from "$lib/utils/constant";
    import { handleThirdPartyRouting } from "$lib/auth/handle-third-party-routing";
  
  // Toast
  let toastMsg     = $state('');
  let toastType = $state<ToastType>('info');
  let toastTimer: ReturnType<typeof setTimeout> | null = null;

  let isTnCAgreed = $state<boolean>(false);

  let { data }: { data: PageData } = $props();

  const tncCheck = $derived<boolean>(data.success);

  // ── Toast ──────────────────────────────────────────────────────────────────
  const showToast = (msg: string, type: ToastType) => {
    toastMsg = msg;
    toastType = type;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastMsg = '', 3000);
  }

  onMount(async () => {
    if(tncCheck) {
      await handleOnSubmit();
    }
  })

  const handleOnSubmit = async () => {
    const { data: session, error } = await authClient.getSession();

    const queryParams = page.url.searchParams;

    const redirectTo = queryParams.get("redirect_to");
    const provider = queryParams.get("provider") as AuthProvider;
  
    if (!provider || error || !session) {
      goto("/site/login/?err=login_unauthorized");
      return;
    }

    try {
      await handleThirdPartyRouting({
        session,
        provider,
        redirectTo,
        role: AppRole.CUSTOMER,
      });
    } catch (ex) {
      if (ex instanceof AxiosError) {
        const message = getErrorMessage(ex);
        showToast(message, 'error');
        goto(`/site/sign-up/?err=${message}`);
      }
      return;
    }
  };
</script>

{#if !tncCheck}
<!-- ═══════════════════════════════════════════════
     MAIN
═══════════════════════════════════════════════ -->
<main class="min-h-screen flex items-center justify-center pt-[68px] px-4 py-10">
  <div class="form-card card-pad w-full max-w-[480px] animate-fadeUp" style="padding: 48px 48px;">
    <!-- Header -->
    <div class="text-center mb-8">
      <div class="inline-flex items-center justify-center w-12 h-12 rounded-full mb-5" style="background:#F7F3EC;">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A2463" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9 12l2 2 4-4" />
          <path d="M12 3l7 3.2v4.6c0 4.9-3.1 8.9-7 10.2-3.9-1.3-7-5.3-7-10.2V6.2L12 3z" />
        </svg>
      </div>
      <h1 class="font-display font-light leading-[1.1] mb-2 font-light" style="font-size: clamp(26px, 3.4vw, 34px);">
          Terms &amp; Conditions
      </h1>
      <p class="font-sans font-light text-chalk-muted mx-auto" style="font-size:14px; max-width:360px; line-height:1.6;">
        Before you continue, please review and accept the Blupodd Terms &amp; Conditions.
      </p>
    </div>

    <!-- Acceptance -->
    <label for="agreeTerms" class="consent-row animate-fadeUp1">
      <input type="checkbox" 
        bind:checked={isTnCAgreed}
        id="agreeTerms" 
        class="auth-check mt-0.5" 
        aria-describedby="agreeTermsDesc" 
      />
      <span id="agreeTermsDesc" class="font-sans font-light text-chalk-muted" style="font-size:13.5px; line-height:1.6;">
        I have read and agree to the Blupodd <a href="/site/privacy-policy" class="inline-link">Terms &amp; Conditions</a>.
      </span>
    </label>

    <p class="text-center mt-4 mb-8 animate-fadeUp1" style="font-size:12.5px; color:#8C8070; line-height:1.6;">
      You can also review our <a href="/site/privacy-policy" class="inline-link">Privacy Policy</a> before continuing.
    </p>

    <!-- Primary CTA -->
    <button class="btn-primary animate-fadeUp2" 
      type="button" 
      id="continueBtn"
      disabled={!isTnCAgreed}
      onclick={handleOnSubmit}
      aria-disabled={!isTnCAgreed}
     >
        Continue
    </button>

    <!-- Sign out -->
    <div class="text-center mt-5 animate-fadeUp2">
      <a class="signout-btn" href="/site/login">
        Sign out
      </a>
    </div>

    <!-- Trust strip -->
    <div class="flex items-center justify-center gap-2 mt-7 pt-6 animate-fadeUp3 auth-divider">
      <span class="trust-chip">
        <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10 2l6.5 3v4.5c0 4.2-2.7 7.6-6.5 8.5-3.8-.9-6.5-4.3-6.5-8.5V5L10 2z"/></svg>
        Your data stays private and secure
      </span>
    </div>
  </div>  
</main>
{/if}

{#if toastMsg  && toastMsg !== ''}
  <Toast toastMsg={toastMsg} type={toastType} />
{/if}

<style>
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

  .auth-divider {border-top: 1.5px solid #EDE7DC;}
  :global([data-theme="dark"]) .auth-divider {border-color: rgba(255, 255, 255, 0.08);}
  
  /* ── Checkbox ── */
  .auth-check {
    width: 18px; height: 18px; flex-shrink: 0; border-radius: 5px;
    border: 1.5px solid #D8CEBC; background: #fff; cursor: pointer;
    appearance: none; -webkit-appearance: none;
    transition: border-color 0.2s, background 0.2s, box-shadow 0.2s; position: relative;
  }
  .auth-check:hover { border-color: #4A70A0; }
  .auth-check:checked { background: #0A2463; border-color: #0A2463; }
  .auth-check:checked::after {
    content: ''; position: absolute; left: 5px; top: 2px;
    width: 6px; height: 10px; border: 1.5px solid #fff;
    border-left: none; border-top: none; transform: rotate(45deg);
  }
  .auth-check:focus-visible { box-shadow: 0 0 0 3px rgba(74,144,226,0.30); }
  :global([data-theme="dark"]) .auth-check { background: #1A2438; border-color: rgba(255,255,255,0.18); }
  :global([data-theme="dark"]) .auth-check:checked { background: #4A90E2; border-color: #4A90E2; }
  
  .consent-row {
    display: flex; align-items: flex-start; gap: 12px;
    padding: 16px 18px; border-radius: 12px;
    border: 1.5px solid #EDE7DC; background: #F7F3EC;
    cursor: pointer; transition: border-color 0.2s, background 0.2s;
  }
  .consent-row:hover { border-color: rgba(74,144,226,0.45); }
  :global([data-theme="dark"]) .consent-row { background: #1A2438; border-color: rgba(255,255,255,0.09); }
  :global([data-theme="dark"]) .consent-row:hover { border-color: rgba(74,144,226,0.40); }
  
  /* ── Primary CTA ── */
  .btn-primary {
    background: #C06035; color: #fff;
    font-family: 'DM Sans', sans-serif; font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
    padding: 14px 36px; border-radius: 40px; border: none; cursor: pointer;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s, opacity 0.2s;
    width: 100%;
  }
  .btn-primary:not(:disabled):hover { background: #a04e28; transform: scale(1.015); box-shadow: 0 10px 32px rgba(192,96,53,0.32); }
  .btn-primary:not(:disabled):active { transform: scale(0.99); }
  .btn-primary:disabled { opacity: 0.45; cursor: not-allowed; }
  .btn-primary:focus-visible { box-shadow: 0 0 0 3px rgba(74,144,226,0.45); }
  
  /* ── Sign out link ── */
  .signout-btn {
    font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 400; letter-spacing: 0.03em;
    color: #8C8070; background: none; border: none; cursor: pointer;
    padding: 6px 10px; border-radius: 8px;
    transition: color 0.2s, background 0.2s;
  }
  .signout-btn:hover { color: #C06035; background: rgba(192,96,53,0.06); }
  :global([data-theme="dark"]) .signout-btn:focus-visible { box-shadow: 0 0 0 3px rgba(74,144,226,0.30); }
   .signout-btn { color: #6A7FA0; }
   :global([data-theme="dark"]) .signout-btn:hover { color: #E88A5E; background: rgba(192,96,53,0.10); }
  
  /* ── Trust strip ── */
  .trust-chip {
    display: inline-flex; align-items: center; gap: 6px;
    font-family: 'DM Sans', sans-serif; font-size: 11.5px; font-weight: 400; color: #8C8070;
  }
  :global([data-theme="dark"]) .trust-chip { color: #6A7FA0; }
  
  a.inline-link { color: #1A6ADE; text-decoration: none; font-weight: 500; transition: color 0.2s; }
  a.inline-link:hover { color: #0A2463; text-decoration: underline; }
  a.inline-link:focus-visible { outline: none; box-shadow: 0 0 0 3px rgba(74,144,226,0.30); border-radius: 4px; }
  :global([data-theme="dark"]) a.inline-link { color: #4A90E2; }
  :global([data-theme="dark"]) a.inline-link:hover { color: #8DAACC; }
  
  @media (max-width: 640px) {
    .card-pad { padding: 34px 24px !important; }
  }
</style>