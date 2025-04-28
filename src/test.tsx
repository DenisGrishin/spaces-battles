import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';

function DraggableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    width: 100,
    height: 50,
    backgroundColor: 'skyblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'grab',
    borderRadius: '8px',
  };

  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={style}>
      {id}
    </div>
  );
}

function DroppableZone({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  const style = {
    width: 200,
    minHeight: 150,
    backgroundColor: isOver ? 'lightgreen' : 'lightgray',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '16px',
    borderRadius: '12px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

export function Test() {
  const [zones, setZones] = useState({
    todo: ['Task 1', 'Task 2'],
    doing: ['Task 3'],
    done: [],
  });

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const fromZone = findZoneByTask(active.id);
    const toZone = over.id;

    if (fromZone && toZone && fromZone !== toZone) {
      setZones((prev) => {
        const newZones = { ...prev };
        // Удаляем из старой зоны
        newZones[fromZone] = newZones[fromZone].filter(
          (task) => task !== active.id
        );
        // Добавляем в новую
        newZones[toZone].push(active.id);
        return newZones;
      });
    }
  };

  const findZoneByTask = (taskId) => {
    return Object.keys(zones).find((zone) => zones[zone].includes(taskId));
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', gap: '24px' }}>
        {Object.entries(zones).map(([zoneId, tasks]) => (
          <DroppableZone key={zoneId} id={zoneId}>
            <h3 style={{ textAlign: 'center' }}>{zoneId.toUpperCase()}</h3>
            {tasks.map((task) => (
              <DraggableItem key={task} id={task} />
            ))}
          </DroppableZone>
        ))}
      </div>
    </DndContext>
  );
}
