import ResultItem from "components/ResultItem/ResultItem";
import { useTranslation } from "react-i18next";

import styles from "./TaxResult.module.scss";

const TaxResult = ({ result }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.result}>
      <h4 className={styles.resultTitle}>{t("taxResult.title")}</h4>

      <div className={styles.resultItems}>
        <ResultItem title={t("taxResult.monthlyTax")} value={`JOD ${result.tax}`} />
        <ResultItem title={t("taxResult.taxPercentage")} value={result.percentage} leftBorder />
        <ResultItem title={t("taxResult.socialSecurity")} value={`JOD ${result.socialSecurity}`} />
        <ResultItem title={t("taxResult.netSalary")} value={`JOD ${result.net}`} leftBorder />
      </div>
    </div>
  );
};

export default TaxResult;
