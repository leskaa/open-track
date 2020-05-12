export interface Material {
  material_id?: number;
  title: string;
  author: string | number;
  description: string;
  views: number;
  rating?: number;
  website: string;
  track: number;
  display_order: number;
}
