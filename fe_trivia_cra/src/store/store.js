import {
    createStore,
    compose,
    applyMiddleware
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from '../combine-reducer/reducer';
import { watchAuth } from '../container/main/auth/sagas/authSaga';
import { watchLeaderboard } from '../container/main/leaderboards/sagas/leaderboardSagas';

// Add Sagas
const sagaMiddleWare = createSagaMiddleware();

// Create store with reducers and middleware
const store = createStore(reducers,
    compose(
        applyMiddleware(sagaMiddleWare)
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

// Tell Sagas to look for saga classes
sagaMiddleWare.run(watchAuth);
sagaMiddleWare.run(watchLeaderboard);

export default store;