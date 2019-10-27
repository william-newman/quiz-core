package quizcore.controllers;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import quizcore.models.Score;
import quizcore.models.Score;
import quizcore.services.ScoreService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/scores")
@Api(value = "Score Domain", produces = "Provides all necessary CRUD operations for the Scores domain")
public class ScoreController {

    // Declarations
    @Autowired
    private ScoreService scoreService;

    // Methods
    @ApiOperation("Finds all Scores in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Score.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findAll", method = RequestMethod.GET)
    public ResponseEntity<List<Score>> findAllScores() {
        return scoreService.getAllScores();
    }

    @ApiOperation("Finds a User's Score by Score's Id")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", response = Score.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findById/{id}", method = RequestMethod.GET)
    public ResponseEntity<Score> findScoreById(@PathVariable String id) {
        return scoreService.getScoreById(id);
    }

    @ApiOperation("Finds Score objects by QuizScore")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK", responseContainer = "List", response = Score.class),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/findByQuizScore", method = RequestMethod.GET)
    public ResponseEntity<List<Score>> findByQuizScore(@RequestParam int quizScore) {
        return scoreService.getScoreByQuizScore(quizScore);
    }

    @ApiOperation("Creates a new Score record in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 201, message = "Successful post"),
            @ApiResponse(code = 400, message = "Bad request"),
            @ApiResponse(code = 409, message = "Conflict"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    public ResponseEntity<String> postScore(@RequestBody Score score) {
        return scoreService.addScore(score);
    }

    @ApiOperation("Updates an existing Score record in the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "OK"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/update/{id}", method = RequestMethod.PUT)
    public ResponseEntity<String> putScore(
            @PathVariable(value = "id") String id,
            @Valid @RequestBody Score score) {
        return scoreService.updateScore(id, score);
    }

    @ApiOperation("Deletes an existing Score record from the Database")
    @ApiResponses(value = {
            @ApiResponse(code = 204, message = "No content"),
            @ApiResponse(code = 404, message = "Not found"),
            @ApiResponse(code = 500, message = "Internal error")
    })
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<String> deleteScore(@PathVariable String id) {
        return scoreService.deleteScore(id);
    }
}
