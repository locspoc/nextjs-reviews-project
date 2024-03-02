import Link from 'next/link';

import { getReviews } from '@/lib/reviews';
import Heading from '@/components/Heading';

export default async function ReviewsPage() {
	const reviews = await getReviews();
	console.log('[ReviewsPage] reviews: ', reviews);
	return (
		<>
			<Heading>Reviews</Heading>
			<p>Here we'll list all of the reviews.</p>
			<ul className="flex flex-col gap-3">
				<li className="bg-white border rounded shadow w-80 hover:shadow-xl">
					<Link href="/reviews/hollow-knight">
						<img
							src="/images/hollow-knight.jpg"
							alt="Hollow Knight"
							width="320"
							height="180"
							className="mb-2 rounded-t"
						/>
						<h2 className="font-orbitron font-semibold py-1 text-center">
							Hollow Knight
						</h2>
					</Link>
				</li>
				<li className="bg-white border rounded shadow w-80 hover:shadow-xl">
					<Link href="/reviews/stardew-valley">
						<img
							src="/images/stardew-valley.jpg"
							alt="Stardew Valley"
							width="320"
							height="180"
							className="mb-2 rounded-t"
						/>
						<h2 className="font-orbitron font-semibold py-1 text-center">
							Stardew Valley
						</h2>
					</Link>
				</li>
			</ul>
		</>
	);
}
