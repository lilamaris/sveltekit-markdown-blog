import { getUniquePost } from '$lib/server/post.server.js';
import { markdownToHtml } from '$lib/markdown';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
    const post = await getUniquePost(params.slug);
    if (!post) throw error(404, 'Post not found');

    const html = await markdownToHtml(post.content);

    return {
        post,
        html,
        title: post.title,
        description: post.description,
    };
};
