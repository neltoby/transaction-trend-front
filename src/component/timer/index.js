import { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const TimeFxn = (props) => {
	const { date, style } = props;
	const [time, setTime] = useState('');
	const timeFxn = () => {
		const givenTime = new Date(date).getTime() / 1000;
		const diff = Date.now() / 1000 - givenTime;
		if (diff < 60) {
			setTime('0minute ago');
		} else {
			let min = Math.floor(diff / 60);
			if (min < 60) {
				setTime(`${min}${min > 1 ? 'minutes' : 'minute'} ago`);
			} else {
				let hr = Math.floor(min / 60);
				if (hr < 24) {
					setTime(`${hr}${hr > 1 ? 'hours' : 'hour'} ago`);
				} else {
					let day = Math.floor(hr / 24);
					if (day < 28) {
						setTime(`${day}${day > 1 ? 'days' : 'day'} ago`);
					} else {
						let mon = Math.floor(day / 28);
						if (mon < 12) {
							setTime(`${mon}${mon > 1 ? 'months' : 'month'} ago`);
						} else {
							let yr = Math.floor(mon / 12);
							setTime(`${yr}${yr > 1 ? 'years' : 'year'} ago`);
						}
					}
				}
			}
		}
	};
	useEffect(() => {
		const clear = setInterval(() => {
			timeFxn();
		}, 1000);
		return () => {
			clearInterval(clear);
		};
	});
	return (
		<span data-testid="timer" style={style}>
			{time}
		</span>
	);
};

TimeFxn.defaultProps = {
	style: {
		fontSize: '0.5rem',
	},
};

TimeFxn.propTypes = {
	date: PropTypes.string.isRequired,
	style: PropTypes.object,
};

export default TimeFxn;

export const Time = memo(TimeFxn);
