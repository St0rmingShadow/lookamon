import { Component, input } from '@angular/core';
import { TypeBadge } from '../type-badge/type-badge';
import { RouterLink } from '@angular/router';

@Component({
  imports: [TypeBadge, RouterLink],
  selector: 'app-creature-card',
  styleUrl: './creature-card.scss',
  templateUrl: './creature-card.html',
})
export class CreatureCard {
  id = input.required<string>();
  name = input.required<string>();
  types = input.required<string[]>();
  spriteUrl = input.required<string>();
}
