import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SimplePokemon } from 'types/simple-pokemon.type';

export interface PaginatedPokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SimplePokemon[];
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  apiSrc = 'https://pokeapi.co/api/v2/';

  constructor(private http: HttpClient) { }

  getAllPokemon(limit = 20, page?: number): Observable<PaginatedPokemonResponse> {
    return this.http.get<PaginatedPokemonResponse>(
      `${this.apiSrc}pokemon/?${page ? 'offset=' + (page - 1) * limit : '' }&limit=${limit}`
    );
  }
}
