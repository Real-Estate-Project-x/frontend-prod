<script lang="ts">
  import Footer from "$lib/components/shared/Footer.svelte";
  import UserNavbar from "$lib/components/shared/UserNavbar.svelte";
  import "../../app.css";
  import "./layout.css";

let { children } = $props();
</script>

<UserNavbar />

{@render children()}

<Footer />
