import axios from "axios";

import type { Folio } from "@/models/Folio";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getFolioById(id: number): Promise<Folio> {
  try {
    const response = await axios.get(`${API_URL}/Folios/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch folio:", error.response.data);
    } else {
      console.error("An error occurred while fetching the folio:", (error as Error).message);
    }
    throw error;
  }
}

export async function createFolio(folio: {
  name: string;
  description: string;
  ownerId: string;
}): Promise<Folio> {
  try {
    const response = await axios.post(`${API_URL}/Folios`, folio);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to create folio:", error.response.data);
    } else {
      console.error("An error occurred while creating the folio:", (error as Error).message);
    }
    throw error;
  }
}

export async function updateFolio(
  id: number,
  folio: { id: number; name: string; description: string; ownerId: string },
) {
  try {
    await axios.put(`${API_URL}/Folios/${id}`, folio);
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to update folio:", error.response.data);
    } else {
      console.error("An error occurred while updating the folio:", (error as Error).message);
    }
    throw error;
  }
}

export async function deleteFolio(id: number) {
  try {
    await axios.delete(`${API_URL}/Folios/${id}`, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to delete folio:", error.response.data);
    } else {
      console.error("An error occurred while deleting the folio:", (error as Error).message);
    }
    throw error;
  }
}

export async function addProjectToFolio(folioId: number, projectId: number) {
  try {
    await axios.post(`${API_URL}/Folios/${folioId}/projects`, { projectId });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to add project to folio:", error.response.data);
    } else {
      console.error(
        "An error occurred while adding the project to the folio:",
        (error as Error).message,
      );
    }
    throw error;
  }
}
