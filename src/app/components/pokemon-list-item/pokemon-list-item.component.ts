import { UpperCasePipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SimplePokemon } from 'types/simple-pokemon.type';

@Component({
    selector: 'app-pokemon-list-item',
    template: `
        <a [routerLink]="['/', { outlets: { detail: [pokemon().name] } }]" (click)="onPokemonClick()">
            {{ index() + 1 }}
            {{ pokemon().name | uppercase }}
        </a>
    `,
    styleUrl: './pokemon-list-item.component.scss',
    imports: [RouterLink, UpperCasePipe],
})
export class PokemonListItemComponent {
    readonly index = input.required<number>();
    readonly pokemon = input.required<SimplePokemon>();

    private clickSound = new Audio('assets/click.mp3');

    onPokemonClick() {
        this.clickSound.currentTime = 0;
        this.clickSound.volume = 0.5;
        this.clickSound.play();
    }
}
