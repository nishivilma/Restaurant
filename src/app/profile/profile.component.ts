import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  // profileForm!: FormGroup;
  currentUser: any;

  profileForm = new FormGroup({
    date: new FormControl(''),
  });

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dashboardService: DashboardService
  ) {}
  ngOnInit() {
    const storedCurrentUsers = localStorage.getItem('currentUser');
    if (storedCurrentUsers) {
      this.currentUser = JSON.parse(storedCurrentUsers);
    }
    this.profileForm = this.fb.group({
      date: [''],
    });
  }
  // confirm() {
  //   this.currentUser.date = this.profileForm.value.date;
  //   console.log(this.currentUser.date);
  //   this.router.navigate(['/dashboard']);
  // }

  confirm() {
    const dob = this.profileForm.get('date')?.value;

    // Use a service to store the name and DOB in the dashboard
    this.dashboardService.storeUserData(dob || '');

    // You can also update the image if needed
    this.dashboardService.updateUserImage(this.url);
  }

  upload() {
    this.fileInput.nativeElement.click();
  }

  url = 'https://img.icons8.com/ios/100/000000/contract-job.png';
  // onSelect(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsDataURL(file);
  //     fileReader.addEventListener('load', () => {
  //       const base64String = fileReader.result as string;
  //       this.url = base64String;
  //     });
  //   }
  // }

  onSelect(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.url = reader.result as string;
      };

      reader.readAsDataURL(file);
    }
  }
}
