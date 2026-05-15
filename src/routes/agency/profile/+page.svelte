<script lang="ts">
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";
  type TabType = 'personal profile' | 'agency info' | 'change password';

  let selectedTab = $state<TabType>('personal profile');
  let pImageFile: HTMLInputElement;
  let previewUrl = $state<string | null>(null);

    const switchTab = (value: TabType) => selectedTab = value;

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

</script>


<!-- ══ LAYOUT ══ -->
<div class="flex pt-[68px] min-h-screen">
    <AgencySidebar />

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
    <div id="panel-agency" class="tab-panel hidden space-y-5 fu d1">

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