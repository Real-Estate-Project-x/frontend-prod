<script lang="ts">
   import AgencySidebar from "$lib/components/shared/AgencySidebar.svelte";

    type TabType = 'notifications' | 'display' | 'team & ops';
    let selectedTab = $state<TabType>('notifications');

    const setTab = (value: TabType) => selectedTab = value;

</script>

<!-- ══ LAYOUT ══ -->
<div class="flex pt-[68px] min-h-screen">
    <AgencySidebar />

    <!-- ═══ MAIN CONTENT ═══ -->
    <main class="flex-1 min-w-0 overflow-x-hidden">

        <!-- PAGE HEADER -->
        <div class="bg-navy-dark dark:bg-[#080F1C] px-6 lg:px-10 py-8 border-b border-white/[0.06] tt">
        <div class="max-w-[1040px] mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
            <p class="text-[10px] font-medium tracking-[.18em] uppercase text-blue-bright mb-2">Agency admin</p>
            <h1 class="font-display font-light text-white leading-[1.05]" style="font-size:clamp(26px,3.5vw,40px)">
                Agency <em class="italic text-chalk-3">settings.</em>
            </h1>
            <p class="text-[13px] font-light text-white/50 mt-1.5">Platform preferences, notifications, security, and operational controls for your agency.</p>
            </div>
        </div>
        </div>

        <!-- SETTINGS BODY -->
        <div class="px-6 lg:px-10 py-7 max-w-[1040px] mx-auto">
            <div class="flex gap-7 settings-layout">

            <!-- ─── LEFT SETTINGS NAV ─── -->
            <div class="snav-sidebar w-[188px] flex-shrink-0">
                <div class="snav-inner flex flex-col gap-0.5 sticky top-[88px]">
                <div class="slabel px-3 mb-2 mt-1 hide-xs">Settings</div>
                <button onclick={() => setTab('notifications')} class="snav-link active" id="snav-notifications">
                    <svg class="w-[14px] h-[14px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                    Notifications
                </button>
                <button onclick={() => setTab('team & ops')} class="snav-link" id="snav-team">
                    <svg class="w-[14px] h-[14px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="3.5" stroke="currentColor" stroke-width="1.4"/><circle cx="14" cy="7" r="2.5" stroke="currentColor" stroke-width="1.4"/><path d="M1 17c0-3.5 2.7-5 6-5s6 1.5 6 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/><path d="M14 12c2 0 4 1 4 4" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                    Team &amp; ops
                </button>
                <button onclick={() => setTab('display')} class="snav-link" id="snav-display">
                    <svg class="w-[14px] h-[14px] flex-shrink-0" viewBox="0 0 20 20" fill="none"><rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" stroke-width="1.4"/><path d="M7 18h6M10 16v2" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>
                    Display
                </button>
                </div>
            </div>

            <!-- ─── RIGHT CONTENT PANELS ─── -->
            <div class="flex-1 min-w-0 space-y-4">

                {#if selectedTab === 'notifications'}
                <!-- ══ SECTION 1: NOTIFICATIONS ══ -->
                <div id="sec-notifications" class="sec-panel active">
                    <div class="space-y-4">
        
                    <!-- Email -->
                    <div class="scard fu d1">
                        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center justify-between">
                        <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-lg bg-blue-bright/10 flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="2" y="5" width="16" height="12" rx="2" stroke="#4A90E2" stroke-width="1.4"/><path d="M2 8l8 5 8-5" stroke="#4A90E2" stroke-width="1.4" stroke-linecap="round"/></svg></div>
                            <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Email notifications</span>
                        </div>
                        <span class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">6 of 8 active</span>
                        </div>
                        <div class="divide-y divide-chalk-3 dark:divide-white/[0.06]">
                        <div class="set-row px-6">
                            <div class="flex-1 min-w-0">
                                <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">New enquiries</div>
                                <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">
                                    Email when a buyer or renter sends an enquiry on any listing
                                </div>
                            </div>
                            <!-- To handle toggle effect, simply add the 'on' class -->
                            <div class="tog-track on">
                                <div class="tog-thumb"></div>
                            </div>
                        </div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">New viewing requests</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Email when a viewing is booked on any of your listings</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Property saves</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Daily digest when users save your properties to their wishlists</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Virtual viewing requests</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Email when a virtual tour is booked, including platform preference</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Listing performance updates</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Alerts when a listing crosses view or enquiry milestones</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Weekly performance summary</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Every Monday: views, enquiries, and top-performing listings</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Boost expiry reminders</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">48-hour advance notice before any active boost expires</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Agency user activity</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">When team members add or edit listings under the agency</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button onclick={() => {}} class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Save</button>
                        </div>
                    </div>
        
                    <!-- SMS -->
                    <div class="scard fu d2">
                        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-sage-light flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><rect x="5" y="2" width="10" height="16" rx="2" stroke="#4A7848" stroke-width="1.4"/><circle cx="10" cy="15" r="1" fill="#4A7848"/><path d="M8 5h4" stroke="#4A7848" stroke-width="1.3" stroke-linecap="round"/></svg></div>
                        <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">SMS notifications</span>
                        </div>
                        <div class="divide-y divide-chalk-3 dark:divide-white/[0.06]">
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Viewing reminders</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">SMS 1 hour before each scheduled viewing</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Urgent enquiries</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">SMS for high-priority or marked-urgent enquiries only</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Security alerts</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Login from new device or unusual account activity</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Payment confirmations</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">SMS when a boost payment or payout is processed</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button onclick={() => {}} class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Save</button>
                        </div>
                    </div>
        
                    <!-- Push -->
                    <div class="scard fu d3">
                        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-ember-light flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><path d="M10 2a6 6 0 00-6 6v2l-1.5 2.5a1 1 0 00.86 1.5h13.28a1 1 0 00.86-1.5L16 10V8a6 6 0 00-6-6z" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/><path d="M8 15.5a2 2 0 004 0" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"/></svg></div>
                        <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Push notifications</span>
                        </div>
                        <div class="divide-y divide-chalk-3 dark:divide-white/[0.06]">
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">New enquiries</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Instant push notification for every new enquiry</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">New viewing requests</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Push when a viewing is scheduled on any of your listings</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Property engagement spikes</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">When a listing gets unusually high traffic in a short window</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Boost performance updates</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Weekly push when boosted listing crosses view thresholds</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Virtual viewing reminders</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">15-minute push reminder before a virtual tour starts</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button onclick={() => {}} class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Save</button>
                        </div>
                    </div>
        
                    <!-- Team routing -->
                    <div class="scard fu d4">
                        <div class="px-6 py-4 border-b border-chalk-3 dark:border-white/[0.07] flex items-center gap-2.5">
                        <div class="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center flex-shrink-0"><svg width="14" height="14" viewBox="0 0 20 20" fill="none"><circle cx="7" cy="7" r="3.5" stroke="#D4AE3A" stroke-width="1.4"/><circle cx="14" cy="7" r="2.5" stroke="#D4AE3A" stroke-width="1.4"/><path d="M1 17c0-3.5 2.7-5 6-5s6 1.5 6 5" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round"/><path d="M14 12c2 0 4 1 4 4" stroke="#D4AE3A" stroke-width="1.4" stroke-linecap="round"/></svg></div>
                        <span class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Team notification routing</span>
                        </div>
                        <div class="p-6">
                        <p class="text-[13px] text-chalk-muted dark:text-[#6A7FA0] leading-[1.7] mb-5">Choose who receives notifications for new enquiries and viewing requests.</p>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div class="route-opt selected"><div class="route-radio"><div class="route-dot"></div></div><div><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Assigned agent only</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Only the agent assigned to the listing</div></div></div>
                            <div class="route-opt"><div class="route-radio"><div class="route-dot"></div></div><div><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Admins only</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Agency admins receive all notifications</div></div></div>
                            <div class="route-opt"><div class="route-radio"><div class="route-dot"></div></div><div><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Entire agency</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">All team members get notified</div></div></div>
                            <div class="route-opt"><div class="route-radio"><div class="route-dot"></div></div><div><div class="text-[13px] font-medium text-navy-dark dark:text-blue-100">Assigned + admin</div><div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Agent assigned plus all admins</div></div></div>
                        </div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button onclick={() => {}} class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Save routing</button>
                        </div>
                    </div>
        
                    </div>
                </div>
                {/if}

                {#if selectedTab === 'display'}
                <!-- ══ SECTION 6: DISPLAY ══ -->
                <div id="sec-display" class="sec-panel active">
                    <div class="space-y-4">
        
                    <!-- Theme preference -->
                    <div class="scard fu d1">
                        <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07]">
                        <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Theme preference</div>
                        <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Controls the visual appearance of your Blupodd dashboard.</div>
                        </div>
                        <div class="p-6">
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <!-- Light -->
                            <div class="theme-opt" id="theme-light">
                            <div class="w-full h-[80px] rounded-xl bg-gradient-to-br from-chalk to-chalk-2 border border-chalk-3 mb-3 relative overflow-hidden">
                                <div class="absolute top-3 left-3 right-3 h-3 bg-white rounded-md border border-chalk-3"></div>
                                <div class="absolute top-8 left-3 w-12 h-2 bg-chalk-3 rounded-sm"></div>
                                <div class="absolute top-12 left-3 w-8 h-2 bg-chalk-3 rounded-sm opacity-60"></div>
                            </div>
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Light</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Bright, clean surfaces</div>
                            </div>
                            <!-- Dark -->
                            <div class="theme-opt selected" id="theme-dark">
                            <div class="w-full h-[80px] rounded-xl bg-gradient-to-br from-navy-deep to-navy-mid border border-white/10 mb-3 relative overflow-hidden">
                                <div class="absolute top-3 left-3 right-3 h-3 bg-navy-strong/60 rounded-md border border-white/10"></div>
                                <div class="absolute top-8 left-3 w-12 h-2 bg-white/15 rounded-sm"></div>
                                <div class="absolute top-12 left-3 w-8 h-2 bg-white/10 rounded-sm"></div>
                            </div>
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Dark</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Easy on the eyes</div>
                            </div>
                            <!-- System -->
                            <div class="theme-opt" id="theme-system">
                            <div class="w-full h-[80px] rounded-xl overflow-hidden border border-chalk-3 mb-3 relative" style="background:linear-gradient(90deg,#FEFCF8 50%,#060E1C 50%)">
                                <div class="absolute top-3 left-2 w-[44%] h-3 bg-white rounded-md border border-chalk-3"></div>
                                <div class="absolute top-3 right-2 w-[44%] h-3 bg-navy-strong/50 rounded-md border border-white/10"></div>
                            </div>
                            <div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">System</div>
                            <div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Follow OS setting</div>
                            </div>
                        </div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Apply theme</button>
                        </div>
                    </div>
        
                    <!-- Compact mode -->
                    <div class="scard fu d2">
                        <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07]">
                        <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Display preferences</div>
                        <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Adjust how the dashboard lays out and shows information.</div>
                        </div>
                        <div class="divide-y divide-chalk-3 dark:divide-white/[0.06]">
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Compact dashboard mode</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Reduces spacing and card sizes for more information density</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Show listing IDs</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Display BLU reference numbers on all listing cards</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Animations &amp; transitions</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Enable smooth animations throughout the dashboard</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button onclick={() => {}} class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Save</button>
                        </div>
                    </div>
        
                    </div>
                </div>
                {/if}

                {#if selectedTab === 'team & ops'}
                <!-- ══ SECTION 3: TEAM & OPS ══ -->
                <div id="sec-team" class="sec-panel active">
                    <div class="space-y-4">
        
                    <div class="scard fu d1">
                        <div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[0.07]">
                        <div class="text-[14px] font-medium text-navy-dark dark:text-blue-100 mb-0.5">Team &amp; operational settings</div>
                        <div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0]">Controls how your team manages enquiries, viewings, and permissions.</div>
                        </div>
                        <div class="divide-y divide-chalk-3 dark:divide-white/[0.06]">
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Auto-assign enquiries</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Incoming enquiries are automatically routed to the listing's assigned agent</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Auto-assign viewings</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Viewing requests are automatically assigned to the listing's agent</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Viewing approval required</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Agents must confirm viewings before the client receives a confirmation</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Allow agents to edit listings</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Sub-agents can edit any listing they are assigned to</div></div><div class="tog-track"><div class="tog-thumb"></div></div></div>
                        <div class="set-row px-6"><div class="flex-1 min-w-0"><div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">Agent profile visibility</div><div class="text-[12px] text-chalk-muted dark:text-[#6A7FA0] mt-0.5">Sub-agent profiles are visible to the public on listings they manage</div></div><div class="tog-track on"><div class="tog-thumb"></div></div></div>
                        </div>
                        <div class="px-6 py-4 border-t border-chalk-3 dark:border-white/[0.07] bg-chalk-2/40 dark:bg-white/[0.02] flex justify-end">
                        <button onclick={() => {}} class="save-btn flex items-center gap-2 text-[13px] font-medium text-white bg-navy-dark dark:bg-blue-bright hover:opacity-90 px-5 py-2 rounded-full border-none cursor-pointer tt">Save</button>
                        </div>
                    </div>
        
                    </div>
                </div>
                {/if}

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
    .d4{animation-delay:.19s}.d5{animation-delay:.24s}.d6{animation-delay:.30s}
    @keyframes scaleIn{from{opacity:0;transform:scale(.97) translateY(6px)}to{opacity:1;transform:scale(1) translateY(0)}}
    .scale-in{animation:scaleIn .24s cubic-bezier(.22,.68,0,1.2) both}
    
    /* Settings nav (left mini-nav) */
    .snav-link{display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:10px;font-size:13px;color:#8C8070;cursor:pointer;transition:background .18s,color .18s;text-decoration:none;border:none;background:none;width:100%;text-align:left;font-family:'DM Sans',sans-serif;white-space:nowrap}
    .snav-link:hover{background:rgba(10,36,99,.05);color:#0A2463}
    .dark .snav-link:hover,
    :global([data-theme="dark"]) .snav-link:hover {background:rgba(255,255,255,.04);color:#E8EDF5}
    .snav-link.active{background:rgba(74,144,226,.1);color:#4A90E2;font-weight:500}
    .dark .snav-link.active,
    :global([data-theme="dark"]) .snav-link.active{background:rgba(74,144,226,.14)}
    
    /* Form inputs */
    .finp{width:100%;background:#fff;border:1.5px solid #EDE7DC;border-radius:10px;padding:10px 14px;font-size:14px;font-family:'DM Sans',sans-serif;color:#0A2463;outline:none;transition:border-color .2s,background .3s,box-shadow .2s}
    .finp:focus{border-color:rgba(74,144,226,.6);box-shadow:0 0 0 3px rgba(74,144,226,.09)}
    .finp::placeholder{color:#8C8070}
    .finp.error{border-color:rgba(192,96,53,.55)!important;box-shadow:0 0 0 3px rgba(192,96,53,.08)!important}
    .dark .finp,
    :global([data-theme="dark"]) .finp{background:#1A2438;border-color:rgba(255,255,255,.1);color:#E8EDF5}
    .dark .finp::placeholder,
    :global([data-theme="dark"]) .finp::placeholder{color:#4A5568}
    .dark .finp:focus,
    :global([data-theme="dark"]) .finp:focus{border-color:rgba(74,144,226,.5);box-shadow:0 0 0 3px rgba(74,144,226,.12)}
    .fsel-wrap{position:relative}
    .fsel-wrap::after{content:'▾';position:absolute;right:12px;top:50%;transform:translateY(-50%);font-size:11px;color:#8C8070;pointer-events:none}
    .dark .fsel-wrap::after,
    :global([data-theme="dark"]) .fsel-wrap::after{color:#6A7FA0}
    
    /* Toggle switch */
    .tog-track{width:40px;height:22px;border-radius:11px;background:#EDE7DC;position:relative;cursor:pointer;transition:background .25s;flex-shrink:0;border:none}
    .dark .tog-track,
    :global([data-theme="dark"]) .tog-track{background:rgba(255,255,255,.12)}
    .tog-track.on{background:#0A2463}
    .dark .tog-track.on,
    :global([data-theme="dark"]) .tog-track-on{background:#4A90E2}
    .tog-thumb{position:absolute;top:3px;left:3px;width:16px;height:16px;border-radius:50%;background:white;box-shadow:0 1px 3px rgba(0,0,0,.2);transition:transform .25s cubic-bezier(.34,1.2,.64,1)}
    .tog-track.on .tog-thumb{transform:translateX(18px)}
    
    /* Segmented control */
    .seg-ctrl{display:flex;background:#F7F3EC;border-radius:10px;padding:3px;gap:2px}
    .dark .seg-ctrl,
    :global([data-theme="dark"]) .seg-ctrl{background:rgba(255,255,255,.06)}
    .seg-btn{flex:1;padding:7px 10px;border-radius:8px;font-size:12px;font-weight:500;font-family:'DM Sans',sans-serif;cursor:pointer;border:none;color:#8C8070;background:transparent;transition:all .2s;text-align:center;white-space:nowrap}
    .dark .seg-btn,
    :global([data-theme="dark"]) .seg-btn{color:#6A7FA0}
    .seg-btn.active{background:#fff;color:#0A2463;box-shadow:0 1px 4px rgba(10,36,99,.12)}
    .dark .seg-btn.active,
    :global([data-theme="dark"]) .seg-btn.active{background:#1A2438;color:#E8EDF5;box-shadow:0 1px 4px rgba(0,0,0,.3)}
    
    /* Setting row */
    .set-row{
        display:flex;
        align-items:flex-start;
        justify-content:space-between;
        gap:16px;
        padding:14px 20px
    }
    .set-row+.set-row{border-top:1px solid #EDE7DC}
    .dark .set-row+.set-row,
    :global([data-theme="dark"]) .set-row+.set-row{border-top-color:rgba(255,255,255,.06)}
    
    /* Card */
    .scard{background:#fff;border:1px solid #EDE7DC;border-radius:16px;overflow:hidden;transition:box-shadow .22s}
    .dark .scard,
    :global([data-theme="dark"]) .scard{background:#0D1422;border-color:rgba(255,255,255,.07)}
    
    /* Section label */
    .slabel{font-size:10px;font-weight:500;letter-spacing:.16em;text-transform:uppercase;color:#8C8070}
    .dark .slabel,
    :global([data-theme="dark"]) .slabel{color:#6A7FA0}
    
    
    /* Pill */
    .pill{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:3px 9px;border-radius:20px}
    
    /* Toast */
    #gToast{transition:opacity .3s,transform .3s}
    
    /* Section panel */
    .sec-panel{display:none}
    .sec-panel.active{display:block}
    
    /* Theme option card */
    .theme-opt{border:2px solid #EDE7DC;border-radius:12px;padding:14px 16px;cursor:pointer;transition:border-color .2s,background .2s;flex:1}
    .dark .theme-opt,
    :global([data-theme="dark"]) .theme-opt{border-color:rgba(255,255,255,.08)}
    .theme-opt.selected{border-color:#4A90E2;background:rgba(74,144,226,.06)}
    .dark .theme-opt.selected,
    :global([data-theme="dark"]) .theme-opt.selected{background:rgba(74,144,226,.1)}
    .theme-opt:hover:not(.selected){border-color:rgba(74,144,226,.4)}
    
    /* Buffer option */
    .buf-btn{padding:7px 16px;border-radius:8px;font-size:12px;font-weight:500;font-family:'DM Sans',sans-serif;cursor:pointer;border:1.5px solid #EDE7DC;color:#8C8070;background:transparent;transition:all .18s}
    .dark .buf-btn,
    :global([data-theme="dark"]) .buf-btn{border-color:rgba(255,255,255,.1);color:#6A7FA0}
    .buf-btn.active{border-color:#0A2463;background:#0A2463;color:#fff}
    .dark .buf-btn.active,
    :global([data-theme="dark"]) .buf-btn.active{border-color:#4A90E2;background:#4A90E2}
    
    /* Notification routing */
    .route-opt{display:flex;align-items:center;gap:12px;padding:12px 14px;border:1.5px solid #EDE7DC;border-radius:12px;cursor:pointer;transition:all .18s}
    .dark .route-opt,
    :global([data-theme="dark"]) .route-opt{border-color:rgba(255,255,255,.08)}
    .route-opt:hover{border-color:rgba(74,144,226,.4)}
    .route-opt.selected{border-color:#0A2463;background:rgba(10,36,99,.04)}
    .dark .route-opt.selected,
    :global([data-theme="dark"]) .route-opt.selected{border-color:#4A90E2;background:rgba(74,144,226,.08)}
    .route-radio{width:18px;height:18px;border-radius:50%;border:2px solid #D8CEBC;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:border-color .18s}
    .dark .route-radio,
    :global([data-theme="dark"]) .route-radio{border-color:rgba(255,255,255,.2)}
    .route-opt.selected .route-radio{border-color:#0A2463}
    .dark .route-opt.selected .route-radio,
    :global([data-theme="dark"]) .route-opt.selected .route-radio{border-color:#4A90E2}
    .route-dot{width:8px;height:8px;border-radius:50%;background:#0A2463;display:none}
    .dark .route-dot,
    :global([data-theme="dark"]) .route-dot{background:#4A90E2}
    .route-opt.selected .route-dot{display:block}
    
    /* Security score */
    .sec-score-bar{height:6px;border-radius:3px;background:#EDE7DC;overflow:hidden}
    .dark .sec-score-bar,
    :global([data-theme="dark"]) .sec-score-bar{background:rgba(255,255,255,.08)}
    .sec-score-fill{height:100%;border-radius:3px;transition:width .5s ease}
    
    @media(max-width:1024px){.settings-layout{flex-direction:column!important}.snav-sidebar{width:100%!important;position:static!important;border-right:none!important;border-bottom:1px solid #EDE7DC;padding-bottom:8px}.dark .snav-sidebar{border-bottom-color:rgba(255,255,255,.07)}.snav-inner{display:flex!important;flex-direction:row!important;overflow-x:auto;gap:4px;padding:0 0 4px}.snav-link{white-space:nowrap;flex-shrink:0;padding:8px 12px}}
    @media(max-width:640px){.hide-xs{display:none!important}}
</style>