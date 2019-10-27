import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import appConstants from './appConstants';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  leaderboardData: any;

  constructor(private http: HttpClient) {}

  onCreateEntry(scoreToPost: object): any {
    return this.http.post(appConstants.baseURL + '/scores/create', scoreToPost);
  }

  onFetchLeaderboards(): any {
    return this.http.get(appConstants.baseURL + '/scores/findAll');
  }

  onFetchEntriesByUser() {}
}
