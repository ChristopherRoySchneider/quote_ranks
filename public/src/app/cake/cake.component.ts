import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { HttpService } from "../http.service";

@Component({
  selector: "app-cake",
  templateUrl: "./cake.component.html",
  styleUrls: ["./cake.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class CakeComponent implements OnInit {
  @Input() cakeToEdit: any; // use the @Input decorator to indicate this comes from the parent
  @Output() aCakeEventEmitter = new EventEmitter();
  stars = [];
  avgRating = 0;
  constructor(private _httpService: HttpService) {}
  ngOnInit() {
    console.log("cakecomponent ngOnInit");
  }
  ngOnChanges() {
    var stars = [];
    for (const rating of this.cakeToEdit["ratings"]) {
      stars.push(rating.stars);
    }
    var sum = 0;
    stars.forEach(element => {
      sum += element;
    });
    this.avgRating=sum/stars.length;
  }

  putCake(updatedCake) {
    console.log(updatedCake);
    let observable = this._httpService.putCake(updatedCake);
    observable.subscribe(data => {
      console.log("posted data", data);
      // In this example, the array of cakes is assigned to the key 'cakes' in the data object.
      // This may be different for you, depending on how you set up your Cake API.
      this.cakeToEdit = {};
      this.aCakeEventEmitter.emit(this.cakeToEdit);
      // this.getCakesFromService();
    });
  }
}
