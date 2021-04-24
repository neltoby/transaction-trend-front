import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

import Dot from '../dot';
import Time from '../timer';
import { useGlobalStore } from '../../util/store';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
		[theme.breakpoints.up('md')]: {
			width: '40%',
		},
	},
	heading: {
		textTransform: 'uppercase',
		marginTop: theme.spacing(2),
		paddingLeft: theme.spacing(2),
		fontWeight: 'bold',
		fontSize: '0.6rem',
		width: '100% !important',
	},
	list: {
		marginLeft: theme.spacing(0),
		paddingLeft: theme.spacing(0),
	},
	listText: {
		paddingLeft: 0,
		marginLeft: 0,
		'& span': {
			fontWeight: 500,
			fontSize: '0.8rem',
		},
	},
	listRoot: {
		marginRight: '0 !important',
	},
	secondary: {
		fontSize: '0.5rem !important',
	},
}));

const UsersLike = () => {
	const cs = useStyles();
	const history = useHistory();
	const {
		state: {
			currentUser: { name },
			trend,
		},
	} = useGlobalStore();

	const currentUserFxn = (data) => {
		const { id, name } = data;
		history.push(`/${id}/${name}`);
	};

	if (!trend.length) return null;

	return (
		<Typography component="div" className={cs.root}>
			<Typography component="div" className={cs.heading}>
				USERS LIKE "{name}"
			</Typography>
			<Typography component="div" className={cs.listRoot}>
				<List>
					{trend.map((item, i) => {
						return (
							<ListItem
								onClick={() => currentUserFxn(item)}
								button
								alignItems="flex-start"
								key={i}
							>
								<ListItemAvatar>
									<Avatar src={item.avatar} />
								</ListItemAvatar>
								<ListItemText
									className={cs.listText}
									primary={<span className={cs.name}>{item.name}</span>}
									secondary={
										<>
											<Typography
												component="span"
												className={cs.secondary}
												color="textPrimary"
											>
												{item.transactions} Transactions
											</Typography>
											<Dot color="#ddd" />
											Joined <Time date={item.created_at} />
										</>
									}
								/>
							</ListItem>
						);
					})}
				</List>
			</Typography>
		</Typography>
	);
};

export default UsersLike;
