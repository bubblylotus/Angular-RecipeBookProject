import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    //need event emitter because users get copy of original array here
    //their copy isn't updated when this one is(ex when new ingredient is added)
    ingredientsChange = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number){
        return this.ingredients[index];
    }

    addIngredient(ingredient: Ingredient){
        this.ingredients.push(ingredient);
        //emit updated array
        this.ingredientsChange.next(this.ingredients.slice());
    }
    addIngredients(ingredients: Ingredient[]){
        //don't want to loop through and add one by one; that's emit a lot of events
        //... is spread operator. changes out ingredients into a list of individual ingredients that can be pushed
        //onto our array. can't push a whole array onto another array
        this.ingredients.push(...ingredients);
        this.ingredientsChange.next(this.ingredients.slice());
    }
    updateIngredient(index: number, newIngredient: Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientsChange.next(this.ingredients.slice());
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index, 1);
        this.ingredientsChange.next(this.ingredients.slice());
    }
}