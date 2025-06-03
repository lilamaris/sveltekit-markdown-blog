import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

const markdownProcessor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify);

export const markdownToHtml = async (markdown: string) => {
    const result = await markdownProcessor.process(markdown);
    return result.toString();
};
