import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  //users: any;
  users: any[] = [];
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
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

    const user = localStorage.getItem('users');
    if (user) {
      // this.signupForm.setValue(JSON.parse(users));
      // this.signupForm.reset();
      this.users = JSON.parse(user);
    }
  }

  onSignup() {
    // localStorage.setItem('user', JSON.stringify(this.signupForm.value));

    this.users.push(this.signupForm.value);
    localStorage.setItem('users', JSON.stringify(this.users));
    this.signupForm.reset();
  }
}
