export const loginUser = (user) => ({
    type: 'LOGIN_USER',
    payload: user,
  });
  
  export const logoutUser = (user) => ({
    type: 'LOGOUT_USER',
    payload: user,
  });
  
  const initialState = {
    user: null,
  };
  
  const Actions = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_USER':
        return {
          ...state,
          user: action.payload,
        };
      case 'LOGOUT_USER':
        return {
          ...state,
          user: null,
        };
      default:
        return state;
    }
  };
  
  export default Actions;
  