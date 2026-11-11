import { Component, input, inject, computed } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { CreatureService } from '../../core/services/creature';
import { AbilityApiResponse } from '../../core/models/creature.model';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  imports: [TitleCasePipe, NgClass],
  selector: 'app-ability',
  styleUrl: './ability.scss',
  templateUrl: './ability.html',
})
export class Ability {
  private creatureService = inject(CreatureService);
  
  name = input.required<string>();

  // The ability component fetches its own description!
  protected readonly abilityResource = httpResource<AbilityApiResponse>(
    () => this.creatureService.getAbilityUrl(this.name().toLowerCase())
  );

  // We extract the English short effect
  protected readonly description = () => {
    const data = this.abilityResource.value();
    if (!data) return 'Loading description...';
    
    const entry = data.effect_entries.find((e: any) => e.language.name === 'en');
    return entry ? entry.short_effect : 'No description available.';
  };

  protected readonly typeColor = computed(() => {
    const abilityName = this.name().toLowerCase();
    
    // A simple map of common abilities to their "types"
    const abilityTypeMap: Record<string, string> = {
      'blaze': 'fire',
      'torrent': 'water',
      'overgrow': 'grass',
      'swarm': 'bug',
      'static': 'electric',
      'lightning-rod': 'electric',
      'solar-power': 'fire', 
      'leaf-guard': 'grass',
      'poison-point': 'poison',
      'swift-swim': 'water',
      'sand-veil': 'ground',
      'flash-fire': 'fire',
      'intimidate': 'normal',
      'levitate': 'flying',
      'thick-fat': 'normal',
      'sheer-force': 'fighting',
      'rivalry': 'normal'
    };

    return abilityTypeMap[abilityName] || 'normal'; // Default to normal (gray) if not found
  });
}