import { useEffect, useState } from 'react';
import { useGlobalStore } from '../store';
import { actionCreator, ERROR_ALL_USER, ERROR_USER_ID } from '../action';

function useFetch(url) {
	const { dispatch } = useGlobalStore();
	const [response, setResponse] = useState(null);
	const controller = new AbortController();
	const { signal } = controller;

	const fetchData = async () => {
		try {
			const response = await fetch(`${process.env.URL}${url}`, signal);
			const res = await response.json();
			setResponse(res);
		} catch (e) {
			let type;
			switch (url) {
				case 'user':
					type = ERROR_ALL_USER;
					break;
				default:
					type = ERROR_USER_ID;
					break;
			}
			dispatch(actionCreator(type));
		}
	};

	useEffect(() => {
		fetchData();

		return () => {
			controller.abort();
		};
	}, [url]);

	return response;
}

export default useFetch;
