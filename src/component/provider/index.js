import { useReducer } from 'react';

import { Store } from '../../util/store';
import { reducer } from '../../util/reducer';
import ErrorBoundary from '../errorboundary';

const Provider = ({ initialState, children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<Store.Provider value={{ state, dispatch }}>
			<ErrorBoundary fallback={<h1>Something went wrong</h1>}>
				{children}
			</ErrorBoundary>
		</Store.Provider>
	);
};

export default Provider;
