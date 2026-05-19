<script lang="ts">
    import { onMount } from 'svelte';
    import { themeStore } from '$lib/stores/theme.svelte';
    import '../app.css';

    // Restore theme from localStorage on first client render
	  onMount(() => themeStore.init());
  </script>
  
  <svelte:head>
    <title>Blupodd — Find Your Place</title>
    <meta name="description" content="Search smarter. View instantly. Connect with agents who know your market." />
  </svelte:head>

    <!-- ══════════════════════════════════════
     MAIN CONTENT
    ══════════════════════════════════════════ -->
    <main class="flex-1 flex flex-col items-center justify-center pt-[58px] px-5 py-16 sm:py-24">
        <div class="w-full max-w-[680px] mx-auto text-center">
    
        <!-- ── GHOST 404 NUMBER (background layer) ── -->
        <div class="relative select-none mb-[-24px] sm:mb-[-40px] fu d1">
            <div class="num-404 text-center pointer-events-none" aria-hidden="true">404</div>
        </div>
    
        <!-- ── HERO SVG ILLUSTRATION ── -->
        <!-- A premium, minimal SVG: a house with a floating location pin,
            set against an architectural grid. Clean, editorial, on-brand. -->
        <div class="relative w-full max-w-[340px] mx-auto mb-8 fu d2" aria-hidden="true">
    
            <!-- Ground shadow ellipse -->
            <svg class="absolute bottom-0 left-1/2 -translate-x-1/2 pulse-shadow" width="200" height="22" viewBox="0 0 200 22" fill="none">
            <ellipse cx="100" cy="11" rx="90" ry="8" fill="#0A2463" opacity=".12"/>
            </svg>
            <svg class="absolute bottom-0 left-1/2 -translate-x-1/2 pulse-shadow dark:opacity-0" width="200" height="22" viewBox="0 0 200 22" fill="none">
            <ellipse cx="100" cy="11" rx="90" ry="8" fill="#EDE7DC"/>
            </svg>
    
            <!-- House SVG — floating -->
            <svg class="float relative z-10 w-full max-w-[340px] mx-auto" viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg">
    
            <!-- Background grid (architectural paper feel) -->
            <defs>
                <pattern id="grid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
                <path d="M 28 0 L 0 0 0 28" fill="none" stroke="currentColor" stroke-width=".5" opacity=".18"/>
                </pattern>
                <mask id="gridMask">
                <ellipse cx="170" cy="200" rx="155" ry="90" fill="white"/>
                </mask>
                <linearGradient id="roofGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#0A2463"/>
                <stop offset="100%" stop-color="#1F3F6A"/>
                </linearGradient>
                <linearGradient id="roofGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#4A90E2" stop-opacity=".9"/>
                <stop offset="100%" stop-color="#1A6ADE" stop-opacity=".7"/>
                </linearGradient>
                <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FEFCF8"/>
                <stop offset="100%" stop-color="#F7F3EC"/>
                </linearGradient>
                <linearGradient id="wallGradDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#131C2E"/>
                <stop offset="100%" stop-color="#0D1422"/>
                </linearGradient>
                <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0A2463" flood-opacity=".14"/>
                </filter>
                <filter id="softShadowDark" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="8" stdDeviation="14" flood-color="#000" flood-opacity=".45"/>
                </filter>
            </defs>
    
            <!-- Architectural grid bg -->
            <rect width="340" height="280" fill="url(#grid)" class="text-navy-dark dark:text-blue-bright" mask="url(#gridMask)"/>
    
            <!-- ── MAIN HOUSE ── -->
            <g filter="url(#softShadow)" class="dark:hidden">
                <!-- Wall body -->
                <rect x="82" y="138" width="176" height="112" rx="4" fill="url(#wallGrad)" stroke="#EDE7DC" stroke-width="1.5"/>
                <!-- Roof -->
                <path d="M70 142L170 78L270 142Z" fill="url(#roofGrad)" stroke="#0A2463" stroke-width="1.5" stroke-linejoin="round"/>
                <!-- Roof ridge tile cap -->
                <path d="M158 90L170 83L182 90" stroke="#4A90E2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" opacity=".6"/>
                <!-- Chimney -->
                <rect x="215" y="90" width="18" height="38" rx="3" fill="#1F3F6A"/>
                <rect x="213" y="87" width="22" height="8" rx="2" fill="#0A2463"/>
                <!-- Door -->
                <rect x="150" y="188" width="40" height="62" rx="4" fill="#EDE7DC"/>
                <rect x="154" y="192" width="32" height="54" rx="3" fill="#D8CEBC"/>
                <!-- Door handle -->
                <circle cx="178" cy="222" r="3" fill="#C06035"/>
                <!-- Door arch detail -->
                <path d="M154 214a16 16 0 0132 0" stroke="#C8B89A" stroke-width="1" fill="none"/>
                <!-- Window left -->
                <rect x="98" y="162" width="44" height="40" rx="3" fill="rgba(74,144,226,.18)" stroke="#D8CEBC" stroke-width="1.5"/>
                <line x1="120" y1="162" x2="120" y2="202" stroke="#D8CEBC" stroke-width="1"/>
                <line x1="98" y1="182" x2="142" y2="182" stroke="#D8CEBC" stroke-width="1"/>
                <!-- Window right -->
                <rect x="198" y="162" width="44" height="40" rx="3" fill="rgba(74,144,226,.18)" stroke="#D8CEBC" stroke-width="1.5"/>
                <line x1="220" y1="162" x2="220" y2="202" stroke="#D8CEBC" stroke-width="1"/>
                <line x1="198" y1="182" x2="242" y2="182" stroke="#D8CEBC" stroke-width="1"/>
                <!-- Attic window (small, centred) -->
                <rect x="155" y="112" width="30" height="22" rx="3" fill="rgba(74,144,226,.22)" stroke="#4A70A0" stroke-width="1.5"/>
                <line x1="170" y1="112" x2="170" y2="134" stroke="#4A70A0" stroke-width="1"/>
            </g>
    
            <!-- DARK MODE HOUSE variant -->
            <g filter="url(#softShadowDark)" class="hidden dark:block">
                <rect x="82" y="138" width="176" height="112" rx="4" fill="url(#wallGradDark)" stroke="rgba(255,255,255,.07)" stroke-width="1.5"/>
                <path d="M70 142L170 78L270 142Z" fill="url(#roofGradDark)" stroke="rgba(74,144,226,.5)" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M158 90L170 83L182 90" stroke="rgba(255,255,255,.4)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <rect x="215" y="90" width="18" height="38" rx="3" fill="#0A2463"/>
                <rect x="213" y="87" width="22" height="8" rx="2" fill="#060E1C"/>
                <rect x="150" y="188" width="40" height="62" rx="4" fill="#1A2438"/>
                <rect x="154" y="192" width="32" height="54" rx="3" fill="#131C2E"/>
                <circle cx="178" cy="222" r="3" fill="#4A90E2"/>
                <path d="M154 214a16 16 0 0132 0" stroke="rgba(255,255,255,.08)" stroke-width="1" fill="none"/>
                <rect x="98" y="162" width="44" height="40" rx="3" fill="rgba(74,144,226,.15)" stroke="rgba(255,255,255,.08)" stroke-width="1.5"/>
                <line x1="120" y1="162" x2="120" y2="202" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
                <line x1="98" y1="182" x2="142" y2="182" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
                <rect x="198" y="162" width="44" height="40" rx="3" fill="rgba(74,144,226,.15)" stroke="rgba(255,255,255,.08)" stroke-width="1.5"/>
                <line x1="220" y1="162" x2="220" y2="202" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
                <line x1="198" y1="182" x2="242" y2="182" stroke="rgba(255,255,255,.07)" stroke-width="1"/>
                <rect x="155" y="112" width="30" height="22" rx="3" fill="rgba(74,144,226,.2)" stroke="rgba(74,144,226,.35)" stroke-width="1.5"/>
                <line x1="170" y1="112" x2="170" y2="134" stroke="rgba(74,144,226,.3)" stroke-width="1"/>
            </g>
    
            <!-- ── FLOATING LOCATION PIN — drifts separately ── -->
            <!-- Wrapping group gets its own animation offset -->
            <g class="drift-pin" style="transform-origin:280px 60px">
                <!-- Pin body -->
                <circle cx="285" cy="55" r="22" fill="#C06035" opacity=".9"/>
                <!-- Pin question mark for the "not found" metaphor, subtle -->
                <path d="M280 48c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2-1.5 3.5-3.5 4.5V55" stroke="white" stroke-width="2.2" stroke-linecap="round" fill="none"/>
                <circle cx="285" cy="58.5" r="1.5" fill="white"/>
                <!-- Pin tail -->
                <path d="M285 77L285 92" stroke="#C06035" stroke-width="3" stroke-linecap="round" opacity=".7"/>
                <ellipse cx="285" cy="94" rx="5" ry="2.5" fill="#C06035" opacity=".25"/>
                <!-- Pin ring (subtle depth) -->
                <circle cx="285" cy="55" r="22" fill="none" stroke="white" stroke-width="1" opacity=".2"/>
            </g>
    
            <!-- ── SMALL DECORATIVE TREES (flanking) ── -->
            <!-- Left tree -->
            <g opacity=".5">
                <rect x="52" y="218" width="6" height="32" rx="3" fill="#8C8070" class="dark:fill-[#2A3550]"/>
                <ellipse cx="55" cy="210" rx="16" ry="20" fill="#4A7848" opacity=".75"/>
                <ellipse cx="55" cy="205" rx="11" ry="15" fill="#4A7848"/>
            </g>
            <!-- Right tree -->
            <g opacity=".4">
                <rect x="280" y="222" width="5" height="28" rx="2.5" fill="#8C8070" class="dark:fill-[#2A3550]"/>
                <ellipse cx="282" cy="215" rx="13" ry="17" fill="#4A7848" opacity=".7"/>
                <ellipse cx="282" cy="210" rx="9" ry="12" fill="#4A7848"/>
            </g>
    
            <!-- ── GROUND LINE ── -->
            <line x1="40" y1="250" x2="300" y2="250" stroke="#EDE7DC" stroke-width="1.5" stroke-linecap="round" class="dark:stroke-white/[.07]"/>
            <!-- Path/walkway -->
            <path d="M165 250 L155 280 M175 250 L185 280" stroke="#D8CEBC" stroke-width="1" stroke-linecap="round" class="dark:stroke-white/[.05]"/>
    
            </svg>
        </div><!-- /illustration -->
    
        <!-- ── HEADLINE ── -->
        <div class="mb-5 fu d3">
            <p class="text-[10px] font-medium tracking-[.22em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">
            Page not found
            </p>
            <h1 class="font-display font-light text-navy-dark dark:text-blue-100 leading-[1.1]" style="font-size:clamp(28px,5vw,46px)">
            This address doesn't<br>
            <em class="italic" style="color:#4A90E2">exist on our map.</em>
            </h1>
        </div>
    
        <!-- ── SUPPORTING COPY ── -->
        <p class="text-[14px] sm:text-[15px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.8] max-w-[440px] mx-auto mb-9 fu d4">
            The page you're looking for may have moved, been taken down, or never existed.
            Thousands of verified listings are still waiting to be discovered.
        </p>
    
        <!-- ── CTAs ── -->
        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 fu d4">
            <a href="/site/properties" class="btn-primary w-full sm:w-auto justify-center">
            <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                <path d="M3 9L9 3l6 6v7a1 1 0 01-1 1H4a1 1 0 01-1-1V9z" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
                <path d="M6.5 17V10h5v7" stroke="white" stroke-width="1.5" stroke-linejoin="round"/>
            </svg>
            Browse properties
            </a>
            <a href="/" class="btn-ghost w-full sm:w-auto justify-center">
            Return home
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M5 2l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            </a>
        </div>
    
        <!-- ── TRUST STRIP ── -->
        <div class="flex items-center justify-center gap-4 sm:gap-7 flex-wrap fu d5">
            <div class="trust-item">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M8 1l1.8 3.6 4 .58-2.9 2.83.68 3.99L8 10.27l-3.58 1.74.68-4L2.2 5.18l4-.58z" stroke="#4A7848" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
            Verified listings
            </div>
            <div class="w-px h-3 bg-chalk-3 dark:bg-white/[.08] hidden sm:block"></div>
            <div class="trust-item">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <circle cx="8" cy="7" r="3" stroke="#4A90E2" stroke-width="1.3"/>
                <path d="M8 10C5.24 10 3 11.34 3 13h10c0-1.66-2.24-3-5-3z" stroke="#4A90E2" stroke-width="1.3" stroke-linecap="round"/>
            </svg>
            Trusted agents
            </div>
            <div class="w-px h-3 bg-chalk-3 dark:bg-white/[.08] hidden sm:block"></div>
            <div class="trust-item">
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <rect x="1" y="5" width="10" height="8" rx="1.5" stroke="#C06035" stroke-width="1.3"/>
                <path d="M15 7l-4 2 4 2V7z" stroke="#C06035" stroke-width="1.3" stroke-linejoin="round"/>
            </svg>
            Virtual viewings
            </div>
        </div>
    
        </div>
    </main>

<style>
    /* ── Core tokens — identical to every Blupodd page ── */
    .tt{transition:background-color .3s,color .3s,border-color .3s}
    
    /* Animations */
    @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
    .fu{animation:fadeUp .65s cubic-bezier(.22,.68,0,1) both}
    .d1{animation-delay:.08s}
    .d2{animation-delay:.18s}
    .d3{animation-delay:.28s}
    .d4{animation-delay:.38s}
    .d5{animation-delay:.48s}
    
    @keyframes floatHouse{
      0%,100%{transform:translateY(0)}
      50%{transform:translateY(-10px)}
    }
    .float{animation:floatHouse 4.5s ease-in-out infinite}
    
    @keyframes driftPin{
      0%,100%{transform:translateY(0) rotate(-8deg)}
      50%{transform:translateY(-6px) rotate(-8deg)}
    }
    .drift-pin{animation:driftPin 3.2s ease-in-out infinite}
    
    @keyframes pulseShadow{
      0%,100%{opacity:.25;transform:scaleX(1)}
      50%{opacity:.1;transform:scaleX(.82)}
    }
    .pulse-shadow{animation:pulseShadow 4.5s ease-in-out infinite;transform-origin:center}
    
    @keyframes shimmer{
      0%{opacity:.6}50%{opacity:1}100%{opacity:.6}
    }
    .shimmer{animation:shimmer 3s ease-in-out infinite}
    
    /* Number treatment */
    .num-404{
      font-family:'Cormorant Garamond',serif;
      font-weight:300;
      font-size:clamp(100px,22vw,200px);
      line-height:1;
      letter-spacing:-.03em;
      background:linear-gradient(135deg,#D8CEBC 0%,#EDE7DC 50%,#D8CEBC 100%);
      -webkit-background-clip:text;
      -webkit-text-fill-color:transparent;
      background-clip:text;
      user-select:none;
      position:relative;
    }
    .dark .num-404{
      background:linear-gradient(135deg,rgba(255,255,255,.12) 0%,rgba(255,255,255,.06) 50%,rgba(255,255,255,.1) 100%);
      -webkit-background-clip:text;
      background-clip:text;
    }
    
    /* Nav */
    nav a,.nav-wordmark{text-decoration:none}
    
    /* Buttons */
    .btn-primary{
      display:inline-flex;align-items:center;gap:9px;
      background:#C06035;color:#fff;
      font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;letter-spacing:.03em;
      padding:14px 30px;border-radius:40px;border:none;cursor:pointer;
      transition:background .2s,transform .18s,box-shadow .2s;
      text-decoration:none;
    }
    .btn-primary:hover{background:#a04e28;transform:translateY(-1px);box-shadow:0 12px 36px rgba(192,96,53,.32)}
    .btn-primary:active{transform:translateY(0)}
    
    .btn-ghost{
      display:inline-flex;align-items:center;gap:8px;
      background:transparent;color:#8C8070;
      font-family:'DM Sans',sans-serif;font-size:13px;font-weight:400;
      padding:13px 28px;border-radius:40px;
      border:1.5px solid #D8CEBC;cursor:pointer;
      transition:border-color .2s,color .2s,transform .18s;
      text-decoration:none;
    }
    .btn-ghost:hover{border-color:#0A2463;color:#0A2463;transform:translateY(-1px)}
    .dark .btn-ghost{border-color:rgba(255,255,255,.12);color:#6A7FA0}
    .dark .btn-ghost:hover{border-color:rgba(74,144,226,.55);color:#E8EDF5}
    
    /* Trust strip */
    .trust-item{
      display:flex;align-items:center;gap:6px;
      font-family:'DM Sans',sans-serif;font-size:12px;font-weight:400;
      color:#8C8070;white-space:nowrap;
    }
    .dark .trust-item{color:#6A7FA0}
    
    /* Toggle */
    #dmToggle span{transition:transform .3s}
    
    /* SVG scene elements */
    .scene-window{transition:opacity .4s}
</style>