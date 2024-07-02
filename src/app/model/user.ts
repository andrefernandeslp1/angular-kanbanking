import { Project } from "./project";

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  projects: Project[];
}
