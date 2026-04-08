import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '@piano-task-list/shared';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist-creator',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasklist-creator.html',
  styleUrl: './tasklist-creator.scss',
})
export class TasklistCreator {
  title = '';
  description = '';

  isSubmitting = false;
  errorMessage: string | null = null;

  @Output() taskCreated = new EventEmitter<Task>();

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  createTask() {
    this.errorMessage = null;

    const trimmedTitle = this.title.trim();
    const trimmedDescription = this.description.trim();
    if (!trimmedTitle) {
      this.errorMessage = 'Title is required.';
      return;
    }

    this.isSubmitting = true;

    const taskToCreate: Task = {
      id: '',
      title: trimmedTitle,
      description: trimmedDescription,
      completed: false,
    };

    this.taskService.createTask(taskToCreate).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.isSubmitting = false;
        this.cdr.detectChanges();
        this.taskCreated.emit(taskToCreate);
      },
      error: () => {
        this.errorMessage = 'Failed to create task. Please try again.';
        this.isSubmitting = false;
        this.cdr.detectChanges();
      },
    });
  }
}
