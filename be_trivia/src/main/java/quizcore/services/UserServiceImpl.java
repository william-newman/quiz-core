package quizcore.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import quizcore.models.User;
import quizcore.repositories.UserRepository;
import quizcore.validators.UserValidator;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    // Constructor
    public UserServiceImpl() {
    }

    // Declarations
    @Autowired
    private UserRepository userRepository;
    private User user;
    private static final Logger logger = LogManager.getLogger(UserServiceImpl.class.getName());
    private List<User> userList;
    private ResponseEntity<User> responseEntity;
    private ResponseEntity<String> stringResponseEntity;
    private ResponseEntity<List<User>> listResponseEntity;

    // Methods

    /**
     * @return List of Users, Status
     */
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            if (userRepository.findAll().size() > 0) {
                userList = userRepository.findAll();
                return listResponseEntity = new ResponseEntity<>(userList, HttpStatus.OK);
            } else {
                return listResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return listResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param user // TODO documentation swagger
     * @return
     */
    public ResponseEntity<String> addUser(User user) {
        try {
            UserValidator userValidator = new UserValidator(user);
            if (userValidator.validData()) {
                if (userRepository.findByUsername(user.getUsername()).isPresent()) {
                    return stringResponseEntity = new ResponseEntity<>(HttpStatus.CONFLICT);
                } else {
                    userRepository.save(user);
                    return stringResponseEntity = new ResponseEntity<>(HttpStatus.CREATED);
                }
            } else {
                return stringResponseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return stringResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param userLoginData User input used in attempt to login
     * @return Status - OK status means user info passed in matches user's info in the DB
     */
    public ResponseEntity<User> loginAttempt(User userLoginData) {
        UserValidator userValidator = new UserValidator(userLoginData);
        if (userValidator.validUsernameAndPasscode()) {
            if (userRepository.findByUsername(userLoginData.getUsername()).isPresent()) {
                user = userRepository.findByUsername(userLoginData.getUsername()).get();
                if (user.getUsername().matches(userLoginData.getUsername()) && user.getPasscode() == userLoginData.getPasscode()) {
                    return responseEntity = new ResponseEntity<>(user, HttpStatus.OK); // Maybe provide more USER vs ADMIN options in the future
                } else {
                    return responseEntity = new ResponseEntity<>(HttpStatus.CONFLICT);
                }
            } else {
                return responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } else {
            return responseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * @param id
     * @return
     */
    public ResponseEntity<User> getUserById(String id) {
        try {
            if (userRepository.findById(id).isPresent()) {
                user = userRepository.findById(id).get();
                return responseEntity = new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return responseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param username
     * @return
     */
    public ResponseEntity<User> getUserByUsername(String username) {
        try {
            if (userRepository.findByUsername(username).isPresent()) {
                user = userRepository.findByUsername(username).get();
                return responseEntity = new ResponseEntity<>(user, HttpStatus.OK);
            } else {
                return responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return responseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param id
     * @param updatedInfo
     * @return
     */
    public ResponseEntity<String> updateUser(String id, User updatedInfo) {
        try {
            if (userRepository.findById(id).isPresent()) {
                UserValidator userValidator = new UserValidator(updatedInfo);
                if (userValidator.validDataWithId(id)) {
                    if (userRepository.findByUsername(updatedInfo.getUsername()).isPresent() && !userRepository.findByUsername(updatedInfo.getUsername()).get().getId().equals(id)) {
                        return stringResponseEntity = new ResponseEntity<>(HttpStatus.CONFLICT);
                    } else {
                        userRepository.save(updatedInfo);
                        return stringResponseEntity = new ResponseEntity<>(HttpStatus.OK);
                    }
                } else {
                    return stringResponseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
                }
            } else {
                return stringResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return stringResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * @param id
     * @return
     */
    public ResponseEntity<String> deleteUser(String id) {
        if (userRepository.findById(id).isPresent()) {
            user = userRepository.findById(id).get();
            try {
                userRepository.delete(user);
                return stringResponseEntity = new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                logger.error(e.toString());
                return stringResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } else {
            return stringResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
