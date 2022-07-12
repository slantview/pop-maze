import {Maze, Walls, Cell} from './maze';

test("Maze::isTopEdge", () => {
    const testMaze = new Maze(10, 10);
    expect(testMaze.isTopEdge(testMaze.data[7])).toBe(true);
});

test("Maze::isRightEdge", () => {
    const testMaze = new Maze(10, 10);
    expect(testMaze.isRightEdge(testMaze.data[69])).toBe(true);
});

test("Maze::isBottomEdge", () => {
    const testMaze = new Maze(10, 10);
    expect(testMaze.isBottomEdge(testMaze.data[95])).toBe(true);
});

test("Maze::isLeftEdge", () => {
    const testMaze = new Maze(10, 10);
    expect(testMaze.isLeftEdge(testMaze.data[50])).toBe(true);
});

test("Maze::isEdge 10x10", () => {
    const testMaze = new Maze(10, 10);
    expect(testMaze.isEdge(testMaze.data[7])).toBe(true);
    expect(testMaze.isEdge(testMaze.data[69])).toBe(true);
    expect(testMaze.isEdge(testMaze.data[95])).toBe(true);
    expect(testMaze.isEdge(testMaze.data[50])).toBe(true);
});

test("Maze::isEdge 3x3", () => {
    const testMaze = new Maze(3, 3);
    expect(testMaze.isEdge(testMaze.data[1])).toBe(true);
    expect(testMaze.isEdge(testMaze.data[5])).toBe(true);
    expect(testMaze.isEdge(testMaze.data[8])).toBe(true);
    expect(testMaze.isEdge(testMaze.data[3])).toBe(true);
})

test('Cell has proper id on construction', () => {
    const testCell = new Cell(69);
    expect(testCell.index).toBe(69);
});

test('Cell can add Top Wall', () => {
    const testCell = new Cell(0);
    testCell.walls = 0x0000;
    expect((testCell.walls & Walls.Top) !== 0).toBe(false);
    testCell.addWall(Walls.Top);
    expect((testCell.walls & Walls.Top) !== 0).toBe(true);
    expect((testCell.walls & Walls.Bottom) !== 0).toBe(false);
});

test('Cell can add All Walls', () => {
    const testCell = new Cell(0);
    testCell.walls = 0x0000;
    expect((testCell.walls & Walls.All) !== 0).toBe(false);
    testCell.addWall(Walls.All);
    expect((testCell.walls & Walls.Top) !== 0).toBe(true);
    expect((testCell.walls & Walls.Bottom) !== 0).toBe(true);
    expect((testCell.walls & Walls.Right) !== 0).toBe(true);
    expect((testCell.walls & Walls.Left) !== 0).toBe(true);
});

test('Cell can remove single wall', () => {
    const testCell = new Cell(0);
    testCell.walls = Walls.All;
    expect((testCell.walls & Walls.All) !== 0).toBe(true);
    testCell.removeWall(Walls.Top);
    expect((testCell.walls & Walls.Top) !== 0).toBe(false);
    expect((testCell.walls & Walls.Bottom) !== 0).toBe(true);
    expect((testCell.walls & Walls.Right) !== 0).toBe(true);
    expect((testCell.walls & Walls.Left) !== 0).toBe(true);
});

test('Cell can remove all walls', () => {
    const testCell = new Cell(0);
    testCell.walls = Walls.Top | Walls.Right;
    expect((testCell.walls & Walls.All) !== 0).toBe(true);
    testCell.removeWall(Walls.All);
    expect((testCell.walls & Walls.Top) !== 0).toBe(false);
    expect((testCell.walls & Walls.Bottom) !== 0).toBe(false);
    expect((testCell.walls & Walls.Right) !== 0).toBe(false);
    expect((testCell.walls & Walls.Left) !== 0).toBe(false);
});