import { render, screen, waitFor } from '@testing-library/react';
import { Time } from './';

test('renders Time component', async () => {
	render(<Time date={new Date().toString()} />);
	const timeElement = screen.getByTestId('timer');
	expect(timeElement).toBeInTheDocument();
	await waitFor(() => {
		expect(screen.getByText(/ago/)).toBeInTheDocument();
	});
});
