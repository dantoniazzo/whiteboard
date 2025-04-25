import { Position } from "_shared";

// This tuple type requires at least 2 elements and at most 3 elements
export type Points = [Position, Position] | [Position, Position, Position];
