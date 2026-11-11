import { Component, inject, computed, Signal } from '@angular/core';
import { TypeBadge } from '../type-badge/type-badge';
import { StatBar } from '../stat-bar/stat-bar';
import { Ability } from '../ability/ability';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { CreatureService } from '../../core/services/creature';
import { Creature, PokemonApiResponse, PokemonSpeciesResponse } from '../../core/models/creature.model';
import { TitleCasePipe } from '@angular/common';

export interface CustomResource<T> {
  isLoading: () => boolean;
  error: () => string | null;
  value: () => T | undefined;
}

@Component({
  imports: [TypeBadge, StatBar, Ability, RouterLink, TitleCasePipe],
  selector: 'app-creature-page-component',
  styleUrl: './creature-page-component.scss',
  templateUrl: './creature-page-component.html',
})
export class CreaturePageComponent {
  private route = inject(ActivatedRoute);
  protected creatureService = inject(CreatureService);

  protected readonly id = Number(this.route.snapshot.paramMap.get('id'));

  private readonly pokemonResource = httpResource<PokemonApiResponse>(
    () => this.creatureService.getCreatureUrl(this.id)
  );

  private readonly speciesResource = httpResource<PokemonSpeciesResponse>(
    () => this.creatureService.getSpeciesUrl(this.id)
  );

  // The type is Signal<CustomResource<Creature>>
  protected readonly creatureResource: Signal<CustomResource<Creature>> = computed(() => {
    const pokemon = this.pokemonResource.value();
    const species = this.speciesResource.value();

    if (this.pokemonResource.isLoading() || this.speciesResource.isLoading()) {
      return { 
        isLoading: (): boolean => true, 
        error: (): string | null => null, 
        value: (): Creature | undefined => undefined 
      };
    }

    if (this.pokemonResource.error() || this.speciesResource.error()) {
      return { 
        isLoading: (): boolean => false, 
        error: (): string | null => 'Failed to load', 
        value: (): Creature | undefined => undefined 
      };
    }

    if (pokemon) {
      return {
        isLoading: (): boolean => false,
        error: (): string | null => null,
        value: (): Creature | undefined => this.creatureService.mapResponse(pokemon, species)
      };
    }

    return { 
      isLoading: (): boolean => false, 
      error: (): string | null => null, 
      value: (): Creature | undefined => undefined 
    };
  });
}