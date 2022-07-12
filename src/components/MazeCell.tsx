import clsx from "clsx"
import { Cell, Walls } from "../lib/maze"

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
        }, 'border-amber-800 grid-col-span-1')}>&nbsp;</div>
    )
};

export default MazeCell;