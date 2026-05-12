<script lang="ts">
  import UserSidebar from "$lib/components/shared/UserSidebar.svelte";

  type TabType = 'Profile Information' | 'Change Password';
  
  let selectedTab = $state<TabType>('Profile Information');

    const switchTab = (tab: TabType) => selectedTab = tab;

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
     <div class="bg-white dark:bg-[#0D1422] border border-chalk-3 dark:border-white/[0.06] rounded-2xl p-5 mb-6 flex items-center gap-5 fu d1 shadow-[0_2px_16px_rgba(10,36,99,.06)] dark:shadow-none">
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
    .dark .str-seg{background:rgba(255,255,255,.08)}
    .str-weak .str-seg:nth-child(1){background:#DC2626}
    .str-medium .str-seg:nth-child(1),.str-medium .str-seg:nth-child(2){background:#D97706}
    .str-strong .str-seg:nth-child(1),.str-strong .str-seg:nth-child(2),.str-strong .str-seg:nth-child(3){background:#4A7848}
    
    /* toast */
    #toast{transform:translateY(20px);opacity:0;transition:all .32s cubic-bezier(.34,1,.56,1);pointer-events:none}
    #toast.show{transform:translateY(0);opacity:1}
    
    @media(max-width:640px){
      .hide-xs{display:none!important}
    }
</style>