<section class="hero-section">

    <!-- Ambient glow -->
    <div class="hero-glow-left"></div>
  
    <!-- Fine decorative arc rings (behind everything) -->
    <div style="position:absolute;top:50%;left:20%;transform:translate(-50%,-50%);width:700px;height:700px;pointer-events:none;z-index:0;">
      <div class="hero-arc-ring" style="width:240px;height:240px;border-color:rgba(74,144,226,0.10);"></div>
      <div class="hero-arc-ring" style="width:420px;height:420px;border-color:rgba(74,144,226,0.06);"></div>
      <div class="hero-arc-ring" style="width:620px;height:620px;border-color:rgba(74,144,226,0.04);"></div>
    </div>
  
    <!-- ── Body row: left text + right visual ── -->
    <div class="hero-body">
  
      <!-- ══ LEFT COLUMN ══ -->
      <div class="hero-left">
  
        <!-- Trust badge -->
        <div class="animate-fadeUp mb-6">
          <span class="trust-badge">
            <span class="trust-dot"></span>
            Home hunting, re-imagined
          </span>
        </div>
  
        <!-- Headline -->
        <h1 class="animate-fadeUp2 font-display text-[clamp(38px,5.5vw,78px)] font-light leading-[1.05] text-chalk mb-5">
          Find your place.<br><em class="italic text-blue-bright">Seamlessly.</em>
        </h1>
  
        <!-- Subtitle -->
        <p class="animate-fadeUp3 text-[15px] font-light leading-[1.75] text-white/55 max-w-[460px] mb-8">
          Search smarter. View instantly. Connect with agents who know your market — all in one place.
        </p>

  
       <!-- ── Search bar (v2 design) ── -->
      <div class="animate-fadeUp4 mb-5 max-w-[540px] w-full">
        <!-- Micro-label -->
        <p class="text-11px font-medium tracking-em-010 uppercase text-white/35 mb-3">Find your next home</p>

        <div class="hero-search-wrap">
          <div class="hero-search-inner flex items-center gap-3">
            <!-- Location -->
            <div class="search-input-group flex items-center gap-2 flex-1 min-w-0 search-row" style="min-width:150px;">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" class="flex-shrink-0" style="opacity:0.38;">
                <path d="M8 1.5A4.5 4.5 0 0 1 12.5 6c0 3-4.5 8.5-4.5 8.5S3.5 9 3.5 6A4.5 4.5 0 0 1 8 1.5Z" stroke="white" stroke-width="1.4"/>
                <circle cx="8" cy="6" r="1.5" fill="white" opacity="0.6"/>
              </svg>
              <input type="text" class="search-input" placeholder="City, neighbourhood, or postcode…" style="font-size:14px;padding:10px 0;">
            </div>

            <div class="hero-search-divider search-divider-h w-px h-5 bg-white/15 flex-shrink-0"></div>

            <select class="hero-search-select search-select search-row" style="padding:10px 4px;">
              <option>Buy</option>
              <option>Rent</option>
            </select>

            <div class="hero-search-divider search-divider-h w-px h-5 bg-white/15 flex-shrink-0"></div>

            <select class="hero-search-select search-select search-row" style="padding:10px 4px;">
              <option>Any beds</option>
              <option>1 bed</option>
              <option>2 beds</option>
              <option>3+ beds</option>
            </select>

            <!-- CTA -->
            <button class="hero-search-btn search-btn bg-ember hover:bg-[#a04e28] text-white font-sans text-13px font-medium tracking-[0.04em] px-7 py-[13px] rounded-[14px] border-none cursor-pointer whitespace-nowrap transition-all duration-200 hover:scale-[1.02] flex-shrink-0 flex items-center gap-2"
              style="box-shadow:0 4px 20px rgba(192,96,53,0.4);">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="white" stroke-width="1.5"/>
                <path d="M11 11l3 3" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>

  
        <!-- Quick search tags -->
        <div class="animate-fadeUp5 flex gap-2 flex-wrap mt-4">
          <span class="search-tag">Lagos Island</span>
          <span class="search-tag">Port Harcourt GRA</span>
          <span class="search-tag">Lekki Phase 1</span>
          <span class="search-tag">Abuja Maitama</span>
          <span class="search-tag">Victoria Island</span>
        </div>
  
        <!-- Trust indicators -->
        <div class="hero-trust-row animate-fadeUp5">
          <div class="hero-trust-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1L8.08 4.22l3.56.52-2.57 2.5.6 3.56L6.5 9.77 3.33 11.8l.6-3.56L1.36 5.74l3.56-.52L6.5 1z" fill="currentColor" opacity="0.8"/>
            </svg>
            Verified listings
          </div>
          <div class="hero-trust-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M6.5 1.5L7.5 5H11l-2.8 2.1 1.1 3.4L6.5 8.5l-2.8 2.1L4.8 7.1 2 5h3.5L6.5 1.5z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            380+ trusted agents
          </div>
          <div class="hero-trust-item">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1.5" y="1.5" width="10" height="10" rx="2" stroke="currentColor" stroke-width="1.2"/>
              <path d="M4 6.5l2 2 3-3" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            No hidden fees
          </div>
        </div>
  
      </div><!-- /hero-left -->
  
      <!-- ══ RIGHT COLUMN — Property illustration ══ -->
      <div class="hero-right">
        <div class="hero-illustration">
  
          <!-- SVG: African neighbourhood scene -->
          <svg viewBox="0 0 520 680" xmlns="http://www.w3.org/2000/svg"
            style="width:100%;height:100%;display:block;">
  
            <!-- Sky gradient -->
            <defs>
              <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stop-color="#071020"/>
                <stop offset="55%"  stop-color="#0D1E38"/>
                <stop offset="100%" stop-color="#142640"/>
              </linearGradient>
              <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#0C1A2E"/>
                <stop offset="100%" stop-color="#060E1C"/>
              </linearGradient>
              <linearGradient id="bldgA" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#1A3358"/>
                <stop offset="100%" stop-color="#0E2040"/>
              </linearGradient>
              <linearGradient id="bldgB" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#213D60"/>
                <stop offset="100%" stop-color="#132538"/>
              </linearGradient>
              <linearGradient id="bldgMain" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#2A4E7A"/>
                <stop offset="100%" stop-color="#1A3358"/>
              </linearGradient>
              <linearGradient id="roofMain" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#3A6090"/>
                <stop offset="100%" stop-color="#243F60"/>
              </linearGradient>
              <linearGradient id="warmGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%" gradientUnits="objectBoundingBox">
                <stop offset="0%" stop-color="#C06035" stop-opacity="0.35"/>
                <stop offset="100%" stop-color="#C06035" stop-opacity="0"/>
              </linearGradient>
              <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#A8C8F0" stop-opacity="0.45"/>
                <stop offset="100%" stop-color="#A8C8F0" stop-opacity="0"/>
              </radialGradient>
              <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="3" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="blur"/>
                <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
              <clipPath id="svgClip">
                <rect width="520" height="680"/>
              </clipPath>
            </defs>
  
            <g clip-path="url(#svgClip)">
  
            <!-- Sky -->
            <rect width="520" height="680" fill="url(#sky)"/>
  
            <!-- Moon halo -->
            <circle cx="400" cy="90" r="55" fill="url(#moonGlow)"/>
            <!-- Moon -->
            <circle cx="400" cy="90" r="22" fill="#D4E8FF" opacity="0.9"/>
            <circle cx="408" cy="84" r="18" fill="#0D1E38"/>
  
            <!-- Stars -->
            <g fill="white">
              <circle cx="60"  cy="40"  r="1.1" opacity="0.7"/>
              <circle cx="130" cy="28"  r="0.8" opacity="0.5"/>
              <circle cx="210" cy="55"  r="1.3" opacity="0.65"/>
              <circle cx="300" cy="35"  r="0.9" opacity="0.6"/>
              <circle cx="460" cy="60"  r="1.0" opacity="0.55"/>
              <circle cx="35"  cy="80"  r="0.7" opacity="0.4"/>
              <circle cx="170" cy="72"  r="1.1" opacity="0.5"/>
              <circle cx="340" cy="120" r="0.8" opacity="0.45"/>
              <circle cx="480" cy="110" r="1.2" opacity="0.5"/>
              <circle cx="90"  cy="110" r="0.9" opacity="0.4"/>
            </g>
  
            <!-- ── Far background buildings (city silhouette) ── -->
            <!-- BG tower 1 -->
            <rect x="20" y="240" width="40" height="220" rx="2" fill="#0A1828" opacity="0.9"/>
            <rect x="24" y="248" width="8"  height="6" rx="1" fill="#D4AE3A" opacity="0.6"/>
            <rect x="36" y="248" width="8"  height="6" rx="1" fill="#D4AE3A" opacity="0.4"/>
            <rect x="24" y="262" width="8"  height="6" rx="1" fill="#D4AE3A" opacity="0.3"/>
            <rect x="36" y="262" width="8"  height="6" rx="1" fill="#4A90E2" opacity="0.5"/>
            <rect x="24" y="276" width="8"  height="6" rx="1" fill="#4A90E2" opacity="0.4"/>
            <rect x="36" y="276" width="8"  height="6" rx="1" fill="#D4AE3A" opacity="0.3"/>
            <!-- Antenna -->
            <rect x="38" y="228" width="4" height="14" rx="1" fill="#0A1828"/>
            <circle cx="40" cy="226" r="2" fill="#C06035" opacity="0.8"/>
  
            <!-- BG tower 2 -->
            <rect x="75" y="270" width="55" height="190" rx="2" fill="#0C1E30" opacity="0.85"/>
            <rect x="80" y="280" width="10" height="8" rx="1" fill="#4A90E2" opacity="0.5"/>
            <rect x="94" y="280" width="10" height="8" rx="1" fill="#4A90E2" opacity="0.3"/>
            <rect x="108" y="280" width="10" height="8" rx="1" fill="#D4AE3A" opacity="0.4"/>
            <rect x="80" y="296" width="10" height="8" rx="1" fill="#D4AE3A" opacity="0.35"/>
            <rect x="94" y="296" width="10" height="8" rx="1" fill="#4A90E2" opacity="0.45"/>
  
            <!-- BG tall slender tower right -->
            <rect x="450" y="200" width="34" height="280" rx="2" fill="#0A1828" opacity="0.85"/>
            <rect x="455" y="210" width="7"  height="5" rx="1" fill="#4A90E2" opacity="0.6"/>
            <rect x="466" y="210" width="7"  height="5" rx="1" fill="#D4AE3A" opacity="0.5"/>
            <rect x="455" y="222" width="7"  height="5" rx="1" fill="#D4AE3A" opacity="0.4"/>
            <rect x="466" y="222" width="7"  height="5" rx="1" fill="#4A90E2" opacity="0.35"/>
            <rect x="455" y="234" width="7"  height="5" rx="1" fill="#4A90E2" opacity="0.5"/>
            <rect x="466" y="234" width="7"  height="5" rx="1" fill="#D4AE3A" opacity="0.3"/>
            <!-- Antenna + blink -->
            <rect x="465" y="188" width="3" height="14" fill="#0A1828"/>
            <circle cx="466.5" cy="186" r="2.5" fill="#C06035" opacity="0.9" filter="url(#glow)"/>
  
            <!-- ── Mid-ground apartment blocks ── -->
            <!-- Apartment left -->
            <rect x="0" y="320" width="100" height="260" rx="3" fill="url(#bldgA)"/>
            <!-- windows left block -->
            <g fill="#4A90E2" opacity="0.55">
              <rect x="10" y="332" width="16" height="12" rx="1"/>
              <rect x="32" y="332" width="16" height="12" rx="1"/>
              <rect x="54" y="332" width="16" height="12" rx="1"/>
              <rect x="76" y="332" width="16" height="12" rx="1"/>
              <rect x="10" y="352" width="16" height="12" rx="1"/>
              <rect x="32" y="352" width="16" height="12" rx="1"/>
              <rect x="54" y="352" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.7"/>
              <rect x="76" y="352" width="16" height="12" rx="1"/>
              <rect x="10" y="372" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.5"/>
              <rect x="32" y="372" width="16" height="12" rx="1"/>
              <rect x="54" y="372" width="16" height="12" rx="1"/>
              <rect x="76" y="372" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.4"/>
              <rect x="10" y="392" width="16" height="12" rx="1"/>
              <rect x="32" y="392" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.55"/>
              <rect x="54" y="392" width="16" height="12" rx="1"/>
              <rect x="76" y="392" width="16" height="12" rx="1"/>
            </g>
            <!-- Balconies left block -->
            <rect x="8"  y="344" width="20" height="2" rx="1" fill="rgba(255,255,255,0.06)"/>
            <rect x="30" y="344" width="20" height="2" rx="1" fill="rgba(255,255,255,0.06)"/>
            <rect x="52" y="344" width="20" height="2" rx="1" fill="rgba(255,255,255,0.06)"/>
  
            <!-- Apartment right -->
            <rect x="420" y="300" width="100" height="280" rx="3" fill="url(#bldgB)"/>
            <g fill="#4A90E2" opacity="0.5">
              <rect x="430" y="314" width="16" height="12" rx="1"/>
              <rect x="452" y="314" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.65"/>
              <rect x="474" y="314" width="16" height="12" rx="1"/>
              <rect x="496" y="314" width="16" height="12" rx="1"/>
              <rect x="430" y="334" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.5"/>
              <rect x="452" y="334" width="16" height="12" rx="1"/>
              <rect x="474" y="334" width="16" height="12" rx="1"/>
              <rect x="496" y="334" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.4"/>
              <rect x="430" y="354" width="16" height="12" rx="1"/>
              <rect x="452" y="354" width="16" height="12" rx="1"/>
              <rect x="474" y="354" width="16" height="12" rx="1" fill="#D4AE3A" opacity="0.6"/>
              <rect x="496" y="354" width="16" height="12" rx="1"/>
            </g>
  
            <!-- ── HERO building — elegant modern estate, centre-stage ── -->
            <!-- Shadow/foundation -->
            <ellipse cx="260" cy="590" rx="155" ry="16" fill="#030810" opacity="0.6"/>
  
            <!-- Main building body -->
            <rect x="130" y="330" width="260" height="260" rx="6" fill="url(#bldgMain)"/>
  
            <!-- Facade detail: vertical stripe lights -->
            <rect x="180" y="330" width="3" height="260" fill="rgba(74,144,226,0.08)"/>
            <rect x="250" y="330" width="3" height="260" fill="rgba(74,144,226,0.08)"/>
            <rect x="320" y="330" width="3" height="260" fill="rgba(74,144,226,0.08)"/>
  
            <!-- Windows — main building (4 rows × 5 cols) -->
            <!-- Row 1 -->
            <rect x="148" y="348" width="30" height="22" rx="2" fill="#0A1828" opacity="0.7"/>
            <rect x="186" y="348" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.75" filter="url(#glow)"/>
            <rect x="224" y="348" width="30" height="22" rx="2" fill="#0A1828" opacity="0.5"/>
            <rect x="262" y="348" width="30" height="22" rx="2" fill="#4A90E2" opacity="0.65"/>
            <rect x="300" y="348" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.55"/>
  
            <!-- Row 2 -->
            <rect x="148" y="382" width="30" height="22" rx="2" fill="#4A90E2" opacity="0.6"/>
            <rect x="186" y="382" width="30" height="22" rx="2" fill="#0A1828" opacity="0.6"/>
            <rect x="224" y="382" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.7"/>
            <rect x="262" y="382" width="30" height="22" rx="2" fill="#0A1828" opacity="0.5"/>
            <rect x="300" y="382" width="30" height="22" rx="2" fill="#4A90E2" opacity="0.5"/>
  
            <!-- Row 3 -->
            <rect x="148" y="416" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.6"/>
            <rect x="186" y="416" width="30" height="22" rx="2" fill="#4A90E2" opacity="0.55"/>
            <rect x="224" y="416" width="30" height="22" rx="2" fill="#4A90E2" opacity="0.7"/>
            <rect x="262" y="416" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.6"/>
            <rect x="300" y="416" width="30" height="22" rx="2" fill="#0A1828" opacity="0.5"/>
  
            <!-- Row 4 -->
            <rect x="148" y="450" width="30" height="22" rx="2" fill="#0A1828" opacity="0.6"/>
            <rect x="186" y="450" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.5"/>
            <rect x="224" y="450" width="30" height="22" rx="2" fill="#0A1828" opacity="0.5"/>
            <rect x="262" y="450" width="30" height="22" rx="2" fill="#4A90E2" opacity="0.65"/>
            <rect x="300" y="450" width="30" height="22" rx="2" fill="#D4AE3A" opacity="0.7"/>
  
            <!-- Large lobby / ground floor -->
            <rect x="130" y="530" width="260" height="60" rx="0" fill="#0E1E34"/>
            <!-- Lobby glass panels -->
            <rect x="145" y="538" width="50" height="44" rx="2" fill="rgba(74,144,226,0.12)" stroke="rgba(74,144,226,0.25)" stroke-width="1"/>
            <rect x="205" y="538" width="60" height="44" rx="2" fill="rgba(74,144,226,0.08)" stroke="rgba(74,144,226,0.2)" stroke-width="1"/>
            <!-- Main entrance doors -->
            <rect x="230" y="548" width="20" height="34" rx="1" fill="rgba(74,144,226,0.18)" stroke="rgba(74,144,226,0.3)" stroke-width="1"/>
            <rect x="252" y="548" width="20" height="34" rx="1" fill="rgba(74,144,226,0.18)" stroke="rgba(74,144,226,0.3)" stroke-width="1"/>
            <!-- Lobby warm glow from inside -->
            <rect x="135" y="535" width="250" height="50" rx="2" fill="rgba(212,174,58,0.06)"/>
  
            <!-- Roof structure -->
            <rect x="128" y="318" width="264" height="16" rx="3" fill="url(#roofMain)"/>
            <!-- Rooftop elements -->
            <rect x="170" y="298" width="20" height="22" rx="2" fill="#1A3358"/>
            <rect x="240" y="290" width="40" height="30" rx="2" fill="#1E3B60"/>
            <rect x="330" y="302" width="16" height="18" rx="2" fill="#1A3358"/>
            <!-- Rooftop antenna / broadcast tower -->
            <rect x="258" y="260" width="4" height="32" rx="1" fill="#0D2040"/>
            <rect x="252" y="262" width="16" height="2"  rx="1" fill="#0D2040"/>
            <rect x="255" y="270" width="10" height="1.5" rx="1" fill="#0D2040"/>
            <circle cx="260" cy="258" r="3" fill="#C06035" opacity="0.9" filter="url(#softGlow)"/>
  
            <!-- ── Balconies on main building ── -->
            <rect x="130" y="372" width="260" height="4" rx="1" fill="rgba(255,255,255,0.06)"/>
            <rect x="130" y="406" width="260" height="4" rx="1" fill="rgba(255,255,255,0.05)"/>
            <rect x="130" y="440" width="260" height="4" rx="1" fill="rgba(255,255,255,0.05)"/>
            <rect x="130" y="474" width="260" height="4" rx="1" fill="rgba(255,255,255,0.04)"/>
  
            <!-- ── Foreground elements: road / courtyard ── -->
            <rect x="0" y="588" width="520" height="92" fill="url(#ground)"/>
            <!-- Road lanes -->
            <rect x="0" y="610" width="520" height="28" fill="#09141F"/>
            <rect x="60"  y="623" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <rect x="140" y="623" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <rect x="220" y="623" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <rect x="300" y="623" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <rect x="380" y="623" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <rect x="460" y="623" width="40" height="3" rx="1.5" fill="rgba(255,255,255,0.08)"/>
            <!-- Street lamps -->
            <rect x="110" y="560" width="3"  height="52" rx="1.5" fill="#0D2040"/>
            <circle cx="111.5" cy="558" r="6" fill="#D4AE3A" opacity="0.7" filter="url(#softGlow)"/>
            <rect x="395" y="555" width="3"  height="57" rx="1.5" fill="#0D2040"/>
            <circle cx="396.5" cy="553" r="6" fill="#D4AE3A" opacity="0.7" filter="url(#softGlow)"/>
  
            <!-- ── Palm trees / vegetation ── -->
            <!-- Palm left -->
            <rect x="88" y="490" width="5" height="100" rx="2" fill="#0A1E30" transform="rotate(-4,90,540)"/>
            <ellipse cx="88" cy="492" rx="24" ry="12" fill="#0F2D1A" opacity="0.85"/>
            <ellipse cx="78" cy="486" rx="18" ry="8"  fill="#163820" opacity="0.75"/>
            <ellipse cx="100" cy="488" rx="20" ry="9"  fill="#122E18" opacity="0.8"/>
            <ellipse cx="88" cy="480" rx="14" ry="7"  fill="#1A4020" opacity="0.7"/>
  
            <!-- Palm right -->
            <rect x="428" y="500" width="5" height="90" rx="2" fill="#0A1E30" transform="rotate(3,430,545)"/>
            <ellipse cx="430" cy="502" rx="22" ry="11" fill="#0F2D1A" opacity="0.85"/>
            <ellipse cx="420" cy="497" rx="17" ry="7"  fill="#163820" opacity="0.7"/>
            <ellipse cx="442" cy="498" rx="19" ry="8"  fill="#122E18" opacity="0.8"/>
            <ellipse cx="430" cy="491" rx="13" ry="6"  fill="#1A4020" opacity="0.65"/>
  
            <!-- ── Atmospheric ground mist / fog ── -->
            <ellipse cx="260" cy="640" rx="300" ry="35" fill="rgba(74,144,226,0.03)"/>
  
            <!-- ── Window warm interior glow (subtle) ── -->
            <rect x="130" y="330" width="260" height="260" rx="6" fill="rgba(212,174,58,0.03)"/>
  
            </g><!-- /clip -->
          </svg>
  
          <!-- ── Floating property card 1 — main listing ── -->
          <div class="prop-card-float float-a" style="top:18%;left:4%;width:200px;padding:14px 16px;">
            <div class="verified-badge" style="margin-bottom:10px;">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#7EC47B"><path d="M1 4l2 2 4-4"/></svg>
              Verified
            </div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:#FEFCF8;line-height:1.2;margin-bottom:4px;">
              3-bed Estate<br><span style="font-size:14px;color:rgba(255,255,255,0.5);">Lekki Phase 1</span>
            </div>
            <div style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#D4AE3A;margin-top:8px;">₦ 45,000,000</div>
            <div style="display:flex;gap:10px;margin-top:10px;">
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">🛏 3</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">🛁 2</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">📐 210m²</span>
            </div>
          </div>
  
           <!-- ── Floating property card 1 — main listing ── -->
           <div class="prop-card-float float-a hidden lg:block" style="top:25%;left:50%;width:200px;padding:14px 16px;">
            <div class="verified-badge" style="margin-bottom:10px;">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#7EC47B"><path d="M1 4l2 2 4-4"/></svg>
              Verified
            </div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:#FEFCF8;line-height:1.2;margin-bottom:4px;">
              4-bedroom Duplex<br><span style="font-size:14px;color:rgba(255,255,255,0.5);">Lekki Phase 1</span>
            </div>
            <div style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#D4AE3A;margin-top:8px;">₦ 45,000,000</div>
            <div style="display:flex;gap:10px;margin-top:10px;">
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">🛏 3</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">🛁 2</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">📐 210m²</span>
            </div>
          </div>
  
          <!-- ── Floating property card 2 — main listing ── -->
          <div class="prop-card-float float-a md:hidden" style="top:5%;left:50%;width:200px;padding:14px 16px;">
            <div class="verified-badge" style="margin-bottom:10px;">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#7EC47B"><path d="M1 4l2 2 4-4"/></svg>
              Verified
            </div>
            <div style="font-family:'Cormorant Garamond',serif;font-size:17px;font-weight:400;color:#FEFCF8;line-height:1.2;margin-bottom:4px;">
              3-bedroom flat<br><span style="font-size:14px;color:rgba(255,255,255,0.5);">Lekki Phase 1</span>
            </div>
            <div style="font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;color:#D4AE3A;margin-top:8px;">₦ 500,000</div>
            <div style="display:flex;gap:10px;margin-top:10px;">
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">🛏 3</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">🛁 2</span>
              <span style="font-size:11px;color:rgba(255,255,255,0.45);font-family:'DM Sans',sans-serif;">📐 210m²</span>
            </div>
          </div>
  
          <!-- ── Floating property card 3 — agent ── -->
          <div class="prop-card-float float-b" style="top:50%;right:2%;width:175px;padding:12px 14px;">
            <div style="display:flex;align-items:center;gap:9px;margin-bottom:8px;">
              <div style="width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#4A70A0,#1A3358);border:1px solid rgba(74,144,226,0.3);display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:#fff;flex-shrink:0;">AO</div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:#fff;">Amara Obi</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.4);">Verified Agent</div>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:4px;">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#D4AE3A"><path d="M5 1l1.2 2.5L9 4.2 6.8 6.5l.5 3L5 8.2 2.7 9.5l.5-3L1 4.2l2.8-.7z"/></svg>
              <span style="font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;color:rgba(255,255,255,0.7);">4.9</span>
              <span style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.35);margin-left:2px;">· 87 sales</span>
            </div>
          </div>
  
          <!-- ── Floating card 4 — micro stat ── -->
          <div class="prop-card-float float-c" style="bottom:22%;left:5%;padding:10px 14px;width:155px;">
            <div style="font-family:'DM Sans',sans-serif;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:6px;">Virtual tour</div>
            <div style="display:flex;align-items:center;gap:8px;">
              <div style="width:28px;height:28px;border-radius:50%;background:rgba(74,144,226,0.18);border:1px solid rgba(74,144,226,0.3);display:flex;align-items:center;justify-content:center;">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 2l7 4-7 4V2z" fill="#4A90E2"/>
                </svg>
              </div>
              <div>
                <div style="font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;color:#fff;">Ready now</div>
                <div style="font-family:'DM Sans',sans-serif;font-size:10px;color:rgba(255,255,255,0.4);">No booking needed</div>
              </div>
            </div>
          </div>
  
        </div><!-- /hero-illustration -->
      </div><!-- /hero-right -->
  
    </div><!-- /hero-body -->
  
    <!-- ── Stat strip ── -->
    <div class="hero-stats-strip">
      <div class="stat-item">
        <div class="font-display text-28px font-semibold text-chalk">4,200+</div>
        <div class="text-11px text-white/40 tracking-em-008 uppercase mt-0.5">Active listings</div>
      </div>
      <div class="stat-item">
        <div class="font-display text-28px font-semibold text-chalk">380+</div>
        <div class="text-11px text-white/40 tracking-em-008 uppercase mt-0.5">Verified agents</div>
      </div>
      <div class="stat-item">
        <div class="font-display text-28px font-semibold text-chalk">98%</div>
        <div class="text-11px text-white/40 tracking-em-008 uppercase mt-0.5">Satisfaction rate</div>
      </div>
      <div class="stat-item">
        <div class="font-display text-28px font-semibold text-chalk">Virtual</div>
        <div class="text-11px text-white/40 tracking-em-008 uppercase mt-0.5">Tours available</div>
      </div>
    </div>
  
  </section>
  
  <style>
    /* ── Hero split layout ── */
    .hero-section {
      min-height: 100vh;
      background: #060E1C;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }
  
    /* Subtle noise grain overlay */
    .hero-section::before {
      content: '';
      position: absolute; inset: 0; z-index: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      background-size: 200px;
      opacity: 0.4;
      pointer-events: none;
    }
  
    /* Ambient radial glow behind left content */
    .hero-glow-left {
      position: absolute;
      left: -10%; top: 10%;
      width: 65vw; height: 70vh;
      background: radial-gradient(ellipse at 30% 40%, rgba(74,144,226,0.13) 0%, rgba(10,36,99,0.08) 45%, transparent 70%);
      pointer-events: none; z-index: 0;
    }
  
    /* ── Main content row ── */
    .hero-body {
      display: flex;
      align-items: center;
      flex: 1;
      padding-top: 68px; /* navbar height */
    }
  
    /* ── Left column ── */
    .hero-left {
      flex: 0 0 52%;
      max-width: 52%;
      padding: 72px 5vw 80px 5vw;
      position: relative; z-index: 2;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  
    /* ── Right column — illustration pane ── */
    .hero-right {
      flex: 0 0 48%;
      max-width: 48%;
      align-self: stretch;
      position: relative;
      overflow: hidden;
    }
  
    /* Gradient fade from left: blends right panel into hero bg */
    .hero-right::before {
      content: '';
      position: absolute; top: 0; left: 0;
      width: 100px; height: 100%;
      background: linear-gradient(to right, #060E1C, transparent);
      z-index: 3; pointer-events: none;
    }
  
    /* Gradient fade at bottom */
    .hero-right::after {
      content: '';
      position: absolute; bottom: 0; left: 0; right: 0;
      height: 160px;
      background: linear-gradient(to top, #060E1C, transparent);
      z-index: 3; pointer-events: none;
    }
  
    /* ── Property illustration container ── */
    .hero-illustration {
      width: 100%; height: 100%;
      position: relative; z-index: 2;
    }
  
    /* ── Floating property cards ── */
    .prop-card-float {
      position: absolute;
      background: rgba(14,36,68,0.82);
      border: 1px solid rgba(74,144,226,0.18);
      border-radius: 14px;
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      box-shadow: 0 20px 48px rgba(6,14,28,0.5), 0 2px 8px rgba(74,144,226,0.1);
      z-index: 10;
    }
    :global([data-theme="dark"]) .prop-card-float {
      background: rgba(8,15,28,0.88);
      border-color: rgba(74,144,226,0.15);
    }
  
    /* Listing card pulse */
    @keyframes floatA {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(-8px); }
    }
    @keyframes floatB {
      0%, 100% { transform: translateY(0px); }
      50%       { transform: translateY(6px); }
    }
    @keyframes floatC {
      0%, 100% { transform: translateY(0px) rotate(-1deg); }
      50%       { transform: translateY(-5px) rotate(0deg); }
    }
  
    .float-a { animation: floatA 7s ease-in-out infinite; }
    .float-b { animation: floatB 8s 1.2s ease-in-out infinite; }
    .float-c { animation: floatC 6.5s 0.6s ease-in-out infinite; }
  
    /* ── Enhanced search bar ── */
    .search-wrap {
      background: rgba(255,255,255,0.055);
      border: 1px solid rgba(255,255,255,0.14);
      border-radius: 16px;
      box-shadow:
        0 0 0 1px rgba(74,144,226,0.08),
        0 12px 48px rgba(6,14,28,0.5),
        0 2px 8px rgba(74,144,226,0.08);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      overflow: hidden;
      transition: box-shadow 0.3s ease, border-color 0.3s ease;
    }
    .search-wrap:focus-within {
      border-color: rgba(74,144,226,0.38);
      box-shadow:
        0 0 0 2px rgba(74,144,226,0.14),
        0 16px 56px rgba(6,14,28,0.55),
        0 2px 8px rgba(74,144,226,0.16);
    }
    :global([data-theme="dark"]) .search-wrap {
      background: rgba(255,255,255,0.04);
      border-color: rgba(255,255,255,0.10);
      box-shadow: 0 0 0 1px rgba(74,144,226,0.06), 0 12px 48px rgba(0,0,0,0.5);
    }
  
    .search-top-row {
      display: flex;
      align-items: center;
      padding: 14px 18px 0;
      gap: 0;
    }
    .search-bottom-row {
      display: flex;
      align-items: center;
      padding: 0 18px 14px;
      gap: 10px;
      border-top: 1px solid rgba(255,255,255,0.07);
      margin-top: 10px;
      padding-top: 12px;
    }
  
    /* Location input inside wrap */
    .search-loc-input {
      flex: 1; background: none; border: none; outline: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 15px; font-weight: 400;
      color: #fff; min-width: 0;
      padding: 6px 0;
    }
    .search-loc-input::placeholder { color: rgba(255,255,255,0.35); }
  
    /* Select fields in bottom row */
    .search-field-select {
      flex: 1; background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.09);
      border-radius: 8px; outline: none;
      font-family: 'DM Sans', sans-serif;
      font-size: 13px; color: rgba(255,255,255,0.65);
      cursor: pointer; padding: 9px 12px;
      -webkit-appearance: none; appearance: none;
      transition: border-color 0.2s, background 0.2s;
    }
    .search-field-select:focus {
      border-color: rgba(74,144,226,0.4);
      background: rgba(74,144,226,0.08);
    }
    .search-field-select option { color: #0A2463; background: #fff; }
  
    /* Search CTA button */
    .search-cta {
      display: flex; align-items: center; gap: 8px;
      background: #C06035; color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 14px; font-weight: 500; letter-spacing: 0.04em;
      padding: 11px 22px; border-radius: 10px;
      border: none; cursor: pointer;
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
      box-shadow: 0 4px 18px rgba(192,96,53,0.35);
      white-space: nowrap;
    }
    .search-cta:hover {
      background: #a04e28;
      transform: translateY(-1px);
      box-shadow: 0 6px 24px rgba(192,96,53,0.45);
    }
    .search-cta:active { transform: translateY(0); }
  
    /* Search micro-label */
    .search-micro-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 10px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(255,255,255,0.3);
      padding: 0 18px 8px;
      display: block;
    }

      /* ── Search bar — v2 design (single-row pill) ── */
    .hero-search-wrap {
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(255,255,255,0.16);
        box-shadow: 0 12px 48px rgba(10,36,99,0.4), 0 2px 12px rgba(74,144,226,0.1);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        border-radius: 20px;
        padding: 8px 8px 8px 20px;
        transition: box-shadow 0.3s ease, border-color 0.3s ease;
        width: 100%;
    }
    .hero-search-wrap:focus-within {
        border-color: rgba(74,144,226,0.45);
        box-shadow: 0 16px 64px rgba(10,36,99,0.5), 0 0 0 2px rgba(74,144,226,0.15), 0 2px 12px rgba(74,144,226,0.2);
    }
    :global([data-theme="dark"]) .hero-search-wrap {
        background: rgba(255,255,255,0.05);
        border-color: rgba(255,255,255,0.12);
        box-shadow: 0 12px 48px rgba(0,0,0,0.5), 0 2px 12px rgba(74,144,226,0.08);
    }
    :global([data-theme="dark"]) .hero-search-wrap:focus-within {
        border-color: rgba(74,144,226,0.4);
        box-shadow: 0 16px 64px rgba(0,0,0,0.65), 0 0 0 2px rgba(74,144,226,0.14), 0 2px 12px rgba(74,144,226,0.16);
    }
  
    /* ── Stats strip ── */
    .hero-stats-strip {
      position: relative; /* override absolute from base */
      display: flex; justify-content: flex-start; flex-wrap: wrap;
      border-top: 1px solid rgba(255,255,255,0.07);
      background: rgba(6,14,28,0.6);
      z-index: 5;
    }
    .stat-item {
      padding: 18px 48px; text-align: center;
      border-right: 1px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
    }
    .stat-item:last-child { border-right: none; }
  
    /* ── Responsive: below 900px → stack vertically ── */
    @media (max-width: 900px) {
      .hero-body { flex-direction: column; }
      .hero-left {
        flex: none; max-width: 100%;
        padding: 64px 5vw 40px;
      }
      .hero-right {
        flex: none; max-width: 100%; width: 100%;
        height: 320px;
      }
      .hero-right::before { display: none; }
    }
  
    @media (max-width: 640px) {
      .hero-left { padding: 56px 5vw 32px; }
      .search-top-row { padding: 12px 14px 0; }
      .search-bottom-row { flex-direction: column; padding: 10px 14px 14px; }
      .search-field-select { width: 100%; }
      .search-cta { width: 100%; justify-content: center; margin-top: 4px; }
      .hero-search-wrap { padding: 6px 6px 6px 14px; border-radius: 16px; }
      .hero-search-wrap { padding: 6px 6px 6px 14px; border-radius: 16px; }
    /* search fields stack */
    .hero-search-inner { flex-wrap: wrap; gap: 8px !important; }
    .hero-search-divider { display: none; }
    .hero-search-select { 
        /* flex: 1 1 calc(50% - 4px);  */
        min-width: 0; 
        padding: 10px 8px !important; 
    }
    .hero-search-btn { width: 100%; justify-content: center; border-radius: 12px !important; }
    }
  
    /* Animated subtle shimmer on search wrap */
    @keyframes searchShimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
  
    /* Trust indicators row */
    .hero-trust-row {
      display: flex; align-items: center; gap: 16px; flex-wrap: wrap;
      margin-top: 20px;
    }
    .hero-trust-item {
      display: flex; align-items: center; gap: 6px;
      font-family: 'DM Sans', sans-serif;
      font-size: 12px; color: rgba(255,255,255,0.45);
    }
    .hero-trust-item svg { color: #4A90E2; flex-shrink: 0; }
  
    /* Verified badge on illustration card */
    .verified-badge {
      display: inline-flex; align-items: center; gap: 4px;
      background: rgba(74,148,72,0.18); border: 1px solid rgba(74,148,72,0.3);
      border-radius: 20px; padding: 3px 9px;
      font-family: 'DM Sans', sans-serif;
      font-size: 10px; font-weight: 500; letter-spacing: 0.08em;
      text-transform: uppercase; color: #7EC47B;
    }
</style>