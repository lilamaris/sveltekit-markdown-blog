<script lang="ts">
    import { page } from '$app/state';
</script>

<div class="mx-auto flex max-w-prose flex-col gap-2">
    <h1 class="text-2xl font-bold">Something went wrong...</h1>
    <p class="bg-error text-error-content px-2 py-1 text-sm">
        <span class="mr-2 font-bold">{page.status}</span>
        <span class="text-error-content">{page.error?.message}</span>
    </p>
    <a href="/" class="link">Go back to the homepage</a>
</div>
