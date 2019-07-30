import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ContestComponent } from './components/contest/contest.component'
import { ContestsComponent } from './components/contests/contests.component'
import { StadiumsComponent } from './components/menu/stadiums/stadiums.component'

const routes: Routes = [
  {
    path: '', 
    redirectTo: '/dashboard/contests',
    pathMatch: 'full'
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
