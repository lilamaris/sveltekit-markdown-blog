<script lang="ts" module>
    import type { Post, Category } from '$generated/prisma';
    import PostStatus from './PostStatus.svelte';

    export interface Props {
        posts: (Post & { category: Category })[];
    }
</script>

<script lang="ts">
    let { posts }: Props = $props();
</script>

<ul class="list">
    {#each posts as post, index (post.slug)}
        <a href={`/posts/${post.slug}`}>
            <li class="list-row hover:bg-base-200">
                <span class="text-lg font-bold">{index + 1}</span>
                <div>
                    <h2 class="text-lg font-bold">{post.title}</h2>
                    <p class="text-base-content/70 text-sm">{post.description}</p>
                </div>
                <div class="flex flex-col items-end gap-1">
                    <PostStatus category={post.category} published={post.published} dense />
                </div>
            </li>
        </a>
    {/each}
</ul>
