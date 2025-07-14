import { SimplePokemon } from "./simple-pokemon.type";

export interface PaginatedPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SimplePokemon[];
}