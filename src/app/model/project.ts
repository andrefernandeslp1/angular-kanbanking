import { Card } from "./card";

export interface Project {
  id?: number;
  title: string;
  description: string;
  cards: Card[];
  userId: number;
}
