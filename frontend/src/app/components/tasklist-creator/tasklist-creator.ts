import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '@piano-task-list/shared';
import { TaskService } from '../../services/task.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-tasklist-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasklist-creator.html',
  styleUrl: './tasklist-creator.scss',
})
export class TasklistCreator {
  title = '';
  description = '';

  isSubmitting = signal(false);
  errorMessage = signal('');

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  createTask() {
    this.errorMessage.set('');

    const trimmedTitle = this.title.trim();
    const trimmedDescription = this.description.trim();
    if (!trimmedTitle) {
      this.errorMessage.set('Title is required.');
      return;
    }

    this.isSubmitting.set(true);

    const taskToCreate: Task = {
      title: trimmedTitle,
      description: trimmedDescription
    };

    this.taskService.createTask(taskToCreate).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.isSubmitting.set(false);
        this.taskCreated.emit(taskToCreate);
      },
      error: () => {
        this.errorMessage.set('Failed to create task. Please try again.');
        this.isSubmitting.set(false);
      },
    });
  }
}
