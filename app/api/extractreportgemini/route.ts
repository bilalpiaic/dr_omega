import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config"; // Ensure environment variables are loaded

// Initialize Google Generative AI with API Key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
    throw new Error("Google API Key is missing. Please set GOOGLE_API_KEY in your environment variables.");
}

const genAi = new GoogleGenerativeAI(apiKey);
const model = genAi.getGenerativeModel({
    model: "gemini-1.5-pro", // Specify the generative AI model
});

// Define the processing prompt
const prompt = `
Attached is an image of a clinical report. 
Go over the clinical report and identify biomarkers that show slight or larger abnormalities.
Then summarize in 100 words. You may increase the word limit if the report has multiple pages. 
Do not output patient’s name, date, etc. Make sure to include numerical values and key details from the report, including the report title.
`;

export async function POST(req: Request, res: Response) {
    try {
        const { base64 } = await req.json(); // Parse Base64 data from request

        if (!base64) {
            throw new Error("Base64 data is missing from the request.");
        }

        const filePart = fileToGenerativePart(base64); // Prepare file for AI input

        // Call Google Generative AI model with file and prompt
        const generatedContent = await model.generateContent([filePart, prompt]);
        const reportText = generatedContent.response.text();

        // Return processed summary
        return new Response(
            JSON.stringify({ success: true, data: reportText }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error processing AI request:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        return new Response(
            JSON.stringify({ success: false, error: errorMessage }),
            { status: 500 }
        );
    }
}

// Converts Base64 file data to a format suitable for the AI model
function fileToGenerativePart(file: string) {
    const mimeType = file.substring(file.indexOf(":") + 1, file.indexOf(";"));
    const data = file.split(",")[1];

    return {
        inlineData: {
            data,
            mimeType,
        },
    };
}
