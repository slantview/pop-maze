import clsx from "clsx"
import { Cell, Walls } from "../lib/maze"
import chest from '../assets/images/chest.png';
import pirate from '../assets/images/pirate.png';

interface CellProps {
    item: Cell
}

const MazeCell = (props: CellProps) => {
    const { item } = props;

    return (
        <div className={clsx({
            'border-t': ((item.walls & Walls.Top) !== 0),
            'border-r': ((item.walls & Walls.Right) !== 0),
            'border-b': ((item.walls & Walls.Bottom) !== 0),
            'border-l': ((item.walls & Walls.Left) !== 0),
        }, 'border-amber-800 flex justify-center content-center p-2')}>
            {item.end && 
                <img src={chest} className="w-8 h-8" alt="end" />
            }
            {item.start && 
                <img src={pirate} className="w-8 h-8 rounded-full border border-amber-800" alt="start" />
            }
            &nbsp;
        </div>
    )
};

export default MazeCell;