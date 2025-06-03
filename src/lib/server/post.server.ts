import prisma from '$lib/prisma';
import type { Prisma } from '$generated/prisma/client';

export interface GetPostsOptions extends Prisma.PostWhereInput {
    search?: string;
    limit?: number;
}

export const getPosts = async (
    options?: GetPostsOptions
): Promise<Prisma.PostGetPayload<{ include: { category: true } }>[]> => {
    const { search = '', limit = undefined, ...whereInput } = options ?? {};

    const where: Prisma.PostWhereInput = search
        ? {
              OR: [
                  { title: { contains: search, mode: 'insensitive' } },
                  { content: { contains: search, mode: 'insensitive' } }
              ],
              ...whereInput
          }
        : whereInput;

    const posts = await prisma.post.findMany({
        where,
        take: limit,
        include: { category: true }
    });

    return posts;
};

export const getUniquePost = async (
    slug: string
): Promise<Prisma.PostGetPayload<{ include: { category: true } }> | null> => {
    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true }
    });

    return post;
};

export const isSlugUnique = async (slug: string): Promise<boolean> => {
    const count = await prisma.post.count({ where: { slug } });

    return count === 0;
};

export const createPost = async (
    post: Prisma.PostCreateInput
): Promise<Prisma.PostGetPayload<{ include: { category: true } }>> => {
    const createdPost = await prisma.post.create({ data: post, include: { category: true } });

    return createdPost;
};

export const updatePost = async (
    id: number,
    post: Prisma.PostUpdateInput
): Promise<Prisma.PostGetPayload<{ include: { category: true } }>> => {
    const updatedPost = await prisma.post.update({
        where: { id },
        data: post,
        include: { category: true }
    });

    return updatedPost;
};

export const deletePost = async (id: number): Promise<boolean> => {
    try {
        await prisma.post.delete({ where: { id } });
        return true;
    } catch (error) {
        return false;
    }
};
