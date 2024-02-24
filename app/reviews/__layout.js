import NavBar from '../../components/NavBar';

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
				<header>
					<NavBar />
				</header>
				{children}
			</body>
		</html>
	);
}
