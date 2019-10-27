import {
    put,
    takeEvery,
    all
} from 'redux-saga/effects';
import authConstants from '../constants/authConstants';
import * as authActions from '../actions/authActions';
import globalConstants from '../../../../resources/globalConstants';

// domain watcher - triggered when below constants are used
export function* watchAuth() {
    yield all([
        takeEvery(authConstants.HANDLE_LOGIN, loginPostFetch),
    ]);
}

// Attempt to login
function* loginPostFetch(object) {
    let headers = new Headers();
    let errors = [];
    let user = null;

    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');

    // POST fetch and errors handling
    yield fetch(globalConstants.baseBackendURL + 'users/login', {
        method: 'POST',
        headers: headers,
        mode: 'cors',
        body: JSON.stringify(object.data)
    })
        .then(res => {
            if (res.ok) {
                errors = [];
                return res.json();
            } else if (res.status === 400) {
                errors.push('Invalid info');
                throw new Error('Bad request');
            } else if (res.status === 409) {
                errors.push('Not in use');
                throw new Error('Conflict');
            } else if (res.status === 502) {
                errors.push('Database not responsive');
                throw new Error('Unresponsive DB');
            } else if (res.status === 401) {
                errors.push('UNAUTHORIZED');
                errors.push('Please try again');
                throw new Error('Unauthorized');
            } else if (res.status === 500) {
                errors.push('Warning, server error');
                errors.push('Please contact administrator');
                throw new Error('Internal server error');
            } else if (res.status === 404) {
                errors.push('Endpoint not found');
                errors.push('Please try again');
                throw new Error('Endpoint not found');
            } else if (res.status === 403) {
                errors.push('Response 403');
                throw new Error('Forbidden');
            } else {
                throw new Error('Uncaught error');
            }
        })
        .then(data => {
            errors = [];
            user = data;
        })
        .catch(err => {
            errors.push('Fetch issues');
            errors.push('Please contact administrator');
            errors.push(err + '');
        });
    // If no errors, redirect and throw success
    if (errors.length === 0) {
        errors = ['Successful login'];
        if (object.data.username.match('^Billy$')) {
            yield sessionStorage.setItem('token','ADMIN');
        } else {
            yield sessionStorage.setItem('token','USER');
        }
        yield sessionStorage.setItem('username', user.username);
        // Success
        yield put(authActions.loginSuccess(true, user));
        // and throw success message
        yield put(authActions.throwAuthErrors(errors));
    } else {
        // Else throw errors and stay put
        yield put(authActions.throwAuthErrors(errors));
        // yield put(authActions.toggleRedir(false));
    }
}