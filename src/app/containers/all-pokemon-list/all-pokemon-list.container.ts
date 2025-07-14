import { Component, computed, inject, Signal } from '@angular/core';
import { injectInfiniteQuery } from '@tanstack/angular-query-experimental';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { PaginatedPokemonResponse } from 'types/paginated-pokemon-response.type';
import { PokemonListComponent } from '../../components/pokemon-list/pokemon-list.component';

@Component({
    selector: 'app-all-pokemon-list',
    imports: [PokemonListComponent],
    template: ` 
        <app-pokemon-list 
            [pokemonList]="allPokemon()"
            [loadMoreDisabled]="nextButtonDisabled()"
            [loadMoreText]="nextButtonText()"
            (loadMoreClicked)="loadMore()"
            class="relative"
        />        
    `,
})
export class AllPokemonListContainer {
    private readonly http = inject(HttpClient);
    pageLimit: number = 30;

    query = injectInfiniteQuery(() => ({
        queryKey: ['pokemon'],
        initialPageParam: 1,
        queryFn: async ({ pageParam = 0 }) => {
            const offset = pageParam * this.pageLimit;
            return await firstValueFrom(
                this.http.get<PaginatedPokemonResponse>(`/api/v2/pokemon?limit=${this.pageLimit}&offset=${offset}`)
            );
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
