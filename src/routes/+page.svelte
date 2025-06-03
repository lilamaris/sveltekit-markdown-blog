<script lang="ts">
    import PostList from '$lib/components/PostList.svelte';
    let { data } = $props();
</script>

<div class="mx-auto max-w-prose">
    <div class="flex items-center gap-4">
        <div class="avatar">
            <div class="w-24 rounded-full">
                <img src="https://ui-avatars.com/api/?size=128" alt="Lilamaris Avatar" />
            </div>
        </div>
        <div class="flex-col">
            <h1 class="text-2xl font-bold">Lilamaris</h1>
            <p class="text-base-content/70 text-sm">
                웹 개발, 디자인, 그리고 더 많은 것들을 배우고 있습니다.
            </p>
        </div>
    </div>
    <div class="divider">최근 게시글</div>
    <a class="link" href="/posts">더보기</a>
    <PostList posts={data.posts} />
</div>
