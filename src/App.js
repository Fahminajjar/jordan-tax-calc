import Loading from "components/Loading/Loading";
import { LocalizationContext } from "contexts/LocalizationContext";
import HomePage from "pages/HomePage/HomePage";
import { useContext } from "react";
import ReactGA from "react-ga4";
import { GOOGLE_ANALYTICS_ID } from "utils/constants";

ReactGA.initialize(GOOGLE_ANALYTICS_ID);

const App = () => {
  const { isInit: isLocalizationInit, direction, language } = useContext(LocalizationContext);

  return (
    <Loading isLoading={!isLocalizationInit} fullPage>
      <main className={`main${language.toUpperCase()}`} dir={direction}>
        <HomePage />
      </main>
    </Loading>
  );
}

export default App;
