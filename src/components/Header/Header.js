import JordanMapImg from "assets/images/jordanMap.png";
import LanguageSwitcher from "components/LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

import styles from "./Header.module.scss";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <div className={styles.title}>
        <img className={styles.logo} src={JordanMapImg} alt="" />
        <h1>{t("header.title")}</h1>
      </div>

      <LanguageSwitcher />
    </div>
  );
};

export default Header;
