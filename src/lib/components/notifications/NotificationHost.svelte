<script lang="ts">
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import { notifications } from '$lib/stores/notification.svelte';
	import type { NotificationType } from '$lib/types/notification';

	// Full class strings so Tailwind can see them. Colours match the status chips
	// already used in the app (emerald / red / sky / amber).
	// Dark mode: chips switch to translucent tints with lighter text so they stay
	// readable on a dark card; accent bars shift one step lighter for contrast.
	const STYLES: Record<NotificationType, { label: string; chip: string; bar: string }> = {
		info: {
			label: 'Info',
			chip: 'bg-sky-50 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300',
			bar: 'before:bg-sky-500 dark:before:bg-sky-400'
		},
		success: {
			label: 'Success',
			chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-400/15 dark:text-emerald-300',
			bar: 'before:bg-emerald-500 dark:before:bg-emerald-400'
		},
		error: {
			label: 'Error',
			chip: 'bg-red-50 text-red-700 dark:bg-red-400/15 dark:text-red-300',
			bar: 'before:bg-red-700 dark:before:bg-red-400'
		},
		warning: {
			label: 'Warning',
			chip: 'bg-amber-50 text-amber-800 dark:bg-amber-400/15 dark:text-amber-300',
			bar: 'before:bg-amber-500 dark:before:bg-amber-400'
		}
	};

	let host = $state<HTMLElement>();

	// ── Auto-dismiss: one independent timer per notification ────────────────
	// Plain Map (not reactive) so scheduling never re-triggers the effect.
	const timers = new Map<string, ReturnType<typeof setTimeout>>();

	$effect(() => {
		const liveIds = new Set<string>();

		for (const n of notifications.active) {
			liveIds.add(n.id);
			if (n.duration > 0 && !timers.has(n.id)) {
				const remaining = Math.max(0, n.createdAt + n.duration - Date.now());
				timers.set(
					n.id,
					setTimeout(() => {
						timers.delete(n.id);
						notifications.dismiss(n.id); // no-op if it was already dismissed
					}, remaining)
				);
			}
		}

		// Cancel timers for notifications that were dismissed manually or removed
		for (const [id, handle] of timers) {
			if (!liveIds.has(id)) {
				clearTimeout(handle);
				timers.delete(id);
			}
		}
	});

	// No dependencies, so this teardown only runs when the host is destroyed.
	$effect(() => {
		return () => {
			for (const handle of timers.values()) clearTimeout(handle);
			timers.clear();
		};
	});

	// ── Stay above native <dialog> modals ───────────────────────────────────
	// showModal() puts a dialog in the browser's top layer, which z-index cannot beat.
	// A popover lives in the top layer too, and later entries stack on top, so we
	// (re)open it whenever something new needs to be seen.

	// `:popover-open` is an invalid selector (it throws) in browsers without the Popover API,
	// so always feature-check before using it.
	const popoverOpen = (el: HTMLElement) =>
		typeof el.showPopover === 'function' && el.matches(':popover-open');

	function bringToFront() {
		if (!host || typeof host.showPopover !== 'function') return;
		if (popoverOpen(host)) host.hidePopover();
		host.showPopover();
	}

	let knownIds = new Set<string>();

	$effect(() => {
		if (!host) return;
		const ids = notifications.active.map((n) => n.id);
		const hasNew = ids.some((id) => !knownIds.has(id));
		knownIds = new Set(ids);
		if (hasNew || !popoverOpen(host)) bringToFront();
	});

	// If a modal opens while notifications are visible, lift them above it again.
	$effect(() => {
		if (!host) return;
		const observer = new MutationObserver((records) => {
			const dialogOpened = records.some(
				(r) => r.target instanceof HTMLDialogElement && r.target.open
			);
			if (dialogOpened && notifications.active.length > 0) bringToFront();
		});
		observer.observe(document.body, {
			subtree: true,
			attributes: true,
			attributeFilter: ['open']
		});
		return () => observer.disconnect();
	});

	const motion = $derived(prefersReducedMotion.current ? 0 : 1);
</script>

{#snippet icon(type: NotificationType)}
	<svg
		class="h-4 w-4"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		stroke-width="1.8"
		stroke-linecap="round"
		stroke-linejoin="round"
		aria-hidden="true"
	>
		{#if type === 'success'}
			<path d="M5 12.5l4.5 4.5L19 7.5" />
		{:else if type === 'error'}
			<circle cx="12" cy="12" r="9" />
			<path d="M9 9l6 6M15 9l-6 6" />
		{:else if type === 'warning'}
			<path d="M12 3.5L21.5 20h-19L12 3.5zM12 10v4.5M12 17.5h.01" />
		{:else}
			<circle cx="12" cy="12" r="9" />
			<path d="M12 11v5.5M12 7.5h.01" />
		{/if}
	</svg>
{/snippet}

<!--
	popover="manual" = top layer without light-dismiss. Do NOT add a display class
	(flex/grid/block) to this element: it would override the popover's display:none.
-->
<div
	bind:this={host}
	popover="manual"
	class="pointer-events-none fixed inset-auto right-0 top-16 m-0 h-auto max-h-[calc(100dvh-4rem)] w-full max-w-[26rem] overflow-visible border-0 bg-transparent p-3 text-ink sm:p-4 dark:text-neutral-100"
>
	<div class="flex flex-col gap-2.5">
		{#each notifications.active as n (n.id)}
			{@const s = STYLES[n.type]}
			<div
				role={n.type === 'error' ? 'alert' : 'status'}
				aria-live={n.type === 'error' ? 'assertive' : 'polite'}
				aria-atomic="true"
				data-type={n.type}
				class="pointer-events-auto relative flex items-start gap-3 overflow-hidden rounded-2xl border border-ink/10 bg-paper py-3.5 pl-5 pr-3.5 shadow-2xl shadow-ink/25 before:absolute before:inset-y-4 before:left-0 before:w-1 before:rounded-full dark:border-white/10 dark:bg-neutral-900 dark:shadow-black/60 {s.bar}"
				transition:fly={{ x: 32, duration: 220 * motion }}
				animate:flip={{ duration: 200 * motion }}
			>
				<span class="grid h-8 w-8 shrink-0 place-items-center rounded-lg {s.chip}">
					{@render icon(n.type)}
				</span>

				<div class="min-w-0 flex-1 pt-0.5">
					<p class="text-[14px] font-semibold leading-tight text-ink dark:text-neutral-50">
						{n.title ?? s.label}
					</p>
					<p class="mt-1 break-words text-[13.5px] leading-snug text-ink/70 dark:text-neutral-300">
						{n.message}
					</p>
				</div>

				{#if n.dismissible}
					<button
						type="button"
						aria-label="Dismiss {s.label.toLowerCase()} notification"
						onclick={() => notifications.dismiss(n.id)}
						class="-my-0.5 shrink-0 rounded-lg p-1.5 text-ink/60 hover:bg-ink/5 hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral dark:text-neutral-400 dark:hover:bg-white/10 dark:hover:text-neutral-50"
					>
						<svg
							class="h-[18px] w-[18px]"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							aria-hidden="true"
						>
							<path d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
				{/if}
			</div>
		{/each}
	</div>
</div>

<!--  [Usage]
notifications.info('Your changes are being processed.');
notifications.warning('Some required fields are incomplete.', { duration: 0 }); // stays until dismissed
const id = notifications.info('Importing…', { dismissible: false });
notifications.dismiss(id);
notifications.dismissAll();
notifications.active;   // on screen now
notifications.history;  // last 20 closed, newest first (memory only, never saved to storage) 
-->