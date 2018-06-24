
import { Point } from './';

export interface ScrimEventInterface {
  type: 'WAS_CREATED'| 'WAS_DELETED' | 'WAS_MOVE' | 'WAS_RESIZED' | 'RESIZE' | 'MOVE';
  id: string;
  name: string;
  position: Point;
  width: number;
  heigth: number;
  setId(value: string): void;
  setName(value: string): void;
}
