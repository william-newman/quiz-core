package quizcore.models;

import io.swagger.annotations.ApiModelProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    @Id
    private String id;
    @ApiModelProperty(example = "Billy")
    private String username;
    @ApiModelProperty(example = "ADMIN")
    private String role;
    @ApiModelProperty(example = "6236")
    private long passcode;

    public User() {
    }

    public User(String username, String role, long passcode) {
        this.username = username;
        this.role = role;
        this.passcode = passcode;
    }

    public User(String id, String username, String role, long passcode) {
        this.id = id;
        this.username = username;
        this.role = role;
        this.passcode = passcode;
    }

    public String getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public long getPasscode() {
        return passcode;
    }

    public void setPasscode(long passcode) {
        this.passcode = passcode;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", passcode=" + passcode +
                '}';
    }
}
