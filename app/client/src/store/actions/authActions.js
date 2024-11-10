// store/actions/authActions.js

export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const REFRESH = "REFRESH"

export const login = (user) => {
  return {
    type: LOGIN,
    payload: user,
  };
};

export const refresh = (token, user) => {
  return {
    type: REFRESH,
    payload: {
      token, user
    },
  };
};

export const logout = () => {
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('userProfile');
  return {
    type: LOGOUT,
  };
};
