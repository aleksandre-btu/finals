import { auth } from '../../firebase/index';
import { database } from '../../firebase/index';

export const loginSuccess = token => {
  return {
    type: 'LOGIN_SUCCESS',
    token: token,
  };
};

export const registerSuccess = token => {
  return {
    type: 'REGISTER_SUCCESS',
    token: token,
  };
};

export const logoutSuccess = () => {
  return {
    type: 'LOGOUT_SUCCESS',
  };
};

export const getUserId = id => {
  return {
    type: 'GET_USER_ID',
    userId: id,
  };
};

export const login = (email1, password1) => {
  return dispatch => {
    database.ref('users/').on('value', async snap => {
      const data = await snap.val();
      if (data) {
        let users = [];
        for (let key in data) {
          users.push({ ...data[key], id: key });
        }
        const id = users.filter(user => user.email === email1)[0].id;
        dispatch(getUserId(id));
      }
    });
    auth.signInWithEmailAndPassword(email1, password1).then(userCredentials => {
      userCredentials.user
        .getIdTokenResult()
        .then(token => dispatch(loginSuccess(token.token)));
    });
  };
};

export const register = (email, password, username) => {
  database
    .ref('users/' + username)
    .set({
      cart: ['test'],
      email: email,
    })
    .catch(err => console.log(err));
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

export const logout = () => {
  return dispatch => {
    auth
      .signOut()
      .then(() => {
        dispatch(logoutSuccess());
      })
      .catch(err => console.log(err));
  };
};
