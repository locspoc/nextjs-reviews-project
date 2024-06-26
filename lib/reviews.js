import { marked } from 'marked';
import qs from 'qs';

export const CACHE_TAG_REVIEWS = 'reviews';
const CMS_URL = 'http://localhost:1337';

async function fetchReviews(parameters) {
	const url =
		`${CMS_URL}/api/reviews?` +
		qs.stringify(parameters, { encodeValueOnly: true });
	// const response = await fetch(url, { cache: 'no-store' });
	const response = await fetch(url, {
		next: {
			tags: [CACHE_TAG_REVIEWS],
		},
	});
	if (!response.ok) {
		throw new Error(`CMS returned ${response.status} for ${url}`);
	}
	return await response.json();
}

export async function getReview(slug) {
	const { data } = await fetchReviews({
		filters: { slug: { $eq: slug } },
		fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
		populate: { image: { fields: ['url'] } },
		pagination: { pageSize: 1, withCount: false },
	});
	if (data.length === 0) {
		return null;
	}
	const item = data[0];
	return {
		...toReview(item),
		body: marked(item.attributes.body),
	};
}

export async function getReviews(pageSize) {
	const { data } = await fetchReviews({
		fields: ['slug', 'title', 'subtitle', 'publishedAt'],
		populate: { image: { fields: ['url'] } },
		sort: ['publishedAt:desc'],
		pagination: { pageSize },
	});
	return data.map(toReview);
}

export async function getSlugs() {
	const { data } = await fetchReviews({
		fields: ['slug'],
		sort: ['publishedAt:desc'],
		pagination: { pageSize: 100 },
	});
	return data.map((item) => item.attributes.slug);
}

function toReview(item) {
	const { attributes } = item;
	return {
		slug: attributes.slug,
		title: attributes.title,
		subtitle: attributes.subtitle,
		date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
		image: CMS_URL + attributes.image.data.attributes.url,
	};
}
