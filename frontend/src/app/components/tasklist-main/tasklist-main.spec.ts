import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistMain } from './tasklist-main';

describe('TasklistMain', () => {
  let component: TasklistMain;
  let fixture: ComponentFixture<TasklistMain>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasklistMain],
    }).compileComponents();

    fixture = TestBed.createComponent(TasklistMain);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
