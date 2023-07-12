import { Component, OnInit } from '@angular/core';
import { AuthServicesService } from 'src/app/Service/auth-services.service';

@Component({
  selector: 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls: ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {
  recipesData: any[] = [];
  selectedRecipe: any;
  filteredRecipes: any[] = []; // Array to store filtered recipe data
  searchKeyword: string = ''; // Variable to store the search keyword
  recipes: any;
  

  constructor(private authService: AuthServicesService) {}

  ngOnInit(): void {
    this.authService.getRecipes1().subscribe(
      (response: any) => {
        if (response.isSuccess && response.productJson !== null) {
          this.filteredRecipes = JSON.parse(response.productJson);
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching recipes:', error);
      }
    );

    this.authService.getRecipes().subscribe(
      (response: any) => {
        if (response.isSuccess && response.jsonData !== null) {
          this.recipesData = JSON.parse(response.jsonData);
        } else {
          console.log('API request failed or no data received');
        }
      },
      (error: any) => {
        console.log('Error fetching materials:', error);
      }
    );
    }    
    showDetails(recipeData: any) {
      this.selectedRecipe = recipeData;
    }
  searchRecipes(): void {
    // No filtering is required for object data
  }
  sortTable(column: string) {
    // Implement sorting logic based on the provided column
    // ...
  }

  // Edit recipe function
  editRecipe(recipe: any) {
    recipe.isEditing = true;
  }

  // Update recipe function
  updateRecipe(recipe: any) {
    // Implement the logic to update the recipe
    // ...
    recipe.isEditing = false;
  }

  // Delete recipe function
  deleteRecipe(recipe: any) {
    // Implement the logic to delete the recipe
    // ...
  }
}
  
interface Recipe {
  Id: number;
  name: string;
  category: string;
  brand: string;
  customer: string;
  clienttype: string;
  materials: Material[];
}

interface Material {
  Id: number;
  productName: string;
  materialName: string;
  code: string;
  type: string;
  quantity: number;
  cost: number;
  vendor: string;
  stock: number;
}
