import { updateObject } from '../../util/updateObject';

const initialState = {
  token: '',
  userId: '',
};

const loginSuccess = (state, action) => {
  return updateObject(state, { token: action.token });
};

const registerSuccess = state => {
  return updateObject(state);
};

const logoutSuccess = state => {
  return updateObject(state, { token: '' });
};

const getUserId = (state, action) => {
  return updateObject(state, { userId: action.userId });
};

const failed = state => {
  return updateObject(state, { error: true });
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return loginSuccess(state, action);
    case 'REGISTER_SUCCESS':
      return registerSuccess(state, action);
    case 'LOGOUT_SUCCESS':
      return logoutSuccess(state, action);
    case 'GET_USER_ID':
      return getUserId(state, action);
    default:
      return failed(state, action);
  }
};
export default authReducer;
