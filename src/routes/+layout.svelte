<script lang="ts">
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import '../app.css';
    import { page } from '$app/state';

    let { children } = $props();
</script>

<svelte:head>
    <title>Lilamaris 블로그 | {page.data.title}</title>
    <meta name="description" content={page.data.description} />
    <meta property="og:title" content={page.data.title} />
    <meta property="og:description" content={page.data.description} />
    <meta property="og:url" content={page.url.href} />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Lilamaris 블로그" />
</svelte:head>

<div class="flex h-screen flex-col">
    <Header />

    <div class="flex-1">
        {@render children()}
    </div>

    <Footer />
</div>
