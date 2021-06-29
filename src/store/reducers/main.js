import { updateObject } from '../../util/updateObject';

const initialState = {
  token: '',
};

const loginSuccess = (state, action) => {
  return updateObject(state, { token: action.token });
};

const registerSuccess = (state, action) => {
  return updateObject(state, { token: action.token });
};

const failed = state => {
  return updateObject(state, { error: true });
};

const authReducer = (state = initialState, action) => {
  if (action.type === 'LOGIN_SUCCESS') {
    return loginSuccess(state, action);
  }
  if (action.type === 'REGISTER_SUCCESS') {
    return registerSuccess(state, action);
  } else {
    return failed(state, action);
  }
};
export default authReducer;
