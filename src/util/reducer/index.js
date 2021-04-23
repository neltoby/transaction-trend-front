import {
	ALL_USERS,
	CURRENT_USER,
	USERS_LIKE_CURRENT_USER,
	CLOSE,
	OPEN,
	TREND,
} from '../action';

export const reducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case ALL_USERS:
			return {
				...state,
				allUsers: payload,
			};
		case CURRENT_USER:
			return {
				...state,
				currentUser: payload,
			};
		case USERS_LIKE_CURRENT_USER:
			return {
				...state,
				usersLikeCurrentUser: payload,
			};
		case CLOSE:
			return {
				...state,
				drawerOpen: false,
			};
		case TREND:
			return {
				...state,
				trend: payload,
			};
		case OPEN:
			return {
				...state,
				drawerOpen: true,
			};
		default:
			return {
				...state,
			};
	}
};
