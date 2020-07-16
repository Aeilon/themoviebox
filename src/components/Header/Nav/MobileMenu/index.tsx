import USA from "../../../../images/usa.png";
import Poland from "../../../../images/poland.png";
import TabBar from "../../../TabBar";
import React, { useEffect } from "react";
import styled from "styled-components";

interface Flag {
  language: string;
}

const USAFlag = styled.img`
  height: 48px;
  width: 48px;
  filter: ${({ language }: Flag) =>
    language === "en" ? "grayscale(0)" : "grayscale(100)"};
`;
const PLFlag = styled.img`
  height: 48px;
  width: 48px;
  filter: ${({ language }: Flag) =>
    language === "pl" ? "grayscale(0)" : "grayscale(100)"};
`;

interface Props {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  isMobile: boolean;
  toggleMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenu: React.FC<Props> = ({
  language,
  setLanguage,
  isMobile,
  toggleMenu,
}) => {
  const toggleLanguage = (language: string): void => setLanguage(language);

  useEffect(() => {
    if (!isMobile) toggleMenu(false);
  }, [isMobile]);

  return (
    <div className="mobile-menu">
      <TabBar />
      <div className="languages">
        <USAFlag
          src={USA}
          alt="USA"
          language={language}
          onClick={() => toggleLanguage("en")}
        />
        <PLFlag
          src={Poland}
          alt="Poland"
          language={language}
          onClick={() => toggleLanguage("pl")}
        />
      </div>
    </div>
  );
};
export default MobileMenu;
