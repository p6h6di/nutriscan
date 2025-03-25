import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { foodName } = body;

    if (!foodName) {
      return new Response(
        JSON.stringify({ message: "Food name is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const prompt = `
      Provide detailed information about ${foodName} as a food item.
      Return the response in JSON format with the following structure:
      {
        "name": "${foodName}",
        "description": "Detailed description of the food in 250 words",
        "nutrition": {
          "calories": number,
          "protein": number (in grams),
          "fat": number (in grams),
          "carbs": number (in grams),
          "sugar": number (in grams),
          "fiber": number (in grams),
          "sodium": number (in milligrams),
          "vitamins": {
            "Vitamin A": number (% of daily value),
            "Vitamin C": number (% of daily value),
            "Vitamin D": number (% of daily value),
            "Vitamin E": number (% of daily value),
            "Vitamin K": number (% of daily value),
          },
          "minerals": {
            "Calcium": number (% of daily value),
            "Iron": number (% of daily value),
            "Potassium": number (% of daily value),
            "Magnesium": number (% of daily value),
            "Zinc": number (% of daily value),
          }
        },
        "origin": "Geographic origin of the food",
        "healthBenefits": ["Benefit 1", "Benefit 2", "Benefit 3", "Benefit 4", "Benefit 5", "Benefit 6"],
        "cookingMethods": ["Method 1", "Method 2", "Method 3"],
        "commonDishes": ["Dish 1", "Dish 2", "Dish 3"]
      }
      Make sure all numbers are realistic and based on nutritional data for a typical serving.
      Do not include any explanations or additional text outside the JSON structure.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json|```/g, "").trim();

    try {
      const foodData = JSON.parse(cleanedText);
      foodData.imageUrl = "/api/placeholder/400/300";

      console.log("Food Data:", foodData);

      return new Response(JSON.stringify(foodData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } catch (parseError) {
      console.error(
        "Error parsing Gemini response:",
        parseError,
        "Response Text:",
        cleanedText
      );
      return new Response(
        JSON.stringify({ message: "Failed to parse food information" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(
      JSON.stringify({ message: "Failed to get food information" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
