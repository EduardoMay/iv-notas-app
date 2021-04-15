import { Label } from "./Label";

export interface Note {
  _id?: string;
  title: string;
  description: string;
  label?: Label;
  favorite?: boolean;
}
