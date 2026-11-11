import { Component, signal } from '@angular/core';
import { AppLayoutComponent } from './components/app-layout-component/app-layout-component';

@Component({
  imports: [AppLayoutComponent],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Lookamon');
}
