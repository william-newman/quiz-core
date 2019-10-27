import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
import { AuthGuardService } from './main/services/auth-guard.service';
import { RandomizerComponent } from './main/quizzes/randomizer/randomizer.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'quizzes' },
  {
    path: 'quizzes',
    component: StartComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'randomizer',
    component: RandomizerComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'stroop-easy',
    component: StroopEasyComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'stroop-medium',
    component: StroopMediumComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'stroop-hard',
    component: StroopHardComponent,
    canActivate: [AuthGuardService]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'leaderboards', component: LeaderboardsComponent },
  { path: 'feedback', component: FeedbackFormComponent },
  { path: 'patch_notes', component: PatchNotesComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
