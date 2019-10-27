package quizcore.services;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import quizcore.models.Score;

import java.util.List;

@Service
public interface ScoreService {

    ResponseEntity<List<Score>> getAllScores();

    ResponseEntity<String> addScore(Score user);

    ResponseEntity<Score> getScoreById(String id);

    ResponseEntity<List<Score>> getScoreByQuizScore(int quizScore);

    ResponseEntity<String> updateScore(String id, Score updatedInfo);

    ResponseEntity<String> deleteScore(String id);
}
