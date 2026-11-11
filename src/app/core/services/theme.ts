import { effect, Injectable, signal } from '@angular/core';

@Injectable({ providedIn : 'root' })
export class ThemeService {
    // 1. Create a signal initialized from localStorage (or default to false)
    isDarkMode = signal<boolean>(localStorage.getItem('theme') === 'dark');

    constructor() {
        effect(() =>{
            // 2. Use an 'effect' to automatically update the DOM and localStorage
            // whenever the signal changes.
            const isDark = this.isDarkMode();

            // Update the <html> tag
            if (isDark) {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark')
            } else {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // 3. A method to toggle the state
    toggleTheme() {
        this.isDarkMode.update(dark => !dark);
    }
}
