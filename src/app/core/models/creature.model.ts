export interface CreatureStat {
  name: string;
  value: number;
}

export interface CreatureAbility {
  name: string;
  description: string;
}

export interface Creature {
  id: number;
  name: string;
  types: string[];
  spriteUrl: string;
  height: number;
  weight: number;
  stats: CreatureStat[];
  abilities: CreatureAbility[];
  category: string;
  description: string;
  habitat: string;
}

export interface PokemonApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    slot: number;
    type: { name: string; url: string };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string; url: string };
  }[];
  abilities: {
    ability: { name: string; url: string };
    is_hidden: boolean;
    slot: number;
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string | null;
      };
    };
  };
}

export interface PokemonListResponse {
  count: number;
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonSpeciesResponse {
  genera: {
    genus: string;
    language: { name: string };
  }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
  }[];
  habitat: {
    name: string;
  } | null;
}

export interface AbilityApiResponse {
  name: string;
  effect_entries: {
    effect: string;
    short_effect: string;
    language: { name: string };
  }[];
}