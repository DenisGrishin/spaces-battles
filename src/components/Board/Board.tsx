import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';

interface ProsBoard {
  rowsAndColumns: number;
}

export function Board({ rowsAndColumns = 5 }: ProsBoard) {
  const renderRows = (rowsAndColumns: number) => {
    return Array.from({ length: rowsAndColumns }).map((_, i) => {
      const renderCells = Array.from({ length: rowsAndColumns }).map((_, i) => {
        return <td className={classNames(styles.cell)}>{i + 1}</td>;
      });

      return (
        <tr key={i} className={classNames(styles.row)}>
          {...renderCells}
        </tr>
      );
    });
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames('border-custom')}>
        <Coordinates rowsAndColumns={rowsAndColumns} type="horizontal" />

        <div className={classNames(styles.wrapperTable)}>
          <Coordinates rowsAndColumns={rowsAndColumns} type="vertical" />

          <table className={classNames(styles.tabel)}>
            {renderRows(rowsAndColumns)}
          </table>
        </div>
      </div>
    </div>
  );
}
