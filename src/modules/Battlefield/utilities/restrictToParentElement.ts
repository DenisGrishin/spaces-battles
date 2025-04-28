import { Modifier } from '@dnd-kit/core';
import { restrictToBoundingRect } from './restrictToBoundingRect';

export const restrictToParentElement: Modifier = ({
  containerNodeRect,
  draggingNodeRect,
  transform,
}) => {
  if (!draggingNodeRect || !containerNodeRect) {
    return transform;
  }

  return restrictToBoundingRect(transform, draggingNodeRect, containerNodeRect);
};
