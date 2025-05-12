import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';
import { useMemo } from 'react';
import Ship from './components/Ship/Ship';
import {
  DndContext,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
} from '@dnd-kit/core';

import { createSnapModifier } from '@dnd-kit/modifiers';
import { DropCell } from '@/modules/DropCell';
import { TableBoard } from './components/TabelBoard';
import { dropToShip, moveToShip } from '../utilities';
import { ProsBoard } from './type';

const SIZE_CELL: number = 70;

export function Board({
  rowsAndColumns = 5,
  stateBattlefield,
  dispatch,
}: ProsBoard) {
  const snapToGridModifier = createSnapModifier(SIZE_CELL);

  const ship = <Ship dataShip={'a1'} sizeShip="small" />;
  const ship2 = <Ship dataShip={'b1'} />;

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
    const newStateBattlefield = dropToShip({
      boardState: stateBattlefield,
      shipId: active.id as string,
      droppableId: over.id as string,
      sizeShip: active.data.current?.length,
    });

    dispatch({
      type: 'updateStateBattlefield',
      newStateBattlefield: newStateBattlefield as string[][],
    });
  }

  function handleDragMove(event: DragMoveEvent) {
    console.log(event);

    moveToShip(event);
  }
  function handleDragOver(event: DragOverEvent) {
    const test = ['4-3'];
    console.log(event);
    if (test.includes(String(event.over?.id))) {
      event.active.data.current.isError = true;
    }

    // TODO запоменаем расположение коорднинат короблей и тогда при перетаскивание всегда проряем точку
  }
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('border-custom')}>
        <Coordinates rowsAndColumns={rowsAndColumns} type="horizontal" />

        <div className={classNames(styles.wrapperTable)}>
          <Coordinates rowsAndColumns={rowsAndColumns} type="vertical" />

          <DndContext
            onDragMove={handleDragMove}
            onDragOver={handleDragOver}
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
