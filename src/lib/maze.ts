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
	 * Width is the width of the maze.
	 * 
	 * @type number
	 */
	width: number;

	/** 
	 * Height is the height of the maze.
	 * 
	 * @type number
	 */
	height: number;

	/**
	 * currentEnd is the currently selected end cell.
	 * 
	 * @type Cell | undefined
	 */
	currentEnd: Cell | undefined = undefined;

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

		// Generate maze. If we don't get an end oppposite side from start, regenerate. Max out at 10.
		for (let i = 0; i < 10; i++) {
			this.reset();
			this.generate();
			// Sometimes it can't find an end on opposite side. We'll just regenerate if it's on the same side.
			if (typeof this.currentEnd !== 'undefined') {
				break;
			}
		}
	}

	/**
	 * Reset internal data structures.
	 */
	reset() {
		// Initialize cells for the maze.
		for (let i = 0; i < this.width * this.height; i++) {
			this.data.push(new Cell(i));
		}
		this.stack = [];
	}

	/**
	 * Check if cell is on top edge.
	 * 
	 * @param cell - The cell to check.
	 * @returns true if cell is on top edge, false otherwise.
	 */
	isTopEdge(cell: Cell): boolean {
		return cell.index < this.width;
	}

	/**
	 * Check if cell is on left edge.
	 * 
	 * @param cell - The cell to check.
	 * @returns true if cell is on left edge, false otherwise.
	 */
	isLeftEdge(cell: Cell): boolean {
		return (cell.index % this.width) === 0;
	}

	/**
	 * Check if cell is on right edge.
	 * 
	 * @param cell - The cell to check.
	 * @returns true if cell is on right edge, false otherwise.
	 */
	isRightEdge(cell: Cell): boolean {
		return (cell.index % this.width) === (this.width - 1);
	}

	/**
	 * Check if cell is on bottom edge.
	 * 
	 * @param cell - The cell to check.
	 * @returns true if cell is on bottom edge, false otherwise.
	 */
	isBottomEdge(cell: Cell): boolean {
		return cell.index > ((this.width * this.height) - this.width) && cell.index < (this.width * this.height);
	}

	/**
	 * isEdge checks to see if we are on an edge.
	 * 
	 * @param cell - The cell to check if it's on an edge.
	 * @returns true if cell is on an edge, false otherwise.
	 */
	 isEdge(cell: Cell): boolean {
		return (
			// Cell is in first row.
			this.isTopEdge(cell) ||
			// Cell is on left side.
			this.isLeftEdge(cell) || 
			// Cell is on right side.
			this.isRightEdge(cell) ||
			// Cell is in last row.
			this.isBottomEdge(cell)
		);
	}

	/**
	 * Check if edge is able to be used as end.
	 * 
	 * @param cell - The cell to check.
	 * @returns true if cell is on right or bottom edge, false otherwise.
	 */
	canPlaceEnd(cell: Cell): boolean {
		return this.isRightEdge(cell) || this.isBottomEdge(cell);
	}

	/**
	 *  Recursively generate maze via Randomized Depth-First Search using recursive backtracking.
	 *  See https://en.wikipedia.org/wiki/Maze_generation_algorithm#Randomized_depth-first_search for more details.
	 */
	generate() {
		console.log("Generating maze.")
		// Set current to zero indexed cell.
		let current: Cell = this.data[0];
		// Set current to start.
		current.start = true;
		// Track furtest distance cell for end.
		let distance: number = 0;
		// Track number of visited cells.
		let visited: number = 1;

		// Do a bounded loop. Once we have visited all cells, we can exit safely.
		while (visited <= this.width * this.height) {
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
			if (southIdx <= (this.width * this.height) - 1 && !this.data[southIdx].visited) {
				neighbors.push(this.data[southIdx]);
			}

			// Find our western neighbor. If it exists and has not been visited, push into neighbors array.
			const westIdx = current.index - 1;
			if (westIdx >= 0 && current.index % this.width !== 0 && !this.data[westIdx].visited) {
				neighbors.push(this.data[westIdx]);
			}

			// If neighbors is empty but we still have stack items, start to backtrack.
			if (neighbors.length === 0) {
				// If we are further from the start and we can place the end, move end pointer to current.
				if (this.stack.length > distance && this.canPlaceEnd(current)) {
					if (this.currentEnd) {
						this.currentEnd.end = false
					}
					current.end = true;
					this.currentEnd = current
				} 

				// Pop the stack to get the next cell.
				const nextCell = this.stack.pop();

				// If we are at the end of the stack, break the loop.
				if (!nextCell) {
					break;
				}
				// Set the current cell to next.
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
				distance = this.stack.length;
				this.stack.push(current);
				current = nextCell;
			}
		}
	}
}

export class Cell {
	/**
	 * The current index of the cell.
	 * 
	 * @type number
	 */
	index: number;

	/**
	 * The current walls of the cell. (See enum Walls)
	 * 
	 * @type number
	 */
	walls: number;

	/**
	 * Has the cell been visited yet.
	 * 
	 * @type boolean
	 */
	visited: boolean = false;

	/**
	 * Is this the starting cell.
	 * 
	 * @type boolean
	 */
	start: boolean = false;

	/**
	 * Is this the ending cell.
	 * 
	 * @type boolean
	 */
	end: boolean = false;

	constructor(idx: number) {
		this.index = idx;
		this.walls = Walls.All;
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