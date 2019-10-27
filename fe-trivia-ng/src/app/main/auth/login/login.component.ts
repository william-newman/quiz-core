import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  passcode: number;
  errorMessages = [];

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.errorMessages = this.userService.dataArr;
  }

  login(valid: boolean, username: string, passcode: number) {
    this.errorMessages = [];
    const errArr = [];

    if (valid) {
      const loginObject = {
        username,
        passcode,
        role: 'LOGIN'
      }; // Pass dummy role specifically for login

      this.userService.tryLogin(loginObject)
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

    // if (valid) {
    //   this.authService
    //     .login(this.email, this.password)
    //     .then(res => {
    //       const status = 'online';
    //       this.authService.setUserStatus(status);
    //     })
    //     .then(() => this.router.navigate(['/chat']))
    //     .catch(err => (this.errorMessage = err.message));
    // } else {
    //   this.errorMessage = 'Fatal error';
    // }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.validateUser();
    }
  }

  validateUser() {
    this.errorMessages = [];
    const validUsername = !!this.username.match('^[a-zA-Z]+$');
    const validPasscodeRange = this.passcode > 99 && this.passcode < 1000000;
    const allValid = validUsername && validPasscodeRange;

    if (!validUsername) {
      this.errorMessages.push('Username must be letters only');
    }
    if (!validPasscodeRange) {
      this.errorMessages.push('Passcode must be numbers only and 3 to 6 digits long');
    }
    if (allValid) {
      this.login(allValid, this.username, this.passcode);
    }
  }

  forgotPassword() {
    alert('Too bad! ☺');
  }
}
