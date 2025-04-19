import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
import classNames from 'classnames';

import styles from './Board.module.css';

export function Board({
  rows = 5,
  columns = 5,
}: {
  rows: number;
  columns: number;
}) {
  const renderRows = (rows: number, columns: number) => {
    return Array.from({ length: rows }).map((row, i) => {
      const renderCells = Array.from({ length: columns }).map((cell, i) => {
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
      <ResizablePanelGroup
        direction="horizontal"
        className={classNames(styles.resizablePanelGroup)}
      >
        <ResizablePanel defaultSize={0}>
          <table>{renderRows(rows, columns)}</table>
        </ResizablePanel>
        <ResizableHandle />
      </ResizablePanelGroup>
    </div>
  );
}
