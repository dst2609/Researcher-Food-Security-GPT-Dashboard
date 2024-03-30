// const { Configuration, OpenAIApi } = require("openai");
const { apiLimiter } = require("../security/security");
const axios = require("axios");

const fs = require("fs");
const pdfParse = require("pdf-parse");

let pdfText = ""; // Initialize an empty string to hold the PDF text

// console.log(`Current Working Directory: ${process.cwd()}`); //[[[TESTING ONLY]]]
let dataBuffer = fs.readFileSync("data/SOFI-2023.pdf"); //path relative to server.js (Starts from the server.js)

pdfParse(dataBuffer)
  .then(function (data) {
    // console.log(data.text); // Logs the text content of the PDF [[[TESTING ONLY]]]
    pdfText = data.text; // Store the extracted text for later use
  })
  .catch(function (error) {
    console.error("Error parsing PDF:", error);
  });

// Handle GET /greeting route
async function handleGreeting(req, res) {
  res.send(
    "Greetings, this is The State of Food Security and Nutrition in the World 2023 - Chat GPT Dashboard "
  );
}

// Handle POST /chat route
async function handleChat(req, res) {
  const { message } = req.body;

  try {
    const response = await apiLimiter.post(
      `${process.env.OPEN_AI_POST_URL}`, //"https://api.openai.com/v1/chat/completions"

      {
        model: "gpt-4-0125-preview", //using newer gpt, gpt 3.5 was not learning as expected.
        messages: [
          { role: "system", content: pdfText.slice(0, 10000) },
          // { role: "system", content: pdfText },
          {
            role: "user",
            content: `${message}`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.MY_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ message: reply });
  } catch (error) {
    console.error("OpenAI API request failed:", error.message);
    res.status(500).json({ error: "Failed to process the request" });
  }
}

module.exports = { handleGreeting, handleChat };
