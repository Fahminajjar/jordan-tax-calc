import Card from "components/Card/Card";
import Header from "components/Header/Header";
import HorizontalLine from "components/HorizontalLine/HorizontalLine";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { useTranslation } from "react-i18next";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";

import styles from "./TaxRulesPage.module.scss";

const TaxRulesPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    ReactGA.send("pageview");
  }, []);

  const taxBrackets = [
    { from: 0, to: 5000, rate: "5%" },
    { from: 5001, to: 10000, rate: "10%" },
    { from: 10001, to: 15000, rate: "15%" },
    { from: 15001, to: 20000, rate: "20%" },
    { from: 20001, to: 1000000, rate: "25%" },
    { from: 1000001, to: null, rate: "30%" },
  ];

  const exemptions = [
    { key: "individual", amount: "9,000" },
    { key: "family", amount: "18,000" },
    { key: "expenses", amount: "1,000" },
    { key: "spouse", amount: "1,000" },
    { key: "child", amount: "1,000" },
    { key: "maxFamily", amount: "23,000" },
  ];

  return (
    <section className={styles.page}>
      <Container>
        <Header />

        <Row>
          <Col lg={12}>
            <div className={styles.backLink}>
              <Link to="/">← {t("taxRules.backToCalculator")}</Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Tax Brackets Section */}
            <Card>
              <Card.Title>{t("taxRules.bracketsTitle")}</Card.Title>
              <p className={styles.description}>{t("taxRules.bracketsDescription")}</p>
              
              <Table striped bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("taxRules.incomeRange")}</th>
                    <th>{t("taxRules.taxRate")}</th>
                  </tr>
                </thead>
                <tbody>
                  {taxBrackets.map((bracket, index) => (
                    <tr key={index}>
                      <td>
                        {bracket.to 
                          ? `${bracket.from.toLocaleString()} - ${bracket.to.toLocaleString()} ${t("taxRules.jod")}`
                          : `${t("taxRules.over")} ${bracket.from.toLocaleString()} ${t("taxRules.jod")}`
                        }
                      </td>
                      <td className={styles.rateCell}>{bracket.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <div className={styles.note}>
                <strong>{t("taxRules.note")}:</strong> {t("taxRules.nationalContribution")}
              </div>
            </Card>

            {/* Personal Exemptions Section */}
            <Card>
              <Card.Title>{t("taxRules.exemptionsTitle")}</Card.Title>
              <p className={styles.description}>{t("taxRules.exemptionsDescription")}</p>
              
              <Table striped bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("taxRules.exemptionType")}</th>
                    <th>{t("taxRules.annualAmount")}</th>
                  </tr>
                </thead>
                <tbody>
                  {exemptions.map((exemption, index) => (
                    <tr key={index}>
                      <td>{t(`taxRules.exemptions.${exemption.key}`)}</td>
                      <td className={styles.amountCell}>{exemption.amount} {t("taxRules.jod")}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>

          <Col lg={4}>
            {/* Social Security Section */}
            <Card>
              <Card.Title>{t("taxRules.socialSecurityTitle")}</Card.Title>
              <div className={styles.infoBlock}>
                <div className={styles.percentage}>7.5%</div>
                <p>{t("taxRules.socialSecurityDescription")}</p>
              </div>
              <HorizontalLine />
              <p className={styles.smallText}>{t("taxRules.socialSecurityNote")}</p>
            </Card>

            {/* Exempt Income Section */}
            <Card>
              <Card.Title>{t("taxRules.exemptIncomeTitle")}</Card.Title>
              <ul className={styles.exemptList}>
                <li>{t("taxRules.exemptIncome.pension")}</li>
                <li>{t("taxRules.exemptIncome.disability")}</li>
                <li>{t("taxRules.exemptIncome.insurance")}</li>
                <li>{t("taxRules.exemptIncome.diplomatic")}</li>
                <li>{t("taxRules.exemptIncome.inheritance")}</li>
              </ul>
            </Card>

            {/* Tax Residency Section */}
            <Card>
              <Card.Title>{t("taxRules.residencyTitle")}</Card.Title>
              <p>{t("taxRules.residencyDescription")}</p>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TaxRulesPage;
