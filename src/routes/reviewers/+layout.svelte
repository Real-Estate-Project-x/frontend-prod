<script lang="ts">
    import Footer from "$lib/components/shared/Footer.svelte";
    import AgencyNavbar from "$lib/components/shared/AgencyNavbar.svelte";
    import "../../app.css";
    import "./layout.css";
  
  let { children } = $props();
</script>
  
<AgencyNavbar />
  
  {@render children()}
  
<Footer />
  