<script lang="ts">
    import Hero from '$lib/components/home/Hero.svelte';
    import HowItWorks from '$lib/components/home/HowItWorks.svelte';
    import FeaturedListings from '$lib/components/home/FeaturedListings.svelte';
    import ForAgents from '$lib/components/home/ForAgents.svelte';
    import Testimonials from '$lib/components/home/Testimonials.svelte';
    import CtaBanner from '$lib/components/home/CtaBanner.svelte';
  </script>
  
  <svelte:head>
    <title>Blupodd — Find Your Place</title>
    <meta name="description" content="Search smarter. View instantly. Connect with agents who know your market." />
  </svelte:head>
  
  <Hero />
  <HowItWorks />
  <FeaturedListings />
  <ForAgents />
  <Testimonials />
  <CtaBanner />


