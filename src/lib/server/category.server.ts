import type { Prisma } from '$generated/prisma';
import prisma from '$lib/prisma';

export const getCategories = async () => {
    const categories = await prisma.category.findMany({
        include: {
            _count: {
                select: {
                    posts: true
                }
            }
        }
    });

    return categories;
}

export const createCategory = async (category: Prisma.CategoryCreateInput) => {
    const createdCategory = await prisma.category.create({
        data: category
    });

    return createdCategory;
};

export const updateCategory = async (id: number, category: Prisma.CategoryUpdateInput) => {
    const updatedCategory = await prisma.category.update({
        where: { id },
        data: category
    });

    return updatedCategory;
};

export const deleteCategory = async (id: number) => {
    const deletedCategory = await prisma.category.delete({
        where: { id }
    });

    return deletedCategory;
};

