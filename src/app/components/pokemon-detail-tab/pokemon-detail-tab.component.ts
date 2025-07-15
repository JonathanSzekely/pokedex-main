import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

import { PokemonAbilitiesComponent } from "components/pokemon-ability/pokemon-ability.component";
import { injectTwHostClass } from 'util/inject-tw-host-class.util';

@Component({
    selector: 'app-pokemon-detail-tab',
    imports: [CommonModule, PokemonAbilitiesComponent],
    template: `
        @switch (activeTab()) {
            @case (0) {
                <div class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
                    <div><strong>Height:</strong>
                        <div>{{ pokemon().height / 10 }} m</div>
                    </div>

                    <div><strong>Weight:</strong>
                        <div>{{ pokemon().weight / 10 }} kg</div>
                    </div>

                    <div><strong>Experience:</strong>
                        <div>{{ pokemon().base_experience }} pts</div>
                    </div>
                </div>
            }

            @case (1) {
                <app-pokemon-abilities [pokemon]="pokemon()"></app-pokemon-abilities>
            }

            @default {
                <p>Other tab</p>
            }
        }
    `,
    styleUrl: './pokemon-detail-tab.component.less'
})
export class PokemonDetailTabComponent {
    readonly pokemon = input.required<Pokemon>();
    readonly activeTab = input.required<number>();
    
    constructor() {
        injectTwHostClass(() => 'grow bg-gray-200 p-2 rounded-md overflow-y-auto max-h-full');
    }
}
