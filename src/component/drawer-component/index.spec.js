import { render, screen, waitFor } from '@testing-library/react';
import DrawerComponent from './';
import Provider from '../provider';
import { initialState } from '../../util/store';
import { allUser } from '../../test-util/test';

test('renders DrawerComponent component', async () => {
	initialState.allUsers = allUser;
	render(
		<Provider initialState={initialState}>
			<DrawerComponent modal={true} />
		</Provider>
	);
	expect(screen.getByTestId('drawer')).toBeInTheDocument();
	expect(screen.getByText(/User/)).toBeInTheDocument();
	expect(screen.getByText(/Jack Mayer/)).toBeInTheDocument();
	expect(screen.getByText(/Jack Ephraim/)).toBeInTheDocument();
	expect(screen.getByText(/Jack Joyce/)).toBeInTheDocument();
	expect(screen.getAllByText(/Join/).length).toBe(3);
	await waitFor(() => {
		expect(screen.getAllByText(/ago/).length).toBe(3);
	});
});
