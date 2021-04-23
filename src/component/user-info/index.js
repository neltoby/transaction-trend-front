import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import UserPeronalInfo from '../user-personal-info';
import Transaction from '../transaction';
import BaseInfo from '../base-info';
import { memo } from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
	},
}));

const UserInfoD = ({ id, name }) => {
	console.log('userinfo was loaded with id ' + id + ' name ' + name);
	const cs = useStyles();
	return (
		<Typography component="div" className={cs.root}>
			<UserPeronalInfo />
			<Transaction />
			<BaseInfo id={id} name={name} />
		</Typography>
	);
};

UserInfoD.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

const UserInfo = memo(UserInfoD);
export default UserInfo;
