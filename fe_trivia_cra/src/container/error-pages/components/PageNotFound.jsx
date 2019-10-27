import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessenger from './ErrorMessenger';

// Bad URI catch
const PageNotFound = () => {
    return (
        <div className="not-found">
      Sorry, the page you are looking for is not here
            <div>
                <Link to="/">
                    <input type="button" value="Back to Home Page" />
                </Link>
            </div>
            <ErrorMessenger />
        </div>
    );
};

export default PageNotFound;
