import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  errorMessages = [];
  feedbackTitle: string;
  feedbackBody: string;
  feedbackSubmitted = false;
  currentUser = 'anonymously';
  loggedIn = false;

  constructor(private router: Router, private feedbackService: FeedbackService, private userService: UserService) { }

  ngOnInit() {
    if (this.userService.checkUser()) {
      this.currentUser = this.userService.currentUser.username;
      this.loggedIn = true;
    }
  }

  sendFeedback(valid: boolean, feedbackTitle: string, feedbackBody: string) {
    this.errorMessages = [];
    const errArr = [];
    const dateSubmitted = this.createTimestamp();
    let userId = this.userService.getUserId();

    if (!userId) {
      userId = 'dummy';
    }

    if (valid) {
      const feedbackData = {
        feedbackTitle,
        feedbackBody,
        dateSubmitted,
        user: {
          id: userId
        }
      };

      this.feedbackService.onCreateFeedback(feedbackData)
      .subscribe(response => {
        this.errorMessages = ['Submitted successfully!'];
        this.feedbackSubmitted = true;
      }, error => {
        if (error.status === 404) {
          errArr.push('Username not found, please check username');
        } else if (error.status === 409) {
          errArr.push('Username or passcode is incorrect');
        } else if (error.status === 500) {
          errArr.push('Server error');
          errArr.push('Please try again later');
        } else if (error.status === 400) {
          errArr.push('Title or body is formatted incorrectly');
        } else {
          errArr.push('Unexpected error');
          errArr.push('Please contact administrator');
        }
        this.errorMessages = errArr;
      });
    }
  }

  validateFeedback() {
    this.errorMessages = [];
    const feedbackRegex = /^[a-zA-Z0-9\"]+.*/gm;
    const validTitle = !!this.feedbackTitle.match(feedbackRegex);
    const validBody = !!this.feedbackBody.match(feedbackRegex);
    const allValid = validTitle && validBody;

    if (!validTitle) {
      this.errorMessages.push('Title must begin with a letter, number, or quotes');
    }
    if (!validBody) {
      this.errorMessages.push('Body must begin with a letter, number, or quotes');
    }
    if (allValid) {
      this.sendFeedback(allValid, this.feedbackTitle, this.feedbackBody);
    }
  }

  createTimestamp() {
    const date = new Date();
    date.toLocaleString();
    return date;
  }

}
