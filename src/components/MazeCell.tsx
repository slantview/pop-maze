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
            'border-t': ((item.walls & Walls.Top)),
            'border-r': ((item.walls & Walls.Right)),
            'border-b': ((item.walls & Walls.Bottom)),
            'border-l': ((item.walls & Walls.Left)),
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