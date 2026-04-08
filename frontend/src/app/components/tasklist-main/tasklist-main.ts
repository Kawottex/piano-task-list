import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TasklistCreator } from '../tasklist-creator/tasklist-creator';
import { TasklistList } from '../tasklist-list/tasklist-list';
import { Task } from '@piano-task-list/shared';

@Component({
  selector: 'app-tasklist-main',
  imports: [CommonModule, TasklistCreator, TasklistList],
  templateUrl: './tasklist-main.html',
  styleUrl: './tasklist-main.scss',
})
export class TasklistMain {
  @ViewChild(TasklistList) taskList!: TasklistList;

  onTaskCreated(task: Task) {
    this.taskList.loadTasks();
  }
}
