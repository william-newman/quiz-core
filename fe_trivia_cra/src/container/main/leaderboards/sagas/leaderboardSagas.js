import {
    put,
    takeEvery,
    all
    // delay,
    // select
} from 'redux-saga/effects';
import leaderboardConstants from '../constants/leaderboardConstants';
import * as leaderboardActions from '../actions/leaderboardActions';
import globalConstants from '../../../../resources/globalConstants';

// Leaderboard watcher - triggered when below constants are used
export function* watchLeaderboard() {
    yield all([
        takeEvery(leaderboardConstants.GET_FETCH_LB, leaderboardGetFetch)
    ]);
}

// Fetches leaderboard data
function* leaderboardGetFetch() {
    let errors = [];
    let response = [];
    let no = false;

    let headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    yield fetch(globalConstants.baseBackendURL + 'scores/findAll', {
        method: 'GET',
        headers: headers,
        mode: 'cors'
    })
        .then(res => {
            if (res.ok) {
                errors = [];
                return res.json();
            } else if (res.status === 502) {
                errors.push('Error fetching domain thing');
                errors.push('Please contact administrator');
                throw new Error('Unresponsive DB');
            } else if (res.status === 500) {
                errors.push('Error fetching domain thing');
                errors.push('Please contact administrator');
                throw new Error('Internal server error');
            } else if (res.status === 404) {
                no = true;
                throw new Error('No endpoints found');
            } else {
                errors.push('Error fetching domain');
                errors.push('Please contact administrator');
                throw new Error('Uncaught error');
            }
        })
        .then(json => {
            response = json;
        })
        .catch(err => {
            errors.push(err + '');
        });
        
    // If no domain is found with given OtherDomain id, do not display as an error
    // OtherDomain Details page will automatically dispay "No domain"
    if (no) {
        errors = [];
    }
    
    // If errors, send an empty array as response
    // This triggers page's "No leaderboard" return
    if (errors.length > 0) {
        response = [];
    }

    // Send response and errors
    yield put(leaderboardActions.handleFetchData(response));
    yield put(leaderboardActions.throwErrors(errors));
}
