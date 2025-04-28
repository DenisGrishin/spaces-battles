import React from 'react';

export function TableBoard({
  children,
  className,
  rowsAndColumns,
  sizeBoard,
}: {
  children: React.ReactNode;
  className: string;
  rowsAndColumns: number;
  sizeBoard: string;
}) {
  const style = {
    gridTemplateColumns: `repeat(${rowsAndColumns}, 1fr)`,
    gridTemplateRows: `repeat(${rowsAndColumns}, 1fr)`,
    width: sizeBoard,
    height: sizeBoard,
  };

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
