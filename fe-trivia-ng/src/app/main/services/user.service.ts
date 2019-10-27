import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import appConstants from './appConstants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  dataArr = [];
  currentUser =
  {
    id: null,
    username: null,
    role: null
  };
  // {
  //   id: 'dummy',
  //   username: 'Scruffy',
  //   role: 'ADMIN'
  // };

  constructor(private http: HttpClient) { }

  passThrough(data: string[]) {
    this.dataArr = data;
    setTimeout(() => {
      this.dataArr = [];
    }, 1000);
  }

  checkUser(): boolean {
    return this.getUserId() != null;
  }

  setUserNull() {
    this.currentUser = {
      id: null,
      username: null,
      role: null
    };
  }

  getUserId(): string {
    return this.currentUser.id;
  }

  onCreateFetch(userData: object): any {
    return this.http.post(appConstants.baseURL + '/users/create', userData);
  }

  tryLogin(loginData: object): any {
    return this.http.post(appConstants.baseURL + '/users/login', loginData);
  }

  onGetUser() {}
}
