<script lang="ts">
  import NotificationHost from "$lib/components/notifications/NotificationHost.svelte";
    import Footer from "$lib/components/shared/Footer.svelte";
    import SubAgencyNavbar from "$lib/components/shared/SubAgencyNavbar.svelte";
    import "../../app.css";
    import "./layout.css";
  
  let { children } = $props();
</script>
  
<NotificationHost />

<SubAgencyNavbar />
  
  {@render children()}
  
<Footer />
  