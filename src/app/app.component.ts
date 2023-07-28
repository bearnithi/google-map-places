import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'google-map';
  searchQuery: string = '';
  address: any;

  mapOptions: google.maps.MapOptions = {
    center: { lat: 0, lng: 0 },
    zoom: 8,
  };

  selectedPlace: google.maps.places.PlaceResult | undefined;

  onMapClick(latLng: any) {
    // console.log(latLng);
    // this.selectedPlace = {
    //   formatted_address: '',
    //   geometry: { location: latLng },
    // };
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results.length > 0) {
        // Assuming the first result is the most relevant one
        const selectedPlace = results[0];
        const formattedAddress = selectedPlace.formatted_address;
        console.log(formattedAddress, 'FORMATTED ADDRESS');
        // Update the input field with the formatted address or any other relevant information
        // this.updateInputField(formattedAddress);
      }
    });
  }

  onPlaceSelected(place: google.maps.places.PlaceResult) {
    const latLng = place.geometry?.location;
    if (latLng) {
      // Update the map's center to the selected place's location
      this.mapOptions = {
        center: latLng,
        zoom: 20, // You can adjust the zoom level as needed
      };
    }
  }

  getAddress(place: any) { 
    console.log(place, 'PLACE');
    this.address = place['formatted_address'];
  }

}
