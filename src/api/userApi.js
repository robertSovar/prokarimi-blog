import { API } from "./api";

export const registerUser = async (data) => {
  try {
    const response = await API.post("/register", data);
    return response.data;
  } catch (error) {
    console.log("Error registering user", error);
    throw error;
  }
};

export const loginUser = async (data) => {
  try {
    const response = await API.post("/login", data);
    const token = response.data.token;
    localStorage.setItem("token", token);
    return response.data;
  } catch (error) {
    console.log("Error logging in user", error);
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await API.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error getting user profile", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    localStorage.removeItem("token");
  } catch (error) {
    console.log("Error logging out user", error);
    throw error;
  }
};
