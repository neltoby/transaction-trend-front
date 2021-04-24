export const actionCreator = (type, payload = null) => {
	return payload === null
		? {
				type,
		  }
		: {
				type,
				payload,
		  };
};

export const OPEN = 'OPEN';
export const CLOSE = 'CLOSE';
export const TREND = 'TREND';
export const ALL_USERS = 'ALL_USERS';
export const CURRENT_USER = 'CURRENT_USER';
export const USERS_LIKE_CURRENT_USER = 'USERS_LIKE_CURRENT_USER';
