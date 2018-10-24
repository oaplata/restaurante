import { Plate } from "./plate";

export interface Order{
  type: string;
  address?: string;
  table?: string;
  plates: Plate[];
  user: string;
  id: string;
  state: string;
}