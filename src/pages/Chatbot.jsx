import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Chatbot() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post("http://localhost:4000/api/chat", {
        message: input,
      });
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { sender: "bot", text: "Erreur serveur 😢" }]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#f7f7f8]">
      {/* Top bar */}
      <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg transition">
          <h1 className="text-2xl font-bold text-pink-600">SmartBabyCare</h1>
        </button>
        <span className="text-2xl font-bold text-pink-600">Chat Assistant</span>
      </div>
      </header>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
      {messages.length === 0 && (
      <div className="h-full flex flex-col justify-center items-center text-center px-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Nouveau chat ✨
        </h2>
        <p className="text-gray-500 max-w-md">
          Posez votre question sur la garde d’enfants ou tout autre sujet.
          Je suis là pour vous aider 💖
        </p>
      </div>
      )}

        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex gap-3 ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {m.sender === "bot" && (
              <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-sm">
                🤖
              </div>
            )}

            <div
              className={`px-4 py-3 rounded-2xl max-w-[75%] text-sm leading-relaxed ${
                m.sender === "user"
                  ? "bg-pink-500 text-white rounded-br-none"
                  : "bg-white text-gray-800 shadow rounded-bl-none"
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t bg-white p-4 flex gap-3 sticky bottom-0">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Message ChatGPT..."
          className="flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button
          onClick={sendMessage}
          className="bg-pink-500 text-white px-5 rounded-xl hover:bg-pink-600 transition"
        >
          Envoyer
        </button>
      </div>
    </div>
  );
}
