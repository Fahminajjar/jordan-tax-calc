import ResultItem from "components/ResultItem/ResultItem";
import HorizontalLine from "components/HorizontalLine/HorizontalLine";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import styles from "./TaxResult.module.scss";

const TaxResult = ({ result }) => {
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.result}>
      <h4 className={styles.resultTitle}>{t("taxResult.title")}</h4>

      {/* Primary Results - Monthly */}
      <div className={styles.resultItems}>
        <ResultItem title={t("taxResult.monthlyTax")} value={`${result.tax} JOD`} />
        <ResultItem title={t("taxResult.taxPercentage")} value={`${(result.percentage * 100).toFixed(2)}%`} leftBorder />
        <ResultItem title={t("taxResult.socialSecurity")} value={`${result.socialSecurity} JOD`} />
        <ResultItem title={t("taxResult.netSalary")} value={`${result.net} JOD`} leftBorder />
      </div>

      {/* Toggle Details Button */}
      <button 
        type="button"
        className={styles.detailsToggle}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? t("taxResult.hideDetails") : t("taxResult.showDetails")}
        <span className={styles.toggleIcon}>{showDetails ? "▲" : "▼"}</span>
      </button>

      {/* Detailed Breakdown */}
      {showDetails && (
        <div className={styles.detailsSection}>
          <HorizontalLine />
          
          {/* Annual Income Section */}
          <h5 className={styles.sectionTitle}>{t("taxResult.annualBreakdown")}</h5>
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span>{t("taxResult.annualGross")}</span>
              <span className={styles.detailValue}>{result.annualGross.toLocaleString()} JOD</span>
            </div>
            <div className={styles.detailRow}>
              <span>{t("taxResult.totalExemptions")}</span>
              <span className={styles.detailValueGreen}>- {result.totalExemptions.toLocaleString()} JOD</span>
            </div>
            <div className={`${styles.detailRow} ${styles.highlighted}`}>
              <span>{t("taxResult.taxableIncome")}</span>
              <span className={styles.detailValue}>{result.taxableIncome.toLocaleString()} JOD</span>
            </div>
          </div>

          <HorizontalLine />

          {/* Tax Breakdown */}
          <h5 className={styles.sectionTitle}>{t("taxResult.taxBreakdown")}</h5>
          <div className={styles.detailsGrid}>
            <div className={styles.detailRow}>
              <span>{t("taxResult.annualIncomeTax")}</span>
              <span className={styles.detailValueRed}>{result.annualIncomeTax.toLocaleString()} JOD</span>
            </div>
            {result.annualNationalContribution > 0 && (
              <div className={styles.detailRow}>
                <span>{t("taxResult.nationalContribution")}</span>
                <span className={styles.detailValueRed}>{result.annualNationalContribution.toLocaleString()} JOD</span>
              </div>
            )}
            <div className={styles.detailRow}>
              <span>{t("taxResult.annualSocialSecurity")}</span>
              <span className={styles.detailValueRed}>{result.annualSocialSecurity.toLocaleString()} JOD</span>
            </div>
            <div className={`${styles.detailRow} ${styles.highlighted}`}>
              <span>{t("taxResult.annualNet")}</span>
              <span className={styles.detailValuePrimary}>{result.annualNet.toLocaleString()} JOD</span>
            </div>
          </div>

          <HorizontalLine />

          {/* Effective Rate */}
          <div className={styles.effectiveRate}>
            <span>{t("taxResult.effectiveRate")}</span>
            <span className={styles.effectiveRateValue}>{(result.effectiveRate * 100).toFixed(2)}%</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxResult;
