import Type from '../actions/types';
import { User } from 'firebase/auth';

type AuthReducerState = {
  isLoading: boolean;
  error: string;
  user: User | null;
  isSignedIn: boolean | null;
};

const initialState: AuthReducerState = {
  isLoading: false,
  error: '',
  user: null,
  isSignedIn: null
};

type SetLoadingAction = {
  type: Type.SetLoading,
  payload: boolean;
}

type LoginUserFailAction = {
  type: Type.LoginUserFail,
  payload: string;
}

type LoginUserAction = {
  type: Type.LoginUserSuccess,
  payload: User;
}

type NavigateToSignupAction = {
  type: Type.NavigateToSignup
}

type NavigateToSigninAction = {
  type: Type.NavigateToSignin
}

type SingOutUserAction = {
  type: Type.SignOutUser
}

type SetErrorAction = {
  type: Type.SetError,
  payload: string;
}

type ResolveAuthAction = {
  type: Type.ResolveAuth,
  payload: User | null;
}

type AuthReducerAction =
  SetLoadingAction | LoginUserFailAction | LoginUserAction |
  NavigateToSignupAction | NavigateToSigninAction | SingOutUserAction | SetErrorAction | ResolveAuthAction;

export const authReducer = (state: AuthReducerState = initialState, action: AuthReducerAction): AuthReducerState => {
  switch (action.type) {
    case Type.SetLoading:
      return { ...state, isLoading: action.payload };
    case Type.LoginUserFail:
      return { ...state, isSignedIn: false, error: action.payload };
    case Type.LoginUserSuccess:
      return { ...state, ...initialState, isSignedIn: true, user: action.payload };
    case Type.NavigateToSignup:
    case Type.NavigateToSignin:
      return { ...state, error: '' };
    case Type.SignOutUser:
      return { ...state, user: null, isSignedIn: false };
    case Type.SetError:
      return { ...state, error: action.payload };
    case Type.ResolveAuth:
      return { ...state, user: action.payload, isSignedIn: !!action.payload };
    default:
      return state;
  }
};
