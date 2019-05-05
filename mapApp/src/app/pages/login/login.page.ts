import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { FirebaseService } from '../../services/firebase.service';
import { Location } from '../../models/location.model';
import 'rxjs-compat/add/operator/map';
import { Observable } from 'rxjs-compat/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  locationKey: string;
  locationsList$: Observable<Location[]>;
  result: number;
  distance: number = 99999999;
  newDistance: number = 99999999;

  currentLoc: Location = {
    artist: '',
    link: '',
    latitude: 0,
    longitude: 0
  }

  recArtist: Location = {
    artist: '',
    link: '',
    latitude: 0,
    longitude: 0
  }


  constructor(private router: Router,
    private geolocation: Geolocation,
    public firebaseService: FirebaseService) {
    this.locationsList$ =
      this.firebaseService.getLocationList().snapshotChanges().map(changes => {
        return changes.map(c => ({
          key: c.payload.key, ...c.payload.val()
        }))
      })

      var temp = this;

    setInterval(function () {
      temp.findNearest();
    }, 1000);
  }

  ngOnInit() {

    this.geolocation.getCurrentPosition().then(pos => {
      this.currentLoc.latitude = pos.coords.latitude;
      this.currentLoc.longitude = pos.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }

  onContextChange(ctxt: string): void {
    this.locationsList$ = this.firebaseService.getLocationList().snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key, ...c.payload.val()
      }));
    });
  }

  findNearest() {
    this.firebaseService.getLocationList().valueChanges().subscribe(res => {
      for (let item of res) {
        this.result = Math.pow((this.currentLoc.longitude - item.longitude), 2) +
        Math.pow((this.currentLoc.latitude - item.latitude), 2);

        this.distance = Math.sqrt(this.result);
        
        if (this.distance < this.newDistance) {
          this.newDistance = this.distance;
          this.recArtist.artist = item.artist;
          this.recArtist.link = item.link;
          this.recArtist.latitude = item.latitude;
          this.recArtist.longitude = item.longitude;
        }
      }
    });
  }

  recommendMusic() {
    console.log(this.recArtist.artist);
    document.getElementById("text1").innerHTML = "<h1>Artist: " + this.recArtist.artist + "</h1>";

  }
}
