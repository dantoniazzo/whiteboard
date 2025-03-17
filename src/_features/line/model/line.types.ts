// Define a Point type for better reusability
type Point = { x: number; y: number };

// This tuple type requires at least 2 elements and at most 3 elements
export type Points = [Point, Point] | [Point, Point, Point];

// Alternative approach using a rest parameter with a constraint
// export type Points = [Point, Point, Point?];
