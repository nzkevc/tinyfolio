import type { User } from "./User";

export interface Project {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  owner: User;
  ownerId: string;
  collaborators: User[];
}
