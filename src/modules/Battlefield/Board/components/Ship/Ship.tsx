import classNames from 'classnames';
import styles from './Ship.module.css';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const Ship = ({
  dataShip,
  index,
  customClassName,
}: {
  dataShip: string;
  index: number;
  customClassName: string;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: index,
  });
  const style = transform
    ? {
        transform: CSS.Translate.toString(transform),
      }
    : {};

  return (
    <td
      className={(classNames(styles.cell), customClassName)}
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div
        className={classNames({
          [styles.ship]: !!dataShip,
        })}
      >
        {dataShip}
      </div>
    </td>
  );
};

export default Ship;
