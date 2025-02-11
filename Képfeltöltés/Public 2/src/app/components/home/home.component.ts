import { Component } from '@angular/core';
import { GalleryComponent } from "../gallery/gallery.component";
import { ImagesComponent } from "../images/images.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [GalleryComponent, ImagesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  selectedGallery = {
    ID: null,
    name: 'Nincs kiválasztott galéria'
  };

  selectingGallery($event:any){
    this.selectedGallery = $event;
  }
}
