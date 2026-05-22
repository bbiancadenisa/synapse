import { SUBJECT_COLORS } from '../../utils/constants';
import styles from './ColorPicker.module.css';

type Props = {
  value: string;
  onChange: (color: string) => void;
};

export const ColorPicker = ({ value, onChange }: Props) => {
  return (
    <div className={styles.wrapper}>
      {SUBJECT_COLORS.map((color) => (
        <div
          key={color}
          className={`${styles.circle} ${value === color ? styles.active : ''}`}
          style={{ background: color }}
          onClick={() => onChange(color)}
        />
      ))}
    </div>
  );
};
