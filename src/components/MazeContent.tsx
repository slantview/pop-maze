import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import Maze, { Walls } from '../lib/maze';
import MazeCell from './MazeCell';

interface MazeProps {
    maze: Maze
};
const MazeContent = (props: MazeProps) => {
    const { maze } = props;
    
    return (
        <div className={"bg-amber-500 mb-8 border-amber-800 border-4 grid grid-cols-"+maze.width}>
            { maze.data.map((item, i) => (
               <MazeCell item={item} />
            ))}
        </div>
    );
};

export default MazeContent;