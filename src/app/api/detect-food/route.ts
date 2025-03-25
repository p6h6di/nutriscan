import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const base64Image = body.image;

    const response = await fetch(
      "https://api.clarifai.com/v2/models/food-item-recognition/outputs",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${process.env.CLARIFAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: [
            {
              data: {
                image: { base64: base64Image },
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: `Clarifai API error: ${response.statusText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log(result);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Food detection failed. Please try again." },
      { status: 500 }
    );
  }
}
