import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    username: "",
    role: "",
    token: "",
  });

  const login = (username, role, token) => {
    setUser({
      isAuthenticated: true,
      username,
      role,
      token,
    });
  };

  const register = (username, role) => {
    setUser({
      isAuthenticated: true,
      username,
      role,
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      username: "",
      role: "",
      token: "",
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
