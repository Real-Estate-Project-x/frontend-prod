<script lang="ts">
    import { onMount } from 'svelte';
    import { themeStore } from '$lib/stores/theme.svelte';
    import HeroV3 from '$lib/components/home/HeroV3.svelte';
    import Footer from '$lib/components/shared/Footer.svelte';
    import Navbar from '$lib/components/shared/Navbar.svelte';
    import CtaBanner from '$lib/components/home/CtaBanner.svelte';
    import ForAgents from '$lib/components/home/ForAgents.svelte';
    import HowItWorks from '$lib/components/home/HowItWorks.svelte';
    import Testimonials from '$lib/components/home/Testimonials.svelte';
    import MobileDrawer from '$lib/components/shared/MobileDrawer.svelte';
    import BlupoddLoader from '$lib/components/shared/BlupoddLoader.svelte';
    import FeaturedListings from '$lib/components/home/FeaturedListings.svelte';
    import '../app.css';

    let isLoading = $state(true);

    // Restore theme from localStorage on first client render
	onMount(() => {
    themeStore.init();

    setTimeout(() => (isLoading = !isLoading), 3000)
  });

  
  </script>
  
  <svelte:head>
    <title>Blupodd — Find Your Place</title>
    <meta name="description" content="Search smarter. View instantly. Connect with agents who know your market." />
  </svelte:head>

  {#if isLoading}
  <BlupoddLoader />
  {/if}
  
  <Navbar />
  <MobileDrawer />

  <HeroV3 />
  <HowItWorks />
  <FeaturedListings />
  <ForAgents />
  <Testimonials />
  <CtaBanner />

  <Footer />