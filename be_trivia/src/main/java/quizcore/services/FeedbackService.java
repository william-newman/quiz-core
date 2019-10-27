package quizcore.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import quizcore.models.Feedback;
import quizcore.models.User;

import java.util.List;

@Service
public interface FeedbackService {

    ResponseEntity<List<Feedback>> getAllFeedback();

    ResponseEntity<Feedback> getFeedbackById(String id);

    ResponseEntity<List<Feedback>> getFeedbackByUser(User user);

    ResponseEntity<String> postFeedback(Feedback feedback);

    ResponseEntity<String> updateFeedback(String id, Feedback feedback);

    ResponseEntity<String> deleteFeedback(String id);
}
