import { lazy, Suspense, memo } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { QueryClient, QueryClientProvider } from 'react-query';

import LoadingUser from '../loading-user';
const FetchUser = lazy(() => import('../fetchuser'));
const GetUser = lazy(() => import('../getuser'));

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

const queryClient = new QueryClient();

const UserContainerD = ({ id, name }) => {
	const cs = useStyles();

	const decider = (
		<Suspense fallback={<LoadingUser />}>
			{id && name ? <FetchUser id={id} name={name} /> : <GetUser />}
		</Suspense>
	);
	return (
		<QueryClientProvider client={queryClient}>
			<Typography className={cs.root} component="div">
				{decider}
			</Typography>
		</QueryClientProvider>
	);
};

UserContainerD.propTypes = {
	id: PropTypes.number,
	name: PropTypes.string,
};

const UserContainer = memo(UserContainerD);
export default UserContainer;
