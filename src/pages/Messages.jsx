import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SmartBabyCareMessages() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  /* ===============================
     Create stable conversationId
  =============================== */
  const createConversationId = (id1, id2) => {
    return [id1, id2].sort().join("_");
  };

  /* ===============================
     Load babysitters from your reservations
  =============================== */
  useEffect(() => {
    if (!userId || !token) return;
  
    setLoadingUsers(true);
  
    axios
      .get(`http://localhost:4000/api/reservations/parent/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const uniqueUsers = Array.from(
          new Map(res.data.map(u => [u._id, u])).values()
        );
        setUsers(uniqueUsers);
        
        setLoadingUsers(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingUsers(false);
      });
  }, [userId, token]);
  

  /* ===============================
     Load messages when a user is selected
  =============================== */
  useEffect(() => {
    if (!selectedUser || !userId || !token) {
      setMessages([]);
      return;
    }

    setLoadingMessages(true);

    const conversationId = createConversationId(userId, selectedUser._id);

    axios.get(`http://localhost:4000/api/messages/${conversationId}`, {
      headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setMessages(res.data);
        } else {
          setMessages([]);
        }
        setLoadingMessages(false);
      })      
  }, [selectedUser, userId, token]);

  /* ===============================
     Scroll to bottom when messages update
  =============================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     Send message
  =============================== */
  const handleSend = async () => {
    if (!message.trim() || !selectedUser?._id || !userId) return;

    const conversationId = createConversationId(userId, selectedUser._id);

    const payload = {
      senderId: userId,
      receiverId: selectedUser._id,
      content: message.trim(),
      conversationId,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/api/messages/envoyer",
        payload,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setMessages((prev) => [...prev, res.data]);
      setMessage("");
    } catch (err) {
      console.error("Backend error:", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-pink-600">Messages</h1>
          </div>
          <button className="bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition">
            Nouveau Message
          </button>
        </div>
      </header>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden" style={{ height: "600px" }}>
          <div className="flex h-full">
            {/* USERS LIST */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              {loadingUsers ? (
                <div className="p-4 text-gray-400">Loading...</div>
              ) : users.length === 0 ? (
                <div className="p-4 text-gray-400">Aucun babysitter trouvé</div>
              ) : (
                users.map((u) => (
                  <button
                    key={u._id}
                    onClick={() => setSelectedUser(u)}
                    className={`w-full p-4 flex gap-3 items-center hover:bg-gray-50 transition ${
                      selectedUser?._id === u._id ? "bg-pink-50 border-l-4 border-pink-500" : ""
                    }`}
                  >
                    <img
                      src={u.image ? `http://localhost:4000/uploads/${u.image}` : "/default-avatar.png"}
                      alt={u.nom}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold">{u.nom} {u.prenom}</p>
                      <span className="text-xs text-pink-500">{u.role}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* CHAT */}
            <div className="flex-1 flex flex-col">
              {selectedUser && (
                <>
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">{selectedUser.nom} {selectedUser.prenom}</p>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg, index) => (
                      <div
                      key={msg._id || index}
                      className={`flex ${msg.senderId === userId ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                            msg.senderId === userId ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-900"
                          }`}
                        >
                          <p className="text-sm">{msg.content}</p>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>


                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        className="flex-1 rounded-lg border border-gray-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        onKeyPress={(e) => e.key === "Enter" && handleSend()}
                      />
                      <button
                        onClick={handleSend}
                        className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
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
