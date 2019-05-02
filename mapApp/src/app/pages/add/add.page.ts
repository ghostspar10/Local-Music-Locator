import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  public base64Image: string;
  location: Location = {
    artist: '',
    link: '',
    latitude: 0,
    longitude: 0,
  }

  constructor(public firebaseService: FirebaseService) { }

  ngOnInit() {
    
  }
  addLocation(location: Location) {
    this.firebaseService.addLocation(location);
  }
}