<script lang="ts">
    import { Check, Trash, TriangleAlert } from '@lucide/svelte';
    import { applyAction, enhance } from '$app/forms';
    import type { SubmitFunction } from './$types.js';
    import PostForm from '$lib/components/PostForm.svelte';

    let { data, form } = $props();
    const { post, categories } = data;

    let isEditSubmitting = $state(false);
    let isDeleteSubmitting = $state(false);

    const handleSubmit: SubmitFunction = ({ action }) => {
        isEditSubmitting = action.search === '?/edit';
        isDeleteSubmitting = action.search === '?/delete';

        return async ({ result }) => {
            isEditSubmitting = false;
            isDeleteSubmitting = false;
            await applyAction(result);
        };
    };
</script>

<div class="rounded-box bg-base-200 mx-auto flex max-w-prose flex-col gap-4 p-4 shadow-md">
    {#if form?.error}
        <div role="alert" class="alert alert-error">
            <TriangleAlert size={16} />
            <div class="flex flex-col gap-1">
                {#each Object.entries(form.error) as [key, value]}
                    <span class="flex items-center capitalize">{key} 은(는) {value.message}</span>
                {/each}
            </div>
        </div>
    {/if}
    <h1 class="text-2xl font-bold">게시글 작성</h1>
    <form
        class="flex flex-col gap-2 [&>input,textarea,select]:w-full"
        use:enhance={handleSubmit}
        action="?/edit"
        method="POST"
    >
        <PostForm
            {categories}
            title={post.title}
            description={post.description}
            content={post.content}
            categoryId={post.categoryId}
            published={post.published}
        />
        <input type="hidden" name="id" value={post.id} />
        <div class="flex justify-between">
            <button class="btn btn-sm btn-primary text-primary-content self-start">
                {#if isEditSubmitting}
                    <div class="loading loading-spinner loading-xs"></div>
                {:else}
                    <Check size={16} />
                {/if}
                저장
            </button>

            <button
                formaction="?/delete"
                class="btn btn-sm btn-error text-error-content self-start"
            >
                {#if isDeleteSubmitting}
                    <div class="loading loading-spinner loading-xs"></div>
                {:else}
                    <Trash size={16} />
                {/if}
                글 삭제
            </button>
        </div>
    </form>
</div>
