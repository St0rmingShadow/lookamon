import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

bootstrapApplication(App, appConfig)
  .catch((err) => console.error(err));

// Suppress unactionable View Transition errors when the browser tab loses focus
window.addEventListener('unhandledrejection', (event) => {
  if (
    event.reason?.message?.includes('Transition was aborted because of invalid state') ||
    event.reason?.message?.includes('Document hidden')
  ) {
    event.preventDefault(); // Stop the error from appearing in the console
  }
});