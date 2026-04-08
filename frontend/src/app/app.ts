import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TasklistMain } from './components/tasklist-main/tasklist-main';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TasklistMain],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
