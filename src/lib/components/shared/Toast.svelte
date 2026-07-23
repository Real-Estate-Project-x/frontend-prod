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
</script>

<!-- ═══ TOAST ═══ -->
<div class="toast show {type}">
	{capitalizeSentences(toastMsg)}
</div>

<style>
	/* ── Toast Base ───────────────────────────────────────────────────── */
	.toast {
		position: fixed;
		bottom: 24px;
		left: 50%;
		transform: translateX(-50%) translateY(12px);

		color: #fff;
		font-family: 'DM Sans', sans-serif;
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.04em;

		padding: 11px 22px;
		border-radius: 40px;
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);

		opacity: 0;
		pointer-events: none;
		transition:
			opacity 0.3s,
			transform 0.3s;

		white-space: nowrap;
		z-index: 9999;
	}

	.toast.show {
		opacity: 1;
		transform: translateX(-50%) translateY(0);
	}

	/* ── Types ───────────────────────────────────────────────────────── */
	.toast.success {
		background: #16a34a;
		box-shadow: 0 8px 32px rgba(22, 163, 74, 0.3);
	}

	.toast.error {
		background: #dc2626;
		box-shadow: 0 8px 32px rgba(220, 38, 38, 0.3);
	}

	.toast.info {
		background: #0a2463;
		box-shadow: 0 8px 32px rgba(10, 36, 99, 0.3);
	}

	/* ── Dark Mode ───────────────────────────────────────────────────── */
	:global([data-theme='dark']) .toast.success {
		background: #15803d;
	}

	:global([data-theme='dark']) .toast.error {
		background: #b91c1c;
	}

	:global([data-theme='dark']) .toast.info {
		background: #1f3f6a;
	}
</style>