import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string;
  passcode: number;
  passcodeConfirm: number;
  role: string;
  errorMessages: string[];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {}

  signUp(valid: boolean) {
    const username = this.username;
    const passcode = this.passcode;
    let role = this.role;
    let adminCreds = false;
    let goAhead = false;

    if (valid) {
      if (role !== undefined) {
        const adminReg = role.match('^midasmod$');
        if (role.length !== 0 && !adminReg) {
          this.errorMessages.push('Please leave the "Permissions" field blank');
          goAhead = false;
        } else if (adminReg) {
          adminCreds = true;
          goAhead = true;
        } else {
          goAhead = true;
          adminCreds = false;
          this.errorMessages = [];
        }
      } else {
        goAhead = true;
        adminCreds = false;
      }

      if (goAhead) {
        role = 'USER';
        if (adminCreds) {
          role = 'ADMIN';
        }
        const userObject = {
          passcode,
          role,
          username
        };
        this.userService.onCreateFetch(userObject)
        .subscribe(() => {
          this.errorMessages = [];
          this.loginAfterSignUp(userObject);

          // this.userService.passThrough(['Successful signup, please login']);
          // this.router.navigateByUrl('/');
        }, error => {
          if (error.status === 409) {
            this.errorMessages.push('This username is already taken');
          } else if (error.status === 400) {
            this.errorMessages.push('Incorrect data entered');
          } else if (error.status >= 500) {
            this.errorMessages.push('Server error');
            this.errorMessages.push('Please try again later');
          } else {
            this.errorMessages.push('Unknown error');
            this.errorMessages.push('Please contact a system administrator');
          }
        });
      }
    }
  }

  validateUser() {
    const validUsername = !!this.username.match('^[a-zA-Z]+$');
    const validPasscode = this.passcode > 99 && this.passcode < 1000000;
    const passcodeConfirmed = this.passcode === this.passcodeConfirm;
    const theyAreMe = this.username.toLowerCase().match('^billy$');
    let valid = false;
    const errArr = [];

    if (!validUsername) {
      errArr.push('Username must be letters only');
    }
    if (!validPasscode) {
      errArr.push('Passcode must be 3-6 digits long');
    }
    if (!passcodeConfirmed) {
      errArr.push('Passcode entries do not match');
    }
    if (theyAreMe) {
      errArr.push('Username is in use ._.');
    }

    if (errArr.length === 0) {
      valid = true;
      this.errorMessages = errArr;
      this.signUp(valid);
    } else {
      valid = false;
      this.errorMessages = errArr;
    }
  }
   loginAfterSignUp(userObject) {
    const errArr = [];
    userObject.role = 'LOGIN';

    this.userService.tryLogin(userObject)
     .subscribe(response => {
      this.userService.currentUser = response;
      this.router.navigateByUrl('/');
    }, error => {
      if (error.status === 404) {
        errArr.push('Username not found, please check username');
      } else if (error.status === 409) {
        errArr.push('Username or passcode is incorrect');
      } else if (error.status === 500) {
        errArr.push('Server error');
        errArr.push('Please try again later');
      } else if (error.status === 400) {
        errArr.push('Username or passcode is formatted incorrectly');
      } else {
        errArr.push('Unexpected error');
        errArr.push('Please contact administrator');
      }
      this.errorMessages = errArr;
    });
   }
}
