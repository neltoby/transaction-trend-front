import { render, screen } from '@testing-library/react';
import Dot from './';

test('renders Dot component', () => {
	render(<Dot color="red" />);
	const dotElement = screen.getByTestId('dot');
	expect(dotElement).toBeInTheDocument();
});
