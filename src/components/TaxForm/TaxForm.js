import cx from "classnames";
import { useContext } from "react";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useTranslation } from "react-i18next";
import { LocalizationContext } from "contexts/LocalizationContext";
import { Controller, useForm } from "react-hook-form";

import styles from "./TaxForm.module.scss";

const INITIAL_FORM_DATA = {
  gross: null,
  isFamily: false,
  numberOfChildren: 0,
  hasDisability: false,
  additionalExpenses: 0,
  isJordanian: true,
};

const TaxForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { direction } = useContext(LocalizationContext);

  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_FORM_DATA,
  });

  const isFamily = watch("isFamily");

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* Gross Salary Input */}
      <InputGroup className={cx("mb-3", { [styles.rtlInput]: direction === "rtl" })}>
        <InputGroup.Text>JOD</InputGroup.Text>
        <Controller
          name="gross"
          control={control}
          rules={{ required: true }}
          render={({ field }) =>
            <>
              <FormControl
                className={styles.grossInput}
                placeholder={t("taxForm.grossPlaceholder")}
                isInvalid={!!errors.gross}
                type="number"
                min="0"
                step="any"
                {...field}
              />
              {errors.gross?.type === "required" && (
                <Form.Text className={styles.errorText}>
                  {t("taxForm.grossRequired")}
                </Form.Text>
              )}
            </>
          }
        />
      </InputGroup>

      {/* Exemptions Section */}
      <div className={styles.section}>
        <h6 className={styles.sectionTitle}>{t("taxForm.exemptionsTitle")}</h6>
        
        <Row>
          <Col md={6}>
            {/* Family Exemption Toggle */}
            <InputGroup className="mb-3">
              <Controller
                name="isFamily"
                control={control}
                render={({ field }) =>
                  <Form.Check
                    type="switch"
                    id="family"
                    label={t("taxForm.familyLabel")}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            {/* Number of Children */}
            <InputGroup className={cx("mb-3", { [styles.rtlInput]: direction === "rtl" })}>
              <InputGroup.Text className={styles.inputLabel}>
                {t("taxForm.childrenLabel")}
              </InputGroup.Text>
              <Controller
                name="numberOfChildren"
                control={control}
                render={({ field }) =>
                  <Form.Select
                    {...field}
                    disabled={!isFamily}
                    className={styles.selectInput}
                  >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                  </Form.Select>
                }
              />
            </InputGroup>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            {/* Disability Toggle */}
            <InputGroup className="mb-3">
              <Controller
                name="hasDisability"
                control={control}
                render={({ field }) =>
                  <Form.Check
                    type="switch"
                    id="disability"
                    label={t("taxForm.disabilityLabel")}
                    checked={field.value}
                    onChange={field.onChange}
                  />
                }
              />
            </InputGroup>
          </Col>
          <Col md={6}>
            {/* Additional Expenses */}
            <InputGroup className={cx("mb-3", { [styles.rtlInput]: direction === "rtl" })}>
              <InputGroup.Text className={styles.inputLabel}>
                {t("taxForm.expensesLabel")}
              </InputGroup.Text>
              <Controller
                name="additionalExpenses"
                control={control}
                render={({ field }) =>
                  <FormControl
                    type="number"
                    min="0"
                    max="1000"
                    placeholder="0 - 1000"
                    className={styles.expensesInput}
                    {...field}
                  />
                }
              />
              <InputGroup.Text>JOD</InputGroup.Text>
            </InputGroup>
          </Col>
        </Row>
      </div>

      {/* Social Security Section */}
      <div className={styles.section}>
        <h6 className={styles.sectionTitle}>{t("taxForm.socialSecurityTitle")}</h6>
        
        <InputGroup className="mb-3">
          <Controller
            name="isJordanian"
            control={control}
            render={({ field }) =>
              <Form.Check
                type="switch"
                id="jordanian"
                label={t("taxForm.jordanianLabel")}
                checked={field.value}
                onChange={field.onChange}
              />
            }
          />
        </InputGroup>
      </div>

      {/* Calculate Button */}
      <InputGroup className="mb-3">
        <Button
          type="submit"
          className={styles.calculateBtn}
          size="lg"
        >
          {t("taxForm.calculate")}
        </Button>
      </InputGroup>
    </form>
  );
};

export default TaxForm;
