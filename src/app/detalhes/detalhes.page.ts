import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetalhesPage implements OnInit {

  public pokemon: any;

  constructor(private pokemonService: PokemonService,
    private rotaAtiva: ActivatedRoute) { }

  ngOnInit() {
    const index = Number(this.rotaAtiva.snapshot.paramMap.get('id'));
    this.pokemonService.getDetails(index).subscribe((details)=>{
      this.pokemon = details;
    })
  }

}
