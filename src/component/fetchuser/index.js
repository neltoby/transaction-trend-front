import { useQuery } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from '../user-info';
import { useGlobalStore } from '../../util/store';
import { actionCreator, CURRENT_USER } from '../../util/action';
import { memo, useEffect, useState } from 'react';
import isJson from '../../util/isjson';

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

const FetchUserDetail = (props) => {
	const cs = useStyles();
	const { name, id } = props;
	console.log(name, id, 'was loaded');
	// const [error, setError] = useState(null);
	// const [isLoading, setIsLoading] = useState(false);

	const {
		state: { currentUser },
		dispatch,
	} = useGlobalStore();

	const { isLoading, error } = useQuery(['currentUserData', id, name], () => {
		let r_id = parseInt(id, 10);
		if (isNaN(r_id)) {
			return Promise.reject({ message: 'Id must be a number' });
		}
		if (typeof name !== 'string') {
			return Promise.reject({ message: 'name must be a string' });
		}
		dispatch(actionCreator(CURRENT_USER, {}));
		return fetch(`${process.env.REACT_APP_URL}user/${id}`)
			.then((res) => res.json())
			.then((response) => {
				console.log(response, 'from fetchUser');
				const { data } = response;
				dispatch(actionCreator(CURRENT_USER, isJson(data)));
				return data;
			});
	});

	useEffect(() => {}, [id, name]);

	if (isLoading || Object.keys(currentUser).length < 1) {
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
	return <UserInfo id={id} name={name} />;
};

const FetchUser = memo(FetchUserDetail);

export default FetchUser;
