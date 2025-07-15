import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { Pokemon, PokemonClient } from 'pokenode-ts';

@Component({
    selector: 'app-pokemon-abilities',
    standalone: true,
    imports: [CommonModule],
    template: `
        <div *ngIf="loading(); else loaded" class="flex justify-center items-center h-full">
            <p class="text-2xl text-gray-600">Loading abilities...</p>
        </div>

        <ng-template #loaded>
            <div class="flex flex-col gap-4">
                <div *ngFor="let ability of abilities()">
                    <h3 class="font-bold capitalize text-lg">{{ ability.name }}</h3>
                    <p class="text-sm text-gray-700">{{ ability.effect }}</p>
                </div>
            </div>
        </ng-template>
    `,
})
export class PokemonAbilitiesComponent implements OnInit {
    @Input({ required: true }) pokemon!: Pokemon;

    private readonly pokeClient = new PokemonClient();
    readonly abilities = signal<{ name: string; effect: string }[]>([]);
    readonly loading = signal(true);

    constructor() { }

    async ngOnInit() {
        const results: { name: string; effect: string }[] = [];

        for (const ability of this.pokemon.abilities) {
            try {
                const abilityData = await this.pokeClient.getAbilityByName(ability.ability.name);
                const effect =
                    abilityData.effect_entries.find(e => e.language.name === 'en')?.effect ?? '';
                results.push({ name: abilityData.name, effect });
            } catch (error) {
                console.error(`Failed to load ability ${ability.ability.name}`, error);
            }
        }

        this.abilities.set(results);
        this.loading.set(false);
    }
}