import { Position } from '_shared';

export type Points = [Position, Position, Position];

export interface ILine {
  id: string;
  points: Points;
}
