import { Component, input, inject } from '@angular/core';
import { TypeBadge } from '../type-badge/type-badge';
import { RouterLink } from '@angular/router';
import { CreatureService } from '../../core/services/creature';
import { httpResource } from '@angular/common/http';
import { Creature, PokemonApiResponse } from '../../core/models/creature.model';
import { TitleCasePipe, DecimalPipe } from '@angular/common';

@Component({
  imports: [TypeBadge, RouterLink, TitleCasePipe, DecimalPipe],
  selector: 'app-search-result-row',
  styleUrl: './search-result-row.scss',
  templateUrl: './search-result-row.html',
})
export class SearchResultRow {
  private creatureService = inject(CreatureService);

  // We only need the numeric ID from the parent now
  id = input.required<string>();

  // The row fetches its own data!
  protected readonly creatureResource = httpResource<Creature>(
    () => this.creatureService.getCreatureUrl(Number(this.id())),
    { parse: (raw) => this.creatureService.mapResponse(raw as PokemonApiResponse) }
  );
}