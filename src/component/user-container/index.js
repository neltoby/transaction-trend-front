import { lazy, Suspense, memo } from 'react';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoadingUser from '../loading-user';
const FetchUser = lazy(() => import('../fetchuser'));
const GetUser = lazy(() => import('../getuser'));

const queryClient = new QueryClient();

const UserContainerD = ({ id, name }) => {
	const decider = (
		<Suspense fallback={<LoadingUser />}>
			{id && name ? <FetchUser id={id} name={name} /> : <GetUser />}
		</Suspense>
	);
	return (
		<QueryClientProvider client={queryClient}>{decider}</QueryClientProvider>
	);
};

UserContainerD.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
};

const UserContainer = memo(UserContainerD);
export default UserContainer;
