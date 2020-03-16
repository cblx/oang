import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatExampleComponent } from './mat-example.component';

describe('MatExampleComponent', () => {
  let component: MatExampleComponent;
  let fixture: ComponentFixture<MatExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
