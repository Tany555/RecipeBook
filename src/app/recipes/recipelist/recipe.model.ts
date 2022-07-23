import { Ingredient } from 'src/app/shared/ingredient.model';

export class Recipe{
    public name : string;  
    public description : string;  
    public imagePath : string;
    public ingredients: Ingredient[];  

constructor(name: string, decs: string, iPath: string, ingredients :Ingredient[]){
    
   this.name=name;
   this.description=decs;
   this.imagePath=iPath;
   this.ingredients=ingredients;
   
    
}

}