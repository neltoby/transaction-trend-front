import { useQuery } from 'react-query';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import UserInfo from '../user-info';
import { useGlobalStore } from '../../util/store';
import { actionCreator, CURRENT_USER } from '../../util/action';
import { memo } from 'react';
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
	const {
		state: { currentUser },
		dispatch,
	} = useGlobalStore();

	const { isLoading, error, isSuccess } = useQuery(
		['currentUserData', id, name],
		() => {
			let r_id = parseInt(id, 10);
			if (isNaN(r_id)) {
				return Promise.reject({ message: 'Could not find user' });
			}
			if (typeof name !== 'string') {
				return Promise.reject({ message: 'name must be a string' });
			}
			return fetch(`${process.env.REACT_APP_URL}user/${id}`)
				.then((res) => res.json())
				.then((response) => {
					const { data } = response;
					return data;
				});
		},
		{
			cacheTime: 0,
			refetchOnMount: 'always',
			onSuccess: (data) => {
				dispatch(actionCreator(CURRENT_USER, isJson(data)));
			},
			onError: (e) => {},
		}
	);

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
	if (isSuccess) return <UserInfo id={id} name={name} />;

	return (
		<Basic>
			<div className={cs.loading}>Loading data for user - {name} </div>
		</Basic>
	);
};

FetchUserDetail.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

const FetchUser = memo(FetchUserDetail);

export default FetchUser;
