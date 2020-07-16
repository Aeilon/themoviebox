import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Genres from "../Genres";
import { ResolutionContext } from "../../context/ResolutionContext";
import { FormattedMessage } from "react-intl";
import ChangeView from "./ChangeView";
import styled from "styled-components";

interface Params {
  endpoint: string;
}

interface StyledButton {
  link: string;
  endpoint: string;
  theme: {
    colors: {
      mainColor: string;
      secondaryColor: string;
    };
  };
}

const StyledButton = styled.button`
  border: none;
  color: ${({ theme, endpoint, link }: StyledButton) =>
    link === endpoint ? theme.colors.mainColor : theme.colors.secondaryColor};
  border-bottom: ${({ theme, endpoint, link }: StyledButton) =>
    link === endpoint
      ? `1px solid ${theme.colors.mainColor}`
      : `1px solid ${theme.colors.secondaryColor}`};

  &:hover {
    color: ${({ theme }) => theme.colors.mainColor};
    border-bottom: 1px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const TabBar: React.FC = () => {
  const endpoints = [
    { name: "Popular", link: "popular" },
    { name: "Upcoming", link: "upcoming" },
    { name: "Top Rated", link: "top_rated" },
  ];

  const changeLocation = (link: string) => (window.location.href = `/${link}`);
  const params = useParams<Params>();
  const [isMobile] = useContext(ResolutionContext);
  const endpoint = params.endpoint?.toLowerCase();
  return (
    <div className="TabBar">
      <div className="tabs">
        {endpoints.map((e) => {
          const { name, link } = e;

          return (
            <StyledButton
              link={link}
              endpoint={endpoint}
              key={name}
              onClick={() => changeLocation(link)}
            >
              <FormattedMessage id={name} defaultMessage={name} />
            </StyledButton>
          );
        })}
        <Genres />
      </div>
      {!isMobile && <ChangeView />}
    </div>
  );
};

export default TabBar;
