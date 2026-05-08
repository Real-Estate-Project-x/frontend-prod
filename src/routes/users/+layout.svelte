<script lang="ts">
  import Footer from "$lib/components/shared/Footer.svelte";
  import UserNavbar from "$lib/components/shared/UserNavbar.svelte";
  import "./layout.css";
  import "../../app.css"

let { children } = $props();
</script>

<UserNavbar />

{@render children()}

<Footer />
