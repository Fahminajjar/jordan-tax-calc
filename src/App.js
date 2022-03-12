import HomePage from "pages/HomePage/HomePage";
import { useContext } from "react";
import Loading from "components/Loading/Loading";
import { LocalizationContext } from "contexts/LocalizationContext";

const App = () => {
  const { isInit: isLocalizationInit, direction } = useContext(LocalizationContext);

  return (
    <Loading isLoading={!isLocalizationInit} fullPage>
      <main dir={direction}>
        <HomePage />
      </main>
    </Loading>
  );
}

export default App;
