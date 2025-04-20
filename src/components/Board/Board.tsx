import classNames from 'classnames';

import styles from './Board.module.css';
import { Coordinates } from './components/Coordinates/Coordinates';

interface ProsBoard {
  rowsAndColumns: number;
}

export function Board({ rowsAndColumns = 5 }: ProsBoard) {
  const renderTablet = Array.from({ length: rowsAndColumns }).map((_, i) => {
    const renderCells = Array.from({ length: rowsAndColumns }).map((_, i) => {
      return (
        <td key={i} className={classNames(styles.cell)}>
          {''}
        </td>
      );
    });

    return (
      <tr key={i} className={classNames(styles.row)}>
        {...renderCells}
      </tr>
    );
  });

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
