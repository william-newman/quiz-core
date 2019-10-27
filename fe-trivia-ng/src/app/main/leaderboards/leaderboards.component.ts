import { Component, OnInit, OnDestroy } from '@angular/core';
import { LeaderboardService } from '../services/leaderboard.service';

@Component({
  selector: 'app-leaderboards',
  templateUrl: './leaderboards.component.html',
  styleUrls: ['./leaderboards.component.css']
})
export class LeaderboardsComponent implements OnInit, OnDestroy {
  dataLoaded = false;
  // Default data, no server
  stroopEasyData = [];
  stroopComplexData = [];
  stroopInsaneData = [];
  // TODO: error handling MORE
  // also, implement an index field on the scores to find by cause writing out the quiz name is big dum
  stroopEasyCap = 0;
  stroopComplexCap = 0;
  stroopInsaneCap = 0;

  testNames = ['Stroop Test - Easy', 'Stroop Test - Complex', 'Stroop Test - Insane'];

  constructor(private leaderboardService: LeaderboardService) {}

  ngOnInit() {
    this.getLeaderboard();
    this.fillBoards();
  }

  ngOnDestroy() {
  }

  getLeaderboard() {
    this.leaderboardService.onFetchLeaderboards()
    .subscribe(responseData => {

      responseData.sort((a, b) => {
        if (a.quizScore > b.quizScore) {
          return -1;
        } else if (a.quizScore < b.quizScore) {
          return 1;
        } else {
          return 0;
        }
      });

      // Reset arrays so dummy dashes are erased
      this.stroopEasyData = [];
      this.stroopComplexData = [];
      this.stroopInsaneData = [];

      responseData.forEach(score => {
        if (score.quiz != null && score.quiz.match('^Stroop Test - Easy$') && this.stroopEasyCap < 10) {
          this.stroopEasyData.push(score);
          this.stroopEasyCap++;
        }

        if (score.quiz != null && score.quiz.match('^Stroop Test - Complex$') && this.stroopComplexCap < 10) {
          this.stroopComplexData.push(score);
          this.stroopComplexCap++;
        }

        if (score.quiz != null && score.quiz.match('^Stroop Test - Insane$') && this.stroopInsaneCap < 10) {
          this.stroopInsaneData.push(score);
          this.stroopInsaneCap++;
        }
      });
      this.dataLoaded = true;
      this.fillBoards();
    }, (error: object) => {
      console.log(error);
    });
  }

  fillBoards() {
    // Create dummy dashed object and fill empty spaces in table
    const dashedData = {
      quiz: '-',
      quizScore: '-',
      user: {
        username: '-'
      }
    };

    if (this.stroopEasyCap < 10) {
      do {
        this.stroopEasyData.push(dashedData);
      } while (this.stroopEasyData.length < 10);
    }

    if (this.stroopComplexCap < 10) {
      do {
        this.stroopComplexData.push(dashedData);
      } while (this.stroopComplexData.length < 10);
    }

    if (this.stroopInsaneCap < 10) {
      do {
        this.stroopInsaneData.push(dashedData);
      } while (this.stroopInsaneData.length < 10);
    }
  }

  scrollTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
