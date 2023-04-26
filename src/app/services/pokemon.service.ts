import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
private baseUrl: string = 'https://pokeapi.co/api/v2';
  private imageUrl: string = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/';

  constructor(private http: HttpClient) {

  }

  public getAll(offset = 0, limit=25) {
    return this.http.get(this.baseUrl+'/pokemon?offset='+offset+'&limit='+limit)
      .pipe(
        map( (result) => {
          
          const indexValue:string = 'results';

          // const card: PokemonCard = result[ indexValue ];
          const pokemonCards: any[] = (result as any)[ indexValue ];

          return pokemonCards;
        }),
        map(pokemonCards => {
          return pokemonCards.map((pokemon: any, index: number) => {
            pokemon.image = this.getImage(offset + index + 1);
            pokemon.pokeIndex = offset + index + 1;
            return pokemon;
          });
        })
      );
  }

  public getImage(index: number) {
    return this.imageUrl+index+'.png';
  }


  public find(search: any) {
    return this.http.get(this.baseUrl+'/pokemon/'+search).pipe(
      map(pokemon => {

        // const pokemonCards: any[] = (result as any)[ indexValue ]; ou
        const id:number = (pokemon as any)[ 'id' ];

        const image:string = this.getImage(id);
          
        return {
          ...pokemon,
             pokeIndex: id,
             image: image
        };

      })
    );
  }



  public getDetails(index: number) {
    return this.http.get(this.baseUrl+'/pokemon/'+index).pipe(
      map(pokemon => {

        const pokemonKeysList:any[] = (pokemon as any)[ 'sprites' ];

        let sprites = Object.keys(pokemonKeysList);

        let imagesList = sprites.map((keyImage)=>{
          // const value = pokemonKeysList[ keyImage ];
          const value = (pokemonKeysList as any)[ keyImage ];

          if (typeof value === 'string')
            return value;
           
          return "";
        }).filter(img => img).reverse();

        return {
          ...pokemon,
          images: imagesList
        };
      })
    );
  }

}
