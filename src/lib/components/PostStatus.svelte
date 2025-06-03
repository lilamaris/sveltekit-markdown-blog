<script lang="ts" module>
    import type { Category } from '$generated/prisma';

    export interface Props {
        category: Category;
        published: boolean;
        createdAt?: Date;
        updatedAt?: Date;
        dense?: boolean;
    }
</script>

<script lang="ts">
    let { category, published, createdAt, updatedAt, dense }: Props = $props();
</script>

{#if createdAt}
    <span class="badge badge-sm badge-outline text-base-content/70">
        {createdAt.toLocaleDateString()} 작성
    </span>

    {#if updatedAt && updatedAt.getTime() !== createdAt.getTime()}
        <span class="badge badge-sm badge-outline text-base-content/70">
            {updatedAt.toLocaleDateString()} 수정
        </span>
    {/if}
{/if}

<span class="badge badge-sm badge-outline text-base-content/70">
    {#if !dense}
        카테고리:
    {/if}
    {category.name}
</span>
{#if published}
    <span class="badge badge-sm bg-success text-success-content font-bold"> 공개 </span>
{:else}
    <span class="badge badge-sm bg-error text-error-content font-bold"> 비공개 </span>
{/if}
