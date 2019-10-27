import authConstants from '../constants/authConstants';

const initState = {
    loggedIn: false,
    authErrors: [],
    user: {
        id: null,
        username: null,
        role: null
    },
    validLogin: false
};

// Exported reducer, takes action types and does the action
export default function authReducer(state = initState, action) {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS: {
            return Object.assign({}, state, { loggedIn: action.bool, user: action.user });
        }
        case authConstants.THROW_AUTH_ERRORS: {
            return Object.assign({}, state, { authErrors: action.errors });
        }
        case authConstants.LOGIN_VALID: {
            return Object.assign({}, state, { validLogin: action.bool });
        }
        case authConstants.LOGOUT: {
            sessionStorage.clear();
            return Object.assign({}, state, {
                loggedIn: false,
                user: {
                    id: null,
                    username: null,
                    role: null
                }
            });
        }
        // case encounterConstants.ENCOUNTER_REDIR:
        // {
        //     return Object.assign({}, state, { encRedir: action.bool });
        // }
        // case encounterConstants.ENCOUNTER_TO_EDIT:
        // {
        //     return Object.assign({}, state, { editEnc: action.data });
        // }
        default:
            return state;
    }
}
