import USA from "../../../../images/usa.png";
import Poland from "../../../../images/poland.png";
import React from "react";

const DesktopNav = ({ intl, language, setLanguage, toggleQuickSearch }) => {
  return (
    <>
      <input
        type="text"
        data-testid="click-input"
        placeholder={intl.formatMessage({
          id: "Search",
          defaultMessage: "Search...",
        })}
        onClick={() => {
          document.body.style.overflow = "hidden";
          toggleQuickSearch(true);
        }}
      />
      <img
        src={USA}
        alt="USA"
        onClick={() => setLanguage("en")}
        style={language === "en" ? { filter: "grayscale(0)" } : null}
      />
      <img
        src={Poland}
        alt="Poland"
        onClick={() => setLanguage("pl")}
        style={language === "pl" ? { filter: "grayscale(0)" } : null}
      />
    </>
  );
};

export default DesktopNav;
