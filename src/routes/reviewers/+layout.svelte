<script lang="ts">
    import Footer from "$lib/components/shared/Footer.svelte";
    import AgencyNavbar from "$lib/components/shared/AgencyNavbar.svelte";
    import "../../app.css";
    import "./layout.css";
  import NotificationHost from "$lib/components/notifications/NotificationHost.svelte";
  
  let { children } = $props();
</script>
  
<NotificationHost />
<AgencyNavbar />
  
  {@render children()}
  
<Footer />
  