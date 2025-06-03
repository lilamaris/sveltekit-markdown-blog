<script lang="ts" module>
    import type { Category } from '$generated/prisma';

    export interface Props {
        title?: string;
        description?: string;
        categories?: Category[];
        categoryId?: number;
        content?: string;
        published?: boolean;
    }
</script>

<script lang="ts">
    let {
        title = '',
        description = '',
        categories = [],
        categoryId = undefined,
        content = '',
        published = false
    }: Props = $props();
</script>

<select class="select validator" name="categoryId" bind:value={categoryId} required>
    <option disabled selected value="">카테고리 선택</option>
    {#each categories as category}
        <option value={category.id}>{category.name}</option>
    {/each}
</select>
<input
    type="text"
    id="title"
    name="title"
    class="input validator"
    placeholder="제목 입력"
    bind:value={title}
/>
<input
    type="text"
    id="description"
    name="description"
    class="input validator"
    placeholder="설명 입력"
    bind:value={description}
/>
<textarea
    id="content"
    name="content"
    class="textarea validator h-24"
    placeholder="내용 입력"
    bind:value={content}
></textarea>
<label class="label">
    <input type="checkbox" class="checkbox checkbox-sm" name="published" bind:checked={published} />
    공개
</label>
