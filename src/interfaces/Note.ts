export interface Note {
  _id?: string;
  title: string;
  description: string;
  label?: string;
  labelDescription?: string;
  labelColor?: string;
  favorite?: boolean;
}
