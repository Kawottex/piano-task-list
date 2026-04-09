import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Task } from '@piano-task-list/shared';
import { TaskService } from '../../services/task.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-tasklist-list',
  imports: [CommonModule],
  templateUrl: './tasklist-list.html',
  styleUrl: './tasklist-list.scss',
})
export class TasklistList implements OnInit {
  tasks = signal<Task[]>([]);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks.set(tasks ?? []);
        this.isLoading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load tasks. Please try again.');
        this.isLoading.set(false);
      },
    });
  }
}
