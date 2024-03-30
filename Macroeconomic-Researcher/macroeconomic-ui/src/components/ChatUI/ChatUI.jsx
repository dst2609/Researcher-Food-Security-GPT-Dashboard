import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./ChatUI.css";

function formatMessageText(text) {
  // Replace **text** with bold HTML tags, while avoiding replacing within HTML tags
  return text.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
}

const ChatUI = () => {
  const [chat, setChat] = useState([]); // Store the conversation, chat feature
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    // Add user's message to the conversation
    const updatedChat = [...chat, { text: message, sender: "user" }];
    setChat(updatedChat);
    setMessage(""); // Clear the input after sending

    try {
      const result = await axios.post("http://localhost:3000/chat", {
        message,
      });
      // Break the response into paragraphs on line breaks for safe rendering
      const formattedResponse = formatMessageText(result.data.message);

      const botResponseParagraphs = formattedResponse
        .split("\n")
        .map((str, index) => ({ text: str, key: `response-p-${index}` }));

      // Add bot's message to the conversation
      setChat([...updatedChat, { text: botResponseParagraphs, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message to conversation
      setChat([
        ...updatedChat,
        { text: "Failed to get response", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="chat-wrapper">
      <header className="chat-header">
        The State of Food Security and Nutrition in the World 2023 - OpenAI API
        Dashboard
      </header>
      <div className="chat-body">
        {chat.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.sender}`}>
            {Array.isArray(msg.text) ? (
              msg.text.map((line) => (
                <p
                  key={line.key}
                  dangerouslySetInnerHTML={{ __html: line.text }}
                />
              ))
            ) : (
              <p
                dangerouslySetInnerHTML={{
                  __html: formatMessageText(msg.text),
                }}
              />
            )}
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>
      <div className="chat-controls">
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Type a new question (e.g., Explain increase prices impact on food security)"
          className="chat-input"
        />
        <button className="button-send" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatUI;
