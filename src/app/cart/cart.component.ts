// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css'],
// })
// export class CartComponent {
//   cartItems: any[] = [];

//   removeFromCart(item: any) {
//     const index = this.cartItems.indexOf(item);
//     if (index !== -1) {
//       this.cartItems.splice(index, 1);
//     }
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from '../recipe/recipe.model';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  recipes: Recipe[] = [];

  constructor(
    private cartService: CartService,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    // Use the RecipeService to get the recipes
    this.recipes = this.recipeService.getRecipes();
    this.cartItems = this.cartService.getCartItems();
  }

  removeFromCart(item: any) {
    this.cartService.removeFromCart(item);
    this.cartItems = this.cartService.getCartItems();
  }

  getCartItems(): any[] {
    return this.cartService.getCartItems();
  }
}
