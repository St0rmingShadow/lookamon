import { Component, ElementRef, inject, viewChild } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

import { Header } from '../header/header';
import { Footer } from '../footer/footer';
import { BottomNav } from '../bottom-nav/bottom-nav';

@Component({
  selector: 'app-layout-component',
  imports: [Header, Footer, BottomNav, RouterOutlet],
  styleUrl: './app-layout-component.scss',
  templateUrl: './app-layout-component.html',
})
export class AppLayoutComponent {
  private router = inject(Router);

  private readonly mainContent =
    viewChild<ElementRef<HTMLElement>>('mainContent');

  private readonly isFirstNavigation = { value: true };

  constructor() {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(() => {
        // Don't steal focus on the very first page load — the browser
        // already placed it correctly (address bar → page body).
        if (this.isFirstNavigation.value) {
          this.isFirstNavigation.value = false;
          return;
        }

        const el = this.mainContent()?.nativeElement;
        if (!el) return;

        el.focus({ preventScroll: true });
        window.scrollTo({ top: 0, behavior: 'auto' });
      });
  }
}