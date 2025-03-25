export interface NutritionData {
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  sugar: number;
  fiber: number;
  sodium: number;
  vitamins?: {
    [key: string]: number;
  };
  minerals?: {
    [key: string]: number;
  };
}

export interface FoodData {
  name: string;
  description: string;
  nutrition: NutritionData;
  origin: string;
  healthBenefits: string[];
  cookingMethods: string[];
  commonDishes: string[];
  imageUrl: string;
}
