import Card from "components/Card/Card";
import HorizontalLine from "components/HorizontalLine/HorizontalLine";
import Header from "components/Header/Header";
import TaxForm from "components/TaxForm/TaxForm";
import TaxResult from "components/TaxResult/TaxResult";
import TaxInfo from "components/TaxInfo/TaxInfo";
import GoogleAdSquare from "components/GoogleAdSquare/GoogleAdSquare";
import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import ReactGA from "react-ga4";
import { calculateTax } from "utils/calculator";

import styles from "./HomePage.module.scss";

const INITIAL_RESULT_STATE =  {
  isVisible: false,
  tax: 0.0,
  percentage: 0.0,
  socialSecurity: 0.0,
  net: 0.0,
};

const HomePage = () => {
  const { t } = useTranslation();

  const [result, setResult] = useState(INITIAL_RESULT_STATE);

  const onFormSubmit = data => {
    const grossFloat = parseFloat(data.gross);
    
    if (grossFloat <= 0 || isNaN(grossFloat)) {
      setResult(INITIAL_RESULT_STATE);
      return;
    }

    const calculationResult = calculateTax({
      gross: grossFloat,
      isFamily: data.isFamily,
      numberOfChildren: parseInt(data.numberOfChildren) || 0,
      hasDisability: data.hasDisability,
      additionalExpenses: parseFloat(data.additionalExpenses) || 0,
      isJordanian: data.isJordanian,
    });

    setResult({
      isVisible: true,
      ...calculationResult,
    });

    ReactGA.event({
      category: "calculate",
      action: "submit",
      label: "Gross",
      value: grossFloat,
    });

    ReactGA.event("calculate", {
      gross: grossFloat,
      family_exemption: data.isFamily,
      children: parseInt(data.numberOfChildren) || 0,
      disability: data.hasDisability,
      jordanian: data.isJordanian,
    });
  }

  useEffect(() => {
    ReactGA.send("pageview");
  }, []);

  return (
    <section className={styles.page}>
      <Container>
        <Header />

        <Row>
          <Col sm={8}>
            <Card>
              <Card.Title>{t("home.title")}</Card.Title>
              <TaxForm onSubmit={onFormSubmit} />
              {result.isVisible && <TaxResult result={result} />}
            </Card>
          </Col>

          <Col sm={4}>
            <GoogleAdSquare />

            <Card>
              <Card.Title>{t("home.informationTitle")}</Card.Title>
              <p className="mb-0">
                {t("home.exemptionInfoPart1")} <strong>{t("home.exemptionInfoAmount")}</strong> {t("home.exemptionInfoPart2")}
              </p>
              <HorizontalLine />
              <TaxInfo />
              <HorizontalLine />
              <Link to="/tax-rules" className={styles.taxRulesLink}>
                {t("home.viewTaxRules")} →
              </Link>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HomePage;
