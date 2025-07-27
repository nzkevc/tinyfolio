/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function refreshToken() {
  try {
    const response = await axios.post(`${API_URL}/Accounts/refresh`, null, {
      withCredentials: true,
    });

    console.log("Token refreshed successfully:", response.data);
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to refresh token:", error.response.data);
    } else {
      console.error("An error occurred while refreshing the token:", error.message);
    }
  }
}

export async function register(registerRequest: { email: string; password: string; name: string }) {
  try {
    const response = await axios.post(`${API_URL}/Accounts/register`, registerRequest);
    console.log("User registered successfully:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to register user:", error.response.data);
    } else {
      console.error("An error occurred while registering the user:", error.message);
    }
    throw error;
  }
}

export async function login(loginRequest: { email: string; password: string }) {
  try {
    const response = await axios.post(`${API_URL}/Accounts/login`, loginRequest, {
      withCredentials: true,
    });
    console.log("User logged in successfully:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to log in:", error.response.data);
    } else {
      console.error("An error occurred while logging in:", error.message);
    }
    throw error;
  }
}
