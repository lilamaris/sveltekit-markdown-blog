<script lang="ts">
    import { Ellipsis, Pencil, Trash } from '@lucide/svelte';
    import PostStatus from '$lib/components/PostStatus.svelte';

    let { data } = $props();
    const { post, html } = data;
</script>

<div class="mx-auto max-w-prose">
    <div>
        <div class="flex justify-between">
            <h1 class="text-2xl font-bold">{post.title}</h1>
            <details class="dropdown dropdown-end">
                <summary class="btn btn-ghost btn-sm btn-square m-1">
                    <Ellipsis size={16} />
                </summary>
                <ul class="menu dropdown-content bg-base-200 rounded-box w-24">
                    <li>
                        <a href={`/posts/${data.post.slug}/edit`}>
                            <Pencil size={16} />
                            수정
                        </a>
                    </li>
                </ul>
            </details>
        </div>
        <p class="text-base-content/70 text-sm">{post.description}</p>

        <PostStatus
            category={post.category}
            published={post.published}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
        />
    </div>
    <div class="divider"></div>
    <div class="prose">
        {@html html}
    </div>
</div>
