import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';
import { useMemo } from 'react';

interface ProsBoard {
  rowsAndColumns: number;
  stateBattlefield: string[][];
}

export function Board({ rowsAndColumns = 5, stateBattlefield }: ProsBoard) {
  // const renderTablet = Array.from({ length: rowsAndColumns }).map((_, i) => {
  //   const renderCells = Array.from({ length: rowsAndColumns }).map((_, i) => {
  //     return (
  //       <td key={i} className={classNames(styles.cell)}>
  //         {''}
  //       </td>
  //     );
  //   });

  //   return (
  //     <tr key={i} className={classNames(styles.row)}>
  //       {...renderCells}
  //     </tr>
  //   );
  // });

  const renderTablet = useMemo(() => {
    return stateBattlefield.map((row, indxRow) => {
      const renderCells = row.map((cell, indxCell) => {
        return (
          <td key={indxCell} className={classNames(styles.cell)}>
            {cell}
          </td>
        );
      });

      return (
        <tr key={indxRow} className={classNames(styles.row)}>
          {...renderCells}
        </tr>
      );
    });
  }, [stateBattlefield]);

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('border-custom')}>
        <Coordinates rowsAndColumns={rowsAndColumns} type="horizontal" />

        <div className={classNames(styles.wrapperTable)}>
          <Coordinates rowsAndColumns={rowsAndColumns} type="vertical" />

          <table className={classNames(styles.tabel)}>{renderTablet}</table>
        </div>
      </div>
    </div>
  );
}
