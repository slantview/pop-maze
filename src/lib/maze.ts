import { randomBytes } from "crypto";

/**
 * Maze is the base class for creating a maze. 
 */
export class Maze {
	/** 
	 * Stack is used to keep track of where we are during the maze building.
	 * 
	 * @type Array<Cell> 
	 */
	stack: Array<Cell>;

	/** 
	 * Data is used to keep a single dimensional array of all cells. Size is defined by width * height;
	 * 
	 * @type Array<Cell> 
	 */
	data: Array<Cell>;

	/** 
	 * Data is used to keep a single dimensional array of all cells. Size is defined by width * height;
	 * 
	 * @type number
	 */
	width: number;

	/** 
	 * Data is used to keep a single dimensional array of all cells. Size is defined by width * height;
	 * 
	 * @type number
	 */
	height: number;

	/**
	 * Initialize the data cells as specified by width and height. 
	 * 
	 * @param width - The width of the maze.
	 * @param height - The height of the maze.
	 */
	constructor(width: number, height: number) {
		this.stack = [];
		this.data = [];
		this.width = width;
		this.height = height;

		// Initialize cells for the maze.
		for (let i = 0; i < width * height; i++) {
			this.data.push(new Cell(i));
		}

		// Generate maze.
		this.generate();
	}

	/**
	 *  Recursively generate maze via Randomized Depth-First Search using recursive backtracking.
	 *  See https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search for more details.
	 */
	generate() {
		// Set current to zero indexed cell.
		let current: Cell = this.data[0];
		let visited: number = 1;

		// Do a bounded loop. Once we have visited all cells, we can exit safely.
		while (visited <= this.width * this.height) {
			console.log(`Visiting cell #${current.index}`)
			// Mark current cell as visited and increment our visited counter.
			if (!current.visited) {
				current.visited = true;
				visited++;
			}

			// Initialize neighbors for a cell.
			let neighbors: Array<Cell> = [];

			// Find our northern neighbor. If it exists and has not been visited, push into neighbors array.
			const northIdx = current.index - this.width;
			if (northIdx >= 0 && current.index >= this.width && !this.data[northIdx].visited) {
				neighbors.push(this.data[northIdx]);
			}

			// Find our eastern neighbor. If it exists and has not been visited, push into neighbors array.
			const eastIdx = current.index + 1;
			if (eastIdx < (this.width * this.height) && current.index % this.width !== this.width - 1 && !this.data[eastIdx].visited) {
				neighbors.push(this.data[eastIdx]);
			}

			// Find our southern neighbor. If it exists and has not been visited, push into neighbors array.
			const southIdx = current.index + this.width;
			if (southIdx <= (this.width * this.height) - this.width && !this.data[southIdx].visited) {
				neighbors.push(this.data[southIdx]);
			}

			// Find our western neighbor. If it exists and has not been visited, push into neighbors array.
			const westIdx = current.index - 1;
			if (westIdx >= 0 && current.index % this.width !== 0 && !this.data[westIdx].visited) {
				neighbors.push(this.data[westIdx]);
			}

			// If neighbors is empty but we still have stack items, start to backtrack.
			if (neighbors.length === 0) {
				const nextCell = this.stack.pop();
				// If we are at the end of the stack, break the loop.
				if (!nextCell) {
					break;
				}
				current = nextCell;
			} else {
				// First find the next cell via random selection.
				const nextCell = neighbors[Math.floor(Math.random() * neighbors.length)];

				// Next remove the walls on both sides of the cell and neighbor cell.
				switch (nextCell.index) {
					case northIdx:
						current.removeWall(Walls.Top);
						nextCell.removeWall(Walls.Bottom);
						break;
					case eastIdx:
						current.removeWall(Walls.Right);
						nextCell.removeWall(Walls.Left);
						break;
					case southIdx:
						current.removeWall(Walls.Bottom);
						nextCell.removeWall(Walls.Top);
						break;
					case westIdx:
						current.removeWall(Walls.Left);
						nextCell.removeWall(Walls.Right);
						break;
				}

				// Push current cell onto stack and move current pointer to next.
				this.stack.push(current);
				current = nextCell;
			}
		}
	}
}

/**
 * Walls define the set of walls that each cell can have.
 */
export enum Walls {
	Top = 0x0001,
	Right = 0x0010,
	Bottom = 0x0100,
	Left = 0x1000,
	All = 0x1111
};

export class Cell {
	index: number;
	walls: number = Walls.All;
	visited: boolean = false;

	constructor(idx: number) {
		this.index = idx;
	}

	/**
	 * addWall adds walls to the cell as defined by target. Can be any number of walls defined in Walls. 
	 * 
	 * @param target - Which wall(s) to add.
	 */
	addWall(target: number) {
		this.walls |= target;
	}

	/**
	 * removeWall removes walls from the cell as defined by target. Can be any number of walls defined in Walls.
	 * 
	 * @param target - Which wall(s) to remove.
	 */
	removeWall(target: number) {
		this.walls &= ~target;
	}

}

export default Maze;