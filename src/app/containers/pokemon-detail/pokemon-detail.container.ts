import { HttpClient } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { Pokemon } from 'pokenode-ts';
import { firstValueFrom } from 'rxjs';

import { PokemonDetailTabComponent } from 'components/pokemon-detail-tab/pokemon-detail-tab.component';
import { injectTwHostClass } from 'util/inject-tw-host-class.util';
import { PokemonInfoComponent } from '../../components/pokemon-info/pokemon-info.component';

@Component({
    selector: 'app-pokemon-detail',
    imports: [PokemonInfoComponent, PokemonDetailTabComponent],
    template: `
        <div class="w-full bg-black text-white h-60 p-2 rounded-md shadow-inner">
            @if (currentPokemonInfo.data(); as pokemonInfo) {
                <app-pokemon-info [pokemonInfo]="pokemonInfo" />
            }
        </div>
        
        @if (currentPokemonInfo.data(); as pokemonInfo) {        
            <div class="flex flex-row *:flex-auto gap-2">
                @for (tab of tabs; let i = $index; track tab) {
                    <button 
                        class="p-2 rounded-md {{i === activeTab() ? 'bg-cyan-200 font-semibold shadow-lg' : 'bg-cyan-300' }}" 
                        (click)="selectTab(i)">
                        {{tab}}
                    </button>
                }
            </div>
            
            
            <app-pokemon-detail-tab
                [pokemon]="pokemonInfo"
                [activeTab]="activeTab()"
            />
        }
    `,
})
export class PokemonDetailContainer {
    private readonly httpClient = inject(HttpClient);
    private readonly route = inject(ActivatedRoute);

    readonly pokemonId = signal<string>('');
    readonly activeTab = signal<number>(0);

    readonly tabs: string[] = ['Stats', 'Abilities', 'Other'];

    readonly currentPokemonInfo = injectQuery(() => ({
        queryKey: ['pokemon', this.pokemonId()],
        queryFn: () =>
            firstValueFrom(
                this.httpClient.get<Pokemon>(`/api/v2/pokemon/${this.pokemonId()}`)
            ),
    }));



    constructor() {
        injectTwHostClass(() => 'flex flex-col gap-4 p-5 pt-20');
        this.route.paramMap.subscribe(paramMap => {
            const id = paramMap.get('pokemonId');
            if (id) this.pokemonId.set(id);
        });
    }

    selectTab = (index: number) => this.activeTab.set(index);
}
