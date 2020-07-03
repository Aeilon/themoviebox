import USA from "../../../../images/usa.png";
import Poland from "../../../../images/poland.png";
import TabBar from "../../../TabBar";
import React from "react";

interface Props {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
  toggleQuickSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<Props> = ({ language, setLanguage }) => {
  const toggleLanguage = (language: string): void => setLanguage(language);

  return (
    <div className="mobile-menu">
      <TabBar />
      <div className="languages">
        <img
          src={USA}
          alt="USA"
          onClick={() => toggleLanguage("en")}
          style={language === "en" ? { filter: "grayscale(0)" } : null!}
        />
        <img
          src={Poland}
          alt="Poland"
          onClick={() => toggleLanguage("pl")}
          style={language === "pl" ? { filter: "grayscale(0)" } : null!}
        />
      </div>
    </div>
  );
};
export default MobileMenu;
