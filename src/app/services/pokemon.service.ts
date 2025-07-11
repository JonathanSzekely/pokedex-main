import { HttpClient, HttpParams } from '@angular/common/http';
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
    let params = new HttpParams().set('limit', limit.toString());
    if (page) {
      const offset = (page - 1) * limit;
      params = params.set('offset', offset.toString());
    }

    return this.http.get<PaginatedPokemonResponse>(`${this.apiSrc}pokemon/`, { params });
  }
}
