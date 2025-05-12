import { DragMoveEvent } from '@dnd-kit/core';

export const moveToShip = ({ event }: { event: DragMoveEvent }) => {
  console.log(event);
};
