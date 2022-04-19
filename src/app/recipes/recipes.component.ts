import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'], 
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  //important that the child components and this parent component share a the same instance of the service
  //if it was different, we couldn't subscribe to events emitted by it
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    //subscribing to this event to get updates on it
    this.recipeService.recipeSelected
    //function
    .subscribe(
      //argument list passed
      (recipe: Recipe) => { //body of the function
        this.selectedRecipe = recipe
      }
    );
  }

}
