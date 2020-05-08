import { Material } from './Material';
import { User } from './User';

export interface Track {
  track_id: number;
  title: string;
  description: string;
  views: number;
  // TODO: Add type guard with User | number
  author: any;
  rating?: number;
  materials?: Material[];
}