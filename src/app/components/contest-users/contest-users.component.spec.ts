import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContestUsersComponent } from './contest-users.component';

describe('ContestUsersComponent', () => {
  let component: ContestUsersComponent;
  let fixture: ComponentFixture<ContestUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContestUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
