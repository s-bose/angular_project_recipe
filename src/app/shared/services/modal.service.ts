import { RecipeModel } from '../shared/models/recipe.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
    // selectedRecipe = new Subject<RecipeModel>();
    selectedRecipe = new Subject<RecipeModel>();
    
    constructor() {}
}