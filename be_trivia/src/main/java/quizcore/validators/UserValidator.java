package quizcore.validators;

import quizcore.models.User;

public class UserValidator {

    // Declaration
    private User user;

    // Constructor
    public UserValidator(User user) {
        this.user = user;
    }

    // Validation methods

    /**
     * Pulls in new data and validates by regex
     *
     * @return Validity boolean
     */
    public boolean validData() {
        return (
                user.getUsername().matches("^[a-zA-Z'-]+$") &&
                        user.getUsername() != null &&
                        user.getRole() != null &&
                        user.getRole().matches("^ADMIN|USER$") &&
                        user.getPasscode() > 99 &&
                        user.getPasscode() < 1000000
        );
    }

    /**
     * Pulls in new data with id and validates by regex
     *
     * @return Validity boolean
     */
    public boolean validDataWithId(String id) {
        return (
                user.getUsername().matches("^[a-zA-Z'-]+$") &&
                        user.getId() != null &&
                        user.getUsername() != null &&
                        user.getRole() != null &&
                        user.getRole().matches("^ADMIN|USER$") &&
                        user.getPasscode() > 99 &&
                        user.getPasscode() < 1000000 &&
                        user.getId().equalsIgnoreCase(id)
        );
    }

    /**
     * Pulls in new username and passcode and validates by regex
     *
     * @return Validity boolean
     */
    public boolean validUsernameAndPasscode() {
        return (
                user.getUsername().matches("^[a-zA-Z'-]+$") &&
                        user.getUsername() != null &&
                        user.getPasscode() > 99 &&
                        user.getPasscode() < 1000000 &&
                        user.getRole().matches("^LOGIN$")
        );
    }
}
