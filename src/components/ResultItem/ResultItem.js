import cx from "classnames";

import styles from "./ResultItem.module.scss";

const ResultItem = ({ title, value, leftBorder }) => (
  <div className={cx(styles.resultItem, { [styles.leftBorder]: !!leftBorder })}>
    <h6>{title}:</h6>
    <span className={styles.primaryText}>{value}</span>
  </div>
);

export default ResultItem;
