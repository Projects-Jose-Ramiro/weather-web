import { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from "./contants";

export const AuthContext = createContext({
  isAuthenticated: false,
  getAccessToken: () => "",
  saveUser: (userData) => {},
  getRefreshToken: () => {},
  getUser: () => {},
});

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    checkAuth();
  });

  async function requestNewAccessToken(refreshToken) {
    try {
      const response = await fetch(`${API_URL}/refresh-token`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${refreshToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body.accessToken;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function getUserInfo(accessToken) {
    try {
      const response = await fetch(`${API_URL}/user`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();

        if (json.error) {
          throw new Error(json.error);
        }
        return json.body;
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async function checkAuth() {
    const token = getRefreshToken();
    if (token) {
      const newAccessToken = await requestNewAccessToken(token);
      if (newAccessToken) {
        const userInfo = await getUserInfo(newAccessToken);
        if (userInfo) {
          saveSessionInfo(userInfo, newAccessToken, token);
        }
      }
    }
  }

  function saveSessionInfo(userInfo, accessToken, refreshToken) {
    setAccessToken(accessToken);
    localStorage.setItem("token", JSON.stringify(refreshToken));
    setIsAuthenticated(true);
    saveUser(userInfo);
  }

  function getAccessToken() {
    return accessToken;
  }

  function getRefreshToken() {
    const tokenData = localStorage.getItem("token");
    if (tokenData) {
      const token = JSON.parse(tokenData);
      return token;
    }
    return null;
  }

  function saveUser(userData) {
    if (userData.body) {
      saveSessionInfo(
        userData.body.user,
        userData.body.accessToken,
        userData.body.refreshToken
      );
    } else {
      console.error("Error: userData.body is undefined");
    }
  }

  function getUser() {
    return user;
  }

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, getAccessToken, saveUser, getRefreshToken, getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
