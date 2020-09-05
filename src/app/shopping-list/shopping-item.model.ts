export class shoppingItemModel {
    title: string;
    ingredients: {
        name: string,
        measure: string
    }

    constructor(title, ingredients) {
        this.title = title;
        this.ingredients = ingredients;
    } 
}