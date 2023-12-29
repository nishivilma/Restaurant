import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe/recipe.model';
import { RecipeService } from '../recipe/recipe.service';
import { CartService } from '../cart/cart.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @Output() addToFavoritesEvent: EventEmitter<Recipe> =
    new EventEmitter<Recipe>();

  favoriteCount!: number;
  constructor(
    private recipeService: RecipeService,
    private cartService: CartService,
    private dashboardService: DashboardService,
    private sharedService: SharedService
  ) {}

  recipes: Recipe[] = [];
  searchText: string = '';
  showSortingOptions: boolean = false;
  selectedSorting: string = 'lowToHigh';
  favoriteRecipes: Recipe[] = [];

  get sortedRecipes(): any[] {
    if (this.selectedSorting === 'lowToHigh') {
      return this.recipes.sort((a, b) => a.number - b.number);
    } else if (this.selectedSorting === 'highToLow') {
      return this.recipes.sort((a, b) => b.number - a.number);
    }
    return this.recipes;
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.sharedService.currentFavoriteCount.subscribe((count) => {
      this.favoriteCount = count; // Update the count on the home page
      console.log('Favorite Count Updated:', this.favoriteCount);
    });
  }
  addToCart(recipe: any) {
    this.cartService.addToCart(recipe);
    console.log('Added to cart:', recipe);
  }
  // deleteRecipe(recipe: any) {
  //   const index = this.recipes.indexOf(recipe);
  //   if (index !== -1) {
  //     this.recipes.splice(index, 1);
  //     console.log('Deleted:', recipe);
  //   }
  // }

  deleteRecipe(recipe: any) {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete ${recipe.name}?`
    );

    if (isConfirmed) {
      const index = this.recipes.indexOf(recipe);
      if (index !== -1) {
        this.recipes.splice(index, 1);
        console.log('Deleted:', recipe);
      }
    }
  }

  toggleSortingOptions() {
    this.showSortingOptions = !this.showSortingOptions;
  }
  // addToFavorites(recipe: Recipe) {
  //   if (!this.favoriteRecipes.includes(recipe)) {
  //     this.favoriteRecipes.push(recipe);
  //     this.favoriteCount++;
  //   }
  // }
  addToFavorites(recipe: Recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.push(recipe);
      this.favoriteCount++;
      this.sharedService.updateFavoriteCount(this.favoriteCount);
      console.log('Added to Favorites:', recipe);
      this.addToFavoritesEvent.emit(recipe);
    }
  }

  toggleFavorite(recipe: Recipe) {
    recipe.isFavorite = !recipe.isFavorite;
    if (recipe.isFavorite) {
      this.addToFavorites(recipe);
      this.favoriteCount = this.favoriteRecipes.length;
    } else {
      const index = this.favoriteRecipes.indexOf(recipe);
      if (index !== -1) {
        this.favoriteRecipes.splice(index, 1);
        this.favoriteCount = this.favoriteRecipes.length;
      }
    }
  }
}
