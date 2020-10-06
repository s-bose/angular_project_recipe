import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { SharedModule } from './shared.module';
import { AppRoutingModule } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { RecipeListComponent } from './components/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './components/recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './components/recipe/recipe-list/recipe-item/recipe-item.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { ShoppingItemComponent } from './components/shopping-list/shopping-item/shopping-item.component';


// pipes
import { SafeUrlPipe } from './components/recipe/recipe-detail/recipe-url.pipe';

// ngx-bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

// services
import { AxiosService } from './services/axios.service';
import { RecipeService } from './services/recipe.service';
import { ModalService } from './services/modal.service';
import { ApiService } from './services/api.service';

@NgModule({
  declarations: [
    AppComponent,
    RecipeComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListComponent,
    PageNotFoundComponent,
    HomeComponent,
    SafeUrlPipe,
    ShoppingItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot()
  ],
  providers: [
    AxiosService, 
    RecipeService,
    ModalService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
