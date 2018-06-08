import axios from 'axios';
import history from '../services/history';
import { API_ROOT } from '../../.config';
import { AUTH_USER, AUTH_ERROR, DEAUTH_USER,
        DISMISS_AUTH_ERROR, FETCH_MESSAGE } from './types';

/**
 * This action creator logs user in and redirects to
 * protected path '/protected'.
 * @param  {String} options.email
 * @param  {String} options.password
 */
export function signinUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${API_ROOT}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/protected');
            })
            .catch(err => {
                const description = err.response.status === 400 ?
                'You must enter both email and password.' : err.response.status === 401 ?
                'Incorrect password or email :(' :
                'There was an error signing you in. Please check your login info and try again.';
                dispatch(authError({ title: 'Bad login info', description: description }));
            });
    }
}

/**
 * Remove token from localstorage and deauthenticate user
 */
export function signoutUser() {
    localStorage.removeItem('token');
    return { type: DEAUTH_USER };
}

/**
 * Very much like signinUser()
 * @param  {String} options.email
 * @param  {String} options.password
 */
export function signupUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${API_ROOT}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                history.push('/protected');
            })
            .catch(err => {
                dispatch(authError({ title: 'Oops!', description: err.response.data.error }));
            });
    }
}

/**
 * Set authentication error to store
 * @param  {Object} error
 */
export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    }
}

/**
 * Delete authentication error from store
 */
export function dismissAuthError() {
    return {
        type: DISMISS_AUTH_ERROR
    }
}

/**
 * Example action to handle jwt-token protected resource
 */
export function fetchMessage() {
    return function(dispatch) {
        axios.get(API_ROOT, {
            headers: { authorization: localStorage.getItem('token')}
        }).then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data
            });
        });
    }
}
