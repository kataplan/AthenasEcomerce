 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}
  display: boolean = true;
  name() {
    if (this.display) {
      document.getElementById('second-row')!.style.display = 'flex';
      this.display = false;
    } else {
      document.getElementById('second-row')!.style.display = 'none';
      this.display = true;
    }
  }
  goHome(){
    this.router.navigate([`/home`])
  }
  goLogin(){
    this.router.navigate([`/login`])
  }
  goRegister(){
    this.router.navigate([`/register`])
  }
  search(){
    this.router.navigate([`/search`])
  }
  goFootball(){
    this.router.navigate([`/`])
  }
  goCategory(str:string){
    this.router.navigate([`/categoria`,str])
  }

}
