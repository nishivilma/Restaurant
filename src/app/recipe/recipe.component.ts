import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  recipes: Recipe[] = [];
  imageUrl!: string;
  cart: any[] = [];

  constructor(private fb: FormBuilder, private recipeService: RecipeService) {}
  ngOnInit() {
    this.recipeForm = this.fb.group({
      name: ['', [Validators.required]],
      number: ['', [Validators.required]],
      // file: [''],
    });
    // this.recipes = JSON.parse(localStorage.getItem('recipes') || '[]');
    const recipe = localStorage.getItem('recipes');
    if (recipe) {
      this.recipes = JSON.parse(recipe);
    }
  }

  addRecipe() {
    if (this.recipeForm.valid) {
      // const formValue = this.addRecipe.value
      const newRecipe = {
        name: this.recipeForm.value.name,
        number: this.recipeForm.value.number,
        // imageUrl: this.recipeForm.value.image,
        imageUrl: this.url,
        isFavorite: false,
        // ...formValue, url: this.url
      };
      this.recipeService.addRecipe(newRecipe);
      this.recipes.push(newRecipe);
      localStorage.setItem('recipes', JSON.stringify(this.recipes));
      this.recipeForm.reset();
      console.log(newRecipe);
    }
  }

  url = 'https://img.icons8.com/ios/100/000000/contract-job.png';

  onSelect(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.addEventListener('load', () => {
        const base64String = fileReader.result as string;
        this.url = base64String;
      });
    }
  }
  // addToCart(recipe: any) {
  //   this.cart.push(recipe);
  // }
}
