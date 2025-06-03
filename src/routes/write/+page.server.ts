import { getCategories } from '$lib/server/category.server';
import { createPost } from '$lib/server/post.server';
import { makeSlug, validatePostForm } from '$lib/server/util.server';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async () => {
    const categories = await getCategories();

    return { categories };
};

export const actions = {
    write: async ({ request }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const formData = await request.formData();
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string;
        const categoryId = parseInt(formData.get('categoryId') as string);
        const published = (formData.get('published') as string) === 'on';
        const slug = makeSlug(title);

        const validationResult = await validatePostForm({
            title,
            description,
            content,
            categoryId,
            slug
        });

        if (!validationResult.success) {
            return fail(400, { error: validationResult.errorFields });
        }

        const postData = {
            title,
            description,
            slug,
            content,
            published,
            category: {
                connect: { id: categoryId }
            }
        };

        let success = false;
        try {
            await createPost(postData);
            success = true;
        } catch {
            console.error(error);
        }

        if (!success) return fail(500);
        return redirect(303, `/posts/${slug}`);
    }
} satisfies Actions;
