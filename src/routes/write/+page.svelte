<script lang="ts">
    import { Check, TriangleAlert } from '@lucide/svelte';
    import { applyAction, enhance } from '$app/forms';
    import type { SubmitFunction } from './$types.js';
    import { goto } from '$app/navigation';
    import PostForm from '$lib/components/PostForm.svelte';

    let { data, form } = $props();

    let isLoading = $state(false);

    const handleSubmit: SubmitFunction = () => {
        isLoading = true;
        return async ({ result }) => {
            isLoading = false;
            if (result.type === 'success') {
                goto(`/posts`);
            }
            await applyAction(result);
        };
    };
</script>

<div class="rounded-box bg-base-200 mx-auto flex max-w-prose flex-col gap-4 p-4 shadow-md">
    {#if form?.error}
        <div role="alert" class="alert alert-error">
            <TriangleAlert size={16} />
            <span class="flex gap-1">
                {form.error.message}
                {#each Object.keys(form.error.data) as key}
                    <span class="badge badge-sm capitalize">{key}</span>
                {/each}
            </span>
        </div>
    {/if}
    <h1 class="text-2xl font-bold">게시글 작성</h1>
    <form
        class="flex flex-col gap-2 [&>input,textarea,select]:w-full"
        use:enhance={handleSubmit}
        action="?/write"
        method="POST"
    >
        <PostForm categories={data.categories} />
        <button class="btn btn-sm btn-primary self-start">
            {#if isLoading}
                <div class="loading loading-spinner loading-xs"></div>
            {:else}
                <Check size={16} />
            {/if}
            저장
        </button>
    </form>
</div>
