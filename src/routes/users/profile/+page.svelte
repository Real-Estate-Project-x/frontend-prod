<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  type TabType = 'Profile Information' | 'Change Password';
  let selectedTab = $state<TabType>('Profile Information');
    let isPasswordVisible = $state(false);
    let password = $state('');
    let isNewPasswordVisible = $state(false);
    let newPassword = $state('');
    let pImageFile: HTMLInputElement;
    let previewUrl = $state<string | null>(null);

    const switchTab = (tab: TabType) => selectedTab = tab;

    const togglePasswordVisibility = () => isPasswordVisible = !isPasswordVisible;

    const toggleNewPasswordVisibility = () => isNewPasswordVisible = !isNewPasswordVisible;

    const handlePImageUpload = () => {
        const files = pImageFile?.files;
        if (!files || files.length === 0) return;

        const file = files[0];
        previewUrl = URL.createObjectURL(file);
    }

    const removePImage = () => {
        previewUrl = null;
        pImageFile.value = '';
    }

    ////
    type Strength = 'weak' | 'medium' | 'strong' | '';

	let passwordStrength = $state<Strength>('');
	let strengthLabel = $state('');
	let strengthColor = $state('');
	let showStrength = $state(false);

	let rules = $state({
		length: false,
		upper: false,
		number: false,
		symbol: false
	});

	const checkPasswordStrength = () => {
		const val = newPassword;

		if (!val) {
			showStrength = false;
			passwordStrength = '';
			strengthLabel = '';

			rules = {
				length: false,
				upper: false,
				number: false,
				symbol: false
			};

			return;
		}

		showStrength = true;

		const hasUpper = /[A-Z]/.test(val);
		const hasNum = /[0-9]/.test(val);
		const hasSym = /[^A-Za-z0-9]/.test(val);
		const long = val.length >= 8;

		rules = {
			length: long,
			upper: hasUpper,
			number: hasNum,
			symbol: hasSym
		};

		const score =
			(long ? 1 : 0) +
			(hasUpper ? 1 : 0) +
			(hasNum ? 1 : 0) +
			(hasSym ? 1 : 0);

		if (score <= 1) {
			passwordStrength = 'weak';
			strengthLabel = 'Weak';
			strengthColor = '#DC2626';
		} else if (score <= 3) {
			passwordStrength = 'medium';
			strengthLabel = 'Medium';
			strengthColor = '#D97706';
		} else {
			passwordStrength = 'strong';
			strengthLabel = 'Strong';
			strengthColor = '#4A7848';
		}
	};

</script>
<!-- ════════════════════════════════════════════════
     LAYOUT SHELL
════════════════════════════════════════════════ -->
<div class="flex pt-[68px] min-h-screen">
    <UserSidebar />

    <!-- ════════════════════ MAIN CONTENT ════════════════════ -->
    <main class="flex-1 min-w-0 px-[5vw] lg:px-10 py-8 max-w-[860px]">
        <!-- Page header -->
        <div class="mb-7 fu">
            <p class="text-[10px] font-medium tracking-[.16em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-1">Account Settings</p>
            <h1 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:clamp(26px,4vw,34px)">Your Profile</h1>
        </div>

        <!-- Avatar card -->
        <!-- <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-5 mb-6 flex items-center gap-5 fu d1 shadow-[0_2px_16px_rgba(10,36,99,.06)] dark:shadow-none">
            <div class="relative flex-shrink-0">
            <div class="w-16 h-16 rounded-full flex items-center justify-center text-[20px] font-semibold text-white ring-[3px] ring-blue-bright/20" style="background:linear-gradient(135deg,#1F3F6A,#4A90E2)">FA</div>
            <button aria-label="change avatar" class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-blue-bright flex items-center justify-center border-2 border-white dark:border-[#0D1422] cursor-pointer hover:bg-blue-link tt">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 10l1.5-4L9 1l2 2-5.5 5.5L2 10z" stroke="white" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            </div>
            <div>
            <div class="text-[15px] font-medium text-navy-dark dark:text-blue-100">Fatima Abubakar</div>
            <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">fatima.abubakar@email.com</div>
            <div class="flex items-center gap-1.5 mt-2">
                <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/20 dark:text-[#7DBF7A] px-2.5 py-[3px] rounded-full">Buyer account</span>
                <span class="text-[10px] font-medium bg-blue-bright/10 text-blue-link dark:text-blue-bright px-2.5 py-[3px] rounded-full">Verified ✓</span>
            </div>
            </div>
        </div> -->

        <!-- Avatar card -->
        <div class="pcard fu d1 mb-10">
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
                  class="avatar-ring w-20 h-20 rounded-full bg-navy-strong flex items-center justify-center text-[24px] font-medium text-white ring-2 ring-blue-bright/20"></div>
                {:else}
                <div id="avatarCircle" class="avatar-ring w-20 h-20 rounded-full bg-navy-strong flex items-center justify-center text-[24px] font-medium text-white ring-2 ring-blue-bright/20">FO</div>
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
                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-1">Fatima O</div>
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

        <!-- Tabs -->
        <div class="fu d2">
            <div class="flex gap-0 border-b border-chalk-3 dark:border-white/[0.08] mb-7">
            <button id="tab-profile" 
                    onclick={() => switchTab('Profile Information')} 
                    class={`tab-btn ${selectedTab === 'Profile Information' ? 'active' : ''} text-[13px] font-medium px-5 py-3 bg-transparent border-none cursor-pointer text-chalk-muted dark:text-[#6A7FA0]`}>
                    Profile Information
                </button>
                <button id="tab-password" 
                    onclick={() => switchTab('Change Password')} 
                    class={`tab-btn  ${selectedTab === 'Change Password' ? 'active' : ''} text-[13px] font-medium px-5 py-3 bg-transparent border-none cursor-pointer text-chalk-muted dark:text-[#6A7FA0]`}>
                    Change Password
                </button>
            </div>

            {#if selectedTab === 'Profile Information'}
            <!-- ── TAB: Profile Information ── -->
            <div id="panel-profile">
                <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-6 shadow-[0_2px_16px_rgba(10,36,99,.06)] dark:shadow-none">
                <div class="mb-5">
                    <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Personal Details</p>
                    <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:20px">Update your information</h2>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <!-- First Name -->
                    <div>
                    <label for="firstName" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">First Name</label>
                    <input id="firstName" type="text" value="Fatima"
                        class="bp-input w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                    </div>
                    <!-- Last Name -->
                    <div>
                    <label for="lastName" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Last Name</label>
                    <input id="lastName" type="text" value="Abubakar"
                        class="bp-input w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                    </div>
                </div>

                <!-- Email -->
                <div class="mb-4">
                    <label for="email" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Email Address</label>
                    <div class="relative">
                    <input id="email" type="email" value="fatima.abubakar@email.com"
                        class="bp-input w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] pr-12 text-[13px] text-navy-dark dark:text-blue-100 outline-none tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                    <span class="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-medium text-sage bg-sage-light dark:bg-sage/20 dark:text-[#7DBF7A] px-2 py-[2px] rounded-full">✓</span>
                    </div>
                    <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5">Your email is verified. Contact support to change it.</p>
                </div>

                <!-- Phone -->
                <div class="mb-6">
                    <label for="phone" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Phone Number</label>
                    <div class="flex gap-2">
                    <div class="relative flex-shrink-0">
                        <select class="bp-input bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl pl-3 pr-7 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt cursor-pointer">
                        <option>🇳🇬 +234</option>
                        <option>🇬🇧 +44</option>
                        <option>🇺🇸 +1</option>
                        </select>
                        <svg class="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-chalk-muted" width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                    </div>
                    <input id="phone" type="tel" placeholder="e.g. 08012345678"
                        class="bp-input flex-1 min-w-0 bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] text-[13px] text-navy-dark dark:text-blue-100 outline-none tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                    </div>
                    <p class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-1.5 flex items-center gap-1">
                    <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.2"/><path d="M7 6v4M7 4.5h.01" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
                    Adding your number unlocks additional features and faster support.
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-chalk-3 dark:border-white/[0.07]">
                    <button class="flex-1 sm:flex-none text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-[11px] px-8 rounded-full border-none cursor-pointer tt">Save changes</button>
                    <button class="flex-1 sm:flex-none text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 py-[11px] px-6 rounded-full cursor-pointer tt">Cancel</button>
                </div>
                </div>
            </div>
            {/if}

            {#if selectedTab === "Change Password"}
            <!-- ── TAB: Change Password ── -->
            <div id="panel-password">
                <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-6 shadow-[0_2px_16px_rgba(10,36,99,.06)] dark:shadow-none">
                <div class="mb-5">
                    <p class="text-[10px] font-medium tracking-[.14em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-0.5">Security</p>
                    <h2 class="font-display font-light text-navy-dark dark:text-blue-100" style="font-size:20px">Update your password</h2>
                </div>

                <!-- Old Password -->
                <div class="mb-4">
                    <label for="oldPass" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">Current Password</label>
                    <div class="relative">
                    <input id="oldPass" type={ isPasswordVisible ? 'text' : 'password' } bind:value={password} placeholder="Enter your current password"
                        class="bp-input w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] pr-12 text-[13px] text-navy-dark dark:text-blue-100 outline-none tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                    <button aria-label="Toggle Password visibility" onclick={togglePasswordVisibility} class="absolute right-4 top-1/2 -translate-y-1/2 text-chalk-muted hover:text-navy-dark dark:hover:text-blue-100 tt bg-transparent border-none cursor-pointer p-0">
                        <svg id="eyeOld" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.4"/></svg>
                    </button>
                    </div>
                </div>

                <!-- New Password -->
                <div class="mb-4">
                    <label for="newPass" class="text-[11px] font-medium tracking-[.08em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-2 block">New Password</label>
                    <div class="relative">
                    <input id="newPass" type={ isNewPasswordVisible ? 'text' : 'password' } bind:value={newPassword} placeholder="Create a strong password" oninput={checkPasswordStrength}
                        class="bp-input w-full bg-chalk-2 dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.08] rounded-xl px-4 py-[11px] pr-12 text-[13px] text-navy-dark dark:text-blue-100 outline-none tt placeholder-chalk-muted dark:placeholder-[#6A7FA0]">
                    <button aria-label="Toggle New Password visibility" onclick={toggleNewPasswordVisibility} class="absolute right-4 top-1/2 -translate-y-1/2 text-chalk-muted hover:text-navy-dark dark:hover:text-blue-100 tt bg-transparent border-none cursor-none p-0 cursor-pointer">
                        <svg id="eyeNew" width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M2 10s3-6 8-6 8 6 8 6-3 6-8 6-8-6-8-6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="10" r="2.5" stroke="currentColor" stroke-width="1.4"/></svg>
                    </button>
                    </div>

                    <!-- Strength indicator -->
                    {#if showStrength}
                    <div id="strengthWrap" class="mt-3">
                        <div
                            id="strengthBar"
                            class={`flex gap-1.5 mb-2 ${
                                passwordStrength === 'weak'
                                    ? 'str-weak'
                                    : passwordStrength === 'medium'
                                    ? 'str-medium'
                                    : passwordStrength === 'strong'
                                    ? 'str-strong'
                                    : ''
                            }`}
                        >
                            <div class="str-seg flex-1 rounded-full"></div>
                            <div class="str-seg flex-1 rounded-full"></div>
                            <div class="str-seg flex-1 rounded-full"></div>
                        </div>

                        <div class="flex items-center justify-between">
                            <span
                                id="strengthLabel"
                                class="text-[11px] font-medium"
                                style={`color:${strengthColor}`}
                            >
                                {strengthLabel}
                            </span>

                            <div
                                id="strengthHints"
                                class="text-[10px] text-chalk-muted dark:text-[#6A7FA0]"
                            >
                                {newPassword.length}/8+
                            </div>
                        </div>
                    </div>
                    {/if}
                </div>

                <!-- Password rules -->
                <div class="bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 mb-6 tt">
                    <p class="text-[11px] font-medium text-navy-dark dark:text-blue-100 mb-2">Password must contain:</p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    <div
                        class={`flex items-center gap-2 text-[11px] ${
                            rules.length
                                ? 'text-sage dark:text-[#7DBF7A]'
                                : 'text-chalk-muted dark:text-[#6A7FA0]'
                        }`}
                    >
                        <span
                            class={`rule-dot w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                                rules.length
                                    ? 'bg-sage'
                                    : 'bg-chalk-4 dark:bg-white/20'
                            }`}
                        ></span>
                        At least 8 characters
                    </div>
                    <div
                    class={`flex items-center gap-2 text-[11px] ${
                        rules.upper
                            ? 'text-sage dark:text-[#7DBF7A]'
                            : 'text-chalk-muted dark:text-[#6A7FA0]'
                    }`}
                >
                    <span
                        class={`rule-dot w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            rules.upper
                                ? 'bg-sage'
                                : 'bg-chalk-4 dark:bg-white/20'
                        }`}
                    ></span>
                    One uppercase letter
                </div>
                <div
                    class={`flex items-center gap-2 text-[11px] ${
                        rules.number
                            ? 'text-sage dark:text-[#7DBF7A]'
                            : 'text-chalk-muted dark:text-[#6A7FA0]'
                    }`}
                >
                    <span
                        class={`rule-dot w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            rules.number
                                ? 'bg-sage'
                                : 'bg-chalk-4 dark:bg-white/20'
                        }`}
                    ></span>
                    One number
                </div>
                <div
                    class={`flex items-center gap-2 text-[11px] ${
                        rules.symbol
                            ? 'text-sage dark:text-[#7DBF7A]'
                            : 'text-chalk-muted dark:text-[#6A7FA0]'
                    }`}
                >
                    <span
                        class={`rule-dot w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                            rules.symbol
                                ? 'bg-sage'
                                : 'bg-chalk-4 dark:bg-white/20'
                        }`}
                    ></span>
                    One special character
                </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-chalk-3 dark:border-white/[0.07]">
                    <button class="flex-1 sm:flex-none text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 py-[11px] px-8 rounded-full border-none cursor-pointer tt">Update password</button>
                    <button class="flex-1 sm:flex-none text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.05] border border-chalk-3 dark:border-white/[.08] hover:bg-chalk-3 dark:hover:bg-white/10 py-[11px] px-6 rounded-full cursor-pointer tt">Cancel</button>
                </div>
                </div>

                <!-- Security tip -->
                <div class="mt-4 bg-blue-bright/[.06] dark:bg-blue-bright/[.08] border border-blue-bright/20 rounded-xl px-5 py-4 flex gap-3 items-start">
                <svg class="flex-shrink-0 mt-0.5 text-blue-bright" width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 2L4 5v5c0 4 2.5 7.5 6 9 3.5-1.5 6-5 6-9V5l-6-3z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/><path d="M7.5 10l2 2 3-3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                <p class="text-[12px] text-navy-accent dark:text-[#8DAACC] leading-[1.6]">For your security, we'll send a confirmation to your email after any password change. Never share your password with anyone, including Blupodd support.</p>
                </div>
            </div>
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
    @keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .52s ease both}
    .d1{animation-delay:.04s}.d2{animation-delay:.09s}.d3{animation-delay:.14s}
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}
    @keyframes spinRing{from{stroke-dashoffset:251}to{stroke-dashoffset:63}}
    .ring-anim{animation:spinRing 1.4s cubic-bezier(.34,1,.64,1) .4s both}
    
    /* sidebar */
    .sb-link.active{background:rgba(74,144,226,.12);color:#4A90E2;font-weight:500}
    .dark .sb-link.active,
    :global([data-theme="dark"]) .sb-link.active {background:rgba(74,144,226,.15)}
    .sb-link:not(.active):hover{background:rgba(10,36,99,.05)}
    .dark .sb-link:not(.active):hover,
    :global([data-theme="dark"]) .sb-link:not(.active):hover {background:rgba(255,255,255,.04)}
    #sbOverlay{opacity:0;pointer-events:none;transition:opacity .3s}
    #sbOverlay.open{opacity:1;pointer-events:all}
    #dashSb{transition:transform .3s cubic-bezier(.4,0,.2,1)}
    
    /* tabs */
    .tab-btn{position:relative;transition:color .2s}
    .tab-btn::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:2px;background:#4A90E2;border-radius:2px;transform:scaleX(0);transition:transform .22s cubic-bezier(.4,0,.2,1)}
    .tab-btn.active{color:#0A2463}
    .dark .tab-btn.active,
    :global([data-theme="dark"]) .tab-btn.active{color:#4A90E2}
    .tab-btn.active::after{transform:scaleX(1)}
    
    /* input focus */
    .bp-input:focus{border-color:#1A6ADE;box-shadow:0 0 0 3px rgba(74,144,226,.12)}
    .dark .bp-input:focus,
    :global([data-theme="dark"]) .bp-input:focus {border-color:#4A90E2;box-shadow:0 0 0 3px rgba(74,144,226,.15)}
    
    /* strength bar */
    .str-seg{height:4px;border-radius:9px;background:#EDE7DC;transition:background .3s}
    .dark .str-seg,
    :global([data-theme="dark"]) .str-seg {background:rgba(255,255,255,.08)}
    .str-weak .str-seg:nth-child(1){background:#DC2626}
    .str-medium .str-seg:nth-child(1),.str-medium .str-seg:nth-child(2){background:#D97706}
    .str-strong .str-seg:nth-child(1),.str-strong .str-seg:nth-child(2),.str-strong .str-seg:nth-child(3){background:#4A7848}
    
    /* toast */
    #toast{transform:translateY(20px);opacity:0;transition:all .32s cubic-bezier(.34,1,.56,1);pointer-events:none}
    #toast.show{transform:translateY(0);opacity:1}

    /* card */
    .pcard{background:#fff;border:1px solid #EDE7DC;border-radius:18px;overflow:hidden;transition:box-shadow .22s}
    .dark .pcard,
    :global([data-theme="dark"]) .pcard{background:#0D1422;border-color:rgba(255,255,255,.07)}
    
    
    @media(max-width:640px){
      .hide-xs{display:none!important}
    }
</style>