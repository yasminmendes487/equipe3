import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const MOCK_USERS = [
  {
    id: 1,
    name: "Ana Admin",
    role: "admin",
    email: "admin@eventflow.com",
    avatar: "AA",
  },
  {
    id: 2,
    name: "Carlos Organizador",
    role: "organizador",
    email: "org@eventflow.com",
    avatar: "CO",
    eventIds: [1, 2, 3],
  },
  {
    id: 3,
    name: "Maria Participante",
    role: "participante",
    email: "part@eventflow.com",
    avatar: "MP",
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("ef-user");
    return saved ? JSON.parse(saved) : null;
  });

  function login(mockUser) {
    setUser(mockUser);
    localStorage.setItem("ef-user", JSON.stringify(mockUser));
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("ef-user");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
