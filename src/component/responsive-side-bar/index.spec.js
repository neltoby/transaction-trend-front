import { render, screen, waitFor } from '@testing-library/react';
import ResponsiveSideBar from './';
import Provider from '../provider';
import { initialState } from '../../util/store';
import { allUser } from '../../test-util/test';

test('renders DrawerComponent component', async () => {
	initialState.allUsers = allUser;
	render(
		<Provider initialState={initialState}>
			<ResponsiveSideBar />
		</Provider>
	);
	expect(screen.getByTestId('nav-id')).toBeInTheDocument();
});
