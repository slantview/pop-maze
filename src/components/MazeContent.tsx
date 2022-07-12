import React from 'react';
import Maze from '../lib/maze';
import MazeCell from './MazeCell';

interface MazeProps {
    maze: Maze
};
const MazeContent = (props: MazeProps) => {
    const { maze } = props;
    const width: number = maze.width * 3;
    const height: number = maze.height * 3;

    return (
        <div
            className={"bg-amber-500 mb-8 border-amber-800 border-4 grid grid-cols-10"}
            style={{ height: `${height}rem`, width: `${width}rem` }}
        >
            {maze.data.map((item, i) => (
                <MazeCell item={item} />
            ))}
        </div>
    );
};

export default MazeContent;