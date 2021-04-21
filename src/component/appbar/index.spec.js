import { render, screen } from '@testing-library/react';
import AppBar from './';

test('renders AppBar component', () => {
	render(<AppBar />);
	const appBarElement = screen.getByTestId('appbar');
	expect(appBarElement).toBeInTheDocument();
});
