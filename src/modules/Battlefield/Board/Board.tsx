import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';
import { useMemo, useRef } from 'react';
import Ship from './components/Ship/Ship';
import { DndContext, Modifier } from '@dnd-kit/core';

import { restrictToBoundingRect } from '../utilities/restrictToBoundingRect';
import { createSnapModifier } from '@dnd-kit/modifiers';

interface ProsBoard {
  rowsAndColumns: number;
  stateBattlefield: string[][];
}

const restrictToParentElement: Modifier = ({
  containerNodeRect,
  draggingNodeRect,
  transform,
}) => {
  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
};

export function Board({ rowsAndColumns = 5, stateBattlefield }: ProsBoard) {
  const snapToGridModifier = createSnapModifier(70);

  const renderTablet = useMemo(() => {
    return stateBattlefield.flat().map((cell, indxRow) => {
      return (
        <div key={indxRow} className={classNames(styles.cell)}>
          {cell}
        </div>
      );
    });
  }, [stateBattlefield]);

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('border-custom')}>
        <Coordinates rowsAndColumns={rowsAndColumns} type="horizontal" />

        <div className={classNames(styles.wrapperTable)}>
          <Coordinates rowsAndColumns={rowsAndColumns} type="vertical" />

          <DndContext modifiers={[restrictToParentElement, snapToGridModifier]}>
            <div
              className={classNames(styles.tabel)}
              style={{ gridTemplateColumns: `repeat(${rowsAndColumns}, 1fr)` }}
            >
              {renderTablet}
            </div>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
