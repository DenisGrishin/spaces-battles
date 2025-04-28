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

const SIZE_CELL: number = 70;
// ! должен выполнять при dragEnd
const chengeShip = ({
  arr,
  shipId,
  toZone,
}: {
  arr: string[][];
  shipId: any;
  toZone: any;
}) => {
  const emptyArr = arr.map((row) => {
    return row.map((cell) => {
      if (cell === 'a1') return '';

      return cell;
    });
  });

  return emptyArr.map((row, indexRow) => {
    const [idRow, idCell] = toZone.split('-');
    if (indexRow !== Number(idRow)) return row;
    return row.map((cell, cellIndex) => {
      if (Number(idCell) === cellIndex) {
        return 'a1';
      }

      // ! не удаляется потому что проскакивает первый уровень

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

  const ship = <Ship dataShip={'1'} customClassName={styles.cell} />;

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
          </DropCell>
        );
      });

      return [...renderCell];
    });
  }, [stateBattlefield]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;
    const newState = chengeShip({
      arr: stateBattlefield,
      shipId: active.id,
      toZone: over.id,
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
