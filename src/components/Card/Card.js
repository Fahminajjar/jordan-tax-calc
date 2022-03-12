import styles from "./Card.module.scss";

const Card = ({ children }) => (
  <div className={styles.card}>{children}</div>
);

Card.Title = ({ children }) => <h4 className={styles.title}>{children}</h4>;

export default Card;
