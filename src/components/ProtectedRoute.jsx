import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, role }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("TOKEN 👉", token);
  console.log("USER 👉", user);
  if (!token || !user) {
    return <Navigate to="/Login" replace />;
  }  if (role && user.role.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/Login" replace />;
  }

  return children;
}