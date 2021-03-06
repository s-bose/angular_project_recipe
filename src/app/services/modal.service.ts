import { RecipeModel } from '../models/recipe.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {

    selectedRecipe = new Subject<RecipeModel>();

    categoriesList = new Subject<any>();

    constructor() {}
}
