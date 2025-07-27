import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getAllUsers() {
  try {
    const response = await axios.get(`${API_URL}/Users`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch users:", error.response.data);
    } else {
      console.error("An error occurred while fetching users:", (error as Error).message);
    }
    throw error;
  }
}

export async function getUserById(id: string) {
  try {
    const response = await axios.get(`${API_URL}/Users/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch user:", error.response.data);
    } else {
      console.error("An error occurred while fetching the user:", (error as Error).message);
    }
    throw error;
  }
}

export async function updateUserName(id: string, name: string) {
  try {
    await axios.put(`${API_URL}/Users/${id}`, null, {
      params: { name },
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to update user name:", error.response.data);
    } else {
      console.error("An error occurred while updating the user name:", (error as Error).message);
    }
    throw error;
  }
}

export async function deleteUser(id: string) {
  try {
    await axios.delete(`${API_URL}/Users/${id}`, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to delete user:", error.response.data);
    } else {
      console.error("An error occurred while deleting the user:", (error as Error).message);
    }
    throw error;
  }
}
