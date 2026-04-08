import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Task } from '@piano-task-list/shared';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasklist-list',
  imports: [CommonModule],
  templateUrl: './tasklist-list.html',
  styleUrl: './tasklist-list.scss',
})
export class TasklistList implements OnInit {
  tasks: Task[] = [];
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) {}

  trackByTaskId = (_index: number, task: Task) => task.id;

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading = true;
    this.errorMessage = null;

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks ?? [];
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Failed to load tasks. Please try again.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
