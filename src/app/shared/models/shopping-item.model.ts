export class shoppingItemModel {
    id: number;
    title: string;
    ingredients: {
        name: string,
        measure: string
    }

    constructor(id, title, ingredients) {
        this.id = id;
        this.title = title;
        this.ingredients = ingredients;
        console.log(this.id);
    } 
}