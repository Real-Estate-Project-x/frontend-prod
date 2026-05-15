<script lang="ts">
  import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";
  type TabType = 'personal profile' | 'agency info' | 'change password';

  let selectedTab = $state<TabType>('personal profile');

    const switchTab = (value: TabType) => selectedTab = value;

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