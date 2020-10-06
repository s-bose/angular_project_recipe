import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

import { recipeQueryInterface } from '../../models/recipe-query.interface';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  providers: []
})
export class RecipeComponent implements OnInit {
  constructor(private apiService: ApiService) { }

  ngOnInit(): void {  
  }


}
