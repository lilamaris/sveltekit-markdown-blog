import { PrismaClient, Category, Prisma } from '../src/generated/prisma';

const prisma = new PrismaClient();

const keys = [
    'SvelteKit',
    'Next.js',
    'Nuxt.js',
    'Tailwind CSS',
    'TypeScript',
    'Prisma',
    'Supabase',
    'Vercel'
];

const categoryData = keys.map((key) => ({ name: key }));

const makeSlug = (name: string) => name.toLowerCase().replace(/ /g, '-');

const buildPostData = (category: Category): Prisma.PostCreateInput => {
    const title = `${category.name}를 사용해 블로그 만들기`;
    const description = `${category.name}를 사용해서 블로그를 만들어보세요.`;
    const content = `## 프로젝트 설정`;
    const slug = makeSlug(title);

    return {
        title,
        description,
        content,
        slug,
        published: true,
        category: { connect: { id: category.id } }
    };
};

export const main = async () => {
    const categories = await prisma.category.createManyAndReturn({ data: categoryData });
    const postsData = categories.map(buildPostData);

    for (const post of postsData) {
        await prisma.post.create({ data: post });
    }
};

main();
