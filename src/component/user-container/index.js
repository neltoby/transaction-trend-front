import { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LoadingUser from '../loading-user';
const FetchUser = lazy(() => import('../fetchuser'));
const GetUser = lazy(() => import('../getuser'));

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

const UserContainer = () => {
	const { id, name } = useParams();
	const cs = useStyles();

	const decider = (
		<Suspense fallback={<LoadingUser />}>
			{id && name ? <FetchUser id={id} name={name} /> : <GetUser />}
		</Suspense>
	);
	return (
		<Typography className={cs.root} component="div">
			{decider}
		</Typography>
	);
};

UserContainer.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

export default UserContainer;
