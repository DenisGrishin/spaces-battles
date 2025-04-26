import classNames from 'classnames';
import styles from './BoardShips.module.css';
import { Draggable } from './../Draggable/Draggable';

export const BoardShips = () => {
  return (
    <div>
      <Draggable>
        <div className={classNames(styles.ship)}></div>
      </Draggable>
    </div>
  );
};
