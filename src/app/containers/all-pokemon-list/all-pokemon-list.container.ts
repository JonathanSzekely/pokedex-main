import { Component, computed, inject, Signal } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { lastValueFrom } from 'rxjs';
import { PokemonService } from 'services/pokemon.service';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-all-pokemon-list',
    imports: [PokemonListComponent],
    template: ` 
        <app-pokemon-list [pokemonList]="allPokemon()" />

        <button (click)="loadMore()" [disabled]="nextButtonDisabled()">
            {{ nextButtonText() }}
        </button>
    `,
})
export class AllPokemonListContainer {
    pageLimit: number = 30;
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
}
