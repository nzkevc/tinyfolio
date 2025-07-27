import axios from "axios";

export async function refreshToken() {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/Accounts/refresh`, null, {
      withCredentials: true,
    });

    console.log("Token refreshed successfully:", response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response) {
      console.error("Failed to refresh token:", error.response.data);
    } else {
      console.error("An error occurred while refreshing the token:", error.message);
    }
  }
}
