import USA from "../../../../images/usa.png";
import Poland from "../../../../images/poland.png";
import TabBar from "../../../TabBar";
import React from "react";

const MobileMenu = ({
  language,
  setLanguage,
  toggleMenu,
  toggleQuickSearch,
}) => {
  const hideMenu = () => {
    document.body.style.overflow = "visible";
    toggleQuickSearch(false);
    toggleMenu(false);
  };

  const toggleLanguage = (language) => setLanguage(language);

  return (
    <div className="mobile-menu">
      <div className="languages">
        <img
          src={USA}
          alt="USA"
          onClick={() => toggleLanguage("en")}
          style={language === "en" ? { filter: "grayscale(0)" } : null}
        />
        <img
          src={Poland}
          alt="Poland"
          onClick={() => toggleLanguage("pl")}
          style={language === "pl" ? { filter: "grayscale(0)" } : null}
        />
      </div>
      <TabBar />
    </div>
  );
};
export default MobileMenu;
