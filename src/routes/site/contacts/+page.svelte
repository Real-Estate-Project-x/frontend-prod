<script lang="ts">
 const faqs = [
    {
      q: "How do I book a property viewing on Blupodd?",
      a: "Find a property you like and click 'Book viewing'. You can choose in-person or virtual. The verified agent will confirm your slot directly — no middlemen, no delays."
    },
    {
      q: "How much does a virtual tour cost?",
      a: "Virtual tours are available for a small fee set by the listing agent — typically ₦2,000–₦10,000. The exact cost is displayed on the listing before you book."
    },
    {
      q: "How do agents list properties on Blupodd?",
      a: "Agents create a verified account, complete identity verification, and then list properties directly from their dashboard."
    },
    {
      q: "What is a Boosted listing?",
      a: "A Boosted listing is featured at the top of relevant search results in its area."
    },
    {
      q: "Is Blupodd available outside Nigeria?",
      a: "Yes — our International section covers 28 countries including the UK, US, UAE, Canada, Ghana and South Africa."
    },
    {
      q: "How are agents verified on the platform?",
      a: "All agents go through NIN/BVN identity verification and manual review."
    }
  ];

  let openIndex = $state<number | null>(null);

  const toggleFaq = (index: number) => {
    openIndex = openIndex === index ? null : index;
  }

  const resetForm = () => {}
</script>

<!-- PAGE HEADER -->
<div style="margin-top:68px">
    <div class="page-header">
      <div class="ph-inner">
        <div class="ph-breadcrumb">
          <a href="/">Home</a><span>/</span><span>Contact us</span>
        </div>
        <p class="ph-eyebrow">Get in touch</p>
        <h1 class="ph-title">We'd love to<br><em>hear from you.</em></h1>
        <p class="ph-sub">Whether you're searching for a property, need agent support, or have a general question — our team responds within 24 hours on business days.</p>
      </div>
    </div>

    <!-- CONTACT SECTION -->
<div class="content-wrap">
    <div class="contact-grid">
  
      <!-- ── FORM ── -->
      <div class="form-card">
        <div id="formBody">
          <h2 class="form-card-title">Send us a message</h2>
          <p class="form-card-sub">All fields marked <em>*</em> are required.</p>
  
          <div class="form-row">
            <div class="form-group no-mb">
              <label class="form-label">First name <span class="req">*</span></label>
              <input class="form-input" type="text" id="fname" placeholder="e.g. Chukwuemeka">
            </div>
            <div class="form-group no-mb">
              <label class="form-label">Last name <span class="req">*</span></label>
              <input class="form-input" type="text" id="lname" placeholder="e.g. Okafor">
            </div>
          </div>
  
          <div class="form-row">
            <div class="form-group no-mb">
              <label class="form-label">Email address <span class="req">*</span></label>
              <input class="form-input" type="email" id="femail" placeholder="you@example.com">
            </div>
            <div class="form-group no-mb">
              <label class="form-label">Phone number</label>
              <input class="form-input" type="tel" id="fphone" placeholder="+234 800 000 0000">
            </div>
          </div>
  
          <div class="form-row">
            <div class="form-group no-mb">
              <label class="form-label">I am a <span class="req">*</span></label>
              <select class="form-select" id="frole">
                <option value="">Select your role…</option>
                <option>Buyer</option><option>Renter</option>
                <option>Real estate agent</option><option>Property developer</option>
                <option>Investor</option><option>Other</option>
              </select>
            </div>
            <div class="form-group no-mb">
              <label class="form-label">Subject <span class="req">*</span></label>
              <select class="form-select" id="fsubject">
                <option value="">What is this about?</option>
                <option>General enquiry</option><option>Property listing help</option>
                <option>Agent account support</option><option>Boost / advertising</option>
                <option>Virtual tour question</option><option>Technical issue</option>
                <option>Partnership / press</option><option>Something else</option>
              </select>
            </div>
          </div>
  
          <div class="form-group">
            <label class="form-label">Your message <span class="req">*</span></label>
            <textarea class="form-textarea" id="fmsg" maxlength="1000" placeholder="Tell us how we can help…"></textarea>
            <div class="char-count" id="fcc">0/1000</div>
          </div>
  
          <div class="consent-row">
            <input type="checkbox" id="fconsent">
            <label class="consent-label" for="fconsent">I agree to Blupodd's <a href="#">privacy policy</a> and consent to being contacted about my enquiry.</label>
          </div>
  
          <button class="form-submit">
            Send message
            <svg class="submit-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <p class="form-note">We respond within <strong>24 hours</strong> on weekdays. For urgent help, <a href="mailto:hello@blupodd.com">email us directly</a>.</p>
        </div>
  
        <div class="form-success" id="formSuccess">
          <div class="success-check">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M5 12l4 4L19 7" stroke="#4A7848" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="success-title">Message sent!</h3>
          <p class="success-body">Thank you for reaching out. A member of the Blupodd team will be in touch within 24 hours.</p>
          <button class="success-again" onclick={resetForm}>Send another message</button>
        </div>
      </div>
  
      <!-- ── SIDEBAR ── -->
      <div class="contact-sidebar">
  
        <div class="online-badge">
          <div class="ob-pulse"></div>
          <div class="ob-text"><strong>Our team is online</strong>Average response under 24 hrs on weekdays</div>
        </div>
  
        <div class="info-card">
          <div class="ic-header">
            <div class="ic-icon" style="background:var(--navy-dark)">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="white" stroke-width="1.5"/><path d="M2 7l8 5 8-5" stroke="white" stroke-width="1.5" stroke-linecap="round"/></svg>
            </div>
            <div class="ic-title">Email us</div>
          </div>
          <div class="ic-body">
            <a href="mailto:hello@blupodd.com">hello@blupodd.com</a><br>
            <a href="mailto:agents@blupodd.com">agents@blupodd.com</a><br>
            <a href="mailto:support@blupodd.com">support@blupodd.com</a>
          </div>
        </div>
  
        <div class="info-card">
          <div class="ic-header">
            <div class="ic-icon" style="background:var(--sage)">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M3 4a1 1 0 011-1h2.5a1 1 0 011 .75l.75 3a1 1 0 01-.3.97l-1.2 1.2a10.5 10.5 0 004.27 4.27l1.2-1.2a1 1 0 01.97-.3l3 .75A1 1 0 0117 13.5V16a1 1 0 01-1 1h-1C7.16 17 3 12.84 3 8V5a1 1 0 010-1z" stroke="white" stroke-width="1.4" stroke-linecap="round"/></svg>
            </div>
            <div class="ic-title">Call us</div>
          </div>
          <div class="ic-body">
            <a href="tel:+2348001234567">+234 800 123 4567</a><br>
            Mon – Fri: 8am – 6pm WAT<br>
            Sat: 9am – 2pm WAT
          </div>
        </div>
  
        <div class="info-card">
          <div class="ic-header">
            <div class="ic-icon" style="background:var(--ember)">
              <svg width="17" height="17" viewBox="0 0 20 20" fill="none"><path d="M10 2C7.24 2 5 4.24 5 7c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5z" stroke="white" stroke-width="1.4" stroke-linejoin="round"/><circle cx="10" cy="7" r="2" stroke="white" stroke-width="1.4"/></svg>
            </div>
            <div class="ic-title">Our offices</div>
          </div>
          <ul class="ic-list">
            <li><div class="ic-dot"></div><div><strong>Port Harcourt (HQ)</strong>14 Aba Road, GRA Phase 2, Rivers State</div></li>
            <li><div class="ic-dot"></div><div><strong>Lagos</strong>Plot 42, Admiralty Way, Lekki Phase 1</div></li>
            <li><div class="ic-dot"></div><div><strong>Abuja</strong>Suite 5, Oladipo Diya St., Garki, FCT</div></li>
          </ul>
        </div>
  
        <div class="socials-card">
          <div class="sc-heading">Follow us on social</div>
          <div class="social-grid">
            <a class="soc-btn" href="https://instagram.com/blupodd" target="_blank" rel="noopener">
              <div class="soc-icon si-ig"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" rx="5" stroke="white" stroke-width="1.8"/><circle cx="12" cy="12" r="5" stroke="white" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="white"/></svg></div>
              <div><span class="soc-name">Instagram</span><span class="soc-handle">@blupodd</span></div>
            </a>
            <a class="soc-btn" href="https://x.com/blupodd" target="_blank" rel="noopener">
              <div class="soc-icon si-x"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
              <div><span class="soc-name">X (Twitter)</span><span class="soc-handle">@blupodd</span></div>
            </a>
            <a class="soc-btn" href="https://facebook.com/blupodd" target="_blank" rel="noopener">
              <div class="soc-icon si-fb"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></div>
              <div><span class="soc-name">Facebook</span><span class="soc-handle">Blupodd</span></div>
            </a>
            <a class="soc-btn" href="https://linkedin.com/company/blupodd" target="_blank" rel="noopener">
              <div class="soc-icon si-li"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="white"/></svg></div>
              <div><span class="soc-name">LinkedIn</span><span class="soc-handle">Blupodd Ltd</span></div>
            </a>
            <a class="soc-btn" href="https://youtube.com/@blupodd" target="_blank" rel="noopener">
              <div class="soc-icon si-yt"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#FF0000"/></svg></div>
              <div><span class="soc-name">YouTube</span><span class="soc-handle">@blupodd</span></div>
            </a>
            <a class="soc-btn" href="https://wa.me/2348001234567" target="_blank" rel="noopener">
              <div class="soc-icon si-wa"><svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.006 16.81a9.9 9.9 0 01-14.01-14.01 9.9 9.9 0 0114.01 14.01z"/></svg></div>
              <div><span class="soc-name">WhatsApp</span><span class="soc-handle">Chat with us</span></div>
            </a>
          </div>
        </div>
  
      </div>
    </div>
  </div>
  
  <!-- FAQ SECTION -->
  <div class="faq-section">
    <div class="faq-inner">
      <p class="sec-eyebrow">Support</p>
      <h2 class="sec-title">Frequently asked questions</h2>
  
      <div class="faq-grid">
        {#each faqs as faq, i}
          <div class="faq-item {openIndex === i ? 'open' : ''}">
            
            <button class="faq-q w-full flex items-center justify-between"
                    onclick={() => toggleFaq(i)}>
  
              <span class="faq-q-text">{faq.q}</span>
  
              <svg class="faq-chev transition-transform duration-200
                          {openIndex === i ? 'rotate-180' : ''}"
                   width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 6l5 5 5-5"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"/>
              </svg>
  
            </button>
  
            {#if openIndex === i}
              <div class="faq-ans">{faq.a}</div>
            {/if}
  
          </div>
        {/each}
      </div>
    </div>
  </div>
  </div>


<style>

/* PAGE HEADER — matches properties.html exactly */
.page-header{background:var(--navy-dark);padding:104px 5vw 52px;position:relative;overflow:hidden}
.page-header::before{content:'';position:absolute;right:-80px;top:50%;transform:translateY(-50%);width:380px;height:380px;border-radius:50%;border:1px solid rgba(255,255,255,.05);pointer-events:none}
.page-header::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:40px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%);transition:background .3s}
.ph-inner{max-width:1200px;margin:0 auto;position:relative;z-index:2}
.ph-breadcrumb{display:flex;align-items:center;gap:8px;margin-bottom:18px;font-size:12px;color:rgba(255,255,255,.35);flex-wrap:wrap}
.ph-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
.ph-breadcrumb a:hover{color:#fff}
.ph-breadcrumb span{color:rgba(255,255,255,.2)}
.ph-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:10px}
.ph-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4.5vw,56px);font-weight:300;color:#fff;margin-bottom:10px;line-height:1.08}
.ph-title em{font-style:italic;color:var(--blue-bright)}
.ph-sub{font-size:14px;color:rgba(255,255,255,.45);font-weight:300;max-width:500px;line-height:1.75}

/* CONTENT WRAP */
.content-wrap{max-width:1200px;margin:0 auto;padding:60px 5vw 80px}

/* CONTACT GRID */
.contact-grid{display:grid;grid-template-columns:1fr 360px;gap:48px;align-items:start}


/* FORM CARD */
.form-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:36px;box-shadow:0 4px 24px var(--shadow);transition:background .3s,border-color .3s}
.form-card-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--text-p);margin-bottom:6px}
.form-card-sub{font-size:13px;color:var(--text-s);font-weight:300;margin-bottom:28px;line-height:1.65}
.form-card-sub em{color:var(--ember);font-style:normal}
.form-row{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.form-group{display:flex;flex-direction:column;gap:6px;margin-bottom:14px}
.form-group.no-mb{margin-bottom:0}
.form-label{font-size:12px;font-weight:500;color:var(--text-p);letter-spacing:.02em}
.form-label .req{color:var(--ember);margin-left:1px}
.form-input,.form-select,.form-textarea{
  background:var(--input-bg);border:1px solid var(--input-border);border-radius:10px;
  padding:11px 14px;font-family:'DM Sans',sans-serif;font-size:14px;color:var(--input-text);
  outline:none;transition:border-color .2s,background .3s,box-shadow .2s;width:100%
}
.form-input::placeholder,.form-textarea::placeholder{color:var(--text-s);font-weight:300}
.form-input:focus,.form-select:focus,.form-textarea:focus{border-color:var(--blue-link);box-shadow:0 0 0 3px rgba(26,106,222,.1)}
.form-select{cursor:pointer;appearance:none;-webkit-appearance:none;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238C8070' stroke-width='1.5' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat:no-repeat;background-position:right 13px center;padding-right:34px}
.form-textarea{resize:vertical;min-height:126px;line-height:1.65}
.char-count{font-size:11px;color:var(--text-s);text-align:right;margin-top:4px}
.consent-row{display:flex;align-items:flex-start;gap:10px;margin:16px 0 20px}
.consent-row input[type="checkbox"]{accent-color:var(--navy-dark);width:14px;height:14px;margin-top:3px;flex-shrink:0;cursor:pointer}
.consent-label{font-size:12px;color:var(--text-s);line-height:1.65;cursor:pointer}
.consent-label a{color:var(--blue-link);text-decoration:none}
.form-submit{width:100%;background:var(--navy-dark);color:#fff;border:none;border-radius:10px;padding:14px;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:500;cursor:pointer;transition:background .2s,transform .15s;display:flex;align-items:center;justify-content:center;gap:9px}
.form-submit:hover{background:var(--navy-mid);transform:translateY(-1px)}
.submit-arrow{transition:transform .2s}
.form-submit:hover .submit-arrow{transform:translateX(4px)}
.form-note{font-size:11px;color:var(--text-s);text-align:center;margin-top:12px;line-height:1.6}
.form-note a{color:var(--blue-link);text-decoration:none}
/* success */
.form-success{display:none;text-align:center;padding:48px 20px}
.success-check{width:56px;height:56px;border-radius:50%;background:var(--sage-light);display:flex;align-items:center;justify-content:center;margin:0 auto 20px}
[data-theme="dark"] .success-check{background:rgba(74,120,72,.2)}
.success-title{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:400;color:var(--text-p);margin-bottom:8px}
.success-body{font-size:14px;color:var(--text-s);line-height:1.7;max-width:300px;margin:0 auto 24px}
.success-again{background:var(--navy-dark);color:#fff;border:none;border-radius:40px;padding:11px 28px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:500;cursor:pointer;transition:background .2s}
.success-again:hover{background:var(--navy-mid)}

/* SIDEBAR INFO CARDS */
.contact-sidebar{display:flex;flex-direction:column;gap:16px}
.info-card{background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:20px 22px;transition:background .3s,border-color .3s}
.ic-header{display:flex;align-items:center;gap:12px;margin-bottom:12px}
.ic-icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.ic-title{font-size:14px;font-weight:500;color:var(--text-p)}
.ic-body{font-size:13px;color:var(--text-s);line-height:1.8;font-weight:300}
.ic-body a{color:var(--blue-link);text-decoration:none;transition:color .2s}
.ic-body a:hover{color:var(--navy-dark)}
[data-theme="dark"] .ic-body a:hover{color:var(--blue-bright)}
.ic-list{list-style:none;display:flex;flex-direction:column;gap:10px}
.ic-list li{display:flex;align-items:flex-start;gap:9px;font-size:13px;color:var(--text-s);line-height:1.5}
.ic-dot{width:5px;height:5px;border-radius:50%;background:var(--blue-bright);flex-shrink:0;margin-top:5px}
.ic-list li strong{color:var(--text-p);font-weight:500;display:block}
/* online badge */
.online-badge{display:flex;align-items:center;gap:10px;background:rgba(74,120,72,.08);border:1px solid rgba(74,120,72,.18);border-radius:12px;padding:12px 16px;transition:background .3s}
[data-theme="dark"] .online-badge{background:rgba(74,120,72,.14);border-color:rgba(74,120,72,.25)}
.ob-pulse{width:8px;height:8px;border-radius:50%;background:var(--sage);flex-shrink:0;animation:obpulse 2.2s infinite}
@keyframes obpulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
.ob-text{font-size:12px;color:var(--sage);line-height:1.5}
[data-theme="dark"] .ob-text{color:#7DBF7A}
.ob-text strong{font-weight:500;display:block;font-size:13px}
/* socials card */
.socials-card{background:var(--navy-dark);border-radius:16px;padding:20px 22px}
.sc-heading{font-size:10px;font-weight:500;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:14px}
.social-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.soc-btn{display:flex;align-items:center;gap:9px;padding:10px 12px;border-radius:10px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);text-decoration:none;transition:all .2s;cursor:pointer}
.soc-btn:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.18);transform:translateY(-1px)}
.soc-icon{width:28px;height:28px;border-radius:7px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.si-ig{background:linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366)}
.si-x{background:#000}
.si-fb{background:#1877F2}
.si-li{background:#0A66C2}
.si-yt{background:#FF0000}
.si-wa{background:#25D366}
.soc-name{font-size:12px;font-weight:500;color:#fff;display:block;line-height:1.3}
.soc-handle{font-size:10px;color:rgba(255,255,255,.42);display:block}

/* FAQ */
.faq-section{background:var(--bg-2);padding:68px 5vw;transition:background .3s}
.faq-inner{max-width:1200px;margin:0 auto}
.sec-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--navy-accent);margin-bottom:10px}
[data-theme="dark"] .sec-eyebrow{color:var(--blue-bright)}
.sec-title{font-family:'Cormorant Garamond',serif;font-size:clamp(28px,3.5vw,42px);font-weight:300;color:var(--text-p);line-height:1.1;margin-bottom:32px}
.faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.faq-item{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:background .3s,border-color .3s}
.faq-q{display:flex;align-items:flex-start;justify-content:space-between;padding:17px 20px;cursor:pointer;gap:12px;user-select:none}
.faq-q-text{font-size:14px;font-weight:500;color:var(--text-p);line-height:1.4}
.faq-chev{flex-shrink:0;transition:transform .25s;color:var(--text-s);margin-top:2px}
.faq-item.open .faq-chev{transform:rotate(180deg)}
.faq-ans{display:none;padding:0 20px 18px;font-size:13px;color:var(--text-s);line-height:1.75;font-weight:300;border-top:1px solid var(--border)}
.faq-item.open .faq-ans{display:block;padding-top:14px}


/* ── RESPONSIVE ── */
@media(max-width:1020px){
  .contact-grid{grid-template-columns:1fr;gap:32px}
  .contact-sidebar{order:-1;display:grid;grid-template-columns:1fr 1fr;gap:14px}
  .socials-card{grid-column:1/-1}
  .online-badge{grid-column:1/-1}
  .footer-top{grid-template-columns:1fr 1fr;gap:28px}
}
@media(max-width:768px){
  .nav-links{display:none}
  .nav-ham{display:flex}
  .form-row{grid-template-columns:1fr}
  .faq-grid{grid-template-columns:1fr}
  .social-grid{grid-template-columns:repeat(3,1fr)}
  .content-wrap{padding:44px 5vw 64px}
}
@media(max-width:540px){
  .contact-sidebar{display:flex;flex-direction:column}
  .form-card{padding:24px 18px}
  .social-grid{grid-template-columns:1fr 1fr}
  .footer-top{grid-template-columns:1fr}
  .footer-bottom{flex-direction:column;align-items:flex-start}
  .ph-title{font-size:30px}
}
</style>