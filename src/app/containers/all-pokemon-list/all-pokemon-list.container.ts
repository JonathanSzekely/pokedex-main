import { Component, computed, inject, Signal } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { lastValueFrom } from 'rxjs';
import { PokemonService } from 'services/pokemon.service';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-all-pokemon-list',
    imports: [PokemonListComponent],
    // providers: [PokemonService],
    template: ` 
        <app-pokemon-list [pokemonList]="allPokemon()" />

        <button (click)="loadMore()" [disabled]="nextButtonDisabled()">
            {{ nextButtonText() }}
        </button>
    `,
})
export class AllPokemonListContainer {
    pageLimit: number = 30;
    // allPokemon = signal<SimplePokemon[]>([]);

    pokemonService = inject(PokemonService);

    

    query = injectInfiniteQuery(() => ({
        queryKey: ['pokemon'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 0 }) => {
            return await lastValueFrom(this.pokemonService.getAllPokemon(this.pageLimit, pageParam));
        },
        getNextPageParam: (activePage) => {
            const nextUrl = activePage.next;
            if (!nextUrl) return undefined;
            const offset = new URL(nextUrl).searchParams.get('offset');
            return offset ? +offset / this.pageLimit + 1 : undefined;
        },
    }));

    allPokemon: Signal<SimplePokemon[]> = computed(() =>
        this.query.data()?.pages.flatMap((page) => page.results) ?? []
    );

    // allPokemon: Signal<SimplePokemon[]> = computed(() =>
    //     (this.query.data()?.pages.reduce((acc, page) => acc.concat(page.results), [] as SimplePokemon[])) ?? []
    // );

    nextButtonDisabled = computed(
        () => !this.query.hasNextPage() || this.query.isFetchingNextPage()
    );

    nextButtonText = computed(() =>
        this.query.isFetchingNextPage()
            ? 'Loading more...'
            : this.query.hasNextPage()
                ? 'Load more'
                : 'Nothing more to load'
    );

    loadMore() {
        this.query.fetchNextPage();
    }

    // constructor(private pokemonService: PokemonService) {
    //     pokemonService.getAllPokemon().subscribe(response => {
    //         this.allPokemon = signal<SimplePokemon[]>(response.results);
    //     })
    // }
    
}

// TODO: replace this with a real API call
// TODO: implement "fetch next page" so we can get more than 20 pokemons
const hardcodedResponse = {
    count: 1302,
    next: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    previous: null,
    results: [
        {
            name: 'bulbasaur',
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
            name: 'ivysaur',
            url: 'https://pokeapi.co/api/v2/pokemon/2/',
        },
        {
            name: 'venusaur',
            url: 'https://pokeapi.co/api/v2/pokemon/3/',
        },
        {
            name: 'charmander',
            url: 'https://pokeapi.co/api/v2/pokemon/4/',
        },
        {
            name: 'charmeleon',
            url: 'https://pokeapi.co/api/v2/pokemon/5/',
        },
        {
            name: 'charizard',
            url: 'https://pokeapi.co/api/v2/pokemon/6/',
        },
        {
            name: 'squirtle',
            url: 'https://pokeapi.co/api/v2/pokemon/7/',
        },
        {
            name: 'wartortle',
            url: 'https://pokeapi.co/api/v2/pokemon/8/',
        },
        {
            name: 'blastoise',
            url: 'https://pokeapi.co/api/v2/pokemon/9/',
        },
        {
            name: 'caterpie',
            url: 'https://pokeapi.co/api/v2/pokemon/10/',
        },
        {
            name: 'metapod',
            url: 'https://pokeapi.co/api/v2/pokemon/11/',
        },
        {
            name: 'butterfree',
            url: 'https://pokeapi.co/api/v2/pokemon/12/',
        },
        {
            name: 'weedle',
            url: 'https://pokeapi.co/api/v2/pokemon/13/',
        },
        {
            name: 'kakuna',
            url: 'https://pokeapi.co/api/v2/pokemon/14/',
        },
        {
            name: 'beedrill',
            url: 'https://pokeapi.co/api/v2/pokemon/15/',
        },
        {
            name: 'pidgey',
            url: 'https://pokeapi.co/api/v2/pokemon/16/',
        },
        {
            name: 'pidgeotto',
            url: 'https://pokeapi.co/api/v2/pokemon/17/',
        },
        {
            name: 'pidgeot',
            url: 'https://pokeapi.co/api/v2/pokemon/18/',
        },
        {
            name: 'rattata',
            url: 'https://pokeapi.co/api/v2/pokemon/19/',
        },
        {
            name: 'raticate',
            url: 'https://pokeapi.co/api/v2/pokemon/20/',
        },
    ],
};
