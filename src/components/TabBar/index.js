import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Genres from "../Genres";
import { ResolutionContext } from "../../context/ResolutionContext";
import { FormattedMessage } from "react-intl";
import ChangeView from "./ChangeView";
const TabBar = () => {
  const endpoints = [
    { name: "Popular", link: "popular" },
    { name: "Upcoming", link: "upcoming" },
    { name: "Top Rated", link: "top_rated" },
  ];
  const styledButton = (link) =>
    link === endpoint
      ? {
          color: "rgb(255, 0, 121)",
          borderBottom: "1px solid rgb(255, 0, 121)",
        }
      : null;
  const changeLocation = (link) => (window.location.href = `/${link}`);

  const params = useParams();
  const [isMobile] = useContext(ResolutionContext);
  const endpoint = params.endpoint?.toLowerCase();
  return (
    <div className="TabBar">
      <div className="tabs">
        {endpoints.map((e) => {
          const { name, link } = e;
          return (
            <button
              style={styledButton(link)}
              key={name}
              onClick={() => changeLocation(link)}
            >
              <FormattedMessage id={name} defaultMessage={name} />
            </button>
          );
        })}
        <Genres />
      </div>
      {!isMobile && <ChangeView />}
    </div>
  );
};

export default TabBar;
