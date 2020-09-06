import { RecipeModel } from './recipe.model'
import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {
    // selectedRecipe = new Subject<RecipeModel>();
    selectedRecipe = new Subject<RecipeModel>();
    
    constructor() {}
}