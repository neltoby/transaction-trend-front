import { Avatar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { IconContext } from 'react-icons';
import { GiCommercialAirplane, GiForkKnifeSpoon } from 'react-icons/gi';
import { AiFillGift } from 'react-icons/ai';
import { IoHome } from 'react-icons/io5';

import { useGlobalStore } from '../../util/store';
import isJson from '../../util/isjson';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
		width: '40%',
	},
	heading: {
		textTransform: 'uppercase',
		marginTop: theme.spacing(2),
		fontWeight: 'bold',
	},
	avatar: {
		height: 30,
		width: 30,
	},
}));

const SelectIcon = ({ url }) => {
	const cs = useStyles();
	return <Avatar src={url} className={cs.avatar} alt="icon" />;
};

const Expenses = () => {
	const cs = useStyles();
	console.log(useGlobalStore());
	const {
		state: {
			currentUser: { transaction },
		},
	} = useGlobalStore();
	console.log(useGlobalStore(), transaction);
	const icon_urls = isJson(transaction).icon_urls;
	const icons = isJson(icon_urls).map((item, i) => {
		return <SelectIcon key={`${item}${i}`} url={item} />;
	});
	return (
		<Typography component="div" className={cs.root}>
			<Typography component="div" className={cs.heading}>
				Recurring expenses
			</Typography>
			<Typography component="div" className="div">
				<IconContext.Provider value={{ color: 'black', className: cs.icons }}>
					{icons.map((item, i) => {
						return (
							<span className={cs.button} key={i}>
								{item}
							</span>
						);
					})}
				</IconContext.Provider>
			</Typography>
		</Typography>
	);
};

export default Expenses;
