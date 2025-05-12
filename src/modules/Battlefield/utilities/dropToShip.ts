interface PropsMoveToShip {
  boardState: string[][];
  shipId: string;
  droppableId: string;
  sizeShip: number;
}

const deleteDragShip = ({
  shipId,
  boardState,
  sizeShip,
}: Omit<PropsMoveToShip, 'droppableId'>) => {
  const shipIdCell: string[] = [];

  for (let i = 1; i <= sizeShip; i++) {
    shipIdCell.push(shipId[0] + i);
  }

  return boardState.map((row) => {
    return row.map((cell) => {
      if (shipIdCell.includes(cell)) {
        return '';
      }
      return cell;
    });
  });
};

// ! должен выполнять при dragEnd
export const dropToShip = ({
  boardState,
  shipId,
  droppableId,
  sizeShip,
}: PropsMoveToShip) => {
  const [rowId, cellId] = droppableId.split('-');

  let count = 0;
  const cor: string[] = [];
  for (let i = 1; i <= sizeShip; i++) {
    cor.push(shipId[0] + i);
  }
  // это прмеенная отвечает если мы поставили на существующтй каробыль
  let error = false;

  const updateBoard = deleteDragShip({ shipId, boardState, sizeShip }).map(
    (row, indexRow) => {
      if (rowId !== String(indexRow)) return row;
      const newRow = [];
      for (let i = 0; i < row.length; i++) {
        const element = row[i];

        if (count || cellId === String(i)) {
          if (element) {
            newRow.push(element);
            error = true;
            break;
          }
          newRow.push(cor[count]);

          if (count === sizeShip - 1) {
            count = 0;
          } else {
            count += 1;
          }

          continue;
        }

        newRow.push(element);
      }

      return newRow;
    }
  );

  return error ? boardState : updateBoard;
};
