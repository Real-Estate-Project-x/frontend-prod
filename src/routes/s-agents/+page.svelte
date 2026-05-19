<script lang="ts">
    import SubAgencySidebar from "$lib/components/shared/SubAgencySidebar.svelte";
  
  </script>
  <!-- ══ LAYOUT ══ -->
  <div class="flex pt-[68px] min-h-screen">
      <SubAgencySidebar />
  
      <!-- ══════════════════════════════════════════
       MAIN CONTENT
      ══════════════════════════════════════════ -->
      <main class="flex-1 min-w-0 overflow-x-hidden">
  
          <!-- ── PAGE HEADER ── -->
          <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-7 border-b border-white/[0.06] tt">
          <div class="max-w-[1100px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
              <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agent dashboard</p>
              <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,38px)">
                  Good morning, <em class="italic text-gold">Chukwuemeka.</em>
              </h1>
              <p class="text-[13px] font-light text-white/50 mt-1.5 flex items-center gap-2 flex-wrap">
                  <span class="w-[6px] h-[6px] rounded-full bg-sage pulse-dot"></span>
                  Monday, 6 May 2026
                  <span class="text-white/25">·</span>
                  Premier Properties PH
              </p>
              </div>
              <!-- Quick actions row -->
              <div class="flex flex-wrap gap-2">
              <a href="/s-agents/listings/add" class="qa-btn bg-ember hover:bg-ember-deep text-white border-none">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1v12M1 7h12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
                  Add listing
              </a>
              <a href="scheduling.html" class="qa-btn bg-white/[0.08] hover:bg-white/[0.14] text-white/80 hover:text-white border-none">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.3"/><path d="M7 4.5v3l2 1" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>
                  Scheduling
              </a>
              <a href="boosted.html" class="qa-btn bg-white/[0.08] hover:bg-white/[0.14] text-white/80 hover:text-white border-none hide-xs">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.7 3.5 3.8.55-2.75 2.7.65 3.8L7 9.9l-3.4 1.85.65-3.8L1.5 5.05 5.3 4.5z" stroke="#D4AE3A" stroke-width="1.3" stroke-linejoin="round"/></svg>
                  Boost listing
              </a>
              </div>
          </div>
          </div>
  
          <!-- ── CONTENT BODY ── -->
          <div class="px-6 lg:px-10 py-7 max-w-[1100px] mx-auto space-y-8">
  
              <!-- ══ KPI SECTION ══ -->
              <section class="fu d1">
                  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <!-- Active listings -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-blue-bright/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><rect x="2" y="3" width="16" height="14" rx="2"/><path d="M2 8h16M6 1v4M14 1v4" stroke-linecap="round"/></svg>
                      </div>
                      <span class="text-[10px] font-medium bg-sage-light text-sage dark:bg-sage/15 dark:text-[#7DBF7A] px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-sage pulse-dot"></span>Live</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">42</div>
                      <div class="slabel">Active listings</div>
                  </div>
  
                  <!-- Total views -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-blue-bright/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M1 10s4-7 9-7 9 7 9 7-4 7-9 7-9-7-9-7z"/><circle cx="10" cy="10" r="2.5"/></svg>
                      </div>
                      <span class="text-[10px] font-medium text-blue-bright">↑ 18% this week</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">8.4k</div>
                      <div class="slabel">Total property views</div>
                  </div>
    
                  <!-- Scheduled viewings -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-ember-light dark:bg-ember/15 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4"><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M7 2v4M13 2v4M3 9h14" stroke-linecap="round"/></svg>
                      </div>
                      <span class="text-[10px] font-medium bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-ember pulse-dot"></span>6 today</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">21</div>
                      <div class="slabel">Scheduled viewings</div>
                  </div>
    
                  <!-- New inquiries -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-blue-bright/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z" stroke-linejoin="round"/></svg>
                      </div>
                      <span class="text-[10px] font-medium bg-blue-bright/10 text-blue-bright px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-blue-bright pulse-dot"></span>3 unread</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">18</div>
                      <div class="slabel">New inquiries</div>
                  </div>
  
                  <!-- Saves -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#D4AE3A" stroke-width="1.4"><path d="M10 17C10 17 2 12 2 6.5A4.5 4.5 0 0110 3.5 4.5 4.5 0 0118 6.5C18 12 10 17 10 17z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <span class="text-[10px] font-medium text-gold">↑ 9 this week</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">124</div>
                      <div class="slabel">Saves across listings</div>
                  </div>
    
                  <!-- Boosted -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#D4AE3A" stroke-width="1.4"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke-linejoin="round"/></svg>
                      </div>
                      <span class="text-[10px] font-medium bg-gold/10 text-gold px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-gold pulse-dot"></span>Live</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">4</div>
                      <div class="slabel">Boosted listings</div>
                  </div>
    
                  <!-- Virtual viewing requests -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-sage-light dark:bg-sage/15 flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4"><path d="M3 7h9a1 1 0 011 1v4a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zM17 9l-4-2v6l4-2V9z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                      </div>
                      <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A]">↑ 5 this week</span>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">11</div>
                      <div class="slabel">Virtual viewing requests</div>
                  </div>
    
                  <!-- Archived -->
                  <div class="kpi-card p-5 tt">
                      <div class="flex items-center justify-between mb-4">
                      <div class="w-9 h-9 rounded-xl bg-chalk-2 dark:bg-white/[.06] flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#8C8070" stroke-width="1.4"><rect x="2" y="4" width="16" height="3" rx="1"/><path d="M3 7v9a1 1 0 001 1h12a1 1 0 001-1V7M8 11h4" stroke-linecap="round"/></svg>
                      </div>
                      </div>
                      <div class="font-display text-[36px] font-semibold text-navy-dark dark:text-blue-100 leading-none mb-1">7</div>
                      <div class="slabel">Archived listings</div>
                  </div>
              </div>
              </section>
  
              <!-- ══ TWO COLUMN: ACTIVITY + UPCOMING VIEWINGS ══ -->
              <div class="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 fu d2">
  
                  <!-- ── TODAY'S ACTIVITY ── -->
                  <div class="dcard overflow-hidden tt">
                  <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between">
                      <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-blue-bright flex-shrink-0"></div>
                      <span class="sh">Today's activity</span>
                      </div>
                      <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Mon 6 May 2026</span>
                  </div>
                  <div class="divide-y divide-chalk-3 dark:divide-white/[.07]">
          
                      <!-- Activity item -->
                      <div class="flex gap-3 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt">
                      <div class="act-dot bg-blue-bright"></div>
                      <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">New inquiry received</div>
                              <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Amara Kanu · 3-Bed Apt GRA Phase 2 — asking about service charge</div>
                          </div>
                          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">8:14 AM</span>
                          </div>
                          <div class="flex gap-2 mt-2.5">
                          <button class="text-[12px] font-medium text-blue-link hover:text-navy-dark dark:hover:text-blue-bright tt bg-transparent border-none cursor-pointer font-sans p-0">Reply →</button>
                          </div>
                      </div>
                      </div>
          
                      <div class="flex gap-3 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt">
                      <div class="act-dot bg-ember"></div>
                      <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Viewing booked — confirmed</div>
                              <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Fatima Abubakar · 5-Bed Duplex GRA Ph.3 — Today at 2:00 PM (in-person)</div>
                          </div>
                          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">9:02 AM</span>
                          </div>
                      </div>
                      </div>
          
                      <div class="flex gap-3 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt">
                      <div class="act-dot bg-gold"></div>
                      <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Boost milestone hit</div>
                              <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">3-Bed GRA Phase 2 Apartment reached 200 views today</div>
                          </div>
                          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">10:30 AM</span>
                          </div>
                      </div>
                      </div>
          
                      <div class="flex gap-3 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt">
                      <div class="act-dot bg-sage"></div>
                      <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Virtual viewing requested</div>
                              <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Ngozi Eze · Woji Studio Apartment — requested Thu 9 May at 4:00 PM</div>
                          </div>
                          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">11:18 AM</span>
                          </div>
                          <div class="flex gap-2 mt-2.5">
                          <button class="text-[12px] font-medium text-sage hover:text-[#3a6038] tt bg-transparent border-none cursor-pointer font-sans p-0">Confirm →</button>
                          </div>
                      </div>
                      </div>
          
                      <div class="flex gap-3 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt">
                      <div class="act-dot bg-blue-bright"></div>
                      <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">New inquiry received</div>
                              <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Emeka Okonkwo · Commercial Space Aba Road — asking for floor plan</div>
                          </div>
                          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">12:44 PM</span>
                          </div>
                          <div class="flex gap-2 mt-2.5">
                          <button class="text-[12px] font-medium text-blue-link hover:text-navy-dark dark:hover:text-blue-bright tt bg-transparent border-none cursor-pointer font-sans p-0">Reply →</button>
                          </div>
                      </div>
                      </div>
          
                      <div class="flex gap-3 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt">
                      <div class="act-dot bg-chalk-muted dark:bg-[#6A7FA0]"></div>
                      <div class="flex-1 min-w-0">
                          <div class="flex items-start justify-between gap-2 flex-wrap">
                          <div>
                              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Listing archived</div>
                              <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Trans-Amadi Office Space — removed from active listings</div>
                          </div>
                          <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] flex-shrink-0">1:05 PM</span>
                          </div>
                      </div>
                      </div>
          
                  </div>
                  <div class="px-5 py-3 border-t border-chalk-3 dark:border-white/[.07] text-center">
                      <a href="#" class="text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">View all activity →</a>
                  </div>
                  </div>
          
                  <!-- ── UPCOMING VIEWINGS ── -->
                  <div class="dcard overflow-hidden tt">
                  <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between">
                      <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full bg-ember flex-shrink-0"></div>
                      <span class="sh">Upcoming viewings</span>
                      </div>
                      <a href="viewings.html" class="text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">View all</a>
                  </div>
                  <div class="p-4 space-y-3">
          
                      <!-- Viewing card 1 — today -->
                      <div class="vcard p-4 tt">
                      <div class="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <span class="text-[10px] font-semibold uppercase tracking-[.08em] bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[3px] rounded-full flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-ember pulse-dot"></span>Today 2:00 PM</span>
                          <span class="text-[10px] font-medium text-chalk-muted dark:text-[#6A7FA0]">In-person</span>
                      </div>
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">5-Bed Duplex, GRA Phase 3</div>
                      <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-3">Fatima Abubakar · +234 801 234 5678</div>
                      <div class="flex gap-2">
                          <button class="flex-1 text-[12px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright hover:text-blue-bright py-2 rounded-full cursor-pointer tt">View details</button>
                          <a href="tel:+2348012345678" class="flex items-center justify-center w-9 h-9 rounded-full bg-sage-light dark:bg-sage/15 border-none cursor-pointer tt hover:bg-[#D0E8CC]">
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h4l1.5 3.5-2 1.5a10 10 0 004.5 4.5l1.5-2L16 12v4C9.37 16 4 10.63 4 4z"/></svg>
                          </a>
                      </div>
                      </div>
          
                      <!-- Viewing card 2 -->
                      <div class="vcard p-4 tt">
                      <div class="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <span class="text-[10px] font-semibold uppercase tracking-[.08em] bg-blue-bright/10 text-blue-bright px-2 py-[3px] rounded-full">Today 4:30 PM</span>
                          <span class="text-[10px] font-medium text-sage dark:text-[#7DBF7A]">Virtual</span>
                      </div>
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">3-Bed Apt, GRA Phase 2</div>
                      <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-3">Amara Kanu · Diaspora buyer (UK)</div>
                      <div class="flex gap-2">
                          <button class="flex-1 text-[12px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright hover:text-blue-bright py-2 rounded-full cursor-pointer tt">View details</button>
                          <button class="flex items-center justify-center w-9 h-9 rounded-full bg-sage-light dark:bg-sage/15 border-none cursor-pointer hover:bg-[#D0E8CC] tt">
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4"><path d="M3 7h9a1 1 0 011 1v4a1 1 0 01-1 1H3a1 1 0 01-1-1V8a1 1 0 011-1zM17 9l-4-2v6l4-2V9z" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          </button>
                      </div>
                      </div>
          
                      <!-- Viewing card 3 — tomorrow -->
                      <div class="vcard p-4 tt">
                      <div class="flex items-center justify-between mb-2 flex-wrap gap-2">
                          <span class="text-[10px] font-semibold uppercase tracking-[.08em] bg-chalk-2 dark:bg-white/[.06] text-chalk-muted dark:text-[#6A7FA0] px-2 py-[3px] rounded-full">Tue 7 May · 10:00 AM</span>
                          <span class="text-[10px] font-medium text-chalk-muted dark:text-[#6A7FA0]">In-person</span>
                      </div>
                      <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Commercial Space, Aba Road</div>
                      <div class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] mb-3">Emeka Okonkwo</div>
                      <div class="flex gap-2">
                          <button class="flex-1 text-[12px] font-medium text-navy-dark dark:text-blue-100 bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright hover:text-blue-bright py-2 rounded-full cursor-pointer tt">View details</button>
                          <a href="tel:+2348001234567" class="flex items-center justify-center w-9 h-9 rounded-full bg-sage-light dark:bg-sage/15 border-none cursor-pointer hover:bg-[#D0E8CC] tt">
                          <svg width="13" height="13" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h4l1.5 3.5-2 1.5a10 10 0 004.5 4.5l1.5-2L16 12v4C9.37 16 4 10.63 4 4z"/></svg>
                          </a>
                      </div>
                      </div>
          
                      <!-- 3 more -->
                      <div class="text-center pt-1">
                      <a href="viewings.html" class="text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">+ 18 more viewings this week</a>
                      </div>
                  </div>
                  </div>
          
              </div><!-- /two column -->
  
               <!-- ══ PROPERTY PERFORMANCE ══ -->
      <section class="fu d4">
          <div class="dcard overflow-hidden tt">
            <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between flex-wrap gap-3">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-gold flex-shrink-0"></div>
                <span class="sh">Best performing listings</span>
              </div>
              <a href="agency-properties.html" class="text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt">View all listings →</a>
            </div>
            <div class="p-5">
              <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
    
                <!-- Prop card 1 -->
                <div class="pcard tt">
                  <div class="relative h-[140px] overflow-hidden prop-sky-1">
                    <div class="prop-b" style="width:72px;height:92px;left:36px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:44px;bottom:68px"></div><div class="prop-w" style="width:10px;height:13px;left:60px;bottom:68px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:44px;bottom:48px"></div><div class="prop-w" style="width:10px;height:13px;left:60px;bottom:48px"></div>
                    <div class="prop-w" style="width:10px;height:13px;left:44px;bottom:29px"></div>
                    <div class="prop-b" style="width:48px;height:58px;left:128px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:136px;bottom:39px"></div><div class="prop-w" style="width:7px;height:9px;left:149px;bottom:39px"></div>
                    <span class="absolute top-2 left-2 text-[9px] font-semibold uppercase tracking-[.08em] px-2 py-[3px] rounded-full bg-gold text-navy-deep flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-navy-mid"></span>Boosted</span>
                  </div>
                  <div class="p-4">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5 leading-snug">3-Bed Apt · GRA Phase 2</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">₦850,000 / month</div>
                    <!-- Stats -->
                    <div class="grid grid-cols-3 gap-2 mb-3 pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">214</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Views</div></div>
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">34</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Saves</div></div>
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">12</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Inquiries</div></div>
                    </div>
                    <!-- View bar -->
                    <div class="bar-track mb-3"><div class="h-full bg-blue-bright grow-bar rounded-full" style="--w:85%"></div></div>
                    <div class="flex gap-1.5 flex-wrap">
                      <button class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright hover:text-blue-bright px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt">View</button>
                      <button class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt">Edit</button>
                      <button class="text-[11px] font-medium text-gold bg-gold/10 border border-gold/20 hover:bg-gold/20 px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.7 3.5 3.8.55-2.75 2.7.65 3.8L6 9.7l-3.4 1.85.65-3.8L.5 5.05 4.3 4.5z" stroke="#D4AE3A" stroke-width="1.1" stroke-linejoin="round"/></svg>Boost</button>
                    </div>
                  </div>
                </div>
    
                <!-- Prop card 2 -->
                <div class="pcard tt">
                  <div class="relative h-[140px] overflow-hidden prop-sky-2">
                    <div class="prop-b" style="width:88px;height:112px;left:44px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:52px;bottom:86px"></div><div class="prop-w" style="width:12px;height:15px;left:70px;bottom:86px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:52px;bottom:64px"></div><div class="prop-w" style="width:12px;height:15px;left:70px;bottom:64px"></div>
                    <div class="prop-w" style="width:12px;height:15px;left:52px;bottom:43px"></div><div class="prop-w" style="width:12px;height:15px;left:70px;bottom:43px"></div>
                    <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-ember-light text-ember-deep">For Sale</span>
                  </div>
                  <div class="p-4">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5 leading-snug">5-Bed Duplex · GRA Phase 3</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">₦180,000,000</div>
                    <div class="grid grid-cols-3 gap-2 mb-3 pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">189</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Views</div></div>
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">28</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Saves</div></div>
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">9</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Inquiries</div></div>
                    </div>
                    <div class="bar-track mb-3"><div class="h-full bg-blue-bright grow-bar rounded-full" style="--w:74%"></div></div>
                    <div class="flex gap-1.5 flex-wrap">
                      <button class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright hover:text-blue-bright px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt">View</button>
                      <button class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt">Edit</button>
                      <button class="text-[11px] font-medium text-gold bg-gold/10 border border-gold/20 hover:bg-gold/20 px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.7 3.5 3.8.55-2.75 2.7.65 3.8L6 9.7l-3.4 1.85.65-3.8L.5 5.05 4.3 4.5z" stroke="#D4AE3A" stroke-width="1.1" stroke-linejoin="round"/></svg>Boost</button>
                    </div>
                  </div>
                </div>
    
                <!-- Prop card 3 -->
                <div class="pcard tt">
                  <div class="relative h-[140px] overflow-hidden prop-sky-3">
                    <div class="prop-b" style="width:65px;height:80px;left:32px"></div>
                    <div class="prop-w" style="width:9px;height:12px;left:39px;bottom:58px"></div><div class="prop-w" style="width:9px;height:12px;left:54px;bottom:58px"></div>
                    <div class="prop-w" style="width:9px;height:12px;left:39px;bottom:39px"></div><div class="prop-w" style="width:9px;height:12px;left:54px;bottom:39px"></div>
                    <div class="prop-b" style="width:44px;height:54px;left:118px"></div>
                    <div class="prop-w" style="width:7px;height:9px;left:124px;bottom:36px"></div><div class="prop-w" style="width:7px;height:9px;left:137px;bottom:36px"></div>
                    <span class="absolute top-2 left-2 text-[9px] font-medium tracking-[.08em] uppercase px-2 py-[3px] rounded-full bg-[#E8EDF5] text-navy-strong">For Rent</span>
                    <span class="absolute top-2 right-2 text-[9px] font-medium tracking-[.07em] uppercase px-2 py-[3px] rounded-full bg-sage text-white flex items-center gap-1"><span class="w-[4px] h-[4px] rounded-full bg-white/60"></span>Virtual</span>
                  </div>
                  <div class="p-4">
                    <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5 leading-snug">Studio Apt · Woji, PH</div>
                    <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mb-3">₦320,000 / month</div>
                    <div class="grid grid-cols-3 gap-2 mb-3 pt-3 border-t border-chalk-3 dark:border-white/[.07]">
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">142</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Views</div></div>
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">21</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Saves</div></div>
                      <div class="text-center"><div class="font-display text-[17px] font-semibold text-navy-dark dark:text-blue-100">7</div><div class="text-[9px] text-chalk-muted dark:text-[#6A7FA0] uppercase tracking-[.06em]">Inquiries</div></div>
                    </div>
                    <div class="bar-track mb-3"><div class="h-full bg-blue-bright grow-bar rounded-full" style="--w:55%"></div></div>
                    <div class="flex gap-1.5 flex-wrap">
                      <button class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-blue-bright hover:text-blue-bright px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt">View</button>
                      <button class="text-[11px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt">Edit</button>
                      <button class="text-[11px] font-medium text-gold bg-gold/10 border border-gold/20 hover:bg-gold/20 px-3 py-[5px] rounded-full cursor-pointer bg-transparent tt flex items-center gap-1"><svg width="9" height="9" viewBox="0 0 12 12" fill="none"><path d="M6 1l1.7 3.5 3.8.55-2.75 2.7.65 3.8L6 9.7l-3.4 1.85.65-3.8L.5 5.05 4.3 4.5z" stroke="#D4AE3A" stroke-width="1.1" stroke-linejoin="round"/></svg>Boost</button>
                    </div>
                  </div>
                </div>
    
              </div>
            </div>
          </div>
        </section>
    
    
        <!-- ══ QUICK INSIGHTS ══ -->
        <section class="fu d5">
          <div class="flex items-center gap-2 mb-4">
            <div class="w-2 h-2 rounded-full bg-blue-bright flex-shrink-0"></div>
            <h2 class="sh">Quick insights</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    
            <div class="ins-card p-5 tt">
              <div class="w-9 h-9 rounded-xl bg-sage-light dark:bg-sage/15 flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A7848" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.261a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/></svg>
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Virtual tours drive more engagement</div>
              <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65]">Listings with virtual viewing enabled receive on average <strong class="text-navy-dark dark:text-blue-100">3× more inquiries</strong> than in-person only.</p>
              <a href="add-property.html" class="block text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt mt-3">Enable on your listings →</a>
            </div>
    
            <div class="ins-card p-5 tt">
              <div class="w-9 h-9 rounded-xl bg-gold/10 flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#D4AE3A" stroke-width="1.4" stroke-linejoin="round"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z"/></svg>
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Your boosts are performing well</div>
              <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65]">Your 4 boosted listings are receiving <strong class="text-navy-dark dark:text-blue-100">2.4× more views</strong> than non-boosted listings this week.</p>
              <a href="boosted.html" class="block text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt mt-3">Manage boosts →</a>
            </div>
    
            <div class="ins-card p-5 tt">
              <div class="w-9 h-9 rounded-xl bg-blue-bright/10 flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z"/></svg>
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">You're responding fast 🎉</div>
              <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65]">Your average response time this week is <strong class="text-navy-dark dark:text-blue-100">under 2 hours</strong>. Buyers appreciate it — keep it up!</p>
              <a href="#" class="block text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt mt-3">View all enquiries →</a>
            </div>
    
            <div class="ins-card p-5 tt">
              <div class="w-9 h-9 rounded-xl bg-ember-light dark:bg-ember/15 flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="14" height="14" rx="2"/><path d="M7 2v4M13 2v4M3 9h14"/></svg>
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">6 viewings are happening today</div>
              <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65]">You have 6 scheduled viewings for today. Check your calendar to avoid clashes and confirm with customers.</p>
              <a href="scheduling.html" class="block text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt mt-3">Manage schedule →</a>
            </div>
    
            <div class="ins-card p-5 tt">
              <div class="w-9 h-9 rounded-xl bg-blue-bright/10 flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M10 17C10 17 2 12 2 6.5A4.5 4.5 0 0110 3.5 4.5 4.5 0 0118 6.5C18 12 10 17 10 17z" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">3-Bed GRA Apt is trending</div>
              <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65]">Your 3-bedroom apartment in GRA Phase 2 has been saved by <strong class="text-navy-dark dark:text-blue-100">34 users</strong> — most saved this week.</p>
              <a href="#" class="block text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt mt-3">View listing →</a>
            </div>
    
            <div class="ins-card p-5 tt">
              <div class="w-9 h-9 rounded-xl bg-chalk-2 dark:bg-white/[.06] flex items-center justify-center mb-3">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="#8C8070" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H6a2 2 0 00-2 2v14a2 2 0 002 2h8a2 2 0 002-2V7l-4-5zM12 2v5h4"/><path d="M8 12h4M8 16h2"/></svg>
              </div>
              <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-1.5">Complete your profile</div>
              <p class="text-[12px] font-light text-chalk-muted dark:text-[#6A7FA0] leading-[1.65]">Agents with a complete profile and agency info receive <strong class="text-navy-dark dark:text-blue-100">40% more enquiries</strong>. Add your bio and credentials.</p>
              <a href="manage-profile.html" class="block text-[12px] text-blue-link no-underline hover:text-navy-dark dark:hover:text-blue-bright tt mt-3">Update profile →</a>
            </div>
    
          </div>
        </section>
    
    
        <!-- ══ PENDING ACTIONS CARD ══ -->
        <section class="fu d6">
          <div class="dcard overflow-hidden tt">
            <div class="px-5 py-4 border-b border-chalk-3 dark:border-white/[.07] flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-ember flex-shrink-0 pulse-dot"></div>
              <span class="sh">Pending actions</span>
              <span class="ml-auto text-[10px] font-semibold uppercase tracking-[.08em] bg-ember-light text-ember dark:bg-ember/20 dark:text-[#EDBA9B] px-2 py-[3px] rounded-full">4 require attention</span>
            </div>
            <div class="divide-y divide-chalk-3 dark:divide-white/[.07]">
    
              <div class="flex items-center gap-4 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt flex-wrap">
                <div class="w-8 h-8 rounded-xl bg-blue-bright/10 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#4A90E2" stroke-width="1.4"><path d="M3 4h14a1 1 0 011 1v8a1 1 0 01-1 1H5.5L2 16.5V5a1 1 0 011-1z" stroke-linejoin="round"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">3 unanswered enquiries</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Amara K., Emeka O., and Ngozi E. are waiting</div>
                </div>
                <button class="text-[12px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-4 py-2 rounded-full border-none cursor-pointer tt flex-shrink-0">Reply now</button>
              </div>
    
              <div class="flex items-center gap-4 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt flex-wrap">
                <div class="w-8 h-8 rounded-xl bg-ember-light dark:bg-ember/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4"><circle cx="10" cy="10" r="8"/><path d="M10 6v5M10 13h.01" stroke-linecap="round"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Virtual viewing unconfirmed</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Ngozi Eze requested Thu 9 May at 4:00 PM</div>
                </div>
                <button class="text-[12px] font-medium text-white bg-sage hover:bg-[#3a6038] px-4 py-2 rounded-full border-none cursor-pointer tt flex-shrink-0">Confirm</button>
              </div>
    
              <div class="flex items-center gap-4 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt flex-wrap">
                <div class="w-8 h-8 rounded-xl bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#D4AE3A" stroke-width="1.4"><path d="M10 2l2.5 5 5.5.8-4 3.9.95 5.5L10 14.5l-4.95 2.7.95-5.5-4-3.9 5.5-.8z" stroke-linejoin="round"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Boost expiring in 2 days</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Woji Studio Apartment boost ends 8 May 2026</div>
                </div>
                <a href="boosted.html" class="text-[12px] font-medium text-gold bg-gold/10 border border-gold/25 hover:bg-gold/20 px-4 py-2 rounded-full cursor-pointer tt flex-shrink-0 no-underline">Renew boost</a>
              </div>
    
              <div class="flex items-center gap-4 px-5 py-4 hover:bg-chalk-2 dark:hover:bg-white/[.025] tt flex-wrap">
                <div class="w-8 h-8 rounded-xl bg-chalk-2 dark:bg-white/[.06] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="#8C8070" stroke-width="1.4"><circle cx="10" cy="7" r="4"/><path d="M3 18c0-4 3.13-6 7-6s7 2 7 6" stroke-linecap="round"/></svg>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Profile is 75% complete</div>
                  <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Add bio, agency logo, and website to complete</div>
                </div>
                <a href="manage-profile.html" class="text-[12px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-white/[.07] border border-chalk-3 dark:border-white/[.1] hover:border-navy-dark hover:text-navy-dark dark:hover:text-white px-4 py-2 rounded-full cursor-pointer tt flex-shrink-0 no-underline">Complete</a>
              </div>
    
            </div>
          </div>
        </section>
      </div>
      </main>
  </div>