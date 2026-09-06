<script>
	// Boost plan options — kept here since only this modal needs them.
	const PLANS = [
		{ id: '3d', label: '3 days', price: 5000, hours: 72 },
		{ id: '7d', label: '7 days', price: 12000, hours: 168 },
		{ id: '14d', label: '14 days', price: 20000, hours: 336 },
		{ id: '30d', label: '30 days', price: 35000, hours: 720 }
	];

	/** @type {{ open: boolean, property: object | null, onClose: () => void, onConfirm: (planId: string) => void }} */
	let { open, property, onClose, onConfirm } = $props();

	let selectedPlanId = $state('7d');

	// Reset back to the default plan every time the modal is (re)opened.
	$effect(() => {
		if (open) selectedPlanId = '7d';
	});

	let selectedPlan = $derived(PLANS.find((pl) => pl.id === selectedPlanId));

	function priceLabel(p) {
		if (p.price >= 1e6) return `₦${(p.price / 1e6).toFixed(1).replace(/\.0$/, '')}M`;
		if (p.price >= 1e3) return `₦${(p.price / 1e3).toFixed(0)}k`;
		return `₦${p.price}`;
	}
</script>

{#if open && property}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
		<div class="modal-bg absolute inset-0" onclick={onClose} role="presentation"></div>
		<div class="relative w-full max-w-[480px] bg-white dark:bg-[#0D1422] rounded-2xl overflow-hidden shadow-2xl scale-in border border-chalk-3 dark:border-white/[.07] tt">
			<div class="px-6 py-5 border-b border-chalk-3 dark:border-white/[.07] flex items-center justify-between bg-navy-dark dark:bg-[#080F1C]">
				<div>
					<div class="flex items-center gap-2 mb-1">
						<div class="w-6 h-6 rounded-lg bg-gold/20 flex items-center justify-center">
							<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#D4AE3A" stroke-width="1.2" stroke-linejoin="round" /></svg>
						</div>
						<span class="text-[13px] font-medium text-white">Boost this listing</span>
					</div>
					<p class="text-[11px] text-white/50">Get more eyes on your property</p>
				</div>
				<button onclick={onClose} aria-label="Close" class="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 tt border-none">
					<svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M3 3l8 8M11 3l-8 8" stroke="white" stroke-width="1.5" stroke-linecap="round" /></svg>
				</button>
			</div>

			<div class="p-6 overflow-y-auto max-h-[80vh]">
				<div class="flex items-center gap-3 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3.5 mb-5 tt">
					<div class="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 {property.sky}"></div>
					<div class="min-w-0">
						<div class="text-[13px] font-medium text-navy-dark dark:text-blue-100 truncate max-w-[280px]">{property.title}</div>
						<div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0] truncate max-w-[280px] mt-0.5">{property.location}</div>
					</div>
				</div>

				<div class="grid grid-cols-2 gap-2.5 mb-6">
					<div class="flex items-start gap-2 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3">
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="text-sage flex-shrink-0 mt-0.5"><path d="M1 8s2.5-4.5 7-4.5S15 8 15 8s-2.5 4.5-7 4.5S1 8 1 8z" stroke="currentColor" stroke-width="1.3" /><circle cx="8" cy="8" r="2" stroke="currentColor" stroke-width="1.3" /></svg>
						<span class="text-[11.5px] text-navy-dark dark:text-blue-100 leading-snug">Increased visibility</span>
					</div>
					<div class="flex items-start gap-2 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3">
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="text-sage flex-shrink-0 mt-0.5"><path d="M2 13V9M6 13V5M10 13V7M14 13V3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" /></svg>
						<span class="text-[11.5px] text-navy-dark dark:text-blue-100 leading-snug">Higher placement in search</span>
					</div>
					<div class="flex items-start gap-2 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3">
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="text-sage flex-shrink-0 mt-0.5"><path d="M2 9l3-4 2 2 3-5 4 7" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" /></svg>
						<span class="text-[11.5px] text-navy-dark dark:text-blue-100 leading-snug">More potential leads</span>
					</div>
					<div class="flex items-start gap-2 bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-3">
						<svg width="14" height="14" viewBox="0 0 16 16" fill="none" class="text-sage flex-shrink-0 mt-0.5"><circle cx="8" cy="8" r="6" stroke="currentColor" stroke-width="1.3" /><path d="M8 5v3l2 2" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" /></svg>
						<span class="text-[11.5px] text-navy-dark dark:text-blue-100 leading-snug">Greater exposure, fast</span>
					</div>
				</div>

				<p class="text-[10px] font-medium tracking-[.12em] uppercase text-chalk-muted dark:text-[#6A7FA0] mb-3">Choose a duration</p>
				<div class="grid grid-cols-2 gap-2.5 mb-6">
					{#each PLANS as plan (plan.id)}
						<div
							onclick={() => (selectedPlanId = plan.id)}
							onkeydown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), (selectedPlanId = plan.id))}
							class="plan-card bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/[.07] rounded-xl p-3.5 cursor-pointer tt"
							style="outline:2px solid {plan.id === selectedPlanId ? '#D4AE3A' : 'transparent'};outline-offset:2px;transition:outline .18s"
							role="button"
							tabindex="0"
						>
							<div class="text-[10px] font-semibold tracking-[.08em] uppercase text-navy-accent dark:text-[#8DAACC] mb-1.5">
								{plan.label}
								{#if plan.id === '7d'}<span class="bg-gold/15 text-gold px-1.5 py-0.5 rounded-full text-[9px] ml-1">Popular</span>{/if}
							</div>
							<div class="font-display font-semibold text-navy-dark dark:text-blue-100 leading-none" style="font-size:18px">{priceLabel(plan)}</div>
						</div>
					{/each}
				</div>

				<div class="flex items-center justify-between bg-chalk-2 dark:bg-[#1A2438] rounded-xl p-4 mb-5 tt">
					<div>
						<div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Selected plan</div>
						<div class="text-[14px] font-medium text-navy-dark dark:text-blue-100">{selectedPlan?.label}</div>
					</div>
					<div class="text-right">
						<div class="text-[11px] text-chalk-muted dark:text-[#6A7FA0]">Total</div>
						<div class="font-display font-semibold text-navy-dark dark:text-blue-100" style="font-size:20px">{selectedPlan ? priceLabel(selectedPlan) : '₦0'}</div>
					</div>
				</div>

				<button onclick={() => onConfirm(selectedPlanId)} class="w-full py-3.5 text-[13px] font-medium text-navy-deep bg-gold hover:brightness-95 rounded-full border-none cursor-pointer tt flex items-center justify-center gap-2">
					<svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M7 1l1.5 3.5 3.5.5-2.5 2.4.6 3.5L7 9.5l-3.1 1.4.6-3.5L2 5l3.5-.5z" stroke="#2E2405" stroke-width="1.3" stroke-linejoin="round" /></svg>
					Boost Listing
				</button>
			</div>
		</div>
	</div>
{/if}
