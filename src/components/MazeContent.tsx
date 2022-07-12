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
        // <div className={clsx('grid grid-container gap-0', 'grid-cols-'+maze.width, 'm-8 bg-amber-500 w-96 h-96 border-amber-800 border-4')}>
        <div className="grid grid-cols-10 w-96 bg-amber-500 m-8 border-amber-800 border-4">
            { maze.data.map((item, i) => (
               <MazeCell item={item} />
            ))}
        </div>
    );
};

export default MazeContent;