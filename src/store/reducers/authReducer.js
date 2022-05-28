import {LOGIN_ACTION_FAILURE , LOGIN_ACTION_PENDING ,LOGIN_ACTION_SUCCESSFUL } from '../action';


const initialState = {
	isLoading: false,
	user: null,
	errorMessage: null,
};



const usersReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case LOGIN_ACTION_PENDING:
			return {
				...state,
				isLoading: true,
				user: null,
				errorMessage: null,
			};

		case LOGIN_ACTION_SUCCESSFUL:
			return {
				...state,
				isLoading: false,
				user: payload,
			};

		case LOGIN_ACTION_FAILURE:
			return {
				...state,
				isLoading: false,
				errorMessage: payload,
			};

		default:
			return state;
	}
};

export default usersReducer;
