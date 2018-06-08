import { AUTH_USER, DEAUTH_USER, AUTH_ERROR, DISMISS_AUTH_ERROR } from '../actions/types';

export default function(state = {}, action) {
    switch(action.type) {
        case AUTH_USER:
            return { ...state, authenticated: true, error: null };
        case DEAUTH_USER:
            return { ...state, authenticated: false};
        case AUTH_ERROR:
            return { ...state, error: action.payload };
        case DISMISS_AUTH_ERROR:
            return { ...state, error: null };
    }

    return state;
}
