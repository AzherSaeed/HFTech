import GenericService from "../Services/GenericService";
import { API_URL } from "../Services/config";

export const LOGIN_ACTION_SUCCESSFUL = "LOGIN_ACTION_SUCCESSFUL";
export const LOGIN_ACTION_PENDING = "LOGIN_ACTION_PENDING";
export const LOGIN_ACTION_FAILURE = "LOGIN_ACTION_FAILURE";

const generaticService = new GenericService();

const loginLoaderStart = () => ({
  type: LOGIN_ACTION_PENDING,
});

const loginLoaderSuccess = (users) => ({
  type: LOGIN_ACTION_SUCCESSFUL,
  payload: users,
});

const loginLoaderFailure = (errorMessage) => ({
  type: LOGIN_ACTION_FAILURE,
  payload: errorMessage,
});

export const loginActionCalled = (data) => (dispatch) => {
  dispatch(loginLoaderStart());

  generaticService
    .post(`${API_URL}login/generate-token`, data)
    .then((response) => dispatch(loginLoaderSuccess(response.data)))
    .catch((error) => dispatch(loginLoaderFailure(error.message)));
};
