import { Component,  ElementRef,  computed,  effect,  inject,  signal,  viewChild } from '@angular/core';
import { SearchBar } from '../search-bar/search-bar';
import { SearchResultRow } from '../search-result-row/search-result-row';
import { httpResource } from '@angular/common/http';
import { PokemonListResponse } from '../../core/models/creature.model';
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
  protected readonly debouncedQuery = signal('');

  private debounceTimer?: ReturnType<typeof setTimeout>;
  private lastScrolledQuery: string | null = null;

  protected readonly resultsContainer =
    viewChild<ElementRef<HTMLElement>>('resultsContainer');

  constructor() {
    // Debounce the raw query so results only update after the user pauses typing.
    effect(() => {
      const raw = this.query();

      if (raw.trim() === '') {
        this.lastScrolledQuery = null;
      }

      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.debouncedQuery.set(raw), 350);
    });

    // After loading finishes on mobile, scroll the results into view (once per search).
    effect(() => {
      const loading = this.showLoader();
      const results = this.filteredResults();
      const currentQuery = this.debouncedQuery().trim();

      if (loading || results.length === 0) return;
      if (currentQuery === this.lastScrolledQuery) return;
      if (window.innerWidth > 650) return;

      const el = this.resultsContainer()?.nativeElement;
      if (!el) return;

      this.lastScrolledQuery = currentQuery;
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
    });
  }

  protected onSearch(value: string) {
    this.query.set(value);
  }

  protected onSortChange(value: string) {
    this.sortOption.set(value);
  }

  protected readonly allPokemonResource = httpResource<PokemonListResponse>(
    () => 'https://pokeapi.co/api/v2/pokemon?limit=1000',
  );

  protected readonly showLoader = computed(() => {
    const listLoading = this.allPokemonResource.isLoading();
    const debouncing = this.query() !== this.debouncedQuery();
    return listLoading || (debouncing && this.query().trim().length > 0);
  });

  protected readonly filteredResults = computed(() => {
    const list = this.allPokemonResource.value()?.results || [];
    const searchTerm = this.debouncedQuery().toLocaleLowerCase().trim();

    if (!searchTerm) return [];

    let results = list.filter(
      (p) =>
        p.name.includes(searchTerm) || this.getIdFromUrl(p.url).includes(searchTerm),
    );

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