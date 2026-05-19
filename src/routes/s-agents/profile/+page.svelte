<script lang="ts">
  import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";
  
  type TabType = 'personal profile' | 'agency info' | 'change password';

  let selectedTab = $state<TabType>('personal profile');
  let pImageFile: HTMLInputElement;
  let aAgencyFile: HTMLInputElement;
  let agencyDocFile: HTMLInputElement;
  let previewUrl = $state<string | null>(null);
  let previewAgencyLogoUrl = $state<string | null>(null);
  let currentPassword = $state("");
  let isCurrentPasswordVisible = $state(false);

  let confirmNewPassword = $state("");
  let isConfirmNewVisible = $state(false);

  let newPassword = $state("");
  let isNewPasswordVisible = $state(false);

  const toggleConfirmPassword = () => isConfirmNewVisible = !isConfirmNewVisible;

  const toggleCurrentPassword = () => isCurrentPasswordVisible = !isCurrentPasswordVisible;

  const toggleNewPassword = () => isNewPasswordVisible = !isNewPasswordVisible;

    const switchTab = (value: TabType) => selectedTab = value;

    const handlePImageUpload = () => {
        const files = pImageFile?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        previewUrl = URL.createObjectURL(file);
    }

    const handleALogoUpload = () => {
        const files = aAgencyFile?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        previewAgencyLogoUrl = URL.createObjectURL(file);
    }

    const handleDocumentUpload = () => {
        const files = agencyDocFile?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        // previewAgencyLogoUrl = URL.createObjectURL(file);
    }

    const removePImage = () => {
        previewUrl = null;
        pImageFile.value = '';
    }

    // Password strength
    const requirements = $derived({
    length: newPassword.length >= 8,
    upper: /[A-Z]/.test(newPassword),
    number: /[0-9]/.test(newPassword),
    special: /[^A-Za-z0-9]/.test(newPassword)
  });

  const strength = $derived(() => {
    if (!newPassword) {
      return {
        pts: 0,
        label: 'Enter a password',
        color: '',
        className: ''
      };
    }

    let pts = 0;

    if (requirements.length) pts++;
    if (requirements.upper) pts++;
    if (requirements.number) pts++;
    if (requirements.special) pts++;

    const classes = [
      '',
      'str-weak',
      'str-weak',
      'str-fair',
      'str-fair',
      'str-strong'
    ];

    const labels = [
      '',
      'Very weak',
      'Weak',
      'Fair',
      'Strong',
      'Very strong'
    ];

    const colors = [
      '',
      '#C06035',
      '#C06035',
      '#D4AE3A',
      '#D4AE3A',
      '#4A7848'
    ];

    return {
      pts,
      label: labels[pts],
      color: colors[pts],
      className: classes[pts]
    };
  });

</script>


<!-- ══ LAYOUT ══ -->
<div class="flex pt-[68px] min-h-screen">
  <SubAgencySidebar />

    <!-- ═══ MAIN ═══ -->
<main class="flex-1 min-w-0 overflow-x-hidden">

    <!-- PAGE HEADER -->
    <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
      <div class="max-w-[820px] mx-auto">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agent dashboard</p>
            <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
              Manage <em class="italic text-chalk-3">profile.</em>
            </h1>
            <p class="text-[13px] font-light text-white/50 mt-1.5">Update your personal details, agency information, and account security.</p>
          </div>
          <!-- Avatar preview in header -->
          <div class="flex items-center gap-3 flex-shrink-0">
            <div class="relative">
              <div class="w-14 h-14 rounded-full bg-navy-strong ring-2 ring-blue-bright/30 flex items-center justify-center text-[18px] font-medium text-white">CO</div>
              <span class="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-sage border-2 border-navy-dark flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5 3.5-4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
            </div>
            <div>
              <div class="text-[14px] font-medium text-white">Chukwuemeka Okafor</div>
              <div class="text-[11px] text-white/45 mt-0.5">Premier Properties PH · Principal</div>
            </div>
          </div>
        </div>
      </div>
    </div>

      <!-- TABS + CONTENT -->
  <div class="px-6 lg:px-10 py-7 max-w-[820px] mx-auto">

    <!-- Tab bar -->
    <div class="border-b border-chalk-3 dark:border-white/[0.08] mb-7 fu">
      <div class="tab-scroll flex gap-6 scrollbar-hide">
        <button id="tab-personal" class:active={selectedTab === 'personal profile'} class="tab-btn" onclick={() => switchTab('personal profile')}>
          <span class="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="4" stroke="currentColor" stroke-width="1.4"/><path d="M3 18c0-4 3.13-6 7-6s7 2 7 6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            Personal profile
          </span>
        </button>
        <button id="tab-agency" class:active={selectedTab === 'agency info'} class="tab-btn" onclick={() => switchTab('agency info')}>
          <span class="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M2 18V8l8-6 8 6v10a1 1 0 01-1 1H3a1 1 0 01-1-1z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M8 18v-6h4v6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
            Agency info
          </span>
        </button>
        <button id="tab-password" class:active={selectedTab === 'change password'} class="tab-btn"  onclick={() => switchTab('change password')}>
          <span class="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="14" r="1.5" fill="currentColor"/></svg>
            Change password
          </span>
        </button>
      </div>
    </div>

    {#if selectedTab === 'personal profile'}
    <!-- ══════════════════════════════
         TAB 1 — PERSONAL PROFILE
    ══════════════════════════════ -->
    <div id="panel-personal" class="tab-panel space-y-5 fu d1">

        <!-- Avatar card -->
        <div class="pcard fu d1">
          <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2">
            <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Profile photo</span>
          </div>
          <div class="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <!-- Avatar circle -->
            <div class="relative flex-shrink-0">
              {#if previewUrl}
              <div id="avatarCircle" 
                style={`background-image: url(${previewUrl}); background-size:cover; background-position: center center;`}
                class="avatar-ring w-20 h-20 rounded-full bg-navy-strong flex items-center justify-center text-[24px] font-medium text-white ring-2 ring-blue-bright/20">
              </div>
              {:else}
              <div id="avatarCircle" class="avatar-ring w-20 h-20 rounded-full bg-navy-strong flex items-center justify-center text-[24px] font-medium text-white ring-2 ring-blue-bright/20">CO</div>
              {/if}
              <button aria-label="Change avatar" onclick={() => pImageFile.click()} class="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-blue-bright flex items-center justify-center cursor-pointer border-2 border-white dark:border-[#0D1422] hover:bg-blue-link tt">
                <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2 10l1.5-4 7-7 2.5 2.5-7 7L2 10z" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <input type="file" 
                id="avatarInput" 
                class="hidden" 
                accept="image/*" 
                bind:this={pImageFile} 
                onchange={handlePImageUpload} />
            </div>
            <div class="flex-1">
              <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1">Chukwuemeka Okafor</div>
              <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mb-3">JPG, PNG or WEBP · Max 2 MB · Square recommended</div>
              <div class="flex gap-2.5 flex-wrap">
                <button onclick={() => pImageFile.click()} class="flex items-center gap-2 text-[13px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.1] bg-white dark:bg-[#1A2438] hover:border-blue-bright hover:text-blue-link dark:hover:text-blue-bright px-4 py-2 rounded-full cursor-pointer tt">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 9V1M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M1 11v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                  Upload new photo
                </button>
                <button onclick={removePImage} class="text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] hover:text-ember tt cursor-pointer bg-transparent border-none font-sans">Remove</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Personal info form -->
        <div class="pcard fu d2">
            <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
                <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Personal information</span>
            </div>
            <span id="personal-unsaved" class="hidden flex items-center gap-1.5 text-[11px] text-gold">
                <span class="unsaved-dot"></span>Unsaved changes
            </span>
            </div>
            <div class="p-6 space-y-4">
            <!-- Name row -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label class="block slabel mb-1.5">First name <span class="text-ember normal-case text-[12px]">*</span></label>
                <input type="text" id="first_name" value="Chukwuemeka" class="finp" placeholder="First name">
                </div>
                <div>
                <label class="block slabel mb-1.5">Last name <span class="text-ember normal-case text-[12px]">*</span></label>
                <input type="text" id="last_name" value="Okafor" class="finp" placeholder="Last name">
                </div>
            </div>
            <!-- Email -->
            <div>
                <label for="email" class="block slabel mb-1.5">Email address <span class="text-ember normal-case text-[12px]">*</span></label>
                <div class="relative">
                <input type="email" id="email" value="chukwuemeka@premierph.ng" class="finp pr-28" placeholder="email@example.com">
                <span class="absolute right-3 top-1/2 -translate-y-1/2 pill bg-sage-light text-sage">
                    <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Verified
                </span>
                </div>
                <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">This is your login email. Changing it will require re-verification.</p>
            </div>
            <!-- Phone -->
            <div>
                <label for="phone" class="block slabel mb-1.5">Phone number</label>
                <div class="flex gap-2">
                <div class="fsel-wrap flex-shrink-0">
                    <select class="finp w-[88px] pr-7 cursor-pointer">
                    <option>🇳🇬 +234</option>
                    <option>🇬🇧 +44</option>
                    <option>🇺🇸 +1</option>
                    </select>
                </div>
                <input type="tel" id="phone" value="08001234567" class="finp flex-1" placeholder="080 000 0000">
                </div>
            </div>

            <!-- Divider -->
            <div class="border-t border-chalk-3 dark:border-white/[0.07] pt-4">
                <div class="slabel mb-3">Public profile extras</div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label for="exp" class="block text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Years of experience</label>
                    <input id="exp" type="number" value="7" min="0" max="50" class="finp" placeholder="e.g. 7">
                </div>
                <div>
                    <label for="specialization" class="block text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] mb-1.5">Specialisation</label>
                    <div class="fsel-wrap">
                    <select id="specialization" class="finp cursor-pointer pr-8">
                        <option>Residential lettings</option>
                        <option>Residential sales</option>
                        <option>Commercial</option>
                        <option>Land &amp; development</option>
                        <option>Short-let / Airbnb</option>
                    </select>
                    </div>
                </div>
                </div>
            </div>

            <!-- Bio -->
            <div>
                <label for="bio" class="block slabel mb-1.5">Professional bio</label>
                <textarea id="bio" class="finp ftxt" placeholder="Tell clients about your experience, specialisms, and what makes you stand out…">Experienced property agent based in Port Harcourt with over 7 years specialising in premium residential lettings across GRA Phase 2, Old GRA, and Trans-Amadi. Known for transparent dealings, rapid response times, and extensive knowledge of the Rivers State property market.</textarea>
                <div class="flex justify-between mt-1.5">
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Shown on your public agent profile</span>
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]" id="bioCount">318 / 600</span>
                </div>
            </div>

            <!-- Social links -->
            <div class="border-t border-chalk-3 dark:border-white/[0.07] pt-4">
                <div class="slabel mb-3">Social &amp; professional links</div>
                <div class="space-y-3">
                <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2"><svg width="14" height="14" viewBox="0 0 20 20" fill="none" class="text-[#25D366]"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01C6.35 6.5 5.05 7.74 5.05 9.57c0 1.823 1.53 3.62 1.75 3.882.22.266 2.83 4.63 6.892 6.32.963.415 1.714.663 2.3.849.966.308 1.846.264 2.542.16.776-.115 2.39-.977 2.726-1.92.335-.944.335-1.754.235-1.923-.1-.169-.37-.268-.67-.417z" stroke="#25D366" stroke-width="1"/></svg></span>
                    <input type="text" value="+234 800 123 4567" class="finp pl-9" placeholder="WhatsApp number">
                </div>
                <div class="relative">
                    <span class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0077B5] text-[13px] font-bold">in</span>
                    <input type="url" value="https://linkedin.com/in/chukwuemeka-okafor" class="finp pl-9" placeholder="LinkedIn profile URL">
                </div>
                </div>
            </div>
            </div>
            <!-- Form footer -->
            <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] flex items-center justify-between flex-wrap gap-3 bg-chalk-2/50 dark:bg-white/[0.02]">
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 6v3.5M7 4.5h.01" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                Last saved: today at 09:14
            </div>
            <div class="flex gap-2.5">
                <button onclick={() => {}} class="text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] px-5 py-2 rounded-full hover:text-navy-dark hover:border-chalk-4 dark:hover:text-blue-100 tt cursor-pointer bg-transparent">Discard</button>
                <button onclick={() => {}} class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 1010 0 5 5 0 00-10 0z"/><path d="M5 7l1.5 1.5 2.5-2.5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Save changes
                </button>
            </div>
            </div>
        </div>
    </div>
    {/if}

    {#if selectedTab === 'agency info'}
    <!-- ══════════════════════════════
         TAB 2 — AGENCY INFO
    ══════════════════════════════ -->
    <div id="panel-agency" class="tab-panel space-y-5 fu d1">
        <!-- Agency identity -->
        <div class="pcard">
            <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between">
            <div class="flex items-center gap-2">
                <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
                <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Agency identity</span>
            </div>
            <span class="pill bg-sage-light text-sage"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l2.5 2.5 5.5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Verified agency</span>
            </div>
            <div class="p-6 space-y-4">
            <!-- Logo upload -->
            <div>
                <div class="slabel mb-2">Agency logo</div>
                <div class="flex items-center gap-4 flex-wrap">
                {#if previewAgencyLogoUrl}
                <div style={`background-image: url(${previewAgencyLogoUrl}); background-size:cover; background-position: center center;`} class="w-16 h-16 rounded-xl bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-[11px] font-bold text-navy-accent dark:text-[#8DAACC] tt flex-shrink-0">
                </div>
                {:else}
                <div class="w-16 h-16 rounded-xl bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.1] flex items-center justify-center text-[11px] font-bold text-navy-accent dark:text-[#8DAACC] tt flex-shrink-0">PP</div>
                {/if}
                <div>
                    <button onclick={() => aAgencyFile.click()} class="flex items-center gap-2 text-[13px] font-medium text-navy-dark dark:text-blue-100 border border-chalk-3 dark:border-white/[.1] bg-white dark:bg-[#1A2438] hover:border-blue-bright hover:text-blue-link dark:hover:text-blue-bright px-4 py-2 rounded-full cursor-pointer tt mb-1.5">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 9V1M4 6l3 3 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M1 11v1a1 1 0 001 1h10a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                    Upload logo
                    </button>
                    <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">PNG or SVG, min 200×200px</p>
                    <input bind:this={aAgencyFile} 
                        type="file" 
                        id="logoInput" 
                        class="hidden" 
                        accept="image/*" 
                        onchange={handleALogoUpload} />
                </div>
                </div>
            </div>

            <!-- Agency name + reg -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label class="block slabel mb-1.5">Agency name <span class="text-ember normal-case text-[12px]">*</span></label>
                <input type="text" value="Premier Properties PH" class="finp" placeholder="Agency trading name">
                </div>
                <div>
                <label class="block slabel mb-1.5">Registration number</label>
                <input type="text" value="RC-0987654" class="finp" placeholder="CAC / RC number">
                </div>
            </div>

            <!-- Contact -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                <label class="block slabel mb-1.5">Agency phone</label>
                <input type="tel" value="0840 123 4567" class="finp" placeholder="Main office number">
                </div>
                <div>
                <label class="block slabel mb-1.5">Agency email</label>
                <input type="email" value="hello@premierph.ng" class="finp" placeholder="office@agency.com">
                </div>
            </div>

            <!-- Address -->
            <div>
                <label class="block slabel mb-1.5">Office address</label>
                <input type="text" value="14 Aba Road, GRA Phase 2, Port Harcourt" class="finp mb-2.5" placeholder="Street address">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div class="fsel-wrap">
                    <select class="finp cursor-pointer pr-8">
                    <option selected>Rivers State</option><option>Lagos State</option><option>Abuja FCT</option><option>Delta State</option><option>Anambra</option><option>Cross River</option><option>Ogun State</option>
                    </select>
                </div>
                <input type="text" value="Port Harcourt" class="finp" placeholder="City / Area">
                </div>
            </div>

            <!-- About agency -->
            <div>
                <label class="block slabel mb-1.5">Agency description</label>
                <textarea class="finp ftxt" placeholder="Describe your agency…">Premier Properties PH is a full-service real estate agency founded in 2016, specialising in premium residential and commercial properties across Rivers State. We are renowned for our transparent, client-first approach and deep knowledge of the Port Harcourt property market.</textarea>
                <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">Shown on your public agency profile page</p>
            </div>
            </div>
            <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] flex items-center justify-end gap-2.5 bg-chalk-2/50 dark:bg-white/[0.02]">
            <button class="text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1] px-5 py-2 rounded-full hover:text-navy-dark dark:hover:text-blue-100 tt cursor-pointer bg-transparent">Discard</button>
            <button onclick={() => {}} class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7a5 5 0 1010 0 5 5 0 00-10 0z"/><path d="M5 7l1.5 1.5 2.5-2.5" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                Save agency info
            </button>
            </div>
        </div>

        <!-- Documents / verification -->
      <div class="pcard">
        <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2">
          <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
          <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Verification documents</span>
        </div>
        <div class="p-6 space-y-4">
          <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.7]">Upload your agency registration documents. Verified agencies receive a badge on all listings and improved search ranking.</p>
          <!-- Docs -->
          <div class="space-y-3">
            <!-- Uploaded doc -->
            <div class="flex items-center gap-3 bg-sage-light/50 dark:bg-sage/[0.08] border border-sage/20 dark:border-sage/20 rounded-xl px-4 py-3 tt">
              <div class="w-9 h-9 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke="#4A7848" stroke-width="1.3"/><path d="M5 5h6M5 7.5h6M5 10h4" stroke="#4A7848" stroke-width="1.2" stroke-linecap="round"/></svg></div>
              <div class="flex-1 min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">CAC Certificate.pdf</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Uploaded 14 Feb 2026 · 1.2 MB</div>
              </div>
              <span class="pill bg-sage-light text-sage flex-shrink-0"><svg width="8" height="8" viewBox="0 0 10 10" fill="none"><path d="M2 5l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Verified</span>
            </div>
            <!-- Pending doc -->
            <div class="flex items-center gap-3 bg-gold/[0.06] border border-gold/20 rounded-xl px-4 py-3 tt">
              <div class="w-9 h-9 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke="#D4AE3A" stroke-width="1.3"/><path d="M5 5h6M5 7.5h6M5 10h4" stroke="#D4AE3A" stroke-width="1.2" stroke-linecap="round"/></svg></div>
              <div class="flex-1 min-w-0">
                <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Business Permit.pdf</div>
                <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Uploaded 2 days ago · 0.8 MB</div>
              </div>
              <span class="pill bg-gold/15 text-[#8A6A10] dark:text-gold flex-shrink-0">⏳ Reviewing</span>
            </div>
            <!-- Upload new -->
            <div class="file-drop p-4 text-center cursor-pointer" onclick={() => agencyDocFile.click()}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="mx-auto mb-2 text-chalk-muted dark:text-[#6A7FA0]"><path d="M10 13V4M7 7l3-3 3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><path d="M3 15v1a1 1 0 001 1h12a1 1 0 001-1v-1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
              <p class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Upload a document</p>
              <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">PDF, JPG or PNG · Max 5 MB</p>
              <input bind:this={agencyDocFile} type="file" id="docInput" class="hidden" accept=".pdf,image/*">
            </div>
          </div>
        </div>
      </div>

    </div>
    {/if}

    {#if selectedTab === 'change password'}
    <!-- ══════════════════════════════
         TAB 3 — CHANGE PASSWORD
    ══════════════════════════════ -->
    <div id="panel-password" class="tab-panel space-y-5 fu d1">

        <!-- Password form -->
        <div class="pcard">
          <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2">
            <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Change password</span>
          </div>
          <div class="p-6 space-y-4">
            <div class="bg-blue-bright/[0.06] dark:bg-blue-bright/[0.08] border border-blue-bright/20 dark:border-blue-bright/15 rounded-xl px-4 py-3 flex items-start gap-3 tt">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" class="text-blue-bright flex-shrink-0 mt-0.5"><circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/><path d="M8 7.5v4M8 5.5h.01" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
              <p class="text-[12px] text-navy-accent dark:text-[#8DAACC] leading-[1.6]">Use a strong password with at least 8 characters, mixing upper &amp; lowercase letters, numbers, and symbols. You'll be signed out of all other devices after changing.</p>
            </div>
  
            <!-- Current password -->
            <div>
              <label for="current_pw" class="block slabel mb-1.5">Current password <span class="text-ember normal-case text-[12px]">*</span></label>
              <div class="relative">
                <input bind:value={currentPassword}
                    type={isCurrentPasswordVisible ? 'text' : 'password'} 
                    id="current_pw" 
                    class="finp pr-10" 
                    placeholder="Enter your current password" />
                <button onclick={toggleCurrentPassword} class="absolute right-3 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-blue-100 tt cursor-pointer bg-transparent border-none">
                    {#if isCurrentPasswordVisible}
                    <svg class="eye-off" width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.4"/></svg>
                    {:else}
                    <svg class="eye-on hidden" width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M3 3l14 14M8.6 8.6A2.5 2.5 0 0012.4 12.4M5.4 5.4A8.8 8.8 0 001 10s4 7 9 7a8.8 8.8 0 006-2.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 4.1A9 9 0 0119 10s-.9 1.6-2.4 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                    {/if}
                </button>
              </div>
            </div>
  
            <!-- New password -->
        <div>
            <label for="new_pw" class="block slabel mb-1.5">
            New password
            <span class="text-ember normal-case text-[12px]">*</span>
            </label>
        
            <div class="relative">
            <input
                bind:value={newPassword}
                type={isNewPasswordVisible ? 'text' : 'password'}
                id="new_pw"
                class="finp pr-10"
                placeholder="Create a new password"
            />
        
            <button
                onclick={toggleNewPassword}
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2
                text-chalk-muted dark:text-[#6A7FA0]
                hover:text-navy-dark dark:hover:text-blue-100
                tt cursor-pointer bg-transparent border-none"
            >
                {#if isNewPasswordVisible}
                <svg
                    class="eye-off"
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                    d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z"
                    stroke="currentColor"
                    stroke-width="1.4"
                    />
                    <circle
                    cx="10"
                    cy="10"
                    r="2.5"
                    stroke="currentColor"
                    stroke-width="1.4"
                    />
                </svg>
                {:else}
                <svg
                    class="eye-on"
                    width="15"
                    height="15"
                    viewBox="0 0 20 20"
                    fill="none"
                >
                    <path
                    d="M3 3l14 14M8.6 8.6A2.5 2.5 0 0012.4 12.4M5.4 5.4A8.8 8.8 0 001 10s4 7 9 7a8.8 8.8 0 006-2.4"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    />
                    <path
                    d="M8 4.1A9 9 0 0119 10s-.9 1.6-2.4 3"
                    stroke="currentColor"
                    stroke-width="1.4"
                    stroke-linecap="round"
                    />
                </svg>
                {/if}
            </button>
            </div>
        
            <!-- Strength meter -->
            <div class="mt-2.5 space-y-1.5">
            <div class="flex gap-1.5">
                {#each Array(4) as _, index}
                <div
                    class={`str-bar flex-1 h-1 rounded-full ${
                    index < strength().pts
                        ? strength().pts === 4 ? 'str-strong': strength().className
                        : ''
                    }`}
                ></div>
                {/each}
            </div>
        
            <div class="flex items-center justify-between">
                <span
                class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]"
                style={`color:${strength().color}`}
                >
                {strength().label}
                </span>
        
                <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">
                </span>
            </div>
        </div>
  </div>
  
  <!-- Requirements -->
  <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 space-y-2 tt">
    <div class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] mb-2">
      Password requirements
    </div>
  
    <!-- Length -->
    <div
      class={`flex items-center gap-2 text-[12px] ${requirements.length ? 'text-[#4A7848]' : 'text-chalk-muted dark:text-[#6A7FA0]'}`}
    >
      <div
        class={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${requirements.length ? 'bg-[#4A7848]' : 'bg-chalk-3 dark:bg-white/20'}`}
      ></div>
  
      At least 8 characters
    </div>
  
    <!-- Uppercase -->
    <div
      class={`flex items-center gap-2 text-[12px] ${requirements.upper ? 'text-[#4A7848]' : 'text-chalk-muted dark:text-[#6A7FA0]'}`}
    >
      <div
        class={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${requirements.upper ? 'bg-[#4A7848]' : 'bg-chalk-3 dark:bg-white/20'}`}
      ></div>
  
      One uppercase letter
    </div>
  
    <!-- Number -->
    <div
      class={`flex items-center gap-2 text-[12px] ${requirements.number ? 'text-[#4A7848]' : 'text-chalk-muted dark:text-[#6A7FA0]'}`}
    >
      <div
        class={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${requirements.number ? 'bg-[#4A7848]' : 'bg-chalk-3 dark:bg-white/20'}`}
      ></div>
  
      One number
    </div>
  
    <!-- Special -->
    <div
      class={`flex items-center gap-2 text-[12px] ${requirements.special ? 'text-[#4A7848]' : 'text-chalk-muted dark:text-[#6A7FA0]'}`}
    >
      <div
        class={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${requirements.special ? 'bg-[#4A7848]' : 'bg-chalk-3 dark:bg-white/20'}`}
      ></div>
  
      One special character (!@#$…)
    </div>

  </div>
  
            <!-- Confirm password -->
            <div>
              <label for="confirm_pw" class="block slabel mb-1.5">Confirm new password <span class="text-ember normal-case text-[12px]">*</span></label>
              <div class="relative">
                <input bind:value={confirmNewPassword}
                    type={isConfirmNewVisible ? 'text' : 'password'}
                    id="confirm_pw" 
                    class="finp pr-10" 
                    placeholder="Repeat your new password" 
                    oninput={() => {
                    // Check match
                }}>
                <button aria-label="Toggle password visibility" onclick={toggleConfirmPassword} class="absolute right-3 top-1/2 -translate-y-1/2 text-chalk-muted dark:text-[#6A7FA0] hover:text-navy-dark dark:hover:text-blue-100 tt cursor-pointer bg-transparent border-none">
                  <svg class="eye-off" width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.4"/></svg>
                  <svg class="eye-on hidden" width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M3 3l14 14M8.6 8.6A2.5 2.5 0 0012.4 12.4M5.4 5.4A8.8 8.8 0 001 10s4 7 9 7a8.8 8.8 0 006-2.4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 4.1A9 9 0 0119 10s-.9 1.6-2.4 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </button>
              </div>
              <p class="text-[11px] mt-1.5 hidden text-ember" id="matchErr">Passwords do not match</p>
              <p class="text-[11px] mt-1.5 hidden text-sage" id="matchOk">✓ Passwords match</p>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] flex items-center justify-between flex-wrap gap-3 bg-chalk-2/50 dark:bg-white/[0.02]">
            <!-- <a href="#" class="text-[12px] text-blue-link hover:text-navy-dark dark:hover:text-blue-bright tt no-underline">Forgot current password?</a> -->
            <button onclick={() => {}} class="flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="3" y="7" width="8" height="6" rx="1.5" stroke="white" stroke-width="1.3"/><path d="M5 7V4.5a2 2 0 014 0V7" stroke="white" stroke-width="1.3" stroke-linecap="round"/></svg>
              Update password
            </button>
          </div>
        </div>
  
        <!-- 2FA section -->
        <div class="pcard">
          <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
              <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Two-factor authentication</span>
            </div>
            <span class="pill bg-chalk-2 dark:bg-white/[.08] text-chalk-muted dark:text-[#6A7FA0] border border-chalk-3 dark:border-white/[.1]">Not enabled</span>
          </div>
          <div class="p-6">
            <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] mb-4">Add an extra layer of security to your account. When enabled, you'll be asked for a code from your phone each time you sign in.</p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button class="flex items-center gap-3 p-4 border border-chalk-3 dark:border-white/[.1] rounded-xl hover:border-blue-bright hover:bg-blue-bright/[.03] tt cursor-pointer bg-transparent text-left">
                <div class="w-9 h-9 rounded-lg bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="15" r="1" fill="currentColor"/><path d="M8 5h4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg></div>
                <div><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">SMS / Phone</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Receive a code via text</div></div>
              </button>
              <button class="flex items-center gap-3 p-4 border border-chalk-3 dark:border-white/[.1] rounded-xl hover:border-blue-bright hover:bg-blue-bright/[.03] tt cursor-pointer bg-transparent text-left">
                <div class="w-9 h-9 rounded-lg bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt"><svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M10 2l2 4 4.5.7-3.25 3.15.77 4.5L10 12.2l-4.02 2.15.77-4.5L3.5 6.7 8 6z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/></svg></div>
                <div><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Authenticator app</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Use Google Authenticator or Authy</div></div>
              </button>
            </div>
          </div>
        </div>
  
        <!-- Active sessions -->
        <!-- <div class="pcard">
          <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2">
            <div class="w-[6px] h-[6px] rounded-full bg-blue-bright flex-shrink-0"></div>
            <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Active sessions</span>
          </div>
          <div class="divide-y divide-chalk-3 dark:divide-white/[0.06]">
            <div class="px-6 py-4 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M6 17h8M10 16v1" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Chrome · MacOS</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Port Harcourt, Nigeria · <span class="text-sage font-medium">This device</span></div>
                </div>
              </div>
              <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Active now</span>
            </div>
            <div class="px-6 py-4 flex items-center justify-between gap-4">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-chalk-2 dark:bg-[#1A2438] flex items-center justify-center flex-shrink-0 tt">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="currentColor" stroke-width="1.4"/><circle cx="10" cy="15" r="1" fill="currentColor"/></svg>
                </div>
                <div>
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Safari · iPhone 14</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Port Harcourt, Nigeria · 3 hours ago</div>
                </div>
              </div>
              <button class="text-[12px] font-medium text-ember hover:text-ember-deep tt cursor-pointer bg-transparent border-none font-sans">Revoke</button>
            </div>
          </div>
          <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07]">
            <button onclick="showToast('All other sessions have been signed out.')" class="text-[13px] font-medium text-ember hover:text-ember-deep tt cursor-pointer bg-transparent border-none font-sans flex items-center gap-1.5">
              <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><path d="M10 3H4a1 1 0 00-1 1v8a1 1 0 001 1h6M13 8l-4-4m4 4l-4 4m4-4H6" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Sign out all other sessions
            </button>
          </div>
        </div> -->
  
        <!-- Danger zone -->
        <div class="danger-zone p-6 fu d4">
          <div class="text-[13px] font-semibold text-ember mb-1.5 flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M8 1l7 13H1z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/><path d="M8 6v4M8 11.5v.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
            Danger zone
          </div>
          <p class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] mb-4">Permanently delete your account and all associated listings, data, and history. This action cannot be undone.</p>
          <button onclick={() => {}} class="flex items-center gap-2 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep px-5 py-2 rounded-full border-none cursor-pointer tt">
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 3.5h10M5.5 1h3M4 3.5l.5 9h5l.5-9" stroke="white" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
            Delete account
          </button>
        </div>
  
      </div><!-- /panel-password -->
    {/if}

    </div>

    </main>
</div>

<style>
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    select{-webkit-appearance:none;appearance:none}
    .scrollbar-hide::-webkit-scrollbar{display:none}
    .scrollbar-hide{-ms-overflow-style:none;scrollbar-width:none}
    @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
    .pulse-dot{animation:pulse-dot 2.2s infinite}
    @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .55s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .26s cubic-bezier(.22,.68,0,1.2) both}
    
    /* form input base */
    .finp{
      width:100%;
      background:#fff;
      border:1.5px solid #EDE7DC;
      border-radius:10px;
      padding:10px 14px;
      font-size:14px;
      font-family:'DM Sans',sans-serif;
      color:#0A2463;
      outline:none;
      transition:border-color .2s, background .3s;
    }
    .finp:focus{border-color:rgba(74,144,226,.6);box-shadow:0 0 0 3px rgba(74,144,226,.09)}
    .finp::placeholder{color:#8C8070}
    .finp.error{border-color:rgba(192,96,53,.55)!important;box-shadow:0 0 0 3px rgba(192,96,53,.08)!important}
    .dark .finp,
    :global([data-theme="dark"]) .finp{background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    .dark .finp::placeholder,
    :global([data-theme="dark"]) .finp::placeholder{color:#4A5568}
    .dark .finp:focus,
    :global([data-theme="dark"]) .finp:focus{border-color:rgba(74,144,226,.5);box-shadow:0 0 0 3px rgba(74,144,226,.12)}
    
    /* textarea */
    .ftxt{resize:vertical;min-height:96px}
    
    /* select wrapper */
    .fsel-wrap{position:relative}
    .fsel-wrap::after{content:'▾';position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .fsel-wrap::after,
    :global([data-theme="dark"]) .fsel-wrap::after{color:#6A7FA0}
    
    /* tab */
    .tab-btn{position:relative;padding:11px 4px;font-size:13px;font-weight:500;color:#8C8070;background:none;border:none;cursor:pointer;white-space:nowrap;font-family:'DM Sans',sans-serif;transition:color .2s}
    .tab-btn::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;border-radius:2px;background:transparent;transition:background .2s}
    .tab-btn.active{color:#0A2463}
    .dark .tab-btn.active,
    :global([data-theme="dark"]) .tab-btn.active{color:#E8EDF5}
    .tab-btn.active::after{background:#4A90E2}
    .tab-btn:hover:not(.active){color:#0A2463}
    .dark .tab-btn:hover:not(.active),
    :global([data-theme="dark"]) .tab-btn:hover:not(.active){color:#E8EDF5}
    
    /* password strength */
    .str-bar{height:4px;border-radius:2px;background:#EDE7DC;transition:background .3s,width .4s}
    .dark .str-bar,
    :global([data-theme="dark"]) .str-bar{background:rgba(255,255,255,.1)}
    .str-weak{background:#C06035!important}
    .str-fair{background:#D4AE3A!important}
    .str-strong{background:#4A7848!important}
    
    /* avatar upload */
    .avatar-ring{transition:box-shadow .2s}
    .avatar-ring:hover{box-shadow:0 0 0 3px rgba(74,144,226,.3)}
    
    /* toggle switch */
    .tog-track{width:40px;height:22px;border-radius:11px;background:#EDE7DC;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0}
    .dark .tog-track,
    :global([data-theme="dark"]) .tog-track{background:rgba(255,255,255,.12)}
    .tog-track.on{background:#4A7848}
    .dark .tog-track.on{background:#4A90E2}
    .tog-thumb{position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:white;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .25s cubic-bezier(.34,1.2,.64,1)}
    .tog-track.on .tog-thumb{transform:translateX(18px)}
    
    /* card */
    .pcard{background:#fff;border:1px solid #EDE7DC;border-radius:18px;overflow:hidden;transition:box-shadow .22s}
    .dark .pcard,
    :global([data-theme="dark"]) .pcard{background:#0D1422;border-color:rgba(255,255,255,.07)}
    
    /* section label */
    .slabel{font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#8C8070}
    .dark .slabel,
    :global([data-theme="dark"]) .slabel{color:#6A7FA0}
    
    /* danger zone */
    .danger-zone{border:1px solid rgba(192,96,53,.3);border-radius:14px;background:rgba(192,96,53,.04)}
    .dark .danger-zone,
    :global([data-theme="dark"]) .danger-zone{background:rgba(192,96,53,.07);border-color:rgba(192,96,53,.25)}
    
    /* pill badge */
    .pill{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:20px}
    
    /* toast */
    #gToast{transition:opacity .3s,transform .3s}
    
    /* unsaved indicator */
    .unsaved-dot{width:6px;height:6px;border-radius:50%;background:#D4AE3A;flex-shrink:0}
    
    /* file upload area */
    .file-drop{border:2px dashed #D8CEBC;border-radius:12px;transition:border-color .2s,background .2s}
    .dark .file-drop,
    :global([data-theme="dark"]) .file-drop{border-color:rgba(255,255,255,.1)}
    .file-drop:hover{border-color:#4A90E2;background:rgba(74,144,226,.04)}
    .dark .file-drop:hover,
    :global([data-theme="dark"]) .file-drop:hover{background:rgba(74,144,226,.06)}
    
    @media(max-width:640px){
      .hide-xs{display:none!important}
      .tab-scroll{overflow-x:auto;-webkit-overflow-scrolling:touch}
    }
</style>