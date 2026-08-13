<script lang="ts">
const questions = [
    {
        q: "All users - general obligations",
        a: [
            "Provide accurate, complete, and up-to-date personal information during registration and use.",
            "Keep your password and account credentials secure. You are responsible for all activity under your account.",
            "Do not impersonate another person, agency, or entity.",
            "Use the platform only for lawful purposes consistent with these Terms.",
            "Notify Blupodd promptly if you suspect unauthorised access to your account."
        ]
    },
    {
        q: "Agents & agencies - additional obligations",
        a: [
            "Upload only accurate, truthful, and verified property information.",
            "Remove or update listings that are no longer available in a timely manner.",
            "Maintain professional conduct when communicating with prospective clients.",
            "Comply with all applicable Nigerian real-estate laws and regulations.",
            "Ensure any promoted or boosted listing fairly represents the property."
        ],
    },
    {
        q: "Account suspension & termination",
        a: [
            "Blupodd reserves the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or cause harm to other users. We will make reasonable efforts to notify affected users before taking action unless immediate suspension is necessary to protect platform integrity."
        ]
    }
]

const vViewingQuestions = [
    {
        q: "Scheduling & agent attendance",
        a: ["Viewing bookings are subject to agent availability and confirmation. A confirmed booking does not guarantee attendance if the agent is unable to proceed due to unforeseen circumstances. Agents are expected to notify clients of any cancellation at least 24 hours in advance where possible. Blupodd is not responsible for agent no-shows but may take action against agents with a pattern of missed bookings."]
    },
    {
        q: "Payments for paid viewings",
        a: ["Where agents charge a fee for virtual viewings, payment is processed through Blupodd's platform. Fees are disclosed clearly before booking confirmation. Paying a viewing fee does not constitute an offer or acceptance to purchase or rent the property."]
    },
    {
        q: "Technical issues & refunds",
        a: ["If a paid virtual viewing is cancelled by the agent, or fails to proceed due to a technical fault on Blupodd's platform, a full refund will be issued within 5–7 business days. Technical issues on the client's side (e.g. poor connectivity, unsupported device) do not automatically qualify for a refund. Refund requests must be submitted via our support channel within 48 hours of the scheduled viewing."]
    }
]

let openIndex = $state<number | null>(null);
let openVViewingIndex = $state<number | null>(null);

const toggleSectionOne = (index: number) => {
  openIndex = openIndex === index ? null : index;
}

const toggleSectionTwo = (index: number) => {
    openVViewingIndex = openVViewingIndex === index ? null : index;
}
</script>

<!-- ══ PAGE HEADER ══ -->
<div class="page-header">
    <div class="ph-inner">
      <div class="ph-breadcrumb">
        <a href="/">Home</a>
        <span>/</span>
        <span style="color:#3C5182;">Terms &amp; Privacy</span>
      </div>
      <div class="ph-eyebrow">Legal</div>
      <h1 class="ph-title">Terms of Use &amp;<br><em>Privacy Policy</em></h1>
      <p class="ph-sub">Clear information about how Blupodd works, your rights, and your responsibilities while using our platform. We believe trust starts with transparency.</p>
      <div class="ph-trust">
        <span class="ph-trust-dot"></span>
        <span class="ph-trust-text">Effective from 1 January 2026 · Last updated 22 May 2026</span>
      </div>
    </div>
</div>

<!-- ══ QUICK SUMMARY STRIP ══ -->
<div class="summary-strip">
    <div class="summary-inner">
      <div class="summary-label">Jump to a section</div>
      <div class="summary-chips">
        <a href="#platform"  class="summary-chip"><span class="chip-dot" style="background:var(--blue-bright)"></span>Platform purpose</a>
        <a href="#account"   class="summary-chip"><span class="chip-dot" style="background:var(--gold)"></span>Account usage</a>
        <a href="#listings"  class="summary-chip"><span class="chip-dot" style="background:var(--sage)"></span>Property listings</a>
        <a href="#viewings"  class="summary-chip"><span class="chip-dot" style="background:var(--ember)"></span>Virtual viewings</a>
        <a href="#payments"  class="summary-chip"><span class="chip-dot" style="background:var(--gold)"></span>Payments &amp; boosting</a>
        <a href="#privacy"   class="summary-chip"><span class="chip-dot" style="background:var(--blue-bright)"></span>Privacy &amp; data</a>
        <a href="#aup"       class="summary-chip"><span class="chip-dot" style="background:var(--ember)"></span>Acceptable use</a>
        <a href="#liability" class="summary-chip"><span class="chip-dot" style="background:var(--navy-accent)"></span>Liability</a>
        <a href="#ip"        class="summary-chip"><span class="chip-dot" style="background:var(--navy-accent)"></span>Intellectual property</a>
        <a href="#contact"   class="summary-chip"><span class="chip-dot" style="background:var(--sage)"></span>Contact &amp; support</a>
      </div>
    </div>
  </div>
  
  
  <!-- ══ MAIN CONTENT ══ -->
  <div class="policy-wrap">
  
    <!-- ─────────────────────────────────────
         1. PLATFORM PURPOSE
    ───────────────────────────────────── -->
    <section class="policy-section" id="platform">
      <div class="ps-num">01 — Platform purpose</div>
      <h2 class="ps-title">What <em>Blupodd</em> does</h2>
      <p class="ps-lead">Blupodd is a real-estate technology platform. We connect property seekers with verified agents, agencies, and listings across Nigeria.</p>
  
      <div class="ps-callout-sage ps-callout">
        <strong>Important:</strong> Blupodd is a facilitator. We do not own or manage any listed property unless explicitly stated. All listings are provided by registered agencies and agents.
      </div>
  
      <div class="ps-grid">
        <div class="ps-grid-card">
          <div class="ps-grid-card-title">
            <span class="ps-gc-dot" style="background:var(--blue-bright)"></span>
            For property seekers
          </div>
          <ul>
            <li>Browse verified property listings</li>
            <li>Contact agents and agencies directly</li>
            <li>Schedule virtual or in-person viewings</li>
            <li>Save searches and favourite properties</li>
            <li>Receive personalised listing recommendations</li>
          </ul>
        </div>
        <div class="ps-grid-card">
          <div class="ps-grid-card-title">
            <span class="ps-gc-dot" style="background:var(--ember)"></span>
            For agents &amp; agencies
          </div>
          <ul>
            <li>Upload and manage property listings</li>
            <li>Promote listings to reach more seekers</li>
            <li>Offer virtual property viewings</li>
            <li>Interact with and qualify prospective clients</li>
            <li>Track listing performance and analytics</li>
          </ul>
        </div>
      </div>
  
      <div class="ps-body">
        <p>By accessing or using Blupodd, you agree to these Terms. If you do not agree, please do not use the platform. These Terms apply to all users including visitors, registered accounts, and agency partners.</p>
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         2. ACCOUNT USAGE
    ───────────────────────────────────── -->
    <section class="policy-section" id="account">
      <div class="ps-num">02 — Account usage</div>
      <h2 class="ps-title">Your account &amp; <em>responsibilities</em></h2>
      <p class="ps-lead">When you create an account on Blupodd, you take on certain responsibilities to keep the platform safe and trustworthy for everyone.</p>
  
      <div class="ps-accordion" id="accountAccordion">
      {#each questions as question, i}
        <div class="acc-item" class:open={openIndex === i}>
          <div class="acc-trigger">
            <span class="acc-q">{question.q}</span>
            <span onclick={()=>toggleSectionOne(i)}>
                <svg class="acc-chev" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </span>
          </div>
          <div class="acc-body">
          {#if question.a.length > 1}
            <ul class="ps-list">
            {#each question.a as _}
              <li>{_}</li>
            {/each}
            </ul>
            {:else}
            <div class="ps-body">
                <p>{question.a[0]}</p>
            </div>
           {/if}
          </div>
        </div>
        {/each}

        
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         3. PROPERTY LISTINGS
    ───────────────────────────────────── -->
    <section class="policy-section" id="listings">
      <div class="ps-num">03 — Property listings</div>
      <h2 class="ps-title">Listing accuracy &amp; <em>disclaimer</em></h2>
      <p class="ps-lead">Blupodd hosts listings provided by agents and agencies. While we encourage quality and accuracy, we cannot independently verify every listing detail in real time.</p>
  
      <div class="ps-callout-ember ps-callout">
        <strong>Please note:</strong> Property availability, pricing, and features may change without notice. Always verify the current status of a listing directly with the agent before making any financial decisions.
      </div>
  
      <div class="ps-body">
        <p><strong>Who is responsible for listing accuracy?</strong><br>
        The registered agent or agency who uploaded the listing bears full responsibility for its accuracy, completeness, and ongoing availability. Blupodd is not liable for errors, omissions, or outdated information in agent-submitted listings.</p>
  
        <p><strong>What Blupodd does to help:</strong> We provide tools for agents to verify their profiles, update listing status, and flag inaccuracies. We also allow users to report suspicious or misleading listings through our support channel.</p>
      </div>
  
      <ul class="ps-list">
        <li>Prices shown are guide prices only and may exclude agency fees, legal costs, or other charges.</li>
        <li>Property dimensions, descriptions, and images are provided by agents and may be approximate.</li>
        <li>A listing appearing on Blupodd does not constitute an endorsement of the listing agent or property.</li>
        <li>Blupodd may remove listings that are reported as fraudulent, misleading, or in violation of these Terms.</li>
      </ul>
    </section>
  
  
    <!-- ─────────────────────────────────────
         4. VIRTUAL VIEWING TERMS
    ───────────────────────────────────── -->
    <section class="policy-section" id="viewings">
      <div class="ps-num">04 — Virtual viewings</div>
      <h2 class="ps-title">Virtual viewing <em>terms</em></h2>
      <p class="ps-lead">Blupodd supports scheduled virtual property viewings facilitated by registered agents. These viewings may be free or paid depending on the agent's offering.</p>
  
      <div class="ps-accordion">
        {#each vViewingQuestions as question, i}
        <div class="acc-item" class:open={openVViewingIndex === i}>
          <div class="acc-trigger">
            <span class="acc-q">{question.q}</span>
            <span onclick={() => toggleSectionTwo(i)}>
                <svg class="acc-chev" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </span>
          </div>
          <div class="acc-body">
            <div class="ps-body">
              <p>{question.a}</p>
            </div>
          </div>
        </div>
        {/each}
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         5. PAYMENTS & BOOSTING
    ───────────────────────────────────── -->
    <section class="policy-section" id="payments">
      <div class="ps-num">05 — Payments &amp; promotions</div>
      <h2 class="ps-title">Boosting &amp; <em>payment terms</em></h2>
      <p class="ps-lead">Agents may pay to increase the visibility of their listings on Blupodd. All payment terms are described here and in any applicable subscription agreement.</p>
  
      <div class="ps-callout ps-callout">
        <strong>Boost visibility, not outcomes.</strong> Boosting a listing increases its prominence in search results and category pages. It does not guarantee a sale, rental, or any specific number of enquiries.
      </div>
  
      <ul class="ps-list">
        <li><strong>Boosted listings</strong> appear more prominently in search results, neighbourhood pages, and recommendation feeds.</li>
        <li>Boost placement is determined by a combination of paid tier, listing quality score, and relevance to the searcher's query.</li>
        <li>Boost fees are non-refundable once a campaign has begun unless caused by a platform error.</li>
        <li>All payments are processed securely via our payment partners. Blupodd does not store card details.</li>
        <li>Subscription packages (if applicable) auto-renew unless cancelled at least 24 hours before the renewal date.</li>
        <li>VAT and applicable taxes are added to all commercial transactions where required by law.</li>
      </ul>
    </section>
  
  
    <!-- ─────────────────────────────────────
         6. PRIVACY & DATA USE
    ───────────────────────────────────── -->
    <section class="policy-section" id="privacy">
      <div class="ps-num">06 — Privacy &amp; data</div>
      <h2 class="ps-title">How we use <em>your data</em></h2>
      <p class="ps-lead">We collect certain information to help the platform work well for you. We use it responsibly, share it minimally, and never sell it to third parties.</p>
  
      <div class="ps-callout-sage ps-callout">
        Your data belongs to you. Blupodd uses it to improve your experience on our platform — not to profit from it externally.
      </div>
  
      <div class="ps-table-wrap">
        <table class="ps-table">
          <thead>
            <tr>
              <th>Data collected</th>
              <th>Why we collect it</th>
              <th>How long we keep it</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name &amp; email</td>
              <td>Account creation, login, communication</td>
              <td>Duration of account + 90 days</td>
            </tr>
            <tr>
              <td>Phone number</td>
              <td>Viewing bookings, agent contact facilitation</td>
              <td>Duration of account</td>
            </tr>
            <tr>
              <td>Saved searches</td>
              <td>Property recommendations, saved filters</td>
              <td>Until manually deleted</td>
            </tr>
            <tr>
              <td>Viewing history</td>
              <td>Personalised recommendations, analytics</td>
              <td>24 months rolling</td>
            </tr>
            <tr>
              <td>Property preferences</td>
              <td>Smarter search suggestions</td>
              <td>Duration of account</td>
            </tr>
            <tr>
              <td>Device &amp; usage data</td>
              <td>Platform performance, fraud prevention</td>
              <td>12 months rolling</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <div class="ps-body" style="margin-top:20px">
        <p><strong>Notifications.</strong> We may contact you via push notification, email, or SMS with listing updates, viewing reminders, and platform news. You can manage notification preferences from your account settings at any time.</p>
        <p><strong>Third parties.</strong> We may share limited data with service providers (e.g. payment processors, analytics tools) strictly for platform operation. We do not sell your personal data to third parties for marketing.</p>
        <p><strong>Your rights.</strong> You may request access to, correction of, or deletion of your personal data by contacting our support team. We will respond within 14 business days.</p>
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         7. ACCEPTABLE USE
    ───────────────────────────────────── -->
    <section class="policy-section" id="aup">
      <div class="ps-num">07 — Acceptable use</div>
      <h2 class="ps-title">Platform <em>acceptable use</em></h2>
      <p class="ps-lead">Blupodd is built on trust. We expect all users — seekers, agents, and visitors — to use the platform fairly and honestly.</p>
  
      <div class="ps-grid">
        <div class="ps-grid-card">
          <div class="ps-grid-card-title">
            <span class="ps-gc-dot" style="background:var(--ember)"></span>
            Do not do this
          </div>
          <ul>
            <li>Post fraudulent, misleading, or non-existent property listings</li>
            <li>Impersonate another user, agent, or Blupodd staff</li>
            <li>Harass, threaten, or abuse other users via the platform</li>
            <li>Use automated tools to scrape, copy, or replicate platform content</li>
            <li>Abuse messaging or enquiry systems for spam or unsolicited promotion</li>
            <li>Attempt to circumvent payment flows or security systems</li>
            <li>Use Blupodd to facilitate illegal transactions or activity</li>
          </ul>
        </div>
        <div class="ps-grid-card">
          <div class="ps-grid-card-title">
            <span class="ps-gc-dot" style="background:var(--sage)"></span>
            We encourage this
          </div>
          <ul>
            <li>Report suspicious listings or user behaviour through our support channel</li>
            <li>Keep listing information current and accurate</li>
            <li>Respond to enquiries and booking requests in a timely manner</li>
            <li>Provide honest, detailed property descriptions and fair photography</li>
            <li>Treat all users with respect regardless of budget or background</li>
            <li>Verify your agency credentials for enhanced trust badges</li>
          </ul>
        </div>
      </div>
  
      <div class="ps-body" style="margin-top:4px">
        <p>Violations of the acceptable use policy may result in content removal, account suspension, or permanent ban from the platform. Serious violations may be referred to relevant authorities.</p>
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         8. LIABILITY & DISCLAIMER
    ───────────────────────────────────── -->
    <section class="policy-section" id="liability">
      <div class="ps-num">08 — Liability</div>
      <h2 class="ps-title">Liability &amp; <em>disclaimer</em></h2>
      <p class="ps-lead">Blupodd is a technology facilitator — we connect parties but are not a party to any property transaction, rental agreement, or offline arrangement.</p>
  
      <div class="ps-callout ps-callout">
        Blupodd provides the platform. The relationship between a property seeker and an agent is independent of Blupodd. Any disputes arising from offline agreements, viewings, or transactions are between those parties directly.
      </div>
  
      <ul class="ps-list">
        <li>Blupodd is not liable for any loss or damage arising from reliance on listing information provided by agents.</li>
        <li>We are not responsible for the conduct of agents, agencies, or users outside the platform.</li>
        <li>Blupodd does not guarantee uninterrupted access to the platform. Scheduled maintenance or unforeseen outages may occur.</li>
        <li>The platform is provided "as is" — we make no warranties beyond what is explicitly stated in these Terms.</li>
        <li>Our total liability to any user, in any circumstances, is limited to the fees paid by that user to Blupodd in the 12 months preceding the claim.</li>
      </ul>
  
      <div class="ps-body" style="margin-top:8px">
        <p>Nothing in these Terms limits or excludes liability for fraud, death, or personal injury caused by negligence, or any other liability that cannot be excluded by Nigerian law.</p>
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         9. INTELLECTUAL PROPERTY
    ───────────────────────────────────── -->
    <section class="policy-section" id="ip">
      <div class="ps-num">09 — Intellectual property</div>
      <h2 class="ps-title">Our brand &amp; <em>your content</em></h2>
      <p class="ps-lead">Blupodd owns its platform, branding, and original content. You retain ownership of what you upload, but grant us a licence to display it.</p>
  
      <div class="ps-body">
        <p><strong>Blupodd's intellectual property.</strong> The Blupodd name, logo, platform design, software, and all original content produced by our team are the intellectual property of Blupodd Ltd. You may not copy, reproduce, or repurpose any part of our platform without prior written consent.</p>
        <p><strong>Content you upload.</strong> You retain ownership of the property photos, descriptions, and materials you upload to Blupodd. By uploading content, you grant Blupodd a non-exclusive, royalty-free licence to display, reproduce, and distribute that content on the platform for the duration your listing is active.</p>
        <p><strong>Removal of content.</strong> You may request removal of your uploaded content at any time by deleting the listing or closing your account. We will remove your content from active display within 48 hours, though residual copies in backups may persist briefly.</p>
      </div>
    </section>
  
  
    <!-- ─────────────────────────────────────
         CONTACT & SUPPORT
    ───────────────────────────────────── -->
    <section class="policy-section" id="contact">
      <div class="ps-num">10 — Contact &amp; support</div>
      <h2 class="ps-title">Need help or have a <em>question?</em></h2>
      <p class="ps-lead">Our team is here to help. Whether you have a question about these Terms, a privacy request, or need platform support — reach out through any of the channels below.</p>
  
      <div class="contact-row">
        <div class="contact-card">
          <div class="cc-icon" style="background:rgba(74,144,226,.1);">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <rect x="2" y="4" width="16" height="13" rx="2.5" stroke="var(--blue-bright)" stroke-width="1.4"/>
              <path d="M2 7l8 5.5L18 7" stroke="var(--blue-bright)" stroke-width="1.4" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="cc-label">Support email</div>
          <div class="cc-value">support@blupodd.com</div>
          <a href="mailto:support@blupodd.com" class="cc-link">Send an email →</a>
        </div>
        <div class="contact-card">
          <div class="cc-icon" style="background:rgba(74,120,72,.1);">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8" stroke="var(--sage)" stroke-width="1.4"/>
              <path d="M10 6v4.5l3 1.5" stroke="var(--sage)" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="cc-label">Help centre</div>
          <div class="cc-value">help.blupodd.com</div>
          <a href="#" class="cc-link">Browse articles →</a>
        </div>
        <div class="contact-card">
          <div class="cc-icon" style="background:rgba(212,174,58,.1);">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6Z" stroke="var(--gold)" stroke-width="1.4"/>
              <path d="M7 6V4a3 3 0 0 1 6 0v2" stroke="var(--gold)" stroke-width="1.4" stroke-linecap="round"/>
              <circle cx="10" cy="12" r="1.5" fill="var(--gold)"/>
            </svg>
          </div>
          <div class="cc-label">Privacy &amp; legal</div>
          <div class="cc-value">legal@blupodd.com</div>
          <a href="mailto:legal@blupodd.com" class="cc-link">Data requests &amp; legal →</a>
        </div>
      </div>
  
      <div class="ps-body" style="margin-top:24px">
        <p>For data access or deletion requests under Nigerian data protection law, please email <strong>legal@blupodd.com</strong> with the subject line "Data Request". We will respond within 14 business days.</p>
      </div>
    </section>
  
    <!-- ─────────────────────────────────────
         TIMESTAMP + META
    ───────────────────────────────────── -->
    <div class="policy-meta">
      <div class="meta-updated">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none">
          <circle cx="8" cy="8" r="6.5" stroke="currentColor" stroke-width="1.3"/>
          <path d="M8 5v3.5l2 1.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Last updated: 22 May 2026
      </div>
      <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
        <span class="meta-version">Version 1.0</span>
      </div>
    </div>
  
  </div><!-- /policy-wrap -->


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
      --shadow:rgba(10,36,99,.07);--shadow-h:rgba(10,36,99,.14);
    }
    :global([data-theme="dark"]) {
      --bg:#0B111E;--bg-2:#111826;--bg-3:#1A2438;--surface:#131C2E;
      --text-p:#E8EDF5;--text-s:#6A7FA0;--border:rgba(255,255,255,.08);
      --card-bg:#131C2E;
      --nav-bg:#080F1C;--footer-bg:#080F1C;
      --shadow:rgba(0,0,0,.28);--shadow-h:rgba(0,0,0,.5);
    }
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    html{scroll-behavior:smooth;overflow-x:hidden}
    body{font-family:'DM Sans',sans-serif;background:var(--bg);color:var(--text-p);overflow-x:hidden;transition:background .3s,color .3s}
    
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
    .dm-toggle{width:44px;height:24px;border-radius:12px;background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);cursor:pointer;position:relative;transition:background .3s;flex-shrink:0;outline:none}
    .dm-toggle::after{content:'';position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:#fff;transition:transform .3s}
    :global([data-theme="dark"]) .dm-toggle{background:rgba(74,144,226,.35);border-color:rgba(74,144,226,.45)}
    :global([data-theme="dark"]) .dm-toggle::after{transform:translateX(20px);background:var(--blue-bright)}
    .hamburger{display:none;flex-direction:column;justify-content:center;gap:5px;width:36px;height:36px;padding:6px;cursor:pointer;background:none;border:none;flex-shrink:0}
    .hamburger span{display:block;height:1.5px;background:rgba(255,255,255,.75);border-radius:2px;transition:all .25s}
    .hamburger.open span:nth-child(1){transform:translateY(6.5px) rotate(45deg)}
    .hamburger.open span:nth-child(2){opacity:0;transform:scaleX(0)}
    .hamburger.open span:nth-child(3){transform:translateY(-6.5px) rotate(-45deg)}
    .mobile-nav{display:none;position:fixed;top:68px;left:0;right:0;z-index:199;background:var(--nav-bg);border-top:1px solid rgba(255,255,255,.07);padding:16px 5vw 20px;transition:background .3s}
    .mobile-nav.open{display:block}
    .mobile-nav ul{list-style:none;display:flex;flex-direction:column;gap:2px}
    .mobile-nav ul a{display:block;font-size:14px;color:rgba(255,255,255,.7);text-decoration:none;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06);transition:color .2s;letter-spacing:.04em}
    .mobile-nav ul a:hover{color:#fff}
    .mobile-nav ul li:last-child a{border-bottom:none;color:#fff;background:var(--ember);padding:10px 20px;border-radius:40px;text-align:center;font-weight:500;margin-top:8px}
    
    /* ── PAGE HEADER ── */
    .page-header{background:var(--navy-dark);padding:104px 5vw 56px;position:relative;overflow:hidden}
    .page-header::before{content:'';position:absolute;right:-80px;top:50%;transform:translateY(-50%);width:420px;height:420px;border-radius:50%;border:1px solid rgba(255,255,255,.05);pointer-events:none}
    .page-header::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:44px;background:var(--bg);clip-path:ellipse(55% 100% at 50% 100%);transition:background .3s}
    :global([data-theme="dark"]) .page-header::after{background:#0B111E}
    .ph-inner{max-width:900px;margin:0 auto;position:relative;z-index:2}
    .ph-breadcrumb{display:flex;align-items:center;gap:8px;margin-bottom:18px;font-size:12px;color:rgba(255,255,255,.35);flex-wrap:wrap}
    .ph-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none;transition:color .2s}
    .ph-breadcrumb a:hover{color:#fff}
    .ph-breadcrumb span{color:rgba(255,255,255,.2)}
    .ph-eyebrow{font-size:10px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--blue-bright);margin-bottom:10px}
    .ph-title{font-family:'Cormorant Garamond',serif;font-size:clamp(30px,4.5vw,54px);font-weight:300;color:#fff;margin-bottom:10px;line-height:1.06}
    .ph-title em{font-style:italic;color:var(--blue-bright)}
    .ph-sub{font-size:14px;color:rgba(255,255,255,.45);font-weight:300;max-width:520px;line-height:1.75;margin-bottom:20px}
    .ph-trust{display:inline-flex;align-items:center;gap:8px;background:rgba(74,120,72,.12);border:1px solid rgba(74,120,72,.22);border-radius:40px;padding:7px 16px}
    .ph-trust-dot{width:6px;height:6px;border-radius:50%;background:var(--sage);flex-shrink:0}
    .ph-trust-text{font-size:12px;color:rgba(255,255,255,.6);letter-spacing:.02em}
    
    /* ── QUICK SUMMARY STRIP ── */
    .summary-strip{background:var(--bg-2);border-bottom:1px solid var(--border);padding:28px 5vw;transition:background .3s,border-color .3s}
    .summary-inner{max-width:900px;margin:0 auto}
    .summary-label{font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--text-s);margin-bottom:14px}
    .summary-chips{display:flex;flex-wrap:wrap;gap:8px}
    .summary-chip{display:inline-flex;align-items:center;gap:7px;font-size:12px;font-weight:400;color:var(--text-p);background:var(--surface);border:1px solid var(--border);border-radius:40px;padding:6px 14px;text-decoration:none;transition:border-color .2s,background .2s,color .2s;flex-shrink:0}
    .summary-chip:hover{border-color:var(--navy-dark);color:var(--navy-dark)}
    :global([data-theme="dark"]) .summary-chip:hover{border-color:var(--blue-bright);color:var(--blue-bright)}
    .chip-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0}
    
    /* ── MAIN LAYOUT ── */
    .policy-wrap{max-width:900px;margin:0 auto;padding:64px 5vw 96px}
    
    /* ── SECTION BLOCKS ── */
    .policy-section{margin-bottom:56px;padding-bottom:56px;border-bottom:1px solid var(--border)}
    .policy-section:last-of-type{border-bottom:none;margin-bottom:0;padding-bottom:0}
    .ps-eyebrow{font-size:10px;font-weight:500;letter-spacing:.18em;text-transform:uppercase;color:var(--navy-accent);margin-bottom:8px}
    :global([data-theme="dark"]) .ps-eyebrow{color:var(--blue-bright)}
    .ps-num{font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);margin-bottom:8px;display:flex;align-items:center;gap:8px}
    .ps-num::after{content:'';flex:1;height:1px;background:var(--border)}
    .ps-title{font-family:'Cormorant Garamond',serif;font-size:clamp(22px,3.5vw,34px);font-weight:300;color:var(--text-p);margin-bottom:14px;line-height:1.15}
    .ps-title em{font-style:italic;color:var(--blue-bright)}
    .ps-lead{font-size:15px;font-weight:300;color:var(--text-p);line-height:1.78;margin-bottom:20px;max-width:720px}
    
    /* Policy body text */
    .ps-body{font-size:14px;font-weight:300;color:var(--text-s);line-height:1.85}
    .ps-body p{margin-bottom:14px}
    .ps-body p:last-child{margin-bottom:0}
    .ps-body strong{color:var(--text-p);font-weight:500}
    .ps-body a{color:var(--blue-link);text-decoration:none}
    .ps-body a:hover{text-decoration:underline}
    
    /* Two-col grid for paired content */
    .ps-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
    .ps-grid-card{background:var(--bg-2);border:1px solid var(--border);border-radius:14px;padding:20px;transition:background .3s}
    .ps-grid-card-title{font-size:12px;font-weight:500;color:var(--text-p);letter-spacing:.04em;margin-bottom:8px;display:flex;align-items:center;gap:7px}
    .ps-gc-dot{width:6px;height:6px;border-radius:50%;flex-shrink:0}
    .ps-grid-card ul{list-style:none;display:flex;flex-direction:column;gap:6px}
    .ps-grid-card ul li{font-size:13px;color:var(--text-s);font-weight:300;line-height:1.65;padding-left:14px;position:relative}
    .ps-grid-card ul li::before{content:'';position:absolute;left:0;top:8px;width:4px;height:4px;border-radius:50%;background:var(--border)}
    
    /* Bullet lists — inline */
    .ps-list{list-style:none;margin:16px 0;display:flex;flex-direction:column;gap:9px}
    .ps-list li{font-size:14px;font-weight:300;color:var(--text-s);line-height:1.7;padding-left:20px;position:relative}
    .ps-list li::before{content:'';position:absolute;left:0;top:8px;width:5px;height:5px;border-radius:50%;background:var(--blue-bright);opacity:.7}
    
    /* Highlight / callout boxes */
    .ps-callout{border-left:3px solid var(--blue-bright);background:rgba(74,144,226,.05);border-radius:0 10px 10px 0;padding:14px 18px;margin:20px 0;font-size:13px;color:var(--text-s);line-height:1.75;font-weight:300}
    :global([data-theme="dark"]) .ps-callout{background:rgba(74,144,226,.08)}
    .ps-callout strong{color:var(--text-p);font-weight:500}
    .ps-callout-ember{border-left-color:var(--ember);background:rgba(192,96,53,.05)}
    :global([data-theme="dark"]) .ps-callout-ember{background:rgba(192,96,53,.08)}
    .ps-callout-sage{border-left-color:var(--sage);background:rgba(74,120,72,.05)}
    :global([data-theme="dark"]) .ps-callout-sage{background:rgba(74,120,72,.08)}
    
    /* Data table for privacy section */
    .ps-table{width:100%;border-collapse:collapse;margin:20px 0;font-size:13px}
    .ps-table th{text-align:left;font-size:10px;font-weight:500;letter-spacing:.1em;text-transform:uppercase;color:var(--text-s);padding:10px 14px;border-bottom:2px solid var(--border);white-space:nowrap}
    .ps-table td{padding:12px 14px;border-bottom:1px solid var(--border);color:var(--text-s);font-weight:300;line-height:1.6;vertical-align:top}
    .ps-table td:first-child{color:var(--text-p);font-weight:500;white-space:nowrap}
    .ps-table tr:last-child td{border-bottom:none}
    .ps-table tr:hover td{background:var(--bg-2);transition:background .15s}
    
    /* ── ACCORDION ── */
    .ps-accordion{display:flex;flex-direction:column;gap:6px;margin-top:16px}
    .acc-item{background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden;transition:background .3s,border-color .2s}
    .acc-item:hover{border-color:var(--navy-accent)}
    :global([data-theme="dark"]) .acc-item:hover{border-color:rgba(74,144,226,.35)}
    .acc-trigger{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;padding:16px 20px;cursor:pointer;user-select:none}
    .acc-q{font-size:14px;font-weight:500;color:var(--text-p);line-height:1.4}
    .acc-chev{flex-shrink:0;margin-top:2px;color:var(--text-s);transition:transform .24s}
    .acc-item.open .acc-chev{transform:rotate(180deg)}
    .acc-body{display:none;padding:0 20px 18px;font-size:13px;color:var(--text-s);line-height:1.78;font-weight:300;border-top:1px solid var(--border)}
    .acc-item.open .acc-body{display:block;padding-top:14px}
    
    /* ── CONTACT CARDS ── */
    .contact-row{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:24px}
    .contact-card{background:var(--surface);border:1px solid var(--border);border-radius:14px;padding:22px;display:flex;flex-direction:column;gap:10px;transition:border-color .2s,background .3s,box-shadow .2s}
    .contact-card:hover{border-color:var(--blue-bright);box-shadow:0 8px 24px var(--shadow)}
    .cc-icon{width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0}
    .cc-label{font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:var(--text-s)}
    .cc-value{font-size:14px;font-weight:500;color:var(--text-p);line-height:1.4}
    .cc-link{font-size:12px;color:var(--blue-link);text-decoration:none;margin-top:2px;display:inline-block}
    .cc-link:hover{text-decoration:underline}
    
    /* ── TIMESTAMP / META ── */
    .policy-meta{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;padding:28px 0;border-top:1px solid var(--border);margin-top:56px}
    .meta-updated{font-size:12px;color:var(--text-s);display:flex;align-items:center;gap:7px}
    .meta-version{font-size:11px;color:var(--text-s);background:var(--bg-2);border:1px solid var(--border);border-radius:20px;padding:4px 12px}
    .print-btn{font-size:12px;color:var(--text-s);background:none;border:1px solid var(--border);border-radius:20px;padding:5px 14px;cursor:pointer;font-family:'DM Sans',sans-serif;transition:all .2s;display:flex;align-items:center;gap:6px}
    .print-btn:hover{border-color:var(--navy-dark);color:var(--text-p)}
    [data-theme="dark"] .print-btn:hover{border-color:var(--blue-bright);color:var(--blue-bright)}
    
    /* ── FOOTER ── */
    footer{background:var(--footer-bg);padding:52px 5vw 28px;border-top:1px solid rgba(255,255,255,.07);transition:background .3s}
    .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;max-width:1200px;margin:0 auto 44px}
    .footer-brand p{font-size:13px;font-weight:300;line-height:1.75;color:rgba(255,255,255,.4);margin-top:14px;max-width:260px}
    .footer-col h4{font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:16px}
    .footer-col a{display:block;font-size:13px;color:rgba(255,255,255,.5);text-decoration:none;margin-bottom:9px;transition:color .2s}
    .footer-col a:hover{color:#fff}
    .footer-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:22px;display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto;flex-wrap:wrap;gap:10px}
    .footer-copy{font-size:12px;color:rgba(255,255,255,.22)}
    .footer-legal{display:flex;gap:18px;flex-wrap:wrap}
    .footer-legal a{font-size:12px;color:rgba(255,255,255,.22);text-decoration:none;transition:color .2s}
    .footer-legal a:hover{color:rgba(255,255,255,.55)}
    
    /* ── RESPONSIVE ── */
    @media(max-width:900px){
      .nav-links{display:none}
      .hamburger{display:flex}
      .footer-top{grid-template-columns:1fr 1fr;gap:28px}
      .ps-grid{grid-template-columns:1fr}
      .contact-row{grid-template-columns:1fr 1fr}
      .ps-table{font-size:12px}
      .ps-table th,.ps-table td{padding:10px}
    }
    @media(max-width:640px){
      .contact-row{grid-template-columns:1fr}
      .footer-top{grid-template-columns:1fr;gap:24px}
      .footer-bottom{flex-direction:column;align-items:flex-start}
      .summary-chips{gap:6px}
      .policy-wrap{padding:48px 5vw 72px}
      .ps-table-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;margin:20px 0}
      .ps-table-wrap .ps-table{margin:0;min-width:520px}
    }
</style>