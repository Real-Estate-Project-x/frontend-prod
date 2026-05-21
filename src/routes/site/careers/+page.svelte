<script lang="ts">
type PFileType = { file: File, preview: string };

let isModalOpen = $state(false);
let cvFile: HTMLInputElement;
let previewCV = $state<PFileType>();

const openModal = () => isModalOpen = true;

const closeModal = () => isModalOpen = false;

const handleCvUpload = () => {
    const f= cvFile.files[0];
    previewCV = { file: f, preview: URL.createObjectURL(f) };
}

const removeCV = () => previewCV = undefined;

const formatBytes = (bytes: number): number => {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / 1048576).toFixed(1) + ' MB';
}

</script>

{#if isModalOpen}
<!-- ════════════════════════
     APPLY MODAL
════════════════════════ -->
<div class="modal-wrap open" id="applyModal" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <div class="modal-bg" id="modalBg"></div>
    <div class="modal-box">
      <div class="modal-drag"></div>
      <div class="modal-header">
        <div>
          <div class="modal-role-dept" id="modalDept">Engineering</div>
          <div class="modal-role-title" id="modalTitle">Frontend Developer</div>
        </div>
        <button onclick={closeModal} class="modal-close" id="modalClose" aria-label="Close modal">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
  
      <div class="modal-body" id="modalBody">
        <!-- Personal details -->
        <div class="form-row two">
          <div class="form-field">
            <label class="form-label">Full name<span>*</span></label>
            <input id="fName" type="text" class="form-input" placeholder="Amara Okonkwo" autocomplete="name">
            <div class="form-error" id="fNameErr">Please enter your full name.</div>
          </div>
          <div class="form-field">
            <label class="form-label">Email address<span>*</span></label>
            <input id="fEmail" type="email" class="form-input" placeholder="amara@example.com" autocomplete="email">
            <div class="form-error" id="fEmailErr">Please enter a valid email address.</div>
          </div>
        </div>
  
        <div class="form-row two">
          <div class="form-field">
            <label class="form-label">Phone number<span>*</span></label>
            <input id="fPhone" type="tel" class="form-input" placeholder="+234 801 234 5678" autocomplete="tel">
            <div class="form-error" id="fPhoneErr">Please enter your phone number.</div>
          </div>
          <div class="form-field">
            <label class="form-label">LinkedIn <span style="color:var(--text-s);font-weight:400;">(optional)</span></label>
            <input id="fLinkedin" type="url" class="form-input" placeholder="linkedin.com/in/amara">
          </div>
        </div>
  
        <!-- CV Upload -->
        <div class="form-field">
          <label class="form-label">CV / Résumé<span>*</span></label>
          {#if !previewCV}
          <div onclick={() => cvFile.click()} 
            class="upload-zone" 
            id="cvZone" 
            role="button" 
            aria-label="Upload CV or Résumé"
          >
            <input type="file"  
                id="cvInput" 
                bind:this={cvFile} 
                onchange={handleCvUpload}
                accept=".pdf,.doc,.docx" 
                class="hidden"
            />
            <div class="uz-icon">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"><path d="M10 3v10M6 7l4-4 4 4" stroke="var(--blue-bright)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="2" y="14" width="16" height="4" rx="1.5" stroke="var(--text-s)" stroke-width="1.3"/></svg>
            </div>
            <div class="uz-label">Upload your CV</div>
            <div class="uz-hint">PDF, DOC, DOCX · Max 10MB</div>
          </div>
          {:else}
          {@const f = previewCV.file}
          <div class="uz-preview show" id="cvPreview">
            <div class="uz-file-icon">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="1" width="10" height="13" rx="1.5" stroke="var(--blue-bright)" stroke-width="1.3"/><path d="M5 5h6M5 8h6M5 11h4" stroke="var(--blue-bright)" stroke-width="1.2" stroke-linecap="round"/></svg>
            </div>
            <div style="min-width:0;flex:1;">
              <div class="uz-filename" id="cvFilename">{f.name}</div>
              <div class="uz-filesize" id="cvFilesize">{formatBytes(f.size)}</div>
            </div>
            <button class="uz-remove" 
                id="cvRemove" 
                type="button" 
                onclick={removeCV}>
                Remove
            </button>
          </div>
          {/if}
          <div class="form-error" id="fCvErr">Please upload your CV or résumé.</div>
        </div>
  
        <!-- Cover letter -->
        <div class="form-field">
          <label class="form-label">Cover letter <span style="color:var(--text-s);font-weight:400;">(optional)</span></label>
          <textarea id="fCover" class="form-textarea" placeholder="Tell us why you're excited about this role and what makes you a great fit…" rows="4"></textarea>
        </div>
  
        <!-- Additional message -->
        <div class="form-field">
          <label class="form-label">Anything else? <span style="color:var(--text-s);font-weight:400;">(optional)</span></label>
          <textarea id="fMessage" class="form-textarea" placeholder="Salary expectations, start date, portfolio links…" rows="3"></textarea>
        </div>
      </div>
  
      <div class="modal-footer">
        <button onclick={closeModal} class="modal-cancel" id="modalCancel">Cancel</button>
        <button class="modal-submit" id="modalSubmit">Submit application →</button>
      </div>
    </div>
  </div>
{/if}  

<!-- ════════════════════════
     HERO
════════════════════════ -->
<section class="careers-hero" id="top">

    <!-- Decorative arc rings -->
    <div class="hero-arc" style="width:400px;height:400px;"></div>
    <div class="hero-arc" style="width:640px;height:640px;border-color:rgba(74,144,226,.07);"></div>
    <div class="hero-arc" style="width:900px;height:900px;border-color:rgba(74,144,226,.04);"></div>
  
    <!-- Ambient orbs -->
    <div style="position:absolute;top:10%;right:10%;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(74,144,226,0.14) 0%,transparent 70%);pointer-events:none;"></div>
    <div style="position:absolute;bottom:15%;left:5%;width:280px;height:280px;border-radius:50%;background:radial-gradient(circle,rgba(192,96,53,0.08) 0%,transparent 70%);pointer-events:none;"></div>
  
    <!-- Hero SVG visual -->
    <div style="position:absolute;top:50%;right:5%;transform:translateY(-50%);opacity:0.08;pointer-events:none;" aria-hidden="true">
      <svg width="340" height="340" viewBox="0 0 340 340" fill="none">
        <!-- Abstract city grid lines -->
        <rect x="60" y="80"  width="70" height="200" rx="4" fill="white"/>
        <rect x="140" y="40" width="60" height="240" rx="4" fill="white"/>
        <rect x="210" y="100" width="80" height="180" rx="4" fill="white"/>
        <rect x="30"  y="120" width="22" height="160" rx="3" fill="white"/>
        <rect x="295" y="90"  width="16" height="190" rx="3" fill="white"/>
        <!-- Windows -->
        <rect x="72"  y="100" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="88"  y="100" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="104" y="100" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="72"  y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="88"  y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="104" y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="150" y="60"  width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="166" y="60"  width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="182" y="60"  width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="150" y="76"  width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="166" y="76"  width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="182" y="76"  width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="222" y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="238" y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="254" y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <rect x="268" y="116" width="10" height="8" rx="1" fill="rgba(0,0,0,0.3)"/>
        <!-- Road -->
        <rect x="0" y="280" width="340" height="20" rx="0" fill="white" opacity="0.4"/>
        <rect x="30" y="287" width="30" height="3" rx="1.5" fill="rgba(0,0,0,0.2)"/>
        <rect x="100" y="287" width="30" height="3" rx="1.5" fill="rgba(0,0,0,0.2)"/>
        <rect x="170" y="287" width="30" height="3" rx="1.5" fill="rgba(0,0,0,0.2)"/>
        <rect x="240" y="287" width="30" height="3" rx="1.5" fill="rgba(0,0,0,0.2)"/>
        <!-- Antenna top -->
        <rect x="166" y="22" width="4" height="20" rx="2" fill="white" opacity="0.6"/>
        <circle cx="168" cy="20" r="4" fill="white" opacity="0.8"/>
      </svg>
    </div>
  
    <div style="position:relative;z-index:2;width:100%">
      <div class="hero-eyebrow">
        <span class="eyebrow-dot"></span>
        We're hiring
      </div>
      <h1 class="hero-title">
        Build the future of<br>
        <em>real-estate in Africa</em>
      </h1>
      <p class="hero-sub">Join a team building smarter ways for people to discover homes, connect with agents, and experience property — everywhere.</p>
      <div class="hero-ctas">
        <a href="#open-roles" class="btn-primary">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="12" rx="2" stroke="white" stroke-width="1.4"/><path d="M5 3V2a3 3 0 0 1 6 0v1" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
          View open roles
        </a>
        <a href="#about" class="btn-ghost">
          Learn about Blupodd
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
  
      <!-- Stats row -->
      <div class="hero-stats">
        <div class="hero-stat">
          <div class="hs-num">38</div>
          <div class="hs-lbl">Team members</div>
        </div>
        <div class="hero-stat">
          <div class="hs-num">4</div>
          <div class="hs-lbl">Offices</div>
        </div>
        <div class="hero-stat">
          <div class="hs-num">3</div>
          <div class="hs-lbl">Yrs operating</div>
        </div>
      </div>
    </div>
</section>

<!-- ════════════════════════
     MISSION / ABOUT
════════════════════════ -->
<section class="mission-section" id="about">
    <div class="mission-arc" style="width:500px;height:500px;right:-200px;top:50%;transform:translateY(-50%);"></div>
    <div class="mission-arc" style="width:320px;height:320px;right:-120px;top:50%;transform:translateY(-50%);border-color:rgba(255,255,255,.04);"></div>
    <div class="mission-inner">
      <p style="font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:12px;">Our mission</p>
      <h2 class="mission-title">
        Making property discovery<br><em>transparent, seamless,</em><br>and trustworthy.
      </h2>
      <p class="mission-sub">Blupodd is a real-estate technology platform connecting home-seekers with verified agents and premium listings across Nigeria. We believe finding a home should feel as good as living in one.</p>
    </div>
</section>

<!-- ════════════════════════
     METRICS / CULTURE
════════════════════════ -->
<section class="metrics-section">
    <div style="max-width:1200px;margin:0 auto;">
      <p class="section-eyebrow">Life at Blupodd</p>
      <h2 class="section-title">A team built on trust,<br>driven by impact.</h2>
      <div class="metrics-grid" style="margin-top:52px;">
        <div class="metric-item">
          <div class="metric-num">4.8</div>
          <div class="metric-label">Employee rating</div>
        </div>
        <div class="metric-item">
          <div class="metric-num">92%</div>
          <div class="metric-label">Retention rate</div>
        </div>
        <div class="metric-item">
          <div class="metric-num">100%</div>
          <div class="metric-label">Remote-friendly</div>
        </div>
        <div class="metric-item">
          <div class="metric-num">14</div>
          <div class="metric-label">Open positions</div>
        </div>
      </div>
    </div>
</section>

<!-- ════════════════════════
     OPEN ROLES
════════════════════════ -->
<section class="roles-section" id="open-roles">
    <div style="max-width:1200px;margin:0 auto;padding:0 5vw;">
  
      <p class="section-eyebrow">Open positions</p>
      <h2 class="section-title" style="margin-bottom:6px;">Find your role<br>at Blupodd.</h2>
      <p class="section-sub" style="margin-bottom:36px;">14 open positions across engineering, marketing, sales, and product.</p>
  
      <!-- Department filters -->
      <div class="dept-tabs" id="deptTabs">
        <button class="dept-tab active" data-dept="all">All departments</button>
        <button class="dept-tab" data-dept="engineering">Engineering</button>
        <button class="dept-tab" data-dept="marketing">Marketing</button>
        <button class="dept-tab" data-dept="sales">Sales &amp; Ops</button>
        <button class="dept-tab" data-dept="product">Product</button>
      </div>
  
      <!-- Roles grid -->
      <div class="roles-grid" id="rolesGrid">
  
        <!-- ── Engineering ── -->
        <article class="role-card" data-dept="engineering">
          <div class="rc-dept-row">
            <span class="rc-dept dept-eng">Engineering</span>
            <span class="rc-posted">2 days ago</span>
          </div>
          <h3 class="rc-title">Frontend Developer</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Remote / Lagos
          </div>
          <p class="rc-summary">Build elegant, performant interfaces for Blupodd's property discovery platform using SvelteKit and TailwindCSS.</p>
          <div class="rc-tags">
            <span class="rc-tag">SvelteKit</span><span class="rc-tag">TailwindCSS</span><span class="rc-tag">TypeScript</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-remote">Remote</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="engineering">
          <div class="rc-dept-row">
            <span class="rc-dept dept-eng">Engineering</span>
            <span class="rc-posted">3 days ago</span>
          </div>
          <h3 class="rc-title">Backend Developer</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Lagos / Hybrid
          </div>
          <p class="rc-summary">Design and maintain scalable APIs powering Blupodd's listings engine, search infrastructure, and agent management system.</p>
          <div class="rc-tags">
            <span class="rc-tag">NestJS</span><span class="rc-tag">PostgreSQL</span><span class="rc-tag">Redis</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-hybrid">Hybrid</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="engineering">
          <div class="rc-dept-row">
            <span class="rc-dept dept-eng">Engineering</span>
            <span class="rc-posted">1 week ago</span>
          </div>
          <h3 class="rc-title">Mobile Developer</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Remote
          </div>
          <p class="rc-summary">Build Blupodd's native mobile experience for iOS and Android, including virtual tour flows and real-time agent messaging.</p>
          <div class="rc-tags">
            <span class="rc-tag">React Native</span><span class="rc-tag">Expo</span><span class="rc-tag">TypeScript</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-remote">Remote</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="engineering">
          <div class="rc-dept-row">
            <span class="rc-dept dept-eng">Engineering</span>
            <span class="rc-posted">5 days ago</span>
          </div>
          <h3 class="rc-title">Product Designer</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Remote / Lagos
          </div>
          <p class="rc-summary">Shape Blupodd's product experience from search to checkout — defining flows, building components, and raising the design bar.</p>
          <div class="rc-tags">
            <span class="rc-tag">Figma</span><span class="rc-tag">UX Research</span><span class="rc-tag">Design Systems</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-remote">Remote</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <!-- ── Marketing ── -->
        <article class="role-card" data-dept="marketing">
          <div class="rc-dept-row">
            <span class="rc-dept dept-mkt">Marketing</span>
            <span class="rc-posted">4 days ago</span>
          </div>
          <h3 class="rc-title">Growth Marketing Specialist</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Lagos / Remote
          </div>
          <p class="rc-summary">Drive Blupodd's user acquisition and retention strategy across paid, SEO, and partnership channels.</p>
          <div class="rc-tags">
            <span class="rc-tag">Performance Marketing</span><span class="rc-tag">SEO</span><span class="rc-tag">Analytics</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-hybrid">Hybrid</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="marketing">
          <div class="rc-dept-row">
            <span class="rc-dept dept-mkt">Marketing</span>
            <span class="rc-posted">1 week ago</span>
          </div>
          <h3 class="rc-title">Content Strategist</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Remote
          </div>
          <p class="rc-summary">Own Blupodd's editorial voice — from real-estate guides and neighbourhood profiles to agent success stories and platform narratives.</p>
          <div class="rc-tags">
            <span class="rc-tag">Content</span><span class="rc-tag">SEO Writing</span><span class="rc-tag">Strategy</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-remote">Remote</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="marketing">
          <div class="rc-dept-row">
            <span class="rc-dept dept-mkt">Marketing</span>
            <span class="rc-posted">2 weeks ago</span>
          </div>
          <h3 class="rc-title">Brand Marketing Associate</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Lagos
          </div>
          <p class="rc-summary">Help build Blupodd's presence across social, events, and community channels while maintaining our premium, trustworthy voice.</p>
          <div class="rc-tags">
            <span class="rc-tag">Brand</span><span class="rc-tag">Social Media</span><span class="rc-tag">Community</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-hybrid">Hybrid</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <!-- ── Sales / Ops ── -->
        <article class="role-card" data-dept="sales">
          <div class="rc-dept-row">
            <span class="rc-dept dept-sales">Sales &amp; Ops</span>
            <span class="rc-posted">3 days ago</span>
          </div>
          <h3 class="rc-title">Real Estate Partnerships Manager</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Lagos / Abuja
          </div>
          <p class="rc-summary">Build and grow Blupodd's agency and developer partnerships — onboarding new partners and deepening relationships with top-performing agencies.</p>
          <div class="rc-tags">
            <span class="rc-tag">B2B Sales</span><span class="rc-tag">Partnerships</span><span class="rc-tag">Real Estate</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-hybrid">Hybrid</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="sales">
          <div class="rc-dept-row">
            <span class="rc-dept dept-sales">Sales &amp; Ops</span>
            <span class="rc-posted">1 week ago</span>
          </div>
          <h3 class="rc-title">Customer Success Associate</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Remote / Lagos
          </div>
          <p class="rc-summary">Support Blupodd's agents and home-seekers throughout their property journey — resolving issues quickly and building long-term loyalty.</p>
          <div class="rc-tags">
            <span class="rc-tag">Customer Success</span><span class="rc-tag">CRM</span><span class="rc-tag">Communication</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-remote">Remote</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="sales">
          <div class="rc-dept-row">
            <span class="rc-dept dept-sales">Sales &amp; Ops</span>
            <span class="rc-posted">2 weeks ago</span>
          </div>
          <h3 class="rc-title">Sales Executive</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Port Harcourt / Abuja
          </div>
          <p class="rc-summary">Drive new agent subscriptions and listing revenue across target markets, with a focus on independent agents and boutique agencies.</p>
          <div class="rc-tags">
            <span class="rc-tag">Sales</span><span class="rc-tag">B2B</span><span class="rc-tag">Real Estate</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-hybrid">Hybrid</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <!-- ── Product ── -->
        <article class="role-card" data-dept="product">
          <div class="rc-dept-row">
            <span class="rc-dept dept-prod">Product</span>
            <span class="rc-posted">6 days ago</span>
          </div>
          <h3 class="rc-title">Product Manager</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Lagos / Remote
          </div>
          <p class="rc-summary">Own key product surfaces across Blupodd's marketplace — from search and discovery to agent tools and listing analytics.</p>
          <div class="rc-tags">
            <span class="rc-tag">Product Strategy</span><span class="rc-tag">Roadmap</span><span class="rc-tag">Data</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-hybrid">Hybrid</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
        <article class="role-card" data-dept="product">
          <div class="rc-dept-row">
            <span class="rc-dept dept-prod">Product</span>
            <span class="rc-posted">3 weeks ago</span>
          </div>
          <h3 class="rc-title">Operations Associate</h3>
          <div class="rc-loc">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M7 1C5 1 3 2.79 3 5c0 2.76 4 8 4 8s4-5.24 4-8c0-2.21-2-4-4-4z" stroke="currentColor" stroke-width="1.3"/><circle cx="7" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
            Lagos
          </div>
          <p class="rc-summary">Support Blupodd's operational processes — from agent onboarding and listing verification to cross-functional project coordination.</p>
          <div class="rc-tags">
            <span class="rc-tag">Operations</span><span class="rc-tag">Process</span><span class="rc-tag">Coordination</span>
          </div>
          <div class="rc-footer">
            <div class="rc-type-row">
              <span class="rc-badge badge-ft">Full Time</span>
              <span class="rc-badge badge-contract">Contract</span>
            </div>
            <button class="apply-btn" onclick={openModal}>Apply</button>
          </div>
        </article>
  
      </div><!-- /roles-grid -->
  
      <!-- Pagination -->
      <div class="pagination">
        <button class="page-btn nav-arrow">
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M7.5 2.5L4 6l3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Prev
        </button>
        <button class="page-btn active">1</button>
        <button class="page-btn">2</button>
        <span class="page-ellipsis">…</span>
        <button class="page-btn">5</button>
        <button class="page-btn nav-arrow">
          Next
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L8 6l-3.5 3.5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
      </div>
  
    </div>
  </section>
  

<!-- ════════════════════════
     WHY JOIN
════════════════════════ -->
<section class="why-section">
    <div style="max-width:1200px;margin:0 auto;">
      <p class="section-eyebrow">Why Blupodd</p>
      <h2 class="section-title">More than a job.<br>A meaningful career.</h2>
      <p class="section-sub" style="margin-top:10px;max-width:520px;">We offer the environment, tools, and people to help you do your best work — and grow beyond it.</p>
  
      <div class="why-grid">
        <!-- Card 1 -->
        <div class="why-card">
          <div class="wc-icon" style="background:rgba(74,144,226,.1);">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2l2 4h5l-4 3 1.5 5L10 11l-4.5 3L7 9 3 6h5L10 2Z" stroke="var(--blue-bright)" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="wc-num">01</div>
          <div class="wc-head">Real impact, from day one</div>
          <div class="wc-body">Your work ships to thousands of property seekers across Nigeria. We move fast, build with care, and make sure every contribution counts.</div>
        </div>
        <!-- Card 2 -->
        <div class="why-card">
          <div class="wc-icon" style="background:rgba(212,174,58,.1);">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="7.5" stroke="var(--gold)" stroke-width="1.4"/>
              <path d="M7 10l2.5 2.5 4-5" stroke="var(--gold)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="wc-num">02</div>
          <div class="wc-head">Flexible, remote-first culture</div>
          <div class="wc-body">Work from Lagos, Abuja, Port Harcourt, or anywhere. We trust our team to deliver great work, wherever they are most productive.</div>
        </div>
        <!-- Card 3 -->
        <div class="why-card">
          <div class="wc-icon" style="background:rgba(74,120,72,.1);">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M10 2C6.13 2 3 5.13 3 9c0 5 7 11 7 11s7-6 7-11c0-3.87-3.13-7-7-7Z" stroke="var(--sage)" stroke-width="1.4"/>
              <circle cx="10" cy="9" r="2.5" stroke="var(--sage)" stroke-width="1.4"/>
            </svg>
          </div>
          <div class="wc-num">03</div>
          <div class="wc-head">Growth opportunities</div>
          <div class="wc-body">Regular 1:1s, learning stipends, and a culture of candid feedback. We invest in your career trajectory, not just the role you join with.</div>
        </div>
        <!-- Card 4 -->
        <div class="why-card">
          <div class="wc-icon" style="background:rgba(192,96,53,.1);">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10h12M10 4v12" stroke="var(--ember)" stroke-width="1.5" stroke-linecap="round"/>
              <rect x="2" y="2" width="16" height="16" rx="3" stroke="var(--ember)" stroke-width="1.4"/>
            </svg>
          </div>
          <div class="wc-num">04</div>
          <div class="wc-head">Competitive compensation</div>
          <div class="wc-body">Market-rate salaries, health insurance, performance bonuses, and equity options for senior roles. We believe in rewarding great work fairly.</div>
        </div>
        <!-- Card 5 -->
        <div class="why-card">
          <div class="wc-icon" style="background:rgba(74,144,226,.1);">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="7" cy="7" r="3.5" stroke="var(--blue-bright)" stroke-width="1.4"/>
              <circle cx="14" cy="7" r="2.8" stroke="var(--blue-bright)" stroke-width="1.4"/>
              <path d="M1 17c0-2.76 2.46-5 5.5-5s5.5 2.24 5.5 5" stroke="var(--blue-bright)" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M15 12c2 0 4 1.3 4 4" stroke="var(--blue-bright)" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="wc-num">05</div>
          <div class="wc-head">A collaborative, smart team</div>
          <div class="wc-body">Work alongside product thinkers, technologists, and real-estate experts who take craft seriously and support each other unconditionally.</div>
        </div>
        <!-- Card 6 -->
        <div class="why-card">
          <div class="wc-icon" style="background:rgba(212,174,58,.1);">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 5h14v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5Z" stroke="var(--gold)" stroke-width="1.4"/>
              <path d="M7 9h6M7 13h4" stroke="var(--gold)" stroke-width="1.4" stroke-linecap="round"/>
              <path d="M3 5l4-3h6l4 3" stroke="var(--gold)" stroke-width="1.4" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="wc-num">06</div>
          <div class="wc-head">Meaningful challenges</div>
          <div class="wc-body">Nigeria's real-estate market has deep, complex problems worth solving. You'll work on infrastructure that changes how millions of people find their homes.</div>
        </div>
      </div>
    </div>
</section>

<!-- ════════════════════════
     CTA FOOTER
════════════════════════ -->
<section class="cta-section">
    <div style="max-width:680px;margin:0 auto;">
      <p style="font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--navy-accent);margin-bottom:12px;" class="section-eyebrow">Don't see your role?</p>
      <h2 class="cta-title">We always want to hear<br>from exceptional people.</h2>
      <p class="cta-sub">Send us a message introducing yourself, and we'll reach out when a relevant position opens up. Great talent doesn't have an expiry date.</p>
      <div class="cta-btns">
        <button class="cta-primary" onclick={openModal}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 14l4-4m0 0L8 2l2 8 2-6 2 6" stroke="white" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Send an open application
        </button>
        <a href="mailto:careers@blupodd.com" class="cta-secondary">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="3" width="14" height="10" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M1 5l7 5 7-5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
          Email us directly
        </a>
      </div>
    </div>
  </section>





<style>
    :root{
      --navy-deep:#060E1C;--navy-dark:#0A2463;--navy-mid:#0E2444;--navy-strong:#1F3F6A;
      --navy-accent:#4A70A0;--blue-bright:#4A90E2;--blue-link:#1A6ADE;
      --chalk:#FEFCF8;--chalk-2:#F7F3EC;--chalk-3:#EDE7DC;--chalk-4:#D8CEBC;--chalk-muted:#8C8070;
      --ember:#C06035;--ember-light:#F5D5C5;--ember-deep:#5C2416;
      --gold:#D4AE3A;--sage:#4A7848;--sage-light:#EFF3EE;
      --bg:var(--chalk);--bg-2:var(--chalk-2);--bg-3:var(--chalk-3);
      --surface:#fff;--text-p:var(--navy-dark);--text-s:var(--chalk-muted);
      --border:var(--chalk-3);--card-bg:#fff;
      --nav-bg:var(--navy-dark);--footer-bg:var(--navy-dark);
      --shadow:rgba(10,36,99,.08);--shadow-h:rgba(10,36,99,.16);
    }
    :global([data-theme="dark"]){
      --bg:#0B111E;--bg-2:#111826;--bg-3:#1A2438;--surface:#131C2E;
      --text-p:#E8EDF5;--text-s:#6A7FA0;--border:rgba(255,255,255,.08);
      --card-bg:#131C2E;
      --nav-bg:#080F1C;--footer-bg:#080F1C;
      --shadow:rgba(0,0,0,.3);--shadow-h:rgba(0,0,0,.55);
    }
    
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;overflow-x:hidden}
    body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text-p);overflow-x:hidden;transition:background .3s,color .3s;min-height:100vh}
    
    /* ── NAV ── */
    nav{position:fixed;top:0;left:0;right:0;z-index:200;background:var(--nav-bg);display:flex;align-items:center;justify-content:space-between;padding:0 5vw;height:68px;border-bottom:1px solid rgba(255,255,255,.07);transition:background .3s}
    .nav-logo{display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0}
    .nav-wordmark{font-size:18px;font-weight:500;letter-spacing:.18em;color:#fff}
    .nav-links{display:flex;align-items:center;gap:28px;list-style:none}
    .nav-links a{font-size:13px;color:rgba(255,255,255,.6);text-decoration:none;transition:color .2s;letter-spacing:.04em}
    .nav-links a:hover{color:#fff}
    .nav-links a.active{color:#fff;border-bottom:2px solid var(--blue-bright);padding-bottom:2px}
    .nav-cta{background:var(--ember)!important;color:#fff!important;padding:8px 20px!important;border-radius:40px;font-weight:500!important;border-bottom:none!important;transition:background .2s!important}
    .nav-cta:hover{background:var(--ember-deep)!important}
    .nav-right{display:flex;align-items:center;gap:14px}
    
    /* Dark mode toggle (pill) */
    .dm-toggle{width:44px;height:24px;border-radius:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);cursor:pointer;position:relative;transition:background .3s;flex-shrink:0;outline:none}
    .dm-toggle::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .3s}
    :global([data-theme="dark"]) .dm-toggle{background:rgba(74,144,226,.35);border-color:rgba(74,144,226,.45)}
    :global([data-theme="dark"]) .dm-toggle::after{transform:translateX(20px);background:var(--blue-bright)}
    
    /* Hamburger */
    .hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;padding:6px;cursor:pointer;background:none;border:none;flex-shrink:0}
    .hamburger span{display:block;height:1.5px;background:rgba(255,255,255,.75);border-radius:2px;transition:all .25s}
    .hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
    .hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
    .hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
    .mobile-nav{display:none;position:fixed;top:68px;left:0;right:0;z-index:199;background:var(--nav-bg);border-top:1px solid rgba(255,255,255,.07);padding:16px 5vw 20px;transition:background .3s}
    .mobile-nav.open{display:block}
    .mobile-nav ul{list-style:none;display:flex;flex-direction:column;gap:2px}
    .mobile-nav ul a{display:block;font-size:14px;color:rgba(255,255,255,.7);text-decoration:none;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);transition:color .2s;letter-spacing:.04em}
    .mobile-nav ul a:hover,.mobile-nav ul a.active{color:#fff}
    .mobile-nav ul li:last-child a{border-bottom:none;color:#fff;background:var(--ember);padding:10px 20px;border-radius:40px;text-align:center;font-weight:500;margin-top:8px}
    
    /* ── HERO ── */
    .careers-hero{background:var(--navy-dark);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 5vw 80px;position:relative;overflow:hidden;text-align:center}
    .careers-hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:56px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%)}
    :global([data-theme="dark"]) .careers-hero::after{background:#0B111E}
    
    /* Hero arc decorations */
    .hero-arc{position:absolute;border-radius:50%;border:1px solid rgba(74,144,226,.1);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
    
    /* Hero content */
    .hero-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:14px;display:flex;align-items:center;justify-content:center;gap:8px}
    .eyebrow-dot{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);animation:pulse 2.2s ease-in-out infinite}
    @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(74,144,226,.4)}50%{box-shadow:0 0 0 7px rgba(74,144,226,0)}}
    .hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(36px,6vw,82px);font-weight:300;color:#fff;line-height:1.06;margin-bottom:20px;max-width:820px}
    .hero-title em{font-style:italic;color:var(--blue-bright)}
    .hero-sub{font-size:16px;font-weight:300;color:rgba(255,255,255,.55);max-width:520px;line-height:1.75;margin:0 auto 36px}
    .hero-ctas{display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;margin-bottom:56px}
    .btn-primary{background:var(--ember);color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 36px;border-radius:40px;border:none;cursor:pointer;text-decoration:none;transition:background .2s,transform .15s;display:inline-flex;align-items:center;gap:8px}
    .btn-primary:hover{background:var(--ember-deep);transform:scale(1.02)}
    .btn-ghost{background:transparent;color:rgba(255,255,255,.75);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:400;padding:14px 36px;border-radius:40px;border:1px solid rgba(255,255,255,.2);cursor:pointer;text-decoration:none;transition:border-color .2s,color .2s;display:inline-flex;align-items:center;gap:8px}
    .btn-ghost:hover{border-color:rgba(255,255,255,.5);color:#fff}
    
    /* Hero stats row */
    .hero-stats{display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;border:1px solid rgba(255,255,255,.08);border-radius:16px;overflow:hidden;max-width:560px;margin:0 auto}
    .hero-stat{padding:18px 36px;text-align:center;border-right:1px solid rgba(255,255,255,.07);flex:1;min-width:120px}
    .hero-stat:last-child{border-right:none}
    .hs-num{font-family:'Cormorant Garamond',serif;font-size:28px;font-weight:400;color:#fff;line-height:1.1}
    .hs-lbl{font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-top:3px}
    
    /* ── SECTION COMMON ── */
    .section-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--navy-accent);margin-bottom:10px}
    :global([data-theme="dark"]) .section-eyebrow{color:var(--blue-bright)}
    .section-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,52px);font-weight:300;color:var(--text-p);line-height:1.12;margin-bottom:8px}
    .section-sub{font-size:14px;color:var(--text-s);font-weight:300;line-height:1.75}
    
    /* ── WHY JOIN ── */
    .why-section{background:var(--bg);padding:96px 5vw;transition:background .3s}
    .why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-top:52px}
    .why-card{padding:36px 32px;background:var(--surface);transition:background .3s,transform .22s}
    .why-card:hover{background:var(--bg-2);transform:translateY(-2px)}
    .wc-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:18px;flex-shrink:0}
    .wc-num{font-family:'Cormorant Garamond',serif;font-size:13px;font-weight:400;color:var(--text-s);letter-spacing:.08em;margin-bottom:10px}
    .wc-head{font-size:15px;font-weight:500;color:var(--text-p);margin-bottom:8px;letter-spacing:.01em}
    .wc-body{font-size:13px;color:var(--text-s);font-weight:300;line-height:1.7}
    
    /* ── ROLES SECTION ── */
    .roles-section{background:var(--bg-2);padding:96px 0;transition:background .3s}
    :global([data-theme="dark"]) .roles-section{background:#111826}
    
    /* Department filter tabs */
    .dept-tabs{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:36px}
    .dept-tab{font-size:12px;font-weight:500;padding:7px 18px;border-radius:40px;border:1px solid var(--border);background:none;color:var(--text-s);cursor:pointer;transition:all .2s;font-family:'DM Sans',sans-serif;flex-shrink:0;letter-spacing:.02em}
    .dept-tab:hover{border-color:var(--navy-dark);color:var(--text-p)}
    .dept-tab.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
    :global([data-theme="dark"]) .dept-tab.active{background:var(--blue-bright);border-color:var(--blue-bright)}
    
    /* Role cards grid */
    .roles-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:16px}
    
    /* Role card */
    .role-card{background:var(--card-bg);border:1px solid var(--border);border-radius:18px;padding:24px;cursor:pointer;transition:transform .22s,box-shadow .22s,border-color .2s;position:relative;overflow:hidden}
    .role-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:transparent;transition:background .22s}
    .role-card:hover{transform:translateY(-3px);box-shadow:0 16px 48px var(--shadow-h);border-color:var(--blue-bright)}
    .role-card:hover::before{background:var(--blue-bright)}
    .rc-dept-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
    .rc-dept{font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;padding:3px 10px;border-radius:20px}
    .dept-eng{background:rgba(74,144,226,.12);color:var(--blue-link)}
    .dept-mkt{background:rgba(212,174,58,.12);color:#8A6A10}
    .dept-sales{background:rgba(192,96,53,.1);color:var(--ember)}
    .dept-prod{background:rgba(74,120,72,.1);color:var(--sage)}
    :global([data-theme="dark"]) .dept-eng{background:rgba(74,144,226,.18);color:#7BB8F0}
    :global([data-theme="dark"]) .dept-mkt{background:rgba(212,174,58,.16);color:var(--gold)}
    :global([data-theme="dark"]) .dept-sales{background:rgba(192,96,53,.18);color:#EDBA9B}
    :global([data-theme="dark"]) .dept-prod{background:rgba(74,120,72,.18);color:#7DBF7A}
    .rc-posted{font-size:11px;color:var(--text-s)}
    .rc-title{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:400;color:var(--text-p);margin-bottom:4px;line-height:1.2}
    .rc-loc{font-size:12px;color:var(--text-s);display:flex;align-items:center;gap:5px;margin-bottom:12px}
    .rc-summary{font-size:13px;color:var(--text-s);font-weight:300;line-height:1.65;margin-bottom:16px}
    .rc-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:18px}
    .rc-tag{font-size:11px;color:var(--text-s);background:var(--bg-2);border:1px solid var(--border);padding:3px 10px;border-radius:20px}
    :global([data-theme="dark"]) .rc-tag{background:rgba(255,255,255,.05)}
    .rc-footer{display:flex;align-items:center;justify-content:space-between;padding-top:16px;border-top:1px solid var(--border)}
    .rc-type-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap}
    .rc-badge{font-size:10px;font-weight:500;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:20px}
    .badge-ft{background:var(--sage-light);color:var(--sage)}
    .badge-remote{background:rgba(74,144,226,.1);color:var(--blue-link)}
    .badge-hybrid{background:rgba(212,174,58,.1);color:#8A6A10}
    .badge-contract{background:var(--ember-light);color:var(--ember-deep)}
    :global([data-theme="dark"]) .badge-ft{background:rgba(74,120,72,.2);color:#7DBF7A}
    :global([data-theme="dark"]) .badge-remote{background:rgba(74,144,226,.18);color:#7BB8F0}
    :global([data-theme="dark"]) .badge-hybrid{background:rgba(212,174,58,.16);color:var(--gold)}
    :global([data-theme="dark"]) .badge-contract{background:rgba(192,96,53,.18);color:#EDBA9B}
    .apply-btn{font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;background:var(--navy-dark);color:#fff;border:none;padding:9px 22px;border-radius:40px;cursor:pointer;transition:background .2s,transform .15s;white-space:nowrap;flex-shrink:0}
    .apply-btn:hover{background:var(--navy-mid);transform:scale(1.02)}
    :global([data-theme="dark"]) .apply-btn{background:var(--blue-bright);color:#fff}
    :global([data-theme="dark"]) .apply-btn:hover{background:#3A78CA}
    
    /* ── PAGINATION ── */
    .pagination{display:flex;align-items:center;justify-content:center;gap:6px;padding:48px 5vw 0;flex-wrap:wrap}
    .page-btn{width:36px;height:36px;border-radius:8px;border:1px solid var(--border);background:none;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0}
    .page-btn:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
    .page-btn.active{background:var(--navy-dark);color:#fff;border-color:var(--navy-dark)}
    :global([data-theme="dark"]) .page-btn.active{background:var(--blue-bright);border-color:var(--blue-bright)}
    .page-btn.nav-arrow{width:auto;padding:0 16px;gap:5px;font-size:12px;letter-spacing:.02em}
    .page-ellipsis{font-size:13px;color:var(--text-s);padding:0 4px}
    
    /* ── MISSION STRIP ── */
    .mission-section{background:var(--navy-dark);padding:96px 5vw;position:relative;overflow:hidden}
    .mission-inner{max-width:880px;position:relative;z-index:2}
    .mission-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,52px);font-weight:300;color:#fff;line-height:1.12;margin-bottom:20px}
    .mission-title em{font-style:italic;color:var(--blue-bright)}
    .mission-sub{font-size:15px;font-weight:300;color:rgba(255,255,255,.5);line-height:1.8;max-width:600px}
    .mission-arc{position:absolute;border-radius:50%;border:1px solid rgba(255,255,255,.05);pointer-events:none}
    
    /* ── CULTURE METRICS ── */
    .metrics-section{background:var(--bg);padding:96px 5vw;transition:background .3s}
    .metrics-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--border);border-radius:20px;overflow:hidden;margin-top:52px}
    .metric-item{padding:36px 28px;text-align:center;border-right:1px solid var(--border);transition:background .3s}
    .metric-item:last-child{border-right:none}
    .metric-item:hover{background:var(--bg-2)}
    .metric-num{font-family:'Cormorant Garamond',serif;font-size:48px;font-weight:300;color:var(--text-p);line-height:1;margin-bottom:6px}
    .metric-label{font-size:11px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s)}
    
    /* ── CTA FOOTER ── */
    .cta-section{background:var(--bg-2);padding:96px 5vw;text-align:center;transition:background .3s}
    :global([data-theme="dark"]) .cta-section{background:#111826}
    .cta-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,4vw,52px);font-weight:300;color:var(--text-p);margin-bottom:14px;line-height:1.12}
    .cta-sub{font-size:14px;color:var(--text-s);font-weight:300;max-width:480px;margin:0 auto 36px;line-height:1.75}
    .cta-btns{display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap}
    .cta-primary{background:var(--navy-dark);color:#fff;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;padding:14px 36px;border-radius:40px;border:none;cursor:pointer;transition:background .2s,transform .15s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
    .cta-primary:hover{background:var(--navy-mid);transform:scale(1.02)}
    .cta-secondary{background:transparent;color:var(--text-p);font-family:'DM Sans',sans-serif;font-size:14px;font-weight:400;padding:14px 36px;border-radius:40px;border:1px solid var(--border);cursor:pointer;transition:all .2s;text-decoration:none;display:inline-flex;align-items:center;gap:8px}
    .cta-secondary:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
    :global([data-theme="dark"]) .cta-secondary:hover{border-color:var(--blue-bright);color:var(--blue-bright)}
    

    /* ── MODAL ── */
    .modal-wrap{position:fixed;inset:0;z-index:500;display:none;align-items:flex-end;justify-content:center;padding:0}
    @media(min-width:640px){.modal-wrap{align-items:center;padding:24px}}
    .modal-wrap.open{display:flex}
    .modal-bg{position:absolute;inset:0;background:rgba(6,14,28,.65);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px)}
    .modal-box{position:relative;z-index:10;background:var(--surface);border:1px solid var(--border);border-radius:24px 24px 0 0;width:100%;max-width:600px;max-height:94vh;display:flex;flex-direction:column;box-shadow:0 24px 80px rgba(6,14,28,.4);overflow:hidden;animation:slideUp .28s cubic-bezier(.22,.68,0,1.2) both}
    @media(min-width:640px){.modal-box{border-radius:20px;animation:scaleIn .26s cubic-bezier(.22,.68,0,1.2) both}}
    @keyframes slideUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .modal-drag{width:40px;height:4px;border-radius:2px;background:var(--border);margin:12px auto 0;flex-shrink:0}
    @media(min-width:640px){.modal-drag{display:none}}
    .modal-header{padding:20px 24px 16px;border-bottom:1px solid var(--border);flex-shrink:0;display:flex;align-items:flex-start;justify-content:space-between;gap:12px}
    .modal-role-dept{font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--text-s);margin-bottom:4px}
    .modal-role-title{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:400;color:var(--text-p);line-height:1.2}
    .modal-close{width:32px;height:32px;border-radius:8px;border:1px solid var(--border);background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:var(--text-s);transition:all .2s;flex-shrink:0}
    .modal-close:hover{background:var(--bg-2);color:var(--text-p);border-color:var(--navy-dark)}
    .modal-body{padding:20px 24px;overflow-y:auto;flex:1;display:flex;flex-direction:column;gap:16px}
    .form-row{display:grid;gap:12px}
    .form-row.two{grid-template-columns:1fr 1fr}
    .form-field{display:flex;flex-direction:column;gap:6px}
    .form-label{font-size:12px;font-weight:500;color:var(--text-p);letter-spacing:.02em}
    .form-label span{color:var(--ember);margin-left:2px}
    .form-input{background:var(--bg-2);border:1px solid var(--border);border-radius:10px;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--text-p);outline:none;transition:border-color .2s,background .3s;width:100%}
    .form-input::placeholder{color:var(--text-s)}
    .form-input:focus{border-color:var(--blue-link);background:var(--surface)}
    .form-textarea{background:var(--bg-2);border:1px solid var(--border);border-radius:10px;padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--text-p);outline:none;transition:border-color .2s,background .3s;width:100%;resize:vertical;min-height:88px;line-height:1.6}
    .form-textarea::placeholder{color:var(--text-s)}
    .form-textarea:focus{border-color:var(--blue-link);background:var(--surface)}
    .form-input.error,.form-textarea.error{border-color:var(--ember)}
    .form-error{font-size:11px;color:var(--ember);margin-top:2px;display:none}
    .form-error.show{display:block}
    
    /* Upload drop zone */
    .upload-zone{border:2px dashed var(--border);border-radius:12px;padding:28px 20px;text-align:center;cursor:pointer;transition:border-color .2s,background .2s;position:relative}
    .upload-zone:hover,.upload-zone.drag-over{border-color:var(--blue-bright);background:rgba(74,144,226,.04)}
    .upload-zone input[type="file"]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%}
    .uz-icon{width:40px;height:40px;border-radius:12px;background:var(--bg-2);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;border:1px solid var(--border)}
    .uz-label{font-size:13px;font-weight:500;color:var(--text-p);margin-bottom:4px}
    .uz-hint{font-size:11px;color:var(--text-s)}
    .uz-preview{display:none;align-items:center;gap:10px;padding:10px 14px;background:var(--bg-2);border-radius:10px;border:1px solid var(--border);margin-top:10px}
    .uz-preview.show{display:flex}
    .uz-file-icon{width:32px;height:32px;border-radius:8px;background:rgba(74,144,226,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .uz-filename{font-size:13px;color:var(--text-p);font-weight:500;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
    .uz-filesize{font-size:11px;color:var(--text-s)}
    .uz-remove{margin-left:auto;font-size:11px;color:var(--ember);cursor:pointer;flex-shrink:0;background:none;border:none;font-family:'DM Sans',sans-serif;padding:0}
    .uz-remove:hover{color:var(--ember-deep)}
    
    .modal-footer{padding:16px 24px 20px;border-top:1px solid var(--border);flex-shrink:0;display:flex;gap:10px}
    .modal-submit{flex:1;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;background:var(--navy-dark);color:#fff;border:none;padding:13px 24px;border-radius:40px;cursor:pointer;transition:background .2s,transform .15s}
    .modal-submit:hover{background:var(--navy-mid);transform:scale(1.01)}
    [data-theme="dark"] .modal-submit{background:var(--blue-bright)}
    [data-theme="dark"] .modal-submit:hover{background:#3A78CA}
    .modal-cancel{font-family:'DM Sans',sans-serif;font-size:14px;font-weight:400;background:none;color:var(--text-s);border:1px solid var(--border);padding:13px 24px;border-radius:40px;cursor:pointer;transition:all .2s;white-space:nowrap}
    .modal-cancel:hover{border-color:var(--navy-dark);color:var(--text-p)}
    [data-theme="dark"] .modal-cancel:hover{border-color:rgba(255,255,255,.3);color:var(--text-p)}
    
    /* Toast */
    .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(12px);z-index:600;background:var(--navy-dark);color:#fff;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;padding:12px 22px;border-radius:40px;box-shadow:0 8px 32px rgba(10,36,99,.3);display:flex;align-items:center;gap:8px;opacity:0;transition:opacity .3s,transform .3s;pointer-events:none;white-space:nowrap}
    .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
    [data-theme="dark"] .toast{background:var(--navy-mid)}
    
    /* ── RESPONSIVE ── */
    @media(max-width:900px){
      .nav-links{display:none}
      .hamburger{display:flex}
      .why-grid{grid-template-columns:1fr 1fr}
      .metrics-grid{grid-template-columns:1fr 1fr}
      .metric-item{border-bottom:1px solid var(--border)}
      .metric-item:nth-child(2){border-right:none}
      .metric-item:nth-child(3){border-bottom:none}
      .metric-item:last-child{border-bottom:none}
      .footer-top{grid-template-columns:1fr 1fr;gap:28px}
      .form-row.two{grid-template-columns:1fr}
    }
    @media(max-width:640px){
      .why-grid{grid-template-columns:1fr}
      .metrics-grid{grid-template-columns:1fr 1fr}
      .hero-stats{max-width:100%;border-radius:12px}
      .hero-stat{padding:16px 20px}
      .modal-box{max-height:92vh}
      .modal-body{padding:16px}
      .modal-header{padding:16px}
      .modal-footer{padding:12px 16px 16px}
      .pagination{gap:4px;padding-top:36px}
      .page-btn.nav-arrow{padding:0 10px}
      .footer-top{grid-template-columns:1fr;gap:24px}
      .footer-bottom{flex-direction:column;align-items:flex-start;gap:8px}
      .roles-grid{grid-template-columns:1fr}
    }
    @media(max-width:400px){
      .page-btn:not(.nav-arrow):not(.active){display:none}
      .page-btn.active{display:flex}
    }
</style>