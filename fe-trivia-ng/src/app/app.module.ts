import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './main/start/start.component';
import { StroopEasyComponent } from './main/quizzes/stroop-easy/stroop-easy.component';
import { LeaderboardsComponent } from './main/leaderboards/leaderboards.component';
import { FeedbackFormComponent } from './main/feedback/feedback-form/feedback-form.component';
import { PatchNotesComponent } from './main/feedback/patch-notes/patch-notes.component';
import { PageNotFoundComponent } from './main/errors/page-not-found/page-not-found.component';
import { StroopMediumComponent } from './main/quizzes/stroop-medium/stroop-medium.component';
import { StroopHardComponent } from './main/quizzes/stroop-hard/stroop-hard.component';
import { LoginComponent } from './main/auth/login/login.component';
import { SignupComponent } from './main/auth/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomizerComponent } from './main/quizzes/randomizer/randomizer.component';
import { SudokuComponent } from './main/quizzes/sudoku/sudoku.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    StroopEasyComponent,
    LeaderboardsComponent,
    FeedbackFormComponent,
    PatchNotesComponent,
    PageNotFoundComponent,
    StroopMediumComponent,
    StroopHardComponent,
    LoginComponent,
    SignupComponent,
    RandomizerComponent,
    SudokuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
