import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAbilityComponent } from './pokemon-ability.component';

describe('PokemonAbilityComponent', () => {
  let component: PokemonAbilityComponent;
  let fixture: ComponentFixture<PokemonAbilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonAbilityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
