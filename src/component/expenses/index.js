import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { useGlobalStore } from '../../util/store';
import isJson from '../../util/isjson';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		width: '100%',
		marginLeft: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			width: '40%',
		},
	},
	heading: {
		textTransform: 'uppercase',
		marginTop: theme.spacing(2),
		fontWeight: 'bold',
		fontSize: '0.6rem',
		width: '100% !important',
	},
	avatar: {
		height: 15,
		width: 15,
	},
	button: {
		paddingTop: theme.spacing(1),
		paddingBottom: theme.spacing(1),
		paddingRight: theme.spacing(1.5),
		paddingLeft: theme.spacing(1.5),
		backgroundColor: '#a8c6ea',
		borderRadius: '0.4rem',
		marginRight: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
	icons: {
		display: 'flex',
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		marginTop: theme.spacing(3),
	},
}));

const Expenses = () => {
	const cs = useStyles();
	const { state } = useGlobalStore();
	const { currentUser } = isJson(state);
	const { transaction } = isJson(currentUser);
	const { icon_urls } = isJson(transaction);
	const icons = isJson(icon_urls).map((item, i) => {
		return <Avatar src={item} className={cs.avatar} alt="icon" />;
	});
	return (
		<Typography component="div" className={cs.root}>
			<Typography component="div" className={cs.heading}>
				Recurring expenses
			</Typography>
			<Typography component="div" className={cs.icons}>
				{icons.map((item, i) => {
					return (
						<span className={cs.button} key={i}>
							{item}
						</span>
					);
				})}
			</Typography>
		</Typography>
	);
};

export default Expenses;
