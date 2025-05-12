import { DndContext, useDraggable } from '@dnd-kit/core';
import { RestrictToElement } from '@dnd-kit/dom/modifiers';
import { useRef } from 'react';

function DraggableBox({ id, containerRef }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    modifiers: [
      RestrictToElement.configure({
        element: () => containerRef.current, // Ограничение по контейнеру
      }),
    ],
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'grab',
    position: 'absolute', // Обязательно для перемещения
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      Drag me
    </div>
  );
}

export function Test() {
  const containerRef = useRef(null);

  return (
    <DndContext>
      <div
        ref={containerRef}
        style={{
          width: 400,
          height: 300,
          border: '2px dashed #ccc',
          position: 'relative',
          overflow: 'hidden',
          margin: '50px auto',
        }}
      >
        <DraggableBox id="draggable-1" containerRef={containerRef} />
      </div>
    </DndContext>
  );
}
