<script lang="ts">
  const year = new Date().getFullYear();
</script>

<!-- ═══════════════════════════════════════════════
     FOOTER
═══════════════════════════════════════════════ -->
<!-- FOOTER -->
<footer>
  <div class="footer-top pb-8">
    <div class="footer-brand">
      <div style="display:flex;align-items:center;gap:10px"><svg width="30" height="30" viewBox="0 0 36 36"><rect x="4" y="28" width="28" height="4" rx="2" fill="#4A90E2"/><path d="M8 28 Q8 18 18 14 Q28 18 28 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.25"/><path d="M6 28 Q6 14 18 10 Q30 14 30 28" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" opacity="0.55"/><path d="M4 29 Q4 11 18 6 Q32 11 32 29" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round"/><circle cx="18" cy="28" r="3.5" fill="#4A90E2"/></svg><span style="font-size:15px;font-weight:500;letter-spacing:.14em;color:#fff">BLUPODD</span></div>
      <p>Seamless integration. Home hunting, reimagined. Connecting buyers, renters and agents across Nigeria and beyond.</p>
    </div>
    <div class="footer-col"><h4>Search</h4><a href="/site/search">For sale</a><a href="/site/search">For rent</a><a href="#">Virtual tours</a><a href="/site/properties/international">International</a></div>
    <div class="footer-col"><h4>Agents</h4><a href="/site/agents">Find an agent</a><a href="/site/sign-up">Create account</a><a href="/agency/listings/add">List a property</a><a href="/agency/boosts">Boost listing</a></div>
    <div class="footer-col"><h4>Company</h4><a href="/site/privacy-policy">Privacy policy</a><a href="/site/privacy-policy#platform">How it works</a><a href="/site/contacts">Contact</a><a href="/site/careers">Careers</a></div>
  </div>
  <div class="footer-bottom">
    <span class="footer-copy">© {year} Blupodd.com. All rights reserved.</span>
    <div class="footer-legal"><a href="#">Privacy policy</a><a href="#">Terms of use</a></div>
  </div>
</footer>

<style>
  /* FOOTER */
  footer{background:var(--footer-bg);padding:100px 5vw 28px;border-top:1px solid rgba(255,255,255,.07);transition:background .3s}
  .footer-top{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:10px;margin-bottom:44px;max-width:1300px;margin:0 auto 44px}
  .footer-brand p{font-size:13px;font-weight:300;line-height:1.75;color:rgba(255,255,255,.4);margin-top:14px;max-width:260px}
  .footer-col h4{font-size:10px;font-weight:500;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:16px}
  .footer-col a{display:block;font-size:13px;color:rgba(255,255,255,.5);text-decoration:none;margin-bottom:9px;transition:color .2s}
  .footer-col a:hover{color:#fff}
  .footer-bottom{border-top:1px solid rgba(255,255,255,.07);padding-top:22px;display:flex;justify-content:space-between;align-items:center;max-width:1300px;margin:0 auto;flex-wrap:wrap;gap:10px}
  .footer-copy{font-size:12px;color:rgba(255,255,255,.22)}
  .footer-legal{display:flex;gap:18px;flex-wrap:wrap}
  .footer-legal a{font-size:12px;color:rgba(255,255,255,.22);text-decoration:none;transition:color .2s}
  .footer-legal a:hover{color:rgba(255,255,255,.55)}

  /* RESPONSIVE */
  @media(max-width:900px){
    footer { padding-top: 50px; }
    .footer-top{grid-template-columns:1fr 1fr;gap:28px;}
  }
  @media(max-width:540px){
    .footer-top{grid-template-columns:1fr}
    .footer-bottom{flex-direction:column;align-items:flex-start}
  }
</style>