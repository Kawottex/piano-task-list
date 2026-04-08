import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistCreator } from './tasklist-creator';

describe('TasklistCreator', () => {
  let component: TasklistCreator;
  let fixture: ComponentFixture<TasklistCreator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasklistCreator],
    }).compileComponents();

    fixture = TestBed.createComponent(TasklistCreator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
