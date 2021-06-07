import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  hide = true;
  hideAlways = true;
  formulario: FormGroup;
  constructor( public fb: FormBuilder) {this.formulario = fb.group({
    name: new FormControl('', [Validators.required]),
    firstname: new FormControl('', [Validators.required]),
    rut: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required]),
  });
} 

  ngOnInit(): void {
  }

}
