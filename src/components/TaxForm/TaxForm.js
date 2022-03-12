import cx from "classnames";
import { useContext } from "react";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { useTranslation } from "react-i18next";
import { LocalizationContext } from "contexts/LocalizationContext";
import { Controller, useForm } from "react-hook-form";

import styles from "./TaxForm.module.scss";

const INITIAL_FORM_DATA = {
  gross: null,
  isFamily: false,
};

const TaxForm = ({ onSubmit }) => {
  const { t } = useTranslation();
  const { direction } = useContext(LocalizationContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: INITIAL_FORM_DATA,
  });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

      <InputGroup className="mb-3">
        <Controller
          name="isFamily"
          control={control}
          render={({ field }) =>
            <Form.Check
              type="switch"
              id="family"
              label={t("taxForm.familyLabel")}
              {...field}
            />
          }
        />
      </InputGroup>

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
