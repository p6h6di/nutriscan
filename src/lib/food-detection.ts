import { fileToBase64 } from "./utils";

export async function detectFood(imageFile: File): Promise<string> {
  try {
    const base64Image = await fileToBase64(imageFile);

    const response = await fetch("/api/detect-food", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    const result = await response.json();
    const foodName =
      result?.outputs?.[0]?.data?.concepts?.[0]?.name ?? "Unknown Food";

    console.log("Detected Food:", foodName);
    return foodName;
  } catch (error) {
    console.error("Error detecting food:", error);
    throw new Error("Food detection failed. Please try again.");
  }
}
