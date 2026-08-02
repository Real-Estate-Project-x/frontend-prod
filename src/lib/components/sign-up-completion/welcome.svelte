<script>
  import { capitalize } from "$lib/utils";

    /**
     * WelcomeNotice.svelte
     *
     * Sveltekit / Svelte 5 port of the #welcomeNotice panel from
     * blupodd_complete_agent_account.html.
     *
     * Behaviour (unchanged from the vanilla JS version):
     *  1. On mount, the progress track fills from 0% -> 100% over `duration` ms.
     *  2. When the timer completes, the notice plays its exit animation and
     *     `ondismiss` fires immediately (so the parent can reveal the next
     *     step, e.g. the completion form, in lockstep with the exit).
     *  3. ~450ms later (once the exit animation finishes) the notice is
     *     removed from the layout entirely.
     *
     * Usage:
     *   <WelcomeNotice provider={"GOOGLE"} ondismiss={() => (showForm = true)} />
     */
  
    /** @type {{ provider: string, onDismiss?: () => void, duration?: number }} */
    let { provider, onDismiss = () => {}, duration = 4000 } = $props();
  
    let gone = $state(false);     // fully removed from the DOM/layout
    let filled = $state(false);   // drives the progress bar width transition
    let exiting = $state(false);  // plays the noticeOut animation
  
    $effect(() => {
      // Set on the next frame so the browser registers width:0% first,
      // otherwise the CSS transition on width has nothing to animate from.
      const raf = requestAnimationFrame(() => {
        filled = true;
      });
  
      const dismissTimer = setTimeout(dismiss, duration);
  
      // Cleanup if the component is destroyed before the timers fire
      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(dismissTimer);
      };
    });
  
    function dismiss() {
      if (gone || exiting) return;
      exiting = true;
      onDismiss();
      setTimeout(() => {
        gone = true;
      }, 450); // matches the noticeOut animation length below
    }
</script>
  
  {#if !gone}
    <div
      class="welcome-notice mb-7"
      class:notice-exit={exiting}
      style="--notice-duration: {duration}ms"
      role="status"
      aria-live="polite"
    >
      <div class="flex items-start gap-4 mb-4">
        <div class="notice-icon-ring">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 10l4.5 4.5L17 5" />
          </svg>
        </div>
        <div class="flex-1 min-w-0 pt-0.5">
          <p class="welcome-card-header font-display font-light leading-[1.15] mb-1.5" style="font-size:22px;">
            You're almost there!
          </p>
          <p class="welcome-card-text font-sans font-light leading-[1.65]" style="font-size:13.5px;">
            Your {capitalize(provider)} account has been successfully connected. 
            Complete a few additional details to activate your Blupodd Agent account and begin listing properties.
          </p>
        </div>
      </div>
      <div class="notice-progress-track">
        <div class="notice-progress-fill" class:filled></div>
      </div>
    </div>
  {/if}
  
  <style>
    .welcome-notice {
      background: linear-gradient(135deg, rgba(74, 144, 226, 0.1), rgba(74, 120, 72, 0.07));
      border: 1.5px solid rgba(74, 144, 226, 0.25);
      border-radius: 18px;
      padding: 22px 22px 20px;
      animation: noticeIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
      overflow: hidden;
    }
    :global([data-theme="dark"]) .welcome-notice {
      background: linear-gradient(135deg, rgba(74, 144, 226, 0.14), rgba(74, 120, 72, 0.1));
      border-color: rgba(74, 144, 226, 0.3);
    }
    .welcome-notice.notice-exit {
      animation: noticeOut 0.45s cubic-bezier(0.4, 0, 0.6, 1) both;
    }

    .welcome-card-text {color:#4A5C7A;}
    :global([data-theme="dark"]) .welcome-card-text {color:rgba(255, 255, 255, .45);}

    .welcome-card-header {color:#0A2463;}
    :global([data-theme="dark"]) .welcome-card-header {color: var(--text-p);}
  
    .notice-icon-ring {
      width: 46px;
      height: 46px;
      border-radius: 50%;
      flex-shrink: 0;
      background: rgba(74, 120, 72, 0.18);
      border: 1px solid rgba(74, 120, 72, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      animation: ringPulse 2.6s ease-in-out infinite;
    }
    :global([data-theme='dark']) .notice-icon-ring {
      background: rgba(74, 120, 72, 0.24);
    }
  
    .notice-progress-track {
      height: 3px;
      border-radius: 3px;
      background: rgba(74, 144, 226, 0.15);
      overflow: hidden;
    }
    :global([data-theme='dark']) .notice-progress-track {
      background: rgba(74, 144, 226, 0.2);
    }
  
    .notice-progress-fill {
      height: 100%;
      width: 0%;
      border-radius: 3px;
      background: linear-gradient(90deg, #4a90e2, #4a7848);
      transition: width var(--notice-duration, 4s) linear;
    }
    .notice-progress-fill.filled {
      width: 100%;
    }
  
    @keyframes noticeIn {
      from {
        opacity: 0;
        transform: translateY(-10px) scale(0.98);
      }
      to {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    @keyframes noticeOut {
      from {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      to {
        opacity: 0;
        transform: translateY(-8px) scale(0.98);
      }
    }
    @keyframes ringPulse {
      0%,
      100% {
        box-shadow: 0 0 0 0 rgba(74, 144, 226, 0.45);
      }
      50% {
        box-shadow: 0 0 0 7px rgba(74, 144, 226, 0);
      }
    }
  </style>