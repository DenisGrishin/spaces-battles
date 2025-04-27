import { useDraggable } from './testUseDrag';

export const Test = () => {
  const [draggableRef, dx, dy] = useDraggable({
    gridSize: 40,
  });
  return (
    <div className="container">
      <div
        className="draggable"
        ref={draggableRef}
        style={{
          transform: `translate3d(${dx}px, ${dy}px, 0)`,
        }}
      >
        Drag me
      </div>
    </div>
  );
};
