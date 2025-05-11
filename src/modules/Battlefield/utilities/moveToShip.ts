import { UniqueIdentifier } from '@dnd-kit/core';

interface PropsMoveToShip {
  boardState: string[][];
  shipId: string;
  nextCoordinates: string[];
  prevCoordinates: string[];
}

// ! функция которая разбивает строку на координаты
// 0 : "1-0"
// 1 : "1-1"
// 2 : "1-2"
const getCoordinates = (coordinates): number[] => {};

const deleteDragShip = ({
  boardState,
  prevCoordinates,
}: Omit<PropsMoveToShip, 'toZone' | 'nextCoordinates' | 'shipId'>) => {
  const newBoard = [];

  const idsCell = prevCoordinates.map((el) => el.split('-')[1]);

  for (let i = 0; i < boardState.length; i++) {
    const newRow = boardState[i].map((cell: string, index: number) => {
      if (idsCell.includes(String(index))) {
        return '';
      }

      return cell;
    });

    newBoard.push(newRow);
  }

  return newBoard;
};

// ! должен выполнять при dragEnd
export const moveToShip = ({
  boardState,
  shipId,
  nextCoordinates,
  prevCoordinates,
}: PropsMoveToShip) => {
  const idsCell = nextCoordinates.map((el) => el.split('-')[1]);
  const idsRow = nextCoordinates.map((el) => el.split('-')[0]);

  return deleteDragShip({ boardState, prevCoordinates }).map(
    (row, indexRow) => {
      if (!idsRow.includes(String(indexRow))) {
        return row;
      }
      return row.map((cell, indexCell) => {
        if (idsCell.includes(String(indexCell))) {
          return 'a' + indexCell;
        }

        return cell;
      });
    }
  );
};
