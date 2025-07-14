import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonDetailTabComponent } from './pokemon-detail-tab.component';

describe('PokemonDetailTabComponent', () => {
  let component: PokemonDetailTabComponent;
  let fixture: ComponentFixture<PokemonDetailTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonDetailTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonDetailTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
