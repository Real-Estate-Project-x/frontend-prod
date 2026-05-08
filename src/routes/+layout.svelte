<script lang="ts">
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import MobileDrawer from '$lib/components/shared/MobileDrawer.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import '../app.css';

	let { children } = $props();
  
	// Restore theme from localStorage on first client render
	onMount(() => themeStore.init());
  </script>
  
  <Navbar />
  <MobileDrawer />
  
  <main>
	{@render children()}
  </main>
  
  <Footer />