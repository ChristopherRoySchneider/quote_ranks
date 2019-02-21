import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient) {
    // this.getCakes();
    // this.getCakeById();
    // this.getPokemonById();
    // this.getPokemonByAbility();
  }
  getCakes() {
    // our http response is an Observable, store it in a variable
    return this._http.get('/cakes');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our cakes!', data));
  }
  getCakeById(id = '5c69e4472cc64c61b0628c5b') {
    // our http response is an Observable, store it in a variable
    return this._http.get('/cakes/' + id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    // tempObservable.subscribe(data => console.log('Got our cake by id!', data));
  }
  getPokemonById() {
    // our http response is an Observable, store it in a variable
    let bulbosaur = this._http.get('https://pokeapi.co/api/v2/pokemon/1/');
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    bulbosaur.subscribe(data => {
      console.log('Got bulbasaur ', data);
      var abilities = [];
      for (const a of data['abilities']) {
        // console.log('ability:',a.ability.name);
        abilities.push(a.ability.name);
        let ability = this._http.get(a.ability.url);
        ability.subscribe(abilityData => {
          // console.log(abilityData);
          console.log(
            `${abilityData['pokemon'].length} pokemon have the ability ${
              abilityData['name']
            }`
          );
        });
      }

      console.log(
        `${data['name']}'s abilities are ${abilities
          .slice(0, -1)
          .join(', ')} and ${abilities[abilities.length - 1]}`
      );
    });
  }
  getPokemonByAbility() {
    // our http response is an Observable, store it in a variable
    let tempObservable = this._http.get(
      'https://pokeapi.co/api/v2/ability/34/'
    );
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    tempObservable.subscribe(data =>
      console.log('Got pokemon by ability ', data)
    );
  }

  addCake(newcake) {
    return this._http.post('/cakes', newcake);
  }
  deleteCake(id) {
    return this._http.delete(`/cakes/${id}`);
  }
  putCake(updatedCake) {
    return this._http.put(`/cakes/${updatedCake._id}`,updatedCake);
  }
  addRating(id,newrating) {
    return this._http.post(`/cakes/${id}/ratings`, newrating);
  }
}
