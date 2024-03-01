import { marked } from 'marked';
import matter from 'gray-matter';
import { readFile } from 'node:fs/promises';

export async function getReview(slug) {
	const text = await readFile(`./content/reviews/${slug}.md`, 'utf8');
	const {
		content,
		data: { title, date, image },
	} = matter(text);
	const body = marked(content);
	return { title, date, image, body };
}
