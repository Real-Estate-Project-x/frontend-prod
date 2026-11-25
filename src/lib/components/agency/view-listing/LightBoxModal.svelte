<script lang="ts">
	/**
	 * Simple lightbox modal for image galleries.
	 *
	 * @prop {boolean} open        - whether the modal is visible
	 * @prop {string[]} images     - array of image URLs
	 * @prop {number}  [index=0]   - image to show when opened
	 * @prop {() => void} onClose  - close callback
	 */
	let { open, images = [], index = 0, onClose } = $props();

	let currentIndex = $state(Math.min(Math.max(index, 0), images.length - 1));

	// Snap to the requested image whenever the modal is opened.
	$effect(() => {
		if (open && images.length) {
			currentIndex = Math.min(Math.max(index, 0), images.length - 1);
		}
	});

	function close() {
		onClose?.();
	}

	function prev() {
		if (!images.length) return;
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function next() {
		if (!images.length) return;
		currentIndex = (currentIndex + 1) % images.length;
	}

	function handleKeydown(event: KeyboardEvent) {
		if (!open) return;
		if (event.key === 'Escape') close();
		else if (event.key === 'ArrowLeft') prev();
		else if (event.key === 'ArrowRight') next();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open && images.length}
	<div
		class="fixed inset-0 z-[100] flex items-center justify-center bg-navy-deep/90 backdrop-blur-sm"
		onclick={close}
		role="dialog"
		aria-modal="true"
	>
		<!-- Close button -->
		<button
			onclick={(e) => { e.stopPropagation(); close(); }}
			class="tt absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
			aria-label="Close"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M3 3l10 10M13 3L3 13" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
			</svg>
		</button>

		<!-- Counter -->
		<span class="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur">
			{currentIndex + 1} / {images.length}
		</span>

		<!-- Prev -->
		<button
			onclick={(e) => { e.stopPropagation(); prev(); }}
			class="tt absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
			aria-label="Previous image"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>

		<!-- Next -->
		<button
			onclick={(e) => { e.stopPropagation(); next(); }}
			class="tt absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
			aria-label="Next image"
		>
			<svg width="16" height="16" viewBox="0 0 16 16" fill="none">
				<path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
		</button>

		<!-- Image -->
		<img
			src={images[currentIndex]}
			alt="Property image {currentIndex + 1}"
			class="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
			onclick={(e) => e.stopPropagation()}
		/>
	</div>
{/if}