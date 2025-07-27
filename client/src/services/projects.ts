import axios from "axios";

import type { Project } from "@/models/Project";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getAllProjects() {
  try {
    const response = await axios.get(`${API_URL}/Projects`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch projects:", error.response.data);
    } else {
      console.error("An error occurred while fetching projects:", (error as Error).message);
    }
    throw error;
  }
}

export async function getProjectsByOwner(ownerId: string): Promise<Project[]> {
  try {
    const response = await axios.get(`${API_URL}/Projects/owner/${ownerId}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch projects by owner:", error.response.data);
    } else {
      console.error(
        "An error occurred while fetching projects by owner:",
        (error as Error).message,
      );
    }
    throw error;
  }
}

export async function getProjectById(id: number) {
  try {
    const response = await axios.get(`${API_URL}/Projects/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to fetch project:", error.response.data);
    } else {
      console.error("An error occurred while fetching the project:", (error as Error).message);
    }
    throw error;
  }
}

export async function createProject(
  project: {
    name: string;
    description: string;
  },
  ownerId: string,
) {
  try {
    const response = await axios.post(`${API_URL}/Projects?ownerId=${ownerId}`, project);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to create project:", error.response.data);
    } else {
      console.error("An error occurred while creating the project:", (error as Error).message);
    }
    throw error;
  }
}

export async function updateProject(
  id: number,
  project: { id: number; name: string; description: string; ownerId: string },
) {
  try {
    await axios.put(`${API_URL}/Projects/${id}`, project, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to update project:", error.response.data);
    } else {
      console.error("An error occurred while updating the project:", (error as Error).message);
    }
    throw error;
  }
}

export async function deleteProject(id: number) {
  try {
    await axios.delete(`${API_URL}/Projects/${id}`, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Failed to delete project:", error.response.data);
    } else {
      console.error("An error occurred while deleting the project:", (error as Error).message);
    }
    throw error;
  }
}
