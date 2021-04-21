import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
	bullet: {
		display: 'inline-block',
		margin: '0 0.2rem',
		transform: 'scale(1.5)',
	},
}));

const Dot = ({ color }) => {
	const cs = useStyles();
	return (
		<span data-testid="dot" className={cs.bullet} style={{ color }}>
			•
		</span>
	);
};

Dot.propTypes = {
	color: PropTypes.string.isRequired,
};

export default Dot;
