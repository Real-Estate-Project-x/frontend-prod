<script lang="ts">
    import { onMount } from 'svelte';
    import Hero from '$lib/components/home/Hero.svelte';
    import HowItWorks from '$lib/components/home/HowItWorks.svelte';
    import FeaturedListings from '$lib/components/home/FeaturedListings.svelte';
    import ForAgents from '$lib/components/home/ForAgents.svelte';
    import Testimonials from '$lib/components/home/Testimonials.svelte';
    import CtaBanner from '$lib/components/home/CtaBanner.svelte';
    import Footer from '$lib/components/shared/Footer.svelte';
    import MobileDrawer from '$lib/components/shared/MobileDrawer.svelte';
    import Navbar from '$lib/components/shared/Navbar.svelte';
    import { themeStore } from '$lib/stores/theme.svelte';
    import '../app.css';

    // Restore theme from localStorage on first client render
	onMount(() => themeStore.init());
  </script>
  
  <svelte:head>
    <title>Blupodd — Find Your Place</title>
    <meta name="description" content="Search smarter. View instantly. Connect with agents who know your market." />
  </svelte:head>
  
  <Navbar />
  <MobileDrawer />

  <Hero />
  <HowItWorks />
  <FeaturedListings />
  <ForAgents />
  <Testimonials />
  <CtaBanner />

  <Footer />