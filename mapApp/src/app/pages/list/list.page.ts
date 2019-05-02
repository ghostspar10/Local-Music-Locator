import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { FirebaseService } from '../../services/firebase.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  public LocationKey: string;
  public base64Image: string;
  location: Location = {
    artist: '',
    link: '',
    latitude: 0,
    longitude: 0,
  }

  constructor(private activatedRoute: ActivatedRoute,private geolocation: Geolocation, private camera: Camera,
    public firebaseService: FirebaseService) {
      this.location = this.firebaseService.getCurrentLocation();
    }

  ngOnInit() {
    console.log("Got: " + this.activatedRoute.snapshot.paramMap.get('locationTitle'));
    //this.base64Image = this.location.picture;
  }

  editLocation(location: Location) {
    this.firebaseService.editLocation(location);
  }

  deleteLocation(location: Location) {
    this.firebaseService.deleteLocation(location);
  }

}
