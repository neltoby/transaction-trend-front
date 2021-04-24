import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Dot from '../dot';
import Time from '../timer';
import { useGlobalStore } from '../../util/store';
import isJson from '../../util/isjson';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: theme.spacing(4),
	},
	imageContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	avatar: {
		width: 50,
		height: 50,
	},
	name: {
		marginTop: theme.spacing(0.8),
		fontWeight: 'bold',
		marginBottom: 0,
	},
	transaction: {
		marginTop: theme.spacing(0.5),
		paddingTop: 0,
		fontSize: '0.6rem',
	},
}));

const UserPesonalInfo = () => {
	const cs = useStyles();
	const {
		state: { currentUser },
	} = useGlobalStore();
	const { avatar, name, created_at, transaction } = currentUser;
	const { transactions } = isJson(transaction);

	return (
		<div className={cs.root}>
			<Typography component="div" className={cs.imageContainer}>
				<Avatar className={cs.avatar} src={avatar} />
				<p className={cs.name}> {name} </p>
				<p className={cs.transaction}>
					{transactions} Transaction <Dot color="#ddd" /> Joined{' '}
					<Time date={created_at} />
				</p>
			</Typography>
		</div>
	);
};

export default UserPesonalInfo;
