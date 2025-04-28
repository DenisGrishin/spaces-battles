import classNames from 'classnames';
import styles from './Ship.module.css';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Ship = ({
  dataShip,
  customClassName,
}: {
  dataShip: string;
  customClassName?: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: dataShip,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={classNames(customClassName, {
        [styles.ship]: !!dataShip,
      })}
      {...listeners}
      {...attributes}
    >
      {dataShip}
    </div>
  );
};

export default Ship;
