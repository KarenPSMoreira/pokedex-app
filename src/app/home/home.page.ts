import { Component, OnInit, ViewChild  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { IonInfiniteScroll } from '@ionic/angular';

import { PokemonService } from 'src/app/services/pokemon.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule]
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;

  private offset:number = 0;
  public pokemon:any[] = [];

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.load();
  }

  public load(loadMore = false, event?: any) {
    if (loadMore) {
      this.offset += 25;
    }

    this.pokemonService.getAll(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];

      console.log(this.pokemon);

      if (event) {
        event.taget.complete();
      }

      // Optional
      if (this.offset === 125) {
        this.infinite.disabled = true;
      }
    });
  }

  public onSearchChange(e: any) {
    let value = e.detail.value;

    console.log(value);

    if (value === '') {
      this.offset = 0;
      this.load();
      return;
    }

    this.pokemonService.find(value).subscribe({
      next: (res) => { this.pokemon = [res] },
      error: (err) => { this.pokemon = [] }
    }); 
 }

}
