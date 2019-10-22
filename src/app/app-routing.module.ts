import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ContestComponent } from './components/contest/contest.component'
import { ContestsComponent } from './components/contests/contests.component'
import { StadiumsComponent } from './components/menu/stadiums/stadiums.component'
import { MatchesComponent } from './components/matches/matches.component';
import { MatchComponent } from './components/match/match.component';
import {PasswordRecoveryComponent} from './components/password-recovery/password-recovery.component'

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/dashboard/contests',
    pathMatch: 'full'
  },
  {
    path: 'recoverPassword/:hash', component: PasswordRecoveryComponent

  },
  {
    path: 'dashboard',
    component: MainComponent, children: [
      {
        path: 'contests', component: ContestsComponent
      },
      {
        path: 'stadiums', component: StadiumsComponent
      }
    ]
  },
  {
    path: 'contest/:id', component: ContestComponent
  },
  {
    path: 'group/:id', component: MatchesComponent
  },
  {
    path: 'match/:id', component: MatchComponent, pathMatch: "full",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
