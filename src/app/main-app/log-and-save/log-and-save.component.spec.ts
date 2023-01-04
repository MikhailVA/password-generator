import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogAndSaveComponent } from './log-and-save.component';

describe('LogAndSaveComponent', () => {
  let component: LogAndSaveComponent;
  let fixture: ComponentFixture<LogAndSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogAndSaveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogAndSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
