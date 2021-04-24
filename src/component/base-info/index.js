import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from 'react-query';

import { useGlobalStore } from '../../util/store';
import { actionCreator, TREND } from '../../util/action';
import Expenses from '../expenses';
import UsersLike from '../users-like';
import isJson from '../../util/isjson';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		marginTop: theme.spacing(4),
		[theme.breakpoints.up('md')]: {
			flexDirection: 'row',
			justifyContent: 'space-between',
		},
	},
	left: {
		display: 'flex',
		justifyContent: 'center',
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

const Error = () => {
	const cs = useStyles();
	return (
		<Typography component="div" className={cs.error}>
			Could not load resource
		</Typography>
	);
};

const BaseInfoD = ({ id, name }) => {
	const cs = useStyles();
	const { state, dispatch } = useGlobalStore();
	const { currentUser } = isJson(state);
	const { transaction } = isJson(currentUser);
	let { icon_urls } = isJson(transaction);
	icon_urls = isJson(icon_urls);
	const uid =
		id === undefined && name === undefined ? state.currentUser.id : id;

	const { isLoading, error, isSuccess } = useQuery(
		['alltrendData', id, name],
		() => {
			let r_id = parseInt(uid, 10);
			if (isNaN(r_id)) {
				return Promise.reject({ message: 'Id must be a number' });
			}
			if (typeof name !== 'string') {
				return Promise.reject({ message: 'name must be a string' });
			}
			fetch(`${process.env.REACT_APP_URL}trend/${uid}`)
				.then((res) => res.json())
				.then(
					(response) => {
						if (response.status) {
							const {
								data: { other_user },
							} = response;
							dispatch(actionCreator(TREND, isJson(other_user)));
							return other_user;
						}
					},
					{
						onSuccess: (data) => {
							dispatch(actionCreator(TREND, isJson(data)));
						},
						refetchOnMount: 'always',
					}
				);
		}
	);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return <Error />;
	}
	if (isSuccess && Object.keys(currentUser).length) {
		return (
			<Typography
				component="div"
				className={icon_urls.length ? cs.root : cs.left}
			>
				<Expenses />
				<UsersLike />
			</Typography>
		);
	}
	return <Loading />;
};

BaseInfoD.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};
const BaseInfo = memo(BaseInfoD);
export default BaseInfo;
