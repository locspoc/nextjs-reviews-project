import { getReview } from '@/lib/reviews';
import Heading from '@/components/Heading';

export default async function ReviewPage({ params: { slug } }) {
	console.log('[ReviewPage] slug: ', slug);
	const review = await getReview(slug);
	return (
		<>
			<Heading>{review.title}</Heading>
			<p className="italic pb-2">{review.date}</p>
			<img
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
