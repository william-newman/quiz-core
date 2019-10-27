package quizcore.repositories;

import quizcore.models.Score;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScoreRepository extends MongoRepository<Score, String> {

    Optional<List<Score>> findAllByQuizScore(int quizScore);
}
