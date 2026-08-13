<script lang="ts">
	import type { ToastType } from "$lib/types";
	import { capitalizeSentences } from "$lib/utils";

	let {
		toastMsg,
		type = 'info'
	}: {
		toastMsg: string;
		type?: ToastType;
	} = $props();

	let shown = $state(false);

	$effect(() => {
		// depend on toastMsg/type so a re-mount-free toast swap re-plays the entrance
		toastMsg;
		type;
		shown = false;
		const raf = requestAnimationFrame(() => {
			shown = true;
		});
		return () => cancelAnimationFrame(raf);
	});
</script>

<!-- ═══ TOAST ═══ -->
<div class="toast {type}" 
	class:show={shown} 
	role="status" 
	aria-live="polite">
	{#if type === 'success'}
		<svg class="toast-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<circle cx="10" cy="10" r="9" fill="#34A853" />
			<path d="M6 10.2l2.6 2.6L14.5 7" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
		</svg>
	{:else if type === 'error'}
		<svg class="toast-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<circle cx="10" cy="10" r="9" fill="#EA4335" />
			<path d="M10 6.2v5" stroke="#fff" stroke-width="1.8" stroke-linecap="round" />
			<circle cx="10" cy="13.6" r="1" fill="#fff" />
		</svg>
	{:else if type === 'info'}
		<svg class="toast-icon" width="16" height="16" viewBox="0 0 20 20" fill="none" aria-hidden="true">
			<circle cx="10" cy="10" r="9" fill="#4285F4" />
			<circle cx="10" cy="6.4" r="1" fill="#fff" />
			<path d="M10 9.2v4.4" stroke="#fff" stroke-width="1.8" stroke-linecap="round" />
		</svg>
	{/if}
	<span class="toast-text">{capitalizeSentences(toastMsg)}</span>
</div>

<style>
	/* ── Toast Base ───────────────────────────────────────────────────── */
	.toast {
		position: fixed;
		bottom: 22px;
		left: 50%;
		transform: translateX(-50%) translateY(8px);

		display: flex;
		align-items: center;
		gap: 10px;

		max-width: min(92vw, 580px);
		background: #323232;
		color: rgba(255, 255, 255, 0.94);

		font-family: 'DM Sans', sans-serif;
		font-size: 13.5px;
		font-weight: 400;
		line-height: 1.4;
		letter-spacing: 0;
		text-align: left;

		padding: 10px 16px;
		border-radius: 10px;
		box-shadow:
			0 3px 5px -1px rgba(0, 0, 0, 0.2),
			0 6px 10px rgba(0, 0, 0, 0.14),
			0 1px 18px rgba(0, 0, 0, 0.12);

		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.22s cubic-bezier(0.2, 0, 0, 1),
			transform 0.22s cubic-bezier(0.2, 0, 0, 1);

		white-space: normal;
		word-break: break-word;
		z-index: 9999;
	}

	.toast.show {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}

	.toast-icon {
		flex-shrink: 0;
	}

	.toast-text {
		flex: 1;
	}

	/* ── Dark Mode ───────────────────────────────────────────────────── */
	:global([data-theme='dark']) .toast {
		background: #1f1f1f;
		border: 1px solid rgba(255, 255, 255, 0.08);
	}

	@media (max-width: 640px) { 
		.toast {
			width: 80%;
			left: 20%;
			transform: translateX(-50%) translateY(8px);
		}
  	}
</style>