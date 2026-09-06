<script lang="ts">
	/**
	 * Pagination.svelte
	 *
	 * Usage:
	 * <Pagination
	 *   currentPage={2}
	 *   pageSize={10}
	 *   totalCount={26}
	 *   totalPages={3}
	 *   hasNext={true}
	 *   hasPrevious={true}
	 *   onPageChange={(page) => fetchData(page)}
	 *   onPerPageChange={(size) => fetchData(1, size)}
	 * />
	 */

	let {
		currentPage = 1,
		pageSize = 12,
		totalCount = 0,
		totalPages = 1,
		hasNext = false,
		hasPrevious = false,
		perPageOptions = [6, 12, 18],
		onPageChange = (_page: number) => {},
		onPerPageChange = (_size: number) => {}
	} = $props();

	// Local mirror of perPage so the <select> is controllable, but the
	// source of truth (after a change) is pushed back up via onPerPageChange.
	let perPage = $state(pageSize);

	// Keep local perPage in sync if the parent updates pageSize externally
	$effect(() => {
		perPage = pageSize;
	});

	// Clamp currentPage into a valid range in case of stale/odd payloads
	const safePage = $derived(Math.min(Math.max(currentPage, 1), Math.max(totalPages, 1)));

	// Windowed page numbers with ellipsis support for larger totalPages
	const pageNumbers = $derived.by(() => {
		const total = totalPages;
		const current = safePage;
		const delta = 2; // pages to show on each side of current
		const pages = [];

		if (total <= 7) {
			for (let i = 1; i <= total; i++) pages.push(i);
			return pages;
		}

		const start = Math.max(2, current - delta);
		const end = Math.min(total - 1, current + delta);

		pages.push(1);
		if (start > 2) pages.push('...');
		for (let i = start; i <= end; i++) pages.push(i);
		if (end < total - 1) pages.push('...');
		pages.push(total);

		return pages;
	});

	let paginationEl;

	function goPrevPage() {
		if (!hasPrevious) return;
		onPageChange(safePage - 1);
	}

	function goNextPage() {
		if (!hasNext) return;
		onPageChange(safePage + 1);
	}

	function goToPage(n) {
		if (typeof n !== 'number' || n === safePage) return;
		onPageChange(n);
	}

	function jumpToPage(e) {
		let value = parseInt(e.currentTarget.value, 10);
		if (Number.isNaN(value)) value = safePage;
		value = Math.min(Math.max(value, 1), totalPages);
		e.currentTarget.value = String(value);
		onPageChange(value);
	}

	function handlePerPageChange(e) {
		const size = parseInt(e.currentTarget.value, 10);
		perPage = size;
		onPerPageChange(size);
	}
</script>

<div
	bind:this={paginationEl}
	class="mt-10 bg-white dark:bg-[#131C2E] border border-chalk-3 dark:border-white/[.08] rounded-2xl p-5 tt fu"
>
	<div class="flex flex-col sm:flex-row items-center justify-between gap-4">
		<div class="flex items-center gap-2 text-[13px] text-chalk-muted dark:text-[#6A7FA0]">
			<span class="hidden sm:inline">Show</span>
			<select
				value={perPage}
				onchange={handlePerPageChange}
				class="bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-3 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 cursor-pointer outline-none tt"
			>
				{#each perPageOptions as option (option)}
					<option value={option} selected={option === pageSize}>
						{option} per page
					</option>
				{/each}
			</select>
		</div>

		<div class="flex items-center gap-1.5">
			<button
				onclick={goPrevPage}
				disabled={!hasPrevious}
				class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-chalk-3 dark:disabled:hover:border-white/10"
			>
				<svg width="12" height="12" viewBox="0 0 14 14" fill="none"
					><path
						d="M9 2L4 7l5 5"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>Prev
			</button>

			<span class="flex items-center gap-1.5">
				{#each pageNumbers as n, i (i + '-' + n)}
					{#if n === '...'}
						<span class="w-9 h-9 flex items-center justify-center text-[13px] text-chalk-muted dark:text-[#6A7FA0]">…</span>
					{:else}
						<button
							onclick={() => goToPage(n)}
							class="pgbtn {n === safePage ? 'active' : ''} w-9 h-9 rounded-xl border {n === safePage
								? 'border-navy-dark'
								: 'border-chalk-3 dark:border-white/10 text-navy-dark dark:text-blue-100 hover:border-navy-dark dark:hover:border-white/40'} text-[13px] tt bg-transparent cursor-pointer"
						>{n}</button>
					{/if}
				{/each}
			</span>

			<button
				onclick={goNextPage}
				disabled={!hasNext}
				class="flex items-center gap-1.5 px-3.5 h-9 rounded-xl border border-chalk-3 dark:border-white/10 text-[12px] text-chalk-muted dark:text-[#6A7FA0] hover:border-navy-dark dark:hover:border-white/30 hover:text-navy-dark dark:hover:text-white tt bg-transparent cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-chalk-3 dark:disabled:hover:border-white/10"
			>
				Next<svg width="12" height="12" viewBox="0 0 14 14" fill="none"
					><path
						d="M5 2l5 5-5 5"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/></svg
				>
			</button>
		</div>

		<div class="hidden sm:flex items-center gap-2 text-[12px] text-chalk-muted dark:text-[#6A7FA0]">
			Go to
			<input
				type="number"
				min="1"
				max={totalPages}
				value={safePage}
				onchange={jumpToPage}
				class="w-14 bg-chalk dark:bg-[#1A2438] border border-chalk-3 dark:border-white/10 rounded-lg px-2 py-1.5 text-[12px] text-navy-dark dark:text-blue-100 outline-none text-center tt focus:border-blue-link"
			/>
			of <span>{totalPages}</span>
		</div>
	</div>
</div>