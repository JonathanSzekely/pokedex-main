import { Component, OnChanges, input } from '@angular/core';

@Component({
    selector: 'app-typewriter',
    template: `
        @if (typeWriterText) {
            <h2 class="text-4xl capitalize px-4 py-6">{{ typeWriterText }}</h2>
        }
    `,
    styleUrl: './typewriter.component.scss',
})
export class TypewriterComponent implements OnChanges {
    readonly text = input<string>(undefined);

    typeWriterText = '';

    ngOnChanges(): void {
        this.typeWriterText = '';

        Promise.resolve().then(() => (this.typeWriterText = this.text()));
    }
}
