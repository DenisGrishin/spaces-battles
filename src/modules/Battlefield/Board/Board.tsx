import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';
import { useMemo, useState } from 'react';
import Ship from './components/Ship/Ship';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';

import { createSnapModifier } from '@dnd-kit/modifiers';
import { DropCell } from '@/modules/DropCell';
import { TableBoard } from './components/TabelBoard';
import { createBorderShip, deleteBorderShip, dropToShip } from '../utilities';
import { ProsBoard } from './type';

const SIZE_CELL: number = 70;

export function Board({
  rowsAndColumns = 5,
  stateBattlefield,
  dispatch,
}: ProsBoard) {
  const snapToGridModifier = createSnapModifier(SIZE_CELL);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const ships = [{ dataShip: 'a-1', sizeShip: 'small' }, { dataShip: 'b-1' }];

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
            {ships.map((shipData) => {
              return (
                cell === shipData.dataShip && (
                  <Ship
                    key={shipData.dataShip}
                    dataShip={shipData.dataShip}
                    sizeShip={shipData.sizeShip as 'small'}
                  />
                )
              );
            })}
          </DropCell>
        );
      });

      return [...renderCell];
    });
  }, [stateBattlefield]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const notActiveShipStateBattlefield = dropToShip({
      boardState: stateBattlefield,
      shipId: active.id as string,
      droppableId: over.id as string,
      sizeShip: active.data.current?.length,
    });

    const notActiveBoadrdStateBattlefield = deleteBorderShip({
      boardState: notActiveShipStateBattlefield,
      shipId: active.id as string,
    });

    const borderStateBattlefield = createBorderShip({
      boardState: notActiveBoadrdStateBattlefield,
      shipId: active.id as string,
      droppableId: over.id as string,
      sizeShip: active.data.current?.length,
    });

    console.log(borderStateBattlefield);
    dispatch({
      type: 'updateStateBattlefield',
      newStateBattlefield: borderStateBattlefield as string[][],
    });
    setActiveId(null);
  }

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('border-custom')}>
        <Coordinates rowsAndColumns={rowsAndColumns} type="horizontal" />

        <div className={classNames(styles.wrapperTable)}>
          <Coordinates rowsAndColumns={rowsAndColumns} type="vertical" />

          <DndContext
            onDragStart={handleDragStart}
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

            <DragOverlay>
              {ships.map((shipData) => {
                return (
                  activeId === shipData.dataShip && (
                    <Ship
                      key={shipData.dataShip}
                      dataShip={shipData.dataShip}
                      sizeShip={shipData.sizeShip as 'small'}
                    />
                  )
                );
              })}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
