<script lang="ts">
    import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

    type ThemeType = 'light' | 'dark' | 'system';
    let selectedTheme = $state<ThemeType>('light');
    let isViewingHistoryCleared = $state(false);
    let isSearchHistoryCleared = $state(false);

    const toggleViewingHistory = () => isViewingHistoryCleared = !isViewingHistoryCleared;

    const toggleSearchHistory = () => isSearchHistoryCleared = !isSearchHistoryCleared;

  const setTheme = (theme: ThemeType) => selectedTheme = theme;

  // Toggle states (same defaults as your HTML)
  let toggles = $state({
    email: true,
    push: true,
    sms: false,
    listings: true,
    price: true,
    agents: true,
    marketing: false,

    public: true,
    tracking: true,
    recs: true,
    twoFA: false
  });

  const toggle = (id: keyof typeof toggles) => {
    toggles[id] = !toggles[id];
  };

  const toggle2FA = () => {
    toggles.twoFA = !toggles.twoFA;
  };

</script>

{#if isViewingHistoryCleared}
<!-- ══════ VIEWING HISTORY CONFIRM DIALOG ══════ -->
<div class="confirmDialog fixed inset-0 z-[500] bg-navy-deep/65 backdrop-blur-sm items-center justify-center p-4 open">
    <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-6 w-full max-w-[360px] shadow-[0_16px_56px_rgba(10,36,99,.22)] dark:shadow-[0_16px_56px_rgba(0,0,0,.6)] tt">
      <div class="w-11 h-11 rounded-2xl bg-ember-light dark:bg-ember/15 flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C06035" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      </div>
      <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:20px" id="dialogTitle">Clear viewing history?</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65] mb-5" id="dialogMsg">
        Your 24 viewed properties will be permanently removed from history.
      </p>
      <div class="flex gap-3">
        <button onclick={() => (isViewingHistoryCleared = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-[11px] rounded-full cursor-pointer hover:bg-chalk-3 tt">Cancel</button>
        <button class="flex-1 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep py-[11px] rounded-full cursor-pointer border-none tt">Yes, clear it</button>
      </div>
    </div>
</div>
{/if}

{#if isSearchHistoryCleared}
<!-- ══════ SEARCH HISTORY CONFIRM DIALOG ══════ -->
<div class="confirmDialog fixed inset-0 z-[500] bg-navy-deep/65 backdrop-blur-sm items-center justify-center p-4 open">
    <div class="bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-6 w-full max-w-[360px] shadow-[0_16px_56px_rgba(10,36,99,.22)] dark:shadow-[0_16px_56px_rgba(0,0,0,.6)] tt">
      <div class="w-11 h-11 rounded-2xl bg-ember-light dark:bg-ember/15 flex items-center justify-center mb-4">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C06035" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>
      </div>
      <h3 class="font-display font-light text-navy-dark dark:text-blue-100 mb-2" style="font-size:20px" id="dialogTitle">Clear search history?</h3>
      <p class="text-[13px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65] mb-5" id="dialogMsg">
        Your 47 saved searches and query history will be cleared.
      </p>
      <div class="flex gap-3">
        <button onclick={() => (isSearchHistoryCleared = false)} class="flex-1 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.06] border border-chalk-3 dark:border-white/[.08] py-[11px] rounded-full cursor-pointer hover:bg-chalk-3 tt">Cancel</button>
        <button class="flex-1 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep py-[11px] rounded-full cursor-pointer border-none tt">Yes, clear it</button>
      </div>
    </div>
</div>
{/if}


<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
    <main class="flex-1 min-w-0 overflow-x-hidden">
        <!-- Page header -->
        <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
            <div class="max-w-[740px]">
            <div class="flex items-center gap-2 mb-3 flex-wrap">
                <a href="/users" class="flex items-center gap-1.5 text-[12px] text-white/50 no-underline hover:text-white/80 tt">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M9 2L4 7l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Dashboard
                </a>
                <span class="text-white/25 text-[12px]">/</span>
                <span class="text-[12px] text-white/60">Settings</span>
            </div>
            <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Account settings</p>
            <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">Settings</h1>
            <p class="text-[13px] font-light text-white/50 mt-1.5">Manage your notifications, preferences and account security.</p>
            </div>
        </div>

         <!-- Body -->
        <div class="px-6 lg:px-10 py-8 max-w-[740px]">

            <!-- ── Section nav pills (desktop quick-jump) ── -->
            <div class="flex gap-1.5 flex-wrap mb-8 fu">
            <a href="#sec-notifications" class="s-nav-item text-[12px] font-medium px-4 py-[7px] rounded-full bg-chalk-2 dark:bg-[#131C2E] text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">Notifications</a>
            <a href="#sec-preferences" class="s-nav-item text-[12px] font-medium px-4 py-[7px] rounded-full bg-chalk-2 dark:bg-[#131C2E] text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">Preferences</a>
            <a href="#sec-privacy" class="s-nav-item text-[12px] font-medium px-4 py-[7px] rounded-full bg-chalk-2 dark:bg-[#131C2E] text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">Privacy & Security</a>
            <a href="#sec-data" class="s-nav-item text-[12px] font-medium px-4 py-[7px] rounded-full bg-chalk-2 dark:bg-[#131C2E] text-chalk-muted dark:text-[#6A7FA0] no-underline hover:text-navy-dark dark:hover:text-white tt">Data & Usage</a>
            </div>

        <!-- ════════════════════════════════
           SECTION 1: NOTIFICATIONS
        ════════════════════════════════ -->
        <span class="s-anchor" id="sec-notifications"></span>
        <div class="mb-8 fu d1">
            <div class="flex items-center gap-3 mb-4">
            <div class="w-8 h-8 rounded-xl bg-blue-bright/10 dark:bg-blue-bright/15 flex items-center justify-center flex-shrink-0">
                <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <div>
                <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">Notifications</h2>
                <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Choose how we reach you</p>
            </div>
            </div>
            <div class="s-card">

            <!-- Email -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Email notifications</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Receive updates about saved searches and viewings</div>
                </div>
                <button
                    class={`toggle-track ${toggles.email ? 'on' : ''}`}
                    onclick={() => toggle('email')}
                    aria-label="Toggle email notifications"
                    role="switch"
                    aria-checked={toggles.email}
                    >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            <!-- Push -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Push notifications</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Instant alerts for new property matches and price drops</div>
                </div>
                <button
                    class={`toggle-track ${toggles.push ? 'on' : ''}`}
                    onclick={() => toggle('push')}
                    aria-label="Toggle push notifications"
                    role="switch"
                    aria-checked={toggles.push}
                >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            <!-- SMS -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">SMS notifications</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Text messages for viewing confirmations and reminders</div>
                </div>
                <button
                    class={`toggle-track ${toggles.sms ? 'on' : ''}`}
                    onclick={() => toggle('sms')}
                    aria-label="Toggle SMS notifications"
                    role="switch"
                    aria-checked={toggles.sms}
                    >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            <!-- New listing alerts -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">New listing alerts</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Be notified when new properties match your saved searches</div>
                </div>
                <button
                    class={`toggle-track ${toggles.listings ? 'on' : ''}`}
                    onclick={() => toggle('listings')}
                    aria-label="Toggle new listing alerts"
                    role="switch"
                    aria-checked={toggles.listings}
                    >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            <!-- Price drop alerts -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Price drop alerts</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Get notified when a saved or viewed property drops in price</div>
                </div>
                <button
                    class={`toggle-track ${toggles.price ? 'on' : ''}`}
                    onclick={() => toggle('price')}
                    aria-label="Toggle price drop alerts"
                    role="switch"
                    aria-checked={toggles.price}
                    >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            <!-- Agent messages -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Agent messages</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Receive replies and updates from agents you've contacted</div>
                </div>
                <button
                    class={`toggle-track ${toggles.agents ? 'on' : ''}`}
                    onclick={() => toggle('agents')}
                    aria-label="Toggle agent messages"
                    role="switch"
                    aria-checked={toggles.agents}
                    >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            <!-- Marketing -->
            <div class="s-row">
                <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Marketing & tips</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Property market insights, guides and Blupodd updates</div>
                </div>
                <button
                    class={`toggle-track ${toggles.marketing ? 'on' : ''}`}
                    onclick={() => toggle('marketing')}
                    aria-label="Toggle marketing notifications"
                    role="switch"
                    aria-checked={toggles.marketing}
                    >
                    <div class="toggle-thumb"></div>
                </button>
            </div>

            </div>
        </div>

      <!-- ════════════════════════════════
           SECTION 2: ACCOUNT PREFERENCES
      ════════════════════════════════ -->
      <span class="s-anchor" id="sec-preferences"></span>
      <div class="mb-8 fu d2">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3.5" stroke="#D4AE3A" stroke-width="1.4"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.22 3.22l1.41 1.41M15.37 15.37l1.41 1.41M3.22 16.78l1.41-1.41M15.37 4.63l1.41-1.41" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <div>
            <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">Account preferences</h2>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Language, timezone and display</p>
          </div>
        </div>
        <div class="s-card">

          <!-- Language -->
          <div class="s-row">
            <div class="min-w-0 flex-1">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Language</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Interface and email language</div>
            </div>
            <div class="sel-wrap max-w-[180px] flex-shrink-0">
              <select class="bp-sel" onchange={() => {}}>
                <option>English (UK)</option>
                <option>English (US)</option>
                <option>Hausa</option>
                <option>Yoruba</option>
                <option>Igbo</option>
                <option>Français</option>
              </select>
            </div>
          </div>

          <!-- Timezone -->
          <div class="s-row">
            <div class="min-w-0 flex-1">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Timezone</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Used for viewing times and alerts</div>
            </div>
            <div class="sel-wrap max-w-[180px] flex-shrink-0">
              <select class="bp-sel" onchange={() => {}}>
                <option>WAT (UTC+1) Lagos</option>
                <option>GMT (UTC+0) London</option>
                <option>EST (UTC-5) New York</option>
                <option>GST (UTC+4) Dubai</option>
                <option>AEST (UTC+10) Sydney</option>
              </select>
            </div>
          </div>

          <!-- Currency -->
          <div class="s-row">
            <div class="min-w-0 flex-1">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Display currency</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Prices shown in this currency across the platform</div>
            </div>
            <div class="sel-wrap max-w-[180px] flex-shrink-0">
              <select class="bp-sel" onchange={() => {}}>
                <option>NGN (₦)</option>
                <option>USD ($)</option>
                <option>GBP (£)</option>
                <option>EUR (€)</option>
                <option>CAD (C$)</option>
                <option>AED (د.إ)</option>
              </select>
            </div>
          </div>

          <!-- Theme -->
          <div class="s-row" style="flex-direction:column;align-items:flex-start;gap:14px">
            <div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Theme</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Choose how Blupodd looks for you</div>
            </div>
            <div class="flex gap-2 flex-wrap w-full">

              <!-- Light -->
              <button class={`theme-opt ${selectedTheme === 'light' ? 'selected' : ''} flex-1 min-w-[90px]`} id="theme-light" onclick={() => setTheme('light')} aria-label="Light theme">
                <div class="w-full h-12 rounded-xl border border-chalk-3 dark:border-white/[.08] bg-white flex items-center justify-center gap-2 mb-1 tt" style="min-width:60px">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#8C8070" stroke-width="1.5" stroke-linecap="round"><circle cx="10" cy="10" r="4"/><path d="M10 2v1.5M10 16.5V18M2 10h1.5M16.5 10H18M4.22 4.22l1.06 1.06M14.72 14.72l1.06 1.06M4.22 15.78l1.06-1.06M14.72 5.28l1.06-1.06"/></svg>
                  <div class="w-4 h-2 rounded-full bg-chalk-3"></div>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="theme-check"><svg id="check-light" width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                  <span class="theme-opt-label">Light</span>
                </div>
              </button>

              <!-- Dark -->
              <button class={`theme-opt ${selectedTheme === 'dark' ? 'selected' : ''} flex-1 min-w-[90px]`} id="theme-dark" onclick={() => setTheme('dark')} aria-label="Dark theme">
                <div class="w-full h-12 rounded-xl border border-chalk-3 dark:border-white/[.08] bg-navy-deep flex items-center justify-center gap-2 mb-1 tt" style="min-width:60px">
                  <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.5" stroke-linecap="round"><path d="M17 12A8 8 0 119 3c-.5 2.5.5 5.5 3 7.5s5.5 2 5 1.5z"/></svg>
                  <div class="w-4 h-2 rounded-full bg-white/15"></div>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="theme-check"><svg id="check-dark" class="hidden" width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                  <span class="theme-opt-label">Dark</span>
                </div>
              </button>

              <!-- System -->
              <button class={`theme-opt ${selectedTheme === 'system' ? 'selected' : ''} flex-1 min-w-[90px]`} id="theme-system" onclick={() => setTheme('system')} aria-label="System theme">
                <div class="w-full h-12 rounded-xl border border-chalk-3 dark:border-white/[.08] overflow-hidden flex mb-1 tt" style="min-width:60px">
                  <div class="flex-1 bg-white flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="#8C8070" stroke-width="1.8" stroke-linecap="round"><circle cx="10" cy="10" r="4"/><path d="M10 2v1.5M10 16.5V18"/></svg>
                  </div>
                  <div class="flex-1 bg-navy-deep flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="1.8" stroke-linecap="round"><path d="M17 12A8 8 0 119 3c-.5 2.5.5 5.5 3 7.5s5.5 2 5 1.5z"/></svg>
                  </div>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="theme-check"><svg id="check-system" class="hidden" width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
                  <span class="theme-opt-label">System</span>
                </div>
              </button>

            </div>
          </div>

        </div>
      </div>


      <!-- ════════════════════════════════
           SECTION 3: PRIVACY & SECURITY
      ════════════════════════════════ -->
      <span class="s-anchor" id="sec-privacy"></span>
      <div class="mb-8 fu d3">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-xl bg-sage-light dark:bg-sage/15 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 2l7 3v5c0 4-3 7-7 8C7 17 4 14 3 10V5l7-3z" stroke="#4A7848" stroke-width="1.4" stroke-linejoin="round"/><path d="M7 10l2 2 4-4" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </div>
          <div>
            <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">Privacy &amp; security</h2>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Control who sees your activity</p>
          </div>
        </div>
        <div class="s-card">

          <!-- Profile visibility -->
          <div class="s-row">
            <div class="min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Public profile</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Allow agents to see your basic profile details</div>
            </div>
            <button
                class={`toggle-track ${toggles.public ? 'on' : ''}`}
                onclick={() => toggle('public')}
                aria-label="Toggle public profile"
                role="switch"
                aria-checked={toggles.public}
            >
                <div class="toggle-thumb"></div>
            </button>
          </div>

          <!-- 2FA -->
          <div class="s-row">
            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-2 mb-0.5 flex-wrap">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Two-factor authentication</div>
                <span class={toggles.twoFA ? 'badge-on' : 'badge-off'}>
                    {toggles.twoFA ? 'On' : 'Off'}
                </span>
              </div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Add an extra layer of security to your account</div>
            </div>
            <button
                class={`toggle-track ${toggles.twoFA ? 'on' : ''}`}
                onclick={toggle2FA}
                aria-label="Toggle two-factor authentication"
                role="switch"
                aria-checked={toggles.twoFA}
                >
                <div class="toggle-thumb"></div>
            </button>
          </div>

          <!-- Connected devices -->
          <div class="s-row" style="cursor:default">
            <div class="min-w-0 flex-1">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Active sessions</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">You are signed in on 2 devices</div>
            </div>
            <a href="#" class="text-[12px] font-medium text-ember dark:text-[#EDBA9B] hover:text-ember-deep dark:hover:text-white tt no-underline flex-shrink-0">Sign out all →</a>
          </div>

          <!-- Change password shortcut -->
          <div class="s-row" style="cursor:default">
            <div class="min-w-0 flex-1">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Password</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Last changed 3 months ago</div>
            </div>
            <a href="/users/profile" class="text-[12px] font-medium text-blue-link dark:text-blue-bright hover:text-navy-dark dark:hover:text-white tt no-underline flex-shrink-0">Change →</a>
          </div>

        </div>
      </div>


      <!-- ════════════════════════════════
           SECTION 4: DATA & USAGE
      ════════════════════════════════ -->
      <span class="s-anchor" id="sec-data"></span>
      <div class="mb-10 fu d4">
        <div class="flex items-center gap-3 mb-4">
          <div class="w-8 h-8 rounded-xl bg-ember-light dark:bg-ember/15 flex items-center justify-center flex-shrink-0">
            <svg width="15" height="15" viewBox="0 0 20 20" fill="none"><ellipse cx="10" cy="5" rx="7" ry="3" stroke="#C06035" stroke-width="1.4"/><path d="M3 5v5c0 1.66 3.13 3 7 3s7-1.34 7-3V5" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/><path d="M3 10v5c0 1.66 3.13 3 7 3s7-1.34 7-3v-5" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg>
          </div>
          <div>
            <h2 class="text-[15px] font-medium text-navy-dark dark:text-blue-100 leading-none">Data &amp; usage</h2>
            <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Manage your stored data</p>
          </div>
        </div>
        <div class="s-card">

          <!-- Viewing history usage -->
          <div class="s-row" style="flex-direction:column;align-items:flex-start;gap:12px">
            <div class="w-full flex items-center justify-between gap-3 flex-wrap">
              <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Viewing history</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">24 properties stored · approximately 12 KB</div>
              </div>
              <button class="btn-danger" onclick={toggleViewingHistory}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 4 3 4 14 4"/><path d="M13 4l-.8 9a1.5 1.5 0 01-1.5 1.4H5.3a1.5 1.5 0 01-1.5-1.4L3 4M6 4V2.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5V4"/></svg>
                Clear history
              </button>
            </div>
          </div>

          <!-- Search history -->
          <div class="s-row" style="flex-direction:column;align-items:flex-start;gap:12px">
            <div class="w-full flex items-center justify-between gap-3 flex-wrap">
              <div class="min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Search history</div>
                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">47 searches stored · includes filters and queries</div>
              </div>
              <button class="btn-danger" onclick={toggleSearchHistory}>
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 4 3 4 14 4"/><path d="M13 4l-.8 9a1.5 1.5 0 01-1.5 1.4H5.3a1.5 1.5 0 01-1.5-1.4L3 4"/></svg>
                Clear searches
              </button>
            </div>
          </div>

          <!-- Saved properties -->
          <div class="s-row">
            <div class="min-w-0">
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Saved properties</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">7 properties saved to your account</div>
            </div>
            <a href="/users/fav-listings" class="text-[12px] font-medium text-blue-link dark:text-blue-bright hover:text-navy-dark dark:hover:text-white tt no-underline flex-shrink-0">Manage →</a>
          </div>

        </div>
      </div>

        </div>
    </main>

</div>

<style>
    /* ── base ── */
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    
    /* ── animations ── */
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .48s ease both}
    .d1{animation-delay:.06s}.d2{animation-delay:.12s}.d3{animation-delay:.18s}
    .d4{animation-delay:.24s}.d5{animation-delay:.30s}.d6{animation-delay:.36s}
    @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
    .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
    
    /* ── sidebar ── */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active,
    :global([data-theme="dark"]) .sb-link.active{background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover,
    :global([data-theme="dark"]) .sb-link:not(.active):hover{background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* ── settings card ── */
    .s-card{
      background:#fff;border:1px solid #EDE7DC;border-radius:20px;
      box-shadow:0 2px 16px rgba(10,36,99,.055);transition:box-shadow .2s;overflow:hidden
    }
    .dark .s-card,
    :global([data-theme="dark"]) .s-card{background:#0D1422;border-color:rgba(255,255,255,.06);box-shadow:none}
    
    /* ── setting row ── */
    .s-row{
      display:flex;align-items:center;justify-content:space-between;
      gap:16px;padding:18px 24px;transition:background .18s
    }
    .s-row + .s-row{border-top:1px solid #EDE7DC}
    .dark .s-row + .s-row,
    :global([data-theme="dark"]) .s-row + .s-row{border-top-color:rgba(255,255,255,.06)}
    .s-row:hover{background:rgba(247,243,236,.7)}
    .dark .s-row:hover,
    :global([data-theme="dark"]) .s-row:hover{background:rgba(255,255,255,.025)}
    
    /* ── toggle switch ── */
    .toggle-track{
      position:relative;width:46px;height:26px;border-radius:13px;
      background:#EDE7DC;cursor:pointer;transition:background .25s;flex-shrink:0;
      border:none;outline:none
    }
    .dark .toggle-track,
    :global([data-theme="dark"]) .toggle-track {background:rgba(255,255,255,.12)}
    .toggle-track.on{background:#0A2463}
    .dark .toggle-track.on,
    :global([data-theme="dark"]) .toggle-track.on {background:#4A90E2}
    .toggle-thumb{
      position:absolute;top:3px;left:3px;width:20px;height:20px;
      border-radius:50%;background:#fff;transition:transform .25s cubic-bezier(.34,1.3,.64,1),background .2s;
      box-shadow:0 1px 4px rgba(0,0,0,.18)
    }
    .toggle-track.on .toggle-thumb{transform:translateX(20px)}
    
    /* ── theme selector ── */
    .theme-opt{
      display:flex;flex-direction:column;align-items:center;gap:7px;cursor:pointer;
      padding:14px 18px;border-radius:14px;border:2px solid transparent;
      transition:border-color .2s,background .2s;background:transparent
    }
    .theme-opt:hover{background:rgba(74,144,226,.06)}
    .theme-opt.selected{border-color:#4A90E2;background:rgba(74,144,226,.07)}
    .dark .theme-opt.selected,
    :global([data-theme="dark"]) .theme-opt.selected{background:rgba(74,144,226,.12)}
    .theme-opt-label{font-size:12px;font-family:'DM Sans',sans-serif;color:#8C8070;font-weight:400;transition:color .2s}
    .theme-opt.selected .theme-opt-label{color:#0A2463;font-weight:500}
    .dark .theme-opt.selected .theme-opt-label,
    :global([data-theme="dark"]) .theme-opt.selected .theme-opt-label {color:#4A90E2}
    .theme-check{
      width:16px;height:16px;border-radius:50%;border:1.5px solid #D8CEBC;background:transparent;
      display:flex;align-items:center;justify-content:center;transition:border-color .2s,background .2s;flex-shrink:0
    }
    .dark .theme-check,
    :global([data-theme="dark"]) .theme-check{border-color:rgba(255,255,255,.15)}
    .theme-opt.selected .theme-check{background:#4A90E2;border-color:#4A90E2}
    
    /* ── sel wrap ── */
    .sel-wrap{position:relative;display:inline-block;width:100%}
    .sel-wrap::after{content:'▾';position:absolute;right:13px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .sel-wrap::after,
    :global([data-theme="dark"]) .sel-wrap::after{color:#6A7FA0}
    .bp-sel{
      width:100%;background:#F7F3EC;border:1.5px solid #EDE7DC;border-radius:12px;
      padding:10px 36px 10px 14px;font-family:'DM Sans',sans-serif;font-size:13px;
      color:#0A2463;outline:none;cursor:pointer;transition:border-color .2s,background .3s
    }
    .bp-sel:focus{border-color:#4A90E2}
    .dark .bp-sel,
    :global([data-theme="dark"]) .bp-sel {background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    
    /* ── danger btn ── */
    .btn-danger{
      display:inline-flex;align-items:center;gap:7px;font-family:'DM Sans',sans-serif;
      font-size:13px;font-weight:500;padding:10px 18px;border-radius:40px;cursor:pointer;
      border:1.5px solid rgba(192,96,53,.3);background:rgba(245,213,197,.5);color:#5C2416;
      transition:background .2s,border-color .2s,transform .15s
    }
    .btn-danger:hover{background:#F5D5C5;border-color:rgba(192,96,53,.55);transform:scale(1.02)}
    .dark .btn-danger,
    :global([data-theme="dark"]) .btn-danger {background:rgba(192,96,53,.1);border-color:rgba(192,96,53,.25);color:#EDBA9B}
    .dark .btn-danger:hover,
    :global([data-theme="dark"]) .btn-danger:hover{background:rgba(192,96,53,.18)}
    
    /* ── 2FA badge ── */
    .badge-off{background:#F5D5C5;color:#5C2416;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:40px;flex-shrink:0}
    .dark .badge-off,
    :global([data-theme="dark"]) .badge-off {background:rgba(192,96,53,.2);color:#EDBA9B}
    .badge-on{background:#EFF3EE;color:#4A7848;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:3px 10px;border-radius:40px;flex-shrink:0}
    .dark .badge-on,
    :global([data-theme="dark"]) .badge-on {background:rgba(74,120,72,.2);color:#7DBF7A}
    
    /* ── toast ── */
    #toast{position:fixed;bottom:28px;left:50%;transform:translateX(-50%) translateY(16px);z-index:400;
      opacity:0;pointer-events:none;transition:opacity .28s,transform .28s cubic-bezier(.34,1.2,.64,1)}
    #toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
    
    /* ── section anchor ── */
    .s-anchor{display:block;height:1px;margin-top:-24px;padding-top:24px}
    
    /* ── nav dots (section jump) ── */
    .s-nav-item{transition:color .2s,background .2s}
    .s-nav-item.active{color:#0A2463;background:rgba(74,144,226,.1)}
    .dark .s-nav-item.active,
    :global([data-theme="dark"]) .s-nav-item.active {color:#4A90E2;background:rgba(74,144,226,.12)}
    
    /* ── confirm dialog ── */
    .confirmDialog.open{display:flex}
    
    @media(max-width:640px){
      .s-row{padding:15px 18px;gap:12px}
      .hide-xs{display:none!important}
    }
</style>