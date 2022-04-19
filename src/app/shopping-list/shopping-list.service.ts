import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
    //need event emitter because users get copy of original array here
    //their copy isn't updated when this one is(ex when new ingredient is added)
    ingredientsChange = new Subject<Ingredient[]>();
    private ingredients: Ingredient[] = [
        new Ingredient("Apples", 5),
        new Ingredient("Tomatoes", 10)
    ];

    getIngredients(){
        return this.ingredients.slice();
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
}