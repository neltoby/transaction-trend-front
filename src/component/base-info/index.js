import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useGlobalStore } from '../../util/store';

import Expenses from '../expenses';
import UsersLike from '../users-like';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	left: {
		display: 'flex',
		justifyContent: 'center',
	},
});

const BaseInfo = () => {
	const cs = useStyles();
	const {
		state: { currentUser: usersLike },
	} = useGlobalStore();
	return (
		<Typography
			component="div"
			className={usersLike.length ? cs.root : cs.left}
		>
			<Expenses />
			<UsersLike />
		</Typography>
	);
};

export default BaseInfo;
