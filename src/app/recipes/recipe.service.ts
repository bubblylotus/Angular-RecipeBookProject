import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService{
    recipesChanged = new Subject<Recipe[]>();
    recipeSelected = new Subject<Recipe>();

    // private recipes: Recipe[] = [
    //     new Recipe("Vegan Schnitzel", 
    //     "This is a vegan schnitzel recipe.", 
    //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9GLno99Cx0dJ3y5NG4lQBmexyKpwrVnkXbg&usqp=CAU",
    //     [
    //         new Ingredient('Seitan', 1), 
    //         new Ingredient('French Fries', 20)
    //     ] 
    //     ), 

    //     new Recipe("Black Bean Burger", 
    //     "This is a black bean burger.", 
    //     "https://cdn.sallysbakingaddiction.com/wp-content/uploads/2018/07/best-black-bean-burgers-2.jpg", 
    //     [
    //         new Ingredient('Bread', 2), 
    //         new Ingredient('Black bean patty', 1)
    //     ]
    //     )
    //   ];

    private recipes: Recipe[] = [];
    constructor(private slService: ShoppingListService){}

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        //returns a copy, not modifying original
        return this.recipes.slice();
    }
    

    addIngredientToSL(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
        
    }
    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }

}