import classNames from 'classnames';
import styles from './Coordinates.module.css';

export type TTypeCoordinates = 'vertical' | 'horizontal';

const alphabet = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
];

export const Coordinates = ({
  rowsAndColumns,
  type,
}: {
  rowsAndColumns: number;
  type: TTypeCoordinates;
}) => {
  return (
    <ul
      className={classNames(styles.ul, {
        [styles.vertical]: type === 'vertical',
      })}
    >
      {Array.from({
        length: type === 'horizontal' ? rowsAndColumns + 1 : rowsAndColumns,
      }).map((_, i) => {
        let content: string | number = type === 'horizontal' ? i : alphabet[i];

        if (i === 0 && type === 'horizontal') {
          content = '';
        }

        return (
          <li key={i} className={classNames(styles.li)}>
            <span> {content}</span>
          </li>
        );
      })}
    </ul>
  );
};
