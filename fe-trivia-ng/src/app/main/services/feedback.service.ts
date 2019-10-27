import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import appConstants from './appConstants';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  constructor(private http: HttpClient) { }

  onCreateFeedback(postData: any) {
    return this.http.post(appConstants.baseURL + '/feedback/create', postData);
  }

  onFetchFeedback() {}

  onFetchFeedbackById() {}

  onFetchFeedbackByUser() {}
}
