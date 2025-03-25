import type { FoodData } from "@/types/data.types";

export async function getFoodInfo(foodName: string): Promise<FoodData> {
  try {
    const response = await fetch("/api/food-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodName }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Food Information:", data);
    return data;
  } catch (error) {
    console.error("Error getting food information:", error);
    throw new Error("Couldn't get food information. Please try again.");
  }
}
