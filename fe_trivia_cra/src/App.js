import React from 'react';
import { Provider } from 'react-redux';
import Routes from './routes/Routes';
import store from './store/store';
import './app.css';

function App() {
    return (
        <div>
            <Provider store={store}>
                <Routes />
            </Provider>
        </div>
    );
}

export default App;
