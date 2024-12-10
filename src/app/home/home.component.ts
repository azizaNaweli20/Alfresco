import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  currentPhotoIndex: number = 0;
  photos: HTMLElement[] = [];

  ngAfterViewInit(): void {
    // Sélectionne toutes les photos après que la vue a été chargée
    this.photos = Array.from(document.querySelectorAll('.photo'));

    // Initialise le slider
    this.startSlider();
  }

  showPhoto(index: number): void {
    this.photos.forEach((photo, i) => {
      photo.style.display = i === index ? 'block' : 'none';
    });
  }

  startSlider(): void {
    this.showPhoto(this.currentPhotoIndex);
    setInterval(() => {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
      this.showPhoto(this.currentPhotoIndex);
    }, 1000); // Change toutes les 30 secondes
  }
}
