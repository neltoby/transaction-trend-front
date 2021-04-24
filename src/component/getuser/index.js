import Typography from '@material-ui/core/Typography';
import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';

import { actionCreator, CURRENT_USER } from '../../util/action';
import { useGlobalStore } from '../../util/store';
import UserInfo from '../user-info';
import isJson from '../../util/isjson';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		width: '100vw',
		backgroundColor: '#fff',
	},
}));

const Loading = () => {
	const cs = useStyles();
	return (
		<Typography component="div" className={cs.loading}>
			Loading
		</Typography>
	);
};

const Error = ({ error }) => {
	const cs = useStyles();
	return (
		<Typography component="div" className={cs.error}>
			Could not load resource: {error.message}
		</Typography>
	);
};

const GetUser = () => {
	const {
		state: { allUsers, currentUser },
		dispatch,
	} = useGlobalStore();
	const firstUser = isJson(allUsers[0]);

	const { isLoading, error } = useQuery('allUserData', () => {
		fetch(`${process.env.REACT_APP_URL}user/${firstUser.id}`)
			.then((res) => res.json())
			.then((response) => {
				const { data } = response;
				dispatch(actionCreator(CURRENT_USER, data));
				return data;
			});
	});

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Error error={error} />;
	}

	if (Object.keys(currentUser).length) {
		return <UserInfo id={firstUser.id} name={firstUser.name} />;
	}
	return <Loading />;
};

export default GetUser;
