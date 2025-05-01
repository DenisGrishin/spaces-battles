interface PropsMoveToShip {
  boardState: string[][];
  shipId: string;
  toZone: string;
}

const deleteDragShip = ({
  boardState,
  shipId,
}: Omit<PropsMoveToShip, 'toZone'>) => {
  return boardState.map((row) => {
    return row.map((cell) => {
      if (cell === shipId) return '';

      return cell;
    });
  });
};

// ! должен выполнять при dragEnd
export const moveToShip = ({ boardState, shipId, toZone }: PropsMoveToShip) => {
  return deleteDragShip({ boardState, shipId }).map((row, indexRow) => {
    const [idRow, idCell] = toZone.split('-');
    if (indexRow !== Number(idRow)) return row;

    return row.map((cell, cellIndex) => {
      if (Number(idCell) === cellIndex) {
        return shipId;
      }

      return cell;
    });
  });
};
