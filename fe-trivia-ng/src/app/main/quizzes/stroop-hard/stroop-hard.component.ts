import { Component, OnInit, HostListener } from '@angular/core';
import { LeaderboardService } from '../../services/leaderboard.service';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import appConstants from '../../services/appConstants';

@Component({
  selector: 'app-stroop-hard',
  templateUrl: './stroop-hard.component.html',
  styleUrls: ['./stroop-hard.component.css']
})
export class StroopHardComponent implements OnInit {
  // Word booleans
  vermillion = false;
  lime = false;
  turquoise = false;
  amber = false;
  violet = false;
  sandstone = false;
  flamingo = false;
  indigo = false;

  // Color booleans
  vermillionClass = false;
  limeClass = false;
  turquoiseClass = false;
  amberClass = false;
  violetClass = false;
  sandstoneClass = false;
  flamingoClass = false;
  indigoClass = false;

  // Quiz logic
  answerFeedback: string;
  numOfCorrectAnswers = 0;
  numOfIncorrectAnswers = 0;
  testActive = false;
  testTimer: number;
  totalTime = 60;
  testResults = false;
  resultScreenMessage: string;
  errorMessage: any;
  currentWord: string;
  maxIncorrect = 5;

  // Font booleans
  font0 = false;
  font1 = false;
  font2 = false;
  font3 = false;
  font4 = false;
  font5 = false;
  font6 = false;
  font7 = false;

  constructor(
    private leaderboardService: LeaderboardService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {}

  goBack() {
    this.router.navigateByUrl('/');
  }

  randomizer(totalNum: number): number {
    return Math.floor(Math.random() * totalNum);
  }

  randomPick() {
    const pick = this.randomizer(8);
    const classPick = this.randomizer(8);
    const fontPick = this.randomizer(8);
    this.setAllFalse();
    this.randomColor(classPick);
    this.randomFont(fontPick);
    switch (pick) {
      case 0:
        this.vermillion = true;
        this.currentWord = appConstants.VERMILLION;
        break;
      case 1:
        this.lime = true;
        this.currentWord = appConstants.LIME;
        break;
      case 2:
        this.turquoise = true;
        this.currentWord = appConstants.TURQUOISE;
        break;
      case 3:
        this.amber = true;
        this.currentWord = appConstants.AMBER;
        break;
      case 4:
        this.violet = true;
        this.currentWord = appConstants.VIOLET;
        break;
      case 5:
        this.sandstone = true;
        this.currentWord = appConstants.SANDSTONE;
        break;
      case 6:
        this.flamingo = true;
        this.currentWord = appConstants.FLAMINGO;
        break;
      case 7:
        this.indigo = true;
        this.currentWord = appConstants.INDIGO;
        break;
      default:
        break;
    }
  }

  randomColor(color: number) {
    switch (color) {
      case 0:
        this.vermillionClass = true;
        break;
      case 1:
        this.limeClass = true;
        break;
      case 2:
        this.turquoiseClass = true;
        break;
      case 3:
        this.amberClass = true;
        break;
      case 4:
        this.violetClass = true;
        break;
      case 5:
        this.sandstoneClass = true;
        break;
      case 6:
        this.flamingoClass = true;
        break;
      case 7:
        this.indigoClass = true;
        break;
      default:
        break;
    }
  }

  randomFont(fontPick: number) {
    switch (fontPick) {
      case 0:
        this.font0 = true;
        break;
      case 1:
        this.font1 = true;
        break;
      case 2:
        this.font2 = true;
        break;
      case 3:
        this.font3 = true;
        break;
      case 4:
        this.font4 = true;
        break;
      case 5:
        this.font5 = true;
        break;
      case 6:
        this.font6 = true;
        break;
      case 7:
        this.font7 = true;
        break;
      default:
        break;
    }
  }

  setAllFalse() {
    this.vermillion = false;
    this.turquoise = false;
    this.lime = false;
    this.amber = false;
    this.violet = false;
    this.sandstone = false;
    this.flamingo = false;
    this.indigo = false;
    this.vermillionClass = false;
    this.turquoiseClass = false;
    this.limeClass = false;
    this.amberClass = false;
    this.violetClass = false;
    this.sandstoneClass = false;
    this.flamingoClass = false;
    this.indigoClass = false;
    this.font0 = false;
    this.font1 = false;
    this.font2 = false;
    this.font3 = false;
    this.font4 = false;
    this.font5 = false;
    this.font6 = false;
    this.font7 = false;
  }

  beginTest() {
    if (!this.testActive) {
      this.beginTimer(this.totalTime);
      this.randomPick();
    }
    this.testActive = true;
  }

  beginTimer(time: number) {
    this.testTimer = time;
    const newClock = setInterval(() => this.timerTick(newClock), 1000);
  }

  timerTick(newClock: any) {
    if (this.testTimer > 0) {
      this.testTimer--;
    } else {
      this.testComplete(newClock);
    }
  }

  @HostListener('document: keypress', ['$event'])
  handleAnswer(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.beginTest();
    }
    const buttons = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];

    if (this.testActive) {
      if (this.numOfIncorrectAnswers >= this.maxIncorrect) {
        this.testTimer = 0;
      } else {
        switch (event.key) {
          case buttons[0]:
            if (this.vermillion) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[1]:
            if (this.lime) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[2]:
            if (this.turquoise) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[3]:
            if (this.amber) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[4]:
            if (this.violet) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[5]:
            if (this.sandstone) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[6]:
            if (this.flamingo) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          case buttons[7]:
            if (this.indigo) {
              this.correctAnswerChosen();
            } else {
              this.incorrectAnswerChosen();
            }
            this.randomPick();
            break;
          default:
            // nothing
            break;
        }
      }
    }
  }

  correctAnswerChosen() {
    this.answerFeedback = 'Correct!';
    this.numOfCorrectAnswers++;
  }

  incorrectAnswerChosen() {
    this.answerFeedback = 'Miss';
    this.numOfIncorrectAnswers++;
  }

  testComplete(newClock: any) {
    clearInterval(newClock);
    this.testActive = false;
    this.testResults = true;
    const correct = this.numOfCorrectAnswers;
    if (correct >= 0 && correct < 10) {
      this.resultScreenMessage = 'Good try!';
    } else if (correct >= 10 && correct < 20) {
      this.resultScreenMessage = 'Not bad!';
    } else if (correct >= 20 && correct < 30) {
      this.resultScreenMessage = 'Mad decent!';
    } else if (correct >= 30 && correct < 40) {
      this.resultScreenMessage = 'Great job!!';
    } else if (correct >= 40 && correct < 50) {
      this.resultScreenMessage = '♪ Most excellent ♪';
    } else if (correct >= 50 && correct < 60) {
      this.resultScreenMessage = 'Wicked!'; // easter eggs start here
    } else if (correct >= 60 && correct < 66) {
      this.resultScreenMessage = 'Blazing fast!';
    } else if (correct === 66) {
      this.resultScreenMessage = 'Hail satin!';
    } else {
      this.resultScreenMessage = 'Amazing!!';
    }

    const userId = this.userService.getUserId();

    if (userId != null) {
      const scoreObject = {
        quizScore: correct,
        user: {
          id: userId
        },
        quiz: 'Stroop Test - Insane'
      };
      this.leaderboardService.onCreateEntry(scoreObject).subscribe();
    } else {
      this.router.navigateByUrl('/login');
      alert('You are not logged in!');
    }
  }

  tryAgain() {
    this.testResults = false;
    this.answerFeedback = '';
    this.numOfCorrectAnswers = 0;
    this.numOfIncorrectAnswers = 0;
  }
}
