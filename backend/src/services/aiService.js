const { GoogleGenAI } = require("@google/genai")

const ai = new GoogleGenAI({})

async function generatePrompts(content){

     const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: content,
        config: {
            temperature: 0.7,
            systemInstruction: `
You are a classification AI. 
Analyze the following user prompt and return ONLY a JSON object with two keys:
{
  "category": "<category name>",
  "insight": "<brief analysis>"
}
Do not add any extra text, explanations, or markdown. 
Prompt: ${content}
`
        }

     })

    return response.text
}

module.exports = generatePrompts;
