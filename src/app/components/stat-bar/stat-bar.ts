import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  imports: [NgClass],
  selector: 'app-stat-bar',
  styleUrl: './stat-bar.scss',
  templateUrl: './stat-bar.html',
})
export class StatBar {
  stat = input.required<string>();
  label = input.required<string>();
  value = input.required<number>();

  fillClass = computed(() => {
    return `stat__fill--${this.stat().toLowerCase()}`;
  });

  fillPercent = computed(() => {
    return Math.min((this.value() / 150) * 100, 100);
  });
}
