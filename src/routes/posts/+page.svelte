<script lang="ts">
    import PostList from '$lib/components/PostList.svelte';
    let { data } = $props();
</script>

<div class="mx-auto max-w-prose">
    <h1 class="text-2xl font-bold">게시글</h1>
    <PostList posts={data.posts} />
</div>
