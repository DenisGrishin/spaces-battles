import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';
import { type Dispatch, useMemo } from 'react';
import Ship from './components/Ship/Ship';
import { DndContext, DragEndEvent } from '@dnd-kit/core';

import {
  createSnapModifier,
  restrictToParentElement,
} from '@dnd-kit/modifiers';
import { DropCell } from '@/modules/DropCell';
import { TableBoard } from './components/TabelBoard';
import { Action } from '@/store/ContextSetting/type';

interface ProsBoard {
  rowsAndColumns: number;
  stateBattlefield: string[][];
  dispatch: Dispatch<Action>;
}

interface PropsMoveToShip {
  boardState: string[][];
  shipId: string;
  toZone: string;
}

const SIZE_CELL: number = 70;
const deleteDragShip = ({
  boardState,
  shipId,
}: Omit<PropsMoveToShip, 'toZone'>) => {
  return boardState.map((row) => {
    return row.map((cell) => {
      if (cell === shipId) return '';

      return cell;
    });
  });
};

// ! должен выполнять при dragEnd
const moveToShip = ({ boardState, shipId, toZone }: PropsMoveToShip) => {
  return deleteDragShip({ boardState, shipId }).map((row, indexRow) => {
    const [idRow, idCell] = toZone.split('-');
    if (indexRow !== Number(idRow)) return row;

    return row.map((cell, cellIndex) => {
      if (Number(idCell) === cellIndex) {
        return shipId;
      }

      return cell;
    });
  });
};
export function Board({
  rowsAndColumns = 5,
  stateBattlefield,
  dispatch,
}: ProsBoard) {
  const snapToGridModifier = createSnapModifier(SIZE_CELL);

  const ship = <Ship dataShip={'a1'} customClassName={styles.cell} />;
  const ship2 = <Ship dataShip={'b1'} customClassName={styles.cell} />;

  const renderTablet = useMemo(() => {
    return stateBattlefield.map((row, rowIndex, arr) => {
      const renderCell = row.map((cell, cellIndex) => {
        return (
          <DropCell
            key={`${rowIndex}-${cellIndex}`}
            id={`${rowIndex}-${cellIndex}`}
            className={styles.cell}
            arr={arr}
          >
            {cell === 'a1' && ship}
            {cell === 'b1' && ship2}
          </DropCell>
        );
      });

      return [...renderCell];
    });
  }, [stateBattlefield]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const newState = moveToShip({
      boardState: stateBattlefield,
      shipId: active.id as string,
      toZone: over.id as string,
    });

    dispatch({ type: 'updateStateBattlefield', newStateBattlefield: newState });
  }

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('border-custom')}>
        <Coordinates rowsAndColumns={rowsAndColumns} type="horizontal" />

        <div className={classNames(styles.wrapperTable)}>
          <Coordinates rowsAndColumns={rowsAndColumns} type="vertical" />

          <DndContext
            onDragEnd={handleDragEnd}
            modifiers={[snapToGridModifier]}
          >
            <TableBoard
              className={styles.tabel}
              sizeBoard={`${rowsAndColumns * SIZE_CELL}px`}
              rowsAndColumns={rowsAndColumns}
            >
              {renderTablet}
            </TableBoard>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
