import { useTranslation } from "react-i18next";

const INFORMATION = ["gross", "net", "tax", "taxPercentage", "socialSecurity"];

const TaxInfo = () => {
  const { t } = useTranslation();

  return (
    INFORMATION.map((info, index) => (
      <p key={`info-${index}`}>
        <strong>{t(`information.${info}.title`)}:</strong><br/>
        {t(`information.${info}.description`)}.
      </p>
    ))
  );
};

export default TaxInfo;
