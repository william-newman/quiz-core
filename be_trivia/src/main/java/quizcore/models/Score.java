package quizcore.models;

import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "scores")
public class Score {

    @Id
    private String id;
    @ApiModelProperty(example = "30")
    private int quizScore;
    private User user;
    @ApiModelProperty(example = "Stroop Test - Complex")
    private String quiz;

    public Score() {
    }

    public Score(int quizScore, User user, String quiz) {
        this.quizScore = quizScore;
        this.user = user;
        this.quiz = quiz;
    }

    public Score(String id, int quizScore, User user, String quiz) {
        this.id = id;
        this.quizScore = quizScore;
        this.user = user;
        this.quiz = quiz;
    }

    public String getId() {
        return id;
    }

    public int getQuizScore() {
        return quizScore;
    }

    public void setQuizScore(int quizScore) {
        this.quizScore = quizScore;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getQuiz() {
        return quiz;
    }

    public void setQuiz(String quiz) {
        this.quiz = quiz;
    }

    @Override
    public String toString() {
        return "Score{" +
                "id='" + id + '\'' +
                ", score='" + quizScore + '\'' +
                ", user=" + user +
                ", quiz='" + quiz + '\'' +
                '}';
    }
}
