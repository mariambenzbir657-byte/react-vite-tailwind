import { useEffect, useState } from "react";
import axios from "axios";
import { Send } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SmartBabyCareMessages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const role = localStorage.getItem("role");

  /* ===============================
     Load users (parent <-> babysitter)
     =============================== */
  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/users?role=${
          role === "parent" ? "babysitter" : "parent"
        }`
      )
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, [role]);

  /* ===============================
     Load messages from backend
     =============================== */
  useEffect(() => {
    if (!selectedUser) {
      setMessages([]);
      return;
    }

    axios
      .get(
        `http://localhost:4000/api/messages/${userId}/${selectedUser._id}`
      )
      .then((res) => setMessages(res.data))
      .catch(console.error);
  }, [selectedUser, userId]);

  /* ===============================
     Send message
     =============================== */
  const handleSend = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages",
        {
          parentId: userId,
          babysitterId: selectedUser._id,
          content: message.trim(),
        }
      );

      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button
            onClick={() => navigate(-1)}
            className="text-2xl font-bold text-pink-600"
          >
            Messages
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden h-[600px]">
          <div className="flex h-full">
            {/* USERS LIST */}
            <div className="w-1/3 border-r overflow-y-auto">
              {users.map((u) => (
                <button
                  key={u._id}
                  onClick={() => setSelectedUser(u)}
                  className={`w-full p-4 flex gap-3 hover:bg-gray-50 ${
                    selectedUser?._id === u._id
                      ? "bg-pink-50 border-l-4 border-pink-500"
                      : ""
                  }`}
                >
                  <img
                    src={`http://localhost:4000/uploads/${u.image}`}
                    alt={u.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{u.name}</p>
                    <span className="text-xs text-pink-500">{u.role}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* CHAT */}
            <div className="flex-1 flex flex-col">
              {!selectedUser ? (
                <div className="flex-1 flex items-center justify-center text-gray-400">
                  chat entre parent & babysitter
                </div>
              ) : (
                <>
                  <div className="p-4 border-b font-semibold">
                    {selectedUser.name}
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg._id}
                        className={`flex ${
                          msg.sender._id === userId
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                            msg.sender._id === userId
                              ? "bg-pink-500 text-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 border-t flex gap-2">
                    <input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Tapez votre message..."
                      className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                      onClick={handleSend}
                      className="bg-pink-500 text-white p-2 rounded-lg"
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
