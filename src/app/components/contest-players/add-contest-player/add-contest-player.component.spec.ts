import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddContestPlayerComponent } from './add-contest-player.component';

describe('AddContestPlayerComponent', () => {
  let component: AddContestPlayerComponent;
  let fixture: ComponentFixture<AddContestPlayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddContestPlayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddContestPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
