import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpService } from './http.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  newCake: any;
  title = 'app';
  showCakeEditFormId = null;
  cakes = [];
  cakeToEdit = {};
  newRating={};
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log('ngOnInit');
    this.getCakesFromService();
    // this.getCakeByIdFromService();
    this.newCake = {  };
  }


  getCakesFromService() {
    let observable = this._httpService.getCakes();
    observable.subscribe(data => {
      console.log('Got our cakes the new way!', data);
      // In this example, the array of cakes is assigned to the key 'cakes' in the data object.
      // This may be different for you, depending on how you set up your Cake API.
      this.cakes = data['data'];
      console.log('this.cakes', this.cakes);
    });
  }

  getCakeByIdFromService(id?: string) {
    let observable = this._httpService.getCakeById(id);
    observable.subscribe(data => {
      console.log('Got our cake by id the new way!', data);
      // In this example, the array of cakes is assigned to the key 'cakes' in the data object.
      // This may be different for you, depending on how you set up your Cake API.
      this.cakeToEdit = data['data'][0];
      console.log('this.cakeToEdit', this.cakeToEdit);
    });
  }
  onButtonClick(): void {
    this.getCakesFromService();
    console.log(`Click event is working`);
  }
  onButtonClickCake(id?: string): void {
    this.getCakeByIdFromService(id);
    console.log(`Click event cake by id`);
  }
  showRatingForm(id: string): void {
    this.showCakeEditFormId = id;
    console.log(`Click event showRatingForm`);
  }
  onSubmit(newCake) {
    console.log(newCake);
    let observable = this._httpService.addCake(newCake);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of cakes is assigned to the key 'cakes' in the data object.
      // This may be different for you, depending on how you set up your Cake API.
      this.newCake = { };
      this.getCakesFromService();
    });
  }
  onSubmitRating( newRating, cakeId) {
    console.log("*newRating",newRating);
    console.log("*cakeId",cakeId);

    let observable = this._httpService.addRating(cakeId,newRating);
    observable.subscribe(data => {
      console.log('put ', data);

      this.newRating = { };
      this.showCakeEditFormId=null;
      this.getCakesFromService();
      this.getCakeByIdFromService(cakeId);


    });
  }


  deleteCake(id: string): void {
    let observable = this._httpService.deleteCake(id);
    observable.subscribe(data => {
      console.log('deleted item', data);
      console.log(`delete cake by id ${id}`);
      this.getCakesFromService();
    });
  }
  putCake(updatedCake) {
    console.log(updatedCake);
    let observable = this._httpService.putCake(updatedCake);
    observable.subscribe(data => {
      console.log('posted data', data);
      // In this example, the array of cakes is assigned to the key 'cakes' in the data object.
      // This may be different for you, depending on how you set up your Cake API.
      this.cakeToEdit = { };
      this.getCakesFromService();
    });
  }
  dataFromChild(eventData) {
    console.log('********eventData', eventData);
    console.log('********pre', this.cakeToEdit);
    this.cakeToEdit = eventData;
    console.log('********post', this.cakeToEdit);
    this.getCakesFromService();
  }

}
