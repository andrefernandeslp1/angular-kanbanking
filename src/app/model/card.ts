import { Task } from "./task";

export interface Card {
  id?: number;
  title: string;
  description: string;
  tasks: Task[];

}
