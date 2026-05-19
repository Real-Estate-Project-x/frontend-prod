<script lang="ts">
    import Footer from "$lib/components/shared/Footer.svelte";
    import SubAgencyNavbar from "$lib/components/shared/SubAgencyNavbar.svelte";
    import "../../app.css";
    import "./layout.css";
  
  let { children } = $props();
</script>
  
<SubAgencyNavbar />
  
  {@render children()}
  
<Footer />
  