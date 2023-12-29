import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  rememberMe: boolean = false;
  users: any[] = [];
  currentUser: any;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.signinForm = this.fb.group({
      name: ['', [Validators.required]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{7,}'
          ),
        ],
      ],
    });

    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
    }

    const rememberMePreference = localStorage.getItem('rememberMe');
    if (rememberMePreference === 'true') {
      this.rememberMe = true;
    }

    // const storedCurrentUsers = localStorage.getItem('currentUser');
    // if (storedCurrentUsers) {
    //   this.currentUser = JSON.parse(storedCurrentUsers);
    // }
  }

  onSignin() {
    const enteredUser = this.signinForm.value;
    const foundUser = this.users.find(
      (user) =>
        user.name === enteredUser.name && user.password === enteredUser.password
    );

    if (foundUser) {
      this.currentUser = foundUser;
      alert('Signin successful');
      this.router.navigate(['/home']);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
    } else {
      alert('Invalid credentials');
    }
  }

  toggleRememberMe() {
    this.rememberMe = !this.rememberMe;
    localStorage.setItem('rememberMe', this.rememberMe.toString());
  }
}
