import authConstants from '../constants/authConstants';

// Try login
export const handleLogin = (data) => {
    return {
        type: authConstants.HANDLE_LOGIN,
        data
    };
};

// Throw some errorz
export const throwAuthErrors = (errors) => {
    return {
        type: authConstants.THROW_AUTH_ERRORS,
        errors
    };
};

// Change logged in state
export const loginSuccess = (bool, user) => {
    return {
        type: authConstants.LOGIN_SUCCESS,
        bool,
        user
    };
};

// Clear storage and any auth state
export const logout = () => {
    return {
        type: authConstants.LOGOUT
    };
};

// Changes boolean of form validity based on passed value
export const validLogin = (bool) => {
    return {
        type: authConstants.LOGIN_VALID,
        bool
    };
};