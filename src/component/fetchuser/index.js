import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from '../user-info';
import { useGlobalStore } from '../../util/store';
import { actionCreator, CURRENT_USER } from '../../util/action';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		height: '100vh',
		width: '100vw',
		backgroundColor: '#fff',
	},
}));

const Basic = ({ children }) => {
	return <>{children}</>;
};

const FetchUser = (props) => {
	const cs = useStyles();
	const { name, id } = props;

	const {
		state: { currentUser },
		dispatch,
	} = useGlobalStore();

	const { isLoading, error } = useQuery('currentUserData', () => {
		let r_id = parseInt(id, 10);
		if (isNaN(r_id)) {
			return Promise.reject({ message: 'Id must be a number' });
		}
		if (typeof name !== 'string') {
			return Promise.reject({ message: 'name must be a string' });
		}
		return fetch(`${process.env.URL}user/${id}/${name}`)
			.then((res) => res.json())
			.then((response) => {
				dispatch(actionCreator(CURRENT_USER, response));
				return response;
			});
	});

	if (isLoading) {
		return (
			<Basic>
				<div className={cs.loading}>Loading data for user - {name} </div>
			</Basic>
		);
	}

	if (error) {
		return (
			<Basic>
				<div className={cs.loading}>
					An error has occurred while loading data for user - {name}:{' '}
					{error.message}
				</div>
			</Basic>
		);
	}
	if (Object.keys(currentUser).length) return <UserInfo />;
};

export default FetchUser;
