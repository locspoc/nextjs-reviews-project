'use client';

import { useState } from 'react';

export default function ShareLinkButton() {
	const [clicked, setClicked] = useState();
	const handleClick = () => {
		navigator.clipboard.writeText(window.location.href);
		setClicked(true);
		setTimeout(() => setClicked(false), 1500);
	};
	return (
		<button
			onClick={handleClick}
			class="border px-2 py-1 rounded text-slate-500 text-sm hover:bg-orange-100 hover:text-slate-700"
		>
			{clicked ? 'Link copied' : 'Share Link'}
		</button>
	);
}
