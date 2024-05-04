import Image from 'next/image';

import { getReview } from '@/lib/reviews';
import Heading from '@/components/Heading';

export default async function HollowKnightPage() {
	const review = await getReview('hollow-knight');
	return (
		<>
			<Heading>{review.title}</Heading>
			<p className="italic pb-2">{review.date}</p>
			<Image
				src={review.image}
				alt={review.title}
				width="640"
				height="360"
				className="mb-2 rounded"
			/>
			<article
				dangerouslySetInnerHTML={{ __html: review.body }}
				className="max-w-screen prose prose-slate"
			/>
		</>
	);
}
