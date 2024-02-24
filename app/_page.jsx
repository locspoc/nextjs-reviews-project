'use client';

import React, { useEffect } from 'react';
import Heading from '../components/Heading';

export default function HomePage() {
	useEffect(() => {
		window.alert('Welcome to my site!!!');
	}, []);
	return (
		<>
			<Heading>Indie Gamer</Heading>
			<p>Only the best indie games, reviewed for you.</p>
		</>
	);
}
