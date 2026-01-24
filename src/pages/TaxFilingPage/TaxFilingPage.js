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

import styles from "./TaxFilingPage.module.scss";

const TaxFilingPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    ReactGA.send("pageview");
  }, []);

  const portals = [
    { key: "istd", url: "https://istd.gov.jo" },
    { key: "etax", url: "https://etax.istd.gov.jo" },
    { key: "efawateer", url: "https://www.efawateercom.jo" },
  ];

  const steps = ["register", "login", "fill", "review", "submit", "pay"];

  return (
    <section className={styles.page}>
      <Container>
        <Header />

        <Row>
          <Col lg={12}>
            <div className={styles.backLink}>
              <Link to="/">← {t("taxFiling.backToCalculator")}</Link>
              <span className={styles.separator}>|</span>
              <Link to="/tax-rules">{t("taxFiling.viewTaxRules")}</Link>
            </div>
          </Col>
        </Row>

        <Row>
          <Col lg={8}>
            {/* Filing Deadline Section */}
            <Card>
              <Card.Title>{t("taxFiling.deadlineTitle")}</Card.Title>
              <div className={styles.deadlineBox}>
                <div className={styles.deadlineDate}>
                  <span className={styles.deadlineDay}>30</span>
                  <span className={styles.deadlineMonth}>{t("taxFiling.april")}</span>
                </div>
                <div className={styles.deadlineInfo}>
                  <p className={styles.deadlineText}>{t("taxFiling.deadlineDescription")}</p>
                  <p className={styles.deadlineNote}>{t("taxFiling.deadlineNote")}</p>
                </div>
              </div>
            </Card>

            {/* Online Portals Section */}
            <Card>
              <Card.Title>{t("taxFiling.portalsTitle")}</Card.Title>
              <p className={styles.description}>{t("taxFiling.portalsDescription")}</p>
              
              <Table striped bordered hover responsive className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("taxFiling.portal")}</th>
                    <th>{t("taxFiling.purpose")}</th>
                    <th>{t("taxFiling.link")}</th>
                  </tr>
                </thead>
                <tbody>
                  {portals.map((portal, index) => (
                    <tr key={index}>
                      <td className={styles.portalName}>{t(`taxFiling.portals.${portal.key}.name`)}</td>
                      <td>{t(`taxFiling.portals.${portal.key}.purpose`)}</td>
                      <td>
                        <a 
                          href={portal.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={styles.portalLink}
                        >
                          {t("taxFiling.visitSite")} ↗
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>

            {/* Filing Steps Section */}
            <Card>
              <Card.Title>{t("taxFiling.stepsTitle")}</Card.Title>
              <p className={styles.description}>{t("taxFiling.stepsDescription")}</p>
              
              <div className={styles.stepsContainer}>
                {steps.map((step, index) => (
                  <div key={step} className={styles.step}>
                    <div className={styles.stepNumber}>{index + 1}</div>
                    <div className={styles.stepContent}>
                      <h6 className={styles.stepTitle}>{t(`taxFiling.steps.${step}.title`)}</h6>
                      <p className={styles.stepDescription}>{t(`taxFiling.steps.${step}.description`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </Col>

          <Col lg={4}>
            {/* For Employees Section */}
            <Card>
              <Card.Title>{t("taxFiling.employeesTitle")}</Card.Title>
              <p>{t("taxFiling.employeesDescription")}</p>
              <HorizontalLine />
              <h6 className={styles.subTitle}>{t("taxFiling.employerDoes")}</h6>
              <ul className={styles.checkList}>
                <li>{t("taxFiling.employerTasks.withhold")}</li>
                <li>{t("taxFiling.employerTasks.submit")}</li>
                <li>{t("taxFiling.employerTasks.certificate")}</li>
              </ul>
              <HorizontalLine />
              <h6 className={styles.subTitle}>{t("taxFiling.whenToFile")}</h6>
              <ul className={styles.bulletList}>
                <li>{t("taxFiling.fileWhen.additionalIncome")}</li>
                <li>{t("taxFiling.fileWhen.claimExemptions")}</li>
                <li>{t("taxFiling.fileWhen.exceedExemptions")}</li>
              </ul>
            </Card>

            {/* Advance Payments Section */}
            <Card>
              <Card.Title>{t("taxFiling.advanceTitle")}</Card.Title>
              <p>{t("taxFiling.advanceDescription")}</p>
              <div className={styles.advancePayments}>
                <div className={styles.advanceItem}>
                  <span className={styles.advanceLabel}>{t("taxFiling.firstPayment")}</span>
                  <span className={styles.advanceDate}>{t("taxFiling.byJuly30")}</span>
                </div>
                <div className={styles.advanceItem}>
                  <span className={styles.advanceLabel}>{t("taxFiling.secondPayment")}</span>
                  <span className={styles.advanceDate}>{t("taxFiling.byJan30")}</span>
                </div>
              </div>
              <p className={styles.smallText}>{t("taxFiling.advanceNote")}</p>
            </Card>

            {/* What to Report Section */}
            <Card>
              <Card.Title>{t("taxFiling.reportTitle")}</Card.Title>
              <h6 className={styles.subTitle}>{t("taxFiling.taxableIncome")}</h6>
              <ul className={styles.bulletList}>
                <li>{t("taxFiling.report.salaries")}</li>
                <li>{t("taxFiling.report.business")}</li>
                <li>{t("taxFiling.report.rental")}</li>
                <li>{t("taxFiling.report.interest")}</li>
              </ul>
              <HorizontalLine />
              <h6 className={styles.subTitle}>{t("taxFiling.exemptIncome")}</h6>
              <ul className={styles.exemptList}>
                <li>{t("taxFiling.exempt.dividends")}</li>
                <li>{t("taxFiling.exempt.inheritance")}</li>
                <li>{t("taxFiling.exempt.insurance")}</li>
                <li>{t("taxFiling.exempt.pension")}</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TaxFilingPage;
