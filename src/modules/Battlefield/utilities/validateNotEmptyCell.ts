import { splitString } from '@/utilities';
import { PropsMoveToShip } from './dropToShip';

export const validateNotEmptyCell = ({
  boardState,
  droppableId,
}: Omit<PropsMoveToShip, 'shipId' | 'sizeShip'>) => {
  const [idRow, idCell] = splitString(droppableId, true) as number[];

  let isValue = false;

  boardState.forEach((row, rowIndex) => {
    if (idRow === rowIndex) {
      row.forEach((cell, cellIndex) => {
        if (idCell === cellIndex) {
          isValue = cell ? true : false;
        }
      });
    }
  });

  return isValue;
};
