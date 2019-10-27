import {
    combineReducers
} from 'redux';
import authReducer from '../container/main/auth/reducer/authReducer';
import leaderboardReducer from '../container/main/leaderboards/reducer/leaderboardReducer';

// Combine reducers and export
const reducers = combineReducers({
    authState: authReducer,
    leaderboardState: leaderboardReducer
});

export default reducers;