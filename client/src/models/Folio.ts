import type { Project } from "./Project";
import type { User } from "./User";

export interface Folio {
  id: number;
  description: string;
  projects: Project[];
  owner: User;
  ownerId: string;
}
