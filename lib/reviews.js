import { marked } from 'marked';
import matter from 'gray-matter';
import { readdir, readFile } from 'node:fs/promises';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

export async function getFeaturedReview() {
	const reviews = await getReviews();
	return reviews[0];
}

export async function getReview(slug) {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(
			{
				filters: { slug: { $eq: slug } },
				fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
				populate: { image: { fields: ['url'] } },
				sort: ['publishedAt:desc'],
				pagination: { pageSize: 6 },
			},
			{ encodeValueOnly: true }
		);
	console.log('getReview: ', url);
	const response = await fetch(url);
	console.log('response: ', response);
	const { data } = await response.json();
	const { attributes } = data[0];
	return {
		slug: attributes.slug,
		title: attributes.title,
		date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
		image: CMS_URL + attributes.image.data.attributes.url,
		body: marked(attributes.body, { headerIds: false, mangle: false }),
	};
}

export async function getReviews() {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(
			{
				fields: ['slug', 'title', 'subtitle', 'publishedAt'],
				populate: { image: { fields: ['url'] } },
				sort: ['publishedAt:desc'],
				pagination: { pageSize: 6 },
			},
			{ encodeValueOnly: true }
		);
	console.log('getReviews: ', url);
	const response = await fetch(url);
	console.log('response: ', response);
	const { data } = await response.json();
	console.log('data: ', data);
	return data.map(({ attributes }) => ({
		slug: attributes.slug,
		title: attributes.title,
		date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
		image: CMS_URL + attributes.image.data.attributes.url,
	}));
}

export async function getSlugs() {
	const files = await readdir('./content/reviews');
	return files
		.filter((file) => file.endsWith('.md'))
		.map((file) => file.slice(0, -'.md'.length));
}
