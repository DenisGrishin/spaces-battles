import classNames from 'classnames';
import styles from './Ship.module.css';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export type SizeShip = 'verySmall' | 'small';

const Ship = ({
  dataShip,
  customClassName = '',
  sizeShip = 'verySmall',
}: {
  dataShip: string;
  customClassName?: string;
  sizeShip?: SizeShip;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: dataShip,
    data: {
      length: sizeShip === 'verySmall' ? 1 : 2,
    },
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
      className={classNames(styles[customClassName], {
        [styles[sizeShip]]: !!sizeShip,
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
