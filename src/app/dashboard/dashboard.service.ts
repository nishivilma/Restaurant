import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Recipe } from '../recipe/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private userDataSubject = new BehaviorSubject<{ dob: string }>({
    dob: '',
  });
  userData$ = this.userDataSubject.asObservable();

  private userImage: string | undefined;
  private favoriteRecipes: Recipe[] = [];

  storeUserData(dob: string) {
    this.userDataSubject.next({ dob });
  }
  getUserImage(): string | undefined {
    return this.userImage;
  }

  updateUserImage(image: string) {
    this.userImage = image;
  }
}
