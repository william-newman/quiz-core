package quizcore.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import quizcore.models.Score;
import quizcore.models.User;
import quizcore.repositories.ScoreRepository;
import quizcore.repositories.UserRepository;
import quizcore.validators.ScoreValidator;

import java.util.List;

@Service
public class ScoreServiceImpl implements ScoreService {

    // Constructor
    public ScoreServiceImpl() {
    }

    // Declarations
    @Autowired
    private ScoreRepository scoreRepository;
    @Autowired
    private UserRepository userRepository;
    private User user;
    private static final Logger logger = LogManager.getLogger(ScoreServiceImpl.class.getName());
    private Score score;
    private List<Score> scoreList;
    private ResponseEntity<Score> responseEntity;
    private ResponseEntity<String> stringResponseEntity;
    private ResponseEntity<List<Score>> listResponseEntity;

    // Methods

    /**
     *
     * @return Score list, status
     */
    public ResponseEntity<List<Score>> getAllScores() {
        try {
            if (scoreRepository.findAll().size() > 0) {
                scoreList = scoreRepository.findAll();
                return listResponseEntity = new ResponseEntity<>(scoreList, HttpStatus.OK);
            } else {
                return listResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return listResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param id
     * @return
     */
    public ResponseEntity<Score> getScoreById(String id) {
        try {
            if (scoreRepository.findById(id).isPresent()) {
                score = scoreRepository.findById(id).get();
                return responseEntity = new ResponseEntity<>(score, HttpStatus.OK);
            } else {
                return responseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return responseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param score
     * @return
     */
    public ResponseEntity<String> addScore(Score score) { // maybe take userId in as param
        try {
            ScoreValidator scoreValidator = new ScoreValidator(score);
            if (scoreValidator.validData()) {
                if (score.getUser().getId() != null) {
                    if (userRepository.findById(score.getUser().getId()).isPresent()) {
                        user = userRepository.findById(score.getUser().getId()).get();
                        score.setUser(user);
                        scoreRepository.save(score);
                        return stringResponseEntity = new ResponseEntity<>(HttpStatus.CREATED);
                    } else {
                        return stringResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
                    }
                }
            }
            return stringResponseEntity = new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            logger.error(e.toString());
            return stringResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param quizScore
     * @return
     */
    public ResponseEntity<List<Score>> getScoreByQuizScore(int quizScore) {
        try {
            if (scoreRepository.findAllByQuizScore(quizScore).isPresent()) {
                scoreList = scoreRepository.findAllByQuizScore(quizScore).get();
                return listResponseEntity = new ResponseEntity<>(scoreList, HttpStatus.OK);
            } else {
                return listResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            logger.error(e.toString());
            return listResponseEntity = new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     *
     * @param id
     * @param updatedInfo
     * @return
     */
    public ResponseEntity<String> updateScore(String id, Score updatedInfo) {
        try { // work with user somehow
            ScoreValidator scoreValidator = new ScoreValidator(updatedInfo);
            boolean valid = scoreValidator.validData();
            if (valid) {
                if (scoreRepository.findById(id).isPresent()) {
                    scoreRepository.save(updatedInfo);
                    return stringResponseEntity = new ResponseEntity<>(HttpStatus.OK);
                } else {
                    return stringResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
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
     *
     * @param id
     * @return
     */
    public ResponseEntity<String> deleteScore(String id) {
        if (scoreRepository.findById(id).isPresent()) {
            score = scoreRepository.findById(id).get();
            try {
                scoreRepository.delete(score);
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
