package quizcore.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quizcore.models.Feedback;
import quizcore.models.User;
import quizcore.services.FeedbackService;
import quizcore.services.FeedbackServiceImpl;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/feedback")
@Api(value = "Feedback Domain", produces = "Provides all necessary CRUD operations for the Feedback domain")
public class FeedbackController {

    // Declarations
    @Autowired
    private FeedbackService feedbackService;

    // Constructors
//    public FeedbackController() {
//        this(new FeedbackServiceImpl());
//    }
//
//    public FeedbackController(FeedbackService feedbackService) {
//        this.feedbackService = feedbackService;
//    }

    // Methods
    @ApiOperation("Finds all Feedback in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Feedback.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<List<Feedback>> findAllFeedback() {
        return feedbackService.getAllFeedback();
    }

    @ApiOperation("Find Feedback by Id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Feedback.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findById/{id}", method = RequestMethod.GET)
    public ResponseEntity<Feedback> findFeedbackById(@PathVariable String id) {
        return feedbackService.getFeedbackById(id);
    }

    @ApiOperation("Finds Feedback by User")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Feedback.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findFeedbackByUser", method = RequestMethod.GET)
    public ResponseEntity<List<Feedback>> findFeedbackByUser(@RequestParam User user) {
        return feedbackService.getFeedbackByUser(user);
    }

    @ApiOperation("Creates a new Feedback record in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successful post"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 409, message = "Conflict"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<String> createFeedback(@RequestBody Feedback feedback) {
        return feedbackService.postFeedback(feedback);
    }

    @ApiOperation("Updates an existing Feedback record in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> updateFeedback(
            @PathVariable(value = "id") String id,
            @Valid @RequestBody Feedback feedback) {
        return feedbackService.updateFeedback(id, feedback);
    }

    @ApiOperation("Deletes an existing Feedback record from the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No content"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteFeedback(@PathVariable String id) {
        return feedbackService.deleteFeedback(id);
    }
}
