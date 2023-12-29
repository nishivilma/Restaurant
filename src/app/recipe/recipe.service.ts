import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [];

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  getRecipes() {
    return this.recipes;
  }
}
