import { Component, ElementRef, ViewChild } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Position } from '@capacitor/geolocation/dist/esm/definitions';
import { AlertController } from '@ionic/angular';

import { OverlayEventDetail } from '@ionic/core/components';

declare var google: {
  maps: {
    Map: new (arg0: any, arg1: { center: { lat: number; lng: number; }; zoom: number; mapTypeId: any; mapTypeControl: boolean; streetViewControl: boolean; fullscreenControl: boolean; }) => any; MapTypeId: { ROADMAP: any; }; Marker: new (arg0: {
      position: { lat: number; lng: number; }; map: any;
      //icon: image,
      title: string;
    }) => any; Circle: new (arg0: {
      strokeColor: string; strokeOpacity: number; strokeWeight: number; fillColor: string; fillOpacity: number; map: any; center: { lat: number; lng: number; }; //this.citymap[city].center,
      radius: number;
    }) => any; InfoWindow: new (arg0: { content: any; ariaLabel: string; }) => any;
  };
};
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild('map')
  mapElement!: ElementRef;
  
  map: any;
  driver_marker: any;

  constructor(
    private geolocation: Geolocation,
    public alertController: AlertController
  ) {

    this.geolocation.getCurrentPosition().then((resp) => {
      let coordinates=resp;
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadmap(coordinates);
     }).catch((error) => {
       console.log('Error getting location', error);
     });



    
     
  }


  citymap = [
    {
      name:'chicago', 
      center: { lat: 41.878, lng: -87.629 },
      population: 2714856,
      details:"C",
    },
    {
      name:'newyork', 
      center: { lat: 40.714, lng: -74.005 },
      population: 8405837,
      details:"n",

    },
    {
      name:'losangeles', 
      center: { lat: 34.052, lng: -118.243 },
      population: 3857799,
      details:"l",

    },
    {
      name:'Kolkata', 
      center: { lat:22.5726, lng: 88.3639 },
      population: 603502,
      details:"v",

    },
  ];

  loadmap(coordinates: Position){
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: -34.9011, lng: -56.1645 },
      zoom: 5,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    });
    //var image = ' <circle cx="40" cy="40" r="24"    style="stroke: #660000;           fill: #cc0000" />';
    //this.geolocation.getCurrentPosition().then(resp => {
      //console.log('resp', resp)

      let pos = {
        lat: coordinates.coords.latitude,
        lng: coordinates.coords.longitude
      };
      // this.driver_marker = new google.maps.Marker({
      //   position: pos,
      //   map: this.map,
      //   //icon: image,
      //   title: 'you are here!',
      //   //animation: google.maps.Animation.DROP,
      // });
      //marker.setAnimation(google.maps.Animation.BOUNCE);
      //this.markers.push(marker);
      this.map.setCenter(pos);
      //this.map.setZoom(13)
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

   // this.directionsDisplay.setMap(this.map);

    // this.location_source={lat:22.569602, lng:88.419283};
    // this.location_destination= {lat:22.576416, lng:88.430268};
      const that=this;
      let map=this.map;
      //var citymap=this.citymap;
    // Construct the circle for each value in citymap.
    // Note: We scale the area of the circle based on the population.
    //for (const city in this.citymap) {
      this.citymap.forEach(element => {
        
      
      // Add the circle for this city to the map.
      const cityCircle = new google.maps.Circle({
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map,
        center: element.center,//this.citymap[city].center,
        radius: 50000,//citymap[city]
      });

      // const infowindow = new google.maps.InfoWindow({
      //   content: element.details,
      //   ariaLabel: "Uluru",
      // });

      cityCircle.addListener("click", () => {
        this.presentAlertMultipleButtons(element)
        //alert()
        // infowindow.open({
        //   anchor: cityCircle,
        //   map,
        // });
      });
    
    
  });

  
}

  

async presentAlertMultipleButtons(details: any) {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: details.name,
    subHeader: details.details,
    message: details.population,
    buttons: ['Cancel', 'ok'],
  });

  await alert.present();
}


}
