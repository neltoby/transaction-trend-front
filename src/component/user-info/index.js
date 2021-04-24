import PropTypes from 'prop-types';

import UserPeronalInfo from '../user-personal-info';
import Transaction from '../transaction';
import BaseInfo from '../base-info';
import { memo } from 'react';
import ErrorBoundary from '../errorboundary';

const UserInfoD = ({ id, name }) => {
	return (
		<>
			<ErrorBoundary fallback={<h5>Failed to load resource</h5>}>
				<UserPeronalInfo />
			</ErrorBoundary>
			<ErrorBoundary fallback={<h5>Failed to load resource</h5>}>
				<Transaction />
			</ErrorBoundary>
			<ErrorBoundary fallback={<h5>Failed to load resource</h5>}>
				<BaseInfo id={id} name={name} />
			</ErrorBoundary>
		</>
	);
};

UserInfoD.propTypes = {
	id: PropTypes.number.isRequired,
	name: PropTypes.string.isRequired,
};

const UserInfo = memo(UserInfoD);
export default UserInfo;
