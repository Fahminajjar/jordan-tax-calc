import CanonicalTag from "components/CanonicalTag/CanonicalTag";
import Loading from "components/Loading/Loading";
import { LocalizationContext } from "contexts/LocalizationContext";
import HomePage from "pages/HomePage/HomePage";
import TaxRulesPage from "pages/TaxRulesPage/TaxRulesPage";
import TaxFilingPage from "pages/TaxFilingPage/TaxFilingPage";
import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import { GOOGLE_ANALYTICS_ID } from "utils/constants";

ReactGA.initialize(GOOGLE_ANALYTICS_ID);

const App = () => {
  const { isInit: isLocalizationInit, direction, language } = useContext(LocalizationContext);

  return (
    <Loading isLoading={!isLocalizationInit} fullPage>
      <CanonicalTag />
      <main className={`main${language.toUpperCase()}`} dir={direction}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tax-rules" element={<TaxRulesPage />} />
          <Route path="/tax-filing" element={<TaxFilingPage />} />
        </Routes>
      </main>
    </Loading>
  );
}

export default App;
