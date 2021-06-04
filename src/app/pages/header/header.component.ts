import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  name() {
    if(document.getElementById('btn-search')?.toggleAttribute)
    document.getElementById('second-row')!.style.display ="flex";
  }
}
