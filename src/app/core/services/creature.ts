import { Injectable } from '@angular/core';
import { Creature, PokemonApiResponse, PokemonSpeciesResponse } from '../models/creature.model';

@Injectable({ providedIn: 'root' })
export class CreatureService {
  getCreatureUrl(id: number): string {
    return `https://pokeapi.co/api/v2/pokemon/${id}`;
  }

  getSpeciesUrl(id: number): string {
    return `https://pokeapi.co/api/v2/pokemon-species/${id}`;
  }

  getAbilityUrl(name: string): string {
    return `https://pokeapi.co/api/v2/ability/${name}`;
  }

  getHabitatImageUrl(habitat: string): string {
    const habitatImages: Record<string, string> = {
      'forest': 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&h=300&fit=crop',
      'mountain': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop',
      'water': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=300&fit=crop',
      'cave': 'https://images.unsplash.com/photo-1625312239623-7405a1d20761?w=600&h=300&fit=crop',
      'grassland': 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=300&fit=crop',
      'rough-terrain': 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&h=300&fit=crop',
      'sea': 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=600&h=300&fit=crop',
    };
    return habitatImages[habitat] || habitatImages['forest'];
  }

  mapResponse(raw: PokemonApiResponse, species?: PokemonSpeciesResponse): Creature {
    // Extract English description, replace newlines with spaces
    const flavorText = species?.flavor_text_entries.find(e => e.language.name === 'en')?.flavor_text.replace(/[\n\f]/g, ' ') || '';
    
    // Extract English genus (category)
    const category = species?.genera.find(g => g.language.name === 'en')?.genus || '';

    return {
      id: raw.id,
      name: raw.name,
      types: raw.types.map((t) => t.type.name),
      spriteUrl: raw.sprites.other['official-artwork'].front_default ?? '',
      height: raw.height,
      weight: raw.weight,
      stats: raw.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
      abilities: raw.abilities.map((a) => ({ name: a.ability.name, description: '' })),
      
      // Add the new fields
      category: category,
      description: flavorText,
      habitat: species?.habitat?.name || 'Unknown',
    };
  }

  getFeaturedIds(): number[] {
    return [
      1, 4, 7, 25, 39, 52, 54, 94, 104, 133, 143, 147, 149, 150, 151, 152, 155, 158, 172, 175,
    ];
  }
}
