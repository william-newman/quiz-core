package quizcore.services;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import quizcore.models.Feedback;
import quizcore.models.User;
import quizcore.repositories.FeedbackRepository;
import quizcore.repositories.UserRepository;
import quizcore.validators.FeedbackValidator;

import java.util.List;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    // Constructor
    public FeedbackServiceImpl() {
    }

    // Declarations
    @Autowired
    private FeedbackRepository feedbackRepository;
    @Autowired
    private UserRepository userRepository;
    private User user;
    private static final Logger logger = LogManager.getLogger(FeedbackServiceImpl.class.getName());
    private Feedback feedback;
    private List<Feedback> feedbackList;
    private ResponseEntity<Feedback> responseEntity;
    private ResponseEntity<String> stringResponseEntity;
    private ResponseEntity<List<Feedback>> listResponseEntity;

    // Methods

    /**
     * Finds all feedback in the DB
     *
     * @return Feedback list, status
     */
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        try {
            if (feedbackRepository.findAll().size() > 0) {
                feedbackList = feedbackRepository.findAll();
                return listResponseEntity = new ResponseEntity<>(feedbackList, HttpStatus.OK);
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
    public ResponseEntity<Feedback> getFeedbackById(String id) {
        try {
            if (feedbackRepository.findById(id).isPresent()) {
                feedback = feedbackRepository.findById(id).get();
                return responseEntity = new ResponseEntity<>(feedback, HttpStatus.OK);
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
     * @param user
     * @return
     */
    public ResponseEntity<List<Feedback>> getFeedbackByUser(User user) {
        return null; // TODO: Cross-ref userId and Feedback
    }

    /**
     *
     * @param feedback
     * @return
     */
    public ResponseEntity<String> postFeedback(Feedback feedback) {
        try {
            FeedbackValidator feedbackValidator = new FeedbackValidator(feedback);
            if (feedbackValidator.validData()) {
                if (feedback.getUser().getId() != null) {
                    if (userRepository.findById(feedback.getUser().getId()).isPresent()) {
                        user = userRepository.findById(feedback.getUser().getId()).get();
                        feedback.setUser(user);
                        feedbackRepository.save(feedback);
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
     * @param id
     * @param updatedInfo
     * @return
     */
    public ResponseEntity<String> updateFeedback(String id, Feedback updatedInfo) {
        try { // work with user somehow
            FeedbackValidator feedbackValidator = new FeedbackValidator(updatedInfo);
            boolean valid = feedbackValidator.validData();
            if (valid) {
                if (feedbackRepository.findById(id).isPresent()) {
                    if (userRepository.findById(updatedInfo.getUser().getId()).isPresent()) {
                        user = userRepository.findById(updatedInfo.getUser().getId()).get();
                        updatedInfo.setUser(user);
                        feedbackRepository.save(updatedInfo);
                        return stringResponseEntity = new ResponseEntity<>(HttpStatus.OK);
                    }
                }
//                } else {
                return stringResponseEntity = new ResponseEntity<>(HttpStatus.NOT_FOUND);
//                }
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
    public ResponseEntity<String> deleteFeedback(String id) {
        if (feedbackRepository.findById(id).isPresent()) {
            feedback = feedbackRepository.findById(id).get();
            try {
                feedbackRepository.delete(feedback);
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
