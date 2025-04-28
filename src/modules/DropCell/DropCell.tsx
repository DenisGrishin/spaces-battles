import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export function DropCell({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  arr: string[][];
}) {
  const { setNodeRef } = useDroppable({
    id,
  });

  return (
    <div ref={setNodeRef} className={className}>
      {children}
    </div>
  );
}
