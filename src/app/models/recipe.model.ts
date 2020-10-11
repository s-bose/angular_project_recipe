export class RecipeModel {
    id: number;
    title: string;
    body: string;
    category: string;
    area: string;
    thumbnail: string;
    link: string;
    ingredients: {
        name: string,
        measure: string
    }[];
    favourite: boolean;
    addedToShopping: boolean;

    constructor(id, title, body, category, area, thumbnail, link, ingredients, favourite = false, addedToShopping = false) {
        this.id = id;
        this.title = title;
        this.body = body;
        this.category = category;
        this.area = area;
        this.thumbnail = thumbnail;
        this.link = link;
        this.ingredients = ingredients;
        this.favourite = favourite;
        this.addedToShopping = addedToShopping;
    }
}
