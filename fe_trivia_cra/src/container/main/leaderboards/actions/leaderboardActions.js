import leaderboardConstants from '../constants/leaderboardConstants';

// After successful fetch, send leaderboard data to page
export const handleFetchData = (data) => {
    return {
        type: leaderboardConstants.FETCH_SUCCESS_LB,
        data
    };
};

// Trigger get fetch
export const leaderboardGetFetch = () => {
    return {
        type: leaderboardConstants.GET_FETCH_LB
    };
};

// Sets error state for leaderboard
export const throwErrors = (errors) => {
    return {
        type: leaderboardConstants,
        errors
    };
};