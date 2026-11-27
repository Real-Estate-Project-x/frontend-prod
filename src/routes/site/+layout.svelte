<script lang="ts">
	import '../../app.css';
	import { onMount } from 'svelte';
	import { themeStore } from '$lib/stores/theme.svelte';
	import Navbar from '$lib/components/shared/Navbar.svelte';
	import MobileDrawer from '$lib/components/shared/MobileDrawer.svelte';
	import Footer from '$lib/components/shared/Footer.svelte';
	import NotificationHost from '$lib/components/notifications/NotificationHost.svelte';


	let { children } = $props();
  
	// Restore theme from localStorage on first client render
	onMount(() => themeStore.init());
  </script>
  
  <NotificationHost />

  <Navbar />
  <MobileDrawer />
  
  <main>
	{@render children()}
  </main>
  
  <Footer />