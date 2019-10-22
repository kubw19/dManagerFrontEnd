import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContestUsersComponent } from './add-contest-users.component';

describe('AddContestUsersComponent', () => {
  let component: AddContestUsersComponent;
  let fixture: ComponentFixture<AddContestUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContestUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
