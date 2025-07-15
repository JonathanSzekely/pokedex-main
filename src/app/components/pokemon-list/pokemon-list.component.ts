import { Component, EventEmitter, Output, input } from '@angular/core';
import { SimplePokemon } from 'types/simple-pokemon.type';

import { PokemonListItemComponent } from '../pokemon-list-item/pokemon-list-item.component';

@Component({
    selector: 'app-pokemon-list',
    template: `
        <header>
            <nav>
                <button class="big-button blue"></button>
            </nav>
            <div class="nav-shadow"></div>

            <div class="top-bar">
                <button class="small-button red"></button>
                <button class="small-button yellow"></button>
                <button class="small-button green"></button>
            </div>
        </header>

        <div class="section-wrapper">
            <section>
                @for (pokemon of pokemonList(); let index = $index; track pokemon.name) {
                    <app-pokemon-list-item [index]="$index" [pokemon]="pokemon" />
                }
            </section>
        </div>

        <footer class="absolute bottom-0 left-0 right-0 p-4 flex justify-center">
            <button
                class="font-medium p-2 w-48 rounded-md {{ loadMoreDisabled() ? 'bg-cyan-100 text-gray-600 font-normal' : 'bg-cyan-300 ' }}"
                (click)="loadMoreClicked.emit()"
                [disabled]="loadMoreDisabled()"
            >
                {{ loadMoreText() }}
            </button>
        </footer>
    `,
    styleUrl: './pokemon-list.component.scss',
    imports: [PokemonListItemComponent],
})
export class PokemonListComponent {
    readonly pokemonList = input<SimplePokemon[]>([]);

    readonly loadMoreDisabled = input<boolean>(false);
    readonly loadMoreText = input<string>('Load more');

    @Output() loadMoreClicked = new EventEmitter<void>();
}
