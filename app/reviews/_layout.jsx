export default function ReviewsLayout({ children }) {
	return (
		<div style={{ display: 'flex' }}>
			<div style={{ border: 'solid red 1px' }}>[reviews sidebar]</div>
			<div>{children}</div>
		</div>
	);
}
