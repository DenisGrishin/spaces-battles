import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

interface UseDraggableArguments {
  id: string | number;
  attributes?: {
    role?: string;
    roleDescription?: string;
    tabIndex?: number;
  };
  // data?: Record<string, any>;
  disabled?: boolean;
  children: React.ReactNode;
}

export function Draggable({ children, id }: UseDraggableArguments) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : {};

  return (
    <td ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </td>
  );
}
