package quizcore.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "Database is unreachable")
public class DatabaseUnavailableException extends RuntimeException {

    public String returnMessage() {
        return "Database is unreachable";
    }
}
