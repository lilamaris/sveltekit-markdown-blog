import { getPosts } from '$lib/server/post.server.js';

export const load = async () => {
    const posts = await getPosts();

    return { posts };
};
