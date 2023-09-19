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
  //driver_marker: any;
  themeToggle = false;

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
          "name": "Property 1",
          "lat": 12.917261,
          "long": 77.612523,
          "status": "available"
        },
        {
          "name": "Property 2",
          "lat": 12.230305,
          "long": 77.277505,
          "status": "live"
        },
        {
          "name": "Property 3",
          "lat": 12.317272,
          "long": 77.314532,
          "status": "available"
        },
        {
          "name": "Property 4",
          "lat": 12.470375,
          "long": 77.427205,
          "status": "live"
        },
        {
          "name": "Property 5",
          "lat": 12.517281,
          "long": 77.552543,
          "status": "available"
        },
        {
          "name": "Property 6",
          "lat": 12.630705,
          "long": 77.677565,
          "status": "live"
        },
        {
          "name": "Property 7",
          "lat": 12.717251,
          "long": 77.712543,
          "status": "available"
        },
        {
          "name": "Property 8",
          "lat": 12.830805,
          "long": 77.877205,
          "status": "live"
        },
        {
          "name": "Property 9",
          "lat": 12.917961,
          "long": 77.912543,
          "status": "available"
        },
        {
          "name": "Property 10",
          "lat": 12.100365,
          "long": 77.107545,
          "status": "live"
        }
  ];

  loadmap(coordinates: Position){
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      center: { lat: 12.917261, lng: 77.612523 },
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true
    });
    //var image = ' <circle cx="40" cy="40" r="24"    style="stroke: #660000;           fill: #cc0000" />';
    //this.geolocation.getCurrentPosition().then(resp => {
      //console.log('resp', resp)

      // let pos = {
      //   lat: coordinates.coords.latitude,
      //   lng: coordinates.coords.longitude
      // };
      // this.driver_marker = new google.maps.Marker({
      //   position: pos,
      //   map: this.map,
      //   //icon: image,
      //   title: 'you are here!',
      //   //animation: google.maps.Animation.DROP,
      // });
      //marker.setAnimation(google.maps.Animation.BOUNCE);
      //this.markers.push(marker);
      //this.map.setCenter(pos);
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
        strokeColor: element.status=="live"?"#15e84d":"#f2eb13",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: element.status=="live"?"#8ceda6":"#e3e086",
        fillOpacity: 0.35,
        map,
        center: {lat:element.lat,lng:element.long},//this.citymap[city].center,
        radius: 1000,//citymap[city]
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
    subHeader: details.status,
    message: details.population,
    buttons: ['Cancel', details.status=="live"?'buy':"ok"],
  });

  await alert.present();
}



 // Listen for the toggle check/uncheck to toggle the dark theme
 toggleChange(ev:any) {
  this.toggleDarkTheme(ev.detail.checked);
}

// Add or remove the "dark" class on the document body
toggleDarkTheme(shouldAdd: boolean | undefined) {
  //document.body.classList.toggle('dark', shouldAdd);
  document.body.setAttribute("color-scheme",shouldAdd?"dark":"light");
}


}
