import { Component, inject } from '@angular/core';
import { CreatureCard } from '../creature-card/creature-card';
import { CreatureService } from '../../core/services/creature';
import { httpResource } from '@angular/common/http';
import { Creature, PokemonApiResponse } from '../../core/models/creature.model';
import { TitleCasePipe } from '@angular/common';

@Component({
  imports: [CreatureCard, TitleCasePipe],
  selector: 'app-explore-page-component',
  styleUrl: './explore-page-component.scss',
  templateUrl: './explore-page-component.html',
})
export class ExplorePageComponent {
  private creatureService = inject(CreatureService);

  protected readonly ids = this.creatureService.getFeaturedIds();

  protected readonly creatureResources = this.ids.map((id) =>
    httpResource<Creature>(() => this.creatureService.getCreatureUrl(id), {
      parse: (raw) => this.creatureService.mapResponse(raw as PokemonApiResponse),
    }),
  );
}
