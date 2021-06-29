import { auth } from '../../firebase/index';

export const loginSuccess = token => {
  return {
    type: 'LOGIN_SUCCESS',
    token: token,
  };
};

export const registerSuccess = (id, token) => {
  console.log(token);
  return {
    type: 'REGISTER_SUCCESS',
    token: token,
  };
};

export const login = (email1, password1) => {
  return dispatch => {
    auth.signInWithEmailAndPassword(email1, password1).then(userCredentials => {
      userCredentials.user
        .getIdTokenResult()
        .then(token => dispatch(loginSuccess(token.token)));
    });
  };
};

export const register = (email, password) => {
  return dispatch => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        userCredentials.user.getIdTokenResult().then(token => {
          dispatch(registerSuccess(token.token));
        });
      })
      .catch(err => console.log(err));
  };
};
