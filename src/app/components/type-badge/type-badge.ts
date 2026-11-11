import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';

@Component({
  imports: [NgClass],
  selector: 'app-type-badge',
  styleUrl: './type-badge.scss',
  templateUrl: './type-badge.html',
})
export class TypeBadge {
  type = input.required<string>();

  typeClass = computed(() => {
    return `badge--${this.type().toLowerCase()}`;
  });
}
