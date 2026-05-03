import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://jordantaxcalc.com";

const CanonicalTag = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", `${SITE_URL}${pathname === "/" ? "" : pathname}`);
  }, [pathname]);

  return null;
};

export default CanonicalTag;
