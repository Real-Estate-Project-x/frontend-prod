<script>
	/** @type {{ open: boolean, property: object | null, onClose: () => void, onConfirm: () => void }} */
	let { open, property, onClose, onConfirm } = $props();
</script>

{#if open && property}
	<div class="fixed inset-0 z-[100] flex items-center justify-center p-4">
		<div class="modal-bg absolute inset-0" onclick={onClose} role="presentation"></div>
		<div class="relative w-full max-w-[400px] bg-white dark:bg-[#0D1422] rounded-2xl overflow-hidden shadow-2xl scale-in border border-chalk-3 dark:border-white/[.07] tt p-6">
			<div class="w-12 h-12 rounded-2xl bg-ember-light dark:bg-ember/10 flex items-center justify-center mx-auto mb-4">
				<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#C06035" stroke-width="1.4" stroke-linecap="round"><path d="M3 6h14M8 6V4h4v2M5 6l1 11h8l1-11" /></svg>
			</div>
			<h3 class="font-display font-light text-center text-navy-dark dark:text-blue-100 mb-1" style="font-size:20px">Take this listing down?</h3>
			<p class="text-[13px] font-light text-center text-chalk-muted dark:text-[#6A7FA0] mb-6">
				"{property.title}" will be taken off the marketplace. You can restore it at any time.
			</p>
			<div class="flex gap-3">
				<button onclick={onClose} class="flex-1 py-2.5 text-[13px] font-medium text-chalk-muted dark:text-[#6A7FA0] bg-chalk-2 dark:bg-[#1A2438] rounded-full border-none cursor-pointer hover:bg-chalk-3 tt">Cancel</button>
				<button onclick={onConfirm} class="flex-1 py-2.5 text-[13px] font-medium text-white bg-ember hover:bg-ember-deep rounded-full border-none cursor-pointer tt">Take Down</button>
			</div>
		</div>
	</div>
{/if}
