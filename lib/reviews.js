import { marked } from 'marked';
import { readdir } from 'node:fs/promises';
import qs from 'qs';

const CMS_URL = 'http://localhost:1337';

async function fetchReviews(parameters) {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(
			{
				parameters,
			},
			{ encodeValueOnly: true }
		);
	console.log('fetchReviews: ', url);
	const response = await fetch(url);
	console.log('response: ', response);
	if (!response.ok) {
		throw new Error(`CMS returned ${response.json} for ${url}`);
	}
	return await response.json();
}

export async function getFeaturedReview() {
	const reviews = await getReviews();
	return reviews[0];
}

export async function getReview(slug) {
	const { data } = await fetchReviews({
		filters: { slug: { $eq: slug } },
		fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
		populate: { image: { fields: ['url'] } },
		pagination: { pageSize: 1, withCount: false },
	});
	const item = data[0];
	console.log('item getReview: ', item);
	return {
		...toReview(item),
		body: marked(item.attributes.body),
	};
}

export async function getReviews() {
	const { data } = await fetchReviews({
		fields: ['slug', 'title', 'subtitle', 'publishedAt'],
		populate: { image: { fields: ['url'] } },
		sort: ['publishedAt:desc'],
		pagination: { pageSize: 6 },
	});
	// console.log('data: ', data);
	return data.map(toReview);
}

export async function getSlugs() {
	const files = await readdir('./content/reviews');
	return files
		.filter((file) => file.endsWith('.md'))
		.map((file) => file.slice(0, -'.md'.length));
}

function toReview(item) {
	console.log('item toReview: ', item);
	const { attributes } = item;
	return {
		slug: attributes.slug,
		title: attributes.title,
		date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
		image: CMS_URL + attributes.image.data.attributes.url,
	};
}
