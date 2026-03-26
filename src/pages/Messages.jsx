import { useEffect, useState, useRef } from "react"; 
import axios from "axios";
import { Send, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MessagesPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Load users
  useEffect(() => {
    if (!userId || !token) return;

    const url =
      role === "Parent"
        ? `http://localhost:4000/api/reservations/parent/${userId}`
        : `http://localhost:4000/api/reservations/babysitter/${userId}`;

    axios.get(url, { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const usersFromReservations = res.data.map(r =>
          role === "Parent" ? r.babySitterId : r.parentId
        );

        const uniqueUsers = Array.from(
          new Map(usersFromReservations.map(u => [u._id, u])).values()
        );

        setUsers(uniqueUsers);
      })
      .catch(err => console.error("Error loading users:", err));
  }, [userId, token, role]);

  // Load messages when selectedUser changes
  useEffect(() => {
    if (!selectedUser || !selectedUser._id || !userId) return;

    axios.get(`http://localhost:4000/api/messages/${userId}/${selectedUser._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(res => {
      if (Array.isArray(res.data)) setMessages(res.data);
    })
    .catch(err => console.error("Error loading messages:", err.response?.data || err.message));
  }, [selectedUser, userId, token]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send a message
  const handleSend = async () => { 
    if (!message.trim() || !selectedUser) return; 
  
    let normalizedRole = role;
    if (role.toLowerCase() === "babysitter") normalizedRole = "Babysitter"; 
    else if (role.toLowerCase() === "parent") normalizedRole = "Parent"; 
  
    const payload = { 
      parentId: normalizedRole === "Parent" ? userId : selectedUser._id, 
      babysitterId: normalizedRole === "Babysitter" ? userId : selectedUser._id, 
      content: message.trim(),
      senderRole: normalizedRole,
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
      console.error("Error sending message:", err.response?.data || err.message); 
      alert(err.response?.data?.error || "Erreur serveur"); 
    } 
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-pink-600">Messages</h1>
        </div>
      </header>

      {/* MAIN */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow flex h-[600px]">
          
          {/* USERS LIST */}
          <div className="w-1/3 border-r overflow-y-auto">
            {users.map(u => (
              <button
                key={u._id}
                onClick={() => setSelectedUser(u)}
                className={`w-full p-4 flex gap-3 items-center hover:bg-gray-50 ${
                  selectedUser?._id === u._id ? "bg-pink-50 border-l-4 border-pink-500" : ""
                }`}
              >
                <img
                  src={u.image ? `http://localhost:4000/uploads/${u.image}` : "/placeholder.png"}
                  alt="img"
                  className="w-12 h-12 object-cover rounded-full"
                />
                <div className="text-left">
                  <p className="font-semibold">{u.nom} {u.prenom}</p>
                  <span className="text-xs text-pink-500">{u.role}</span>
                </div>
              </button>
            ))}
          </div>

          {/* CHAT AREA */}
          <div className="flex-1 flex flex-col">
            {selectedUser ? (
              <>
                {/* Header */}
                <div className="p-4 border-b font-semibold">
                  {selectedUser.nom} {selectedUser.prenom}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => {
                  // تطبيع الدور باش المقارنة صحيحة
                  const normalizedRole = role.toLowerCase() === "babysitter" ? "Babysitter" : "Parent";
                  const isMine = msg.senderRole === normalizedRole;

                  return (
                    <div key={msg._id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-xs px-4 py-2 rounded-2xl ${isMine ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-900"}`}>
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    onKeyDown={e => e.key === "Enter" && handleSend()}
                  />
                  <button onClick={handleSend} className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400">
                Select a conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}