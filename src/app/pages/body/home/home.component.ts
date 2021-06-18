import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig],
})
export class HomeComponent implements OnInit {
  images: any[] = [
    { src: 'assets/img/slider/img1.jpg' },
    { src: 'assets/img/slider/img2.jpg' },
    { src: 'assets/img/slider/img3.jpg' },
    { src: 'assets/img/slider/img4.jpg' },
  ];
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 5000;
    config.keyboard = false;
    config.pauseOnHover = true;
  }

  ngOnInit(): void {
    
  }
  
}
