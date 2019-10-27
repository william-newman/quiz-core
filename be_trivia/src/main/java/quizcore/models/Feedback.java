package quizcore.models;

import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document(collection = "feedback")
public class Feedback {

    @Id
    private String id;
    private User user;
    @ApiModelProperty(example = "Test Title")
    private String feedbackTitle;
    @ApiModelProperty(example = "Test Complaint")
    private String feedbackBody;
    private Date dateSubmitted;

    public Feedback() {
    }

    public Feedback(User user, String feedbackTitle, String feedbackBody, Date dateSubmitted) {
        this.user = user;
        this.feedbackTitle = feedbackTitle;
        this.feedbackBody = feedbackBody;
        this.dateSubmitted = dateSubmitted;
    }

    public Feedback(String id, User user, String feedbackTitle, String feedbackBody, Date dateSubmitted) {
        this.id = id;
        this.user = user;
        this.feedbackTitle = feedbackTitle;
        this.feedbackBody = feedbackBody;
        this.dateSubmitted = dateSubmitted;
    }

    public String getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getFeedbackTitle() {
        return feedbackTitle;
    }

    public void setFeedbackTitle(String feedbackTitle) {
        this.feedbackTitle = feedbackTitle;
    }

    public String getFeedbackBody() {
        return feedbackBody;
    }

    public void setFeedbackBody(String feedbackBody) {
        this.feedbackBody = feedbackBody;
    }

    public Date getDateSubmitted() {
        return dateSubmitted;
    }

    public void setDateSubmitted(Date dateSubmitted) {
        this.dateSubmitted = dateSubmitted;
    }

    @Override
    public String toString() {
        return "Feedback{" +
                "id='" + id + '\'' +
                ", user='" + user + '\'' +
                ", feedbackTitle='" + feedbackTitle + '\'' +
                ", feedbackBody='" + feedbackBody + '\'' +
                ", dateSubmitted=" + dateSubmitted +
                '}';
    }
}
