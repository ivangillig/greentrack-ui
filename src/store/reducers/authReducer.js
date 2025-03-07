import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../../actions";

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
