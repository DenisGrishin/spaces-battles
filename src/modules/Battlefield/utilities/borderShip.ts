import { splitString } from '@/utilities';
import { PropsMoveToShip } from './dropToShip';

export const deleteBorderShip = ({
  boardState,
  shipId,
}: Omit<PropsMoveToShip, 'droppableId' | 'sizeShip'>) => {
  const [firstSymbol] = splitString(shipId);

  const cellBorder = `b-${firstSymbol}`;

  return boardState.map((row) => {
    return row.map((cell) => {
      if (cellBorder === cell) {
        return '';
      }
      return cell;
    });
  });
};

export const createBorderShip = ({
  boardState,
  shipId,
  sizeShip,
  droppableId,
}: PropsMoveToShip) => {
  const [shipFirstSymbol] = splitString(shipId);
  const cellBorder = `b-${shipFirstSymbol}`;
  const [idRow, idCell] = splitString(droppableId, true) as number[];

  let count = 0;
  let isStart = false;
  const rowStart = idRow - 1;
  // длина бордера start и end
  const lengthBorder = sizeShip + 1;

  const rowEnd = idRow + 1;

  const cellStart = idCell - 1;
  const cellEnd = idCell + sizeShip;

  const cor: string[] = [];
  for (let i = 1; i <= sizeShip; i++) {
    cor.push(shipId[0] + i);
  }

  return boardState.map((row, rowIndex) => {
    if (rowStart === rowIndex || rowEnd === rowIndex) {
      return row.map((cell, cellIndex) => {
        if (cellStart === cellIndex) {
          count++;
          isStart = true;

          return cellBorder;
        }
        if (isStart && count <= lengthBorder) {
          count++;

          return cellBorder;
        } else {
          isStart = false;
          count = 0;
        }

        return cell;
      });
    }
    if (idRow === rowIndex) {
      return row.map((cell, cellIndex) => {
        if (cellStart === cellIndex || cellEnd === cellIndex) {
          return cellBorder;
        }

        return cell;
      });
    }
    return row;
  });
};
