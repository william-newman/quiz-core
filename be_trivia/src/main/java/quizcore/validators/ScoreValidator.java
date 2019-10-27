package quizcore.validators;

import quizcore.models.Score;

public class ScoreValidator {

    // Declaration
    private Score score;

    // Constructor
    public ScoreValidator(Score score) {
        this.score = score;
    }

    // Validation method

    /**
     * Pulls in new data and validates by regex
     *
     * @return Validity boolean
     */
    public boolean validData() {
        return (
                score.getQuiz() != null &&
                        score.getQuizScore() >= -10 &&
                        score.getQuizScore() < 999 &&
                        score.getUser().getId() != null &&
                        score.getUser().getUsername() == null &&
                        score.getUser().getRole() == null
        );
    }
}
