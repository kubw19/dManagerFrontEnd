import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule } from '@angular/forms';//ngModel
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ContestsComponent } from './components/contests/contests.component';
import { ContestComponent } from './components/contest/contest.component';
import { StadiumsComponent } from './components/menu/stadiums/stadiums.component';
import { AddContestComponent } from './components/contests/add/add-contest/add-contest.component';
import { AddBoxComponent } from './components/common/add-box/add-box.component';
import { ReactiveFormsModule } from "@angular/forms";
import { PhasesComponent } from './components/phases/phases.component';
import { AddPhaseComponent } from './components/phases/add-phase/add-phase.component';
import { GroupsComponent } from './components/groups/groups.component';
import { AddGroupComponent } from './components/groups/add-group/add-group.component';
import { GroupMatchesComponent } from './components/group-matches/group-matches.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    ContestsComponent,
    ContestComponent,
    StadiumsComponent,
    AddContestComponent,
    AddBoxComponent,
    PhasesComponent,
    AddPhaseComponent,
    GroupsComponent,
    AddGroupComponent,
    GroupMatchesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
