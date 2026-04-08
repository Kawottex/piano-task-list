import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TasklistList } from './tasklist-list';

describe('TasklistList', () => {
  let component: TasklistList;
  let fixture: ComponentFixture<TasklistList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasklistList],
    }).compileComponents();

    fixture = TestBed.createComponent(TasklistList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
