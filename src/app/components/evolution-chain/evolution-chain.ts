import { Component, computed, input } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { EvolutionChainResponse, ChainLink } from '../../core/models/creature.model';

@Component({
  selector: 'app-evolution-chain',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './evolution-chain.html',
  styleUrl: './evolution-chain.scss',
})
export class EvolutionChain {
  // Accept the URL from the parent Creature Page
  url = input.required<string>();

  // Fetch the tree data
  protected readonly evolutionResource = httpResource<EvolutionChainResponse>(
    () => this.url()
  );

  // Flatten the tree into an array of stages
  protected readonly stages = computed(() => {
    const data = this.evolutionResource.value();
    if (!data) return [];

    const result: Array<Array<{ name: string; id: number }>> = [];

    // Recursive function to walk down the tree
    const traverse = (node: ChainLink, level: number) => {
      if (!result[level]) result[level] = [];
      
      const id = this.getIdFromUrl(node.species.url);
      result[level].push({ name: node.species.name, id });

      // If this Pokémon evolves into others, go down the next level
      for (const child of node.evolves_to) {
        traverse(child, level + 1);
      }
    };

    traverse(data.chain, 0);
    return result;
  });

  private getIdFromUrl(url: string): number {
    const parts = url.split('/');
    return Number(parts[parts.length - 2]);
  }
}