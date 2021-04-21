import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import Dot from '../dot';
import Time from '../timer';
import { useGlobalStore } from '../../util/store';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

const UserPesonalInfo = () => {
	const cs = useStyles();
	const {
		state: { currentUser },
	} = useGlobalStore();
	const { avatar, name, transaction, created_at } = currentUser;

	return (
		<div className={cs.root}>
			<Typography component="div" className={cs.imageContainer}>
				<Avatar src={avatar} />
				<p className={cs.name}> {name} </p>
				<p className={cs.transaction}>
					{transaction} Transaction <Dot color="#ddd" /> Joined{' '}
					<Time date={created_at} />
				</p>
			</Typography>
		</div>
	);
};

export default UserPesonalInfo;
