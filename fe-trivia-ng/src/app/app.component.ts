import { Component, DoCheck } from '@angular/core';
import { UserService } from './main/services/user.service';
import { version } from '../../package.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  title = 'Quiz Core';
  loggedIn = false;
  currentUsername: string;
  public version: string = version;

  constructor(private userService: UserService) {}

  ngDoCheck() {
    this.userCheck();
  }

  userCheck() {
    if (this.userService.checkUser()) {
      this.loggedIn = true;
      this.currentUsername = this.userService.currentUser.username;
    }
  }

  logOff() {
    if (this.loggedIn) {
      this.userService.setUserNull();
      this.loggedIn = false;
    }
  }
}
