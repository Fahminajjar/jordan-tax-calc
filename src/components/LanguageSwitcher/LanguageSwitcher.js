import ARImg from "assets/images/ar.png";
import ENImg from "assets/images/en.png";
import { LocalizationContext } from "contexts/LocalizationContext";
import { useContext } from "react";

import styles from "./LanguageSwitcher.module.scss";

const LanguageSwitcher = () => {
  const { changeLanguage } = useContext(LocalizationContext);

  const setEN = () => changeLanguage("en");
  const setAR = () => changeLanguage("ar");

  return (
    <div>
      <img className={styles.lang} src={ARImg} alt="ar" onClick={setAR} /> <span className={styles.separator}>|</span> <img className={styles.lang} src={ENImg} alt="en" onClick={setEN} />
    </div>
  );
};

export default LanguageSwitcher;
