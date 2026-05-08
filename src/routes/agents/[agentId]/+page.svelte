<script lang="ts">
    const scrollToContact = () => {
        document.getElementById('contactSection')?.scrollIntoView({
            behavior:'smooth',
            block:'start'
        })
    }

    const scrollToListings = () => {
        document.getElementById('listingsSection')?.scrollIntoView({
            behavior:'smooth',
            block:'start'
    })}

    const filterListings = (type: string) => {}
</script>

<!-- PROFILE HERO -->
<div style="margin-top:68px">
    <div class="profile-hero">
      <div class="cover-strip">
        <div class="cover-ring cr1"></div>
        <div class="cover-ring cr2"></div>
        <div class="cover-ring cr3"></div>
        <div class="cover-crumb">
          <a href="/">Home</a><span>/</span>
          <a href="/agents">Agents</a><span>/</span>
          <span id="breadcrumbName">Chukwuemeka Okafor</span>
        </div>
      </div>

      <div class="profile-inner">
        <div class="avatar-row">
          <div class="agent-avatar gold-ring" id="agentAvatar" style="background:#1F3F6A">CO</div>
          <div class="profile-btns">
            <a href="https://wa.me/2348001234567" class="p-btn p-btn-wa" target="_blank" rel="noopener">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 16.81c-.26.73-1.27 1.34-2.09 1.52-.56.12-1.29.21-3.74-.8-3.14-1.33-5.17-4.48-5.32-4.69-.15-.2-1.22-1.63-1.22-3.11 0-1.48.77-2.2 1.04-2.5.26-.29.58-.37.77-.37.19 0 .38 0 .55.01.17.01.41-.065.64.49.24.58.8 2 .87 2.14.07.14.12.3.02.49-.09.19-.14.3-.27.47-.14.17-.29.37-.42.5-.14.13-.28.28-.12.54.16.27.71 1.17 1.52 1.9.96.86 1.77 1.12 2.02 1.25.26.12.41.1.56-.06.16-.17.66-.77.83-1.04.17-.27.35-.22.58-.13.23.09 1.48.7 1.73.83.25.12.42.18.48.28.07.1.07.56-.2 1.29z"/></svg>
              WhatsApp
            </a>
            <button class="p-btn p-btn-primary" onclick={scrollToContact}>Send message</button>
            <button class="p-btn p-btn-outline" onclick={scrollToListings}>View all listings (<span id="listingCountBtn">42</span>)</button>
          </div>
        </div>
    
        <div class="agent-info">
          <div class="ai-name-row">
            <span class="ai-name" id="agentName">Chukwuemeka Okafor</span>
            <span class="badge badge-ver">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="#7DBF7A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
              Verified
            </span>
            <span class="badge badge-prem">
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none"><polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" fill="#D4AE3A"/></svg>
              Premium
            </span>
          </div>
          <div class="ai-agency"><span id="agentRole">Principal Agent</span> · <strong id="agentAgency">Premier Properties PH</strong></div>
          <div class="ai-loc"><div class="ai-loc-dot"></div><span id="agentLoc">GRA Phase 2, Port Harcourt, Rivers State</span></div>
          <div class="ai-specs" id="agentSpecs">
            <span class="ai-spec">Residential Sales</span><span class="ai-spec">Luxury Homes</span>
            <span class="ai-spec">Commercial</span><span class="ai-spec">GRA Specialist</span>
            <span class="ai-spec">Virtual Tours</span>
          </div>
        </div>
      </div>

    </div>

      <!-- STATS BAR -->
    <div class="stats-bar">
        <div class="sb-inner">
        <div class="sb-stat">
            <div class="sb-icon"><svg width="15" height="15" viewBox="0 0 20 20" fill="none"><rect x="3" y="8" width="14" height="9" rx="1" stroke="rgba(255,255,255,.6)" stroke-width="1.4"/><path d="M1 9l9-6 9 6" stroke="rgba(255,255,255,.6)" stroke-width="1.4" stroke-linecap="round"/></svg></div>
            <div><div class="sb-n" id="statListings">42</div><div class="sb-l">Active listings</div></div>
        </div>
        <div class="sb-stat">
            <div class="sb-icon"><svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke="rgba(255,255,255,.6)" stroke-width="1.4" stroke-linejoin="round"/></svg></div>
            <div><div class="sb-n" id="statRating">4.9</div><div class="sb-l">Rating</div><div class="sb-stars"><div class="sb-sf"></div><div class="sb-sf"></div><div class="sb-sf"></div><div class="sb-sf"></div><div class="sb-sf"></div></div></div>
        </div>
        <div class="sb-stat">
            <div class="sb-icon"><svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M17 18v-2a4 4 0 00-4-4H7a4 4 0 00-4 4v2" stroke="rgba(255,255,255,.6)" stroke-width="1.4" stroke-linecap="round"/><circle cx="10" cy="7" r="3" stroke="rgba(255,255,255,.6)" stroke-width="1.4"/></svg></div>
            <div><div class="sb-n" id="statSales">187</div><div class="sb-l">Successful sales</div></div>
        </div>
        <div class="sb-stat">
            <div class="sb-icon"><svg width="15" height="15" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="rgba(255,255,255,.6)" stroke-width="1.4"/><path d="M10 6v4l3 2" stroke="rgba(255,255,255,.6)" stroke-width="1.4" stroke-linecap="round"/></svg></div>
            <div><div class="sb-n" id="statYears">6 yrs</div><div class="sb-l">On Blupodd</div></div>
        </div>
        <div class="sb-stat">
            <div class="sb-icon"><svg width="15" height="15" viewBox="0 0 20 20" fill="none"><path d="M2 2h3l1.5 7.5a2 2 0 002 1.5h7a2 2 0 002-1.5L19 5H6" stroke="rgba(255,255,255,.6)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="17" r="1.5" fill="rgba(255,255,255,.6)"/><circle cx="16" cy="17" r="1.5" fill="rgba(255,255,255,.6)"/></svg></div>
            <div><div class="sb-n" id="statReviews">214</div><div class="sb-l">Reviews</div></div>
        </div>
        </div>
    </div>



    <!-- MAIN LAYOUT -->
<div class="profile-main">

    <!-- LEFT: main content -->
    <div>
  
      <!-- ABOUT -->
      <div class="p-card">
        <div class="p-card-head">
          <div class="p-card-title"><div class="p-card-dot"></div>About</div>
        </div>
        <div class="p-card-body">
          <div class="about-text" id="aboutText">
            <p>Chukwuemeka Okafor is the Principal Agent at Premier Properties PH, one of Port Harcourt's most respected real estate firms with over a decade of presence in the Rivers State market. He specialises in luxury residential sales across GRA Phase 1, 2 and 3, as well as commercial and mixed-use properties in Trans-Amadi and Port Harcourt City Centre.</p>
            <p>With 187 successful sales and a consistent 4.9-star rating across 214 reviews, Chukwuemeka is known for his deep knowledge of local market values, his ability to match buyers to the right property quickly, and his transparent, professional approach to every transaction.</p>
            <p>He joined Blupodd in 2019 and offers virtual tours for all his properties — making it easy for diaspora buyers and out-of-state investors to explore without travelling.</p>
          </div>
          <div class="lang-row">
            <span class="lang-pill">English</span>
            <span class="lang-pill">Igbo</span>
            <span class="lang-pill">Pidgin</span>
          </div>
        </div>
      </div>
  
      <!-- LISTINGS -->
      <div class="p-card" id="listingsSection">
        <div class="p-card-head">
          <div class="p-card-title"><div class="p-card-dot"></div>All listings</div>
          <div class="p-card-meta">Showing 6 of <span id="listingTotal">42</span></div>
        </div>
        <div class="listing-filter">
          <button class="lf-tab active" onclick={() => filterListings('all')}>All (<span id="cAll">42</span>)</button>
          <button class="lf-tab" onclick={() => filterListings('rent')}>For Rent (<span id="cRent">18</span>)</button>
          <button class="lf-tab" onclick={() => filterListings('sale')}>For Sale (<span id="cSale">24</span>)</button>
          <button class="lf-tab" onclick={() => filterListings('boosted')}>Boosted (8)</button>
        </div>
        <div class="mini-prop-grid" id="propGrid">
  
          <!-- Prop 1 -->
          <div class="mp-card" data-type="rent" data-boosted="1">
            <div class="mp-img"><div class="mp-scene sky-1">
              <div class="pb" style="width:64px;height:82px;left:40px"></div>
              <div class="pw" style="width:10px;height:12px;left:50px;bottom:60px"></div><div class="pw" style="width:10px;height:12px;left:66px;bottom:60px"></div>
              <div class="pw" style="width:10px;height:12px;left:50px;bottom:41px"></div><div class="pw" style="width:10px;height:12px;left:66px;bottom:41px"></div>
              <div class="pb" style="width:44px;height:52px;left:124px"></div>
              <div class="pw" style="width:7px;height:9px;left:131px;bottom:34px"></div>
            </div>
            <span class="mp-tag tag-rent">Rent</span><span class="mp-boost">Boosted</span></div>
            <div class="mp-body">
              <div class="mp-price">₦950,000 <span>/ mo</span></div>
              <div class="mp-addr"><div class="mp-addr-dot"></div>GRA Phase 2, PH</div>
              <div class="mp-meta"><div class="mp-meta-p"><div class="mp-meta-d"></div>3 beds</div><div class="mp-meta-p"><div class="mp-meta-d"></div>2 baths</div><div class="mp-meta-p"><div class="mp-meta-d"></div>115m²</div></div>
              <div class="mp-btns"><button class="mp-btn mp-btn-book">View</button><button class="mp-btn mp-btn-vt">Virtual</button></div>
            </div>
          </div>
  
          <!-- Prop 2 -->
          <div class="mp-card" data-type="sale" data-boosted="1">
            <div class="mp-img"><div class="mp-scene sky-2">
              <div class="pb" style="width:76px;height:102px;left:46px"></div>
              <div class="pw" style="width:11px;height:13px;left:55px;bottom:76px"></div><div class="pw" style="width:11px;height:13px;left:72px;bottom:76px"></div>
              <div class="pw" style="width:11px;height:13px;left:55px;bottom:54px"></div><div class="pw" style="width:11px;height:13px;left:72px;bottom:54px"></div>
              <div class="pw" style="width:11px;height:13px;left:55px;bottom:33px"></div><div class="pw" style="width:11px;height:13px;left:72px;bottom:33px"></div>
            </div>
            <span class="mp-tag tag-sale">Sale</span><span class="mp-boost">Boosted</span></div>
            <div class="mp-body">
              <div class="mp-price">₦145,000,000</div>
              <div class="mp-addr"><div class="mp-addr-dot"></div>GRA Phase 3, PH</div>
              <div class="mp-meta"><div class="mp-meta-p"><div class="mp-meta-d"></div>5 beds</div><div class="mp-meta-p"><div class="mp-meta-d"></div>4 baths</div><div class="mp-meta-p"><div class="mp-meta-d"></div>290m²</div></div>
              <div class="mp-btns"><button class="mp-btn mp-btn-book">View</button><button class="mp-btn mp-btn-vt">Virtual</button></div>
            </div>
          </div>
  
          <!-- Prop 3 -->
          <div class="mp-card" data-type="rent" data-boosted="0">
            <div class="mp-img"><div class="mp-scene sky-3">
              <div class="pb" style="width:54px;height:64px;left:36px"></div>
              <div class="pw" style="width:8px;height:10px;left:44px;bottom:44px"></div><div class="pw" style="width:8px;height:10px;left:58px;bottom:44px"></div>
              <div class="pw" style="width:8px;height:10px;left:44px;bottom:28px"></div><div class="pw" style="width:8px;height:10px;left:58px;bottom:28px"></div>
              <div class="pb" style="width:42px;height:48px;left:108px"></div>
              <div class="pw" style="width:7px;height:8px;left:115px;bottom:31px"></div>
            </div>
            <span class="mp-tag tag-rent">Rent</span></div>
            <div class="mp-body">
              <div class="mp-price">₦380,000 <span>/ mo</span></div>
              <div class="mp-addr"><div class="mp-addr-dot"></div>Trans-Amadi, PH</div>
              <div class="mp-meta"><div class="mp-meta-p"><div class="mp-meta-d"></div>2 beds</div><div class="mp-meta-p"><div class="mp-meta-d"></div>1 bath</div><div class="mp-meta-p"><div class="mp-meta-d"></div>65m²</div></div>
              <div class="mp-btns"><button class="mp-btn mp-btn-book">View</button><button class="mp-btn mp-btn-vt">Virtual</button></div>
            </div>
          </div>
  
          <!-- Prop 4 -->
          <div class="mp-card" data-type="sale" data-boosted="1">
            <div class="mp-img"><div class="mp-scene sky-4">
              <div class="pb" style="width:90px;height:112px;left:40px"></div>
              <div class="pw" style="width:12px;height:14px;left:50px;bottom:84px"></div><div class="pw" style="width:12px;height:14px;left:68px;bottom:84px"></div><div class="pw" style="width:12px;height:14px;left:86px;bottom:84px"></div>
              <div class="pw" style="width:12px;height:14px;left:50px;bottom:62px"></div><div class="pw" style="width:12px;height:14px;left:68px;bottom:62px"></div>
              <div class="pw" style="width:12px;height:14px;left:50px;bottom:40px"></div>
            </div>
            <span class="mp-tag tag-sale">Sale</span><span class="mp-boost">Boosted</span></div>
            <div class="mp-body">
              <div class="mp-price">₦220,000,000</div>
              <div class="mp-addr"><div class="mp-addr-dot"></div>GRA Phase 1, PH</div>
              <div class="mp-meta"><div class="mp-meta-p"><div class="mp-meta-d"></div>6 beds</div><div class="mp-meta-p"><div class="mp-meta-d"></div>5 baths</div><div class="mp-meta-p"><div class="mp-meta-d"></div>420m²</div></div>
              <div class="mp-btns"><button class="mp-btn mp-btn-book">View</button><button class="mp-btn mp-btn-vt">Virtual</button></div>
            </div>
          </div>
  
          <!-- Prop 5 -->
          <div class="mp-card" data-type="rent" data-boosted="0">
            <div class="mp-img"><div class="mp-scene sky-5">
              <div class="pb" style="width:50px;height:58px;left:34px"></div>
              <div class="pw" style="width:7px;height:9px;left:42px;bottom:39px"></div><div class="pw" style="width:7px;height:9px;left:55px;bottom:39px"></div>
              <div class="pb" style="width:44px;height:50px;left:103px"></div>
              <div class="pw" style="width:7px;height:8px;left:110px;bottom:33px"></div><div class="pw" style="width:7px;height:8px;left:123px;bottom:33px"></div>
            </div>
            <span class="mp-tag tag-rent">Rent</span></div>
            <div class="mp-body">
              <div class="mp-price">₦550,000 <span>/ mo</span></div>
              <div class="mp-addr"><div class="mp-addr-dot"></div>D-Line, Port Harcourt</div>
              <div class="mp-meta"><div class="mp-meta-p"><div class="mp-meta-d"></div>2 beds</div><div class="mp-meta-p"><div class="mp-meta-d"></div>2 baths</div><div class="mp-meta-p"><div class="mp-meta-d"></div>78m²</div></div>
              <div class="mp-btns"><button class="mp-btn mp-btn-book">View</button><button class="mp-btn mp-btn-vt">Virtual</button></div>
            </div>
          </div>
  
          <!-- Prop 6 -->
          <div class="mp-card" data-type="sale" data-boosted="0">
            <div class="mp-img"><div class="mp-scene sky-6">
              <div class="pb" style="width:68px;height:78px;left:42px"></div>
              <div class="pw" style="width:10px;height:12px;left:51px;bottom:56px"></div><div class="pw" style="width:10px;height:12px;left:67px;bottom:56px"></div>
              <div class="pw" style="width:10px;height:12px;left:51px;bottom:37px"></div><div class="pw" style="width:10px;height:12px;left:67px;bottom:37px"></div>
              <div class="pb" style="width:50px;height:52px;left:130px"></div>
              <div class="pw" style="width:7px;height:9px;left:137px;bottom:35px"></div>
            </div>
            <span class="mp-tag tag-sale">Sale</span></div>
            <div class="mp-body">
              <div class="mp-price">₦62,500,000</div>
              <div class="mp-addr"><div class="mp-addr-dot"></div>Woji, Port Harcourt</div>
              <div class="mp-meta"><div class="mp-meta-p"><div class="mp-meta-d"></div>3 beds</div><div class="mp-meta-p"><div class="mp-meta-d"></div>2 baths</div><div class="mp-meta-p"><div class="mp-meta-d"></div>132m²</div></div>
              <div class="mp-btns"><button class="mp-btn mp-btn-book">View</button><button class="mp-btn mp-btn-vt">Virtual</button></div>
            </div>
          </div>
  
        </div>
  
        <!-- LISTING PAGINATION -->
        <div class="listing-pag">
          <button class="lp-btn"><svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M8 2L4 6l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>Prev</button>
          <button class="lp-btn active">1</button>
          <button class="lp-btn">2</button>
          <button class="lp-btn">3</button>
          <span style="font-size:12px;color:var(--text-s);padding:0 2px">…</span>
          <button class="lp-btn">7</button>
          <button class="lp-btn">Next<svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M4 2l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        </div>
      </div>
  
      <!-- REVIEWS -->
      <div class="p-card">
        <div class="p-card-head">
          <div class="p-card-title"><div class="p-card-dot"></div>Reviews</div>
          <div class="p-card-meta" id="reviewsMeta">214 verified reviews</div>
        </div>
        <div class="rev-summary">
          <div class="rev-big" id="bigRating">4.9</div>
          <div class="rev-star-col">
            <div class="rev-big-stars"><div class="rsf"></div><div class="rsf"></div><div class="rsf"></div><div class="rsf"></div><div class="rsf"></div></div>
            <div class="rev-cnt">Based on 214 reviews</div>
          </div>
          <div class="rev-bars">
            <div class="rb-row"><span class="rb-lbl">5</span><div class="rb-track"><div class="rb-fill" style="width:88%"></div></div><span class="rb-cnt">188</span></div>
            <div class="rb-row"><span class="rb-lbl">4</span><div class="rb-track"><div class="rb-fill" style="width:8%"></div></div><span class="rb-cnt">17</span></div>
            <div class="rb-row"><span class="rb-lbl">3</span><div class="rb-track"><div class="rb-fill" style="width:3%"></div></div><span class="rb-cnt">6</span></div>
            <div class="rb-row"><span class="rb-lbl">2</span><div class="rb-track"><div class="rb-fill" style="width:1%"></div></div><span class="rb-cnt">2</span></div>
            <div class="rb-row"><span class="rb-lbl">1</span><div class="rb-track"><div class="rb-fill" style="width:0%"></div></div><span class="rb-cnt">1</span></div>
          </div>
        </div>
        <div class="review-item">
          <div class="ri-top">
            <div class="ri-av" style="background:var(--ember)">FA</div>
            <div class="ri-meta"><div class="ri-name">Fatima Abubakar</div><div class="ri-sub">Rented via Blupodd · GRA Phase 2</div><div class="ri-stars"><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div></div></div>
            <div class="ri-date">March 2026</div>
          </div>
          <div class="ri-text">Chukwuemeka was absolutely professional from start to finish. He responded within hours, arranged a virtual tour for me (I was in Abuja at the time), and had all the paperwork ready the moment I confirmed. I've never had such a smooth rental experience in Nigeria.</div>
        </div>
        <div class="review-item">
          <div class="ri-top">
            <div class="ri-av" style="background:var(--sage)">BI</div>
            <div class="ri-meta"><div class="ri-name">Babatunde Ige</div><div class="ri-sub">Purchased · GRA Phase 3</div><div class="ri-stars"><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div></div></div>
            <div class="ri-date">January 2026</div>
          </div>
          <div class="ri-text">I was buying from the UK and was worried about being misled. From the first message to collecting my keys, Chukwuemeka kept me informed at every stage. The property was exactly as described. I've already referred him to three friends.</div>
        </div>
        <div class="review-item">
          <div class="ri-top">
            <div class="ri-av" style="background:var(--gold);color:var(--navy-deep)">CO</div>
            <div class="ri-meta"><div class="ri-name">Chioma Onwukaike</div><div class="ri-sub">Rented · Trans-Amadi</div><div class="ri-stars"><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-sf"></div><div class="ri-se"></div></div></div>
            <div class="ri-date">December 2025</div>
          </div>
          <div class="ri-text">Great communication and very knowledgeable about the area. Slight delay getting the tenancy agreement signed but overall a very positive experience. Would use again without hesitation.</div>
        </div>
      </div>
  
    </div>
  
    <!-- SIDEBAR -->
    <div class="profile-sidebar">
  
      <!-- Contact form -->
      <div class="sb-card" id="contactSection">
        <div class="sbc-head"><div class="sbc-title" id="sbcTitle">Send Chukwuemeka a message</div></div>
        <div class="sbc-body">
          <input class="mcf-input" type="text" id="mcfName" placeholder="Your full name">
          <input class="mcf-input" type="email" id="mcfEmail" placeholder="Your email address">
          <input class="mcf-input" type="tel" id="mcfPhone" placeholder="Phone (optional)">
          <select class="mcf-select" id="mcfType">
            <option value="">Type of enquiry</option>
            <option>Book an in-person viewing</option>
            <option>Book a virtual tour</option>
            <option>Price enquiry</option>
            <option>General question</option>
          </select>
          <textarea class="mcf-textarea" id="mcfMsg" placeholder="Your message…"></textarea>
          <button class="mcf-submit">
            Send message
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <p class="mcf-note" id="mcfNote">Usually responds within a few hours</p>
        </div>
      </div>
  
      <!-- Quick contact -->
      <div class="sb-card">
        <div class="sbc-head"><div class="sbc-title">Quick contact</div></div>
        <div class="qc-list">
          <a href="https://wa.me/2348001234567" class="qc-btn" target="_blank" rel="noopener">
            <div class="qc-icon" style="background:#25D366"><svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6 16.81c-.26.73-1.27 1.34-2.09 1.52-.56.12-1.29.21-3.74-.8-3.14-1.33-5.17-4.48-5.32-4.69-.15-.2-1.22-1.63-1.22-3.11 0-1.48.77-2.2 1.04-2.5.26-.29.58-.37.77-.37.19 0 .38 0 .55.01.17.01.41-.065.64.49.24.58.8 2 .87 2.14.07.14.12.3.02.49-.09.19-.14.3-.27.47-.14.17-.29.37-.42.5-.14.13-.28.28-.12.54.16.27.71 1.17 1.52 1.9.96.86 1.77 1.12 2.02 1.25.26.12.41.1.56-.06.16-.17.66-.77.83-1.04.17-.27.35-.22.58-.13.23.09 1.48.7 1.73.83.25.12.42.18.48.28.07.1.07.56-.2 1.29z"/></svg></div>
            <div><span class="qc-label">WhatsApp</span><span class="qc-sub">Chat directly · instant</span></div>
          </a>
          <a href="tel:+2348001234567" class="qc-btn">
            <div class="qc-icon" style="background:var(--navy-dark)"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M3 4a1 1 0 011-1h2.5a1 1 0 011 .75l.75 3a1 1 0 01-.3.97l-1.2 1.2a10.5 10.5 0 004.27 4.27l1.2-1.2a1 1 0 01.97-.3l3 .75A1 1 0 0117 13.5V16a1 1 0 01-1 1h-1C7.16 17 3 12.84 3 8V5a1 1 0 010-1z" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg></div>
            <div><span class="qc-label">Call directly</span><span class="qc-sub">+234 800 123 4567</span></div>
          </a>
          <a href="mailto:c.okafor@premierph.com" class="qc-btn">
            <div class="qc-icon" style="background:var(--ember-light)"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="#C06035" stroke-width="1.4"/><path d="M2 7l8 5 8-5" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg></div>
            <div><span class="qc-label">Email agent</span><span class="qc-sub">c.okafor@premierph.com</span></div>
          </a>
        </div>
      </div>
  
      <!-- Agent details -->
      <div class="sb-card">
        <div class="sbc-head"><div class="sbc-title">Agent details</div></div>
        <div class="sbc-body" style="padding:0 18px">
          <div class="adt-row"><span class="adt-lbl">Agency</span><span class="adt-val" id="dtAgency">Premier Properties PH</span></div>
          <div class="adt-row"><span class="adt-lbl">Role</span><span class="adt-val" id="dtRole">Principal Agent</span></div>
          <div class="adt-row"><span class="adt-lbl">Location</span><span class="adt-val">Port Harcourt, Rivers</span></div>
          <div class="adt-row"><span class="adt-lbl">Member since</span><span class="adt-val">April 2019</span></div>
          <div class="adt-row"><span class="adt-lbl">Response time</span><span class="adt-val adt-green">Under 2 hours</span></div>
          <div class="adt-row"><span class="adt-lbl">Virtual tours</span><span class="adt-val adt-green">Available</span></div>
          <div class="adt-row"><span class="adt-lbl">Licence</span><span class="adt-val">NIESV/2019/PH-0042</span></div>
        </div>
      </div>
  
    </div>
  </div>

   

   

</div>



<style>

/* PROFILE HERO */
.profile-hero{background:var(--navy-dark);padding-top:68px;position:relative;overflow:hidden}
.cover-strip{height:176px;background:linear-gradient(135deg,#060E1C 0%,#0A2463 40%,#1F3F6A 70%,#4A70A0 100%);position:relative;overflow:hidden}
.cover-ring{position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.06);pointer-events:none}
.cr1{width:320px;height:320px;right:-60px;bottom:-100px}
.cr2{width:200px;height:200px;right:80px;bottom:-30px;border-color:rgba(74,144,226,.1)}
.cr3{width:160px;height:160px;left:8%;top:-60px;border-color:rgba(255,255,255,.04)}
.profile-hero::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%);transition:background .3s;z-index:1}
.profile-inner{max-width:1300px;margin:0 auto;padding:0 5vw;position:relative;z-index:2}
.cover-crumb{position:absolute;top:14px;left:5vw;right:5vw;display:flex;align-items:center;gap:8px;font-size:12px;color:rgba(255,255,255,.38);flex-wrap:wrap;z-index:3}
.cover-crumb a{color:rgba(255,255,255,.56);text-decoration:none;transition:color .2s}
.cover-crumb a:hover{color:#fff}
.cover-crumb span{color:rgba(255,255,255,.22)}
.avatar-row{display:flex;align-items:flex-end;justify-content:space-between;transform:translateY(-30px);flex-wrap:wrap;gap:12px}
.agent-avatar{width:88px;height:88px;border-radius:50%;border:4px solid var(--navy-dark);display:flex;align-items:center;justify-content:center;font-family:'DM Sans',sans-serif;font-size:28px;font-weight:500;color:#fff;flex-shrink:0;transition:border-color .3s;text-decoration:none}
.gold-ring{box-shadow:0 0 0 2px var(--gold),0 0 0 5px rgba(212,174,58,.12)}
.profile-btns{display:flex;gap:10px;align-items:flex-end;padding-bottom:2px;flex-wrap:wrap}
.p-btn{font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:10px 20px;border-radius:40px;cursor:pointer;transition:all .2s;white-space:nowrap;display:flex;align-items:center;gap:7px;text-decoration:none}
.p-btn-wa{background:#25D366;color:#fff;border:none}
.p-btn-wa:hover{background:#1DA853}
.p-btn-primary{background:var(--ember);color:#fff;border:none}
.p-btn-primary:hover{background:var(--ember-deep)}
.p-btn-outline{background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.18)}
.p-btn-outline:hover{background:rgba(255,255,255,.14)}
.agent-info{padding:10px 0 36px;color:#fff}
.ai-name-row{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:5px}
.ai-name{font-family:'Cormorant Garamond',serif;font-size:clamp(26px,3.5vw,40px);font-weight:600;line-height:1.1}
.badge{display:inline-flex;align-items:center;gap:4px;border-radius:40px;padding:4px 12px;font-size:10px;font-weight:500;letter-spacing:.08em;text-transform:uppercase}
.badge-ver{background:rgba(74,120,72,.2);border:1px solid rgba(74,120,72,.35);color:#7DBF7A}
.badge-prem{background:rgba(212,174,58,.12);border:1px solid rgba(212,174,58,.28);color:var(--gold)}
.ai-agency{font-size:14px;color:rgba(255,255,255,.55);font-weight:300;margin-bottom:7px}
.ai-agency strong{color:rgba(255,255,255,.82);font-weight:500}
.ai-loc{font-size:13px;color:rgba(255,255,255,.42);display:flex;align-items:center;gap:6px;margin-bottom:13px}
.ai-loc-dot{width:5px;height:5px;border-radius:50%;background:var(--blue-bright)}
.ai-specs{display:flex;gap:7px;flex-wrap:wrap}
.ai-spec{font-size:11px;font-weight:500;padding:4px 11px;border-radius:20px;background:rgba(255,255,255,.07);color:rgba(255,255,255,.65);border:1px solid rgba(255,255,255,.11)}

/* STATS BAR */
.stats-bar{background:var(--navy-mid);border-top:1px solid rgba(255,255,255,.07)}
.sb-inner{max-width:1300px;margin:0 auto;padding:0 5vw;display:flex;flex-wrap:wrap}
.sb-stat{padding:17px 30px 17px 0;display:flex;align-items:center;gap:13px;border-right:1px solid rgba(255,255,255,.07);margin-right:30px}
.sb-stat:last-child{border-right:none;margin-right:0;padding-right:0}
.sb-icon{width:32px;height:32px;border-radius:8px;background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.sb-n{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:600;color:#fff;line-height:1}
.sb-l{font-size:10px;color:rgba(255,255,255,.38);text-transform:uppercase;letter-spacing:.08em;margin-top:2px}
.sb-stars{display:flex;gap:3px;margin-top:3px}
.sb-sf{width:9px;height:9px;border-radius:50%;background:var(--gold)}
.sb-se{width:9px;height:9px;border-radius:50%;background:rgba(255,255,255,.15)}


/* MAIN CONTENT */
.profile-main{max-width:1300px;margin:0 auto;padding:44px 5vw 80px;display:grid;grid-template-columns:1fr 320px;gap:40px;align-items:start}

/* CONTENT CARDS */
.p-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;margin-bottom:22px;overflow:hidden;transition:background .3s,border-color .3s}
.p-card:last-child{margin-bottom:0}
.p-card-head{padding:17px 22px 14px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;gap:10px}
.p-card-title{font-size:14px;font-weight:500;color:var(--text-p);display:flex;align-items:center;gap:7px}
.p-card-dot{width:6px;height:6px;border-radius:50%;background:var(--blue-bright)}
.p-card-meta{font-size:12px;color:var(--text-s)}
.p-card-body{padding:18px 22px 22px}


/* ABOUT */
.about-text{font-size:14px;font-weight:300;line-height:1.85;color:var(--text-s)}
.about-text p+p{margin-top:12px}
.lang-row{display:flex;gap:6px;flex-wrap:wrap;margin-top:14px;padding-top:14px;border-top:1px solid var(--border)}
.lang-pill{font-size:11px;padding:4px 10px;border-radius:20px;background:var(--bg-2);color:var(--text-s);border:1px solid var(--border);transition:background .3s}

/* LISTINGS FILTER TABS */
.listing-filter{display:flex;gap:6px;flex-wrap:wrap;padding:13px 22px;border-bottom:1px solid var(--border);align-items:center}
.lf-tab{font-size:12px;padding:5px 13px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;white-space:nowrap}
.lf-tab:hover,.lf-tab.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.lf-count{font-size:11px;color:var(--text-s);margin-left:auto;white-space:nowrap}

/* PROPERTY MINI GRID */
.mini-prop-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:18px 22px 22px}
.mp-card{background:var(--bg);border:1px solid var(--border);border-radius:14px;overflow:hidden;cursor:pointer;transition:transform .2s,box-shadow .2s,border-color .2s}
.mp-card:hover{transform:translateY(-3px);box-shadow:0 12px 32px var(--shadow-h);border-color:var(--blue-bright)}
.mp-img{height:140px;position:relative;overflow:hidden}
.mp-scene{width:100%;height:100%;position:relative}
.sky-1{background:linear-gradient(160deg,#0E2444 0%,#1F3F6A 55%,#4A70A0 100%)}
.sky-2{background:linear-gradient(160deg,#1F3F6A 0%,#4A70A0 60%,#8DAACC 100%)}
.sky-3{background:linear-gradient(160deg,#0A2463 0%,#0E2444 45%,#1F3F6A 100%)}
.sky-4{background:linear-gradient(160deg,#060E1C 0%,#0A2463 50%,#1F3F6A 100%)}
.sky-5{background:linear-gradient(160deg,#1A2E50 0%,#2E5078 60%,#5E8AB0 100%)}
.sky-6{background:linear-gradient(160deg,#0E2444 0%,#163660 50%,#2E5480 100%)}
.pb{position:absolute;bottom:0;background:rgba(255,255,255,.13);border-radius:3px 3px 0 0}
.pw{position:absolute;background:rgba(212,174,58,.65);border-radius:2px}
.mp-tag{position:absolute;top:9px;left:9px;font-size:9px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;padding:3px 9px;border-radius:20px}
.tag-rent{background:var(--tag-rent-bg);color:var(--tag-rent-text)}
.tag-sale{background:var(--tag-sale-bg);color:var(--tag-sale-text)}
.mp-boost{position:absolute;top:9px;right:9px;background:var(--gold);color:var(--navy-deep);font-size:8px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:2px 7px;border-radius:20px}
.mp-body{padding:10px 13px 13px}
.mp-price{font-family:'Cormorant Garamond',serif;font-size:18px;font-weight:600;color:var(--text-p);margin-bottom:2px}
.mp-price span{font-size:11px;font-weight:300;color:var(--text-s)}
.mp-addr{font-size:11px;color:var(--text-s);margin-bottom:8px;display:flex;align-items:center;gap:4px}
.mp-addr-dot{width:4px;height:4px;border-radius:50%;background:var(--blue-bright);flex-shrink:0}
.mp-meta{display:flex;gap:9px;padding-top:8px;border-top:1px solid var(--border);margin-bottom:9px}
.mp-meta-p{font-size:10px;color:var(--navy-accent);display:flex;align-items:center;gap:3px}
.mp-meta-d{width:4px;height:4px;border-radius:50%;background:var(--blue-bright)}
.mp-btns{display:flex;gap:5px}
.mp-btn{flex:1;font-family:'DM Sans',sans-serif;font-size:11px;font-weight:500;padding:7px 0;border-radius:40px;cursor:pointer;transition:all .2s;text-align:center}
.mp-btn-book{border:1px solid var(--border);background:none;color:var(--text-p)}
.mp-btn-book:hover{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
.mp-btn-vt{background:var(--sage-light);color:var(--sage);border:none}
.mp-btn-vt:hover{background:#D0DECC}
[data-theme="dark"] .mp-btn-vt{background:rgba(74,120,72,.2);color:#7DBF7A}
[data-theme="dark"] .mp-btn-vt:hover{background:rgba(74,120,72,.35)}
[data-theme="dark"] .mp-btn-book{border-color:rgba(255,255,255,.15);color:var(--text-p)}
[data-theme="dark"] .mp-btn-book:hover{background:rgba(255,255,255,.08)}

/* LISTINGS PAGINATION (within profile) */
.listing-pag{display:flex;align-items:center;justify-content:center;gap:5px;padding:14px 22px 18px;border-top:1px solid var(--border);flex-wrap:wrap}
.lp-btn{min-width:32px;height:32px;border-radius:7px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0 8px;gap:4px;transition:all .2s}
.lp-btn:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
.lp-btn.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}

/* VIEW ALL LINK */
.view-all-link{display:block;text-align:center;padding:13px 22px;border-top:1px solid var(--border);font-size:13px;font-weight:500;color:var(--blue-link);text-decoration:none;transition:background .2s}
.view-all-link:hover{background:var(--bg-2)}

/* REVIEWS */
.rev-summary{display:flex;gap:22px;align-items:center;padding:18px 22px;border-bottom:1px solid var(--border);flex-wrap:wrap}
.rev-big{font-family:'Cormorant Garamond',serif;font-size:54px;font-weight:600;color:var(--text-p);line-height:1}
.rev-star-col{display:flex;flex-direction:column;gap:5px}
.rev-big-stars{display:flex;gap:4px}
.rsf{width:14px;height:14px;border-radius:50%;background:var(--gold)}
.rse{width:14px;height:14px;border-radius:50%;background:var(--bg-3)}
.rev-cnt{font-size:12px;color:var(--text-s)}
.rev-bars{flex:1;min-width:150px}
.rb-row{display:flex;align-items:center;gap:7px;margin-bottom:5px}
.rb-lbl{font-size:11px;color:var(--text-s);width:12px;text-align:right}
.rb-track{flex:1;height:5px;border-radius:3px;background:var(--bg-3);overflow:hidden}
.rb-fill{height:100%;border-radius:3px;background:var(--gold)}
.rb-cnt{font-size:11px;color:var(--text-s);min-width:24px;text-align:right}
.review-item{padding:18px 22px;border-bottom:1px solid var(--border)}
.review-item:last-child{border-bottom:none}
.ri-top{display:flex;align-items:flex-start;gap:11px;margin-bottom:9px}
.ri-av{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:500;color:#fff;flex-shrink:0}
.ri-meta{flex:1}
.ri-name{font-size:14px;font-weight:500;color:var(--text-p)}
.ri-sub{font-size:12px;color:var(--text-s);margin-top:1px}
.ri-stars{display:flex;gap:3px;margin-top:4px}
.ri-sf{width:10px;height:10px;border-radius:50%;background:var(--gold)}
.ri-se{width:10px;height:10px;border-radius:50%;background:var(--bg-3)}
.ri-date{font-size:11px;color:var(--text-s);margin-left:auto;flex-shrink:0}
.ri-text{font-size:13px;color:var(--text-s);line-height:1.75;font-weight:300}

/* SIDEBAR */
.profile-sidebar{display:flex;flex-direction:column;gap:18px}
.sb-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;transition:background .3s,border-color .3s}
.sbc-head{padding:15px 20px 13px;border-bottom:1px solid var(--border)}
.sbc-title{font-size:13px;font-weight:500;color:var(--text-p)}
.sbc-body{padding:14px 18px 18px}
/* mini contact form */
.mcf-input,.mcf-select,.mcf-textarea{
  background:var(--input-bg);border:1px solid var(--input-border);border-radius:9px;
  padding:10px 12px;font-family:'DM Sans',sans-serif;font-size:13px;color:var(--input-text);
  outline:none;width:100%;margin-bottom:9px;transition:border-color .2s,background .3s
}
.mcf-input::placeholder,.mcf-textarea::placeholder{color:var(--text-s);font-weight:300}
.mcf-input:focus,.mcf-select:focus,.mcf-textarea:focus{border-color:var(--blue-link)}
.mcf-select{cursor:pointer;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238C8070' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 12px center;padding-right:30px}
.mcf-textarea{min-height:88px;resize:vertical;line-height:1.6;margin-bottom:11px}
.mcf-submit{width:100%;background:var(--navy-dark);color:#fff;border:none;border-radius:9px;padding:11px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:background .2s;display:flex;align-items:center;justify-content:center;gap:7px}
.mcf-submit:hover{background:var(--navy-mid)}
.mcf-note{font-size:11px;color:var(--text-s);text-align:center;margin-top:9px;line-height:1.5}
/* quick contact */
.qc-list{display:flex;flex-direction:column;gap:7px;padding:13px 18px}
.qc-btn{display:flex;align-items:center;gap:10px;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:none;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;text-decoration:none;text-align:left;width:100%}
.qc-btn:hover{border-color:var(--navy-dark);background:var(--bg-2)}
.qc-icon{width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.qc-label{font-size:13px;font-weight:500;color:var(--text-p);display:block;line-height:1.2}
.qc-sub{font-size:11px;color:var(--text-s);display:block;margin-top:1px}
/* agent detail table */
.adt-row{display:flex;justify-content:space-between;align-items:baseline;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px}
.adt-row:last-child{border-bottom:none}
.adt-lbl{color:var(--text-s);font-weight:300}
.adt-val{color:var(--text-p);font-weight:500;text-align:right;font-size:12px}
.adt-green{color:var(--sage)}
[data-theme="dark"] .adt-green{color:#7DBF7A}

/* RESPONSIVE */
@media(max-width:1020px){
  .profile-main{grid-template-columns:1fr}
  .profile-sidebar{order:-1;display:grid;grid-template-columns:1fr 1fr;gap:16px}
  .sb-card:first-child{grid-column:1/-1}
  .footer-top{grid-template-columns:1fr 1fr;gap:28px}
}
@media(max-width:768px){
  .nav-links{display:none}
  .nav-ham{display:flex}
  .cover-strip{height:140px}
  .avatar-row{transform:translateY(-22px)}
  .agent-avatar{width:72px;height:72px;font-size:22px}
  .profile-btns{gap:7px}
  .p-btn{padding:8px 14px;font-size:12px}
  .sb-inner{flex-wrap:wrap}
  .sb-stat{padding:12px 18px 12px 0;margin-right:18px}
  .mini-prop-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:560px){
  .mini-prop-grid{grid-template-columns:1fr}
  .profile-sidebar{display:flex;flex-direction:column}
  .rev-summary{flex-direction:column;align-items:flex-start;gap:14px}
  .footer-top{grid-template-columns:1fr}
  .footer-bottom{flex-direction:column;align-items:flex-start}
  .ai-name{font-size:24px}
  .p-btn-outline{display:none}
  .sb-stat{padding:10px 14px 10px 0;margin-right:14px}
}
</style>