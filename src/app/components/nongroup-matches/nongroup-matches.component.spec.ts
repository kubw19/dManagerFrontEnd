import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NongroupMatchesComponent } from './nongroup-matches.component';

describe('NongroupMatchesComponent', () => {
  let component: NongroupMatchesComponent;
  let fixture: ComponentFixture<NongroupMatchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NongroupMatchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NongroupMatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
