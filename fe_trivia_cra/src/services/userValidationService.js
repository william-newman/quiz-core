export function validUserLoginData(userData) {
    const errArr = [];

    if (!userData.username == null || !userData.username.match('^[a-zA-Z]+$')) {
        errArr.push('Username must be letters only');
    }

    if (userData.username.length > 12) {
        errArr.push('Username must be 12 characters or less');
    }

    if (
        userData.passcode == null ||
    isNaN(userData.passcode) ||
    userData.passcode < 100 ||
    userData.passcode > 999999
    ) {
        errArr.push('Passcode must be a 3 to 6 digit number');
    }

    if (userData.role == null) {
        errArr.push('Invalid role');
    }

    return errArr;
}

export function validUserSignUpData(userData) {
    const errArr = [];

    if (!userData.username.match('^[a-zA-Z]+$')) {
        errArr.push('Username must be letters only');
    }

    if (userData.passcode.length < 3 || userData.passcode.length > 6) {
        errArr.push('Passcode must be 3-6 digits long');
    }

    if (!userData.passcode.match(userData.passcodeConfirm)) {
        errArr.push('Passcode entries do not match');
    }

    if (userData.username.toLowerCase().match('^billy$')) {
        errArr.push('Username is in use ( ._.)');
    }

    return errArr;
}

export function checkValidRole(roleInput) {
    return (roleInput !== undefined && roleInput.length > 0);
}

export function giveAdmin(roleInput) {
    return (roleInput.match('^midasmod$'));
}