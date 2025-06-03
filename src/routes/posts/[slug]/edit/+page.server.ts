import { getCategories } from '$lib/server/category.server';
import { deletePost, getUniquePost, updatePost } from '$lib/server/post.server';
import { makeSlug, validatePostForm } from '$lib/server/util.server';
import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const load = async ({ params }) => {
    const categories = await getCategories();
    const post = await getUniquePost(params.slug);
    if (!post) {
        throw error(404, 'Post not found');
    }
    return { post, categories };
};

export const actions: Actions = {
    edit: async ({ request, params }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const formData = await request.formData();

        const id = parseInt(formData.get('id') as string);
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const content = formData.get('content') as string;
        const categoryId = parseInt(formData.get('categoryId') as string);
        const published = (formData.get('published') as string) === 'on';
        const originalSlug = params.slug;
        const slug = makeSlug(title);

        const validationResult = await validatePostForm({
            id,
            title,
            description,
            content,
            categoryId,
            ...(originalSlug !== slug ? { slug } : {})
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
            await updatePost(id, postData);
            success = true;
        } catch {
            console.error(error);
        }

        if (!success) return fail(500);
        return redirect(303, `/posts/${slug}`);
    },
    delete: async ({ request }) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const formData = await request.formData();
        const id = parseInt(formData.get('id') as string);

        const validationResult = await validatePostForm({ id });

        if (!validationResult.success) {
            return fail(400, { error: validationResult.errorFields });
        }

        let success = false;
        try {
            await deletePost(id);
            success = true;
        } catch {
            console.error(error);
        }

        if (!success) return fail(500);
        return redirect(303, '/posts');
    }
};
