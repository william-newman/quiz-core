import leaderboardConstants from '../constants/leaderboardConstants';

const initState = {
    leaderboards: [],
    errors: []
};

// Exported reducer, takes action types and does the action
export default function leaderboardReducer(state = initState, action) {
    switch (action.type) {
        case leaderboardConstants.FETCH_SUCCESS_LB: {            
            return Object.assign({}, state, { leaderboards: action.data });
        }
        case leaderboardConstants.THROW_ERRORS_LB: {
            return Object.assign({}, state, { errors: action.errors });
        }
        default:
            return state;
    }
}
