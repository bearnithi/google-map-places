import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent {
  @Input() adressType!: string;
  @Output() setAddress: EventEmitter<any> = new EventEmitter();
  @ViewChild('addresstext') addresstext: any;

  autocompleteInput!: string;
  queryWait!: boolean;

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(this.addresstext.nativeElement,
      {
        // componentRestrictions: { country: 'US' },
        types: [this.adressType]  // 'establishment' / 'address' / 'geocode'
      });
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
       if (place.geometry && place.geometry.location) {
          // Perform the nearby search with the selected place's location
          this.performNearbySearch(place.geometry.location);
        }
      this.invokeEvent(place);
    });
  }

  private performNearbySearch(location: google.maps.LatLng) {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const request: google.maps.places.PlaceSearchRequest = {
      location,
      radius: 1000, // Search within 1000 meters from the selected location
      type: 'restaurant', // You can change this to other types like cafe, park, etc.
    };

    service.nearbySearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // 'results' will contain an array of nearby places
        console.log('Nearby Places:', results);
        // You can handle the results as needed in your application
      }
    });
  }


  invokeEvent(place: Object) {
    this.setAddress.emit(place);
  }
}
