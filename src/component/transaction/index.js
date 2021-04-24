import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { useGlobalStore } from '../../util/store';
import isJson from '../../util/isjson';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		marginTop: theme.spacing(4),
	},
	container: {
		display: 'flex',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: theme.spacing(1),
		paddingLeft: theme.spacing(1),
	},
	paper: {
		textTransform: 'uppercase',
		paddingRight: theme.spacing(1),
		paddingLeft: theme.spacing(1),
		paddingTop: theme.spacing(2),
		paddingBottom: theme.spacing(2),
		marginRight: theme.spacing(2),
		color: '#4a4a9c',
		'& p:first-child': {
			margin: 0,
			fontSize: '0.6rem',
		},
		'& p:last-child': {
			margin: 0,
			fontWeight: 'bold',
		},
	},
	del: {
		textDecorationStyle: 'double',
	},
}));

const PaperComponent = (props) => {
	const cs = useStyles();
	const { top, amount, naira } = props;

	return (
		<Paper elevation={2} className={cs.paper}>
			<p>{top}</p>
			<p>
				{naira ? <del className={cs.del}>N</del> : null}
				<span>
					{typeof amount == 'number'
						? naira
							? amount.toFixed(2)
							: amount
						: amount}
				</span>
			</p>
		</Paper>
	);
};
PaperComponent.defaultProps = {
	naira: true,
};
PaperComponent.propTypes = {
	top: PropTypes.string.isRequired,
	amount: PropTypes.number.isRequired,
	naira: PropTypes.bool,
};

const Transaction = () => {
	const cs = useStyles();
	const { state } = useGlobalStore();
	const { transaction } = isJson(state.currentUser);
	const { amount, transactions } = isJson(transaction);
	const income = 50000;

	return (
		<Typography component="div" className={cs.root}>
			<Typography component="div" className={cs.container}>
				<PaperComponent top="total spent" amount={amount} />
				<PaperComponent top="total income" amount={income} />
				<PaperComponent
					top="transactions"
					amount={transactions}
					naira={false}
				/>
			</Typography>
		</Typography>
	);
};

export default Transaction;
