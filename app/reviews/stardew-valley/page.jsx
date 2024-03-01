import { marked } from 'marked';
import { readFile } from 'node:fs/promises';

import Heading from '@/components/Heading';

export default async function StardewValleyPage() {
	const text = await readFile('./content/reviews/stardew-valley.md', 'utf8');
	const html = marked(text);
	return (
		<>
			<Heading>Stardew Valley</Heading>
			<img
				src="/images/stardew-valley.jpg"
				alt="Stardew Valley"
				width="640"
				height="360"
				className="mb-2 rounded"
			/>
			<article
				dangerouslySetInnerHTML={{ __html: html }}
				className="prose prose-slate"
			/>
		</>
	);
}
