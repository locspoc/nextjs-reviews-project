import Image from 'next/image';
import Link from 'next/link';

import { getReviews } from '@/lib/reviews';
import Heading from '@/components/Heading';
import PaginationBar from '@/components/PaginationBar';

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; // seconds, use if fetch is not possible

export const metadata = {
	title: 'Reviews',
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
	const page = parsePageParam(searchParams.page);
	const {reviews, pageCount} = await getReviews(PAGE_SIZE, page);
	console.log('[ReviewsPage] rendering: ', page);
	return (
		<>
			<Heading>Reviews</Heading>
			<PaginationBar href="/reviews" page={page} pageCount={pageCount}/>
			<p>Here we&rsquo;ll list all of the reviews.</p>
			<ul className="flex flex-row flex-wrap gap-3">
				{reviews.map((review, index) => (
					<li
						key={review.slug}
						className="bg-white border rounded shadow w-80 hover:shadow-xl"
					>
						<Link href={`/reviews/${review.slug}`}>
							<Image
								src={review.image}
								alt={review.title}
								priority={index === 0}
								width="320"
								height="180"
								className="mb-2 rounded-t"
							/>
							<h2 className="font-orbitron font-semibold py-1 text-center">
								{review.title}
							</h2>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}

function parsePageParam(paramValue) {
	if (paramValue) {
		const page = parseInt(paramValue);
		if (isFinite(page) && page > 0) {
			return page;
		}
	}
	return 1;
}
