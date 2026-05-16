## Flood Fill Visualizer

A lightweight TypeScript implementation of the Flood Fill algorithm using Breadth-First Search (BFS). It processes a 2D image grid and dynamically renders the colored output directly to the DOM.

## How It Works

Starts from a designated pixel coordinate (sr, sc).
Changes the color of the starting pixel to newColor.
Spreads horizontally and vertically (4-directional neighbors) to update any connected pixels sharing the exact same starting color.

## Key Features

Type-Safe: Built with TypeScript using strongly-typed Enums, Interfaces, and custom tuple types.
Queue-Based BFS: Prevents Stack Overflow errors by avoiding recursion for large grids.
DOM Integration: Automatically maps the resulting numerical grid into CSS-styled grid cells.
