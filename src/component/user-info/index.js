import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import UserPeronalInfo from '../user-personal-info';
import Transaction from '../transaction';
import BaseInfo from '../base-info';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

const UserInfo = () => {
	const cs = useStyles();
	return (
		<Typography component="div" className={cs.root}>
			<UserPeronalInfo />
			<Transaction />
			<BaseInfo />
		</Typography>
	);
};

export default UserInfo;
