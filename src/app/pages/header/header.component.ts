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
  display:boolean=false;
  name() {
    if(this.display){
      document.getElementById('second-row')!.style.display ="flex";
      this.display=false;
    }else{
      document.getElementById('second-row')!.style.display ="none";
      this.display=true;
    }
    
  }
}
