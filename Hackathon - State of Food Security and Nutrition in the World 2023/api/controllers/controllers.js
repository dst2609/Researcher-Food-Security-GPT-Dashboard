// const { Configuration, OpenAIApi } = require("openai");
const { apiLimiter } = require("../security/security");
const axios = require("axios");

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
    const response = await axios.post(
      `${process.env.OPEN_AI_POST_URL}`, //"https://api.openai.com/v1/chat/completions"

      {
        model: "gpt-4", //using newwer gpt, gpt 3.5 was not learning as expected.
        messages: [{ role: "user", content: `${message}` }],
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
