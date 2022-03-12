import cx from "classnames";
import Spinner from "react-bootstrap/Spinner";

import styles from "./Loading.module.scss";

const Loading = ({ children, isLoading, fullPage }) => {
  if (isLoading) {
    return (
      <div className={cx(styles.container, { [styles.fullPage]: fullPage })}>
        <Spinner animation="grow" size="lg"/>
      </div>
    );
  }

  return <>{children}</>
};

export default Loading;
