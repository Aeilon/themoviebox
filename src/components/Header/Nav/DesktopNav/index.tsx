import USA from "../../../../images/usa.png";
import Poland from "../../../../images/poland.png";
import React from "react";
import { IntlShape } from "react-intl";
import styled from "styled-components";

interface Flag {
  language: string;
}

const PLFlag = styled.img`
  height: 70%;
  width: auto;
  cursor: pointer;
  filter: ${({ language }: Flag) =>
    language === "pl" ? "grayscale(0)" : "grayscale(100)"};
  &:hover {
    filter: grayscale(0);
  }
`;

const USAFlag = styled.img`
  height: 70%;
  width: auto;
  cursor: pointer;
  filter: ${({ language }: Flag) =>
    language === "en" ? "grayscale(0)" : "grayscale(100)"};
  &:hover {
    filter: grayscale(0);
  }
`;

interface Props {
  intl: IntlShape;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleQuickSearch: React.Dispatch<React.SetStateAction<boolean>>;
}

const DesktopNav: React.FC<Props> = ({
  intl,
  language,
  setLanguage,
  toggleQuickSearch,
}) => {
  const toggleLanguage = (language: string): void => {
    setLanguage(language);
  };
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
      <USAFlag
        src={USA}
        alt="USA"
        language={language}
        onClick={() => toggleLanguage("en")}
      />
      <PLFlag
        src={Poland}
        alt="Poland"
        onClick={() => toggleLanguage("pl")}
        language={language}
      />
    </>
  );
};

export default DesktopNav;
