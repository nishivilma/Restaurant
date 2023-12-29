import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Recipe } from '../recipe/recipe.model';
import { SharedService } from '../shared.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userDetails: any;
  currentUser: any;
  userImage: string | undefined;
  userDOB: string | undefined;
  // favoriteRecipes: Recipe[] = [];
  favoriteCount: number = 0;
  @Input() favoriteRecipes: Recipe[] = [];
  showFavoritePopup = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private sharedService: SharedService,
    private toast: NgToastService
  ) {}
  ngOnInit() {
    const storedCurrentUsers = localStorage.getItem('currentUser');
    if (storedCurrentUsers) {
      this.currentUser = JSON.parse(storedCurrentUsers);
    }

    this.dashboardService.userData$.subscribe((userData) => {
      this.userDOB = userData.dob;
      this.userImage = this.dashboardService.getUserImage();
    });

    this.sharedService.currentFavoriteCount.subscribe((count) => {
      this.favoriteCount = count;
    });
  }
  logout() {
    const confirmLogout = window.confirm('Are you sure you want to log out?');
    if (confirmLogout) {
      localStorage.removeItem('token');
      this.router.navigate(['/signin']);
    }
  }

  addToFavorites(recipe: Recipe) {
    if (!recipe.isFavorite) {
      recipe.isFavorite = true;
      this.favoriteRecipes.push(recipe);
      this.favoriteCount++; // Increment the favorite count
      this.sharedService.updateFavoriteCount(this.favoriteCount); // Update shared count
    }
  }
  toProfile() {
    this.router.navigate(['/profile']);
  }
  toHome() {
    this.router.navigate(['/home']);
  }
  toRecipe() {
    this.router.navigate(['/recipe']);
  }
  toCart() {
    this.router.navigate(['/cart']);
  }
  // toggleFavoritePopup() {
  //   this.toast.info({
  //     detail: 'Favorite Recipes',
  //     summary: Recipe.name,
  //     sticky: true,
  //   });
  // }

  toggleFavoritePopup() {
    // You can pass favoriteRecipes to the toast.info method
    this.toast.info({
      detail: this.getFavoriteRecipesDetail(),
      summary: 'Favorite Recipes',
      sticky: true,
    });
  }
  getFavoriteRecipesDetail(): string {
    if (this.favoriteCount === 0) {
      return 'You have no favorite recipes yet.';
    }

    // Customize the detail message based on your requirements
    const recipeNames = this.favoriteRecipes
      .map((recipe) => recipe.name)
      .join(', ');
    return `Your favorite recipes: ${recipeNames}`;
  }
  handleAddToFavoritesEvent(recipe: Recipe) {
    // Add code to show the recipe in the popup
    this.toggleFavoritePopup(); // Assuming this function shows the popup
  }

  // openFavoritesPopup() {
  //   this.showFavoritePopup = true;
  // }

  // closeFavoritesPopup() {
  //   this.showFavoritePopup = false;
  // }
}
