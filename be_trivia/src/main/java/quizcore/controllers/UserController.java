package quizcore.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import quizcore.models.User;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.http.ResponseEntity;
import quizcore.services.UserService;

import java.util.List;

@RestController
@RequestMapping("/users")
@Api(value = "User Domain", produces = "Provides all necessary CRUD operations for the Users domain")
public class UserController {

    // Declarations
    @Autowired
    private UserService userService;

    // Methods
    @ApiOperation("Finds all Users in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = User.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<List<User>> findAllUsers() {
        return userService.getAllUsers();
    }

    @ApiOperation("Finds a User by Id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = User.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findById/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> findUserById(@PathVariable String id) {
        return userService.getUserById(id);
    }

    @ApiOperation("Finds a User by Username")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = User.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findByUsername", method = RequestMethod.GET)
    public ResponseEntity<User> findByUsername(@RequestParam String name) {
        return userService.getUserByUsername(name);
    }

    @ApiOperation("Creates a new User record in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successful post"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 409, message = "Conflict"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<String> postUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @ApiOperation("Checks for user by username input in the database and returns User if userLoginData is matching")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successful post"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 409, message = "Conflict"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<User> tryLogin(@RequestBody User userLoginData) {
        return userService.loginAttempt(userLoginData);
    }

    @ApiOperation("Updates an existing User record in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> putUser(
            @PathVariable(value = "id") String id,
            @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @ApiOperation("Deletes an existing User record from the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No content"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        return userService.deleteUser(id);
    }
}
