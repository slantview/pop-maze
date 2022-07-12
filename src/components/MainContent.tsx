import React, { useEffect, useState } from 'react';
import MazeContent from './MazeContent';
import island from '../assets/images/island-header.png';
import Maze from '../lib/maze';

const MainContent = () => {
    const [width, setWidth] = useState(10);
    const [height, setHeight] = useState(10);
    const [maze, setMaze] = useState(new Maze(width, height));

    useEffect(() => {
      let active = true;
    
      if (active) {
        regenerate();
      }

      return () => {
        active = false
      }
    }, []);

    function regenerate() {
        const newMaze = new Maze(width, height);
        setMaze(newMaze);
    }
    
    return (
        <main className="mx-auto flex flex-col align-middle content-center justify-center">
            <div className='flex flex-col justify-center align-middle content-center'>
                <div className='w-full justify-center'>
                    <MazeContent maze={maze} />
                    {/* <img src={island} className="w-40" alt="island" /> */}
                </div>
                <button 
                    onClick={regenerate} 
                    className='px-4 py-2 rounded-md shadow-md shadow-amber-900 text-white text-2xl bg-amber-600 hover:bg-amber-500 transition delay-75 hover:duration-150 active:duration-100 ease-in-out hover:-translate-y-1 active:translate-y-1'
                >
                    Regenerate
                </button>
            </div>
            
            
        </main>
    );
};

export default MainContent;