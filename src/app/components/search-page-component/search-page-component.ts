import { Component, computed, inject, signal } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { SearchResultRow } from '../search-result-row/search-result-row';
import { httpResource } from '@angular/common/http';
import {
  Creature,
  PokemonApiResponse,
  PokemonListResponse,
} from '../../core/models/creature.model';
import { CreatureService } from '../../core/services/creature';

@Component({
  imports: [SearchBar, SearchResultRow],
  selector: 'app-search-page-component',
  styleUrl: './search-page-component.scss',
  templateUrl: './search-page-component.html',
})
export class SearchPageComponent {
  protected readonly sortOption = signal('id-asc');
  private creatureService = inject(CreatureService);
  protected readonly query = signal('');

  protected onSearch(value: string) {
    this.query.set(value);
  }

  protected onSortChange(value: string) {
    this.sortOption.set(value);
  }

  protected readonly allPokemonResource = httpResource<PokemonListResponse>(
    () => 'https://pokeapi.co/api/v2/pokemon?limit=1000',
  );

  protected readonly filteredResults = computed(() => {
    const list = this.allPokemonResource.value()?.results || [];
    const searchTerm = this.query().toLocaleLowerCase().trim();

    if (!searchTerm) return [];

    // 4. Filter first
    let results = list.filter((p) => 
      p.name.includes(searchTerm) || 
      this.getIdFromUrl(p.url).includes(searchTerm)
    );

    // 5. Then sort based on the signal
    const sort = this.sortOption();

    if (sort === 'id-asc') {
      results = results.sort(
        (a, b) => Number(this.getIdFromUrl(a.url)) - Number(this.getIdFromUrl(b.url)),
      );
    } else if (sort === 'id-desc') {
      results = results.sort(
        (a, b) => Number(this.getIdFromUrl(b.url)) - Number(this.getIdFromUrl(a.url)),
      );
    } else if (sort === 'name-asc') {
      results = results.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'name-desc') {
      results = results.sort((a, b) => b.name.localeCompare(a.name));
    }

    return results.slice(0, 10);
  });

  protected getIdFromUrl(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 2];
  }
}
