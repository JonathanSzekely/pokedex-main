import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { Pokemon } from 'pokenode-ts';

import { injectTwHostClass } from 'util/inject-tw-host-class.util';

@Component({
    selector: 'app-pokemon-detail-tab',
    imports: [CommonModule],
    template: `
        @switch (activeTab()) {
            @case (0) {
                <div class="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2">
                    <div><strong>Height:</strong></div>
                    <div>{{ pokemon().height / 10 }} m</div>

                    <div><strong>Weight:</strong></div>
                    <div>{{ pokemon().weight / 10 }} kg</div>

                    <div><strong>Experience:</strong></div>
                    <div>{{ pokemon().base_experience }} pts</div>
                </div>
            }

            @case (1) {
                <div class="grid grid-cols-2 gap-2">
                
                </div>
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
        injectTwHostClass(() => 'grow bg-gray-200 p-2 rounded-md');
    }
}
